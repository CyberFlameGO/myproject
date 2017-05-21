// 用于移动端rem和px互转
// author: Lucifer Lau

// 字体设置
function font(w) {
    var w = w || 640,
        docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            // if (clientWidth >= w) {
            //     clientWidth = w;
            // };
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / w) + 'px';
        };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
}

font();
// font(720);   //如果是其他大小的设计稿，默认640