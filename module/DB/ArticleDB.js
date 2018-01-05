var log = require('../tools/log');

var name = 'article';
var Schema = {
    createTime: String,//创建时间
    articleDate: String,//使用日期
    articleList: [{
        wordLength: String,  //词汇量
        brief: String, //简介
        coverUrl: String, //封面
        needTime: String, //阅读耗时
        articleTitle: String, //文章标题
        articleText: String, //正文
        resourceType: String, //资源类型 , video  or audio
        videoURL: String, //视频URl
        audioURL: String, //音频URl
        difficulty: String, //难度等级
        wisdomCH: String, //名人名言 中文
        wisdomEN: String, //名人名言 英文
    }]
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var ArticleDB = new obj(option);


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

module.exports = ArticleDB;

