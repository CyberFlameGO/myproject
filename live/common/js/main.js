$(function(){
	var shared = JSON.parse( window.LS.get('shared') ||'{}');
    $('.btnright.pull-right').attr('href','../insurance/index.html'+'?'+serialize( shared ));
;
    	 
 });