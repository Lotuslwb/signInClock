var log = require('../tools/log');

// 邀请函数据库
var name = 'invitation';
var Schema;
Schema = {
    templateId: String,  // 邀请函模板ID
    ownerId: String, // 归属人的OPENID
    ownerName: String, // 归属人的nickname
    templateInfo: [{  // 模板填写的信息
        value: String, // 取值，可能是URL 也可能是 文字
        tag: String, // 标记，用于区分
    }],
    templateForm: {
        groomName: String, // 新郎名字
        brideName: String, // 新娘名字
        marriageTime: String, // 结婚时间
        marriageAddress: String, // 结婚地址
    },
    wishesList: [{  // 祝福语列表
        wishId: String,
        wishName: String,
        wishOpenId: String,
        wishText: String,
        createTime: String,
    }],
    attendList: [{  // 赴宴列表
        attendId: String,  // 邀请ID
        attendName: String, // 赴宴的名字
        attendNumber: String, // 人数
        createTime: String, // 创建时间
    }],
    indeterminateList: [{  // 待定列表
        indeterminateId: String,  // 待定ID
        indeterminateName: String, // 待定的名字
        createTime: String, // 创建时间
    }]
};

var option = {
    name: name,
    Schema: Schema
}

var obj = require("../DB/connectDB");


var InvitationDB = new obj(option);


module.exports = InvitationDB;

