var express = require('express');
var router = express.Router();
var app = express();

var wxConfig = require('../module/wx/WXConfig');
var checkSignature = require('../module/wx/WXcheckSignature');


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    var query = req.query;
    var checkResult = checkSignature(query.signature, query.timestamp, query.nonce, wxConfig.token);

    if (checkResult) {
        res.send(query.echostr);
        console.log('验证成功');
    } else {
        console.log('验证失败');
    }
});


module.exports = router;
