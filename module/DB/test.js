db.users.find({'personInfo.nickname': '刘静'}).count()
db.users.find({'personInfo.nickname': '珠珠子'}).forEach(function (x) {
    var recodeInfo = x.recodeInfo;
    x.recodeInfo.currentRecodeCounts = recodeInfo.currentRecodeCounts * 1 + 1;
    x.recodeInfo.currentSerialRecodeCounts = recodeInfo.currentSerialRecodeCounts * 1 + 1;
    x.recodeInfo.totalRecodeCounts = recodeInfo.totalRecodeCounts * 1 + 1;
    x.recodeInfo.totalWordLength = recodeInfo.totalWordLength * 1 + 52;
    db.getCollection('users').save(x);
});

db.users.find({'personInfo.nickname': '珠珠子'}).forEach(function (x) {
    var recodeInfo = x.recodeInfo;
    var recodeTimeArray = recodeInfo.recodeTimeArray;
    recodeTimeArray.push('20180122')
    x.recodeInfo.recodeTimeArray = recodeTimeArray;
    db.getCollection('users').save(x);
});

var b = {
    "__v": 0,
    "_id": ObjectId("5a56dfdc1f563f3cdef4d661"),
    "clockInfo": {"clockSwitch": "on", "clockTime": "09:30"},
    "couponList": [],
    "level": "0",
    "openid": "oKdUIuDXWO5Ek3IswpcRvESoOUVI",
    "personInfo": {
        "nickname": "李文字彬",
        "sex": "1",
        "city": "",
        "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLyV1Ir9mstNAOmvyNzpTFcibv3xWVSCp135dehaicLbhWY6hRDnadIibZq3V1V6PNETobaDXXLIBibMw/132"
    },
    "recodeInfo": {
        "currentRecodeCounts": "3",
        "currentSerialRecodeCounts": "0",
        "lastRecodeTime": "1518274180861",
        "totalRecodeCounts": "3",
        "recodeTimeArray": ["20180123", "20180125", "20180210"],
        "totalWordLength": "353"
    }
};


