/*
 *   获取js-sdk 的各种签名信息
 *      originalUrl  当前URL
 *
 * */

var log = require('../tools/log');
var load = require('../tools/load');
var loadWay = 'https';


var WXConfig = require('../module/wx/WXConfig');
var APPID = WXConfig.APPID;
var APPSECRET = WXConfig.APPSECRET;


//微信sdk签名算法
var sign = require('../wx/sign');


var getSDKSign = function (originalUrl, callback) {

    var getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;

    load(loadWay, getTokenUrl, function (chunk) {
        var TOKEN = chunk.access_token;
        var expiresTime = chunk.expires_in;

        var signUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + TOKEN + '&type=jsapi';
        load(loadWay, signUrl, function (chunk) {
            var wxConfig = sign(chunk.ticket, originalUrl);
            wxConfig.appId = APPID;

            callback && callback(wxConfig);
        })

    });
}

module.exports = getSDKSign;
