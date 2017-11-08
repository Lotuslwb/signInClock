var send = require('../module/wx/sendMessage');
var schedule = require("node-schedule");

var rule2 = new schedule.RecurrenceRule();
var times2 = [30, 59];

rule2.minute = times2;
schedule.scheduleJob(rule2, function () {
    var fs = require("fs");
    fs.unlinkSync('access_token.txt');
    send();
});


