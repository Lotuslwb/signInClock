var express = require('express');
var router = express.Router();

var WXConfig = require('../module/wx/WXConfig');

var APPID = WXConfig.APPID;

//微信sdk签名算法
var sign = require('../module/wx/sign');


var http = require('https');

var log = require('../module/tools/log');


//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    var getSDKSign = require('../module/wx/getSDKSign');

    //当前URL
    var originalUrl = 'https://' + 'ma.eldesign.cn' + '' + req.originalUrl;


    getSDKSign(originalUrl, function (chunk) {
        var wxConfig = sign(chunk.ticket, originalUrl);
        wxConfig.appId = APPID;
        wxConfig.expiresTime = chunk.expiresTime;
        wxConfig.access_token = chunk.TOKEN;
        log(wxConfig);
        res.render('wxAPI', {title: '微信SDK', wxConfig: wxConfig});
    });

})


//主要负责OAuth认证
router.get('/', function (req, res, next) {


    var openid = req.signedCookies['session'];
    var router = req.query.router;


    var scope = 'snsapi_userinfo';
    //var scope = 'snsapi_base'; //静默授权

    //已经有openid, 直接进入业务
    if (openid) {
        log('--已经有openid, 直接进入业务--')
        res.redirect('/' + router);
    } else {
        //暂无openid;获取之;
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('https://' + hostname + '/wx/callback?router=' + router);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=' + scope + '&state=1#wechat_redirect';
        res.redirect(url);
    }


});


/**
 * 认证授权后回调函数
 *
 * 获取openid;
 */
router.get('/callback', function (req, res) {
    //获取个人信息并且保存
    var getUserInfoByCode = require('../module/wx/getUserInfoByCode');
    var code = req.query.code;
    var router = req.query.router || '';


    getUserInfoByCode({code: code, needInfo: true}, function (data) {
        var sign = data.sign;
        var chunk = data.chunk;
        console.log(chunk, 'chunk');
        res.cookie('session', JSON.stringify(data.sign.openid), {signed: true});
        addUserToDB(chunk, function () {
            res.redirect('/' + router);
        })
    });

    //将用户信息加入数据库,初始化用户信息
    function addUserToDB(chunk, callback) {
        var UserDB = require('../module/DB/UserDB');
        var json = {
            openid: chunk.openid,
            personInfo: {
                nickname: chunk.nickname,
                sex: chunk.sex,
                city: chunk.city,
                headimgurl: chunk.headimgurl,
                startTime: new Date().getTime() * 1

            }, recodeInfo: {
                lastRecodeTime: '',
                totalRecodeCounts: 0,
                currentRecodeCounts: 0,
                currentSerialRecodeCounts: 0
            },
            couponList: [],
            clockInfo: {
                clockTime: '18:00',
                clockSwitch: 'on'
            }
        }
        var findJSON = {
            openid: chunk.openid
        }

        var promise = UserDB.find(findJSON).then(function (docs) {
            if (docs.length > 0) {
                log('---数据库里面已经有此用户---');
                callback(docs)
            } else {
                log('---数据库里面暂无此用户---');
                UserDB.add(json).then(function (docs) {
                    log('增加数据成功');
                    callback(docs)
                });
            }
        });
    }


});

router.get('/callback2', function (req, res) {
    //获取个人信息并且保存
    var getUserInfoByCode = require('../module/wx/getUserInfoByCode');
    var code = req.query.code;
    var router = req.query.router || '';


    getUserInfoByCode({code: code, needInfo: true}, function (data) {
        var sign = data.sign;
        var chunk = data.chunk;
        console.log(chunk, 'chunk');
        res.cookie('session', JSON.stringify(data.sign.openid), {signed: true});
        addUserToDB(chunk, function () {
            res.redirect('/' + router);
        })
    });

    //将用户信息加入数据库,初始化用户信息
    function addUserToDB(chunk, callback) {
        var UserDB = require('../module/DB/UserDB');
        var json = {
            openid: chunk.openid,
            personInfo: {
                nickname: chunk.nickname,
                sex: chunk.sex,
                city: chunk.city,
                headimgurl: chunk.headimgurl,
                startTime: new Date().getTime() * 1

            }, recodeInfo: {
                lastRecodeTime: '',
                totalRecodeCounts: 0,
                currentRecodeCounts: 0,
                currentSerialRecodeCounts: 0
            },
            couponList: [],
            clockInfo: {
                clockTime: '18:00',
                clockSwitch: 'on'
            }
        }
        var findJSON = {
            openid: chunk.openid
        }

        var promise = UserDB.find(findJSON).then(function (docs) {
            if (docs.length > 0) {
                var doc = docs[0];
                var id = doc._id;
                doc.personInfo['headimgurl'] = chunk.headimgurl;
                delete doc._id;
                console.log(doc, 'doc');
                UserDB.update(id, doc, function (err, docs) {
                    callback(docs)
                });
            } else {
                log('---数据库里面暂无此用户---');
                UserDB.add(json).then(function (docs) {
                    log('增加数据成功');
                    callback(docs)
                });
            }
        });
    }


});


router.get('/wxError', function (req, res, next) {
    var ua = (req.headers['user-agent']).toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var redirect = req.query.redirect;
    console.log(ua);
    if (!isWeixin) {
        res.render('wxError', {title: 'wxError'});
        return false;
    } else {
        res.redirect(redirect);
        return false;
    }
});


module.exports = router;
