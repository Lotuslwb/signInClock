var express = require('express');
var router = express.Router();
var sendData = require('../../module/tools/sendData');
var logger = require('../../module/tools/log4').logger;
var qiniu = require('qiniu');
var functions = require('./functions');

// 获取图片上传Token
router.get('/getToken', function (req, res, next) {
    var scope = req.query.scope;
    var options = {
        scope: scope,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    functions.getMac().then(function (mac) {
        var uploadToken = putPolicy.uploadToken(mac);
        res.send(sendData('200', {
            uploadToken: uploadToken,
        }, ''));
    })
});


module.exports = router;