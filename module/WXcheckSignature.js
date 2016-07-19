var crypto = require("crypto");

var checkSignature = function (signature, timestamp, nonce, token) {
    var arry = [timestamp, nonce, token];

    //将token、timestamp、nonce三个参数进行字典序排序
    arry.sort();

    //将三个参数字符串拼接成一个字符串进行sha1加密
    var hasher = crypto.createHash("sha1");
    var msg = arry[0] + arry[1] + arry[2];
    hasher.update(msg);
    //16进制的形式导出
    var result = hasher.digest('hex');

    if (result == signature) {
        return true;
    } else {
        return false;
    }
}

module.exports = checkSignature;
