var express = require('express');
var router = express.Router();

var checkSignature = require('../module/WXcheckSignature');

var TOKEN = 'icloudsoft';

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    var query = req.query;
    var checkResult = checkSignature(query.signature, query.timestamp, query.nonce, TOKEN);

    if (checkResult) {
        res.send(query.echostr);
        console.log('验证成功');
    } else {
        console.log('验证失败');
    }
});


module.exports = router;
