var loadWay;

var load = function (way, url, callback) {

    if (way == 'https') {
        loadWay = require('https');
    }
    
    loadWay.get(url, function (ress) {
        ress.on('data', function (chunk) {
            var chunk = JSON.parse(chunk);
            callback && callback(chunk);
        })
    });
}


module.exports = load;