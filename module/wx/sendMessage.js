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
                callback && callback(response);
            }
        }
    );
}

var WxSendMessage = function (data) {

    console.log(data, 'WxSendMessage');

    var getSDKSign = require('./getSDKSign');
    var originalUrl = '';

    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
        var SendMessageUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
        getWebContent(SendMessageUrl, 'POST', data, function (response) {

            console.log(response.body);
            console.log('---消息推送 成功--');
        });
    });
}


module.exports = WxSendMessage;
