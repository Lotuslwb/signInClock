// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var UserNameList = ['Wmm', 'Cherry'];

UserNameList.map(function (nickname) {
    getPersonInfo(nickname).then(function (data) {
        console.log(data);
    }).catch(function (e) {
        console.log(e);
    })
});


function getPersonInfo(nickname) {
    return UserDB.User.find({'personInfo.nickname': eval("/" + nickname + "/i")}, {
        'openid': 1,
        'personInfo': 1,
        'readingInfo': 1,
    }).then(function (docs) {
        console.log(docs)
        var personInfo = docs.personInfo;
        var recordIdList = docs.readingInfo.map(function (item) {
            return item.recordLocalId;
        });
        var data = {
            nickname: personInfo.nickname,
            headimgurl: personInfo.headimgurl,
            openid: openid,
            recordIdList: recordIdList
        };
        return data
    });
}










