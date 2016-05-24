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
addHandler(window, "load", function(){
    addHandler(window, "hashchange", jump)    
});