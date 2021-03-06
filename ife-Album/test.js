 function $(){
        return arguments.length > 1 ? arguments[0].querySelectorAll(arguments[1]) : document.querySelectorAll(arguments[0]);
    }

    function selCls(cls) {
        if(document.getElementsByClassName)
            return document.getElementsByClassName(cls);
        else{
            var children = document.getElementsByTagName('*'); 
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
window.onload = function(){
    var test = window.ifeAlbum;
    var selObj = $("div.album")[0];
    test.wrapObj = selObj;
    test.image = ["img/1.jpg","img/2.jpg", "img/3.jpg","img/4.jpg", "img/5.jpg","img/6.jpg", "img/7.jpg","img/8.jpg", "img/9.jpg","img/10.jpg"];
    test.setLayout(2, 220);
}