var express = require('express');
var router = express.Router();
var app = express();

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;
var UserDB = require('../../module/DB/UserDB');
var log = require('../../module/tools/log');


router.get('/start', function (req, res, next) {
    res.render('daka/start', {title: '开始打卡'});
})


router.get('/plan', function (req, res, next) {
    res.render('daka/plan', {title: 'index'});
});

router.get('/start_detail', function (req, res, next) {
    res.render('daka/start_detail', {title: 'index'});
});


router.get('/reading', function (req, res, next) {
    res.render('daka/reading', {title: 'index'});
});


//*** 需要openid的页面 放在这个下面 ***//

function checkOpenid(req, res, cb) {
    var openid = req.signedCookies['session'];
    if (openid) {
        cb(openid);
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('http://' + hostname + '/wx/callback?router=daka' + req.path);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
}


router.get('/index', function (req, res, next) {
    //res.render('daka/index', {title: 'index', now: new Date()});

    checkOpenid(req, res, function (openid) {
        res.render('daka/index', {title: 'index', now: new Date()});
    });
});


router.get('/personal', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        res.render('daka/personal', {title: 'index', now: new Date()});
    });
});


module.exports = router;