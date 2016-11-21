var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var leadsDB = require('../../module/DB/leadsDB');


/* 收集 leads */
router.post('/addLeads', function (req, res, next) {
    var data = req.body;
    console.log(data);

    var res = res;
    var data = req.body;
    leadsDB.add(data).then(function (doc) {
        log(doc);
        res.cookie('session', JSON.stringify(data.cellPhone), {signed: true});
        res.send(sendData('200', true, ''));
    });
    
})


function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}


function getUserInfoFormDB(tel, callback_s, callback_f) {

    if (!tel) {
        callback_f && callback_f('tel 不能为空');
    }
    var findJSON = {
        'teacherInfo.cellPhone': tel
    };
    leadsDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}


module.exports = router;
