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

/*收集leads*/
router.get('/leads', function (req, res, next) {
    var username = req.signedCookies['session'].split('"')[1];
    res.render('admin/leads', {username: username, routes: 'leads', tag: getTag()});
});

function getTag() {
    return require('../../module/data/leads');
}


module.exports = router;
