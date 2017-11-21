var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var exec = require('child_process').exec;
var fs = require('fs');
var wxdownloadVoice = new Promise(function (resolve, reject) {
    return function (data = {
        mediaId: '',
        DOWNLOAD_DIR: '/'
    }) {
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
                    reject(error);
                }
            }).on('exit', function (code) {
                console.log('子进程已退出, 退出码 ' + code);
                resolve(DOWNLOAD_DIR + mediaId + '.amr');
            });
        };
    }
});



module.exports = wxdownloadVoice;
