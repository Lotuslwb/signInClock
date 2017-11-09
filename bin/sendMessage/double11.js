//设置批量发送消息
var sendMessageBath = require('../sendMessageBath');
var openIdList = ["oKdUIuK-J2-m8ftz_adGLyTmZ2aY", 'oKdUIuDXWO5Ek3IswpcRvESoOUVI', "oKdUIuHCbs97GlnTte7V6Yj_IG34", "oKdUIuGgokkiL4du7fC9rfdRQGrg"];
var data = {
    "touser": '',  //接收者openid
    "template_id": "hEUpEGx8MV2mC5gs7lUJ5954esygcPCAYPWq90YshQ8", //模板ID
    "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?etag=EFCN_Win18_KidsOwn-SNS-WechatSA-message-double11",
    "data": {
        "first": {
            "value": "英孚青少儿英语2017秋季课程 \n 11.11超值优惠！！",
            "color": "#173177"
        },
        "keyword1": {
            "value": "年度巨献 - 新生奖学金",
            "color": "#0070C0"
        },
        "keyword2": {
            "value": "梁芳莹Fandy",
            "color": "#0070C0"
        },
        "remark": {
            "value": "立即领取",
            "color": "#0070C0"
        }
    }
};

sendMessageBath(openIdList, data);








