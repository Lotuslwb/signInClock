var express = require('express');
var router = express.Router();
var app = express();

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;
var UserDB = require('../../module/DB/UserDB');
var ArticleDB = require('../../module/DB/ArticleDB');
var ConfigDB = require('../../module/DB/ConfigDB');
var log = require('../../module/tools/log');


// router.get('/index', function (req, res, next) {
//     var info = req.cookies.info;
//     if (info && info == 1) {
//         next();
//     } else {
//         res.cookie('info', '1', {expires: new Date(Date.now() + 900000)});
//         res.render('daka/info', {title: '开始打卡', now: new Date()});
//     }
// })


router.get('/info', function (req, res, next) {
    res.render('daka/info', {title: '开始打卡', now: new Date()});
});

// router.get('/index', function (req, res, next) {
//     res.render('daka/info', {title: '开始打卡', now: new Date()});
// })


router.get('/start', function (req, res, next) {
    //res.render('daka/info', {title: '开始打卡', now: new Date()});
    UserDB.User.find({}, {personInfo: 1}).sort({"personInfo.startTime": -1}).then(function (docs) {
        UserDB.User.find({}).count().then(function (counts) {
            res.render('daka/start', {title: '开始打卡', docs: docs, counts: counts});
        })

    });
})


router.get('/start_detail', function (req, res, next) {
    res.render('daka/start_detail', {title: 'index'});
});

router.get('/medal_detail', function (req, res, next) {
    var days = req.query.days;
    res.render('daka/medal_detail', {title: 'index', days: days});
});


router.get('/share', function (req, res, next) {
    var id = req.query.bookId;
    var userId = req.query.userId;
    var readTime = req.query.readTime;
    var level = req.query.level;

    if (!id && !userId) {
        res.redirect('/daka/start');
        return false;
    }
    getUserInfoByUserId(userId, function (docs) {
        UserDB.User.find({}).count().then(function (counts) {
            var UserInfo = docs[0];
            getBookInfoById(id, function (docs) {
                var bookInfo = getBookInfobyDocs(docs, level).bookInfo;
                res.render('daka/share', {
                    bookInfo: bookInfo,
                    UserInfo: UserInfo,
                    readTime: readTime,
                    counts: counts,
                    level: level
                });
            });
        });
    })
});


//*** 需要openid的页面 放在这个下面 ***//

function checkOpenid(req, res, cb) {
    var openid = req.signedCookies['session'];
    if (openid) {
        cb(openid);
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = req.hostname;
        var protocol = req.protocol;
        var redirect_uri = encodeURIComponent(protocol + '://' + hostname + '/wx/callback?router=daka' + req.path);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
}

router.get('/medal_detail2', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            var doc = docs[0];
            var days = doc && doc['recodeInfo']['currentRecodeCounts'] || 0;
            var nickname = doc && doc['personInfo']['nickname'];
            var headimgurl = doc && doc['personInfo']['headimgurl'];
            res.render('daka/medal_detail2', {title: 'index', days: days, nickname: nickname, headimgurl: headimgurl});
        })
    });
});

router.get('/index_info', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        UserDB.User.update({'openid': openid}, {
            $set: {
                readingInfo: [],
                recodeInfo: {
                    lastRecodeTime: '0',
                    totalRecodeCounts: '0',
                    currentRecodeCounts: '0',
                    currentSerialRecodeCounts: '0',
                    recodeTimeArray: [],
                    totalWordLength: '0'
                }
            }
        }, function (err, docs) {
            if (err) {
                res.render('daka/index_info', {msg: '更新失败:' + err});
            }
            log('更新成功');
            res.render('daka/index_info', {msg: '更新成功'});
        })
    });
});


router.get('/reading', function (req, res, next) {
    var id = req.query.bookId;
    var level = req.query.level;
    var type = req.query.type;
    if (!id) {
        res.redirect('/daka/start');
        return false;
    }

    if (level > -1) {
        checkOpenid(req, res, function (openid) {
            getUserInfoByOpenid(openid, function (docs) {
                var UserInfo = docs[0];
                getBookInfoById(id, function (docs) {
                    var doc = docs[0];
                    var index = (level < doc['articleList'].length ? level : doc.length - 1);
                    var bookInfo = doc['articleList'][index];
                    var bookDate = doc['articleDate'];
                    bookInfo._id = doc._id;

                    var readingInfo = UserInfo['readingInfo'];
                    var timeIdList = readingInfo.map(function (item) {
                        return item.readingTimeId;
                    });
                    var timeId = bookDate.split('-').join('');
                    var index = timeIdList.indexOf(timeId);
                    var hasVoice = index >= 0 ? true : false;

                    res.render('daka/reading', {
                        title: 'index', bookDate: bookDate,
                        bookInfo: bookInfo, now: new Date(), level: level, type: type,
                        UserInfo: UserInfo, hasVoice: hasVoice,
                    });
                });
            })
        });

    } else {
        res.redirect('/daka/level')
    }

});

