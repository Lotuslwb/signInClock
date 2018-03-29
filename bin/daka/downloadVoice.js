//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
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
    console.log('runtime: ' + new Date());
    getMediaIdObjList().then(function (MediaIdObjList) {

        // try {
        //     fs.unlinkSync('access_token.txt');
        // } catch (e) {
        //     console.error(e);
        // }

        var successLen = 0, errorLen = 0;
        var MediaIdObjPromiseList = MediaIdObjList.map(function (item) {

            var downloadPromiseArray = item.mediaIdList.map(function (mediaId) {
                return wxDownloadVoicePromise({
                    DOWNLOAD_DIR: DOWNLOAD_DIR,
                    mediaId: mediaId
                });
            });

            return Promise.all(downloadPromiseArray).then(function (data) {
                // 获得下载到本地音频的path list  就是data
                successLen += data.filter(function (item) {
                    return item.length > 0;
                }).length;
                errorLen += data.filter(function (item) {
                    return item.length <= 0;
                }).length;

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
            console.log(successLen, 'successLen');
            console.log(errorLen, 'errorLen');
        }).catch(function (e) {
            console.log(e, '下载音频错误');
        });
    });
}


function getMediaIdObjList(cb) {
    var MediaIdObjList = [];

    return UserDB.User.find({'recodeInfo.totalRecodeCounts': {$gt: 0}}, {
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

        if (MediaIdObjList.length > 40) {
            MediaIdObjList = MediaIdObjList.splice(0, 40);
        }

        console.log('todoCount:' + MediaIdObjList.length);


        return MediaIdObjList;
    });
}






