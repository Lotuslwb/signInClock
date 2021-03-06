var express = require('express');
var router = express.Router();

var log = require('../../module/tools/log');
var teacherDB = require('../../module/DB/TeacherDB');
var leadsDB = require('../../module/DB/LeadsDB');

var ArticleDB = require('../../module/DB/ArticleDB');
var ConfigDB = require('../../module/DB/ConfigDB');

var config = require('../admin/tsconfig.json');

var fs = require('fs');


/*管理员登录*/
router.post('/login', function (req, res, next) {
    var res = res;
    var data = req.body;
    if (data.username == config.username && data.password == config.password) {
        res.cookie('session', JSON.stringify(data.username), {
            signed: true
        });
        res.send(sendData('200', true, ''));
    } else {
        res.send(sendData('201', false, '用户名或者密码错误,请重试'));
    }
});


/*金牌班主任 查询接口*/
router.post('/teacher/query', function (req, res, next) {
    var status = req.body.status;
    var realName = req.body.realName;
    var cellPhone = req.body.cellPhone;
    var limit = req.body.limit * 1;
    var start = req.body.start * 1;
    var field = req.body.field;
    var direction = req.body.direction;
    var cityNo = req.body.cityNo;
    var schoolNo = req.body.schoolNo;
    var sortJSON = {}
    var queryJSON = {};

    if (cityNo) {
        queryJSON["teacherInfo.cityNo"] = cityNo;
    }
    if (schoolNo) {
        queryJSON["teacherInfo.schoolNo"] = schoolNo;
    }

    if (status) {
        queryJSON["VoteInfo.status"] = status;
    }

    if (realName) {
        queryJSON["teacherInfo.realName"] = realName;
    }

    if (cellPhone) {
        queryJSON["teacherInfo.cellPhone"] = cellPhone;
    }

    if (field == 'totalVoteCounts') {
        sortJSON['VoteData.totalVoteCounts'] = direction == 'ASC' ? 1 : -1;
    }

    if (field == 'status') {
        sortJSON['VoteInfo.status'] = direction == 'ASC' ? 1 : -1;
    }

    teacherDB.User.find(queryJSON, {
        IPArray: 0
    }, function (err, docs) {
        var totalCount = docs.length;
        queryUserInfoFormDB(queryJSON, start, limit, sortJSON, function (docs) {
            for (var i = 0; i < docs.length; i++) {
                docs[i]['teacherInfo'].passWord = '****';
                docs[i]['IPArray'] = [];
                docs[i]['studentWords'] = [];
                docs[i]['IPOBJ'] = [];
            }
            res.send(sendData('200', {
                list: docs,
                totalCount: totalCount
            }, ''));
        });
    });


});

/*金牌班主任 查询详情接口*/
router.post('/teacher/queryById', function (req, res, next) {
    var tel = req.body.tel;
    getUserInfoFormDB(tel, function (docs) {
        //console.log(docs);
        if (docs) {
            for (var i = 0; i < docs.length; i++) {
                docs[i]['teacherInfo'].passWord = '****';
                docs[i]['IPArray'] = [];
                docs[i]['IPOBJ'] = [];
            }
        }
        res.send(sendData('200', {
            list: docs
        }, ''));
    });

});

/*金牌班主任 删除接口*/
router.post('/teacher/del', function (req, res, next) {
    var cellPhone = req.body.cellPhone;
    var queryJSON = {};

    if (!cellPhone) {
        res.send(sendData('201', false, '手机号不能为空'));
        return false;
    }

    queryJSON["teacherInfo.cellPhone"] = cellPhone;

    deleteUserInfoFormDB(queryJSON, function (docs) {
        res.send(sendData('200', true, ''));
    });
});

/*金牌班主任 通过审核接口*/
router.post('/teacher/reviewed', function (req, res, next) {
    var _id = req.body._id;

    if (!_id) {
        res.send(sendData('201', false, 'id不能为空'));
        return false;
    }

    updateUserInfoToDB(_id, {
        'VoteInfo.status': '2'
    }, function (docs) {
        res.send(sendData('200', true, ''));
    }, function (docs, err) {
        res.send(sendData('201', false, err));
    });
});

/*金牌班主任 修改状态接口*/
router.post('/teacher/changeStatus', function (req, res, next) {
    var _id = req.body._id;
    var status = req.body.status;
    var cityNo = req.body.cityNo;
    var schoolNo = req.body.schoolNo;

    if (!_id) {
        res.send(sendData('201', false, 'id不能为空'));
        return false;
    }

    if (!status) {
        res.send(sendData('201', false, 'status不能为空'));
        return false;
    }
    var findJSON = {
        'VoteInfo.status': status
    };

    if (cityNo) {
        findJSON['teacherInfo.cityNo'] = cityNo;
        var cityList = getCityList();
        for (var i in cityList) {
            var item = cityList[i];
            if (item.cityNo == cityNo) {
                findJSON['teacherInfo.cityName'] = item.cityName;
            }
        }
    }
    if (schoolNo) {
        findJSON['teacherInfo.schoolNo'] = schoolNo;
        var schoolList = getSchoolList();
        for (var i in schoolList) {
            var item = schoolList[i];
            if (item.cityNo == cityNo) {
                findJSON['teacherInfo.schoolName'] = item.schoolArray[schoolNo];
            }
        }
    }
    log(findJSON);

    updateUserInfoToDB(_id, findJSON, function (docs) {
        res.send(sendData('200', true, ''));
    }, function (docs, err) {
        res.send(sendData('201', false, err));
    });
});

