var express = require('express');
var router = express.Router();
var app = express();

var logger = require('../../module/tools/log4').logger;
var DB = require('../../module/DB/InvitationDB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;


var functions = require('../invitation/functions');

router.get('/index', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        return functions.getInvitation({'ownerId': tel})
    }).then(function (docs) {
        if (docs.length > 0) {
            res.render('Invitation/invitationlist', {data: docs});
        } else {
            res.render('Invitation/index');
        }
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

router.get('/template', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        res.render('Invitation/template');
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});

router.get('/form', function (req, res, next) {
    var templateId = req.query.templateId;
    functions.checkLogin(req, res).then(function (tel) {
        res.render('Invitation/form', {templateId: templateId});
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});

router.get('/edit/:templateId', function (req, res, next) {
    var templateId = req.params.templateId;
    var _id = req.query.id;
    functions.checkLogin(req, res).then(function (tel) {
        return functions.getInvitation({'ownerId': tel, '_id': _id})
    }).then(function (docs) {
        if (docs.length > 0) {
            res.render('Invitation/template_' + templateId, {doc: docs[0], Info: handleInfo(docs[0]['templateInfo'])});
        } else {
            res.render('Invitation/index');
        }
    }).catch(function (e) {
        logger.error([req.path, e].toString());
    });
});

router.get('/result/:templateId', function (req, res, next) {
    var templateId = req.params.templateId;
    var _id = req.query.id;


    functions.getInvitation({'_id': _id})
        .then(function (docs) {
            if (docs.length > 0) {
                res.render('Invitation/result_' + templateId, {
                    doc: docs[0],
                    Info: handleInfo(docs[0]['templateInfo'])
                });
            } else {
                res.render('Invitation/404');
            }
        }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});


router.get('/message', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        return functions.getMessage(tel)
    }).then(function (data) {
        res.render('Invitation/message', {data: data});
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});


router.get('/invitationlist', function (req, res, next) {
    var openid = 'openId1212';
    functions.getInvitationList(openid).then(function (data) {
        res.render('Invitation/invitationlist', {data: data});
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
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
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});

router.get('/login', function (req, res, next) {
    res.render('Invitation/login');
});


router.get('/apis', function (req, res, next) {
    var openid = 'openId1212';
    functions.getMessage(openid).then(function (data) {
        res.render('Invitation/apis', {data: data});
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});

function handleInfo(data) {
    if (!data) {
        return {};
    }
    var returnObj = {};
    data.map(function (item, index) {
        returnObj[item.tag] = item.value + '###' + item.others;
    })
    return returnObj;
}

module.exports = router;
