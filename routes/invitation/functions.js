var InvitationDB = require('../../module/DB/InvitationDB');
var log = require('../../module/tools/log');


var addInvitation = function (data) {
    return InvitationDB.add(data).then(function (docs) {
        log('增加数据成功');
        return docs;
    });
};


var updateInvitation = function (id, data) {
    var promise = new Promise(function (resolve, reject) {
        InvitationDB.update(id, data, function (err, docs) {
            if (err) {
                return reject(docs);
            } else {
                return resolve(docs);
            }
        });
    });

    return promise;
};

var getInvitation = function (findJson, fieldJson, sortJSON) {
    return InvitationDB.User.find(findJson || {}, fieldJson || {}).sort(sortJSON || {});
}


module.exports = {
    addInvitation: addInvitation,
    updateInvitation: updateInvitation,
    getInvitation: getInvitation
};
