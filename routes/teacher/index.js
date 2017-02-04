var express = require('express');
var router = express.Router();
var app = express();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');


/* GET home page. */
router.get('/', function (req, res, next) {
    var loginTel = req.signedCookies['session'];

    if (!loginTel) {
        res.redirect('teacher/login');

    } else {
        next();
    }
});

router.get('/', function (req, res, next) {
    var tel = req.signedCookies['session'].split('"')[1];
    log(tel);
    getUserInfoFormDB(tel, function (docs) {
        var status = docs[0].VoteInfo.status;
        var id = docs[0]._id;
        res.render('teacher/index', {status: status, id: id});
    }, function () {
        //失败
        res.cookie('session', '');
        res.redirect('teacher/login');
    })
});


router.get('/login', function (req, res, next) {
    var loginTel = req.signedCookies['session'];
    // if (loginTel) {
    //     res.redirect('../teacher');
    //     return false;
    // }
    res.render('teacher/login', {cityList: getCityList()});
})


router.get('/detail', function (req, res, next) {
    var openid = req.signedCookies['session'];
    var id = req.query.id;

    var ua = (req.headers['user-agent']).toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin) {
        res.redirect('/wx/wxError?redirect=/teacher/detail?id=' + id);
        return false;
    }

    // if (!openid) {
    //     res.redirect('/wx?router=teacher/detail?id=' + id);
    //     return false;
    // }


    // todo  如果没有id,应该验证
    if (id) {
        teacherDB.find({_id: id, 'VoteInfo.status': 2}).then(function (docs) {
            if (docs.length > 0) {
                res.render('teacher/detail', {data: docs[0]});
            } else {
                res.render('teacher/detail', {data: ''});
            }
        });
    }
});

router.get('/list', function (req, res, next) {
    var schoolList = getSchoolList();
    var data = {
        cityNo: req.query.cityNo,
        cityList: getCityList(),
        schoolNo: req.query.schoolNo,
    }

    for (var index in schoolList) {
        var item = schoolList[index];
        if (item.cityNo == data.cityNo && item['schoolArray']) {
            data.schoolArray = item.schoolArray;
        }
    }

    getTeacherListByCityNo(data.cityNo, data.schoolNo, function (docs) {
        data.list = docs;
        res.render('teacher/list', {data: data});
    }, function (error) {
        log(error);
        data.list = '';
        data.error = error;
        res.render('teacher/list', {data: data});
    })
});

router.get('/registerDone', function (req, res, next) {
    res.render('teacher/registerDone');
})


function getUserInfoFormDB(tel, callback_s, callback_f) {

    if (!tel) {
        callback_f && callback_f('tel 不能为空');
    }
    var findJSON = {
        'teacherInfo.cellPhone': tel
    };
    teacherDB.find(findJSON).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}

function getTeacherListByCityNo(cityNo, schoolNo, callback_s, callback_f) {
    if (!cityNo) {
        callback_f && callback_f('cityNo 不能为空');
    }
    var findJSON = {
        'teacherInfo.cityNo': cityNo,
        'VoteInfo.status': 2
    };

    if (schoolNo) {
        findJSON['teacherInfo.schoolNo'] = schoolNo;
    }
    teacherDB.User.find(findJSON, {'teacherInfo.passWord': false, 'IPArray': false}).then(function (docs) {
        if (docs.length > 0) {
            log('---数据库里面已经有此用户---');
            callback_s && callback_s(docs);
        } else {
            log('---数据库里面暂无此用户---');
            callback_f && callback_f(docs);
        }
    });
}

function getCityList() {
    return require('../../module/data/teacher');
}


function getSchoolList() {
    return require('../../module/data/school');
}


module.exports = router;
