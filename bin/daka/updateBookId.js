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


function setNextBookId() {
    console.log('runtime: ' + new Date());
    var bookId = fs.readFileSync(fsPath + '/bookId.txt').toString();
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
            console.log('success into new bookId: ' + currentBookId);
        })
    });
}

