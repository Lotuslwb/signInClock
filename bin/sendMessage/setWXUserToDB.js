//设置获取用户信息
var getSDKSign = require('../../module/wx/getSDKSign');
var getWebContent = require('../../module/tools/getWebContent');

//获取数据库
var WXUserDB = require('../../module/DB/WXUserDB');
var index = 0;

synDataInWxAndDB();

//将数据从微信导入数据库
function initDBformWX() {
    getOpenIdList(function (openIdList, access_token) {
        //获取所有用户的openid;
        var openIdList = openIdList;


        console.log(openIdList.length, 'openIdList.length');
        //获取所有用户ID的用户信息
        getUserFromWXByBath(openIdList, function (WXUserData) {
            console.log('--- 获取所有用户ID的用户信息 回调 ---');
            saveUserDataIntoDB(WXUserData)
        });
    });
}


//将用户信息存入数据库
function saveUserDataIntoDB(WXUserData) {
    var WXUserDBList = [];
    for (var i = 0; i < WXUserData.length; i++) {
        WXUserDBList.push(WXUserDB.add(WXUserData[i]));
    }
    Promise.all(WXUserDBList).then(function () {
        console.log('---批量导入成功---')
    })
}


//通过openidList,从微信获取用户详细信息
function getUserFromWXByBath(openIdList, cb) {
    var WXUserData = [];
    var subOpenIdList = openIdList.slice(index * 100, (index + 1) * 100);
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
        index++;
        if ((index + 1) * 100 < openIdList.length) {
            getUserFromWXByBath(openIdList, cb)
        } else {
            //已经获取所有用户信息
            console.log(WXUserData.length, 'WXUserData')
            console.log(WXUserData[99], 'WXUserData')
            cb && cb(WXUserData);
        }
    })
}

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

//同步微信和本地数据库数据
function synDataInWxAndDB() {
    getOpenIdList(function (openIdList, access_token) {
        console.log(openIdList.length, 'openIdList');
        WXUserDB.find({}).then(function (docs) {
            console.log(docs.length);
            var openIdListInDB = docs.map(function (item) {
                return item.openid;
            });
            var diffOpenIdList = openIdList.filter(function (itme) {
                return openIdListInDB.indexOf(itme) < 0;
            });
            console.log(diffOpenIdList.length, 'diffOpenIdList.length');
            index = 0;
            getUserFromWXByBath(diffOpenIdList, function (WXUserData) {
                console.log('--- 获取所有用户ID的用户信息 回调 ---');
                saveUserDataIntoDB(WXUserData)
            });

        });
    })
}

