function obj() {
    this.initialize();
}


function hanldePic(pic) {
    if (pic.indexOf('.png') > -1) {
        return pic.split('.png')[0] + '.jpg';
    } else {
        return pic;
    }
}

obj.prototype = {
    initialize: function () {
        var me = this;
        me.gridObj = me.initGid(me);
        me.dialog = me.initDialog(me);
        me.dialogComments = me.initDialogComments(me);
        me.bindEvent(me);
    },
    bindEvent: function (me) {
        $('.J-query').click(function () {
            me.updateGid(me);
        });

        $('.J-city').change(function () {
            var data = {
                cityNo: $(this).val()
            };

            if (data.cityNo == '') {
                return false;
            }

            $.ajax({
                type: 'POST',
                url: '/teacher/api/school',
                data: data,
                success: function (data) {
                    console.log(data);
                    if (data.status == '200') {
                        genSchoolSelect(data.data);
                    } else {
                        toast(data.errmsg);
                    }
                },
                dataType: 'json'
            });
        })

        function genSchoolSelect(data) {
            var str = '<option value="">学校</option>';
            for (var i = 0; i < data.length; i++) {
                str += '<option value="' + i + '">' + data[i] + '</option>'
            }
            $('.J-school').html(str);
        }
    },
    initGid: function (me, cb) {
        var gridObj = {};
        BUI.use(['bui/grid', 'bui/data', 'bui/mask'], function (Grid, Data, Mask) {
            var Grid = Grid,
                Store = Data.Store,
                columns = [
                    {title: '中文名', dataIndex: 'realName', width: 80, sortable: false},
                    {title: '英文名', dataIndex: 'englishName', width: 80, sortable: false},
                    {title: '城市', dataIndex: 'cityName', width: 80, sortable: false},
                    {title: '学校', dataIndex: 'schoolName', width: 180, sortable: false},
                    {title: '电话', dataIndex: 'cellPhone', width: 120, sortable: false},
                    {title: '宣言', dataIndex: 'voteWords', width: 300, sortable: false},
                    {title: '票数', dataIndex: 'totalVoteCounts', width: 80},
                    {
                        title: '图片', dataIndex: 'status', width: 100, sortable: false, renderer: function (v, obj) {

                        var returnStr = '';

                        if (obj.groupPic && obj.groupPic.length > 0) {
                            returnStr += '<a href="/files/' + hanldePic(obj.groupPic) + '" target="_blank" >' + '合照' + '</a><br/>';
                        }

                        if (obj.personPic && obj.personPic.length > 0) {
                            returnStr += '<a href="/files/' + hanldePic(obj.personPic) + '" target="_blank" >' + '个照' + '</a><br/>';
                        }

                        if (returnStr.length == 0) {
                            returnStr = '---';
                        }


                        return returnStr;
                    }
                    },
                    {
                        title: '审核状态', dataIndex: 'status', width: 100, renderer: function (value, obj) {

                        var statusWord;
                        if (value == 0) {
                            statusWord = '未提交';
                        } else if (value == 1) {
                            statusWord = '待审核';
                        } else if (value == 2) {
                            statusWord = '审核通过';
                        } else if (value == 3) {
                            statusWord = '审核不通过';
                        } else if (value == 9) {
                            statusWord = '黑名单';
                        } else {
                            statusWord = '未知';
                        }
                        return statusWord;
                    }
                    },
                    {
                        title: '操作', dataIndex: 'h', width: 120, sortable: false, renderer: function (value, obj) {
                        var returnStr = '';
                        if (obj.status == 1) {
                            returnStr += '<span class="grid-command reviewed-btn">通过审核</span>';
                            returnStr += '<span class="grid-command refuse-btn">拒绝审核</span>';
                        }

                        if (obj.status == 2) {
                            returnStr += '<span class="grid-command comments-btn">留言</span>';
                        }

                        returnStr += '<span class="grid-command mod-btn">修改</span>';
                        returnStr += ' <span class="grid-command remove-btn">删除</span>';

                        return returnStr;
                    }
                    }
                ];

            var form = $('#J-search-form');
            var data = BUI.FormHelper.serializeToObject(form);

            var store = gridObj.store = new Store({
                autoSync: true, //保存数据时，是否自动更新数据源的数据
                autoLoad: true, //自动加载数据
                params: data,
                currentPage: 10,
                pageSize: 10,
                sortInfo: {
                    field: "totalVoteCounts",
                    direction: 'ASC' //升序ASC，降序DESC
                },
                remoteSort: true,
                root: 'data.list',           //存放数据的字段名
                totalProperty: 'data.totalCount', //存放记录总数的字段名(results)
                proxy: {
                    pageStart: 1,
                    url: '/admin/api/teacher/query',
                    method: 'post',
                    dataType: 'json'
                }
            });

            store.on('beforeprocessload', function (data) {
                var data = data.data;
                if (data.status != '200') {
                    data.list = [];
                    BUI.Message.Alert(data.errmsg);
                } else {
                    var list = data.data.list;
                    if (list.length == 0) {
                        BUI.Message.Alert('暂时没有数据');
                        return false;
                    } else {
                        $.each(list, function (index, item) {

                            $.each(item.teacherInfo, function (i, t) {
                                item[i] = t;
                            })

                            $.each(item.VoteInfo, function (i, t) {
                                item[i] = t;
                            })

                            if (item.VoteData && item.VoteData.totalVoteCounts > 0) {
                                item['totalVoteCounts'] = item.VoteData.totalVoteCounts;
                            } else {
                                item['totalVoteCounts'] = 0;
                            }
                        })
                    }
                }
                console.log(list);
                data.data.list = list;
            });


            var grid = gridObj.grid = new Grid.Grid({
                render: '#record-table',
                width: '100%',
                columns: columns,
                loadMask: new Mask.LoadMask({el: 'body'}), //加载数据时显示屏蔽层
                store: store,
                emptyDataTpl: '暂无数据',
                tbar: { //添加、删除
                    items: [{
                        btnCls: 'button button-primary',
                        text: '批量审批',
                        listeners: {
                            'click': passBathFunction
                        }
                    }]
                },
                // 底部工具栏
                bbar: {
                    // pagingBar:表明包含分页栏
                    pagingBar: true
                },
                plugins: [Grid.Plugins.CheckSelection, Grid.Plugins.ColumnChecked]
            });

            grid.render();
            $('#record-table').show();

            grid.on('cellclick', function (ev) {
                var record = ev.record, //点击行的记录
                    field = ev.field, //点击对应列的dataIndex
                    target = $(ev.domTarget); //点击的元素

                if (target.hasClass('mod-btn')) {
                    BUI.FormHelper.setFields($('#dialog-form')[0], record);

                    console.log(me.dialog);
                    me.dialog.set('title', '修改权限');
                    me.dialog.set('success', function (e) {
                        var thisDialog = this;
                        if (me.dialogForm.isValid()) {
                            data = BUI.FormHelper.serializeToObject($('#dialog-form'));
                            changeItem(data.status, '修改状态成功', {
                                cityNo: data.cityNo,
                                schoolNo: data.schoolNo
                            });
                            me.dialog.hide();
                        }
                    })
                    me.dialog.show();
                }

                if (target.hasClass('comments-btn')) {
                    var studentWords = record.studentWords;
                    var str = '';
                    if (studentWords.length > 0) {
                        $.each(studentWords, function (index, item) {
                            var words = ['人工', '拉票', '投票', '刷票', 'piao', '这女上过', '拿刀逼着投的', '色色', '造假专家'];
                            var flag = true;

                            for (var j = 0; j < words.length; j++) {
                                if (item.studentName.indexOf(words[j]) >= 0 || item.content.indexOf(words[j]) >= 0) {
                                    flag = false;
                                }
                            }

                            if (flag) {
                                str += '<div class="comments-rows">';
                                str += '<div class="studentName">' + item.studentName + '</div>'
                                str += '<div class="content">' + item.content + '</div> </div>'
                            }
                        });
                        $('.adminDialogComments-content').html(str);
                    } else {
                        $('.adminDialogComments-content').html('<div class="comments-rows"><div class="studentName">暂无数据</div></div>');
                    }


                    me.dialogComments.set('title', '查看留言');
                    me.dialogComments.show();

                }

                if (target.hasClass('remove-btn')) {

                    BUI.Message.Show({
                        msg: '确定删除吗?',
                        buttons: [
                            {
                                text: '是',
                                elCls: 'button button-primary',
                                handler: function () {
                                    this.close();
                                    removeItem();
                                }
                            },
                            {
                                text: '否',
                                elCls: 'button',
                                handler: function () {
                                    this.close();
                                }
                            }

                        ]
                    });
                }
                if (target.hasClass('reviewed-btn')) {

                    BUI.Message.Show({
                        msg: '确定通过审核吗?',
                        buttons: [
                            {
                                text: '是',
                                elCls: 'button button-primary',
                                handler: function () {
                                    this.close();
                                    changeItem(2, '审核通过成功');
                                }
                            },
                            {
                                text: '否',
                                elCls: 'button',
                                handler: function () {
                                    this.close();
                                }
                            }

                        ]
                    });
                }
                if (target.hasClass('refuse-btn')) {
                    BUI.Message.Show({
                        msg: '确定拒绝审核吗?',
                        buttons: [
                            {
                                text: '是',
                                elCls: 'button button-primary',
                                handler: function () {
                                    this.close();
                                    changeItem(3, '审核拒绝成功');
                                }
                            },
                            {
                                text: '否',
                                elCls: 'button',
                                handler: function () {
                                    this.close();
                                }
                            }

                        ]
                    });
                }

                function changeItem(status, msg, data) {
                    $.ajax({
                        url: '/admin/api/teacher/changeStatus',
                        type: 'post',
                        data: {
                            '_id': record._id,
                            status: status,
                            cityNo: data && data['cityNo'] || '',
                            schoolNo: data && data['schoolNo'] || ''
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.status == 200) {
                                BUI.Message.Alert(msg);
                                me.updateGid(me);
                            } else {
                                BUI.Message.Alert(data.errmsg);
                            }

                            //发送短信
                            // $.ajax({
                            //     url: '/admin/api/teacher/smsSend',
                            //     type: 'post',
                            //     data: {
                            //         'name': record.realName, 'cellPhone': record.cellPhone
                            //     },
                            //     success: function (data) {
                            //         if (data.status == 200) {
                            //             BUI.Message.Alert('短信发送成功');
                            //             me.updateGid(me);
                            //         } else {
                            //             BUI.Message.Alert(data.errmsg);
                            //         }
                            //     }
                            // });
                        }
                    })
                }

                function removeItem() {
                    $.ajax({
                        url: '/admin/api/teacher/del',
                        type: 'post',
                        data: {'cellPhone': record.cellPhone},
                        success: function (data) {
                            console.log(data);
                            if (data.status == 200) {
                                BUI.Message.Alert('删除成功');
                                me.updateGid(me);
                            } else {
                                BUI.Message.Alert(data.errmsg);
                            }
                        }
                    })
                }

            });

            function passBathFunction() {
                var selections = grid.getSelection();
                if (selections.length == 0) {
                    BUI.Message.Alert('请选择至少一个数据');
                    return false;
                }

                var idArray = [];
                for (var i = 0; i < selections.length; i++) {
                    idArray.push(selections[i]._id);
                }

                BUI.Message.Show({
                    msg: '确定批量通过审核吗?',
                    buttons: [
                        {
                            text: '是',
                            elCls: 'button button-primary',
                            handler: function () {
                                this.close();
                                $.ajax({
                                    url: '/admin/api/teacher/changeStatusBath',
                                    type: 'post',
                                    data: {
                                        '_idArray': idArray.toString(), status: 2
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        if (data.status == 200) {
                                            BUI.Message.Alert(data.errmsg);
                                            me.updateGid(me);
                                        } else {
                                            BUI.Message.Alert(data.errmsg);
                                        }
                                    }
                                })
                            }
                        },
                        {
                            text: '否',
                            elCls: 'button',
                            handler: function () {
                                this.close();
                            }
                        }

                    ]
                });
            }
        });
        return gridObj;
    },
    updateGid: function (me, cb) {
        var form = $('#J-search-form');
        var data = BUI.FormHelper.serializeToObject(form);

        data.start = 0;
        data.pageIndex = 0;

        me.gridObj.store.load(data, function (data) {
            cb && cb(data);
        });

    },
    initDialog: function (me) {
        var dialog;


        BUI.use('bui/form', function (Form) {

            var form = me.dialogForm = new Form.Form({
                srcNode: '#dialog-form'
            }).render();

        });


        BUI.use(['bui/overlay'], function (Overlay, Form) {
            me.dialog = new Overlay.Dialog({
                title: '',
                width: 850,
                height: 320,
                elCls: 'adminDialog',
                elBefore: '#adminDialog',
                //配置DOM容器的编号
                contentId: "adminDialog"
            });
        });
    },
    initDialogComments: function (me) {
        var dialog;

        BUI.use(['bui/overlay'], function (Overlay, Form) {
            me.dialogComments = new Overlay.Dialog({
                title: '',
                width: 850,
                height: 500,
                elCls: 'adminDialogComments',
                elBefore: '#adminDialogComments',
                //配置DOM容器的编号
                contentId: "adminDialogComments"
            });
        });
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