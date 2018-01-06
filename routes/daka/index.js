var express = require('express');
var router = express.Router();
var app = express();

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;
var UserDB = require('../../module/DB/UserDB');
var ArticleDB = require('../../module/DB/ArticleDB');
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
})

router.get('/index', function (req, res, next) {
    res.render('daka/info', {title: '开始打卡', now: new Date()});
})


router.get('/start', function (req, res, next) {
    res.render('daka/info', {title: '开始打卡', now: new Date()});
    // res.render('daka/start', {title: '开始打卡'});
    // UserDB.User.find({}, {personInfo: 1}).sort({"personInfo.startTime": -1}).then(function (docs) {
    //     UserDB.User.find({}).count().then(function (counts) {
    //         res.render('daka/start', {title: '开始打卡', docs: docs, counts: counts});
    //     })
    //
    // });
})

router.get('/start_detail', function (req, res, next) {
    res.render('daka/start_detail', {title: 'index'});
});


router.get('/reading', function (req, res, next) {
    var id = req.query.bookId;
    if (!id) {
        res.redirect('/daka/start');
        return false;
    }
    getBookInfoById(id, function (docs) {
        res.render('daka/reading', {title: 'index', bookInfo: docs[0], now: new Date()});
    });

});

router.get('/share', function (req, res, next) {
    var id = req.query.bookId;
    var userId = req.query.userId;
    var readTime = req.query.readTime;

    if (!id && !userId) {
        res.redirect('/daka/start');
        return false;
    }
    getUserInfoByUserId(userId, function (docs) {
        var UserInfo = docs[0];
        getBookInfoById(id, function (docs) {
            res.render('daka/share', {bookInfo: docs[0], UserInfo: UserInfo, readTime: readTime});
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
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('https://' + hostname + '/wx/callback?router=daka' + req.path);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
}

router.get('/level', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        getUserInfoByOpenid(openid, function (docs) {
            res.render('daka/level', {title: '开始打卡', now: new Date(), UserInfo: docs[0]});
        })
    });

})


router.get('/plan', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var openid = req.signedCookies['session'];
        getUserInfoByOpenid(openid, function (docs) {
            res.render('daka/plan', {title: 'index', now: new Date(), bookInfo: docs[0]});
        })
    });
});

router.get('/index_test', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var id = getBookId();
        getUserInfoByOpenid(openid, function (docs) {
            if (docs.level <= -1) {
                res.redirect('/daka/level')
            } else {
                getBookInfoById(id, function (docs) {
                    res.render('daka/index', {title: 'index', now: new Date(), bookInfo: docs[0], UserInfo: docs[0]});
                });
            }
        })

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
        if (!id) {
            res.redirect('/daka/start');
            return false;
        }
        getBookInfoById(id, function (docs) {
            res.render('daka/result', {bookInfo: docs[0], readTime: readTime});
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
    return bookId;
}

module.exports = router;
