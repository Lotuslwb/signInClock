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

schedule.scheduleJob(rule2, function () {
    downloadVoice();
});

downloadVoice();


function downloadVoice() {
    getMediaIdObjList(function (MediaIdObjList) {
        try {
            fs.unlinkSync('access_token.txt');
        } catch (e) {
            console.error(e);
        }

        var MediaIdObjPromiseList = MediaIdObjList.map(function (item) {
            var downloadPromiseArray = item.mediaIdList.map(function (mediaId) {
                return wxDownloadVoicePromise({
                    DOWNLOAD_DIR: DOWNLOAD_DIR,
                    mediaId: mediaId
                });
            });
            return Promise.all(downloadPromiseArray).then(function (data) {
                // 获得下载到本地音频的path list  就是data
                for (var i = 0; i < data.length; i++) {
                    var recordServerId = item['readingInfo'][i]['recordServerId'];
                    if (data[i].indexOf(recordServerId) > -1) {
                        item['readingInfo'][i]['recordLocalId'] = data[i];
                    }
                }
                return UserDB.User.update({'openid': item.openid}, {'readingInfo': item.readingInfo});
            })
        });
        Promise.all(MediaIdObjPromiseList).then(function (allData) {
            console.log(allData, 'allData');
        }).catch(function (e) {
            console.log(e, '下载音频错误');
        });
    });
}


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    UserDB.User.find({}, {
        'readingInfo': 1,
        'openid': 1,
    }).then(function (docs) {
        MediaIdObjList = docs.map(function (doc) {
            var mediaIdList = [];
            doc['readingInfo'].map(function (item) {
                //如果没有下载,即没有recordLocalId,则放入mediaIdList
                if (item.openid == '5a03f4ac9c6664183ec05df3') {
                    console.log(item,'5a03f4ac9c6664183ec05df3');
                }
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
        MediaIdObjList = MediaIdObjList.filter(function (item) {
            return item.mediaIdList.length > 0;
        })
        console.log(MediaIdObjList, 'MediaIdObjList');
        cb && cb(MediaIdObjList);
    });
}






