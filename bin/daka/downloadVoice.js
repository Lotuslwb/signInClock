//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [1]; // 以小时为单位,每晚1点运行
rule2.hour = times2;

// 查询数据库
var fs = require('fs');
var UserDB = require('../../module/DB/UserDB');
var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');
var DOWNLOAD_DIR = '/root/signInClock/public/files/media/';

// schedule.scheduleJob(rule2, function () {
//     getMediaIdObjList(function (MediaIdObjList) {
//         fs.unlinkSync('access_token.txt');
//         var MediaIdObjPromiseList = MediaIdObjList.map(function (item) {
//             var downloadPromiseArray = item.mediaIdList.map(function (mediaId) {
//                 return wxDownloadVoicePromise({
//                     DOWNLOAD_DIR: DOWNLOAD_DIR,
//                     mediaId: mediaId
//                 });
//             });
//             return Promise.all(downloadPromiseArray).then(function (data) {
//                 for (var i = 0; i < data.length; i++) {
//                     item['readingInfo'][i]['recordLocalId'] = data[i];
//                 }
//
//                 return UserDB.User.update({'openid': item.openid}, {'readingInfo': item.readingInfo});
//             })
//         });
//         Promise.all(MediaIdObjPromiseList).then(function (allData) {
//             console.log(allData, 'allData');
//         });
//     });
// });

getMediaIdObjList(function (MediaIdObjList) {
    fs.unlinkSync('access_token.txt');
    var MediaIdObjPromiseList = MediaIdObjList.map(function (item) {
        var downloadPromiseArray = item.mediaIdList.map(function (mediaId) {
            return wxDownloadVoicePromise({
                DOWNLOAD_DIR: DOWNLOAD_DIR,
                mediaId: mediaId
            });
        });
        return Promise.all(downloadPromiseArray).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                item['readingInfo'][i]['recordLocalId'] = data[i];
            }

            return UserDB.User.update({'openid': item.openid}, {'readingInfo': item.readingInfo});
        })
    });
    Promise.all(MediaIdObjPromiseList).then(function (allData) {
        console.log(allData, 'allData');
    });
});


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    UserDB.User.find({'recodeInfo.totalRecodeCounts': {$gt: 0}}, {
        'readingInfo': 1,
        'openid': 1,
    }).then(function (docs) {

        // var docs = docs.filter(function (item) {
        //     return item['recodeInfo']['totalRecodeCounts'] * 1 > 0;
        // });
        // console.log(docs);

        MediaIdObjList = docs.map(function (doc) {
            var mediaIdList = [];
            doc['readingInfo'].map(function (item) {
                if (item.recordLocalId.length <= 0) {
                    mediaIdList.push(item.recordServerId);
                }
            });
            return {
                openid: doc.openid,
                mediaIdList: mediaIdList,
                readingInfo: doc['readingInfo']
            }
        })

        console.log(MediaIdObjList, 'MediaIdObjList');
        cb && cb(MediaIdObjList);
    });
}






