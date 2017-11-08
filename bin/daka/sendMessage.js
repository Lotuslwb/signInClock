var send = require('../../module/wx/sendMessage');
var schedule = require("node-schedule");

var rule2 = new schedule.RecurrenceRule();
var times2 = [30, 59];

var getData = function () {
    var data = {
        "touser": "oKdUIuDXWO5Ek3IswpcRvESoOUVI",  //接收者openid
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
var data = getData();

for (var i = 0; i < 1000; i++) {
    send(data);
}


// rule2.minute = times2;
// schedule.scheduleJob(rule2, function () {
//     var fs = require("fs");
//     fs.unlinkSync('access_token.txt');
//
// });