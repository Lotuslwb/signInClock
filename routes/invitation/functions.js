var InvitationDB = require('../../module/DB/InvitationDB');
var log = require('../../module/tools/log');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;

/**  邀请函 增删改查 **/
var addInvitation = function (data) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.add(data, function (err, docs) {
            if (err) {
                logger.error(['addInvitation', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
};

var updateInvitation = function (id, data) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.update(id, data, function (err, docs) {
            if (err) {
                logger.error(['updateInvitation', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });

    return promise;
};

var getInvitation = function (findJson, fieldJson, sortJSON) {
    return InvitationDB.User.find(findJson || {}, fieldJson || {}).sort(sortJSON || {});
}

var getInvitationList = function (openid) {
    return getInvitation({'ownerId': openid}, {
        templateId: 1,
        templateInfo: 1,
        templateForm: 1
    }).then(function (docs) {
        return docs;
    });
}

var getInvitationDetail = function (invitationId) {
    return getInvitation({'_id': invitationId}, {
        templateId: 1,
        templateInfo: 1,
        templateForm: 1
    }).then(function (docs) {
        return docs;
    });
}

var removeInvitation = function (tel, invitationId) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.remove({_id: invitationId, ownerId: tel}, function (err, docs) {
            if (err) {
                logger.error(['removeInvitation', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
}


/** 消息 增删改查 **/
var getMessage = function (openid) {
    return getInvitation({'ownerId': openid}, {
        wishesList: 1,
        attendList: 1,
        indeterminateList: 1
    }).then(function (docs) {
        var wishesList = [], attendList = [], indeterminateList = [];
        docs.map(function (item) {
            wishesList = wishesList.concat(item.wishesList);
            attendList = attendList.concat(item.attendList);
            indeterminateList = indeterminateList.concat(item.indeterminateList);
        });
        return {
            wishesList: wishesList,
            attendList: attendList,
            indeterminateList: indeterminateList,
        }
    });
}

var removeMessage = function (openid, removeId) {
    return getInvitation({'ownerId': openid}, {
        wishesList: 1,
        attendList: 1,
        indeterminateList: 1
    }).then(function (docs) {
        var currentData;
        docs.map(function (doc) {
            doc['wishesList'] && doc['wishesList'].map(function (item, index) {
                if (item.wishId == removeId) {
                    doc['wishesList'].splice(index, 1);
                    currentData = {
                        id: doc._id,
                        data: {
                            wishesList: doc['wishesList']
                        }
                    }
                }
            });
            doc['attendList'] && doc['attendList'].map(function (item, index) {
                if (item.attendId == removeId) {
                    doc['attendList'].splice(index, 1);
                    currentData = {
                        id: doc._id,
                        data: {
                            attendList: doc['attendList']
                        }
                    }
                }
            });
            doc['indeterminateList'] && doc['indeterminateList'].map(function (item, index) {
                if (item.indeterminateId == removeId) {
                    doc['indeterminateList'].splice(index, 1);
                    currentData = {
                        id: doc._id,
                        data: {
                            indeterminateList: doc['indeterminateList']
                        }
                    }
                }
            })
        });
        return currentData;
    }).then(function (data) {
        return updateInvitation(data.id, data.data);
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
}

/*  用微信认证 登录 */

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
            //如果cookie里面没有openInfo
            var hostname = req.hostname;
            var protocol = req.protocol;
            res.redirect('/invitation/login?router=invitation' + req.path);
        }
    }).catch(function (e) {
        logger.error([req.path, JSON.stringify(e)].toString());
    });
    return promise;
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
    return smsDBFind({SMSTel: tel, code: code, tag: 'invitation'}).then(function (docs) {
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


module.exports = {
    addInvitation: addInvitation,
    updateInvitation: updateInvitation,
    getInvitation: getInvitation,
    getInvitationList: getInvitationList,
    getInvitationDetail: getInvitationDetail,
    removeInvitation: removeInvitation,

    getMessage: getMessage,
    removeMessage: removeMessage,

    checkOpenid: checkOpenid,
    checkLogin: checkLogin,

    smsDBAdd: smsDBAdd,
    smsDBFind: smsDBFind,
    smsSend: smsSend,
    checkSMS: checkSMS,
};
