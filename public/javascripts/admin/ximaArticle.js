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
        $('.J-config').click(function () {
            window.location.href = '/admin/daka/config';
        });
        $('.J-add').click(function () {
            window.location.href = '/admin/ximaArticle/add';
        });

    },
    initGid: function (me, cb) {
        var gridObj = {};
        BUI.use(['bui/grid', 'bui/data', 'bui/mask'], function (Grid, Data, Mask) {
            var Grid = Grid,
                Store = Data.Store,
                columns = [{
                        title: '作品名',
                        dataIndex: 'arName',
                        width: 200,
                        sortable: false
                    },
                    {
                        title: '作品组别',
                        dataIndex: 'arLeave',
                        width: 200,
                        sortable: false,
                        renderer: function (value, obj) {
                            var textArry = ['幼儿组', '小学组', '中学组']
                            return textArry[value];
                        }
                    }, {
                        title: '索引',
                        dataIndex: 'index',
                        width: 200,
                        sortable: false
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        width: 200,
                        sortable: false
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        width: 200,
                        sortable: false,
                        renderer: function (value, obj) {
                            var returnStr = value == '1' ? '下线' : '正常';
                            return returnStr;
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'h',
                        width: 120,
                        sortable: false,
                        renderer: function (value, obj) {
                            var returnStr = '';
                            returnStr += ' <span class="grid-command mod-btn">修改文章</span>';
                            returnStr += ' <span class="grid-command status-btn">上下线</span>';
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
                root: 'data.list', //存放数据的字段名
                totalProperty: 'data.totalCount', //存放记录总数的字段名(results)
                proxy: {
                    pageStart: 1,
                    url: '/ximalaya/api/queryArticle',
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
                loadMask: new Mask.LoadMask({
                    el: 'body'
                }), //加载数据时显示屏蔽层
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
                    window.location.href = '/admin/ximaArticle/modify?articleId=' + record._id;
                }

                if (target.hasClass('status-btn')) {
                    changeItem()
                }


                if (target.hasClass('remove-btn')) {
                    BUI.Message.Show({
                        msg: '确定删除吗?',
                        buttons: [{
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


                function changeItem() {
                    var status = record.status == 1 ? '0' : '1';
                    $.ajax({
                        url: '/ximalaya/api/updateArticleStatus',
                        type: 'post',
                        data: {
                            '_id': record._id,
                            status: status,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.status == 200) {
                                BUI.Message.Alert('更新成功');
                                me.updateGid(me);
                            } else {
                                BUI.Message.Alert(data.errmsg);
                            }
                        }
                    })
                }

                function removeItem() {
                    $.ajax({
                        url: '/ximalaya/api/delArticle/del',
                        type: 'post',
                        data: {
                            '_id': record._id
                        },
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
                    buttons: [{
                            text: '是',
                            elCls: 'button button-primary',
                            handler: function () {
                                this.close();
                                $.ajax({
                                    url: '/admin/api/teacher/changeStatusBath',
                                    type: 'post',
                                    data: {
                                        '_idArray': idArray.toString(),
                                        status: 2
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