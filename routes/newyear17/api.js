var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var DB = require('../../module/DB/NewYear17DB');


/*生成计划*/
router.post('/gen', function (req, res, next) {

    var data = req.body;
    data.openid = req.signedCookies['session'];
    data.plansArray = data.plansArrayString.split(',');
    console.log(data);

    DB.add(data).then(function (docs) {
        log(docs);
        res.send(sendData('200', docs, ''));
    }).catch(function (err) {
        res.send(sendData('999', false, err));
    });
});

/*支持一下*/
router.post('/support', function (req, res, next) {

    var _id = req.body._id;
    var supervisorArray = req.body.supervisorArray.split(',');
    log(supervisorArray);

    var openid = req.signedCookies['session'];
    supervisorArray.push({openid: openid});
    log(supervisorArray);

    DB.update(_id, {'supervisorArray': supervisorArray}, function (err, docs) {
        if (err) {
            log(err);
            res.send(sendData('999', false, err));
        } else {
            log(docs)
            res.send(sendData('200', docs, ''));
        }
    });
});

function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}


module.exports = router;
