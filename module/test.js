var fs = require("fs");
var fsPath = '/root/signInClock';
var bookId = fs.readFileSync(fsPath + '/bookId.txt');
var ArticleDB = require('../module/DB/ArticleDB');


ArticleDB.User.find({}, {'createTime': 1, 'articleTitle': 1}).sort({"createTime": 1}).then(function (docs) {
    console.log(docs);
});
