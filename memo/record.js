var addHandler = function(target, eventType, handler){  
    if(target.addEventListener){//主流浏览器  
        addHandler = function(target, eventType, handler){  
            target.addEventListener(eventType, handler, false);           
        };  
    }else{//IE  
        addHandler = function(target, eventType, handler){  
            target.attachEvent("on"+eventType, handler);  
        };        
    }  
    addHandler(target, eventType, handler);  
}

var $ = function (){
    return arguments.length > 1 ? arguments[0].querySelectorAll(arguments[1]) : document.querySelectorAll(arguments[0]);
}
var selCls = function (parent, cls) {
    if(parent.getElementsByClassName)
        return parent.getElementsByClassName(cls);
    else{
        var children = parent.getElementsByTagName('*'); 
        var elements = new Array(); 
        for (var i=0; i<children.length; i++){ 
            var child = children[i]; 
            var classNames = child.className.split(' '); 
            for (var j=0; j<classNames.length; j++){ 
                if (classNames[j] == cls){ 
                    elements.push(child); 
                    break; 
                } 
            } 
        } 
        return elements; 
    }
}
var jump = function(){
    var hash = location.hash;
    document.body.className = hash.substr(1);
}
var loadSet = function(){
    if('localStorage' in window){
        var name = localStorage.getItem("name"),
            prefer = localStorage.getItem("prefer"),
            oh1 = $('h1')[0],
            oPrefer = $('#color')[0],
            oName = $('#name')[0];
        if(name){
            oh1.innerHTML = name + "'s Tasks";
            oName.value = name;
        }else{
            oh1.innerHTML = "My Tasks";
            oName.value = '';
        }
        if(prefer){
            oh1.className = prefer;
            oPrefer.value = prefer;
        }else{
            oPrefer.value = "blue";
            oh1.className = 'blue';
        }
    }
}
var clrSet = function(e){
    e.preventDefault();
    event.returnValue = false;
    if('localStorage' in window){
        localStorage.clear();
    }
    loadSet();
    alert('reset!');
    location.hash = '#list';
    delDatabase();
}
var saveSet = function(e){   
    e.preventDefault();
    event.returnValue = false;
    if('localStorage' in window){
        var name =  $('#name')[0].value,
            prefer = $('#color')[0].value;
        localStorage.setItem('name', name);
        localStorage.setItem('prefer', prefer);
        loadSet();
    }
}

var indexedDB = window.indexedDB || window.webkitIndexedDB
    || window.mozIndexedDB || window.msIndexedDB || false,
        IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
    || window.mozIDBKeyRange || window.msIDBKeyRange || false,
        webSQLSupport = ('openDatabase' in window);

// 连接并配置数据库
var db;
var openDB = function(){
    if(indexedDB){
        var request = indexedDB.open('task', 1),
            upgradeNeeded = ('onupgradeneeded' in request);

        request.onsuccess = function(e){

            db = e.target.result;  // 获取的数据库
            if(!upgradeNeeded && db.version != '1'){
                var setVersionRequest = db.setVersion('1');

                setVersionRequest.onsuccess = function(e){
                    var objectStore = db.createObjectStore('task', {keyPath: 'id'});
                    objectStore.createIndex('desc', 'descUpper', {unique:false});
                    loadSet(); //??
                }
            }else{
                loadSet();//??
            }
        }
        if(upgradeNeeded){
            request.onupgradeneeded = function(e){
                db = e.target.result;
                var objectStore = db.createObjectStore('task', {keyPath: 'id'});
                objectStore.createIndex('desc', 'descUpper', {unique:false});
            }
        }
    }else if(webSQLSupport){
        db = openDatabase('tasks', '1.0', 'task database', (5*1024*1024));
        db.transaction(function(tx){
            var sql = 'CREATE TABLE IF NOT EXISTS task ('+ 'id INTEGER PRIMARY KEY ASC,' + 'desc TEXT,' + 'due DATETIME,' + 'complete BOOLEAN' + ')';
            tx.executeSql(sql, [], loadSet);
        });
    }
}
    
openDB();

//判断是显示空列表还是添加任务
var getEmptyList = function(query, taskList){
    var emptyList = document.createElement('li');
    if(query.length > 0){
        emptyList.innerHTML = '<div class="emptyTitle">No tasks match your query:'+ query+'</div>';
    }else{
        emptyList.innerHTML = '<div class="emptyTitle">No tasks to display.<a href = "#add">Add one</a></div>';
    }
    taskList.appendChild(emptyList);
}
//插入任务
var insertTask = function(e){
    var desc = $('#desc')[0].value,
        dueDate = $('#date')[0].value;
    if(desc.length>0 && dueDate.length>0){
        var taskObject = {
            id: new Date().getTime(),
            desc: desc,
            descUpper: dueDate,
            complete: false
        }
        if(indexedDB){
            var tx = db.transaction(['task'], 'readwrite'),
                objectStore = tx.objectStore('task'),
                request = objectStore.add(taskObject);
                tx.oncomplete = updateView;
        }else if(webSQLSupport){
            db.transaction(function(tx){
                var sql = 'INSERT INTO task(desc, due, complete)' + 'VALUES(?, ?, ?)',
                    args = [taskObject.desc, Task.due, task.complete];
                tx.executeSql(sql, args, updateView);
            });
        }
    }else{
            alert('please fill out all fields!');
    }
}

