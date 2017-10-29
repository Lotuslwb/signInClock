var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var UserDB = require('../../module/DB/UserDB');


router.get('/getUserInfo', function (req, res, next) {
    var openid = req.signedCookies['session'];
    if (!openid) {
        res.send(sendData('999', docs, 'openid 不能为空'));
    }
    getUserInfoByOpenid(openid, function (docs) {
        res.send(sendData('200', docs, ''));
    }, function (docs) {
        res.send(sendData('999', docs, '数据库查询失败'));
    })
});

function getUserInfoByOpenid(openid, cb_s, cb_f) {
    if (!openid) {
        cb_f && cb_f('openid 不能为空');
    }

    var findJSON = {
        'openid': openid
    };
    UserDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            console.log('---数据库里面已经有此用户---');
            cb_s && cb_s(docs);
        } else {
            console.log('---数据库里面暂无此用户---');
            cb_f && cb_f(docs);
        }
    });
}


function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}


module.exports = router;
