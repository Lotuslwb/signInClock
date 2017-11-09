var request = require('request');

module.exports = function (uri, method, data, callback) {
    method = method || "POST";

    var requestdata = {
        "method": method,
        "uri": uri,
        "json": true
    };
    if (data) {
        requestdata['body'] = data;
        requestdata['qs'] = data;

    }
    request(requestdata,
        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                callback && callback(response);
            }
        }
    );
}

