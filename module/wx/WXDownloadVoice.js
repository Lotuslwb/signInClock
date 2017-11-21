var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var exec = require('child_process').exec;
var fs = require('fs');

function wxdownloadVoice(data = {
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
        console.log(doURL);
        exec(doURL, function (err, stdout, stderr) {
            if (err) {
                console.log(error);
            }
        }).on('exit', function (code) {
            console.log('子进程已退出, 退出码 ' + code);
            cb(DOWNLOAD_DIR + mediaId + '.amr');
        });
    };
}

var wxDownloadVoicePromise = function (obj = {}) {
    return new Promise((resolve, reject) => {
        var cb = function (path) {
            resolve(path)
        }
        console.log('wxDownloadVoicePromise')
        wxDownloadVoice(obj,cb)
    })
}


module.exports = wxDownloadVoicePromise;
