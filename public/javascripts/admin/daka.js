function obj() {
    this.initialize();
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
        $('.J-add').click(function () {
            window.location.href = '/admin/daka/add'
        });

    },
    initGid: function (me, cb) {
        var gridObj = {};
        BUI.use(['bui/grid', 'bui/data', 'bui/mask'], function (Grid, Data, Mask) {
            var Grid = Grid,
                Store = Data.Store,
                columns = [
                    {title: '文章标题', dataIndex: 'articleTitle', width: 200, sortable: false},
                    {title: '阅读耗时', dataIndex: 'needTime', width: 80, sortable: false},
                    {title: '难度等级', dataIndex: 'difficulty', width: 80, sortable: false},
                    {title: '词汇量', dataIndex: 'wordLength', width: 80, sortable: false},
                    {title: '视频链接', dataIndex: 'videoURL', width: 350, sortable: false},
                    {title: '音频链接', dataIndex: 'audioURL', width: 350, sortable: false},
                    {
                        title: '操作', dataIndex: 'h', width: 120, sortable: false, renderer: function (value, obj) {
                        var returnStr = '';

                        returnStr += ' <span class="grid-command mod-btn">修改</span>';
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
                currentPage: 30,
                pageSize: 30,
                sortInfo: {
                    field: "totalVoteCounts",
                    direction: 'DESC' //升序ASC，降序DESC
                },
                remoteSort: true,
                root: 'data.list',           //存放数据的字段名
                totalProperty: 'data.totalCount', //存放记录总数的字段名(results)
                proxy: {
                    pageStart: 1,
                    url: '/admin/api/daka/query',
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
                // 底部工具栏
                bbar: {
                    // pagingBar:表明包含分页栏
                    pagingBar: true
                }
            });

            grid.render();
            $('#record-table').show();

            grid.on('cellclick', function (ev) {
                var record = ev.record, //点击行的记录
                    field = ev.field, //点击对应列的dataIndex
                    target = $(ev.domTarget); //点击的元素

                if (target.hasClass('mod-btn')) {
                    window.location.href = '/admin/daka/modify?bookId=' + record._id;
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
                        url: '/admin/api/daka/del',
                        type: 'post',
                        data: {'_id': record._id},
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