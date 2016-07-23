var express = require('express');
var router = express.Router();

var APPID = 'wxa60ff9366a44a254';
var APPSECRET = '6e362e213f9cc282f5ecf913eafa18d1';

//引入OAuth并实例化
var OAuth = require('wechat-oauth');
var client = new OAuth(APPID, APPSECRET);

//微信API
// var WechatAPI = require('wechat-api');
// var api = new WechatAPI(APPID, APPSECRET);

//微信sdk签名算法
var sign = require('../module/wx/sign');


var http = require('https');

//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;

    http.get(url, function (ress) {
        ress.on('data', function (chunk) {
            chunk = JSON.parse(chunk)
            var TOKEN = chunk.access_token;
            var expiresTime = chunk.expires_in;

            console.log(TOKEN)

            var singInUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + TOKEN + '&type=jsapi'
            http.get(singInUrl, function (ress) {
                ress.on('data', function (data) {
                    data = JSON.parse(data);
                    var originalUrl = 'http://' + req.hostname + ':8000' + req.originalUrl;
                    console.log(data.ticket);
                    console.log(originalUrl);
                    var wxConfig = sign(data.ticket, originalUrl);
                    wxConfig.appId = APPID;
                    res.render('wxAPI', {title: '测试微信SDK', wxConfig: wxConfig});

                })
            });
        });
    }).on('error', function (e) {
        console.log(e);
    }).end();


})


//主要是负责OAuth认证
router.get('/', function (req, res, next) {
    var hostname = req.hostname;
    var redirect_uri = 'http://' + hostname + ':8000/wx/callback';
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + encodeURI(redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    console.log(url);
    res.redirect(url);
});


/**
 * 认证授权后回调函数
 *
 * 获取信息
 */
router.get('/callback', function (req, res) {
    console.log('----weixin callback -----')
    var code = req.query.code;

    client.getAccessToken('code', function (err, result) {
        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        client.getUser(openid, function (err, result) {
            var userInfo = result;
            res.send({userInfo: userInfo, accessToken: accessToken, openid: openid}.toString());
        });

    });
})

module.exports = router;
