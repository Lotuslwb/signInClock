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
// getMediaIdObjList(function (MediaIdObjList) {
//     fs.unlinkSync('access_token.txt');
//     var MediaIdObjOutputList;
//     MediaIdObjList.map(function (item) {
//         item.mediaIdList.map(function (mediaId) {
//             wxDownloadVoice({
//                 DOWNLOAD_DIR: DOWNLOAD_DIR,
//                 mediaId: mediaId
//             }, function (path) {
//                 output.push({
//                     mediaId: mediaId,
//                     localPath: path
//                 })
//             })
//         })
//     })
// });

wxDownloadVoicePromise({
    DOWNLOAD_DIR,
    mediaId: '4R5jLdLkmwkM5oA_qj_2syyg6GeMZL_3eCaszeTAnzvQS9XkJb1fWyLYIW2Scbdn'
}).then(function (path) {
    console.log(path, 'path');
})


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    UserDB.User.find({'recodeInfo.totalRecodeCounts': {$gt: 0}}, {
        'readingInfo': 1,
        'openid': 1,
    }).then(function (docs) {
        console.log(docs, 'docs');
        MediaIdObjList = docs.map(function (doc) {
            var mediaIdList = doc['readingInfo'].map(function (item) {
                if (item.recordLocalId.length <= 0) {
                    return item.recordServerId;
                }
            });
            return {
                openid: doc.openid,
                mediaIdList: mediaIdList
            }
        })
        cb && cb(MediaIdObjList);
    });
}






