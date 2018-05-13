var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var DB = require('../../module/DB/InvitationDB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;

var functions = require('../invitation/functions');


router.get('/index', function (req, res, next) {
    res.render('Invitation/index');
});

router.get('/getInfo', function (req, res, next) {
    functions.checkOpenid(req, res).then(function (openInfo) {
        res.render('Invitation/getInfo', {openInfo: openInfo});
    })
});

router.get('/message', function (req, res, next) {
    var openid = 'openId1212';
    functions.getMessage(openid).then(function (data) {
        res.render('Invitation/message', {data: data});
    });
});

router.get('/invitationlist', function (req, res, next) {
    var openid = 'openId1212';
    functions.getInvitationList(openid).then(function (data) {
        res.render('Invitation/invitationlist', {data: data});
    });
});


router.get('/callback', function (req, res) {
    //获取个人信息
    var getUserInfoByCode = require('../../module/wx/getUserInfoByCode');
    var code = req.query.code;
    var router = req.query.router || '';
    getUserInfoByCode({code: code, needInfo: true}, function (data) {
        var sign = data.sign;
        var chunk = data.chunk;
        console.log(chunk, 'chunk');
        res.cookie('session', JSON.stringify({openid: chunk.openid, nickname: chunk.nickname}), {signed: true});
        res.redirect('/' + router);
    });
});


module.exports = router;
