var log = require('../tools/log');

// 喜马拉雅作品数据库
var name = 'XiMalaya';
var Schema;
Schema = {
    /***用户数据 */
    telPhone: String, // 用户手机号
    nickName: String, // 用户名
    imgPic: String, //用户头像
    leave: String, // 组别

    /**投票数据 */
    voteNumber: Number, // 投票总数
    lastVoteTime: String, //上次投票时间
    IPArray: [{
        voteDay: String, // 投票日期
        voteTime: String, // 投票时间
        ip: String, // 投票IP
    }],

    /**作品数据 */
    createTime: String, // 创建时间
    productName: String, // 作品名
    productRecordAmr: String, // 作品录音 amr格式
    productRecordMp3: String, // 作品录音 mp3格式
    persistentId: String, // amr 转码mp3 任务id
    status: {
        type: String,
        default: 0,
    }, // 作品状态， 0为正常，1为下线
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("./connectDB");


var XiMalayaDB = new obj(option);


module.exports = XiMalayaDB;