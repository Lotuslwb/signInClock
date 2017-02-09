var log = require('../tools/log');

var name = 'teacher';
var Schema = {
    openid: String,
    teacherInfo: {
        realName: String,
        englishName: String,
        sex: String,
        cityNo: String,
        cityName: String,
        schoolNo: String,
        schoolName: String,
        cellPhone: String,
        passWord: String
    },
    VoteInfo: {
        personPic: String,
        groupPic: String,
        voteWords: String,  //参赛宣言
        status: String, //审核状态  0 - 未提交  1 -待审核; 2- 审核通过; 3- 审核不通过 9- 黑名单
    },
    IPArray: [],
    studentWords: [{
        studentName: String,
        content: String,
        time: String
    }],
    VoteData: {
        totalVoteCounts: Number, //次数
        lastVoteTime: String  //上次抽奖时间
    }
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

