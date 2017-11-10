var log = require('../tools/log');

var name = 'WXUser';
var Schema = {
    subscribe: String, //用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。
    openid: String, //用户的标识，对当前公众号唯一
    nickname: String, //用户的昵称
    sex: String, //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    city: String, //用户所在城市
    country: String,//用户所在国家
    province: String,//用户所在省份
    headimgurl: String, //用户头像
    subscribe_time: String, //用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
    remark: String, //公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注
    groupid: String, //用户所在的分组ID（兼容旧的用户分组接口）
    tagid_list: String, //用户被打上的标签ID列表
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var WXUserDB = new obj(option);


module.exports = WXUserDB;

