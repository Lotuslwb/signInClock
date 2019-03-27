var express = require('express');
var router = express.Router();
var data = require('./data');
var date = require('./date');
var {
    StateRegion,
    StateCode
} = require('./StateRegion');

/* GET home page. */

StateRegion.map(item => {
    let currentCode = StateCode.find(it => it.name == item.text);
    item.id = currentCode.id;
    return item;
})

router.get('/', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('upQuiz/index', {
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
        data,
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