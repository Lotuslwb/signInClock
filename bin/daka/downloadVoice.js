//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [0, 30];
rule2.minute = times2;

// 查询数据库
var UserDB = require('../../module/DB/UserDB');
var wxDownloadVoice = require('../../module/wx/WXDownloadVoice');

schedule.scheduleJob(rule2, function () {

});
getMediaIdObjList();
var DOWNLOAD_DIR = '/root/signInClock/public/files/media/';
//wxDownloadVoice()

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
            console.log(mediaIdList, 'mediaIdList');
            return {
                openid: doc.openid,
                mediaIdList: mediaIdList
            }
        })
        console.log(MediaIdObjList, 'MediaIdObjList');
        cb && cb(MediaIdObjList);
    });
}