/*金牌班主任 批量修改状态接口*/
router.post('/teacher/changeStatusBath', function (req, res, next) {
    var _idArray = req.body._idArray.split(',');
    var status = req.body.status;

    if (!_idArray) {
        res.send(sendData('201', false, 'id不能为空'));
        return false;
    }

    if (!status) {
        res.send(sendData('201', false, 'status不能为空'));
        return false;
    }

    updates(0);

    function updates(index) {
        updateUserInfoToDB(_idArray[index], {
            'VoteInfo.status': status
        }, function (docs) {
            if (index < _idArray.length) {
                index++;
                updates(index);
            } else {
                res.send(sendData('200', true, '成功批量' + index + '个'));
            }
        }, function (docs, err) {
            res.send(sendData('201', false, err + '————成功批量' + index + 1 + '个' + ';失败' + _idArray.length - (index + 1) + '个'));
        });
    }

});


/*金牌班主任 发送短信接口*/
router.post('/teacher/smsSend', function (req, res, next) {
    var name = req.body.name;
    var cellPhone = req.body.cellPhone;

    if (!name) {
        res.send(sendData('201', false, 'name不能为空'));
        return false;
    }

    if (!cellPhone) {
        res.send(sendData('201', false, 'cellPhone不能为空'));
        return false;
    }

    var smsSend = require('../../module/sms/TeacherSMS');
    smsSend(name, cellPhone);
    res.send(sendData('200', true, ''));
});


/*收集leads 查询接口*/
router.post('/leads/query', function (req, res, next) {
    // var tag = req.body.tag;
    var tag = 'v7';
    var realName = req.body.realName;
    var cellPhone = req.body.cellPhone;
    var limit = req.body.limit * 1;
    var start = req.body.start * 1;
    var field = req.body.field;
    var direction = req.body.direction;
    var sortJSON = {}
    var queryJSON = {};

    if (tag) {
        queryJSON["tag"] = tag;
    }

    if (realName) {
        queryJSON["realName"] = realName;
    }

    if (cellPhone) {
        queryJSON["cellPhone"] = cellPhone;
    }

    if (field == 'totalVoteCounts') {
        sortJSON['VoteData.totalVoteCounts'] = (direction == 'ASC' ? 1 : -1);
    }

    if (field == 'tag') {
        sortJSON['tag'] = (direction == 'ASC' ? 1 : -1);
    }

    leadsDB.User.find(queryJSON, function (err, docs) {
        var totalCount = docs.length;
        queryDataFormDB(leadsDB, queryJSON, start, limit, sortJSON, function (docs) {
            res.send(sendData('200', {
                list: docs,
                totalCount: totalCount
            }, ''));
        });
    });


});

router.post('/leads/export', function (req, res, next) {
    var tag = req.body.tag;
    var realName = req.body.realName;
    var cellPhone = req.body.cellPhone;
    var queryJSON = {};

    if (tag) {
        queryJSON["tag"] = tag;
    }

    if (realName) {
        queryJSON["realName"] = realName;
    }

    if (cellPhone) {
        queryJSON["cellPhone"] = cellPhone;
    }


    leadsDB.User.find(queryJSON, function (err, docs) {
        log(docs);
        var data = [
            [1, 2, 3],
            [true, false, null, 'sheetjs'],
            ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
            ['baz', null, 'qux']
        ];

        var buffer = xlsx.build(data);
        fs.writeFileSync('b.xlsx', buffer, 'binary');
        res.send(sendData('200', 'export successfully!', ''));
    });


});


/* 打卡计划 -- 上传图片*/
router.post('/daka/uploadImage', function (req, res, next) {

    var multiparty = require('multiparty');
    var fs = require('fs');

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: './public/files/daka'
    });
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            res.send(sendData('999', err, '上传错误'));
        } else {
            log(files);
            var inputFile = files['Filedata'][0];
            var uploadedPath = inputFile.path;
            res.send(sendData('200', {
                'imgName': uploadedPath
            }, ''));
        }


    });
});

/* 打卡计划 --  上传文章信息 */
router.post('/daka/saveArticleData', function (req, res, next) {
    var data = req.body;
    console.log(data);

    var result = hanldeArticleData(data);
    saveArticleDataToDB(result, function (docs) {
        res.send(sendData('200', docs, ''));
    });
});

/* 打卡计划 --  保存配置信息 */
router.post('/daka/saveConfigData', function (req, res, next) {
    var data = req.body;
    console.log(data);

    saveConfigDataToDB(data, function (docs) {
        res.send(sendData('200', docs, ''));
    });
});