router.get('/level', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            var router = req.query.router;
            res.render('daka/level', {title: '开始打卡', now: new Date(), UserInfo: docs[0], router: router});
        })
    });
})

router.get('/level_setup', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            res.render('daka/level_setup', {title: '开始打卡', now: new Date(), UserInfo: docs[0]});
        })
    });
});

router.get('/medal', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            var UserInfo = docs[0];
            res.render('daka/medal', {title: '开始打卡', now: new Date(), UserInfo: UserInfo});
        })
    })
});


router.get('/plan', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            var bookInfo = docs[0];
            ArticleDB.User.find({}, {articleDate: 1}, function (err, docs) {
                if (!err) {
                    var articleTime = docs.map(function (item) {
                        return item.articleDate ? item.articleDate.split('-').join('') : undefined;
                    });
                    res.render('daka/plan', {
                        title: 'index',
                        now: new Date(),
                        bookInfo: bookInfo,
                        readingInfoRemote: bookInfo.readingInfo.map(function (item) {
                            return JSON.stringify({
                                bookId: item.readingList.bookId,
                                level: item.readingList.level,
                                readingTimeId: item.readingTimeId
                            });
                        }),
                        articleTime: articleTime,
                        articleObj: docs.map(function (item) {
                            return item._id;
                        })
                    });
                }
            });
        })
    });
});

router.get('/index', function (req, res, next) {

    // res.render('daka/info', {title: '开始打卡', now: new Date()});

    checkOpenid(req, res, function (openid) {
        var id = getBookId();
        ConfigDB.find({}, function (err, docs) {
            var ConfigData = (docs && docs[0] ) || {};
            getUserInfoByOpenid(openid, function (docs) {
                var UserInfo = docs[0];
                var level = UserInfo.level;
                if (level > -1) {
                    getBookInfoById(id, function (docs) {
                        var doc = docs[0];
                        var index = (level < doc['articleList'].length ? level : doc.length - 1);
                        var bookInfo = doc['articleList'][index];
                        var bookDate = doc['articleDate'];
                        bookInfo._id = doc._id;

                        res.render('daka/index', {
                            title: 'index',
                            now: new Date(),
                            bookDate: bookDate,
                            bookInfo: bookInfo,
                            UserInfo: UserInfo,
                            ConfigData: ConfigData
                        });
                    });
                } else {
                    res.redirect('/daka/level')
                }
            }, function () {
                //如果cookie里面没有openid,获取之;
                var hostname = req.hostname;
                var protocol = req.protocol;
                var redirect_uri = encodeURIComponent(protocol + '://' + hostname + '/wx/callback?router=daka' + req.path);
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
                res.redirect(url);
            })
        });

    });
});


router.get('/personal', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        res.render('daka/personal', {title: 'index', now: new Date()});
    });
});

router.get('/result', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var id = req.query.bookId;
        var readTime = req.query.readTime;
        var level = req.query.level;
        if (!id) {
            res.redirect('/daka/start');
            return false;
        }
        getBookInfoById(id, function (docs) {
            var bookInfo = getBookInfobyDocs(docs, level).bookInfo;
            res.render('daka/result', {bookInfo: bookInfo, readTime: readTime, level: level});
        });
    });
});


router.get('/test', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        res.render('daka/test', {title: 'index', now: new Date(), openid: openid});
    });
});


router.get('/setup', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        res.render('daka/setup', {title: 'index', now: new Date()});
    });
});


function getBookInfobyDocs(docs, level) {
    var doc = docs[0];
    var index = (level < doc['articleList'].length ? level : doc.length - 1);
    var bookInfo = doc['articleList'][index];
    var bookDate = doc['articleDate'];
    bookInfo._id = doc._id;
    return {bookInfo: bookInfo, bookDate: bookDate}
}

function getUserInfoByOpenid(openid, cb_s, cb_f) {
    if (!openid) {
        cb_f && cb_f('openid 不能为空');
    }

    var findJSON = {
        'openid': openid.split('"')[1]
    };
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
function getUserInfoByUserId(id, cb_s, cb_f) {
    if (!id) {
        cb_f && cb_f('userId 不能为空');
    }

    var findJSON = {
        '_id': id
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

function getBookInfoById(id, cb_s, cb_f) {
    ArticleDB.find({_id: id}, function (err, docs) {
        if (err) {
            cb_f && cb_f(err);
        } else {
            cb_s && cb_s(docs);
        }
    });
}

function getBookId() {
    var fs = require("fs");
    var fsPath = '/root/signInClock';
    var bookId = fs.readFileSync(fsPath + '/bookId.txt');
    console.log(bookId);
    return bookId;
}

module.exports = router;
