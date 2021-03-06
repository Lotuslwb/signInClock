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

    load(loadWay, url, function (chunk) {

        var access_token = chunk.access_token;

        var getInfoUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN';
        load(loadWay, getInfoUrl, function (chunk) {
            callback && callback(chunk);
        });
    });
}


module.exports = getUserInfoByOpenid;
