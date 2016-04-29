window.onload = function(){
	var imgNum = 0;
	var imgLay = new ImgLayout(),
		readImg = new ReadImgFile();
		
	document.getElementById('img_source').onchange = function(){
		if(imgNum<6){
			//图片上传成功再执行代码
			if(readImg.readAsDataURL('album1', 'sel', this)){ 
				imgNum++;
				imgLay.init(imgNum, this, 'album1', 'sel');
			}
			else{
				alert("上传未成功，请传张不同的图片啦!");
			}
		}
		else{
			alert("超过布局数目啦！重新布局~~");
			imgNum = 0;
			imgLay.clear('album1'); 
			if(readImg.readAsDataURL('album1', 'sel', this)){
				imgNum++;
				imgLay.init(imgNum, this, 'album1', 'sel');
			}
		}
	}
}