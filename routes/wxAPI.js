var express = require('express');
var router = express.Router();

//引入OAuth并实例化
var OAuth = require('wechat-oauth');
var client = new OAuth('your appid', 'your secret');

//主要是负责OAuth认证
router.get('/', function (req, res, next) {
    var hostname = req.hostname;
    console.log('http://' + hostname + ':8000/wx/callback')
    var url = client.getAuthorizeURL('http://' + hostname + ':8000/wx/callback', '', 'snsapi_userinfo');

    res.redirect(url);
});


/**
 * 认证授权后回调函数
 *
 * 获取信息
 */
router.get('/callback', function (req, res) {
    console.log('----weixin callback -----')
    var code = req.query.code;

    client.getAccessToken('code', function (err, result) {
        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        client.getUser(openid, function (err, result) {
            var userInfo = result;
            res.send({userInfo: userInfo, accessToken: accessToken, openid: openid}.toString());
        });

    });
})

module.exports = router;
