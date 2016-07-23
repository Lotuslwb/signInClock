var express = require('express');
var router = express.Router();

var APPID = 'wxa60ff9366a44a254';
var APPSECRET = '6e362e213f9cc282f5ecf913eafa18d1';

var getSDKSign = require('../module/wx/getSDKSign');


var http = require('https');

//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    getSDKSign(APPID, APPSECRET, function (wxConfig) {
        res.render('wxAPI', {title: '测试微信SDK', wxConfig: wxConfig});
    });
    
})


//主要是负责OAuth认证
router.get('/', function (req, res, next) {
    var hostname = req.hostname;
    var redirect_uri = encodeURIComponent('http://' + hostname + ':8000/wx/callback');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    console.log(url);
    res.redirect(url);
});


/**
 * 认证授权后回调函数
 *
 * 获取信息
 */
router.get('/callback', function (req, res) {

    var code = req.query.code;

    //获取userInfo的access_token;
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APPID + '&secret=' + APPSECRET + '&code=' + code + '&grant_type=authorization_code'
    http.get(url, function (ress) {
        ress.on('data', function (chunk) {
            var chunk = JSON.parse(chunk);
            var userToken = chunk.access_token;
            var userRefreshToken = chunk.refresh_token;
            var openid = chunk.openid;

            //拉取用户信息
            var getInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + userToken + '&openid=' + openid + '&lang=zh_CN';
            http.get(getInfoUrl, function (ress) {
                ress.on('data', function (chunk) {
                    var chunk = JSON.parse(chunk);
                    res.send(chunk);
                })
            });
        })
    });
})

module.exports = router;
