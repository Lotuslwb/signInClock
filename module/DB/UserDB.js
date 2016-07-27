var log = require('../tools/log');

var name = 'user';
var Schema = {
    personInfo: {
        openid: String,
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
    },
    couponList: [{
        couponStatus: String,
        couponCode: String,
        couponGetTime: String,
        couponUseTime: String,
    }]
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var userDB = new obj(option);


module.exports = userDB;