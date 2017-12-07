var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var exec = require('child_process').exec;
var fs = require('fs');

//媒体格式转化
var ffmpeg = require('fluent-ffmpeg');

var wxDownloadVoicePromise = function (obj = {}) {
    return new Promise((resolve, reject) => {
        var cb = function (path) {
            resolve(path)
        }
        wxDownloadVoice(obj, cb)
    })
};


function wxDownloadVoice(data = {
    mediaId: '',
    DOWNLOAD_DIR: '/'
}, cb) {
    var DOWNLOAD_DIR = data.DOWNLOAD_DIR;
    var mediaId = data.mediaId;
    var originalUrl = '';
    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
        var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
        download_file_curl(url, mediaId);
    });

    var download_file_curl = function (file_url, mediaId) {
        var doURL = 'curl -o ' + DOWNLOAD_DIR + mediaId + '.amr "' + file_url + '"';
        exec(doURL, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
        }).on('exit', function (code) {
            //console.log('下载完成');
            var command = ffmpeg(DOWNLOAD_DIR + mediaId + '.amr')
                .on('end', function () {
                    //console.log('file has been converted succesfully');
                    cb(DOWNLOAD_DIR + mediaId + '.mp3');
                })
                .on('error', function (err) {
                    console.log('an error happened: ' + err.message);
                    cb('');
                })
                .save(DOWNLOAD_DIR + mediaId + '.mp3');
        });
    };
}


module.exports = wxDownloadVoicePromise;
