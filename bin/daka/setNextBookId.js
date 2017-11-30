/**
 * Created by lotuslwb on 17/11/30.
 */

setNextBookId();

function setNextBookId() {
    console.log('runtime: ' + new Date());
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