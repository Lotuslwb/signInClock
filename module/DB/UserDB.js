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
    },
    recodeInfo: {
        lastRecodeTime: String,
        totalRecodeCounts: String,
        currentRecodeCounts: String,
        currentSerialRecodeCounts: String,
        recodeTimeArray: Array
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
            bookCover: String //今天书籍封页
        }
    }]
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

