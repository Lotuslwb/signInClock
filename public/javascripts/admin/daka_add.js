function obj() {
    this.initialize();
}


obj.prototype = {
    initialize: function () {
        var me = this;
        me.initPage();
        me.bindEvent(me);
    },
    initArticlePart: function () {
        var levelCount = $('.levelCount').val();
        var articlePartTpl = $('#articlePart-tpl').html();
        $('.articleBox').html('');
        for (var i = 0; i < levelCount; i++) {
            $('.articleBox').append(articlePartTpl);
        }
    },
    initPage: function () {
        var me = this;

        this.initArticlePart();

        BUI.use('bui/form', function (Form) {

            me.form = new Form.Form({
                srcNode: '#J_Form'
            }).render();

        });
        var $UploaderBox = $('.J_Uploader_box');
        $UploaderBox.each(function (index, item) {
            initUploader($(this), 'part-' + (index + 1));
        });


        var E = window.wangEditor
        var editor_part1 = this.editor1 = new E('#editor-part1')
        editor_part1.create()

        var editor_part2 = this.editor2 = new E('#editor-part2')
        editor_part2.create();

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
                        var src = me['src-' + name] = result.data.imgName.split('public')[1];
                        $previewBox.show();
                        $preview.html('<img src="' + src + '" class="daka-cover-preview">')
                    },
                    error: function (result) {
                        alert(JSON.stringify(result));
                    },
                    rules: {
                        //文的类型
                        ext: ['.png,.jpg', '文件类型只能为{0}'],
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
    bindEvent: function (me) {
        var me = this;

        $('.')

        $('.J-submit').click(function () {
            console.log(me.form.isValid());
            if (!me.form.isValid()) {
                alert('提交失败,请根据红色提示,完善信息');
                return false;
            }

            //获取正文
            var articleText1 = (me.editor1.txt.html());
            //获取词汇量
            var wordLength1 = (me.editor1.txt.text().split(' ').length);


            //获取正文
            var articleText2 = (me.editor2.txt.html());
            //获取词汇量
            var wordLength2 = (me.editor2.txt.text().split(' ').length);

            var coverUrl1 = me['src-part-1'];
            var coverUrl2 = me['src-part-2'];

            if (!coverUrl1 || !coverUrl1.length || !coverUrl2 || !coverUrl2.length) {
                alert('封页图片不能为空');
                return false;
            }

            if (!me.editor1.txt.text().length || !me.editor2.txt.text().length) {
                alert('正文不能为空');
                return false;
            }

            var data = me.form.serializeToObject();
            data['articleText1'] = articleText1;
            data['articleText2'] = articleText2;
            data['wordLength1'] = wordLength1;
            data['wordLength2'] = wordLength2;
            data['coverUrl1'] = coverUrl1;
            data['coverUrl2'] = coverUrl2;
            data['resourceType'] = $('.resourceType-select').val();

            console.log(data);

            $.ajax({
                type: 'POST',
                data: data,
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