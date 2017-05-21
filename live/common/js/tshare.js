(function() {
	function onBridgeReady() {
		var appId = '';
		// var imgUrl = "http://shop.foresealife.com/elifeweb/insurance/images/jufu3hao.jpg"; 
		var imgUrl = site + "/elifeweb/insurance/images/jufu3hao.jpg"; 
		var openId = JSON.parse( window.LS.get( 'shared' ) ).openId;
		// var link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx58324bcceb2b1204&redirect_uri=http%3a%2f%2fshop.foresealife.com%2felifeweb%2finsurance%2fjfthreeInfo.html%3frecommendId%3d"+openId+"&response_type=code&scope=snsapi_base&state=openId#wechat_redirect";
		var link = jfThreeLink;
		var title = "聚富有道，保本高收益，理财首选聚富三号"; 
		var desc = "保本高收益，预期年化收益6.48%，1年后领取零费用，门槛低无手续费，特享身故保障，在线领取等尊贵服务。";
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