var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/teacherDB');


/* GET home page. */
router.get('/', function (req, res, next) {
    var loginTel = req.signedCookies['session'];
    if (!loginTel) {
        res.render('admin/login', {title: 'Express'});
    } else {
        next();
    }
});

router.get('/', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];

    if(username=='837531387@qq.com'){
        res.render('admin/index');
    }else{
        res.cookie('session', '');
        res.render('admin/login', {title: 'Express'});
    }

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
