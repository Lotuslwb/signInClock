var express = require('express');
var router = express.Router();

var WXConfig = require('../module/wx/WXConfig');

var APPID = WXConfig.APPID;


var http = require('https');

var log = require('../module/tools/log');

//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    var getSDKSign = require('../module/wx/getSDKSign');

    //当前URL
    var originalUrl = 'http://' + req.hostname + ':8000' + req.originalUrl;

    getSDKSign(originalUrl, function (wxConfig) {
        res.render('wxAPI', {title: '测试微信SDK', wxConfig: wxConfig});
    });

})


//主要负责OAuth认证
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

    var openid = req.signedCookies['session'];

    //已经有openid, 直接进入业务
    if (openid) {
        log('--已经有openid, 直接进入业务--')
        res.redirect('/wx/page');
    } else {
        //获取个人信息并且保存
        var getUserInfoByCode = require('../module/wx/getUserInfoByCode');
        var code = req.query.code;

        getUserInfoByCode(code, function (data) {
            var sign = data.sign;
            var chunk = data.chunk;
            res.cookie('session', JSON.stringify(data.sign.openid), {signed: true});
            res.render('wxDemo', {title: '测试微信openid', data: chunk});
        });
    }


});

//业务页面
router.get('/page', function (req, res, next) {
    var openid = req.signedCookies['session'];
    res.render('index', {title: openid});

})

//测试
router.get('/test', function (req, res, next) {
    var data = {'name': 'liwenbin'};

    res.cookie('session', JSON.stringify(data), {signed: true});

    console.log(req.signedCookies['session']);


    res.render('index', {title: "测试"});
})

module.exports = router;
