var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var DB = require('../../module/DB/InvitationDB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;

var functions = require('../invitation/functions');

router.get('/index', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        return functions.getInvitation({'ownerId': tel})
    }).then(function (docs) {
        if (docs.length > 0) {
            console.log(docs);
            res.render('Invitation/invitationlist', {data: docs});
        } else {
            res.render('Invitation/index');
        }
    })
});

router.get('/template', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        res.render('Invitation/template');
    }).catch(function (e) {
        console.log(e);
    });
});

router.get('/form', function (req, res, next) {
    var templateId = req.query.templateId;
    functions.checkLogin(req, res).then(function (tel) {
        res.render('Invitation/form', {templateId: templateId});
    }).catch(function (e) {
        console.log(e);
    });
});

router.get('/edit/:templateId', function (req, res, next) {
    var templateId = req.params.templateId;
    var _id = req.query.id;

    functions.checkLogin(req, res).then(function (tel) {
        return functions.getInvitation({'ownerId': tel, '_id': _id})
    }).then(function (docs) {
        log(docs);
        res.render('Invitation/template_' + templateId, {doc: docs[0]});
    }).catch(function (e) {
        console.log(e);
    });
});


router.get('/message', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        return functions.getMessage(tel)
    }).then(function (data) {
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

router.get('/login', function (req, res, next) {
    res.render('Invitation/login');
});


router.get('/apis', function (req, res, next) {
    var openid = 'openId1212';
    functions.getMessage(openid).then(function (data) {
        res.render('Invitation/apis', {data: data});
    });
});

module.exports = router;
