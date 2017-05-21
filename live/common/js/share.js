(function() {
	function onBridgeReady() {
		var appId = '';
		var imgUrl = site + "/elifeweb/insurance/images/xrhk.jpg"; 
		var openId = JSON.parse( window.LS.get( 'shared' ) ).openId;
		var link = childLink;
		var title = "父母必看，宝贝必备——拥有安佑保障，宝贝成长无忧！"; 
		var desc = "25倍基本保额的重大疾病保额，40种重大疾病保障，满期按所交保费的100%给付满期保险金。";
		//发送给好友; 
		WeixinJSBridge.on('menu:share:appmessage', function(argv) {
			WeixinJSBridge.invoke('sendAppMessage', {
				"appid" : appId,
				"img_url" : imgUrl,
				"img_width" : "640",
				"img_height" : "640",
				"link" : link,
				"desc" : desc,
				"title" : title 
			}, function(res) {
   //          var reqBody = {
   //          	openId:openId
   //          }; 
			// $.ajax({
   //          url: '/elifeweb/custom-info.do',
   //          type: 'get',
   //          data:  JSON.stringify( reqBody ),
   //          dataType: 'json',

   //            success : function(res) {
   //              		var count = '1';
			// 		window.LS.set('wxMaik', count);
                
   //          },
   //          error : function () {
                 
   //          }

   //      });
			});
		});

		// 分享到朋友圈;
		WeixinJSBridge.on('menu:share:timeline', function(argv) {
			WeixinJSBridge.invoke('shareTimeline', {
				"appid" : appId,
				"img_url" : imgUrl,
				"img_width" : "640",
				"img_height" : "640",
				"link" : link,
				"desc" : desc,
				"title" : title
			}, function(res) {
			});
		});
		
		// 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
        	WeixinJSBridge.invoke('shareWeibo',{
        	  "content" : title + link,
        	  "url"     : link
        	  }, function(res) {
        	  });
        	});
		
	}

	if(document.addEventListener){
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	}else if(document.attachEvent){
		document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
	}
})();