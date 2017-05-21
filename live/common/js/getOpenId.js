$(function(){
	var data = parseUrlParam();

	data = data || {};
	// alert(data);
//	 alert(data.state);
	if(data.token){
		var userToken = {userToken:data.token};
		userToken = JSON.stringify(userToken);
		$.ajax({
			url:'/elifeweb/getWXServiceOpenId.do',
			type:'GET',
			data:{'userToken':userToken},
			dataType :'json',
			async: false,
			success:function(r){
				// alert('openId='+r.openid);
				if(r.data){
					data.openId = r.data.userID;
					window.LS.set( 'shared', JSON.stringify( data, null, "" ));
				}
				$('body').show();
			},
			error:function (xhr, textStatus, e) {
				// alert(e);
				$('body').show();
			}
		});
	}
	
	if(data.state){
		//获取openId的时候屏蔽页面
		$('body').hide();
		
		//根据微信api 获取openId
		var vvv = parseUrlParam();
//			alert('分享过来的。。。。。。');
		var code = getUrlParameter('code');
		var state = getUrlParameter('state');
		// alert(state);
		//前海会过来的
//		var userToken =getUrlParameter('userToken');
		// alert('code--'+code);

		
		if(code){
			$.ajax({
				//url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx58324bcceb2b1204&secret=ebe4c052967985a566d6a4eb97b7525e&code='+code+'&grant_type=authorization_code',
				url:'/elifeweb/getWXServiceOpenId.do',
				type:'GET',
				data:{'code':code,'state':state},
				dataType :'json',
				async: false,
				success:function(r){
					// alert('openId='+r.openid);
					if(r.openid){
						data.openId = r.openid;
						window.LS.set( 'shared', JSON.stringify( data, null, "" ));
					}
					$('body').show();
				},
				error:function (xhr, textStatus, e) {
					// alert(e);
					$('body').show();
				}
			});
		}
		//window.location.href='https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx58324bcceb2b1204&secret=ebe4c052967985a566d6a4eb97b7525e&code='+code+'&grant_type=authorization_code';
	}



	//有数据才更新，避免被清除
	if(data && data.openId){
		//alert(JSON.stringify(data));
		window.LS.set( 'shared', JSON.stringify( data, null, "" ));
	}
	var shared = JSON.parse( window.LS.get('shared') ||'{}');
	

         //判断是否已经关注
      syncData("attention-or-not.do","post",{openId:shared.openId},function(success,data){
        if (success == true) {
          if (data.flag == 100) {//已关注
          }else{//未关注，跳转到关注页面
            window.location.href = 'http://mp.weixin.qq.com/s?__biz=MjM5MTY5NzE1Mw==&mid=200695233&idx=1&sn=44c03ba244adf7c69773c8b8bd66ee19#rd';
          }

        }else{
          $("#error-msg").text(data);
        }
      },true);
    	
	/*
	if(!shared.openId){
		$.dialog({
			title: '错误',
			content:  '请在微信环境中访问！',
			cancel: false,
			ok: '确认',
			cancelCB: null,
			okCB: null
		});
	}
	*/
 
	
});



