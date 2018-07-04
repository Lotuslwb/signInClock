var express = require('express');
var router = express.Router();

var data = require('./data');
var StateRegion = require('./StateRegion');
var resultList = 'female_1_1.png,female_2_3.png,female_3_4.png,male_1_1.png,male_4_1.png,female_1_2.png,female_3_1.png,female_4_1.png,male_2_1.png,female_2_1.png,female_3_2.png,female_4_2.png,male_3_1.png,female_2_2.png,female_3_3.png,female_4_3.png,male_3_2.png';
/* GET home page. */
router.get('/', function (req, res, next) {
    var channel = req.query.channel;
    res.render('StressTest/index', {
        data,
        resultList,
        StateRegion,
        channel
    });
});

router.post('/form', function (req, res, next) {
    var host = 'https://stg-efcom-lb.eflangtech.com/';
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