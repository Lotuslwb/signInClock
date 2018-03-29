// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var UserOpenIdList = [
    "oKdUIuGB97gFcBHSn7T-zmKa-p8M",
    "oKdUIuL0FV8avA37RVYHeAU13NNI",
    "oKdUIuCStz-Xo_kMxwGWZgDK7Fx8",
    "oKdUIuNSOeNEzm3QYEwCpwo6yajY",
    "oKdUIuETiycJkPtvKGDIzW6Ze8Gc",
    "oKdUIuI9J55-KrP4uLLJrd6XV5m4",
    "oKdUIuGWivHa2d1wtx8ejZ7cXJ1w",
    "oKdUIuGC3_0GnzmH7oqktoK23dng",
    "oKdUIuIa39WqzSgoh84c0Xr2wR1s",
    "oKdUIuBRAkywnkxTAGtWLmGsZKbw",
    "oKdUIuDGsoXKd29Ccu2wGn1tfv_E",
    "oKdUIuOVpPGNaj_nBzORmTp_mvHQ",
    "oKdUIuPWTy8WGHWzCEFSiqOkvySw",
    "oKdUIuHlu6cQsYIXU8T96Gk6l26k",
    "oKdUIuLQT2JdzWxQosCAbd5722iA",
    "oKdUIuEHs3IMbA6dQH8K7CnG7tZs"];


var taskList = UserOpenIdList.map(function (openid, index) {
    return getPersonInfo(openid).then(function (data) {
        if (index == 0) console.log(data.recordIdList.length, data.recordTimeList.length, openid);
    }).catch(function (e) {
        console.log(e);
    });
});

Promise.all(taskList).then(function () {
    console.log('finish');
}).catch(function (e) {
    console.log(e);
});


function getPersonInfo(openid) {
    return UserDB.User.find({'openid': openid}, {
        'openid': 1,
        'personInfo': 1,
        'readingInfo': 1,
    }).then(function (docs) {
        var data = docs.map(function (doc) {
            var personInfo = doc.personInfo;
            var recordTimeList = [];
            var recordIdList = doc.readingInfo.map(function (item) {
                recordTimeList.push(item.readingTimeId);
                return item.recordLocalId;
            }).filter(function (item) {
                return item.length > 0;
            });
            return {
                nickname: personInfo.nickname,
                headimgurl: personInfo.headimgurl,
                openid: doc.openid,
                recordIdList: recordIdList,
                recordTimeList: recordTimeList
            };
        })
        data = data.filter(function (item) {
            return item.recordIdList.length > 0;
        })
        return data[0];
    });
}










