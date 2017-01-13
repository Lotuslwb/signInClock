var express = require('express');
var router = express.Router();

var WXConfig = require('../module/wx/WXConfig');

var APPID = WXConfig.APPID;


var http = require('https');

var log = require('../module/tools/log');

//微信js sdk 调用
router.get('/jsSDK', function (req, res, next) {

    var getSDKSign = require('../module/wx/getSDKSign');

    //当前URL
    var originalUrl = 'http://' + 'ma.eldesign.cn' + '' + req.originalUrl;

    log(originalUrl);

    getSDKSign(originalUrl, function (wxConfig) {
        res.render('wxAPI', {title: '测试微信SDK', wxConfig: wxConfig});
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
        var redirect_uri = encodeURIComponent('http://' + hostname + '/wx/callback?router=' + router);
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
    var router = req.query.router;


    getUserInfoByCode({code: code, needInfo: false}, function (data) {
        var sign = data.sign;
        var chunk = data.chunk;

        res.cookie('session', JSON.stringify(data.sign.openid), {signed: true});
        res.cookie('code', code, {signed: true});
        res.redirect('/' + router);
    });

    //将用户信息加入数据库
    function addUserToDB(chunk, callback) {
        var UserDB = require('../module/DB/UserDB');
        var json = {
            openid: chunk.openid,
            personInfo: {
                nickname: chunk.nickname,
                sex: chunk.sex,
                city: chunk.city,
                headimgurl: chunk.headimgurl,
            }, recodeInfo: {
                lastRecodeTime: '',
                totalRecodeCounts: 0,
                currentRecodeCounts: 0,
                currentSerialRecodeCounts: 0
            },
            couponList: []
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


module.exports = router;
