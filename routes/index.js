var express = require('express');
var router = express.Router();


var WXConfig = require('../module/wx/WXConfig');
var APPID = WXConfig.APPID;

//检查openid
router.get('/', function (req, res, next) {

  var openid = req.signedCookies['session'];

  if (openid) {
    next();
  } else {
    //如果cookie里面没有openid,获取之;
    var hostname = 'ma.eldesign.cn';
    var redirect_uri = encodeURIComponent('http://' + hostname + '/wx/callback');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
    res.redirect(url);
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
