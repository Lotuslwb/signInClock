(function (window) {
    window.mPZ = {
        floatPage: floatPage,
        urlParam: urlParam,
        checklogin: checklogin,
        time: {
            getTimeStamp: getTimeStamp
        },
        token: {
            get: getToken,
            set: setToken
        },
        debug: {
            debug: false,
            user: "huanzhe" //hushi,huanzhe
        },
        toast: toast,
        checkForm: checkForm,
        uploadImg: uploadImg
    };

    function checklogin() {
        //debug
        //Cookies.setCookie('peizhen-token', null, 10, '/');
        //alert('token in cookie:' + window.mPZ.token.get());

        var me = this;
        me.urlP = window.mPZ.urlParam();
        me.tokenJSON = window.mPZ.token.get();
        me.openid = me.urlP.wechatid || me.tokenJSON.openid;
        me.token = me.urlP.token || me.tokenJSON.token;
        me.needRegister = me.urlP.needRegister || "";

        if (me.openid && me.token) {
            var data = {token: me.token, openid: me.openid};
            //alert(JSON.stringify(data));
            setToken(data);
        } else {
            //alert('网络超时，请稍后再试！');
        }
    }

    function getTimeStamp(str) {
        var date = new Date(str);
        var dateStr = date.getTime().toString();
        return dateStr.substr(0, dateStr.length - 3);
    }

    function urlParam() {
        var name, value;
        var retrunObj = {};
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                retrunObj[name] = value;
            }
        }
        return retrunObj;
    }

    function getToken() {
        var data = Cookies.getCookie("peizhen-token");
        var json = JSON.parse(data) || [];
        return json;
    }

    function setToken(data) {
        data = {token: data.token, openid: data.openid};
        Cookies.setCookie("peizhen-token", JSON.stringify(data), 10, "/");
    }

    function floatPage(html) {
        var page = '<div class="floatPage">' + html + "</div>";
        $("body").append(page);
    }

    function toast(msg, timer) {
        $(".toast")
            .text(msg)
            .fadeIn();
        setTimeout(function () {
            $(".toast").fadeOut();
        }, timer || 1000);
    }

    function checkForm($selector) {
        var errorList = [];
        var rules = $selector.find("[data-required=true]");

        rules.each(function () {
            var val =
                $(this).val() &&
                $(this)
                    .val()
                    .trim();
            if (!val) {
                errorList.push($(this).data("message"));
            } else {
                var rule = $(this).data("rule");
                var pattern = new RegExp(rule);
                if (rule && !pattern.test($(this).val())) {
                    errorList.push($(this).data("message"));
                }
            }
        });
        if (errorList.length) {
            toast(errorList[0]);
            return false;
        }
        return true;
    }

    function uploadImg($selector, $result) {
        lrz($selector.files[0])
            .then(function (rst) {
                rst.formData.append("fileLen", rst.fileLen);
                // $result.src = rst.base64;
                $.ajax({
                    url: "/invitation/api/upload",
                    data: rst.formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (data) {
                        console.log(data);
                        $result.src = '/files/' + data.data.name;
                        $($result).data('src', '/files/' + data.data.name)
                        // $selector.html('<img src="/files/' + data.data.name + '" />');
                    }
                });
            })
            .catch(function (err) {
                // 处理失败会执行
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
    }
})(window);
