function obj() {
    this.initialize();
}


obj.prototype = {
    initialize: function () {
        var me = this;
        me.initPage();
        me.bindEvent(me);
    },
    initPage: function () {
        BUI.use('bui/uploader', function (Uploader) {

            /**
             * 返回数据的格式
             *
             *  默认是 {url : 'url'},否则认为上传失败
             *  可以通过isSuccess 更改判定成功失败的结构
             */
            var uploader = new Uploader.Uploader({
                render: '#J_Uploader',
                url: '/admin/api/daka/uploadImage'
            }).render();
        });
    },
    bindEvent: function (me) {

    },

    _genSelect: function (data, selector) {
        var str = '';
        $.each(data, function (i, t) {
            str += '<option value="' + t.value + '">' + t.text + '</option>';
        });
        $(selector).html(str);
    }
}

new obj();