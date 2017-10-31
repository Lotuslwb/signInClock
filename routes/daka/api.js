var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var UserDB = require('../../module/DB/UserDB');


router.get('/getUserInfo', function (req, res, next) {
    var openid = req.signedCookies['session'];
    console.log(openid, 'getUserInfo');
    if (!openid) {
        res.send(sendData('999', docs, 'openid 不能为空'));
        return false;
    }

    getUserInfoByOpenid(openid, function (docs) {
        res.send(sendData('200', docs, ''));
    }, function (docs) {
        res.send(sendData('999', docs, '数据库查询失败'));
    })
});

//签到
router.get('/setSignIn', function (req, res, next) {
    var openid = req.signedCookies['session'];
    //var recordServerId = req.query.serverId;
    console.log(openid, 'setSignIn');

    if (!openid) {
        res.send(sendData('999', docs, 'openid 不能为空'));
        return false;
    }

    getUserInfoFormDB(openid, function (docs) {

        var data = docs[0];

        var recodeInfo = data.recodeInfo;
        var currentRecodeCounts = recodeInfo.currentRecodeCounts * 1 || 0;
        var currentSerialRecodeCounts = recodeInfo.currentSerialRecodeCounts * 1 || 0;
        var lastRecodeTime = recodeInfo.lastRecodeTime;
        var totalRecodeCounts = recodeInfo.totalRecodeCounts * 1 || 0;
        var recodeTimeArray = recodeInfo.recodeTimeArray || [];
        var readingInfo = data.readingInfo;
        var runDaka = function () {
            //记录打卡时间
            recodeTimeArray.push(getFormatDate());

            //记录录音信息 和 书籍信息
            readingInfo.push({
                readingTimeId: getFormatDate(), //阅读日期  20170102
                recordServerId: recordServerId, // 录音,微信服务器ID
                recordLocalId: '' //录音 本地服务器ID
            })
        }

        if (lastRecodeTime.length > 0) {
            lastRecodeTime = new Date(lastRecodeTime * 1);
            if (isToday(lastRecodeTime)) {
                //上次打卡时间为今天;那么就不能再打卡了
                res.send(sendData('990', data, '你今天已经打过卡了哦'));
                return false;

            } else {
                //打卡逻辑
                runDaka();
                if (isYesterday(lastRecodeTime)) {
                    //上次打卡时间为昨天;那么就可以统计连续打卡

                    lastRecodeTime = new Date();
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
            runDaka();
            //上次打卡时间为空 说明是第一次进来打卡
            log('上次打卡时间为空 说明是第一次进来打卡');
            lastRecodeTime = new Date();
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
                recodeTimeArray: recodeTimeArray
            },
            readingInfo: readingInfo
        }

        log(updateDate);

        updateUserInfoToDB(data._id, updateDate, function (docs) {
            //成功
            res.send(sendData('200', updateDate, ''));
        }, function (docs) {
            //失败
            res.send(sendData('999', docs, '数据库更新失败'));
        })


    }, function (docs) {
        res.send(sendData('990', docs, '暂无此用户的信息,请刷新重试'));
    })

});


function getUserInfoFormDB(openid, callback_s, callback_f) {

    if (!openid) {
        callback_f && callback_f('openid 不能为空');
    }
    var findJSON = {
        openid: openid.split('"')[1]
    };


    UserDB.find(findJSON).then(function (docs) {
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

    UserDB.update(_id, data, function (err, docs) {
        if (err) {
            callback_f && callback_f(docs);
        } else {
            callback_s && callback_s(docs);
        }
    });
}

function getUserInfoByOpenid(openid, cb_s, cb_f) {
    if (!openid) {
        cb_f && cb_f('openid 不能为空');
    }

    var findJSON = {
        'openid': openid.split('"')[1]
    };
    console.log(findJSON);
    UserDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            console.log('---数据库里面已经有此用户---');
            cb_s && cb_s(docs);
        } else {
            console.log('---数据库里面暂无此用户---');
            cb_f && cb_f(docs);
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
