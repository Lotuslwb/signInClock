/*
 *   获取js-sdk 的各种签名信息
 *      originalUrl  当前URL
 *      
 * */

var https = require('https');


var getUserInfoByCode = function (code, APPID, APPSECRET, callback) {

    //获取userInfo的access_token;
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APPID + '&secret=' + APPSECRET + '&code=' + code + '&grant_type=authorization_code'
    https.get(url, function (ress) {
        ress.on('data', function (chunk) {
            var chunk = JSON.parse(chunk);
            var userToken = chunk.access_token;
            var userRefreshToken = chunk.refresh_token;
            var openid = chunk.openid;

            //拉取用户信息
            var getInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + userToken + '&openid=' + openid + '&lang=zh_CN';
            https.get(getInfoUrl, function (ress) {
                ress.on('data', function (chunk) {
                    var chunk = JSON.parse(chunk);
                    callback && callback(chunk);
                })
            });
        })
    });
}

module.exports = getUserInfoByCode;
