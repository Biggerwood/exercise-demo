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
            oh1.className = 'blue';
            oPrefer.value = 'blue';
        }
    }
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
addHandler(window, "load", function(){
    loadSet();
    var oSave = $('#save')[0];
    addHandler(window, "hashchange", jump);
    addHandler(oSave, 'click', saveSet);    
});