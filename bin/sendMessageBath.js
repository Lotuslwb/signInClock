module.exports = function (DataTpl) {
    var fs = require("fs");
    var send = require('../module/wx/sendMessage');

    var index = 0;
    var successCount = 0;
    fs.unlinkSync('access_token.txt');
    sendTask();

    function getData() {
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
                    console.log(`--- send: ${index - 1}, successCount: ${successCount}条---`);
                }
                sendTask()
            });
        } else {
            console.log('--- finished ---');
            console.log(`--- send: ${index - 1}, successCount: ${successCount}条---`);
        }
    }
};