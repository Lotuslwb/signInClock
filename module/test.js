var fs = require("fs");
var fsPath = '/root/signInClock';
var bookId = fs.readFileSync(fsPath + '/bookId.txt').toString();
var ArticleDB = require('../module/DB/ArticleDB');


ArticleDB.User.find({}, {'createTime': 1, 'articleTitle': 1}).sort({"createTime": 1}).then(function (docs) {
    var idList = docs.map(function (doc) {
        return doc._id.toString();
    });
    var index = idList.indexOf(bookId);
    console.log(index, 'index');
    console.log(bookId, 'bookId');
    console.log(idList, 'idList');
    var currentIndex = (++index) >= docs.length ? 0 : ++index;
    var currentBookId = idList[currentIndex];
    fs.writeFile(fsPath + '/bookId.txt', currentBookId, function () {
        console.log('成功写入bookId: ' + currentBookId);
    })
});
