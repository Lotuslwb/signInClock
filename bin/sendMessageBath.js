module.exports = function (openIdList, DataTpl) {
    var fs = require("fs");
    var send = require('../module/wx/sendMessage');

    var index = 0;
    var successCount = 0;
    fs.unlinkSync('access_token.txt');
    sendTask();

    function getData(openid) {
        DataTpl['touser'] = openid;
        return DataTpl;
    }

    function sendTask() {
        var openid = openIdList[index];
        index++;
        if (openid) {
            send(getData(openid), function (response) {
                if (response.body.errcode == '0') {
                    successCount++;
                    console.log('openid:' + openid + ' has sent success!');
                }
                sendTask()
            });
        } else {
            console.log(`--- send: ${index - 1}, successCount: ${successCount}条---`);
        }
    }
};