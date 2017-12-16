var WXInitFunc = function () {
    var wxConfig = require('../wx/WXConfig');
    var WechatAPI = require('wechat-api');
    var api = new WechatAPI(wxConfig.APPID, wxConfig.APPSECRET);
    var Menu = {
        "button": [
            {
                "name": "英语宝典",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "趣味英语",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=1&sn=624e4e6dbb5c0aaf3efe2a453f160536&uin=MjEzMDQ1MzkwNA==&key=4c9db2d052ce2383cc361b3e62fd8a75bef8a8348faa38dd2bef3e28ae11811e97ec3ae238acfed6b4197c0c2cff7155b50bc1a0e546ff6097ecf1e033dfa731e7042f47ba5f7c8a89f7ffa0bcf29b56&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    },
                    {
                        "type": "view",
                        "name": "家长课堂",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=2&sn=ff4d86022b7ebc3a8358801950887e8e&uin=MjEzMDQ1MzkwNA==&key=4c9db2d052ce2383123a217167097281a9344fab4bf30da46fe12ddab9176d5a9b11131ecdd6ac7f708595b82ce522eb399bf5d298467265bf6e06bb1743a1268c69ca606224ec5d2268c957b41f033c&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "小E推荐",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=3&sn=bbd503ec52d1204cd3d68ccb8d202ea4&uin=MjEzMDQ1MzkwNA==&key=0ff5f4477b17d5ed29397ee4f9a8ee1ba9e1432b7de989f967fa3280eb0af56201efe2ae7057a58d8b9d46d3e44edf09e602fb923369b067d2155b5d91089544c32ae5fe03970172c03678ce6a6551ea&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "影音视听",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=4&sn=9e2ce18a97a1ec8c8e8d707dd54b9e7d&uin=MjEzMDQ1MzkwNA==&key=fc73eacee3c8d91fca74be0cb53503a79f3af4d8ecbdabb5cd21dfc5d13dd6c0c201877c9b081fbe91f8a659460a14529c4c19d027b668697d53055823204c323f545fc46ea851d3941f0e2846a9930a&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    }, {
                        "type": "view",
                        "name": "一键搜索更多内容",
                        "url": "http://data.newrank.cn/m/s.html?s=NyoqNjQ6LjA8"
                    }]
            },
            {
                "name": "最新优惠",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "最新优惠",
                        "url": "http://www.ef.com.cn/englishfirst/landing/mobilewinter17b?pid=c8cd260e2a5196a3675ac5f5b9aa9c3f&etag=EFCN_Wint17_KidsOwn-SNS-WeChat-Menu-Freecourse-testcn_mobilewinter17B"
                    }, {
                        "type": "view",
                        "name": "预约免费活动课",
                        "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?ctr=cn&lng=cs&name=anna&pid=123&phone=110&etag=EFCN_Wint17_KidsOwn-SNS-WeChat-Nov-wclh"
                    }, {
                        "type": "view",
                        "name": "你的名字也有故事",
                        "url": "http://nametale.ef.com.cn/mobile/index.html?etag=EFCN_Wint18_KidsOwn-SNS-Nametale-WeChatbanner"
                    }, {
                        "type": "view",
                        "name": "往期精彩活动",
                        "url": "https://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDkyMTk5MQ==&hid=5&sn=d968d2083ae08f7bfc02ea71f53d15b1&uin=MjEzMDQ1MzkwNA==&key=0ff5f4477b17d5edc25a2df08060b821162378e849a45052dcaa557c3983e2c8f9a8752a53bc6a21d15f0630455fd46411a54c66d1356f6a275b9876ccbf2c446400122b3700ced2853a33ee6a403eed&devicetype=iOS10.2&version=16050321&lang=zh_CN&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU&wx_header=1&scene=1"
                    },
                ]
            }, {
                "type": "view",
                "name": "阅读打卡",
                "url": "https://ma.eldesign.cn/daka/index"
            }]
    };
    api.createMenu(Menu, function (result) {
        console.log(result);
    });
}
WXInitFunc();

/*
 * {
 "type": "click",
 "name": "赞一下我们",
 "key": "V1001_GOOD"
 }
 */

module.exports = WXInitFunc;
