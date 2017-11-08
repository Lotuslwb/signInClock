var request = require('request');
var getWebContent = function (uri, method, data, callback) {
    method = method || "POST";

    var requestdata = {
        "method": method,
        "uri": uri,
        "json": true
    };
    if (data) {
        requestdata['body'] = data;
        requestdata['qs'] = data;

    }
    request(requestdata,
        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                callback && callback(body);
            }
        }
    );
}

var WxSendMessage = function () {
    

    var getSDKSign = require('./getSDKSign');
    var originalUrl = '';

    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
        var SendMessageUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
        var data = getData();
        getWebContent(SendMessageUrl, 'POST', data, function (chunk) {
            console.log('---消息推送 成功--');

        });
    });
}

var getData = function () {
    var data = {
        "touser": "oKdUIuDXWO5Ek3IswpcRvESoOUVI",  //接收者openid
        "template_id": "vdlzK9Ik1kIaJEplGMQY5E8MwFZ14bQUkM-7OWHXQSE", //模板ID
        "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?etag=EFCN_Wint18_KidsOwn-SNS-KOL-Double11-H5",
        "data": {
            "first": {
                "value": "欢迎再次购买！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "徐家汇万圣节！",
                "color": "#173177"
            },
            "keyword2": {
                "value": "2014-12-15 10:00",
                "color": "#173177"
            },
            "remark": {
                "value": "请您准时到达，不见不散！",
                "color": "#173177"
            }
        }
    };
    return data;
}


module.exports = WxSendMessage;
