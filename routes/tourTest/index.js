var express = require('express');
var router = express.Router();

var date = require('./date');
var StateRegion = require('./StateRegion');
var resultListV1 = 'female_1_1.jpg,female_1_2.jpg,female_2_1.jpg,female_2_2.jpg,female_3_1.jpg,female_4_1.jpg,male_1_1.jpg,male_2_1.jpg,male_3_1.jpg,male_4_1.jpg';
var resultListV2 = 'female_1_1.jpg,female_1_2.jpg,female_1_3.jpg,female_2_1.jpg,female_2_2.jpg,female_2_3.jpg,female_3_1.jpg,female_3_2.jpg,female_4_1.jpg,female_4_2.jpg,male_1_1.jpg,male_1_2.jpg,male_1_3.jpg,male_2_1.jpg,male_2_2.jpg,male_2_3.jpg,male_3_1.jpg,male_3_2.jpg,male_4_1.jpg,male_4_2.jpg';
/* GET home page. */
router.get('/v1', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('tourTest/index', {
        resultList: resultListV1,
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
    });
});

router.get('/v2', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('tourTest/indexV2', {
        resultList: resultListV2,
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
    });
});

router.post('/form', function (req, res, next) {
    // For Test
    // var host = 'https://stg-efcom-lb.eflangtech.com/';  

    // For Online 
    var host = 'https://services.ef.com/';
    var submissionURL = host + 'secureformsapi/Campaignsubmission';
    var superagent = require('superagent');

    superagent.post(submissionURL).send(req.body).then((res) => {
        console.log(res.body);
        return superagent.post('http://ma.eldesign.cn/leads/api/addLeads').send({
            realName: req.body.customer.LastName,
            cellPhone: req.body.customer.MobilePhone,
            cityName: req.body.customer.StateRegionName,
            others: res.body.FormId,
            age: req.body.customer.score,
            tag: 'v8',
        });
    }).then((res) => {
        console.log(res.body);
    }).catch((e) => {
        console.log(e);
    });

    res.send({
        status: 200,
        data: req.body
    });
})


module.exports = router;