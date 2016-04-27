var selCls = function (cls) {
	if(document.getElementsByClassName)
		return document.getElementsByClassName(cls);
	else{
		var children = document.getElementsByTagName('img'); 
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
var selId = function (id) {
	return document.getElementById(id);
}

var imgLayout = function (num) {
	this.num = num;
}
//将class置为空，去除图片任何样式
imgLayout.prototype.reset = function (commonCls) {
	var selNode = selCls(commonCls),
		len = selNode.length;
	for(var i = 0; i < len; i++ ){
		selNode[i].className = commonCls;
	}
}
/*
imgLayout.prototype.one = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.two = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.three = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.four = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.five = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.six = function (commonCls, cls) {
	this.reset(commonCls);
}
imgLayout.prototype.select = function(num){
	switch(num){
		case 1:
		this.one('cls1');
		break;
		case 2:
		this.two('cls2');
		break;
		case 3:
		this.three('cls3');
		break;
		case 4:
		this.four('cls4');
		break;
		case 5:
		this.five('cls5');
		break;
		case 6:
		this.sixth('cls6');
		break;
	}
}
*/
imgLayout.prototype.select = function(commonCls, cls) {
	this.reset(commonCls);
	var addImg = selCls(commonCls),
		imgLen = addImg.length;
	for(var i = 0; i < imgLen; i++){
		addImg[i].className += " "+cls[i];
	}
}

window.onload = function(){
	var imgNum = 0;
	var clsArray1 = ['one-img1'],
		clsArray2 = ['two-img1', 'two-img2'],
		clsArray3 = ['three-img1', 'three-img2', 'three-img3'],
		clsArray4 = ['four-img1', 'four-img2', 'four-img3', 'four-img4'],
		clsArray5 = ['five-img1', 'five-img2', 'five-img3', 'five-img4', 'five-img5'],
		clsArray6 = ['six-img1', 'six-img2', 'six-img3', 'six-img4', 'six-img5', 'six-img6'],
		clsArray = [clsArray1, clsArray2, clsArray3, clsArray4, clsArray5, clsArray6];
	document.getElementById('img_source').onchange = function(){
	
	var a = new ReadImgFile(this);
	if(a.readAsDataURL('album1', this)){
		imgNum++;
		var selClsArray = clsArray[imgNum-1].slice(0, imgNum);
		console.log(selClsArray);
		//alert(++imgNum);
		var b = new imgLayout(imgNum);
		b.select('sel',selClsArray);
	}
}
}