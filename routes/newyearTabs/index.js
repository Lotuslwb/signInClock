var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var UserDB = require('../../module/DB/UserDB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;


function checkOpenid(req, res, cb) {
    var openid = req.cookies.openid;
    if (openid) {
        cb(openid);
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('http://' + hostname + '/wx/callback2?router=yingfu-newyearTabs');
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }
}


/* GET home page. */
router.get('/', function (req, res, next) {
    checkOpenid(req, res, function (openid) {
        var openid = req.cookies.openid;
        getUserInfoByOpenid(openid, function (docs) {
            res.render('newyearTabs/index', {title: 'index', doc: docs[0].personInfo});
        })
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

module.exports = router;
