var express = require('express');
var router = express.Router();

var WXConfig = require('../module/wx/WXConfig');

var APPID = WXConfig.APPID;


var log = require('../module/tools/log');


//检查openid
router.get('/', function (req, res, next) {

    var openid = req.signedCookies['session'];
    if (openid) {
        next();
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = req.hostname;
        var redirect_uri = encodeURIComponent('http://' + hostname + ':8000/wx/callback');
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
});


//获取用户信息
router.get('/getUseInfo', function (req, res, next) {

    var openid = req.signedCookies['session'];

    getUserInfoFormDB(openid, function (docs) {
        //成功
        res.send(sendData('200', docs, ''));
    }, function (docs) {
        //失败
        res.send(sendData('990', docs, '暂无此用户的信息,请刷新重试'));
    });
});

router.get('/setSignIn', function (req, res, next) {
    var openid = req.signedCookies['session'];


    getUserInfoFormDB(openid, function (docs) {
        var data = docs[0];
        var recodeInfo = data.recodeInfo;
        var currentRecodeCounts = recodeInfo.currentRecodeCounts * 1;
        var currentSerialRecodeCounts = recodeInfo.currentSerialRecodeCounts * 1;
        var lastRecodeTime = recodeInfo.lastRecodeTime;
        var totalRecodeCounts = recodeInfo.totalRecodeCounts * 1;

        if (lastRecodeTime.length > 0) {
            lastRecodeTime = new Date(lastRecodeTime * 1);

            if (isToday(lastRecodeTime)) {
                //上次打卡时间为今天;那么就不能再打卡了
                log('上次打卡时间为今天;那么就不能再打卡了');
                res.send(sendData('990', data, '你今天已经打过卡了哦'));
                return false;

            } else {
                if (isYesterday(lastRecodeTime)) {
                    //上次打卡时间为昨天;那么就可以统计连续打卡
                    lastRecodeTime = new Date().getTime();
                    totalRecodeCounts++;
                    currentSerialRecodeCounts++;
                    currentRecodeCounts++;
                } else {
                    lastRecodeTime = new Date();
                    totalRecodeCounts++;
                    currentRecodeCounts++;

                    //连续打卡次数归零
                    currentSerialRecodeCounts = 0;
                }

            }
        } else {
            //上次打卡时间为空 说明是第一次进来打开
            lastRecodeTime = new Date().getTime();
            totalRecodeCounts++;
            currentSerialRecodeCounts++;
            currentRecodeCounts++;
        }

        var updateDate = {
            recodeInfo: {
                currentRecodeCounts: currentRecodeCounts,
                currentSerialRecodeCounts: currentSerialRecodeCounts,
                lastRecodeTime: lastRecodeTime.getTime(),
                totalRecodeCounts: totalRecodeCounts,
            }
        }

        updateUserInfoToDB(data._id, updateDate, function (docs) {
            //成功
            res.send(sendData('200', docs, ''));
        }, function (docs) {
            //失败
            res.send(sendData('999', docs, '数据库更新失败'));
        })


    }, function (docs) {
        res.send(sendData('990', docs, '暂无此用户的信息,请刷新重试'));
    })

});


function isToday(date) {
    var now = new Date();

    if (now.getYear() == date.getYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) {
        return true;
    } else {
        return false;
    }
}

function isYesterday(date) {

    if (now.getYear() == date.getYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate() + 1) {
        return true;
    } else {
        return false;
    }
}


function getUserInfoFormDB(openid, callback_s, callback_f) {
    var UserDB = require('../module/DB/UserDB');
    var findJSON = {
        openid: openid.split('"')[1]
    };

    UserDB.find(findJSON).then(function (docs) {
        log(docs);
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
    var UserDB = require('../module/DB/UserDB');

    UserDB.update(_id, data, function (err, docs) {
        log(docs);
        if (docs.length > 0) {
            callback_s && callback_s(docs);
        } else {
            callback_f && callback_f(docs);
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
