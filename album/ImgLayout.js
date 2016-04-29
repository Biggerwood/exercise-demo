//定义获取类和id元素
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

//定义布局原型对象
var ImgLayout = function (num) {
	this.num = num;
	var clsArray1 = ['one-img1'],
	clsArray2 = ['two-img1', 'two-img2'],
	clsArray3 = ['three-img1', 'three-img2', 'three-img3'],
	clsArray4 = ['four-img1', 'four-img2', 'four-img3', 'four-img4'],
	clsArray5 = ['five-img1', 'five-img2', 'five-img3', 'five-img4', 'five-img5'],
	clsArray6 = ['six-img1', 'six-img2', 'six-img3', 'six-img4', 'six-img5', 'six-img6'];
	this.clsArray = [clsArray1, clsArray2, clsArray3, clsArray4, clsArray5, clsArray6];
}
ImgLayout.prototype.clear = function(imgWrapId){
	selId(imgWrapId).innerHTML = "";
}
//将class置为空，去除图片任何样式
ImgLayout.prototype.reset = function (commonCls) {
	var selNode = selCls(commonCls),
		len = selNode.length;
	for(var i = 0; i < len; i++ ){
		selNode[i].className = commonCls;
	}
}
//根据上传图片的数量设置class
//@param cls 当前上传单张图片的class
ImgLayout.prototype.select = function(commonCls, cls) {
	this.reset(commonCls);
	var addImg = selCls(commonCls),
		imgLen = addImg.length;
	for(var i = 0; i < imgLen; i++){
		addImg[i].className += " "+cls[i];
	}
}
//@param imgNum 图片的数量
//@param commonCls 所选择div下图片的通用class
//@param file input控件选择上传的文件
//@param imgWrapId 包裹图片的div的id
ImgLayout.prototype.init = function(imgNum, file, imgWrapId, commonCls){
	var selClsArray = this.clsArray[imgNum-1].slice(0, imgNum);
	this.select(commonCls, selClsArray);
}