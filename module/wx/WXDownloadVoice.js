var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var DOWNLOAD_DIR = '/';
var exec = require('child_process').exec;
var fs = require('fs');


var originalUrl = '';
var mediaId = '1Mzulsh1vcveqylz0Ir6REd9OH2RZDIU72Icl2cv1tVm57qXb4dy5Tm-n-NFgt0B';
getSDKSign(originalUrl, function (wxConfig) {
    var access_token = wxConfig['TOKEN'];
    var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
    console.log(url);
    download_file_curl(url, mediaId);
});


// Function to download file using curl
var download_file_curl = function (file_url, mediaId) {
    exec('curl -o ' + mediaId + '.amr "' + file_url + '"', function (err, stdout, stderr) {
        if (err) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('data : ' + stdout);
    }).on('exit', function (code) {
        console.log('子进程已退出, 退出码 ' + code);
    });
};


module.exports = function (data, cb) {

}
