var fs = require("fs");
var fsPath = '/root/signInClock';
var bookId = fs.readFileSync(fsPath + '/bookId.txt').toString();
var ArticleDB = require('../../module/DB/ArticleDB');


//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [8];
rule2.hour = times2;

schedule.scheduleJob(rule2, function () {
    setNextBookId();
});


function setNextBookId() {
    ArticleDB.User.find({}, {'createTime': 1, 'articleTitle': 1}).sort({"createTime": 1}).then(function (docs) {
        var idList = docs.map(function (doc) {
            return doc._id.toString();
        });
        var index = idList.indexOf(bookId);
        console.log(index, 'index');
        console.log(bookId, 'bookId');
        console.log(idList, 'idList');
        var currentIndex = (index >= docs.length - 1 ? 0 : (index + 1));
        var currentBookId = idList[currentIndex];
        fs.writeFile(fsPath + '/bookId.txt', currentBookId, function () {
            console.log('成功写入bookId: ' + currentBookId);
        })
    });
}

