(function(e){function t(t){for(var r,c,u=t[0],i=t[1],s=t[2],f=0,l=[];f<u.length;f++)c=u[f],a[c]&&l.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(l.length)l.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},c={app:0},a={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-08525ceb":"9aa0cc14","chunk-1fca24cc":"6d6041e2","chunk-21ec591f":"14d073ac"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-08525ceb":1,"chunk-1fca24cc":1,"chunk-21ec591f":1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-08525ceb":"10fc30b3","chunk-1fca24cc":"8210116a","chunk-21ec591f":"1cb02846"}[e]+".css",a=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===a))return t()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){s=l[u],f=s.getAttribute("data-href");if(f===r||f===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.request=r,delete c[e],d.parentNode.removeChild(d),n(o)},d.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){c[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=o);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e),s=function(t){f.onerror=f.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+r+": "+c+")");o.type=r,o.request=c,n[1](o)}a[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/efkids2/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=f;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"4f73":function(e,t){e.exports="data:image/png;base64,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"},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],o=n("9579"),u=n.n(o),i={mounted:function(){u.a.init({sid:"500670641",cid:"500670642",autoReport:1,senseHash:1,senseQuery:1,performanceMonitor:0,ignoreParams:[]})}},s=i,f=(n("7c55"),n("2877")),l=Object(f["a"])(s,c,a,!1,null,null,null),d=l.exports,h=n("8c4f"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("van-row",{attrs:{type:"flex"}},[r("van-col",{staticClass:"cell-logo"},[r("img",{staticClass:"logo",attrs:{src:n("4f73")}})])],1),r("van-row",{staticClass:"cell-btn",attrs:{type:"flex",justify:"center"}},[r("van-col",[r("router-link",{attrs:{to:"/selectcountry"}},[r("img",{staticClass:"enter-btn",attrs:{src:n("ee59")}})])],1)],1)],1)},m=[],g=n("bc3a"),v=n.n(g),y=(n("6199"),{mounted:function(){u.a.pgv(),this.getSignature((function(e){wx.config({debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})})),wx.ready((function(){wx.onMenuShareTimeline({title:"定制宝贝环球足迹",link:"https://ma.eldesign.cn/efkids2/?CKTAG=mta_share.wechat_moments",success:function(){u.a.clickShare("wechat_moments"),u.a.clickStat("wechat_moments")}}),wx.onMenuShareAppMessage({title:"定制宝贝环球足迹",desc:"世界这么大，宝贝都去过哪些地方？",link:"https://ma.eldesign.cn/efkids2/?CKTAG=mta_share.wechat_friend",type:"",dataUrl:"",success:function(){u.a.clickShare("wechat_friend"),u.a.clickStat("wechat_friend")}})}))},methods:{getSignature:function(e){var t="https://ma.eldesign.cn/api/getWxSDK",n=window.location.href;v.a.get("".concat(t,"?originalUrl=").concat(n)).then((function(t){if(console.log(t),200==t.status){var n=t.data.data.wxConfig;e(n)}})).catch((function(e){console.log(e)}))},getRandomString:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=t.length,r="",c=0;c<e;c++)r+=t.charAt(Math.floor(Math.random()*n));return r}}}),A=y,b=(n("80f1"),Object(f["a"])(A,p,m,!1,null,"f32da82c",null)),w=b.exports;r["a"].use(h["a"]);var k=new h["a"]({mode:"history",base:"/efkids2/",routes:[{path:"/",name:"start",component:w},{path:"/selectcountry",name:"country",component:function(){return n.e("chunk-1fca24cc").then(n.bind(null,"5a73"))}},{path:"/upload",name:"upload",component:function(){return n.e("chunk-21ec591f").then(n.bind(null,"2679"))}},{path:"/passport",name:"passport",component:function(){return n.e("chunk-08525ceb").then(n.bind(null,"bc1a"))}}]}),j=(n("6762"),n("2fdb"),n("7f7f"),n("2f62"));r["a"].use(j["a"]);var T=new j["a"].Store({state:{name:"",photo:"",country_count:1,current_continent:["亚洲"],current_country:["中国"],continent:[{name:"亚洲",country:["中国","蒙古","朝鲜","韩国","日本","越南","老挝","柬埔寨","缅甸","泰国","马来西亚","新加坡","文莱达","菲律宾","印度尼西亚","东帝汶","哈萨克","吉尔吉斯","乌兹别克","塔吉克","土库曼","阿富汗","巴基斯坦","尼泊尔","不丹","印度","孟加拉国","斯里兰卡","马尔代夫","伊朗","伊拉克","科威特","沙特阿拉伯","巴林","卡塔尔","阿联酋","阿曼","也门","约旦","巴勒斯坦","以色列","叙利亚","黎巴嫩","土耳其","塞浦路斯","阿塞拜疆","格鲁吉亚","亚美尼亚"]},{name:"欧洲",country:["冰岛","巴德群岛","法罗群岛","丹麦","挪威","瑞典","芬兰","奥兰群岛","爱沙尼亚","拉脱维亚","立陶宛","爱尔兰","英国","法国","荷兰","比利时","卢森堡","德国","奥地利","瑞士","列支敦士登","葡萄牙","西班牙","直布罗陀","安道尔","摩纳哥","意大利","梵蒂冈","马耳他","圣马力诺","希腊","俄罗斯","白俄罗斯","乌克兰","波兰","捷克共和国","斯洛伐克","匈牙利","斯洛文尼亚","克罗地亚","波黑","波黑联邦","塞族共和国","塞尔维亚"]},{name:"非洲",country:["埃及","苏丹","利比亚","突尼斯","阿尔及利亚","摩洛哥","西撒哈拉","毛里塔尼亚","塞内加尔","冈比亚","马里","布基纳法索","佛得角","几内亚比绍","几内亚","塞拉利昂","利比里亚","科特迪瓦","加纳","多哥","贝宁","尼日尔","尼日利亚","圣赫勒拿","喀麦隆","赤道几内亚","乍得","中非共和国","加蓬","刚果布","刚果金","圣多美","安哥拉","厄立特里亚","埃塞俄比亚","吉布提","索马里","肯尼亚","乌干达","坦桑尼亚","卢旺达","布隆迪","马拉维","莫桑比克","马达加斯加","塞舌尔","科摩罗","马约特","毛里求斯","留尼汪","赞比亚","津巴布韦","博茨瓦纳","纳米比亚","南非","莱索托","斯威士兰"]},{name:"北美洲",country:["美国","墨西哥","加拿大","安圭拉","安提瓜","巴巴多斯","巴哈马","百慕大","巴拿马","波多黎各","伯利兹","阿鲁巴","波内赫","多米尼加","多米尼克","法属圣马丁","格林纳达","哥斯达黎加","瓜德罗普","古巴","海地","荷属圣马丁","洪都拉斯","开曼群岛","库拉索","马提尼克","美属维尔京","蒙塞拉特岛","尼加拉瓜","萨巴岛","萨尔瓦多","圣巴泰勒米","圣基茨","圣卢西亚","圣皮埃尔","圣文森特","圣尤斯特","特克斯","特立尼达","危地马拉","牙买加","英属维尔京"]},{name:"南美洲",country:["阿根廷","巴拉圭","巴西","秘鲁","玻利维亚","厄瓜多尔","法属圭亚那","福克兰群岛","哥伦比亚","圭亚那","苏里南","委内瑞拉","乌拉圭","智利"]},{name:"大洋洲",country:["澳大利亚","新西兰","巴布亚新","所罗门群岛","斐济群岛","瓦努阿图","新喀里多尼亚","北马里亚纳","关岛","密克罗尼西亚","帕劳","马绍尔群岛","基里巴斯","瑙鲁","图瓦卢","瓦利斯","托克劳","萨摩亚","美属萨摩亚","美属太平洋小岛","汤加","纽埃","库克群岛","法属波利尼西亚","皮特凯恩岛"]}]},mutations:{onInputName:function(e,t){e.name=t},onGetPhoto:function(e,t){e.photo=t},onSelectCountry:function(e,t){var n=t.name,r=t.country;if(e.current_country.includes(r)){var c=e.current_country.indexOf(r);e.current_country.splice(c,1);var a=e.current_continent.indexOf(n);e.current_continent.splice(a,1)}else e.current_country.push(r),e.current_continent.push(n);var o=e.current_country.length;e.country_count=o}},actions:{}}),P=(n("433b"),n("d399")),Z=(n("9eda"),n("565f")),M=(n("b342"),n("ad06")),x=(n("d707"),n("8f80")),S=(n("c625"),n("b650")),B=(n("4826"),n("f9bd")),X=(n("78a2"),n("1437")),E=(n("3ec1"),n("7744")),O=(n("2a53"),n("34e9")),G=(n("4bc8"),n("d1e1")),H=(n("47d1"),n("9ffb"));r["a"].use(G["a"]).use(H["a"]),r["a"].use(E["a"]).use(O["a"]),r["a"].use(B["a"]).use(X["a"]),r["a"].use(S["a"]),r["a"].use(x["a"]),r["a"].use(M["a"]),r["a"].use(Z["a"]),r["a"].use(P["a"]),r["a"].config.productionTip=!1,new r["a"]({router:k,store:T,render:function(e){return e(d)}}).$mount("#app")},"5c04":function(e,t,n){},"5c48":function(e,t,n){},"7c55":function(e,t,n){"use strict";var r=n("5c48"),c=n.n(r);c.a},"80f1":function(e,t,n){"use strict";var r=n("5c04"),c=n.n(r);c.a},ee59:function(e,t,n){e.exports=n.p+"img/enterBtn.860a5291.png"}});
//# sourceMappingURL=app.54a45e23.js.map