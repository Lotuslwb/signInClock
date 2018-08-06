var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var sendData = require('../../module/tools/sendData');
var InvitationDB = require('../../module/DB/InvitationDB');
var functions = require('../invitation/functions');

var uuid = require('node-uuid');
var logger = require('../../module/tools/log4').logger;


// 新增邀请函
router.post('/addInvitation', function (req, res, next) {
    var data = req.body;
    functions.checkLogin(req, res).then(function (tel) {
        data['ownerId'] = tel;
        return functions.addInvitation(data);
    }).then(function (doc) {
        res.send(sendData('200', doc, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

// 增加邀请函的表单信息
router.post('/updateInvitationForm', function (req, res, next) {
    var data = req.body;
    functions.updateInvitation(data._id, {
        templateForm: data.templateForm
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

// 增加邀请函的其他信息
router.post('/updateInvitationInfo', function (req, res, next) {
    var data = req.body;
    functions.checkLogin(req, res).then(function (tel) {
        return functions.updateInvitation(data._id, {
            templateInfo: data.templateInfo
        })
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

// 上传图片
router.post('/upload', function (req, res, next) {

    var multiparty = require('multiparty');
    var fs = require('fs');

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: './public/files/'
    });
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            res.send(sendData('999', err, '上传错误'));
            logger.error([req.path, JSON.stringify(err)].toString());
        } else {
            log(files);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var type = 'jpeg';
            var theName = new Date().getTime() + '.' + type
            var dstPath = './public/files/' + theName;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    res.send(sendData('999', '', '重命名错误'));
                    logger.error([req.path, JSON.stringify(err)].toString());
                } else {
                    res.send(sendData('200', {
                        'name': theName
                    }, ''));
                }
            });
        }
    });
});

// 发送祝福
router.post('/sendWish', function (req, res, next) {
    var data = req.body;
    functions.getInvitation({
        _id: data._id
    }, {
        wishesList: 1
    }).then(function (docs) {
        var wishesList = docs[0].wishesList;
        data.wish.createTime = new Date().getTime();
        data.wish.wishId = uuid.v1();
        wishesList.push(data.wish);
        functions.updateInvitation(data._id, {
            wishesList: wishesList
        }).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

// 增加待定
router.post('/setIndeterminate', function (req, res, next) {
    var data = req.body;
    functions.getInvitation({
        _id: data._id
    }, {
        indeterminateList: 1
    }).then(function (docs) {
        var indeterminateList = docs[0].indeterminateList;
        data.indeterminate.createTime = new Date().getTime();
        data.indeterminate.indeterminateId = uuid.v1();
        indeterminateList.push(data.indeterminate);
        functions.updateInvitation(data._id, {
            indeterminateList: indeterminateList
        }).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});

// 确定赴约的人
router.post('/setAttend', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.getInvitation({
        _id: data._id
    }, {
        attendList: 1
    }).then(function (docs) {
        var attendList = docs[0].attendList;
        data.attend.createTime = new Date().getTime();
        data.attend.attendId = uuid.v1();
        attendList.push(data.attend);
        functions.updateInvitation(data._id, {
            attendList: attendList
        }).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    })
});


// 删除消息
router.post('/removeMessage', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.checkLogin(req, res).then(function (tel) {
        return functions.removeMessage(tel, data.removeId);
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});

// 删除邀请函
router.post('/removeInvitation', function (req, res, next) {
    var data = req.body;
    functions.checkLogin(req, res).then(function (tel) {
        return functions.removeInvitation(tel, data.deleteId)
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
});


// 发送短信
router.post('/sendSMS', function (req, res, next) {
    var data = req.body;
    var tel = data.tel;
    if (!checkTel(tel)) {
        res.send(sendData('999', '无效手机号码', ''));
    } else {
        functions.smsDBFind({
            SMSTel: tel,
            tag: 'invitation'
        }).then(function (docs) {
            var doc = docs[docs.length - 1];
            var createTime = doc && doc['createTime'] * 1;
            var now = new Date() * 1;
            var diffTime = doc && (now - createTime);
            if (doc && diffTime < 60 * 1000) {
                res.send(sendData('999', '发送短信太频繁了~', ''));
            } else {
                return functions.smsSend(data.tel);
            }
        }).then(function (data) {
            res.send(sendData('200', data, ''));
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
            res.send(sendData('999', '发送短信太频繁了', ''));
        });
    }

});

router.post('/login', function (req, res, next) {
    var data = req.body;
    var tel = data.tel;
    var code = data.code;
    var route = data.route || 'index';
    if (!checkTel(tel)) {
        res.send(sendData('999', '无效手机号码', ''));
    } else {
        functions.checkSMS(tel, code).then(function (result) {
            if (result) {
                res.cookie('session', JSON.stringify({
                    tel: tel
                }), {
                    expires: new Date(Date.now() * 1 + 24 * 60 * 60 * 1000 * 365),
                    signed: true
                });
                res.send(sendData('200', {
                    result: result,
                    route: route
                }, ''));
            } else {
                res.send(sendData('999', '验证码不正确', ''));
            }
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }

});


router.post('/catchError', function (req, res, next) {
    var openInfo = req.signedCookies['session'];
    var tel = '';
    if (openInfo) {
        tel = JSON.parse(openInfo)['tel'];
    }
    logger.error([req.path, req.body.error, tel].toString());
    res.send(sendData('200', '', ''));
});


function checkTel(tel) {
    var reg = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/;
    return reg.test(tel);
}

module.exports = router;