//搜索数据库，显示搜索到的任务项，q是可选参数，不同处理
var loadTask = function(q){
    var taskList = $('taskList'),
        query = q || '';

    taskList.innerHTML = '';
    if(indexedDB){
        var tx = db.transaction(['task'], 'readonly'),
            objectStore = tx.objectStore('task'),
            cursor,
            i = 0;
        if(query.length > 0){
            var index = objectStore.index('desc'),
                upper = query.toUpperCase(),
                keyRange = IDBKeyRange.bound(upper, upper+'Q');
            cursor = index.openCursor(keyRange);
        }else{
            cursor = objectStore.openCursor();
        }

        cursor.onsuccess = function(e){
            var result = e.target.result;
            if(result == null) return;
            i++;
            showTask(result.value, taskList);
            result['continue'];
        }
        tx.oncomplete = function(e){
            if(i == 0){
                getEmptyList(query, taskList);
            }            
        }
    }else if(webSQLSupport){
        db.transaction(function(tx){
            var sql,
                args = [];
            if(query.length > 0){
                sql = 'SELECT * FROM task WHERE desc LINK ?';
                args[0] = query+'%';
            }else{
                sql = 'SELECT * FROM task';
            }

            var getRows = function(tx, results){
                var i = 0, 
                    len = results.rows.length;
                for(; i<len; i++){
                    showTask(results.rows.item(i), taskList);
                } 
                if(len == 0){
                    getEmptyList(query, taskList);
                }
            }

            tx.executeSql(sql, args, getRows);
        });
    }
}

var searchTask = function(e){
    var query = $('#search')[0].value;
    if(query.length > 0){
        loadTask(query);
    }
    else{
        loadTask();
    }
}

var updateView = function(){
    loadTask();
    alert('Task added succeessfully');
    $('#desc')[0].value = '';
    $('#date')[0].value = '';
}


var showTask = function(taskObject, taskList){
    var newTask = document.createElement('li'),
        checked = (taskObject.complete == 1)? 'checked = "checked"': '';

    newTask.innerHTML = '<div class="complete"><input type="checkbox" name="complete" id="chk_"'+taskObject.id+'/></div>' + 
    '<div class="delete"><a href="#" id="del_"'+taskObject.id+'>Delete</a></div>' + 
    '<div class="title">'+taskObject.desc+'</div>'
    '<div class="due">'+taskObject.due+'</div>';
    taskList.appendChild(newTask);

    var isMarkComplete = function(e){
        var updatedTask = {
            id: taskObject.id,
            desc: taskObject.desc,
            descUpper: taskObject.desc.toUpperCase(),
            due: taskObject.due,
            complete: e.target.checked
        };
        updateTask(updatedTask); //更新task
    }

    var remove = function(e){
        if(confirm('Deleting task. Are you sure?', 'Delete')) {
          deleteTask(taskObject.id); //删除task
        }
    }
    $('chk_'+taskObject.id)[0].onchange = isMarkComplete;
    $('del_'+taskObject.id)[0].onchange = remove;
}

//在数据库修改更新任务列表
var updateTask = function(taskObject){
    if(indexedDB){
        var tx = db.transaction(['task'], 'readwrite'),
            objectStore = tx.objectStore('task'),
            request = objectStore.put(taskObject);
    }else if(webSQLSupport){
        var complete = taskObject.complete? 1 : 0;
        db.transaction(function(tx){
            var sql = 'UPDATE task SET complete = ? WHERE id=?'
            args = [complete, taskObject.id];
            tx.executeSql(sql, args);
        });   
    }
}
//删除数据
var deleteTask = function(id){
    if(indexedDB){
        var tx = db.transaction(['task'], 'readwrite'),
            objectStore = tx.objectStore('task'),
            request = objectStore.delete(id);
            request.oncomplete = loadTask; //alert
    }else if(webSQLSupport){
       db.transaction(function(tx){
            var sql = 'Delete FROM　task WHERE id=?',
                args = [id];
            tx.executeSql(sql, args, loadTask);
        });    
    }
}
//删除整个数据库
var delDatabase = function(){
    if(indexedDB){
        var delRequest = indexedDB.deleteDatabase('task');
        delRequest.onsuccess = window.location.reload();
    }else if(webSQLSupport){
        db.transaction(function(tx){
            var sql = 'DELETE FROM task';
            tx.executeSql(sql, [], loadTask);
        });
    }
}

addHandler(window, "load", function(){
    loadSet();
    var oSave = $('#save')[0],
        oReset = $('#reset')[0],
        oAdd = $('form')[1],
        oSearch = $('#search')[0];
    addHandler(window, "hashchange", jump);
    addHandler(oSave, 'click', saveSet);    
    addHandler(oReset, 'click', clrSet); 
    addHandler(oAdd, 'click', insertTask);   
});