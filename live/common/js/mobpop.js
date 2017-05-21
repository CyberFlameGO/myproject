// 移动端弹出层效果
// author: Lucifer Lau

var ZINDEX = 1;
function MobilePop(opt){
    this.options = {
        id: "",                     //弹层id编号
        zIndex: ZINDEX++,           //弹层层级
        bg_opacity: .7,             //背景透明度
        is_fix: true,               //是否随滚动条固定
        top: 'center',              //上定位
        left: 'center',             //左定位
        width: '',                  //宽度
        height: '',                 //高度
        is_overflow: false,         //超出宽高是否隐藏
        element: '',                //弹层内容-页面中的选择器
        elementClone: false,        //页面中的选择器-是否生成克隆代码
        demo: '',                   //弹层内容-html代码,如果没有element则选择此项
        closeEle: '',               //关闭弹层的选择器
        bgClose: true,              //点击背景可以关闭弹层
        closeOther: false,          //是否关闭其他弹层
        callback: function(){},     //加载完后执行函数
        closeCallback: function(){} //关闭后执行函数
    };
    for(var i in opt){
        if(opt[i] != undefined){
            this.options[i] = opt[i];
        }
    }
    this._setup();
}
MobilePop.prototype = {
    _setup: function(){
        this.opt = this.options;
        this.id = this.opt.id;
        this.zIndex = this.opt.zIndex;
        this.top = this.opt.top;
        this.left = this.opt.left;
        this.width = this.opt.width;
        this.height = this.opt.height;
        this.is_overflow = this.opt.is_overflow ? 'hidden' : 'visible';
        this.pos = this.opt.is_fix ? 'fixed' : 'absolute';
        this.$doc = $(document);
        this.$win = $(window);
        this.closeOther = this.opt.closeOther;
        if(this.closeOther){
            $('.lxc_mobpop').each(function(){
                if($(this).find('[relationson]').length){
                    $(this).find('[relationson]').appendTo($("[relationfather='" + $(this).find('[relationson]').attr('relationson') + "']")).removeAttr('relationson').parent().removeAttr('relationfather');;
                }
                $(this).remove();
            })
        }
        if(this.opt.elementClone){  // 是克隆代码
            this.element = $(this.opt.element).prop('outerHTML') || '';
        }else{  // 不用克隆代码 用页面中的代码
            if(this.opt.element != ''){
                this.element = $(this.opt.element);
                var $par = this.element.parents('.lxc_mobpop');
                if($par.length){
                    if($par.find('[relationson]').length){
                        $par.find('[relationson]').appendTo($("[relationfather='" + $par.find('[relationson]').attr('relationson') + "']")).removeAttr('relationson').parent().removeAttr('relationfather');;
                    }
                    $par.remove();
                }
                var str = "parent_class_" + (this.element.parent().attr('class') || '') + (this.element.parent().attr('id') || '') + new Date().getTime();
                this.element.attr('relationson', str);
                this.element.parent().attr('relationfather', str);
            }else{
                this.element = '';
            }
        }
        this.$elementPar = (this.opt.elementClone || this.opt.element == '') ? '' : this.element.parent();
        this.demo = this.element == '' ? '<div>' + this.opt.demo + '</div>' : this.element;
        this.closeEle = this.opt.closeEle;
        this.bgClose = this.opt.bgClose;
        this.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        this._start();
    },
    _start: function(){
        var self = this;
        
        this.$wrapper = $('<div id="' + this.id + '" style="position: ' + this.pos + '; width: 100%; top: 0; left: 0; z-index: ' + this.zIndex + '" class="lxc_mobpop"></div>').appendTo($('body'));
        this.$bg = $('<div style="background: rgba(0,0,0,' + self.opt.bg_opacity + '); width: 100%; height: 100%; left: 0; top: 0; position: fixed;"></div>').appendTo(this.$wrapper);
        this.$demo = $(this.demo).prependTo(this.$wrapper).css({'position': this.pos, 'z-index': 10, 'display': 'none'});
        this.$win.css({'position': this.pos});
        // 执行回调
        this.opt.callback();
        // 定位
        this._position();
        // resize跟随定位
        if (!document.addEventListener) return;
        this.posFunc = function(){ self._position(self); };
        window.addEventListener(this.resizeEvt, this.posFunc, false);
        document.addEventListener('DOMContentLoaded', this.posFunc, false);
        // 选择器关闭弹层
        this.$closeEle = this.closeEle == '' ? {} : this.$wrapper.find(this.closeEle);
        if(this.$closeEle.length){
            this.$closeEle.on('click',function(){
              self._close();
            });
        }
        // 点击透明背景关闭弹层
        if(this.bgClose){
            this.$bg.on('click',function(){
                self._close();
            })
        }
    },
    _position: function(e){
        var self = e || this;
        self.topValue = self.top;
        self.leftValue = self.left;
        self.bottomValue = 'none';
        if(self.top == "center"){
            self.topValue = (self.$win.height() - self.$demo.height()) / 2;
        }else if(self.top == 'bottom'){
            self.topValue = '100';
            self.bottomValue = 0;
        }
        if(self.$demo.height() > self.$win.height() && self.top == "center") 
            self.topValue = (self.$demo.height() - self.$win.height()) / 2;
        if(!self.opt.is_fix && self.top == "center") 
            self.topValue += self.$doc.scrollTop();
        if(self.left == "center"){
            self.leftValue = (self.$win.width() - self.$demo.width()) / 2;
        }
        self.$demo.css({'left':self.leftValue, 'top':self.topValue, 'bottom': self.bottomValue, 'width': self.width, 'height': self.height, 'overflow': self.is_overflow}).show();
    },
    _close: function(){
        if(this.$wrapper){
            if(!this.opt.elementClone){
                this.$demo.appendTo(this.$elementPar);
                this.$demo.removeAttr('relationson').parent().removeAttr('relationfather');
            }
            this.$wrapper.remove();
            this.opt.closeCallback();
        }
    }
}