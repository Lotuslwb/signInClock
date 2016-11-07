/**
 * Created by lotuslwb on 16/10/22.
 */


var App = require('alidayu-node');
var app = new App('23489873', '7701d7cde8fc35ab9aaa24768d2b4261');

function smsSend(name, tel) {
    app.smsSend({
        sms_free_sign_name: '英孚金牌教师', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"name": name}),//短信变量，对应短信模板里面的变量
        rec_num: tel, //接收短信的手机号
        sms_template_code: 'SMS_21860123' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    });
}

module.exports = smsSend;