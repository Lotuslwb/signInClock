var log4js = require('log4js');
log4js.configure({
    appenders: {
        dateFileLog: {
            type: "dateFile",
            filename: "../logs/log",
            pattern: "_yyyy-MM-dd.log",
            alwaysIncludePattern: true,     //文件名是否始终包含占位符
            absolute: false,                //filename是否绝对路径
        },
        console: {
            "type": "console"
        }
    },
    replaceConsole: true,
    categories: {
        default: {appenders: ['dateFileLog'], level: 'error'} //设置记录器的默认显示级别，低于这个级别的日志，不会输出。其他级别(trace、debug、warn、error、fatal)
    }
});


var dateFileLog = log4js.getLogger('dateFileLog');
exports.logger = dateFileLog;

exports.use = function (app) {
    //app.use(log4js.connectLogger(dateFileLog, {level:'INFO', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level: 'auto', format: ':method :url'}));
}