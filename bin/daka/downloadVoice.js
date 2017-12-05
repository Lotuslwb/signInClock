//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [0, 30];
rule2.minute = times2;

// 查询数据库
var fs = require('fs');
var UserDB = require('../../module/DB/UserDB');
var wxDownloadVoicePromise = require('../../module/wx/WXDownloadVoice');
var DOWNLOAD_DIR = '/root/signInClock/public/files/media/';

schedule.scheduleJob(rule2, function () {
    console.log('runtime: ' + new Date());
    downloadVoice();
});

downloadVoice();


function downloadVoice() {
    getMediaIdObjList(function (MediaIdObjList) {

        if (MediaIdObjList.length > 50) {
            MediaIdObjList = MediaIdObjList.splice(0, 50);
        }
        //console.log(MediaIdObjList, 'MediaIdObjList');

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
                var newReadingInfo = item['readingInfo'].map(function (target) {
                    var recordServerId = target['recordServerId'];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].indexOf(recordServerId) > -1) {
                            target['recordLocalId'] = data[i];
                        }
                    }
                    return target;
                });

                return UserDB.User.update({'openid': item.openid}, {'readingInfo': newReadingInfo});
            })
        });
        Promise.all(MediaIdObjPromiseList).then(function (allData) {
            console.log(allData.length, 'allData');
        }).catch(function (e) {
            console.log(e, '下载音频错误');
        });
    });
}


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    UserDB.User.find({'recodeInfo.totalRecodeCounts': {$gt: 0}}, {
        'readingInfo': 1,
        'openid': 1,
    }).then(function (docs) {
        //只考虑打过卡的用户
        MediaIdObjList = docs.map(function (doc) {
            var mediaIdList = [];
            doc['readingInfo'].map(function (item) {
                //如果没有下载,即没有recordLocalId,则放入mediaIdList
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
        cb && cb(MediaIdObjList);
    });
}






