var express = require('express');
var router = express.Router();

var date = require('./date');
var {
    StateRegion,
    StateCode
} = require('./StateRegion');
var resultListV1 = 'female_1_1.jpg,female_1_2.jpg,female_2_1.jpg,female_2_2.jpg,female_3_1.jpg,female_4_1.jpg,male_1_1.jpg,male_2_1.jpg,male_3_1.jpg,male_4_1.jpg';
var resultListV2 = 'female_1_1.jpg,female_1_2.jpg,female_1_3.jpg,female_2_1.jpg,female_2_2.jpg,female_2_3.jpg,female_3_1.jpg,female_3_2.jpg,female_4_1.jpg,female_4_2.jpg,male_1_1.jpg,male_1_2.jpg,male_1_3.jpg,male_2_1.jpg,male_2_2.jpg,male_2_3.jpg,male_3_1.jpg,male_3_2.jpg,male_4_1.jpg,male_4_2.jpg';
/* GET home page. */

StateRegion.map(item => {
    let currentCode = StateCode.find(it => it.name == item.text);
    item.id = currentCode.id;
    return item;
})

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


router.post('/queryCity', function (req, res, next) {
    var id = req.body.id;
    var postURL = 'https://apis.map.qq.com/ws/district/v1/getchildren?key=6ARBZ-V3EWQ-DRF56-GGO4E-3DFDO-JSFAP&id=' + id;
    var superagent = require('superagent');

    superagent.get(postURL).then((r) => {
        res.send({
            status: 200,
            data: r.body.result
        });
    }).catch((e) => {
        console.log(e);
    });
})

module.exports = router;