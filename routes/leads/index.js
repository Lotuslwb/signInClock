var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');


router.get('/v1', function (req, res, next) {
    res.render('leads/v1', {});
})

router.get('/v2', function (req, res, next) {
    res.render('leads/v2', {});
})


module.exports = router;
