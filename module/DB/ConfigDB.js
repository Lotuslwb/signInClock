var log = require('../tools/log');

var name = 'config';
var Schema = {
    H1Title: String, //红色标题
    H2Title: String, //黑色标题
    Text: String, //正文
    BannerImgURL: String, //banner图片地址
    BannerLink: String, //banner 链接
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var ConfigDB = new obj(option);


module.exports = ConfigDB;

