var log = require('../tools/log');

// SMS数据库
var name = 'sms';
var Schema;
Schema = {
    SMSTel: String,  // 发送短信手机号
    code: String, // 验证码
    createTime: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // 五分钟失效
    }, // 创建时间 用于判断验证码有效期 建TTL索引
    tag: String, // 区分项目 或者其他
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");

var SMSDB = new obj(option);


module.exports = SMSDB;

