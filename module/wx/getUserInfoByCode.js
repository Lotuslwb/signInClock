/*
 *   获取js-sdk 的各种签名信息
 *      originalUrl  当前URL
 *      
 * */

var log = require('../tools/log');
var load = require('../tools/load');
var loadWay = 'https';

var getUserInfoByCode = function (code, APPID, APPSECRET, callback) {

    //获取userInfo的access_token;
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APPID + '&secret=' + APPSECRET + '&code=' + code + '&grant_type=authorization_code'

    load(loadWay, url, function (chunk) {
        var userToken = chunk.access_token;
        var userRefreshToken = chunk.refresh_token;
        var openid = chunk.openid;
        var expires_in = chunk.expires_in;

        //验证token 是否有效
        var checkTokenUrl = 'https://api.weixin.qq.com/sns/auth?access_token=' + userToken + '&openid=' + openid;
        load(loadWay, checkTokenUrl, function (chunk) {

            if (chunk.errcode == '0') {
                //token有效

                //获取用户信息
                getUserInfoByToken(userToken, openid, function (chunk) {
                    var data = {
                        'sign': {
                            access_token: userToken,
                            refresh_token: userRefreshToken,
                            expires_in: expires_in,
                            openid: openid
                        },
                        chunk: chunk
                    }
                    callback && callback(data);
                });
            } else {
                //token 无效,刷新;
                var refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + APPID + '&grant_type=refresh_token&refresh_token=' + userRefreshToken;
                load(loadWay, refreshTokenUrl, function (chunk) {
                    //获得新的token
                    userToken = chunk.access_token;
                    userRefreshToken = chunk.refresh_token;
                    openid = chunk.openid;
                    expires_in = chunk.expires_in;

                    //获取用户信息
                    getUserInfoByToken(userToken, openid, function (chunk) {
                        var data = {
                            'sign': {
                                access_token: userToken,
                                refresh_token: userRefreshToken,
                                expires_in: expires_in,
                                openid: openid
                            },
                            chunk: chunk
                        }
                        callback && callback(data);
                    });
                })
            }
        });
    });
}

//拉取用户信息
var getUserInfoByToken = function (userToken, openid, callback) {
    var getInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + userToken + '&openid=' + openid + '&lang=zh_CN';
    load(loadWay, getInfoUrl, function (chunk) {
        callback && callback(chunk);
    })
}


module.exports = getUserInfoByCode;
