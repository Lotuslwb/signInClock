var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var DB = require('../../module/DB/NewYear17DB');

var WXConfig = require('../../module/wx/WXConfig');
var APPID = WXConfig.APPID;


/* GET home page. */
router.get('/', function (req, res, next) {

});


router.get('/index', function (req, res, next) {
    res.render('camp/index');
});

router.get('/robin8', function (req, res, next) {
    res.render('camp/robin8');
});


router.get('/share', function (req, res, next) {

    var openid = req.signedCookies['session'];
    var _id = req.query.id;
    log(_id);

    if (!openid) {
        openid = 'openidTest666';
        res.cookie('session', JSON.stringify(openid), {signed: true});
    }

    if (openid) {
        getUserInfoFormDB(_id, function (docs) {
            var data = docs[0];
            var value = data.punishmentValue;
            var punishmentList = getPunishmentList();

            for (var i = 0; i < punishmentList.length; i++) {
                if (punishmentList[i].value == value) {
                    data.punishmentText = punishmentList[i].text;
                }
            }

            res.render('newyear17/share', {data: data});
        })
    } else {
        //如果cookie里面没有openid,获取之;
        var hostname = 'ma.eldesign.cn';
        var redirect_uri = encodeURIComponent('https://' + hostname + ':8090/wx/callback');
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
        res.redirect(url);
    }

});

function getUserInfoFormDB(_id, callback_s, callback_f) {

    if (!_id) {
        callback_f && callback_f('_id 不能为空');
    }
    var findJSON = {
        _id: _id
    };
    DB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}


function getPunishmentList() {
    return require('../../module/data/punishmentSelect');
}


module.exports = router;
