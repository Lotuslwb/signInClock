/**
 * Created by lotuslwb on 16/6/22.
 */

window.debug = true;

window.oo = {
    GetRequest: GetRequest,
    fastClick: fastClick,
    log: log,
    dateFormat: dateFormat,
    initWX: initWX,
    initWXSahre: initWXSahre
}

function initWXSahre() {

    //“分享给朋友”
    wx.onMenuShareAppMessage({
        title: '英孚打卡计划 分享title', // 分享标题
        desc: '英孚打卡计划 分享desc', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //“分享到朋友圈”
    wx.onMenuShareTimeline({
        title: '英孚打卡计划 分享title', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

function initWX(callback) {

    $.ajax({
        type: 'GET',
        url: '/api/getWxSDK',
        data: {},
        success: function (data) {
            var wxConfig = data.data.wxConfig;

            log(wxConfig);

            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxConfig.appId, // 必填，公众号的唯一标识
                timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                signature: wxConfig.signature,// 必填，签名，见附录1
                jsApiList: ['startRecord', 'stopRecord', 'playVoice', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
                callback && callback();
            });

            wx.error(function (res) {
                log(res);
            });


        },
        dataType: 'json'
    });


}

function dateFormat(day) {

    if (!day) {
        return false;
    }
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    // 初始化时间
    Year = day.getFullYear();// ie火狐下都可以
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    } else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
};

function log(msg) {
    if (window.debug) {
        console.log(msg)
    }
}


function fastClick() {
    var touchObj = {};
    touchObj.isSupportTouch = "ontouchend" in document ? true : false;
    touchObj.isEvent = touchObj.isSupportTouch ? 'touchstart' : 'click';
    return touchObj.isEvent;
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var srtArry = strs[i].split("=");
            var y = srtArry.shift();
            theRequest[y] = unescape(srtArry.join('='));
        }
    }
    return theRequest;
}