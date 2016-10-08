var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');

var config = require('../admin/tsconfig.json');


/* GET home page. */
router.get('/*', function (req, res, next) {
    var username = req.signedCookies['session'];
    if (!username) {
        res.cookie('session', '');
        res.render('admin/login', {title: 'Express'});
    } else {
        next();
    }
});

router.get('/', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];

    if (username == config.username) {
        res.render('admin/index', {username: username, routes: ''});
    } else {
        res.cookie('session', '');
        res.render('admin/login', {title: 'Express'});
    }

});

/*金牌班主任*/
router.get('/teacherVote', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];
    res.render('admin/teacherVote', {username: username, routes: 'teacherVote'});
});


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
