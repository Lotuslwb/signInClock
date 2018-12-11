var express = require('express');
var router = express.Router();
var sendData = require('../../module/tools/sendData');
var logger = require('../../module/tools/log4').logger;
var qiniu = require('qiniu');

// 获取图片上传Token
router.get('/getToken', function (req, res, next) {
    var access = '09KCPciWD1zhFLcNVIjbuWCspbr6kYUYQFnVbcIV';
    var secret = '34w1-j8nQxRLge-kubC4tEEqk5dIsdqjHgQ9vWYw';
    var mac = new qiniu.auth.digest.Mac(access, secret);
    var options = {
        scope: 'xmly',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    res.send(sendData('200', {
        uploadToken: uploadToken,
    }, ''));
});

module.exports = router;