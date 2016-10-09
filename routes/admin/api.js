var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');

var config = require('../admin/tsconfig.json');


/*管理员登录*/
router.post('/login', function (req, res, next) {
    var res = res;
    var data = req.body;
    if (data.username == config.username && data.password == config.password) {
        res.cookie('session', JSON.stringify(data.username), {signed: true});
        res.send(sendData('200', true, ''));
    } else {
        res.send(sendData('201', false, '用户名或者密码错误,请重试'));
    }
});


/*金牌班主任 查询接口*/
router.post('/teacher/query', function (req, res, next) {
    var status = req.body.status;
    var realName = req.body.realName;
    var cellPhone = req.body.cellPhone;
    var queryJSON = {};

    if (status) {
        queryJSON["VoteInfo.status"] = status;
    }

    if (realName) {
        queryJSON["teacherInfo.realName"] = realName;
    }

    if (cellPhone) {
        queryJSON["teacherInfo.cellPhone"] = cellPhone;
    }

    queryUserInfoFormDB(queryJSON, function (docs) {
        for (var i = 0; i < docs.length; i++) {
            docs[i]['teacherInfo'].passWord = '****';
        }
        res.send(sendData('200', {list: docs}, ''));
    });
});

/*金牌班主任 删除接口*/
router.post('/teacher/del', function (req, res, next) {
    var cellPhone = req.body.cellPhone;
    var queryJSON = {};

    if (!cellPhone) {
        res.send(sendData('201', false, '手机号不能为空'));
        return false;
    }

    queryJSON["teacherInfo.cellPhone"] = cellPhone;

    deleteUserInfoFormDB(queryJSON, function (docs) {
        res.send(sendData('200', true, ''));
    });
});

/*金牌班主任 通过审核接口*/
router.post('/teacher/reviewed', function (req, res, next) {
    var _id = req.body._id;

    if (!_id) {
        res.send(sendData('201', false, 'id不能为空'));
        return false;
    }

    updateUserInfoToDB(_id, {'VoteInfo.status': '2'}, function (docs) {
        res.send(sendData('200', true, ''));
    }, function (docs, err) {
        res.send(sendData('201', false, err));
    });
});


function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}

function queryUserInfoFormDB(json, callback_s, callback_f) {

    if (!json) {
        json = {}
    }

    teacherDB.find(json).then(function (docs) {
        callback_s && callback_s(docs);
    });
}


function deleteUserInfoFormDB(json, callback_s, callback_f) {

    if (!json) {
        json = {}
    }

    teacherDB.remove(json).then(function (docs) {
        callback_s && callback_s(docs);
    });
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
            callback_f && callback_f(docs, err);
        } else {
            log(docs)
            callback_s && callback_s(docs);
        }
    });
}


module.exports = router;
