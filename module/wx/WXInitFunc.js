var WXInitFunc = function () {
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
                "name": "小E聊天",
                'type': 'view',
                'url': 'http://www.soso.com',
            }, {
                'name': '免费初体验',
                'type': 'view',
                'url': 'http://www.ef.com.cn/englishfirst/landing/lifeclub?etag=EFCN_KidsOwn-SNS-WeChatService-menu-wclh',
            }]
    };
    api.createMenu(Menu, function (result) {
        console.log(result);
    });

}


module.exports = WXInitFunc;
