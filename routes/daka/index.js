var express = require('express');
var router = express.Router();
var app = express();

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;
var UserDB = require('../../module/DB/UserDB');
var ArticleDB = require('../../module/DB/ArticleDB');
var log = require('../../module/tools/log');


router.get('/start', function (req, res, next) {
    // res.render('daka/start', {title: '开始打卡'});
    UserDB.User.find({}, {personInfo: 1}).then(function (docs) {
        console.log(docs);
        res.render('daka/start', {title: '开始打卡', docs: docs});
    });
})


router.get('/start_detail', function (req, res, next) {
    res.render('daka/start_detail', {title: 'index'});
});


router.get('/reading', function (req, res, next) {

    var id = getBookId();
    getBookInfoById(id, function (docs) {
        res.render('daka/reading', {title: 'index', bookInfo: docs[0]});
    });

});


//*** 需要openid的页面 放在这个下面 ***//

function checkOpenid(req, res, cb) {
    var openid = req.signedCookies['session'];
    if (openid) {
        cb(openid);
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('http://' + hostname + '/wx/callback?router=daka' + req.path);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
}

router.get('/plan', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var openid = req.signedCookies['session'];
        getUserInfoByOpenid(openid, function (docs) {
            res.render('daka/plan', {title: 'index', bookInfo: docs[0]});
        })
    });
});

router.get('/index', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var id = getBookId();
        getBookInfoById(id, function (docs) {
            res.render('daka/index', {title: 'index', now: new Date(), bookInfo: docs[0]});
        });
    });
});


router.get('/personal', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        res.render('daka/personal', {title: 'index', now: new Date()});
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
    return '5a0250903a959103fbfaed93';
}

module.exports = router;
