
// 延迟加载图片
var loader = (function (loader) {
  /**
   * 延迟加载图片的核心代码
   * @param  {DOMElement}  img      dom元素, 一般是img元素或者要设置背景图的元素
   * @param  {string}      original 图片的原始的地址, 可选
   * @param  {Boolean}     isBgImg  是否设置为为背景图片, 值为true时即设置
   * @return {undefined}            无返回值
   */
  function loadImg (img, original, isBgImg) {
    var tmpImg,
      imgClass = img.classList;
    if ( imgClass.contains('loading') || imgClass.contains('loaded') ) return;
    console.log('going to load...');
    tmpImg = document.createElement('img');
    original = img.getAttribute('data-original') || original;
    console.log('original:' + original);
    imgClass.add('loading');
    tmpImg.addEventListener('load',function (e) {
      if (isBgImg) {
        img.style.backgroundImage = 'url(' + original + ')';
      } else {
        img.src = original;
      }
      imgClass.remove('loading');
      imgClass.add('loaded');
      tmpImg.removeEventListener('load',arguments.callee);
      tmpImg = null;
    });
    tmpImg.src = original;
  }

  /**
   * 加载容器内第一个直接子元素(需为img标签)的图片: 结构如 <div><img data-original="..."></div>
   * @param  {DOMElement} imgWrapper 容器, dom元素
   * @param  {string} original       图片的原始地址, 可选
   * @return {undefined}             无返回值
   */
  function loadImgInWrapper (imgWrapper, original) {
    var img = imgWrapper.children[0];
    img instanceof HTMLImageElement && loadImg(img, original);
  }

  /**
   * 加载图片作为该元素的背景图片, 该元素可以是任何元素如<div data-original="..."></div>
   * @param  {DOMElement} elm dom元素
   * @return {undefined}     无返回值
   */
  function loadImgAsBg (elm) {
    elm && loadImg(elm, false, true);
  }

  /**
   * 加载context内所有img标签的原始图片, img须由有lazy-img类的元素包裹起来
   * @param  {string}    context css选择器, 表示所要加载图片的范围, 略去的话则加载body内的
   * @return {undefined}         无返回值
   */
  function loadImgInContext(context) {
    var wrappers;
    context = context ? context + ' .lazy-img' : '.lazy-img';
    wrappers = document.querySelectorAll(context);
    if (wrappers.length) {
      wrappers = Array.prototype.slice.call(wrappers);
      wrappers.forEach( loadImgInWrapper );
    }
  }

  loader.loadImg = loadImg;
  loader.loadImgInWrapper = loadImgInWrapper;
  loader.loadImgAsBg = loadImgAsBg;
  loader.loadImgInContext = loadImgInContext;

  return loader;
})(loader || {});