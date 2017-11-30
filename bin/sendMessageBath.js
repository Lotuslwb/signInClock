module.exports = function (openIdList, DataList) {
    var fs = require("fs");
    var send = require('../module/wx/sendMessage');

    var index = 0;
    var successCount = 0;

    try {
        fs.unlinkSync('access_token.txt');
    } catch (e) {
        console.log(e);
    }

    sendTask();

    function getData(index) {
        var returnData = DataList[index]
        return returnData;
    }

    function sendTask() {
        var openid = openIdList[index];
        var data = getData(index);
        index++;
        if (openid) {
            send(data, function (response) {
                if (response.body.errcode == '0') {
                    successCount++;
                    console.log('openid:' + openid + ' has sent success!');
                    console.log(`--- send: ${index - 1}, successCount: ${successCount}条---`);
                } else {
                    console.log(response.body, 'sent error');
                }
                sendTask()
            });
        } else {
            console.log('--- finished ---');
            console.log(`---total: send: ${index - 1}, successCount: ${successCount} cases---`);
        }
    }
};