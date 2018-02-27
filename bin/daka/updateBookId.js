var fs = require("fs");
var fsPath = '/root/signInClock';
var ArticleDB = require('../../module/DB/ArticleDB');


//设置定时任务 变量
var schedule = require("node-schedule");
var rule3 = new schedule.RecurrenceRule();

rule3.hour = 2;
rule3.minute = 10;
rule3.second = 0;


schedule.scheduleJob(rule3, function () {
    setNextBookId();
});

setNextBookId();

function setNextBookId() {

    var now = new Date();
    var today = returnDateStr(now);
    console.log('runtime: ' + now);
    console.log(today, 'today');

    ArticleDB.User.find({'articleDate': today}, {'articleList': false}).then(function (docs) {

        var currentBookId;
        if (docs.length <= 0) {
            currentBookId = '5a575a269ad8685dc845d64d';
        } else {
            currentBookId = docs[0]._id;
        }
        fs.writeFile(fsPath + '/bookId.txt', currentBookId, function () {
            console.log('success into new bookId: ' + currentBookId);
        })
    });
}


function returnDateStr(date) { // 日期转字符串
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    month = month <= 9 ? ('0' + month) : ('' + month);
    day = day <= 9 ? ('0' + day) : ('' + day);

    return year + '-' + month + '-' + day;
};
