var XiMaUserDB = require('../../module/DB/XiMaUserDB');
var XiMaArticleDB = require('../../module/DB/XiMaArticleDB');
var XiMalayaDB = require('../../module/DB/XiMalayaDB');
var logger = require('../../module/tools/log4').logger;

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;

/** 文章管理 */
var addArticle = function (data) {
    var promise = new Promise(function (resolve, reject) {
        XiMaArticleDB.add(data).then(function (docs, err) {
            if (err) {
                logger.error(['addArticle', JSON.stringify(err)].toString());
                return reject(err);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
};
var queryArticle = function () {
    return getArticle({

    }, {
        arText: false,
    }, {
        arLeave: 1,
        index: 1,
    }).then(function (docs) {
        return docs;
    });
};
var queryArticleById = function (_id) {
    return getArticle({
        _id: _id,
    }).then(function (docs) {
        return docs;
    });
}
var queryArticleByLeave = function (leave) {
    return getArticle({
        arLeave: leave,
        status: 0,
    }).then(function (docs) {
        console.log(docs);
        return docs;
    });
}

var getArticle = function (findJson, fieldJson, sortJSON) {
    return XiMaArticleDB.User.find(findJson || {}, fieldJson || {}).sort(sortJSON || {});
}
var delArticle = function (_id) {
    var promise = new Promise(function (resolve, reject) {
        XiMaArticleDB.remove({
            _id: _id,
        }, function (err, docs) {
            if (err) {
                logger.error(['delArticle', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
}

var updateArticle = function (id, data) {
    var promise = new Promise(function (resolve, reject) {
        XiMaArticleDB.update(id, data, function (err, docs) {
            if (err) {
                logger.error(['updateArticle', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
};



/** 录音管理 */
var getRecordTotal = function () {
    return XiMalayaDB.User.find({}).count();
}

var delRecord = function (_id) {
    var promise = new Promise(function (resolve, reject) {
        XiMalayaDB.remove({
            _id: _id,
        }, function (err, docs) {
            if (err) {
                logger.error(['delRecord', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
}
var addRecord = function (data) {
    var promise = new Promise(function (resolve, reject) {
        XiMalayaDB.add(data).then(function (docs, err) {
            if (err) {
                logger.error(['addRecord', JSON.stringify(err)].toString());
                return reject(err);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
};
var getRecord = function (findJson, fieldJson, sortJSON) {
    return XiMalayaDB.User.find(findJson || {}, fieldJson || {}).sort(sortJSON || {});
}

var queryRecordById = function (_id) {
    return getRecord({
        _id: _id,
    }).then(function (docs) {
        return docs;
    });
}
var queryRecordByPage = function (start, limit, findJson) {
    return XiMalayaDB.User.find(findJson || {}, {
        IPArray: false
    }).skip(start).limit(limit).sort({
        voteNumber: -1
    });
}

var updateRecord = function (id, data) {
    var promise = new Promise(function (resolve, reject) {
        XiMalayaDB.update(id, data, function (err, docs) {
            if (err) {
                logger.error(['updateRecord', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
};



var setRecordMp3 = function (doc) {
    var persistentId = doc.persistentId;
    var superagent = require('superagent');
    var submissionURL = 'http://api.qiniu.com/status/get/prefop?id=' + persistentId;
    return superagent.get(submissionURL).then(function (res) {
        var data = res.body;
        if (data.code == 0) {
            // 转码已经完成
            var key = data.items[0].key;
            var productRecordMp3 = 'http://pjgcuhtbw.bkt.clouddn.com/' + key;
            return updateRecord(doc._id, {
                productRecordMp3: productRecordMp3
            }).then(function (info) {
                doc['productRecordMp3'] = productRecordMp3;
                return doc;
            });
        } else {
            return doc;
        }
    })
}

/*  用户 注册登录和认证 */
var checkOpenid = function (req, res) {
    var promise = new Promise(function (resolve, reject) {
        var openInfo = req.signedCookies['session'];
        if (openInfo) {
            resolve(JSON.parse(openInfo));
        } else {
            //如果cookie里面没有openid,获取之;
            var hostname = req.hostname;
            var protocol = req.protocol;
            var redirect_uri = encodeURIComponent(protocol + '://' + hostname + '/invitation/callback?router=invitation' + req.path);
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
            res.redirect(url);
        }
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
    return promise;
}
var checkLogin = function (req, res) {
    var promise = new Promise(function (resolve, reject) {
        var openInfo = req.signedCookies['session'];
        if (openInfo) {
            var tel = JSON.parse(openInfo)['tel'];
            resolve(tel);
        } else {
            resolve(false);
        }
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
    return promise;
}
var findUser = function (findJson) {
    return XiMaUserDB.find(findJson);
}
var addUser = function (data) {
    var promise = new Promise(function (resolve, reject) {
        findUser({
            telPhone: data.telPhone
        }).then(function (userDocs, err) {
            console.log(userDocs);
            if (userDocs.length > 0) {
                logger.error(['addUser', '用户已存在'].toString());
                return reject('用户已存在');
            } else {
                XiMaUserDB.add(data).then(function (docs, err) {
                    if (err) {
                        logger.error(['addUser', JSON.stringify(err)].toString());
                        return reject(err);
                    } else {
                        return resolve(docs);
                    }
                });
            }
        })
    });
    return promise;
};
var getUser = function (findJson, fieldJson, sortJSON) {
    return XiMaUserDB.User.find(findJson || {}, fieldJson || {}).sort(sortJSON || {});
}
var getUserTotal = function () {
    return XiMaUserDB.User.find({}).count();
}

var queryUserByTel = function (tel) {
    return getUser({
        telPhone: tel,
    }).then(function (docs) {
        return docs[0];
    });
}



/*  用手机和验证码登录 */
var SMSDB = require('../../module/DB/SMSDB');
var smsSendFunctions = require('../../module/sms/InvitationSMS');

var smsDBAdd = function (json) {
    var promise = new Promise(function (resolve, reject) {
        SMSDB.add(json, function (err, docs) {
            if (err) {
                logger.error(['smsDBAdd', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
}
var smsDBFind = function (json) {
    var promise = new Promise(function (resolve, reject) {
        SMSDB.find(json, function (err, docs) {
            if (err) {
                logger.error(['smsDBFind', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        })
    });
    return promise;
}

var smsSend = function (tel) {
    var code = genCode(6);
    return smsDBAdd({
        SMSTel: tel,
        code: code,
        createTime: new Date(),
        tag: 'invitation'
    }).then(function () {
        return smsSendFunctions(code, tel)
    });
}
var checkSMS = function (tel, code) {
    return smsDBFind({
        SMSTel: tel,
        code: code,
        tag: 'invitation'
    }).then(function (docs) {
        //  docs 大于0 证明验证码匹配成功了
        return docs.length > 0
    })
}

// 生成验证码
function genCode(len) {
    var code = '';
    for (var i = 0; i < len; i++) {
        code = code + Math.floor(1 + Math.random() * 9).toString();
    }
    return code;
}


/** 其他 */
// 获取ip
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




module.exports = {

    addArticle: addArticle,
    delArticle: delArticle,
    updateArticle: updateArticle,
    queryArticle: queryArticle,
    queryArticleById: queryArticleById,
    queryArticleByLeave: queryArticleByLeave,

    addRecord: addRecord,
    delRecord: delRecord,
    getRecordTotal: getRecordTotal,
    queryRecordById: queryRecordById,
    queryRecordByPage: queryRecordByPage,
    updateRecord: updateRecord,
    setRecordMp3: setRecordMp3,

    checkOpenid: checkOpenid,
    checkLogin: checkLogin,
    addUser: addUser,
    getUser: getUser,
    getUserTotal: getUserTotal,
    queryUserByTel: queryUserByTel,

    smsDBAdd: smsDBAdd,
    smsDBFind: smsDBFind,
    smsSend: smsSend,
    checkSMS: checkSMS,

    getClientIP: getClientIP,
};