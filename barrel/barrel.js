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
//图像大小的数组
var imgSize = [];
var loadImg = function(imgData, parent, callback){
	var realHeight, realWidth, 
		len = imgData.length,
		imgNum = imgData.length;
	for(var i = 0; i < len; i ++){ 
		var imgtemp = new Image();
		
		imgtemp.index = i;//指定一个检索值，用于确定是哪张图 
		imgtemp.onload = function(){
			realWidth = this.width; 
			realHeight = this.height; 
			imgSize[this.index] = {"realWidth":realWidth, "realHeight":realHeight};//???
			imgtemp = null;
			if(!--imgNum){
				console.log(imgSize);
				callback(imgData, imgSize, parent);
			}
		} 
		imgtemp.src = imgData[i].src; // IE8
	}
}


var barrelLay = function(imgData, imgSize, parent){
	var setHeight = 300,
		mainWidth = parent.offsetWidth,
		len = imgData.length,
		tmpWidth = 0, num = 0, rowHeight, html ='';

	console.log(imgSize);
	
	for(var i = 0; i < len; i++){
		tmpWidth += Math.ceil(imgSize[i].realWidth / imgSize[i].realHeight * setHeight);
		console.log(tmpWidth);
		console.log(mainWidth);
		if(tmpWidth < mainWidth){
			++ num;
		}
		else{
			++ num;
			console.log(num);
			rowHeight =  Math.floor(mainWidth / tmpWidth * setHeight);
			console.log(tmpWidth);
			for(var j = i- num + 1; j < i + 1; j++ ){
				html += "<img src='"+imgData[j].src+"' height = '"+rowHeight+"px'/>"

				console.log(j);
				console.log(i);
			}
			parent.innerHTML += html;
			html ='';
			tmpWidth = 0;
			num = 0;
		}
	}	

} 

window.onload = function(){

	var oMain = document.getElementById('main'),
	    oFull = document.getElementById('full');
		//仿后台数据;
	var imgData =  {"data":[{"src":'img/0.jpg'}, {"src":'img/1.jpg'}, {"src":'img/2.jpg'}, {"src":'img/3.jpg'}, {"src":'img/4.jpg'}, {"src":'img/5.jpg'}, {"src":'img/6.jpg'}, {"src":'img/7.jpg'}, {"src":'img/8.jpg'}, {"src":'img/9.jpg'}, {"src":'img/10.jpg'}, {"src":'img/11.jpg'}, {"src":'img/12.jpg'}, {"src":'img/13.jpg'}, {"src":'img/14.jpg'}, {"src":'img/15.jpg'}, {"src":'img/16.jpg'}, {"src":'img/17.jpg'}, {"src":'img/18.jpg'}, {"src":'img/19.jpg'}, {"src":'img/20.jpg'}, {"src":'img/21.jpg'}, {"src":'img/22.jpg'}, {"src":'img/23.jpg'}, {"src":'img/24.jpg'}, {"src":'img/25.jpg'}, {"src":'img/26.jpg'}, {"src":'img/27.jpg'}, {"src":'img/28.jpg'}, {"src":'img/29.jpg'}, {"src":'img/30.jpg'}]}

	loadImg(imgData.data, oMain, barrelLay);

	addHandler(oMain, 'click', function(ev){
		var ev = ev || window.event,
	     	target = ev.target || ev.srcElement;
		toFullScreen(target, oFull);
	});

	addHandler(oFull, 'click', function(){
		hidden(oFull);
	});	

}