function obj() {
    this.initialize();
}


obj.prototype = {
    initialize: function () {
        var me = this;
        me.initPage();
        me.bindEvent(me);
    },
    initArticlePart: function (me) {
        var levelCount = $('.levelCount').val();
        var articlePartTpl = $('#articlePart-tpl').html();
        $('.articleBox').html('');
        for (var i = 0; i < levelCount; i++) {
            $('.articleBox').append(articlePartTpl);
        }
        me.initEditors(me);
        me.initForm(me);

    },
    initEditors: function (me) {
        var E = window.wangEditor;
        var levelCount = $('.levelCount').val();

        $('#J_Form .J-articlePart').each(function (index, item) {
            var $editor = $(this).find('.editor');
            var $html = $(this).find('.editorContent-html');
            var html = $('<div/>').html($html.html()).text()
            var id = 'editor-part' + index;
            $editor.attr('id', id);
            var editor = new E('#' + id);
            editor.create()
            editor.txt.html(html);

            me.editorList.push(editor);
        });
    },
    initForm: function (me) {
        BUI.use('bui/form', function (Form) {

            me.form = new Form.Form({
                srcNode: '#J_Form'
            }).render();

        });
    },
    initPage: function () {
        var me = this;

        //存放编辑器
        me.editorList = [];
        //存放图片SRC
        me.srcList = [];

        me.initArticlePart(me);


    },
    bindEvent: function (me) {
        var me = this;

        $('.J-submit').click(function () {
            console.log(me.form.isValid());
            if (!me.form.isValid()) {
                alert('提交失败,请根据红色提示,完善信息');
                return false;
            }

            var data = [];
            $('#J_Form .J-articlePart').each(function (index, item) {
                var dataItem = {};
                $(this).find('input').map(function () {
                    var name = $(this).attr('name');
                    var val = $(this).val();
                    dataItem[name] = val;
                });
                $(this).find('select').map(function () {
                    var name = $(this).attr('name');
                    var val = $(this).val();
                    dataItem[name] = val;
                });
                var editor = me.editorList[index];
                var coverUrl = me.srcList[index];
                dataItem['articleText'] = editor.txt.html();
                dataItem['wordLength'] = editor.txt.text().split(' ').length;
                dataItem['coverUrl'] = coverUrl;
                debugger;
                data.push(dataItem);

            });

            data = data.map(function (item) {
                item.needTime = item.needTime_1 + ':' + item.needTime_2;
                delete  item.needTime_1;
                delete  item.needTime_2;
                return item;
            });

            var postData = {
                id: id,
                articleList: data,
                articleDate: $('.articleDate').val(),
                levelCount: $('.levelCount').val()
            }

            $.ajax({
                type: 'POST',
                data: postData,
                url: '/admin/api/daka/updateArticleData',
                success: function (data) {
                    console.log(data, 'updateArticleData');
                    if (data.status == '200') {
                        alert('修改成功!');
                        window.location.href = '/admin/daka/';
                    } else {
                        alert(data.errmsg);
                    }
                },
                dataType: 'json'
            });

        });

        // $('.resourceType-select').change(function () {
        //     var v = $(this).val();
        //     if (v == 'video') {
        //         $('.videoURLDIV').show();
        //         $('.audioURLDIV').hide().val('');
        //     } else {
        //         $('.audioURLDIV').show();
        //         $('.videoURLDIV').hide().val('');
        //     }
        // })
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