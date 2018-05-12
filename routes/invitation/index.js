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

router.get('/message', function (req, res, next) {
    var openid = 'openId1212';
    functions.getMessage(openid).then(function (data) {
        res.render('Invitation/message', {data: data});
    });

});

module.exports = router;
