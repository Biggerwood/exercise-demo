//事件监听
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
//选择parent节点下类为cls的元素
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
//数组的indexof，查找array中值为value的索引值
var arrIndex = function(array, value){
	for(var i=0; i<array.length; i++){
		if(array[i] == value)
			return i;
	}
}
//瀑布流局部
var waterfallLay = function(parent, cls){
	var selImg = selCls(parent, cls),
		imgNum = selImg.length,
		heightArr = [],
		clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var cols =  Math.floor(document.documentElement.clientWidth/selImg[0].offsetWidth);
	parent.style.width = selImg[0].offsetWidth * cols + 'px';

	for(var i = 0; i < imgNum; i++){
		var imgHeight = selImg[i].offsetHeight;
		if(i < cols){
			heightArr.push(imgHeight);
		}
		else{
			var minHeight = Math.min.apply(null, heightArr),
				minIndex = arrIndex(heightArr, minHeight);
			selImg[i].style.position = 'absolute';
			selImg[i].style.left = selImg[minIndex].offsetLeft + 'px';
			selImg[i].style.top = minHeight + 'px';
			heightArr[minIndex] += selImg[i].offsetHeight;
		}
	}
}
//动态添加图片
var waterfallAdd = function(imgData, parent, cls){
	var selImg = selCls(parent, cls),
		imgNum = selImg.length;

	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
		pageHeight = scrollTop + document.documentElement.clientHeight || document.body.clientHeight,
		lastImgHeight = selImg[imgNum-1].offsetTop + Math.floor(selImg[imgNum-1].offsetHeight/2);


	if(lastImgHeight < pageHeight){
		for(var i=0; i<imgData.data.length; i++){
			parent.innerHTML += '<div class="wrap"><div class="pic"><img src="img/'+imgData.data[i].src+'"/></div></div>';
	    }
	    waterfallLay(parent, cls);
	}
}
//图片全屏化
var toFullScreen = function(target, obj){	
	if(target.tagName == "IMG"){
		obj.className = "show";
		obj.innerHTML = "<img src = '"+ target.src +"'/>"; 
		document.querySelector("body").className = 'noScroll';
	}
}
//隐藏图片所在的遮罩
var hidden = function(obj){
	obj.className = "hidden";
	document.querySelector("body").className = '';
}

window.onload = function(){

	var oMain = document.getElementById('main'),
	    oFull = document.getElementById('full');
		//仿后台数据;
	var imgData =  {"data":[{"src":'0.jpg'}, {"src":'1.jpg'}, {"src":'2.jpg'}, {"src":'3.jpg'}, {"src":'4.jpg'}, {"src":'5.jpg'}, {"src":'6.jpg'}, {"src":'7.jpg'}]}
	waterfallLay(oMain, 'wrap');

	addHandler(window, 'scroll', function(){
		waterfallAdd(imgData, oMain, 'wrap');
	});

	addHandler(oMain, 'click', function(ev){
		var ev = ev || window.event,
	     	target = ev.target || ev.srcElement;
	     console.log(target);
		toFullScreen(target, oFull);
	});

	addHandler(oFull, 'click', function(){
		hidden(oFull);
	});
	
}