router.post('/daka/updateArticleData', function (req, res, next) {
    var data = req.body;
    console.log(data);

    var result = hanldeArticleData(data);
    result.id = data.id;
    updateArticleDataToDB(result, function (docs) {
        res.send(sendData('200', docs, ''));
    });
});

function hanldeArticleData(data) {
    var result = {};
    result.articleDate = data.articleDate || "2011-01-01";
    result.createTime = new Date().getTime();
    result.articleList = [];
    for (var i = 1; i <= 2; i++) {
        var articleItem = {
            articleText: data['articleText' + i],
            articleTitle: data['articleTitle' + i],
            audioURL: data['audioURL' + i],
            brief: data['brief' + i],
            coverUrl: data['coverUrl' + i],
            difficulty: data['difficulty' + i],
            needTime: data['needTime' + i + '_1'] + ':' + data['needTime' + i + '_2'],
            tag: data['tag' + i],
            resourceType: data['tag' + i],
            videoURL: data['videoURL' + i],
            audioURL: data['audioURL' + i],
            wordLength: data['wordLength' + i],
        }
        result.articleList.push(articleItem);
    }
    return result;
}

/* 打卡计划 --  查询接口*/
router.post('/daka/query', function (req, res, next) {
    ArticleDB.find({}, function (err, docs) {
        var totalCount = docs.length;
        res.send(sendData('200', {
            list: docs,
            totalCount: totalCount
        }, ''));
    });
});
/*打卡计划 删除接口*/
router.post('/daka/del', function (req, res, next) {
    var _id = req.body._id;
    var queryJSON = {};

    if (!_id) {
        res.send(sendData('201', false, '手机号不能为空'));
        return false;
    }

    queryJSON["_id"] = _id;
    ArticleDB.remove(queryJSON).then(function (docs) {
        res.send(sendData('200', true, ''));
    });
});


function saveArticleDataToDB(data, callback_s, callback_f) {
    if (!data) {
        callback_f && callback_f('数据不能为空');
    }
    ArticleDB.add(data, function (err, docs) {
        if (err) {
            log('插入数据库失败', err);
            callback_f && callback_f('插入数据库失败:' + err);
        } else {
            log('成功插入');
            callback_s && callback_s(docs);
        }
    })

}


function saveConfigDataToDB(data, callback_s, callback_f) {
    if (!data) {
        callback_f && callback_f('数据不能为空');
    }
    ConfigDB.find({}, function (err, docs) {
        if (err) {
            log('查找数据库失败', err);
        } else {
            if (docs.length > 0) {
                var id = docs[0]._id;
                ConfigDB.update(id, data, function (err, docs) {
                    if (err) {
                        log('插入数据库失败', err);
                        callback_f && callback_f('插入数据库失败:' + err);
                    } else {
                        log('成功插入');
                        callback_s && callback_s(docs);
                    }
                })
            } else {
                ConfigDB.add(data, function (err, docs) {
                    if (err) {
                        log('插入数据库失败', err);
                        callback_f && callback_f('插入数据库失败:' + err);
                    } else {
                        log('成功插入');
                        callback_s && callback_s(docs);
                    }
                })
            }

        }
    })

}

function updateArticleDataToDB(data, callback_s, callback_f) {
    if (!data) {
        callback_f && callback_f('数据不能为空');
    }
    console.log(data)
    var id = data.id;
    delete data.id;

    ArticleDB.update(id, data, function (err, docs) {
        if (err) {
            log('插入数据库失败', err);
            callback_f && callback_f('插入数据库失败:' + err);
        } else {
            log('成功插入');
            callback_s && callback_s(docs);
        }
    })

}

function sendData(status, data, errmsg) {
    return {
        status: status,
        data: data,
        errmsg: errmsg
    }
}

function queryUserInfoFormDB(json, start, limit, sortJSON, callback_s, callback_f) {

    if (!json) {
        json = {}
    }

    teacherDB.User.find(json, function (err, docs) {
        if (err) {
            log('查找失败', err);
            return;
        }
        log('查找成功');
        callback_s && callback_s(docs);
    }).skip(start).limit(limit).sort(sortJSON);
}


function deleteUserInfoFormDB(json, callback_s, callback_f) {

    if (!json) {
        json = {}
    }

    teacherDB.remove(json).then(function (docs) {
        callback_s && callback_s(docs);
    });
}


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

function updateUserInfoToDB(_id, data, callback_s, callback_f) {
    console.log(data);
    teacherDB.update(_id, data, function (err, docs) {
        if (err) {
            log(err);
            callback_f && callback_f(docs, err);
        } else {
            log(docs)
            callback_s && callback_s(docs);
        }
    });
}


function queryDataFormDB(DB, json, start, limit, sortJSON, callback_s, callback_f) {

    if (!json) {
        json = {}
    }

    DB.User.find(json, function (err, docs) {
        if (err) {
            log('查找失败', err);
            return;
        }
        log('查找成功');
        callback_s && callback_s(docs);
    }).skip(start).limit(limit).sort(sortJSON);
}


function getCityList() {
    return require('../../module/data/teacher');
}


function getSchoolList() {
    return require('../../module/data/school');
}

module.exports = router;