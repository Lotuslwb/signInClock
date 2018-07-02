var express = require('express');
var router = express.Router();

var data = require('./data');
var resultList = 'female_1_1.png,female_2_3.png,female_3_4.png,male_1_1.png,male_4_1.png,female_1_2.png,female_3_1.png,female_4_1.png,male_2_1.png,female_2_1.png,female_3_2.png,female_4_2.png,male_3_1.png,female_2_2.png,female_3_3.png,female_4_3.png,male_3_2.png';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('StressTest/index', {
        data,
        resultList
    });
});


module.exports = router;