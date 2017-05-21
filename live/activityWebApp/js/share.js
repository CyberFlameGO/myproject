
//分享
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
        		link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=http%3a%2f%2fvtest.foreseamall.com%2famsact%2factivityWebApp%2flive%2factivityWebApp%2findex.html%3frecommendId%3d" + openId + "&response_type=code&scope=snsapi_base&state=openId#wechat_redirect"; //连接
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