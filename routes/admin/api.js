var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/teacherDB');




/*管理员登录*/
router.post('/login', function (req, res, next) {
    var res = res;
    var data = req.body;
    if(data.username=='837531387@qq.com' && data.password=='1234qwer'){
        res.cookie('session', JSON.stringify(data.username), {signed: true});
        res.send(sendData('200', true, ''));
    }else{
        res.send(sendData('201', false, '用户名或者密码错误,请重试'));
    }
});


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
    teacherDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}


function updateUserInfoToDB(_id, data, callback_s, callback_f) {
    console.log(data);
    teacherDB.update(_id, data, function (err, docs) {
        if (err) {
            log(err);
            callback_f && callback_f(docs);
        } else {
            log(docs)
            callback_s && callback_s(docs);
        }
    });
}


module.exports = router;
