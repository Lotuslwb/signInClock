var adaptUILayout=function(){var e=function(){var e={},t={width:window.screen.width,height:window.screen.height},n=window.navigator.appVersion,i=null,a=function(e){return e.constructor==String?n.indexOf(e)>-1:n.test(e)},r=function(t,n,i){t&&n&&(e[t]={key:n,size:i})},d=function(t){e[t]&&delete e[t]},o=function(){if(null!=i)return i;for(var n in e)if(a(e[n].key)){i=e[n].size;break}return null==i&&(i=t),i};return{add:r,del:d,cal:o}}(),t=function(t){var n,i,a,r,d,o,u;u=navigator.userAgent.toLowerCase(),isiOS=u.indexOf("ipad")>-1||u.indexOf("iphone")>-1,i=window.devicePixelRatio,n=e.cal().width,a=t/n*i*160,r=isiOS?"target-densitydpi=device-dpi, width="+t+"px, user-scalable=no":"target-densitydpi="+a+", width="+t+", user-scalable=no",d=document.getElementsByTagName("head"),o=document.createElement("meta"),o.name="viewport",o.content=r,d.length>0&&d[d.length-1].appendChild(o)};return{regulateScreen:e,adapt:t}}();adaptUILayout.adapt(640);