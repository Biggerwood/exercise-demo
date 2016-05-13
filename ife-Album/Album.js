(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';

    function $(){
        return arguments.length > 1 ? arguments[0].querySelectorAll(arguments[1]) : document.querySelectorAll(arguments[0]);
    }

    function selCls(cls) {
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


    function IfeAlbum() {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };

        // 公有变量可以写在这里
        // this.xxx = ...
        this.image = [];
        this.wrapObj = null;

    }

    // 私有变量可以写在这里
    // var xxx = ...
    var clsArray1 = ['one-img1'],
    clsArray2 = ['two-img1', 'two-img2'],
    clsArray3 = ['three-img1', 'three-img2', 'three-img3'],
    clsArray4 = ['four-img1', 'four-img2', 'four-img3', 'four-img4'],
    clsArray5 = ['five-img1', 'five-img2', 'five-img3', 'five-img4', 'five-img5'],
    clsArray6 = ['six-img1', 'six-img2', 'six-img3', 'six-img4', 'six-img5', 'six-img6'],
    clsArray = [clsArray1, clsArray2, clsArray3, clsArray4, clsArray5, clsArray6];

    /************* 以下是本库提供的公有方法 *************/



    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项 {布局方式}
     */
    IfeAlbum.prototype.setImage = function (image, option) {
        
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }
        
        this.clear();

        // 你的实现

    };



    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function() {
        var img = this.image,
            imgLen = img.length,
            HTMLElement = [];

        for(var i = 0; i < imgLen; i++){
            var oImg = document.createElement("img");
            oImg.src = img[i];
            HTMLElement.push(oImg);
        }
        return HTMLElement;
    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.addImage = function (image) {
        var layout = this.getLayout(),
            imgLen = image.length;
        if(layout == 1){

        }
    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (HTMLElement) {

        if(HTMLElement.length == 0){
            return true;
        }else{
            this.wrapObj.removeChild(HTMLElement.pop());
            return false;
        }
    }

    IfeAlbum.prototype.clear = function(){
        this.wrapObj.innerHTML = "";
    }
    //将class置为空，去除图片任何样式
    IfeAlbum.prototype.reset = function (selNode) {
        var len = selNode.length;
        for(var i = 0; i < len; i++ ){
            selNode[i].className = '';
        }
    }



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {
        switch(layout){
            case 1:
                //拼图
                break;
            case 2:
                //拼图
                break;
            case 3:
                //拼图
                break;
            default:
                alert('请选择有效布局！');
        }
    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {

    };

    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**拼图布局
    */
 
    //根据上传图片的数量设置class
    IfeAlbum.prototype.puzSelect = function(addImg, cls) {
       this.reset(addImg);
        var imgLen = addImg.length;
        for(var i = 0; i < imgLen; i++){
            addImg[i].className += " "+cls[i];
        }
    }
    IfeAlbum.prototype.puzInit = function(){
        var addImg = this.image,
            imgLen = addImg.length;

        var oImg = this.getImageDomElements();
        for(var i = 0; i < oImg.length; i++){
            alert(this.wrapObj);
            this.wrapObj.appendChild(oImg[i]);
        }
        var selClsArray = clsArray[imgLen-1].slice(0, imgLen);
        this.puzSelect(oImg, selClsArray);
    }


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口



    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));