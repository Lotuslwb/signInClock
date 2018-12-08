var log = require('../tools/log');

// 喜马拉雅用户数据表
var name = 'XiMaUser';
var Schema;
Schema = {
    imgPic:String, //用户头像
    nickName: String, // 参加者姓名
    age: String, // 年龄
    cityCode: String, // 城市编码
    telPhone: String, // 归属人的nickname
    leave: String, // 组别
    createTime: String, // 注册时间
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("./connectDB");


var XiMaUserDB = new obj(option);


module.exports = XiMaUserDB;