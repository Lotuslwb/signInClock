var logger = require('../../module/tools/log4').logger;
var qiniu = require('qiniu');

var access = '09KCPciWD1zhFLcNVIjbuWCspbr6kYUYQFnVbcIV';
var secret = '34w1-j8nQxRLge-kubC4tEEqk5dIsdqjHgQ9vWYw';

/** 获取mac */
var getMac = function () {
    var promise = new Promise(function (resolve, reject) {
        var mac = new qiniu.auth.digest.Mac(access, secret);
        resolve(mac);
    });
    return promise;
};

var initBucketManager = function () {
    var promise = getMac().then(function (mac) {
        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z0;
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        return (bucketManager);
    });
    return promise;
}

var initOperManager = function () {
    var promise = getMac().then(function (mac) {
        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z0;
        var operManager = new qiniu.fop.OperationManager(mac, config);
        return (operManager);
    });
    return promise;
}

var fetchUrl = function (resUrl, bucket, key) {
    var promise = initBucketManager().then(function (bucketManager) {
        return new Promise(function (resolve, reject) {
            bucketManager.fetch(resUrl, bucket, key, function (err, respBody, respInfo) {
                if (err) {
                    reject(err);
                } else {
                    return resolve({
                        respBody: respBody,
                        respInfo: respInfo,
                    });
                }
            });
        })
    });
    return promise;
}


/**
 * 要转码的文件所在的空间和文件名  bucket  key
 * 转码所使用的队列名称。  pipleline
 *  */
var amr2mp3 = function (srcBucket, srcKey, pipeline) {

    var promise = initOperManager().then(function (operManager) {
        return new Promise(function (resolve, reject) {
            var options = {
                'notifyURL': 'http://api.example.com/pfop/callback',
                'force': false,
            };
            var fops = ['avthumb/mp3/ab/128k/ar/44100/acodec/libmp3lame'];
            //持久化数据处理返回的是任务的persistentId，可以根据这个id查询处理状态
            operManager.pfop(srcBucket, srcKey, fops, pipeline, options, function (err, respBody, respInfo) {
                if (err) {
                    reject(err);
                } else {
                    // respBody.persistentId 任务的persistentId  respInfo.statusCode==200
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            });
        })
    })
    return promise;


}


module.exports = {
    getMac: getMac,
    fetchUrl: fetchUrl,
    amr2mp3: amr2mp3,
};