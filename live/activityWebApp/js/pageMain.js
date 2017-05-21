requirejs.config({
	paths: {
		jquery: "../../common/js/jquery-1.10.1.min", // jquery库
		zepto: "../../common/js/zepto", // zepto库
		common: "../../common/js/common", // 共同脚本
		Utility: "../../common/js/Utility", // 公用脚本部件
		dialog: "../../common/js/dialog", // 对话框组件
		validateDIY: "../../common/jquery.validation/jquery.validationEngine-zh_CN", // 验证自定义
		validate: "../../common/jquery.validation/jquery.validationEngine", // 验证插件
		mobiscroll: "../../common/js/mobiscroll.2.13.2", // 下拉插件
		qrcode: "../../common/js/jquery.qrcode.min", // 二维码生成插件
		weixin: "https://res.wx.qq.com/open/js/jweixin-1.0.0", // 微信API
		sdcm: "../../common/js/in_sdcm", // webtrends
		sdc_m: "../../common/js/sdc_m", // webtrends
		mobpop: '../../common/js/mobpop', // 弹层插件
		mobalert: '../../common/js/mobalert', // 提示插件
		font: "../../common/js/font", // px和rem互转
		scroll: "jquery.lxcscroll", // 滚动插件
		scrollBar: "jquery.nicescroll", // 滚动条
		swiper: "swiper.jquery.min", //轮播图插件
    dropload : "dropload.min" //滑动刷新插件
	},
	shim: {
		'dialog': ['jquery'],
		'mobpop': ['jquery'],
		'mobalert': ['jquery'],
		'scroll': ['jquery'],
		'scrollBar': ['jquery'],
		'validateDIY': ['jquery'],
		'validate': ['validateDIY'],
		'mobiscroll': ['jquery'],
		'qrcode': ['jquery'],
		'common': ['jquery'],
		'Utility': ['common'],
		'swiper': ['jquery'],
    'dropload': ['jquery']
	},
	urlArgs: "date=20170413"
});

var wx,
    checkUrl = 'http://vtest.foreseamall.com/activityWeb/',//测试
    SHAREIMG = 'http://vtest.foreseamall.com/amsact/activityWebApp/', //测试
    openId = 'oS__0viNCvi2ktiGzBJMQnr9F-gM',//本地
    /*checkUrl = 'http://10.100.206.19:8082/activityWeb-uat/',//本地
    shareImg = 'http://vtest.foreseamall.com/amsint/activityWebApp/', //本地
    openId = localStorage.getItem('openId') || '', //测试
    checkUrl = 'https://v.foreseamall.com/activityWeb/',//生产
    SHAREIMG = 'https://v.foreseamall.com/amsact/activityWebApp/', //生产
    openId = localStorage.getItem('openId') || '', //生产*/
    //code = getUrlParameter('code'),
    //recommendId = getUrlParameter('recommendId') || '',
    CHANNEL = 'live', // 活动编号
    CHILDCHANNEL = 'live001', //活动子编号
    CHILDCHANNEL2 = 'live002', //活动子编号
    NOINTERNETPROMPT = "连接失败，请稍后重试", // 用户网络连接失败时提示
    ERRORPROMPT = "连接异常，请稍后重试", // 程序异常时提示
    BACKTIMER = '', // 倒计时
    ENDED = false, // 活动是否结束
    CARED = false; // 是否已经调用过一次关注接口

requirejs(['weixin'], function(str) {
	wx = str;
});
requirejs(['font', 'dialog', 'mobpop', 'sdcm', 'sdc_m']);
requirejs(['Utility', 'mobpop', 'mobalert'], function() {
  jQuery.loading('');
	// 首页
	if ($('.body-index').length) {
		requirejs(['index']);
	}
});

// 提示
function salert(val) {
    return new MobileAlert({
        text: val,
        time: 3800 //停留时间
    });
}

