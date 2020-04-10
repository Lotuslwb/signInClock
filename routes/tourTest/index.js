var express = require('express');
var router = express.Router();
var logger = require('../../module/tools/log4').logger;
var sendData = require('../../module/tools/sendData');
var superagent = require('superagent');

var date = require('./date');
var {
    StateRegion,
    StateCode
} = require('./StateRegion');
var resultListV1 = 'female_1_1.jpg,female_1_2.jpg,female_2_1.jpg,female_2_2.jpg,female_3_1.jpg,female_4_1.jpg,male_1_1.jpg,male_2_1.jpg,male_3_1.jpg,male_4_1.jpg';
var resultListV2 = 'female_1_1.jpg,female_1_2.jpg,female_1_3.jpg,female_2_1.jpg,female_2_2.jpg,female_2_3.jpg,female_3_1.jpg,female_3_2.jpg,female_4_1.jpg,female_4_2.jpg,male_1_1.jpg,male_1_2.jpg,male_1_3.jpg,male_2_1.jpg,male_2_2.jpg,male_2_3.jpg,male_3_1.jpg,male_3_2.jpg,male_4_1.jpg,male_4_2.jpg';

/*  用手机和验证码登录 */
var SMSDB = require('../../module/DB/SMSDB');
var smsSendFunctions = require('../../module/sms/yxSMS');


/* GET home page. */

StateRegion.map(item => {
    let currentCode = StateCode.find(it => it.name == item.text);
    item.id = currentCode.id;
    return item;
})

router.get('/v1', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('tourTest/index', {
        resultList: resultListV1,
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
    });
});

router.get('/v2', function (req, res, next) {
    var channel = req.query.channel;
    var SourceCode = req.query.SourceCode;
    res.render('tourTest/indexV2', {
        resultList: resultListV2,
        StateRegion,
        channel,
        SourceCode,
        year: date.year,
        month: date.month,
        date: date.date,
    });
});


router.post('/queryCity', function (req, res, next) {
    var id = req.body.id;
    var postURL = 'https://apis.map.qq.com/ws/district/v1/getchildren?key=6ARBZ-V3EWQ-DRF56-GGO4E-3DFDO-JSFAP&id=' + id;
    var superagent = require('superagent');

    superagent.get(postURL).then((r) => {
        res.send({
            status: 200,
            data: r.body.result
        });
    }).catch((e) => {
        console.log(e);
    });
})

router.post('/form', function (req, res, next) {
    // For Test
    // var host = 'https://stg-efcom-lb.eflangtech.com/';  

    // For Online 
    var host = 'https://services.ef.com/';

    var submissionURL = host + 'secureformsapi/Campaignsubmission';
    var superagent = require('superagent');
    var qcode = req.body.qcode;
    var tel = req.body.customer.MobilePhone;
    checkSMS(tel, qcode).then(function (result) {
        if (result) {
            // superagent.post(submissionURL).send(req.body).then((res) => {
            //     console.log(res.body);
            //     return superagent.post('http://ma.eldesign.cn/leads/api/addLeads').send({
            //         realName: req.body.customer.LastName + req.body.customer.FirstName,
            //         cellPhone: req.body.customer.MobilePhone,
            //         cityName: req.body.customer.StateRegionName,
            //         others: JSON.stringify(res.body),
            //         age: req.body.customer.score,
            //         tag: 'v8',
            //     });
            // }).then((res) => {
            //     console.log(res.body);
            // }).catch((e) => {
            //     console.log(e);
            // });
            res.send({
                status: 200,
                data: req.body
            });
        } else {
            res.send(sendData('999', '验证码不正确', ''));
        }
    });
})

// 发送短信
router.post('/api/sendSMS', function (req, res, next) {
    var data = req.body;
    var tel = data.tel;
    if (!checkTel(tel)) {
        res.send(sendData('999', '无效手机号码', ''));
    } else {
        smsDBFind({
            SMSTel: tel,
            tag: 'tourTest'
        }).then(function (docs) {
            var doc = docs[docs.length - 1];
            var createTime = doc && doc['createTime'] * 1;
            var now = new Date() * 1;
            var diffTime = doc && (now - createTime);
            if (doc && diffTime < 60 * 1000) {
                res.send(sendData('999', '发送短信太频繁了~', ''));
            } else {
                return smsSend(data.tel);
            }
        }).then(function (data) {
            res.send(sendData('200', data, ''));
        }).catch(function (e) {
            console.log(e);
            logger.error([req.path, JSON.stringify(e)].toString());
            res.send(sendData('999', '发送短信太频繁了', ''));
        });
    }

});


// 获取归属地
router.get('/api/getMobileInfo', function (req, res, next) {
    var mobile = req.query.tel;
    if (!mobile) {
        res.send(sendData('999', '手机号不能为空', ''));
    } else {
        getMobileInfo(mobile, function (data) {
            var provinceLabel = data.province;
            var provinceValue = StateRegion.find(it => it.text == provinceLabel).value;
            res.send(sendData('200', {
                city: data.city,
                provinceName: provinceLabel,
                provinceValue: provinceValue,
            }, ''));
        });
    }

});


//获取归属地
var getMobileInfo = function (mobile, cb) {
    const url = `https://sjgsdcs.market.alicloudapi.com/mobile/info?mobile=${mobile}`;
    return superagent.get(url).set('Authorization', 'APPCODE 2bceff4da7164f8abef682b158be9f8d')
        .then(res => {
            const data = JSON.parse(res.text)
            if (data.code == 0) {
                cb(data.data)
            } else {
                console.log(data);
                cb({
                    province: '',
                    city: ''
                })
            }
        }).catch(e => {
            console.log('手机归属地获取失败', e);
            cb({
                mobile,
                province: '',
                city: ''
            })
        })
}

var smsDBAdd = function (json) {
    var promise = new Promise(function (resolve, reject) {
        SMSDB.add(json, function (err, docs) {
            if (err) {
                logger.error(['smsDBAdd', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });
    return promise;
}
var smsDBFind = function (json) {
    var promise = new Promise(function (resolve, reject) {
        SMSDB.find(json, function (err, docs) {
            if (err) {
                logger.error(['smsDBFind', JSON.stringify(err)].toString());
                return reject(docs);
            } else {
                return resolve(docs);
            }
        })
    });
    return promise;
}

var smsSend = function (tel) {
    var code = genCode(6);
    return smsDBAdd({
        SMSTel: tel,
        code: code,
        createTime: new Date(),
        tag: 'invitation'
    }).then(function () {
        return smsSendFunctions(code, tel)
    });
}
var checkSMS = function (tel, code) {
    return smsDBFind({
        SMSTel: tel,
        code: code,
        tag: 'invitation'
    }).then(function (docs) {
        //  docs 大于0 证明验证码匹配成功了
        return docs.length > 0
    })
}

// 生成验证码
function genCode(len) {
    var code = '';
    for (var i = 0; i < len; i++) {
        code = code + Math.floor(1 + Math.random() * 9).toString();
    }
    return code;
}

function checkTel(tel) {
    var reg = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/;
    return reg.test(tel);
}


module.exports = router;