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
    var id = req.query.recordId;
    functions.queryRecordById(id).then(function (docs) {
        var doc = docs[0];
        console.log(doc);
        res.render('ximalaya/result', {
            doc: doc
        });
    })
});

router.get('/share', function (req, res, next) {
    var leaveMap = {
        '0': '幼儿组',
        '1': '小学组',
        '2': '中学组',
    }
    var id = req.query.recordId;
    Promise.all([functions.getUserTotal(), functions.queryRecordById(id)]).then(function (dataArry) {
        var count = dataArry[0];
        var doc = dataArry[1][0];
        doc['leaveText'] = leaveMap[doc.leave];
        if (!doc.productRecordMp3) {
            functions.setRecordMp3(doc).then(function (newdoc) {
                res.render('ximalaya/share', {
                    doc: newdoc,
                    count: count,
                });
            });
        } else {
            res.render('ximalaya/share', {
                doc: doc,
                count: count,
            });
        }
    })
});


module.exports = router;