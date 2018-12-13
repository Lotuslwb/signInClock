var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var sendData = require('../../module/tools/sendData');
var functions = require('../ximalaya/functions');
var moment = require('moment');
var logger = require('../../module/tools/log4').logger;
var qiniuFunctions = require('../qiniu/functions');

// 新增文章
router.post('/addArticle', function (req, res, next) {
    var data = req.body;
    data['updateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
    functions.addArticle(data).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (err) {
        res.send(sendData('999', err, ''));
    })
});
// 查询文章列表
router.post('/queryArticle', function (req, res, next) {
    var data = req.body;
    functions.queryArticle(data).then(function (docs) {
        res.send(sendData('200', {
            list: docs,
            totalCount: docs.length,
        }, ''));
    }).catch(function (err) {
        res.send(sendData('999', err, ''));
    })
});
// 删除文章
router.post('/delArticle', function (req, res, next) {
    var data = req.body;
    functions.delArticle(data._id).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
        res.send(sendData('999', e, ''));
    });
});

// 修改文章
router.post('/updateArticleData', function (req, res, next) {
    var data = req.body;
    var _id = data._id;
    data['updateTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
    delete data._id;
    functions.updateArticle(_id, data).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
        res.send(sendData('999', e, ''));
    });
});

// 更新文章状态
router.post('/updateArticleStatus', function (req, res, next) {
    // 0 正常； 1 下线
    var _id = req.body._id;
    var status = req.body.status;
    updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    functions.updateArticle(_id, {
        status: status,
        updateTime: updateTime,
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
        res.send(sendData('999', e, ''));
    });
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
    var tel = data.telPhone;
    var code = data.code;
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
                }, ''));
            } else {
                res.send(sendData('999', '验证码不正确', ''));
            }
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }

});


router.post('/registry', function (req, res, next) {
    var data = req.body;
    var tel = data.telPhone;
    var code = data.code;
    if (!checkTel(tel)) {
        res.send(sendData('999', '无效手机号码', ''));
    } else {
        functions.checkSMS(tel, code).then(function (result) {
            if (result) {
                functions.addUser(data).then(function (docs) {
                    res.cookie('session', JSON.stringify({
                        tel: tel
                    }), {
                        expires: new Date(Date.now() * 1 + 24 * 60 * 60 * 1000 * 365),
                        signed: true
                    });
                    res.send(sendData('200', {
                        docs: docs,
                    }, ''));
                }).catch(err => {
                    res.send(sendData('999', err, ''));
                })
            } else {
                res.send(sendData('999', '验证码不正确', ''));
            }
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }

});

// 新建 record
router.post('/saveAudio', function (req, res, next) {
    var data = req.body;
    var url = data.url;
    var productName = data.productName;
    var productRecordAmr;
    if (!url) {
        res.send(sendData('999', 'url不能为空', ''));
    } else {
        functions.checkLogin(req, res).then(function (tel) {
            var key = new Date() * 1 + '_' + tel + '.amr';
            var AudioPromise = qiniuFunctions.fetchUrl(url, 'xmly', key).then(res => {
                console.log('下载成功');
                var res_key = res.respBody.key;
                productRecordAmr = 'http://pjgcuhtbw.bkt.clouddn.com/' + res_key;
                var mp3Callback = 'http://ma.eldesign.cn/ximalaya/api/mp3Callback?tab=mp3Callback';
                return qiniuFunctions.amr2mp3('xmly', res_key, 'xmly_audio', mp3Callback).then(function (ret) {
                    console.log('转码任务提交');
                    return ret.respBody.persistentId;
                });
            });
            var UserPromise = functions.queryUserByTel(tel).then(function (doc) {
                return doc;
            });

            Promise.all([AudioPromise, UserPromise]).then(function (dataArry) {
                var persistentId = dataArry[0],
                    doc = dataArry[1];
                var recordData = {
                    telPhone: doc.telPhone,
                    nickName: doc.nickName,
                    imgPic: doc.imgPic,
                    leave: doc.leave,
                    createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    productName: productName,
                    productRecordAmr: productRecordAmr,
                    persistentId: persistentId
                }
                return functions.addRecord(recordData).then(function (data) {
                    res.send(sendData('200', data, ''));
                })
            });
        }).catch(function (e) {
            logger.error([req.path, JSON.stringify(e)].toString());
        });
    }
});
// 查Record
router.post('/queryRecordByPage', function (req, res, next) {
    var data = req.body;
    var start = data.start * 1;
    var limit = data.limit * 1;
    var findJson = data.findJson || {};
    if (findJson['nickName']) {
        findJson['nickName'] = new RegExp(findJson['nickName'])
    }
    Promise.all([functions.getRecordTotal(), functions.queryRecordByPage(start, limit, findJson)]).then(function (dataArry) {
        var totalCount = dataArry[0];
        var list = dataArry[1];
        res.send(sendData('200', {
            list: list,
            totalCount: totalCount,
        }, ''));
    })
});

// 更新音频状态
router.post('/updateRecordStatus', function (req, res, next) {
    // 0 正常； 1 下线
    var _id = req.body._id;
    var status = req.body.status;
    updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    functions.updateRecord(_id, {
        status: status,
        updateTime: updateTime,
    }).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
        res.send(sendData('999', e, ''));
    });
});


// 删除音频
router.post('/delRecord', function (req, res, next) {
    var data = req.body;
    functions.delRecord(data._id).then(function (docs) {
        res.send(sendData('200', docs, ''));
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
        res.send(sendData('999', e, ''));
    });
});

// 转mp3 回调
router.post('/mp3Callback', function (req, res, next) {
    console.log(' 转mp3 回调 Post');
    res.send(JSON.stringify(req.body));
});


// 投票
router.post('/vote', function (req, res, next) {
    var _id = req.body.id;
    var today = moment().format('YYYY-MM-DD');
    var ip = functions.getClientIP(req);
    functions.queryRecordById(_id).then(function (docs) {
        var doc = docs[0];
        var IPArray = doc['IPArray'] || [];
        var iplist = IPArray.filter(function (item) {
            return item.ip == ip && item.voteDay == today;
        });
        if (iplist.length > 0) {
            res.send(sendData('999', '', '今天已经投过票了'));
        } else {
            var lastVoteTime = moment().format('YYYY-MM-DD HH:mm:ss');
            var voteNumber = doc['voteNumber'] || 0;
            voteNumber++;
            IPArray.push({
                voteDay: today, // 投票日期
                voteTime: new Date() * 1, // 投票时间
                ip: ip, // 投票IP
            })
            functions.updateRecord(_id, {
                IPArray: IPArray,
                voteNumber: voteNumber,
                lastVoteTime: lastVoteTime,
            });
            res.send(sendData('200', '', ''));
        }
    })
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