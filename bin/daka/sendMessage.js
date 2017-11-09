var send = require('../../module/wx/sendMessage');
var schedule = require("node-schedule");

var rule2 = new schedule.RecurrenceRule();
var times2 = [30, 59];

var getData = function (openid) {
    var data = {
        "touser": openid,  //接收者openid
        "template_id": "vdlzK9Ik1kIaJEplGMQY5E8MwFZ14bQUkM-7OWHXQSE", //模板ID
        "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?etag=EFCN_Wint18_KidsOwn-SNS-KOL-Double11-H5",
        "data": {
            "first": {
                "value": "欢迎再次购买！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "徐家汇万圣节！",
                "color": "#173177"
            },
            "keyword2": {
                "value": "2014-12-15 10:00",
                "color": "#173177"
            },
            "remark": {
                "value": "请您准时到达，不见不散！",
                "color": "#173177"
            }
        }
    };
    return data;
}


var fs = require("fs");

var openIdList = ["oKdUIuK-J2-m8ftz_adGLyTmZ2aY", 'oKdUIuDXWO5Ek3IswpcRvESoOUVI', "oKdUIuHCbs97GlnTte7V6Yj_IG34"];

for (var i = 0; i < 100; i++) {
    openIdList.push(openIdList[Math.floor(Math.random() * 3)])
}

var index = 0;
var successCount = 0;

fs.unlinkSync('access_token.txt');
sendTask();

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


// rule2.minute = times2;
// schedule.scheduleJob(rule2, function () {
//     var fs = require("fs");
//     fs.unlinkSync('access_token.txt');
//
// });