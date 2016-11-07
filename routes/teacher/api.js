var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');


/*老师上传参数资料*/
router.post('/voteInfo', function (req, res, next) {
    var data = req.body;
    var tel = req.signedCookies['session'].split('"')[1];
    data.status = 1;
    var voteInfoData = {
        VoteInfo: data
    }
    getUserInfoFormDB(tel, function (doc) {
        //成功
        var doc = doc[0];
        console.log(voteInfoData);
        updateUserInfoToDB(doc._id, voteInfoData, function (docs) {
            //成功
            console.log('succu');
            res.send(sendData('200', true, ''));
        }, function (docs) {
            //失败
            res.cookie('session', '');
            res.send(sendData('999', docs, '数据库更新失败'));
        })
    }, function () {
        //失败
        res.cookie('session', '');
        res.send(sendData('990', docs, '暂无此用户的信息,请刷新重试'));
    });
})


/*上传图片*/
router.post('/uploading', function (req, res, next) {

    var multiparty = require('multiparty');
    var fs = require('fs');
    var tel = req.signedCookies['session'].split('"')[1];

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            res.send(sendData('999', err, '上传错误'));
        } else {
            log(files);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var type = 'png';
            var theName = tel + '_' + new Date().getTime() + '.' + type
            var dstPath = './public/files/' + theName;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    res.send(sendData('999', '', '重命名错误'));
                } else {
                    res.send(sendData('200', {'imgName': theName}, ''));
                }
            });
        }


    });
});

/*老师注册*/
router.post('/register', function (req, res, next) {
    var res = res;
    var data = req.body;
    var json = {
        teacherInfo: data,
        VoteInfo: {
            status: 0
        }
    };
    getUserInfoFormDB(data.cellPhone, function (docs) {
        log('---用户已存在---');
        res.send(sendData('999', false, '该手机号已经存在,请直接登录'));
    }, function () {
        log('---用户不存在---');
        teacherDB.add(json).then(function (doc) {
            log(doc);
            res.cookie('session', JSON.stringify(data.cellPhone), {signed: true});
            res.send(sendData('200', true, ''));
        });
    })

});


/*老师登录*/
router.post('/login', function (req, res, next) {
    var res = res;
    var data = req.body;
    var json = {
        teacherInfo: data
    };

    getUserInfoFormDB(data.cellPhone, function (docs) {
        log('---用户已存在---');
        if (docs[0].teacherInfo.passWord = data.passWord) {
            res.cookie('session', JSON.stringify(data.cellPhone), {signed: true});
            res.send(sendData('200', true, ''));
        } else {
            res.send(sendData('201', false, '密码错误,请重试'));
        }
    }, function () {
        log('---用户不存在---');
        res.send(sendData('999', false, '用户不存在,请注册'));
    })

});


/*投票*/
router.post('/vote', function (req, res, next) {
    var _ = require('lodash');
    var id = req.body.id;
    var ip = getClientIP(req);
    teacherDB.find({_id: id}).then(function (docs) {
        if (docs.length > 0) {
            var data = docs[0];
            var IPArray = data.IPArray;
            var index = _.indexOf(IPArray, ip);
            if (index >= 0) {
                res.send(sendData('201', false, '你已投过票了'));
            } else {
                delete data['_id'];

                log(data);

                data.IPArray.push(ip);
                data['VoteData'] ? data['VoteData'] : data['VoteData'] = {};
                data['VoteData'].totalVoteCounts ? data['VoteData'].totalVoteCounts = data['VoteData'].totalVoteCounts * 1 + 1 : data['VoteData'].totalVoteCounts = 1;
                data['VoteData'].lastVoteTime = new Date().getTime();

                updateUserInfoToDB(id, data, function (docs) {
                    res.send(sendData('200', {counts: data['VoteData'].totalVoteCounts}, ''));
                }, function () {

                })
            }
        } else {
            res.send(sendData('201', false, '数据不存在'));
        }
    }).catch(function (err) {
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


//获取ip
var getClientIP = function (req) {
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}


module.exports = router;
