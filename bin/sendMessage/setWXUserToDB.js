//设置获取用户信息
var getSDKSign = require('../../module/wx/getSDKSign');
var getWebContent = require('../../module/tools/getWebContent');

//获取数据库
var WXUserDB = require('../../module/DB/WXUserDB');

getOpenIdList(function (openIdList, access_token) {
    //获取所有用户的openid;
    var openIdList = openIdList;
    var i = 0;
    var WXUserData = [];
    console.log(openIdList.length, 'openIdList.length');
    //获取所有用户ID的用户信息
    getUserFromWXByBath(function () {
        console.log('--- 获取所有用户ID的用户信息 回调 ---');
        var WXUserDBList = [];
        for (var i = 0; i < WXUserData.length; i++) {
            WXUserDBList.push(WXUserDB.add(WXUserData[i]));
        }
        Promise.all(WXUserDBList).then(function () {
            console.log('---批量导入成功---')
            console.log(WXUserDB.User.find({}).count());
        })
    });

    function getUserFromWXByBath(cb) {
        var subOpenIdList = openIdList.slice(i * 100, (i + 1) * 100);
        console.log(subOpenIdList.length, 'subOpenIdList.length');
        var subOpenIdListObj = {
            "user_list": subOpenIdList.map(function (item) {
                return {
                    'openid': item
                }
            })
        };
        console.log(subOpenIdListObj['user_list'][1], 'subOpenIdListObj_user_list_1');

        //批量获取用户基本信息
        var url = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=' + access_token;
        getWebContent(url, 'POST', subOpenIdListObj, function (response) {
            var body = response.body;
            if (body.errcode && body.errcode != '0') {
                console.error(body);
            } else {
                var user_info_list = body['user_info_list'];
                if (user_info_list) {
                    WXUserData.push(...user_info_list);
                }
            }

            //是否继续迭代
            i++;
            if ((i + 1) * 100 < openIdList.length) {
                getUserFromWXByBath(cb)
            } else {
                //已经获取所有用户信息
                console.log(WXUserData.length, 'WXUserData')
                console.log(WXUserData[99], 'WXUserData')
                cb && cb();
            }
        })
    }


});


//获取所有的openid
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
                if (openIdList.length < total * 1) {
                    getOpenidsFormWX(next_openid);
                } else {
                    callback && callback(openIdList, access_token)
                }
            });
        });
    }
}


// module.exports =
