//设置批量发送消息
var sendMessageBath = require('../sendMessageBath');
var WXUserDB = require('../../module/DB/WXUserDB');

var data = {
    "touser": '',  //接收者openid
    "template_id": "hEUpEGx8MV2mC5gs7lUJ5954esygcPCAYPWq90YshQ8", //模板ID
    "url": "http://www.ef.com.cn/englishfirst/landing/mobilelifeclub?etag=EFCN_Win18_KidsOwn-SNS-WechatSA-message-double11",
    "data": {
        "first": {
            "value": "英孚青少儿英语2017秋季课程 \n 11.11超值优惠！\n",
            "color": "#0070C0"
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

//4849

WXUserDB.User.find().skip(10001).then(function (docs) {
    console.log(docs.length, 'docs.length');
    var openIdList = docs.map(function (item) {
        return item['openid'];
    });
    var dataList = docs.map(function (item) {
        data.touser = item['openid'];
        data['data']['keyword2']['value'] = item['nickname'];
        return data;
    });
    sendMessageBath(openIdList, dataList);
})













