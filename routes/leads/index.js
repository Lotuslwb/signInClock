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

router.get('/v3', function (req, res, next) {
    res.render('leads/v3', {});
})

router.get('/v4', function (req, res, next) {
    res.render('leads/v4', {});
})

router.get('/v5', function (req, res, next) {
    res.render('leads/v5', {});
})

router.get('/v6', function (req, res, next) {
    res.render('leads/v6', {});
})


module.exports = router;



