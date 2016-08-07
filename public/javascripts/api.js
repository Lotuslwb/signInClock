/**
 * Created by lotuslwb on 16/6/22.
 */

window.debug = true;

window.oo = {
    GetRequest: GetRequest,
    fastClick: fastClick,
    log: log,
    dateFormat: dateFormat
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