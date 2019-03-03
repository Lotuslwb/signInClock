var express = require('express');
var router = express.Router();
var logger = require('../../module/tools/log4').logger;

var sendData = require('../../module/tools/sendData');

var data = require('./data');
var date = require('./date');
var {
    StateRegion,
    StateCode
} = require('./StateRegion');
var resultList = 'female_1_1.jpg,female_2_3.jpg,female_3_4.jpg,male_1_1.jpg,male_4_1.jpg,female_1_2.jpg,female_3_1.jpg,female_4_1.jpg,male_2_1.jpg,female_2_1.jpg,female_3_2.jpg,female_4_2.jpg,male_3_1.jpg,female_2_2.jpg,female_3_3.jpg,female_4_3.jpg,male_3_2.jpg';
/*  用手机和验证码登录 */
var SMSDB = require('../../module/DB/SMSDB');

StateRegion.map(item => {
    let currentCode = StateCode.find(it => it.name == item.text);
    item.id = currentCode.id;
    return item;
})


/* GET home page. */

router.get('/test', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('StressTest/index_test', {
        data,
        resultList,
        StateRegion,
        channel,
        SourceCode
    });
});

router.get('/', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('StressTest/index', {
        data,
        resultList,
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
    });
});

var smsDBFind = function (json) {
    var promise = new Promise(function (resolve, reject) {
        SMSDB.find(json, function (err, docs) {
            if (err) {
                logger.error(['smsDBFind', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        })
    });
    return promise;
}

var checkSMS = function (tel, code) {
    return smsDBFind({
        SMSTel: tel,
        code: code,
        tag: 'invitation'
    }).then(function (docs) {
        //  docs 大于0 证明验证码匹配成功了
        return docs.length > 0
    })
}


router.post('/form', function (req, res, next) {
    // For Test
    // var host = 'https://stg-efcom-lb.eflangtech.com/';  

    // For Online 
    var host = 'https://services.ef.com/';

    var submissionURL = host + 'secureformsapi/Campaignsubmission';
    var superagent = require('superagent');

    var qcode = req.body.qcode;
    var tel = req.body.customer.MobilePhone;
    checkSMS(tel, qcode).then(function (result) {
        if (result) {
            superagent.post(submissionURL).send(req.body).then((res) => {
                console.log(res.body);
                return superagent.post('http://ma.eldesign.cn/leads/api/addLeads').send({
                    realName: req.body.customer.LastName + req.body.customer.FirstName,
                    cellPhone: req.body.customer.MobilePhone,
                    cityName: req.body.customer.StateRegionName,
                    others: JSON.stringify(res.body),
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
        } else {
            res.send(sendData('999', '验证码不正确', ''));
        }
    });
})


module.exports = router;