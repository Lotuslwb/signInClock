function obj() {
    this.initialize();
}


obj.prototype = {
    initialize: function () {
        var me = this;
        me.gridObj = me.initGid(me);
        me.dialog = me.initDialog(me);
        me.bindEvent(me);
    },
    bindEvent: function (me) {
        $('.J-query').click(function () {
            me.updateGid(me);
        });
    },
    initGid: function (me, cb) {
        var gridObj = {};
        BUI.use(['bui/grid', 'bui/data', 'bui/mask'], function (Grid, Data, Mask) {
            var Grid = Grid,
                Store = Data.Store,
                columns = [
                    {title: '中文名', dataIndex: 'realName', width: 80, sortable: false},
                    {title: '英文名', dataIndex: 'englishName', width: 80, sortable: false},
                    {
                        title: '性别', dataIndex: 'sex', width: 80, sortable: false, renderer: function (value) {
                        if (value == 1) {
                            return '男';
                        } else if (value == 2) {
                            return '女';
                        } else {
                            return '-';
                        }
                    }
                    },
                    {title: '年龄', dataIndex: 'age', width: 80, sortable: false},
                    {title: '城市', dataIndex: 'cityName', width: 80, sortable: false},
                    {title: '学校', dataIndex: 'schoolName', width: 80, sortable: false},
                    {title: '电话', dataIndex: 'cellPhone', width: 120, sortable: false},
                    {title: '是否会员', dataIndex: 'isLeaguer', width: 300, sortable: false},
                    {title: '标签', dataIndex: 'tag', width: 80},
                    {title: '其他', dataIndex: 'others', width: 80, sortable: false},
                    {
                        title: '操作', dataIndex: 'h', width: 120, sortable: false, renderer: function (value, obj) {
                        var returnStr = '';
                        // if (obj.status == 1) {
                        //     returnStr += '<span class="grid-command reviewed-btn">通过审核</span>';
                        //     returnStr += '<span class="grid-command refuse-btn">拒绝审核</span>';
                        // }
                        //
                        // returnStr += '<span class="grid-command mod-btn">修改</span>';
                        // returnStr += ' <span class="grid-command remove-btn">删除</span>';

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
                    field: "createdAt",
                    direction: 'DESC' //升序ASC，降序DESC
                },
                remoteSort: true,
                root: 'data.list',           //存放数据的字段名
                totalProperty: 'data.totalCount', //存放记录总数的字段名(results)
                proxy: {
                    pageStart: 1,
                    url: '/admin/api/leads/query',
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
                        var columns = ['realName', 'englishName', 'age', 'sex', 'cityName', 'schoolName', 'cellPhone', 'isLeaguer', 'others', 'tag']
                        $.each(list, function (index, item) {
                            console.log('预处理从后台来的数据');
                            $.each(columns, function (i, t) {
                                if (!item[t]) {
                                    item[t] = '-';
                                }
                            })
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
                loadMask: new Mask.LoadMask({el: '#main'}), //加载数据时显示屏蔽层
                store: store,
                emptyDataTpl: '暂无数据',
                // 底部工具栏
                bbar: {
                    // pagingBar:表明包含分页栏
                    pagingBar: true
                },
                plugins: []
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
                            changeItem(data.status, '修改状态成功');
                            me.dialog.hide();
                        }
                    })
                    me.dialog.show();
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

                function changeItem(status, msg) {
                    $.ajax({
                        url: '/admin/api/teacher/changeStatus',
                        type: 'post',
                        data: {
                            '_id': record._id, status: status
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
    _genSelect: function (data, selector) {
        var str = '';
        $.each(data, function (i, t) {
            str += '<option value="' + t.value + '">' + t.text + '</option>';
        });
        $(selector).html(str);
    }
}

new obj();