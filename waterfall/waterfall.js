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
var arrIndex = function(array, value){
	for(var i=0; i<array.length; i++){
		if(array[i] == value)
			return i;
	}
}
var waterfallLay = function(parent, cls){
	var selImg = selCls(parent, cls),
		imgNum = selImg.length,
		heightArr = [];
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

var waterfallAdd = function(imgData, parent, cls){
	var selImg = selCls(parent, cls),
		imgNum = selImg.length;

	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
		pageHeight = scrollTop + document.documentElement.clientHeight || document.body.clientHeight,
		lastImgHeight = selImg[imgNum-1].offsetTop + Math.floor(selImg[imgNum-1].offsetHeight/2);
		console.log(lastImgHeight);
		console.log(pageHeight);


	if(lastImgHeight < pageHeight){
		for(var i=0; i<imgData.data.length; i++){
			parent.innerHTML += '<div class="wrap"><div class="pic"><img src="img/'+imgData.data[i].src+'"/></div></div>';
	    }
	    waterfallLay(parent, cls);
	}
}


window.onload = function(){
	var oMain = document.getElementById('main');
		//仿ajax;
	var imgData =  {"data":[{"src":'0.jpg'}, {"src":'1.jpg'}, {"src":'2.jpg'}, {"src":'3.jpg'}, {"src":'4.jpg'}, {"src":'5.jpg'}, {"src":'6.jpg'}, {"src":'7.jpg'}]}
	waterfallLay(oMain, 'wrap');
	window.onscroll = function(){
		waterfallAdd(imgData, oMain, 'wrap');
	}
}