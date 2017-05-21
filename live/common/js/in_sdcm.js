/**
 * Created by zl on 2016/3/24.
 * for webtrends tracking code
 */
function loadWTScript(a,b){var c=document.createElement("script");c.type="text/javascript",c.id = "wtjs",c.async=!0,c.src=a,dcsReady(c,b),document.getElementsByTagName("head")[0].appendChild(c)}
function dcsReady(a,b){a.readyState?"loaded"==a.readyState||"complete"==a.readyState?(a.onreadystatechange=null,b()):a.onreadystatechange=function(){("loaded"==a.readyState||"complete"==a.readyState)&&(a.onreadystatechange=null,b())}:a.onload=function(){b()}}
if(document.getElementById("wtjs")==null){
  loadWTScript("/amsact/activityWebApp/common/js/sdc_m.js", function(){
    if (typeof(_tag) != "undefined"){
      var s=_tag.dcsGetIdAsync();
      if(s)
        dcsReady(s,function(){_tag.dcsCollect()});
      else
        _tag.dcsCollect();
    }
  })}