//分享
function share() {
	var openId = localStorage.getItem('openId'),
			jsondata = "{\"openId\":\"" + openId + "\",\"url\":\"" + location.href.split('#')[0] + "\",\"channel\":\"" + CHANNEL + "\"}";
  $.ajax({
    url: checkUrl + 'getShareParam.service',
    type: 'POST',
    data: {
        "json": jsondata
    },
    async: false,
    complete: function(coordinates) {
        var result = coordinates,
            nickName = (JSON.parse(result.responseText)).nickName,
            APPID = (JSON.parse(result.responseText)).appId;

        var title = '号外！号外！小海直播开始了！！',
						title1 = title,//分享给朋友
						title2 = title,//分享到朋友圈
						desc = '小海邀请你进入前海人寿直播间',//分享文案
						imgUrl = SHAREIMG + 'live/activityWebApp/images/share.jpg',//分享图片
        		//link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=http%3a%2f%2fvtest.foreseamall.com%2famsact%2factivityWebApp%2flive%2factivityWebApp%2findex.html%3frecommendId%3d" + openId + "&response_type=code&scope=snsapi_base&state=openId#wechat_redirect"; //连接测试
            link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=https%3a%2f%2fv.foreseamall.com%2famsact%2factivityWebApp%2flive%2factivityWebApp%2findex.html%3frecommendId%3d" + openId + "&response_type=code&scope=snsapi_base&state=openId#wechat_redirect"; //连接
        wx.config({
          debug: false,
          appId: (JSON.parse(result.responseText)).appId,
          timestamp: (JSON.parse(result.responseText)).timestamp,
          nonceStr: (JSON.parse(result.responseText)).nonce_str,
          signature: (JSON.parse(result.responseText)).signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'translateVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard',
            'checkJsApi'
          ]
        });

        wx.ready(function() {
          wx.hideMenuItems({
          menuList: [
              'menuItem:exposeArticle:editTag',
              'menuItem:setFont',
              'menuItem:dayMode',
              'menuItem:nightMode',
              'menuItem:refresh',
              'menuItem:profile',
              'menuItem:addContact',
              'menuItem:share:qq',
              'menuItem:share:weiboApp',
              'menuItem:favorite',
              'menuItem:share:facebook',
              'menuItem:share:QZone',
              'menuItem:editTag',
              'menuItem:delete',
              'menuItem:copyUrl',
              'menuItem:originPage',
              'menuItem:readMode',
              'menuItem:openWithQQBrowser',
              'menuItem:openWithSafari',
              'menuItem:share:email',
              'menuItem:share:brand'
          ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
          title: title1, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // alert('微信分享成功');
            // 用户确认分享后执行的回调函数
            // alert("friend: success");
          },

          cancel: function() {
            // alert('微信分享取消');
            // 用户取消分享后执行的回调函数
            // alert("friend: cancel");
          }

        });

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
          title: title2,
          link: link,
          imgUrl: imgUrl,
          success: function() {
            // 用户确认分享后执行的回调函数
            // alert("circle: success");
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert("circle: cancel");
          }
        });
      });
    }
  });
}

//获取openID
function getOpenId(callback) {
	var code = getUrlParameter('code'),
			jsondata = {
		    "json": "{\"state\":\"openId\",\"code\":" + code + ",\"channel\":\"" + CHANNEL + "\"}"
			};

	syncData('initLive.service', 'post', jsondata, function(data){
    var data = JSON.parse(data);
		if (data.openId != undefined && data.openId != '' && data.openId != 'undefined') {
		  localStorage.setItem('openId', data.openId);
		}
		if (data.flag == 000) {
		  salert('活动未开始')
		} else if (data.flag == 003) {
		  salert('活动已结束')
		} else if (data.flag == 005) {
		  salert('活动已结束')
		} else if (data.flag == 002) {
		  salert('活动暂停')
		} else if (data.flag == 101) {
		  salert('用户或者ip黑名单')
		}/* else if (data.flag == 102) {
		  if ((starY.substring(0, 1) == 0) && (endY.substring(0, 1) == 0)) {
	      starY = starY.substring(1, 2) + '.' + starY.substring(3, 5);
	      endY = endY.substring(1, 2) + '.' + endY.substring(3, 5);
	      $('.startTime').text(starM + '.' + starY);
	      $('.endTime').text(endM + '.' + endY);
		  } else {
	      $('.startTime').text(starM + '.' + starY);
	      $('.endTime').text(endM + '.' + endY);
		  }
		} */else if (data.flag == 103) {
		  salert('用户状态不可用')
		} else if (data.flag == 104) {
		  salert('无效openId')
		} else if (data.flag == 500) {
		  salert('服务器开小差, 请稍候再试!')
		} else if (data.flag == 501) {
		  salert('活动已结束')
		}
    callback();
	})
}

// 弹层系数
var popStatu = (function() {
    var pub_bg_opacity = .7,
        pub_zIndex = 1000,
        closeFunc = function() {
            jQuery('.vali_ipt').val('');
            jQuery('.formError').remove();
        },
        situation = {
            closeAll: function() { // 关闭所有弹层
                var a = new MobilePop({
                    bg_opacity: 0,
                    zIndex: pub_zIndex + 1,
                    closeOther: true,
                    demo: '',
                    closeCallback: closeFunc
                });
                a._close();
            },
            care: function() { // 关注
                return new MobilePop({
                    bg_opacity: pub_bg_opacity,
                    zIndex: pub_zIndex,
                    bgClose: false,
                    top: 0,
                    closeEle: '.close',
                    demo: [
                      '<section class="care">',
                        '<span class="close"></span>',
                        '<span class="desc">要成为"前海人寿"粉丝才可以观看哦</span>',
                        '<span class="btn" id="care-btn"></span>',
                      '</section>'
                    ].join(''),
                    callback: function() {
                      //点击关注
                      $('#care-btn').on('click', function(){
                        console.log(1);
                        location.href = 'http://mp.weixin.qq.com/s?__biz=MjM5MTY5NzE1Mw==&mid=200695233&idx=1&sn=44c03ba244adf7c69773c8b8bd66ee19#rd';
                      })
                    }
                });
            }
        };
    return situation;
})();