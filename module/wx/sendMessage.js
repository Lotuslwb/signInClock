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


module.exports = function (data, cb) {
    var getSDKSign = require('./getSDKSign');
    var originalUrl = '';

    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
        var SendMessageUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
        getWebContent(SendMessageUrl, 'POST', data, function (response) {
            cb && cb(response);
            //console.log(response.body);
            if (response.body.errcode == '0') {
                // console.log('---消息推送 成功--');
            }
        });
    });
};
