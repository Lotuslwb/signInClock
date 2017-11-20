var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');
var fs = require('fs');

var originalUrl = '';
var mediaId = '1Mzulsh1vcveqylz0Ir6REd9OH2RZDIU72Icl2cv1tVm57qXb4dy5Tm-n-NFgt0B';
getSDKSign(originalUrl, function (wxConfig) {
    var access_token = wxConfig['TOKEN'];
    var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
    console.log(url);
    getWebContent(url, 'GET', '', function (response) {
        response.body.pipe(fs.createWriteStream(mediaId));
        // if (response.body.errcode == '0') {
        //     // console.log('---消息推送 成功--');
        // }
    });
});


module.exports = function (data, cb) {

}
