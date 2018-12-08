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
        var me = this;

        BUI.use('bui/form', function (Form) {

            me.form = new Form.Form({
                srcNode: '#J_Form'
            }).render();

        });
        var E = window.wangEditor
        var editor_part1 = this.editor1 = new E('#editor-part1')
        editor_part1.create();
    },
    bindEvent: function (me) {
        var me = this;

        $('.J-submit').click(function () {
            console.log(me.form.isValid());
            if (!me.form.isValid()) {
                alert('提交失败,请根据红色提示,完善信息');
                return false;
            }

            //获取正文
            var articleText1 = (me.editor1.txt.html());

            if (!me.editor1.txt.text().length) {
                alert('正文不能为空');
                return false;
            }

            var data = me.form.serializeToObject();
            data['arText'] = articleText1;
            console.log(data);

            $.ajax({
                type: 'POST',
                data: data,
                url: '/ximalaya/api/addArticle',
                success: function (data) {
                    console.log(data, 'addArticle');
                    if (data.status == '200') {
                        alert('添加成功!');
                        window.location.href = '/admin/ximaArticle/';
                    } else {
                        alert(data.errmsg);
                    }
                },
                dataType: 'json'
            });

        });

        $('.resourceType-select').change(function () {
            var v = $(this).val();
            if (v == 'video') {
                $('.videoURLDIV').show();
                $('.audioURLDIV').hide().val('');
            } else {
                $('.audioURLDIV').show();
                $('.videoURLDIV').hide().val('');
            }
        })
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