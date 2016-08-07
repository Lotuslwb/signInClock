var express = require('express');
var router = express.Router();


var APPID = WXConfig.APPID;


var log = require('../module/tools/log');


//业务页面
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

    if (openid) {
        getUserInfoFormDB(openid, function (docs) {
            log(docs);
        });
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = req.hostname;
        var redirect_uri = encodeURIComponent('http://' + hostname + ':8000/wx/callback');
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }

    function getUserInfoFormDB(openid, callback) {
        var UserDB = require('../module/DB/UserDB');
        var findJSON = {
            openid: openid.split('"')[1]
        };


        UserDB.find(findJSON).then(function (docs) {
            if (docs.length > 0) {
                log('---数据库里面已经有此用户---');
                callback(docs);
            } else {
                log('---数据库里面暂无此用户---');
            }
        });
    }

})


module.exports = router;
