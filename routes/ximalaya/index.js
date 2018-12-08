var express = require('express');
var router = express.Router();
var logger = require('../../module/tools/log4').logger;

var functions = require('../ximalaya/functions');


router.get('/', function (req, res, next) {
    res.render('ximalaya/index');
});

router.get('/ruletxt', function (req, res, next) {
    res.render('ximalaya/ruletxt');
});

router.get('/registry', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        if (tel) {
            res.redirect('/ximalaya/list');
        } else {
            res.render('ximalaya/registry');
        }
    })
});

router.get('/login', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        if (tel) {
            res.redirect('/ximalaya/list');
        } else {
            res.render('ximalaya/login');
        }
    })
});

router.get('/info', function (req, res, next) {
    var type = req.query.type || '';
    res.render('ximalaya/info', {
        type: type
    });
});

router.get('/list', function (req, res, next) {
    functions.checkLogin(req, res).then(function (tel) {
        if (tel) {
            functions.queryUserByTel(tel).then(function (user) {
                var leave = user.leave;
                return functions.queryArticleByLeave(leave).then(function (docs) {
                    res.render('ximalaya/list', {
                        docs: docs,
                        leave: leave,
                    });
                })
            }).catch(function (err) {
                logger.error([req.path, JSON.stringify(err)].toString());
            })
        } else {
            res.redirect('/ximalaya/registry');
        }
    })
});

router.get('/record', function (req, res, next) {
    var id = req.query.id;
    functions.queryArticleById(id).then(function (docs) {
        res.render('ximalaya/record', {
            doc: docs[0],
        });
    })
});

router.get('/result', function (req, res, next) {
    res.render('ximalaya/result');
});

router.get('/share', function (req, res, next) {
    res.render('ximalaya/share');
});


module.exports = router;