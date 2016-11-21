var log = require('../tools/log');

var name = 'leads';
var Schema = {
    realName: String,   //中文名
    englishName: String,//英文名
    age: String,        //年龄
    sex: String,        //性别,1男2女
    cityName: String,   //城市
    schoolName: String, //学校
    cellPhone: String,  //手机号
    isLeaguer: String,  //是否会员
    others: String,     //其他
    tag: String         //打标签
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var teacherDB = new obj(option);


//
// userDB.add(json).then(function (doc) {
//     log(doc);
// });

module.exports = teacherDB;

