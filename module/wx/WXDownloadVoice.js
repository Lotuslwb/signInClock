var getWebContent = require('../../module/tools/getWebContent');
var getSDKSign = require('../../module/wx/getSDKSign');

var originalUrl = '';
var medieId = 'wxLocalResource://voiceLocalId1234567890123';
getSDKSign(originalUrl, function (wxConfig) {
    var access_token = wxConfig['TOKEN'];
    var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
    getWebContent(url, 'POST', data, function (response) {
        cb && cb(response);
        //console.log(response.body);
        if (response.body.errcode == '0') {
            // console.log('---消息推送 成功--');
        }
    });
});


module.exports = function (data, cb) {

}
