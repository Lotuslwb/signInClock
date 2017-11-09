//设置批量发送消息
var sendMessageBath = require('../sendMessageBath');
var openIdList = ["oKdUIuK-J2-m8ftz_adGLyTmZ2aY", 'oKdUIuDXWO5Ek3IswpcRvESoOUVI', "oKdUIuHCbs97GlnTte7V6Yj_IG34", "oKdUIuGgokkiL4du7fC9rfdRQGrg"];
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

//sendMessageBath(openIdList, data);


//设置获取用户信息
var getSDKSign = require('../../module/wx/getSDKSign');
var getWebContent = require('../../module/wx/getWebContent');
getOpenIdList(function (openIdList) {
    console.log(openIdList.length);
    console.log(openIdList[openIdList.length - 22]);
});

function getOpenIdList(callback) {
    var openIdList = [];
    getOpenidsFormWX('');

    function getOpenidsFormWX(next_openid) {
        console.log(next_openid, 'next_openid');
        var originalUrl = '';
        getSDKSign(originalUrl, function (wxConfig) {
            var access_token = wxConfig['TOKEN'];
            //获取用户列表
            var url = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=' + access_token + '&next_openid=' + next_openid;
            getWebContent(url, 'GET', '', function (response) {
                if (!response.body['data']) {
                    console.log(response.body);
                    return false;
                }

                var body = response.body;
                var total = body['total'];
                var count = body['count'];
                var openids = body['data']['openid'];
                var next_openid = body['next_openid'];
                openIdList.push(...openids);

                console.log(openIdList.length, 'openIdList.length');

                if (openIdList.length < total * 1) {
                    getOpenidsFormWX(next_openid);
                } else {
                    callback && callback(openIdList)
                }
            });
        });
    }
}









