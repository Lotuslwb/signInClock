var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var DB = require('../../module/DB/InvitationDB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;


router.get('/index', function (req, res, next) {
    res.render('invitation/index');
});

module.exports = router;
