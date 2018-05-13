var InvitationDB = require('../../module/DB/InvitationDB');
var log = require('../../module/tools/log');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;

/**  邀请函 增删改查 **/
var addInvitation = function (data) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.add(data, function (err, docs) {
            if (err) {
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

var removeInvitation = function (openid, invitationId) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.remove({_id: invitationId, ownerId: openid}, function (err, docs) {
            if (err) {
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
        console.log(data.data, 'currentData');
        return updateInvitation(data.id, data.data);
    }).catch(function (e) {
        console.log(e);
    });
}

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
        console.log(e);
    });
    return promise;
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
};
