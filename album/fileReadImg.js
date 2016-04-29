//读取文件并显示到div中
var ReadImgFile = function(file){

}
//@param commonCls 所选择div下图片的通用class
//@param file input控件选择上传的文件
//@param imgWrapId 包裹图片的div的id
//@return bool 定义是否上传成功
ReadImgFile.prototype.readAsDataURL = function(imgWrapId, commonCLS, file){

    var result = document.getElementById(imgWrapId); 
    //Chrome, FF
    if ((file.files && file.files[0])){
	    if(!/image\/\w+/.test(file.files[0].type)){  
	        alert("请上传图片！");  
	        return false;  
	    }  
	   /* 图片异步加载问题
        var reader = new FileReader();  
	    //将文件以Data URL形式读入页面  
	    reader.readAsDataURL(file.files[0]);  
	    reader.onload = function(){   
	        //显示文件  
	        result.innerHTML +='<img class="sel" src="' + this.result +'"/>';
            console.log(1);
	    }  
        */
        var src = window.URL.createObjectURL(file.files[0]);
        result.innerHTML +='<img class="'+ commonCLS +'" src="' + src +'"/>';
        return true;
	}
    //兼容IE
	else if(window.document.selection){
        file.select();

        var src = document.selection.createRange().text;
        result.innerHTML += '<img class="'+ commonCLS +'" src="' + src +'"/>';
        return true;
	}
}
//设置图片大小
ReadImgFile.prototype.setImgSize = function(img, maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
         
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
     
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);

    img.width  =  param.width;
    img.height =  param.height;

    return param;
}