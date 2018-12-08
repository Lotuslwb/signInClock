var log = require('../tools/log');

// 喜马拉雅文章数据表
var name = 'XiMaArticle';
var Schema;
Schema = {
    index: String, // 作品索引
    arText: String, //作品文本
    arRecord: String, // 作品录音
    arName: String, // 作品名
    arLeave: String, // 作品组别
    updateTime: String, // 更新时间
    status: {
        type: String,
        default: 0,
    }, // 作品状态 0为正常，1为下线
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("./connectDB");


var XiMaArticleDB = new obj(option);


module.exports = XiMaArticleDB;