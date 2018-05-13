var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var sendData = require('../../module/tools/sendData');
var InvitationDB = require('../../module/DB/InvitationDB');
var functions = require('../invitation/functions');

var uuid = require('node-uuid');


// 新增邀请函
router.post('/addInvitation', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.addInvitation(data).then(function (docs) {
        log(docs);
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        console.log(e);
    })
});

// 增加邀请函的表单信息
router.post('/updateInvitationForm', function (req, res, next) {
    var data = req.body;
    log(data.templateForm);
    functions.updateInvitation(data._id, {templateForm: data.templateForm}).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        console.log(e);
    })
});

// 增加邀请函的其他信息
router.post('/updateInvitationInfo', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.updateInvitation(data._id, {templateInfo: data.templateInfo}).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        console.log(e);
    })
});

// 上传图片
router.post('/upload', function (req, res, next) {

    var multiparty = require('multiparty');
    var fs = require('fs');

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
            var type = 'jpeg';
            var theName = new Date().getTime() + '.' + type
            var dstPath = './public/files/' + theName;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    res.send(sendData('999', '', '重命名错误'));
                } else {
                    res.send(sendData('200', {'name': theName}, ''));
                }
            });
        }
    });
});

// 发送祝福
router.post('/sendWish', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.getInvitation({_id: data._id}, {wishesList: 1}).then(function (docs) {
        var wishesList = docs[0].wishesList;
        data.wish.createTime = new Date().getTime();
        data.wish.wishId = uuid.v1();
        wishesList.push(data.wish);
        functions.updateInvitation(data._id, {wishesList: wishesList}).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            console.log(e);
        });
    }).catch(function (e) {
        console.log(e);
    })
});

// 增加待定
router.post('/setIndeterminate', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.getInvitation({_id: data._id}, {indeterminateList: 1}).then(function (docs) {
        var indeterminateList = docs[0].indeterminateList;
        data.indeterminate.createTime = new Date().getTime();
        data.indeterminate.indeterminateId = uuid.v1();
        indeterminateList.push(data.indeterminate);
        functions.updateInvitation(data._id, {indeterminateList: indeterminateList}).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            console.log(e);
        });
    }).catch(function (e) {
        console.log(e);
    })
});

// 确定赴约的人
router.post('/setAttend', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.getInvitation({_id: data._id}, {attendList: 1}).then(function (docs) {
        var attendList = docs[0].attendList;
        data.attend.createTime = new Date().getTime();
        data.attend.attendId = uuid.v1();
        attendList.push(data.attend);
        functions.updateInvitation(data._id, {attendList: attendList}).then(function (docs) {
            res.send(sendData('200', docs, ''));
        }).catch(function (e) {
            console.log(e);
        });
    }).catch(function (e) {
        console.log(e);
    })
});


// 删除消息
router.post('/removeMessage', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.removeMessage(data.openid, data.removeId).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        console.log(e);
    });
});

// 删除邀请函
router.post('/removeInvitation', function (req, res, next) {
    var data = req.body;
    log(data);
    functions.removeInvitation(data.openid, data.removeId).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        console.log(e);
    });
});


module.exports = router;
