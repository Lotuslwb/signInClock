// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var UserNameList = ['Wmm', 'Cherry'];

UserNameList.map(function (nickname) {
    getPersonInfo(nickname).then(function (data) {
        console.log(data);
    })
});


function getPersonInfo(nickname) {
    return UserDB.User.find({'personInfo.nickname': /^nickname/}, {
        'openid': 1,
        'personInfo': 1,
        'readingInfo': 1,
    }).then(function (docs) {
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










