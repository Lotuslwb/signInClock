/*
 *   获取js-sdk 的各种签名信息
 *      originalUrl  当前URL
 *
 * */

var fs = require('fs');
var _ = require('lodash');

var log = require('../tools/log');
var load = require('../tools/load');
var loadWay = 'https';


var WXConfig = require('../wx/WXConfig');
var APPID = WXConfig.APPID;
var APPSECRET = WXConfig.APPSECRET;


//微信sdk签名算法
var sign = require('../wx/sign');

//输出 -- 获取微信SDK
var getAccessToken = function (originalUrl, callback) {

    //先从缓存中获取
    getSDKSignFromCache(originalUrl, function (err, data) {
        //缓存报错 或者缓存中没有数据
        if (err || data.length == 0 || data == undefined) {
            log('---缓存报错 或者缓存中没有数据---', err);
            getSDKSignFormWX(originalUrl, function (wxConfig) {
                setSDKSignToCache(wxConfig, originalUrl);
                callback && callback(wxConfig);
            })
        } else {
            //缓存中有数据
            var genTime = data.timestamp;
            var nowTime = new Date().getTime() / 1000; //转换成秒
            var expiresTime = data.expiresTime;
            if (nowTime - genTime < expiresTime) {
                //并没有超时,可以直接使用
                log('---并没有超时,可以直接使用---');
                callback && callback(data);
            } else {
                //已经超时,重新获取
                log('---已经超时,重新获取---');
                getSDKSignFormWX(originalUrl, function (wxConfig) {
                    log(wxConfig);
                    setSDKSignToCache(wxConfig, originalUrl);
                    callback && callback(wxConfig);
                })
            }
        }
    })
}

//从缓存文件读取签名数据
var getSDKSignFromCache = function (originalUrl, callback) {

    var urlArry = originalUrl.split('/');
    var pageName = urlArry[urlArry.length - 1];


    fs.readFile('wx_access_token.txt', 'utf8', function (err, txt) {
        if (err) {
            callback && callback(err);
        } else {
            log(txt);

            if (txt) {
                try {
                    txt = JSON.parse(txt);
                } catch (error) {
                    try {
                        txt = JSON.parse(txt.split('}')[0] + '}');
                    } catch (error) {

                    }
                }
            }

            callback(null, txt);
        }

    });
}
//将签名数据写入缓存文件
var setSDKSignToCache = function (data, originalUrl, callback) {

    var urlArry = originalUrl.split('/');
    var pageNmae = urlArry[urlArry.length - 1];


    fs.writeFile('wx_access_token.txt', JSON.stringify(data), function (err) {
        callback && callback(err);
    });
}

//从微信端拿签名数据
var getSDKSignFormWX = function (originalUrl, callback) {
    var getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;

    load(loadWay, getTokenUrl, function (chunk) {
        log('获取token');
        log(chunk);
        var TOKEN = chunk.access_token;
        var expiresTime = chunk.expires_in;

        var signUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + TOKEN + '&type=jsapi';
        load(loadWay, signUrl, function (chunk) {
            log('获取access_token');
            log(chunk)
            chunk.TOKEN = TOKEN;
            chunk.expiresTime = expiresTime;
            chunk.timestamp = new Date().getTime() / 1000;
            // var wxConfig = sign(chunk.ticket, originalUrl);
            // wxConfig.appId = APPID;
            // wxConfig.expiresTime = expiresTime;
            // wxConfig.access_token = TOKEN;
            log('最后的chunk')
            log(chunk);
            callback && callback(chunk);
        })

    });
}

module.exports = getSDKSign;
