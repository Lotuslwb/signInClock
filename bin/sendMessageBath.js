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
                }
                sendTask()
            });
        } else {
            console.log(`一共发送${index - 1}条,成功${successCount}条 `);
        }
    }
};