var leadsDB = require('../module/DB/LeadsDB');

leadsDB.User.find({
    'tag': 'v8',
    'createTime': /Sep 19/
}, function (err, docs) {
    var count = docs.length;
    console.log(count);
});


leadsDB.User.find({
    'tag': 'v8',
    'createTime': /Sep 20/
}, function (err, docs) {
    var count = docs.length;
    console.log(docs[0]);
});

function sendData(doc) {
    
}