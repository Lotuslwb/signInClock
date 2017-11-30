var log = require('../tools/log');

var name = 'user';
var Schema = {
    openid: String,
    personInfo: {
        nickname: String,
        sex: String,
        city: String,
        headimgurl: String,
        realname: String,
        cellphone: String,
        address: String,
        startTime: Number
    },
    recodeInfo: {
        lastRecodeTime: String,  //最近打卡时间
        totalRecodeCounts: String, //合计打卡次数
        currentRecodeCounts: String, // 当前打卡次数
        currentSerialRecodeCounts: String,// 当前连续打卡次数
        recodeTimeArray: Array, //打卡日期记录
        totalWordLength: String //阅读总字数
    },
    couponList: [{
        couponStatus: String,
        couponCode: String,
        couponGetTime: String,
        couponUseTime: String,
    }],
    readingInfo: [{
        readingTimeId: String, //阅读日期  20170102
        recordServerId: String, // 录音,微信服务器ID
        recordLocalId: String, //录音 本地服务器ID
        readingList: {
            bookId: String,  //今日书籍ID
            bookName: String, // 今日书籍名
            bookCover: String, //今天书籍封页
            bookDes: String //今天书籍描述
        }
    }],
    clockInfo: {
        clockTime: String,
        clockSwitch: String //on 开启, off 关闭
    }
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var userDB = new obj(option);


// var json = {
//     personInfo: {
//         openid: '123openidtest',
//         nickname: '李文***彬',
//         sex: '1',
//         city: '长沙',
//         headimgurl: 'aaaa',
//     }
// }
//
// userDB.add(json).then(function (doc) {
//     log(doc);
// });

module.exports = userDB;

