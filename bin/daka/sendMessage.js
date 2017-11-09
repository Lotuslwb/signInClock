//设置定时任务 变量
var schedule = require("node-schedule");
var rule2 = new schedule.RecurrenceRule();
var times2 = [30, 59];
rule2.minute = times2;

// 查询数据库
var UserDB = require('../../module/DB/UserDB');


//设置批量发送消息
var sendMessageBath = require('../sendMessageBath');
var openIdList = ["oKdUIuK-J2-m8ftz_adGLyTmZ2aY", 'oKdUIuDXWO5Ek3IswpcRvESoOUVI', "oKdUIuHCbs97GlnTte7V6Yj_IG34"];
var data = {
    "touser": '',  //接收者openid
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

schedule.scheduleJob(rule2, function () {
    sendMessageBath(openIdList, data);
});


function getOpenIdList(cb) {
    var openIdList = [];
    cb && cb(openIdList);

    UserDB.find({}).then(function (docs) {
       
        console.log(docs);
       
    });
}






