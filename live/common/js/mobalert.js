// 移动端提示信息效果
// author: Lucifer Lau

function MobileAlert(opt){
    this.options = {
        text: "",              //提示内容
        time: 3000,            //停留时间
        margin: '0 25px',      //距离水平边界
        padding: '15px',       //padding值
        fontSize: '20px',      //字体大小
        lineHeight: '30px'     //行高
    };
    for(var i in opt){
        if(opt[i] != undefined){
            this.options[i] = opt[i];
        }
    }
    this._setup();
}
MobileAlert.prototype = {
    _setup: function(){
        this.opt = this.options;
        this.text = this.opt.text;
        this.time = this.opt.time;
        this.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        this._start();
    },
    _start: function(){
        var self = this;
        this.$wrapper = $('<div style="position: fixed; z-index: 9999; max-width: 100%; top: 0; left: -9999px;"><div style="padding: ' + this.opt.padding + '; margin: ' + this.opt.margin + '; color: #fff; font-size: ' + this.opt.fontSize + '; line-height: ' + this.opt.lineHeight + '; font-family: microsoft yahei; border-radius: 10px; background: rgba(0, 0, 0, .7);">' + this.text + '</div></div>').appendTo($('body'));
        self._set_pos();
        $(window)[this.resizeEvt](function(){ 
            self._set_pos(self);
        });
        this.timer = setTimeout(function(){
            self._close();
        },this.time);
    },
    _set_pos: function(e){
        var self = e || this;
        self.width = self.$wrapper.width() + parseInt(self.$wrapper.css('padding-left')) + parseInt(self.$wrapper.css('padding-right'));
        self.height = self.$wrapper.height() + parseInt(self.$wrapper.css('padding-top')) + parseInt(self.$wrapper.css('padding-bottom'));
        self.left = ($(window).width() - self.width) / 2;
        self.top = ($(window).height() - self.height) / 2;
        self.$wrapper.css({'left':self.left, 'top': self.top});
    },
    _close: function(){
        this.$wrapper.remove();
    }
}