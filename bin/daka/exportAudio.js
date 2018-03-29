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

var fs = require('fs-extra');


fs.ensureDir('/root/exportAudio').then(()=> {
    console.log('根目录准备好了')
}).catch(err => {
    console.error(err)
});

var taskList = UserOpenIdList.map(function (openid, index) {
    return getPersonInfo(openid).then(function (data) {
        var dest = '/root/exportAudio/' + data.openid
        fs.ensureDir(dest).then(()=> {
            console.log('子目录准备好了');
            return data.recordIdList.map((recordId, i)=> {
                fs.copy(recordId, dest + '/' + data.recordTimeList[i] + '.mp3').then(()=> {
                    console.log('成功复制:' + recordId)
                }).catch(err => {
                    console.error(err)
                });
            })
        }).catch(err => {
            console.error(err)
        });
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
            var recordTimeList = doc.readingInfo.filter(function (item) {
                return item.recordLocalId.length > 0;
            }).map(function (item) {
                return item.readingTimeId;
            });

            var recordIdList = doc.readingInfo.filter(function (item) {
                return item.recordLocalId.length > 0;
            }).map(function (item) {
                return item.recordLocalId;
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










