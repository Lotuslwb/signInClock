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
    var schoolList = getSchoolList();

    var data = {
        username: username,
        routes: 'teacherVote',
        cityList: getCityList(),
    }

    for (var index in schoolList) {
        var item = schoolList[index];
        if (item.cityNo == data.cityNo && item['schoolArray']) {
            data.schoolArray = item.schoolArray;
        }
    }

    res.render('admin/teacherVote', data);
});

/*收集leads*/
router.get('/leads', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];
    res.render('admin/leads', {username: username, routes: 'leads', tag: getTag()});
});


/*打卡计划*/
router.get('/daka', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];
    res.render('admin/daka', {username: username, routes: 'daka'});
});

router.get('/daka/add', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];
    res.render('admin/daka_add', {username: username, routes: 'daka'});
});

function getTag() {
    return require('../../module/data/leads');
}

function getCityList() {
    return require('../../module/data/teacher');
}


function getSchoolList() {
    return require('../../module/data/school');
}


module.exports = router;
