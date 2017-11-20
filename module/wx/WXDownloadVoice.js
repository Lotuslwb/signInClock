var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var DOWNLOAD_DIR = './downloads/';
var spawn = require('child_process').spawn;
var fs = require('fs');
var url = require('url');


var originalUrl = '';
var mediaId = '1Mzulsh1vcveqylz0Ir6REd9OH2RZDIU72Icl2cv1tVm57qXb4dy5Tm-n-NFgt0B';
getSDKSign(originalUrl, function (wxConfig) {
    var access_token = wxConfig['TOKEN'];
    var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
    console.log(url);


    download_file_curl(url)

    // getWebContent(url, 'GET', '', function (response) {
    //     response.body.pipe(fs.createWriteStream(mediaId));
    //     // if (response.body.errcode == '0') {
    //     //     // console.log('---消息推送 成功--');
    //     // }
    // });
});


// Function to download file using curl
var download_file_curl = function (file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // create an instance of writable stream
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
    // execute curl using child_process' spawn function
    var curl = spawn('curl', [file_url]);
    // add a 'data' event listener for the spawn instance
    curl.stdout.on('data', function (data) {
        file.write(data);
    });
    // add an 'end' event listener to close the writeable stream
    curl.stdout.on('end', function (data) {
        file.end();
        console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
    // when the spawn child process exits, check if there were any errors and close the writeable stream
    curl.on('exit', function (code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
};


module.exports = function (data, cb) {

}
