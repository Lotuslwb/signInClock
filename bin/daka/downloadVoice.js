//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [0, 30];
rule2.minute = times2;

// 查询数据库
var fs = require('fs');
var UserDB = require('../../module/DB/UserDB');
var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');

schedule.scheduleJob(rule2, function () {

});

var DOWNLOAD_DIR = '/root/signInClock/public/files/media/';

getMediaIdObjList(function (MediaIdObjList) {
    fs.unlinkSync('access_token.txt');
    var MediaIdObjOutputList;
    var MediaIdObjPromiseList = MediaIdObjList.map(function (item) {
        var downloadPromiseArray = item.mediaIdList.map(function (mediaId) {
            return wxDownloadVoicePromise({
                DOWNLOAD_DIR: DOWNLOAD_DIR,
                mediaId: mediaId
            });
        });
        return Promise.all(downloadPromiseArray).then(function (data) {
            console.log(data, 'downloadPromiseArray')
            item.localIdList = data;
        })
    });
    Promise.all(MediaIdObjPromiseList).then(function (allData) {
        console.log(allData);
    })
});


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    UserDB.User.find({'recodeInfo.totalRecodeCounts': {$gt: 0}}, {
        'readingInfo': 1,
        'openid': 1,
    }).then(function (docs) {
        MediaIdObjList = docs.map(function (doc) {
            var mediaIdList = doc['readingInfo'].map(function (item) {
                if (item.recordLocalId.length <= 0) {
                    return item.recordServerId;
                }
            });
            return {
                openid: doc.openid,
                mediaIdList: mediaIdList,
                ...doc
            }
        })
        cb && cb(MediaIdObjList);
    });
}






