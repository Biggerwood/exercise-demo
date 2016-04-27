var ReadImgFile = function(file){
	//this.file = file;
}
ReadImgFile.prototype.readAsDataURL = function(imgWrapId, file){

    var result = document.getElementById(imgWrapId); 

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
        result.innerHTML +='<img class="sel" src="' + src +'"/>';
        return true;
	}
    //兼容IE
	else if(window.document.selection){
        file.select();

        var src = document.selection.createRange().text;
        result.innerHTML += '<img class="sel" src="' + src +'"/>';
        return true;
	}
}

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