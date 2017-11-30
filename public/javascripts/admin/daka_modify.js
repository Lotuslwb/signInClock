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
        BUI.use('bui/uploader', function (Uploader) {
            //初始化 图片上传
            var uploader = new Uploader.Uploader({
                render: '#J_Uploader',
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
                    var src = me.src = result.data.imgName.split('public')[1];
                    $('.J-previewBox').show();
                    $('#J-preview').html('<img src="' + src + '" class="daka-cover-preview">')
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


        var E = window.wangEditor
        var editor = this.editor = new E('#editor')
        editor.create();
        
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
            var articleText = (me.editor.txt.html());
            //获取词汇量
            var wordLength = (me.editor.txt.text().split(' ').length);

            var coverUrl = me.src;

            if (!coverUrl || !coverUrl.length) {
                alert('封页图片不能为空');
                return false;
            }

            if (!me.editor.txt.text().length) {
                alert('正文不能为空');
                return false;
            }

            var data = me.form.serializeToObject();
            data['articleText'] = articleText;
            data['wordLength'] = wordLength;
            data['coverUrl'] = coverUrl;

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

        $('#resourceType-select').change(function () {
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