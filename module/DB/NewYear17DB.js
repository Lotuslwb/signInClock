var log = require('../tools/log');

var name = 'NewYear17';
var Schema = {
    openid: String,
    plansArray: Array,  //新年计划列表
    plansNumber: String, //至少监督数量
    punishmentValue: String, //接受惩罚的值
    supervisorArray: Array, //监督者列表  留下 picURL(头像),nickName(昵称),openid

};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var teacherDB = new obj(option);

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

module.exports = teacherDB;

