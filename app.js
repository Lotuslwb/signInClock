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
var teacherAPI=require('./routes/teacher/api');

//英孚项目管理系统
var admin = require('./routes/admin/index');
var adminAPI=require('./routes/admin/api');

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
// app.use('/', wx);

app.use('/', routes);
app.use('/users', users);

app.use('/wx', wxAPI);
app.use('/api', API);
app.use('/page', page);

app.use('/teacher', teacher);
app.use('/teacher/api', teacherAPI);

app.use('/admin', admin);
app.use('/admin/api', adminAPI);

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
