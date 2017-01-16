var WXInitFunc = function () {
    var wxConfig = require('../wx/WXConfig');
    var WechatAPI = require('wechat-api');
    var api = new WechatAPI(wxConfig.APPID, wxConfig.APPSECRET);
    var Menu = {
        "button": [
            {
                "name": "了解英孚",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "搜索",
                        "url": "http://www.soso.com"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }]
            },
            {
                "name": "与小E聊天",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "搜索",
                        "url": "http://www.soso.com"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }]
            }, {
                'name': '胡歌@你',
                "sub_button": [
                    {
                        "type": "view",
                        "name": "在英孚遇见胡歌",
                        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MDkyMTk5MQ==&mid=2650867319&idx=1&sn=5ee48d675fb5cdd721c1f4de377f3270&mpshare=1&scene=1&srcid=0116pynOO52YazSQK0BUibiR&key=dc8f4bb13741a2a441ab0e8a59d3aad14abb3cd395a00748fc8738c710f977b3875152351929264414aaea1dfac0b8120bf6a42be805c2bea03a94a89a9cf81d3c955eae70fed9daea6db62e5e5d90e0&ascene=0&uin=MjEzMDQ1MzkwNA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G31)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=h8OyVvvRfeiN2m7DiCpkKAcBaUzUQxy%2BpS8O%2FqcRsdfVoJh9V72eOrWsAc1RHKvU"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }]
            }]
    };
    api.createMenu(Menu, function (result) {
        console.log(result);
    });

}


module.exports = WXInitFunc;
