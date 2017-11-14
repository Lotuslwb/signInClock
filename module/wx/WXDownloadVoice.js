var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var originalUrl = '';
var mediaId = '1237378768e7q8e7r8qwesafdasdfasdfaxss111';
getSDKSign(originalUrl, function (wxConfig) {
    var access_token = wxConfig['TOKEN'];
    var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
    console.log(url);
    getWebContent(url, 'GET', '', function (response) {
        console.log(response.body);
        // if (response.body.errcode == '0') {
        //     // console.log('---消息推送 成功--');
        // }
    });
});


module.exports = function (data, cb) {

}
