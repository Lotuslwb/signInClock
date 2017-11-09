var getWebContent = require('./getWebContent');
var getSDKSign = require('./getSDKSign');


module.exports = function (MEDIA_ID, cb) {
    var originalUrl = '';

    getSDKSign(originalUrl, function (wxConfig) {
        var access_token = wxConfig['TOKEN'];
        var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + MEDIA_ID;
        getWebContent(url, 'GET', '', function (response) {
            cb && cb(response);
            //console.log(response.body);
            if (response.body.errcode == '0') {
                // console.log('---消息推送 成功--');
            }
        });
    });
};
