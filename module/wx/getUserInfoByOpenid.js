/*
 *   获取js-sdk 的各种签名信息
 *      originalUrl  当前URL
 *      
 * */

var log = require('../tools/log');
var load = require('../tools/load');
var loadWay = 'https';

var WXConfig = require('../wx/WXConfig');

var APPID = WXConfig.APPID;
var APPSECRET = WXConfig.APPSECRET;

// option  code
// option needInfo

var getUserInfoByOpenid = function (option, callback) {

    //获取userInfo的access_token;
    var openid = option.openid;
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;
    log(openid);
    load(loadWay, url, function (chunk) {

        var access_token = chunk.access_token;
        var expires_in = chunk.expires_in;

        var getInfoUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN';
        log(getInfoUrl);
        load(loadWay, getInfoUrl, function (chunk) {
            log(chunk);
            callback && callback(chunk);
        });
    });
}


module.exports = getUserInfoByOpenid;
