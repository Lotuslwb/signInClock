/**
 * Created by lotuslwb on 16/6/6.
 */

var mongoose = require('mongoose');

var log = require('../tools/log');

//连接数据库

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/YingFu');

/*
 * Schema  -- 骨架
 *
 * name -- 模型名字
 * */

var obj = function (options) {
    this.SchemaJSON = options.Schema;
    this.name = options.name;
    this.init();
}


//初始化
obj.prototype.init = function () {
    var me = this;
    var Schema = mongoose.Schema;

    //骨架模版
    me.userSchema = new Schema(me.SchemaJSON);
    //模型
    me.User = mongoose.model(me.name, me.userSchema);
}


obj.prototype.add = function (json, callback) {

    var me = this;
    var promise;
    //存储数据
    var _user = new me.User(json);

    //保存数据库
    promise = _user.save(function (err, docs) {
        if (err) {
            log('保存失败', err)
            return;
        }
        log('保存成功');
        callback && callback(err, docs);
    });
    return promise;

}

obj.prototype.find = function (json, callback) {
    var me = this;
    var promise = me.User.find(json, function (err, docs) {
        if (err) {
            log('查找失败', err);
            return;
        }
        log('查找成功');
        callback && callback(err, docs);
    })
    return promise;
}

obj.prototype.update = function (_id, JSON, callback) {
    var me = this;
    
    var promise = me.User.update({_id: _id}, {
        $set: JSON
    }, function (err, docs) {
        if (err) {
            log('---更新失败---')
            log(err);
        }
        log('更新成功');
        callback && callback(err, docs);
    });

    return promise;
}

obj.prototype.remove = function (json, callback) {
    var me = this;
    var promise = me.User.remove(json, function (err, docs) {
        if (err) {
            console.log('删除失败', err);
            return;
        }
        log('删除成功');
        callback && callback(err, docs);
    });
    return promise;
}


module.exports = obj;
