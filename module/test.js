var UserDB = require('../module/DB/UserDB');
var _id = '579820a26db698217b97070d';

var data = {
    "couponList": [
        {
            "couponStatus": "1",
            "couponCode": "HELLOWORLD",
            "couponGetTime": "now",
        }
    ],
    "personInfo": {
        "openid": "12121212",
        "nickname": "liwenbin",
        "sex": "1"
    }
};

UserDB.update(_id, data, function (docs, err) {
    console.log(docs, err);
});