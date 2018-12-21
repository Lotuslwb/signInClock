var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var log4js = require('./module/tools/log4');
var daka = require('./routes/daka/index');
var dakaApi = require('./routes/daka/api');
var users = require('./routes/users');
var wx = require('./routes/wxConnect');
var wxAPI = require('./routes/wxAPI');

//  压力测试
var newyearTabs = require('./routes/newyearTabs');
var StressTest = require('./routes/StressTest');
var tourTest = require('./routes/tourTest');


//js 调用接口
var API = require('./routes/API');
//h5 页面
var page = require('./routes/page');

//老师投票项目
var teacher = require('./routes/teacher/index');
var teacherAPI = require('./routes/teacher/api');

//英孚项目管理系统
var admin = require('./routes/admin/index');
var adminAPI = require('./routes/admin/api');

//英孚收集leads 汇总
var leads = require('./routes/leads/index');
var leadsAPI = require('./routes/leads/api');

//新年计划
var newyear17 = require('./routes/newyear17/index');
var newyear17API = require('./routes/newyear17/api');


//夏令营计划
var camp = require('./routes/camp/index');

// 邀请函
var invitation = require('./routes/invitation/index');
var invitationAPI = require('./routes/invitation/api');

// EF + 喜马拉雅
var ximalaya = require('./routes/ximalaya/index');
var ximalayaAPI = require('./routes/ximalaya/api');

// 七牛云存储
var qiniuApi = require('./routes/qiniu/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


log4js.use(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('it is a sb'));
app.use(express.static(path.join(__dirname, 'public')));


//微信服务器配置
//app.use('/wxServer', wx);




var wxConfig = require('./module/wx/WXConfig');
var wxFunc = require('./module/wx/WXFunc');
var wxInitFunc = require('./module/wx/WXInitFunc');
var wechat = require('wechat');
var config = {
    token: wxConfig.token,
    appid: wxConfig.APPID,
    encodingAESKey: wxConfig.encodingAESKey
};
app.use(express.query());
app.use('/wxServer', wechat(config, wxFunc));

//wxInitFunc();

app.use('/daka', daka);
app.use('/dakaApi', dakaApi);
app.use('/users', users);

app.use('/wx', wxAPI);
app.use('/api', API);
app.use('/page', page);

app.use('/teacher', teacher);
app.use('/teacher/api', teacherAPI);

app.use('/admin', admin);
app.use('/admin/api', adminAPI);

app.use('/leads', leads);
app.use('/leads/api', leadsAPI);


app.use('/newyear17', newyear17);
app.use('/newyear17/api', newyear17API);

app.use('/ximalaya', ximalaya);
app.use('/ximalaya/api', ximalayaAPI);

app.use('/yingfu-newyearTabs/', newyearTabs);


app.use('/StressTest/', StressTest);

app.use('/tourTest/', tourTest);


app.use('/camp', camp);

app.use('/invitation', invitation);
app.use('/invitation/api', invitationAPI);


app.use('/qiniu/api', qiniuApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;