var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var wx = require('./routes/wxConnect');
var wxAPI = require('./routes/wxAPI');

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


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
//wxInitFunc();
app.use('/wxServer', wechat(config, wxFunc));


app.use('/', routes);
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
