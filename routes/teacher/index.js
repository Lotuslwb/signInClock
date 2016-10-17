var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');


/* GET home page. */
router.get('/', function (req, res, next) {
    var loginTel = req.signedCookies['session'];

    if (!loginTel) {
        res.redirect('teacher/login');

    } else {
        next();
    }
});

router.get('/', function (req, res, next) {
    var tel = req.signedCookies['session'].split('"')[1];
    log(tel);
    getUserInfoFormDB(tel, function (docs) {
        var status = docs[0].VoteInfo.status;
        var id = docs[0]._id;
        res.render('teacher/index', {status: status, id: id});
    }, function () {
        //失败
        res.cookie('session', '');
        res.redirect('teacher/login');
    })
});


router.get('/login', function (req, res, next) {
    var loginTel = req.signedCookies['session'];
    if (loginTel) {
        res.redirect('../teacher');
        return false;
    }
    res.render('teacher/login');
})


router.get('/detail', function (req, res, next) {
    var id = req.query.id;
    // todo  如果没有id,应该验证
    if (id) {
        teacherDB.find({_id: id}).then(function (docs) {
            if (docs.length > 0) {
                res.render('teacher/detail', {data: docs[0]});
            } else {
                log(docs);
            }
        });
    }
});

router.get('/registerDone', function (req, res, next) {
    res.render('teacher/registerDone');
})

function getUserInfoFormDB(tel, callback_s, callback_f) {

    if (!tel) {
        callback_f && callback_f('tel 不能为空');
    }
    var findJSON = {
        'teacherInfo.cellPhone': tel
    };
    teacherDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}


module.exports = router;
