var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var UserDB = require('../../module/DB/UserDB');

//查找用户信息
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

//查询所有参与者的用户信息
router.get('/getAllPersonInfo', function (req, res, next) {


    UserDB.find({}, {personInfo: true}).then(function (docs) {

        res.send(sendData('200', docs));
    });

});

//保存录音
router.get('/saveVoice', function (req, res, next) {
    var openid = req.signedCookies['session'];
    var recordServerId = req.query.serverId;


    if (!openid) {
        res.send(sendData('999', '', 'openid 不能为空'));
        return false;
    }

    getUserInfoFormDB(openid, function (docs) {

        var data = docs[0];
        try {
            var readingInfo = data.readingInfo;
            var timeId = getFormatDate();
            var newReadingInfo = readingInfo.map(function (item) {
                if (item.readingTimeId == timeId) {
                    item.recordServerId = recordServerId;
                    item.recordLocalId = '';
                }
                return item;
            })
        } catch (e) {
            console.log('error', e);
        }


        var updateDate = {
            readingInfo: newReadingInfo
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

//签到
router.get('/setSignIn', function (req, res, next) {
    var openid = req.signedCookies['session'];
    var recordServerId = req.query.serverId;
    var readingList = {
        bookId: req.query.bookId,  //今日书籍ID
        bookName: req.query.bookName, // 今日书籍名
        bookCover: req.query.bookCover, //今天书籍封页
        bookDes: req.query.bookDes //今天书籍封页
    };
    var wordLength = req.query.wordLength;

    console.log(openid, '******setSignIn*****');

    if (!openid) {
        res.send(sendData('999', '', 'openid 不能为空'));
        return false;
    }

    getUserInfoFormDB(openid, function (docs) {

        var data = docs[0];
        console.log(data);
        try {
            var recodeInfo = data.recodeInfo;
            var currentRecodeCounts = recodeInfo.currentRecodeCounts * 1 || 0;
            var currentSerialRecodeCounts = recodeInfo.currentSerialRecodeCounts * 1 || 0;
            var lastRecodeTime = recodeInfo.lastRecodeTime;
            var totalRecodeCounts = recodeInfo.totalRecodeCounts * 1 || 0;
            var recodeTimeArray = recodeInfo.recodeTimeArray || [];
            var totalWordLength = recodeInfo.totalWordLength || 0;
            var readingInfo = data.readingInfo;
            var runDaka = function () {
                //记录打卡时间
                recodeTimeArray.push(getFormatDate());
                totalWordLength = totalWordLength * 1 + wordLength * 1;
                //记录录音信息 和 书籍信息
                readingInfo.push({
                    readingTimeId: getFormatDate(), //阅读日期  20170102
                    recordServerId: recordServerId, // 录音,微信服务器ID
                    recordLocalId: '',//录音 本地服务器ID
                    readingList: readingList //今日书籍信息
                })
            }
        } catch (e) {
            console.log('error', e);
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
                    console.log('上次打卡时间为昨天;那么就可以统计连续打卡', lastRecodeTime)
                    lastRecodeTime = new Date();
                    totalRecodeCounts++;
                    currentSerialRecodeCounts++;
                    currentRecodeCounts++;
                } else {
                    console.log('上次打卡时间不是昨天', lastRecodeTime)
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
                recodeTimeArray: recodeTimeArray,
                totalWordLength: totalWordLength
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

//保存闹钟设置
router.get('/setClockInfo', function (req, res, next) {
    var openid = req.signedCookies['session'];
    var clockSwitch = req.query.clockSwitch, clockTime = req.query.clockTime;
    if (!openid) {
        res.send(sendData('999', docs, 'openid 不能为空'));
        return false;
    }
    if (!clockTime || !clockTime) {
        res.send(sendData('999', docs, 'clockTime 和  clockTime不能为空'));
        return false;
    }

    getUserInfoFormDB(openid, function (docs) {

        var data = docs[0];
        var updateDate = {
            clockInfo: {
                clockSwitch: clockSwitch,
                clockTime: clockTime
            }
        }
        log(updateDate);
        log(data);
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


function isToday(date) {
    var now = new Date();

    if (now.getYear() == date.getYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) {
        return true;
    } else {
        return false;
    }
}

function isYesterday(date) {
    var now = new Date();


    if (now.getYear() == date.getYear() && now.getMonth() == date.getMonth() && now.getDate() == (date.getDate() + 1)) {
        return true;
    } else {
        return false;
    }
}


function getUserInfoFormDB(openid, callback_s, callback_f) {

    // if (!openid) {
    //     callback_f && callback_f('***openid 不能为空***');
    // }
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

function getFormatDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    month = month < 9 ? ('0' + month) : ('' + month);
    day = day < 9 ? ('0' + day) : ('' + day);

    return year + month + day;
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
