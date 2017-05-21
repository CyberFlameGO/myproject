var $window = $(window),
    viewHeight = $window.height();
sessionStorage.setItem('getlistDataLength', 0);
//小海动画
//jQuery.loading('');
getOpenId(mainDo);
share();

function mainDo() {
	//小海动画
	window.setTimeout('jQuery.loading.hide()', 600);
	//banner
	requirejs(['swiper'], function() {
		var	$banner = $('.swiper-wrapper'),
				jsondata = {
					'json' : '{"channel" : "' + CHANNEL + '"}'
				},
				list = [];

		$.ajax({
			url: checkUrl + 'queryLiveBanner.service',
	    type: 'POST',
	    async: false,
	    data: jsondata,
	    success: function(data){
				var data = JSON.parse(data);
				bannerList = data.bannerList;
				if(data.flag == 200) {
					for(var i = 0; i < bannerList.length; i++) {
						var item = '<div class="swiper-slide banner-wrapper" style="background:url(' + bannerList[i].bannerImageUrl + ') no-repeat center center; background-size: 100%;"><a class="link" link-data="' + bannerList[i].bannerLinkUrl + '" roomCode-data="' + bannerList[i].roomCode + '"></a></div>'
						list.push(item);
					}
					$banner.html(list);
					var swiper = new Swiper('.swiper-container', {
				    pagination : '.swiper-pagination',
				    preventClicks : false,
				    autoplay : 4000
				  });
				}else if(data.flag == 400) {
					salert('参数未定义');
				}else {
					salert('服务器开小差了！')
				}
	    }
		})
	});

	//list
	getInitItem(0, 3, 3, function(){
		requirejs(['dropload'], function(){
			var msg = sessionStorage.getItem('initMoreWrapper');
			dropload(msg);

			//点击连接
			$('.link').on('click', function(){
				var roomCode = $(this).attr('roomCode-data'),
						link = $(this).attr('link-data');
				turnLink(roomCode, link);
			});
		});
	});
}

// dropload
function dropload(msg){
	$('.content').dropload({
	  scrollArea : window,
	  autoLoad: false,
	  domDown : {
      domClass   : 'dropload-down',
      domRefresh : '<div class="dropload-refresh more-wrapper"><span class="desc">'+msg+'</div>',
      domLoad    : '<div class="dropload-load more-wrapper"><span class="loading"></span>加载中...</div>',
      domNoData  : '<div class="dropload-noData more-wrapper">没有更多视频了</div>'
	  },
	  loadDownFn : function(me){
	      var start = parseInt(sessionStorage.getItem('getlistDataLength')) || 0,
						sel = 5,
						end = start + sel;
				getItem(start, end, sel, me);
	  },
	  threshold : 50
	});
}

function getItem(startCount, endCount, sel, dropload) {
	var jsondata = {
				'json' : '{"selCount":'+ startCount +',"selSize":' + sel + '}'
			},
			$live = $('.live'),
			list = [],
			isShow = '';//比较时间，是否在直播时段
	
	sessionStorage.setItem('getlistDataLength', endCount);
	$.ajax({
			url: checkUrl + 'queryLiveList.service',
	    type: 'POST',
	    async: true,
	    data: jsondata,
	    success: function(data){
				var data = JSON.parse(data);
				if(data.flag == 200){
					var listData = data.liveList;
					
					for (var i = 0; i < listData.length; i++) {

						var time = listData[i].liveBeginTime.substring(0,10).replace(/\-/g, '\/');
						isShow = (listData[i].liveState == 1) ? 'show' : 'notshow';
						list += '<li class="detail" style="background:url(' + listData[i].remark + ') no-repeat center center; background-size: 100%;"><i class="icon-live ' + isShow + '"></i><div class="desc"><span class="title">' + listData[i].roomName + '</span><span class="rate"><i class="icon-rate"></i><span class="num">' + listData[i].watchNumber + '</span></span><span class="time">' + time + '</span></div><a class="link" link-data="' + listData[i].roomLink + '" roomCode-data="' + listData[i].roomCode + '"></a></li>';
					}
					$live.append(list);
					
					if(sel != listData.length) {
						// 锁定
            dropload.lock();
            dropload.noData();
					}
					dropload.resetload();
				}
			}
	});
}

function getInitItem(startCount, endCount, sel, callback) {
	var jsondata = {
				'json' : '{"selCount":'+ startCount +',"selSize":' + sel + '}'
			},
			$live = $('.live'),
			list = [],
			isShow = '';//比较时间，是否在直播时段
	
	sessionStorage.setItem('getlistDataLength', endCount);

	$.ajax({
			url: checkUrl + 'queryLiveList.service',
	    type: 'POST',
	    async: true,
	    data: jsondata,
	    success: function(data){
				var data = JSON.parse(data);
				if(data.flag == 200){
					var listData = data.liveList;
					var moreWrapper = (listData.length < sel) ? (listData.length == 0 ? '小海目前没有新的直播' : '没有更多视频了') : '更多视频</span><i class="icon-more"></i>';
					sessionStorage.setItem('initMoreWrapper', moreWrapper);

					for (var i = 0; i < listData.length; i++) {

						var time = listData[i].liveBeginTime.substring(0,10).replace(/\-/g, '\/');

						isShow = (listData[i].liveState == 1) ? 'show' : 'notshow';
						list += '<li class="detail" style="background:url(' + listData[i].remark + ') no-repeat center center; background-size: 100%;"><i class="icon-live ' + isShow + '"></i><div class="desc"><span class="title">' + listData[i].roomName + '</span><span class="rate"><i class="icon-rate"></i><span class="num">' + listData[i].watchNumber + '</span></span><span class="time">' + time + '</span></div><a class="link" link-data="' + listData[i].roomLink + '" roomCode-data="' + listData[i].roomCode + '"></a></li>';
					}
					$live.append(list);
						callback();
				}
			}
	});
}

function turnLink(roomCode, link) {
	jQuery.loading('');
	var	openId = localStorage.getItem('openId'),
			dataJson = {
				'json' : '{"openId" : "' + openId + '", "roomCode" : "' + roomCode + '"}'
			};
	syncData('isSubscribe.service', 'post', dataJson, function(data){
		window.setTimeout('jQuery.loading.hide()', 10);
		var data = JSON.parse(data);
		if(data.flag == 200) {
			location.href = link;
		}else if(data.flag == 201){
			popStatu.care();
		}else if(data.flag == 400){
			salert('参数未正确定义');
		}else if(data.flag == 500){
			salert('服务器开小差');
		}else{
			salert(ERRORPROMPT);
		}
	})
}