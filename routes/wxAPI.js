var express = require('express');
var router = express.Router();

var WXConfig = require('../module/wx/WXConfig');

var APPID = WXConfig.APPID;


var http = require('https');

//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    var getSDKSign = require('../module/wx/getSDKSign');

    //当前URL
    var originalUrl = 'http://' + req.hostname + ':8000' + req.originalUrl;

    getSDKSign(originalUrl, function (wxConfig) {
        res.render('wxAPI', {title: '测试微信SDK', wxConfig: wxConfig});
    });

})


//主要是负责OAuth认证
router.get('/', function (req, res, next) {
    var hostname = req.hostname;
    var redirect_uri = encodeURIComponent('http://' + hostname + ':8000/wx/callback');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    res.redirect(url);
});


/**
 * 认证授权后回调函数
 *
 * 获取信息
 */
router.get('/callback', function (req, res) {

    var getUserInfoByCode = require('../module/wx/getUserInfoByCode');
    var code = req.query.code;

    getUserInfoByCode(code, function (data) {
        var sign = data.sign;
        var chunk = data.chunk;
        res.render('wxDemo', {title: '测试微信openid', data: chunk});
    });
});

//业务页面
router.get('/page', function (req, res) {

})

module.exports = router;
