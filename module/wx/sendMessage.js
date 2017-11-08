function postHttps(URL, Data, cb) {
    var https = require('https');
    var url = require('url');
    var querystring = require('querystring');


    var post_option = url.parse(URL);
    post_option.method = "POST";
    post_option.port = 443;
    var post_data = querystring.stringify(Data);
    post_option.headers = {
        'content-type': 'application/json',
        'Content-Length': post_data.length
    };
    var post_req = https.request(post_option, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            cb && cb(chunk);
        });
    });
    post_req.write(post_data);
    post_req.end();
}


var WxSendMessage = function () {
    var getSDKSign = require('./getSDKSign');
    var originalUrl = '';

    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
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
        console.log(access_token);
        var SendMessageUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
        postHttps(SendMessageUrl, data, function (chunk) {
            var chunk = JSON.parse(chunk);
            console.log(chunk);
        })
    });
}


module.exports = WxSendMessage;
