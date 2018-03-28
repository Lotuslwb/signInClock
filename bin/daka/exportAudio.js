// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var UserNameList = ['Wmm', 'Cherry', '「」jiang', '株株', 'AJack·GB', '吴晓静', 'Catherine', '冰清', 'izumi', 'Alicia', 'nicole', '咕哩咕哩', '懿', '疏影横斜', 'Luluzhuo', '红英落秋', '王卉', 'lika', 'penny', 'Emma', 'tony'];

var taskList = UserNameList.map(function (nickname) {
    return getPersonInfo(nickname).then(function (data) {
        console.log(data);
    }).catch(function (e) {
        console.log(e);
    });
});

Promise.all(taskList).then(function () {
    console.log('finish');
}).catch(function (e) {
    console.log(e);
});


function getPersonInfo(nickname) {
    return UserDB.User.find({'personInfo.nickname': eval("/" + nickname + "/")}, {
        'openid': 1,
        'personInfo': 1,
        'readingInfo': 1,
    }).then(function (docs) {
        var data = docs.map(function (doc) {
            var personInfo = doc.personInfo;
            var recordIdList = doc.readingInfo.map(function (item) {
                return item.recordLocalId;
            }).filter(function (item) {
                return item.length > 0;
            });
            return {
                nickname: personInfo.nickname,
                headimgurl: personInfo.headimgurl,
                openid: doc.openid,
                recordIdList: recordIdList
            };
        })
        data = data.filter(function (item) {
            return item.recordIdList.length > 0;
        })
        return data;
    });
}










