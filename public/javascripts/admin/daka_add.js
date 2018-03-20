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
        me.initUploader(me);
        me.initForm(me);

    },
    initEditors: function (me) {
        var E = window.wangEditor;
        var levelCount = $('.levelCount').val();

        $('#J_Form .J-articlePart').each(function (index, item) {
            var $editor = $(this).find('.editor');
            var id = 'editor-part' + index;
            $editor.attr('id', id);
            var editor = new E('#' + id);
            editor.create()
            me.editorList.push(editor);
        });
    },
    initUploader: function (me) {
        var $UploaderBox = $('#J_Form .J_Uploader_box');
        $UploaderBox.each(function (index, item) {
            initUploader($(this), 'part-' + index);
        });


        function initUploader($uploaderBox, name) {
            var $uploader = $uploaderBox.find('.J_Uploader');
            var $previewBox = $uploaderBox.find('.J-previewBox');
            var $preview = $uploaderBox.find('.J-preview');
            BUI.use('bui/uploader', function (Uploader) {
                //初始化 图片上传
                var uploader = new Uploader.Uploader({
                    render: $uploader,
                    url: '/admin/api/daka/uploadImage',
                    isSuccess: function (result) {
                        if (result && result.status == '200') {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    success: function (result) {
                        console.log(result);
                        var src = result.data.imgName.split('public')[1];
                        me.srcList.push(src);
                        $previewBox.show();
                        $preview.html('<img src="' + src + '" class="daka-cover-preview">')
                    },
                    error: function (result) {
                        alert(JSON.stringify(result));
                    },
                    rules: {
                        //文的类型
                        ext: ['.png,.jpg,.jpeg', '文件类型只能为{0}'],
                        //上传的最大个数
                        max: [1, '文件的最大个数不能超过{0}个'],
                        //文件大小的最小值,这个单位是kb
                        minSize: [10, '文件的大小不能小于{0}KB'],
                        //文件大小的最大值,单位也是kb
                        maxSize: [300, '文件大小不能大于{0}kb']
                    }
                }).render();
            });
        }
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

        $('.levelCount').change(function () {
            me.initArticlePart(me);
        })

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
                debugger;
                dataItem['articleText'] = editor.txt.html();
                dataItem['wordLength'] = editor.txt.text().split(' ').length;
                dataItem['coverUrl'] = coverUrl;
                data.push(dataItem);

            });

            data = data.map(function (item) {
                item.needTime = item.needTime_1 + ':' + item.needTime_2;
                delete  item.needTime_1;
                delete  item.needTime_2;
                return item;
            });

            var postData = {
                articleList: data,
                articleDate: $('.articleDate').val(),
                levelCount: $('.levelCount').val()
            }

            $.ajax({
                type: 'POST',
                data: postData,
                url: '/admin/api/daka/saveArticleData',
                success: function (data) {
                    console.log(data, 'saveArticleData');
                    if (data.status == '200') {
                        alert('添加成功!');
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