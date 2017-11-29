//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [0, 30];
rule2.minute = times2;

// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var ArticleDB = require('../../module/DB/ArticleDB');


//设置批量发送消息
var sendMessageBath = require('../sendMessageBath');
var data = {
    "touser": '',  //接收者openid
    "template_id": "puqokuG4Mn2TSNOpxif5NcRf5sNgNw_7fMK37fjN91o", //模板ID
    "url": "http://ma.eldesign.cn/daka/index",
    "data": {
        "first": {
            "value": "XXX，今日的阅读内容已新鲜出炉！",
            "color": "#173177"
        },
        "keyword1": {
            "value": "Babette's Breakout",
            "color": "#173177"
        },
        "keyword2": {
            "value": "2017年11月15日 20:00",
            "color": "#173177"
        },
        "remark": {
            "value": "阅读使我快乐，点击开始今天的阅读",
            "color": "#173177"
        }
    }
};

schedule.scheduleJob(rule2, function () {
    var bookId = getBookId();
    var now = new Date();
    var now_date = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + now.getHours() + ':' + (now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes());
    getBookInfoById(bookId, function (docs) {
        var bookName = docs[0].articleTitle;
        getOpenIdObjList(function (openIdObjList) {
            var openIdList = [];
            var dataList = openIdObjList.map(function (item) {
                openIdList.push(item.openid);
                var newData = {
                    "touser": item.openid,  //接收者openid
                    "template_id": "puqokuG4Mn2TSNOpxif5NcRf5sNgNw_7fMK37fjN91o", //模板ID
                    "url": "http://ma.eldesign.cn/daka/index",
                    "data": {
                        "first": {
                            "value": item.personInfo['nickname'] + '，今日的阅读内容已新鲜出炉！',
                            "color": "#173177"
                        },
                        "keyword1": {
                            "value": bookName,
                            "color": "#173177"
                        },
                        "keyword2": {
                            "value": now_date,
                            "color": "#173177"
                        },
                        "remark": {
                            "value": "阅读使我快乐，点击开始今天的阅读",
                            "color": "#173177"
                        }
                    }
                };
                console.log(item['personInfo']['nickname'] + ' isReady send!!');
                return newData;
            });
            sendMessageBath(openIdList, dataList);
        });
    })
});


function getBookId() {
    var fs = require("fs");
    var fsPath = '/root/signInClock';
    var bookId = fs.readFileSync(fsPath + '/bookId.txt');
    return bookId;
}

function getBookInfoById(id, cb_s, cb_f) {
    ArticleDB.find({_id: id}, function (err, docs) {
        if (err) {
            cb_f && cb_f(err);
        } else {
            cb_s && cb_s(docs);
        }
    });
}


function getOpenIdObjList(cb) {
    var openIdObjList = [];


    UserDB.User.find({'clockInfo.clockSwitch': 'on'}, {
        'clockInfo': 1,
        'openid': 1,
        'personInfo': 1
    }).then(function (docs) {
        var now = new Date();
        var now_hours = now.getHours();
        var now_minutes = now.getMinutes();

        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            var doc_time = doc['clockInfo']['clockTime'];
            var doc_hours = doc_time.split(':')[0];
            var doc_minutes = doc_time.split(':')[1];
            if (now_hours == doc_hours && Math.abs(now_minutes - doc_minutes) <= 5) {
                // var openid = doc['openid'];
                openIdObjList.push(doc);
            }
        }
        cb && cb(openIdObjList);
    });
}






