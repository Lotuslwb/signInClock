!function(){var n,e={},t=0,o=navigator.userAgent.toLowerCase(),c=window.jscall?"android":"ios";function r(n){return JSON.parse(n)}function a(n){return encodeURIComponent(n)}function s(n){return a((e=n,JSON.stringify(e)));var e}function u(n){return r(decodeURIComponent(n))}function l(n,e){return Array.prototype.slice.call(n,e||0)}function d(n,e,t){Object.defineProperty(n,e,{get:t})}function f(n,i){var o="cb_"+ ++t;return e[o]=function(){var t=l(arguments);n.apply(y,t),i||(e[o]=null)},o}function p(e){n&&document.documentElement.removeChild(n),(n=document.createElement("iframe")).setAttribute("width",0),n.style.display="none",n.setAttribute("src",e),document.documentElement.appendChild(n),setTimeout(function(){n&&document.documentElement.removeChild(n),n=null},0)}function h(n){if(/iting/i.test(o)){var e=l(arguments,1),t=e[e.length-1],i=!0,r="ios"==c,a=-1!==n.indexOf("_async"),s=-1!==n.indexOf("_long");if(n=n.replace(/(_async|_long)/g,""),"function"!=typeof t?(i=!1,void 0===t&&(e=e.slice(0,e.length-1))):e=e.slice(0,e.length-1),r||a){var u="null";i&&(u=f(t,s))}if(r){var d="jscall://"+n+"&"+u;try{o.match(/(iphone|ipad).* os (\d+\_\d+(\_\d+)*)/)[2].split("_")[0]>=10&&(d=d.replace(/^(jscall:\/\/)/,"$1xmly?"))}catch(n){}if(e)for(var h in e)d+="&"+e[h];p(d)}else{var y=window.jscall[n];if(a)e.unshift(u),y.apply(window.jscall,e);else{var m=y.apply(window.jscall,e);i&&t(m)}}}}var y={_schemeList:{default:"iting","com.gemd.iting":"itinggemd","com.qndzq.book":"itingqndzq","com.jima.yijingtingshu":"itingjima"},isAndroid:"android"==c,isIos:"ios"==c,setScheme:function(n){this._schemeList.hasOwnProperty(n)?this.device.scheme=this._schemeList[n]:this.device.scheme=this._schemeList.default},device:{name:"",version:"",platformVersion:"",uuid:"",uid:"",token:"",scheme:"iting"},registModule:function(n,e){var t=this;d(e,"$ref",function(){return t}),d(t,n,function(){return e})},toast:function(n){h("notificationToast",a(n))},copy:function(n){h("copy",a(n))},closeWebView:function(){h("closeWebView")},browse:function(n){h("browse",a(n))},login:function(n){h("login_async",function(e){n&&n.call(this,r(e))})},getNetworkStatus:function(n){h("getNetworkStatus_async",function(e){n&&n.call(this,r(e))})},getVersion:function(){return this.device.version||o.match(/(kdtunion_iting|iting|iting\(\w+\))\/(\d(\.\d{1,3}){2,3})/)[2]},ready:function(n){var e=this;h("appReady",function(t){var i=e.device;t=JSON.parse(t),i.platformVersion=t.platformVersion,i.name=window.jscall?"android":"ios",i.platform=t.platform,i.version=t.version,i.uuid=t.deviceId,i.uid=t.uid,i.token=t.token,i.idfa=t.idfa||"",n.call(e,i)})},onShare:function(n){!1===n?h("onShare"):h("onShare_async_long",function(){n&&n.call(this)})},share:function(n,e){h("share_async",s(n),function(n){e&&e.call(this,u(n))})},multiShare:function(n,e){h("multiShare_async",s(n),function(n){e&&e.call(this,u(n))})},_wrapFn:function(n,e){var t=!0;if("boolean"!=typeof e||e||(t=!1),"function"==typeof n)return f(n,t);if("object"==typeof n)for(var i in n)n[i]=this._wrapFn(n[i],e);return n},getScheme:function(n,e){var t=this.device.scheme,i=this.paramStr(e);return i.length>0&&(i="&"+i),t+"://open?msg_type="+n+i},open:function(n){/:\/\/open/.test(n)||(n=this.getScheme.apply(this,arguments)),p(n)}};y.registModule("recorder",{recorderEvents:{},addRecordText:function(n,e){h("addRecordText_async",s(n),function(){e&&e.apply(this,arguments)})},startRecord:function(n){h("startRecord_async",function(){n&&n.apply(this,arguments)})},pauseRecord:function(n){h("pauseRecord_async",function(){n&&n.apply(this,arguments)})},resumeRecord:function(n,e){h("resumeRecord_async",n,function(){e&&e.apply(this,arguments)})},stopRecord:function(n){h("stopRecord_async",function(){n&&n.apply(this,arguments)})},playVoice:function(n,e){h("playVoice_async",n,function(){e&&e.apply(this,arguments)})},pauseVoice:function(n,e){h("pauseVoice_async",n,function(){e&&e.apply(this,arguments)})},resumeVoice:function(n,e){h("resumeVoice_async",n,function(){e&&e.apply(this,arguments)})},stopVoice:function(n,e){h("stopVoice_async",n,function(){e&&e.apply(this,arguments)})},getUploadProgress:function(n,e){h("getUploadProgress_async",n,function(){e&&e.apply(this,arguments)})},uploadVoice:function(n,e){h("uploadVoice_async",n,"http://upload.ximalaya.com/dtres/audio/upload?callerSource=thirdparty",1,function(){e&&e.apply(null,arguments)})},_addEvent:function(n,e){var t=this;t.recorderEvents[n]=e,d(this,n,function(){return t.recorderEvents[n].bind(t.$ref)})},bind:function(n,e){if("object"==typeof n)for(i in n)this._addEvent(i,n[i]);else"string"==typeof n&&this._addEvent(n,e)}}),y.registModule("audio",{pause:function(n){h("audioPause",function(){n&&n.apply(this,arguments)})}});var m={getTitle:function(){var n=document.getElementsByTagName("title")[0].innerText;if(!window.jscall||!window.jscall.getTitle)return n;window.jscall.getTitle(n)},redirectTo:function(n){window.location.href=n},resizeWin:function(){window.resizeBy(0,0)},getCookie:function(n){var e=y.cookie(n)||"",t={};if(t[n]=e,!window.jscall||!window.jscall.passCookie)return e;window.jscall.passCookie(s(t))}};y.recorder&&d(m,"recorder",function(){return y.recorder}),window.ya=y,window.nativeCallBack=e,window.nativeCall=m}();