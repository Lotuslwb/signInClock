/*
 *   获取js-sdk 的各种签名信息
 *
 *
 * */

var https = require('https');


//微信sdk签名算法
var sign = require('../wx/sign');


var getSDKSign = function (APPID, APPSECRET, callback) {

    var getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;

    https.get(getTokenUrl, function (ress) {
        ress.on('data', function (chunk) {
            var chunk = JSON.parse(chunk)
            var TOKEN = chunk.access_token;
            var expiresTime = chunk.expires_in;

            var singInUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + TOKEN + '&type=jsapi'
            https.get(singInUrl, function (ress) {
                ress.on('data', function (data) {
                    data = JSON.parse(data);
                    var originalUrl = 'http://' + req.hostname + ':8000' + req.originalUrl;

                    var wxConfig = sign(data.ticket, originalUrl);
                    wxConfig.appId = APPID;

                    callback && callback(wxConfig);

                })
            });
        });
    }).on('error', function (e) {
        console.log(e);
    }).end();
}

module.exports = getSDKSign;
