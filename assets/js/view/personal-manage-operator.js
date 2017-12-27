// 子账号管理 add by gena
// #TODO弹出绑定ebayid验证
define(['api', 'global'], function (Api, Global) {
    return {
        focusWatchArr: [],
        state: {
            'ENABLED': '启用',
            'DISABLED': '停用'
        },
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.createComponent(); });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isloading: true,
                    state: this.state,
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    operatorEntity: { //操作新增或更新子账号
                        userName: '',
                        name: '',
                        department: ''
                    },
                    operator: 0, //1新增 2修改
                    isStopUser: false, // 是否点击已停用
                    isDeleteUser: false, // 是否点击删除子账号
                    eBayEntity: Global.option.user, // 当前ebayid实体
                    list: [], // 总数组
                    list_ebay: [],
                    selectedbaylist: [],
                    unselectedbaylist: [],
                    is_show_all_eBayID: false,
                    erroMsg: '', // 错误信息
                    popup_personalAddOperatorCompleted: false,
                    errors: {},
                    isClickSave: 0
                },
                mounted: function () {
                    this.init();
                },
                watch: {
                    operator: function () {
                        this.isClickSave = 0;
                        this.hasError();
                    },
                    list_ebay: function (item) {
                        if (!item.length) return;
                        var _this = this;
                        _this.unselectedbaylist = [];
                        _this.list_ebay.forEach(function (element) {
                            if (!element.isbinded) {
                                _this.unselectedbaylist.push(element);
                            }
                        }, this);
                    }
                },
                methods: {
                    init: function () {
                        Global.fun.menuVue.hignlight = { index: 0, subIndex: 2 };
                        Global.fun.updataCrumbs([{ lg: 'personalCenter', link: 'accountInfo' }, { lg: 'subuser-manage' }]);
                        this.page.current = (Global.option.urlParam && Global.option.urlParam.current) || 1;
                        this.load_list();
                        this.init_event();
                    },
                    hasError: that.hasError,
                    load_list: that.load_list,
                    confirm_deletesubuser: that.delete_subuser, //确认删除
                    pager: that.pager,
                    delete_subuser: function (item) { // 删除子账号
                        this.operatorEntity = item;
                        this.isDeleteUser = true;
                    },
                    add_subuser: function () { // 添加操作员
                        this.popup_personalAddOperatorCompleted = false;
                        this.operatorEntity = {
                            userName: '',
                            name: '',
                            department: ''
                        };
                        this.operator = 1;
                        this.render_ebaylist2();
                    },
                    bind_subuser: function (item) { // 绑定eBayID
                        this.operatorEntity = item;
                        this.operator = 2;
                        this.render_ebaylist();
                    },
                    render_ebaylist: function () { //获取eBayList 已绑定和全部
                        that.render_ebaylist.call(this,true)
                    },
                    render_ebaylist2: function () { //获取eBayList 已绑定和全部
                        that.render_ebaylist2.call(this)
                    },
                    load_ebaylist: that.load_ebaylist, //单个加载 eBayList 已绑定和全部
                    resetEabyList:that.resetEabyList,
                    reset_setaccount: that.reset_setaccount, // 启用或停用
                    
                    switch_ebaylist: function (index) { //显示已有子账号|全部eBayList
                        this.is_show_all_eBayID = index == 1;
                    },
                    save_subuser: function (el) { // 保存绑定|新增ebayid
                        this.isClickSave++;
                        if (this.hasError()) return;
                        var arrId = [];
                        this.selectedbaylist.forEach(function (element) {
                            arrId.push(element.bindId);
                        }, this);
                        if (this.operatorEntity.userName.length > 0 && this.operatorEntity.name.length > 0) {
                            if (this.operator == 1) {
                                that.save_subuser.call(this, arrId,el);
                            } else if (this.operator == 2) {
                                that.update_subuser.call(this, arrId,el);
                            }
                        }
                    },
                    reset: function () { //重置绑定|新增ebayid
                        if (this.operator == 1) {
                            this.add_subuser();
                        }
                        else if (this.operator == 2) {
                            this.operatorEntity = this.operatorEntity;
                            this.operator = 2;
                            that.resetEabyList();
                            this.render_ebaylist2();
                        }
                    },
                    setActive: function (item) { //设置绑定
                        if (item.isbinded) return;
                        item.isbinded = true;

                        var index = that.get_index.call(this, this.list_ebay, item);
                        this.list_ebay.splice(index, 1, item);

                        this.selectedbaylist.push(item);
                    },
                    setDisabled: function (item) { //设置未绑定
                        item.isbinded = false;
                        var index = that.get_index.call(this, this.list_ebay, item);
                        this.list_ebay.splice(index, 1, item);

                        var selected_index = that.get_index.call(this, this.selectedbaylist, item);
                        this.selectedbaylist.splice(selected_index, 1);
                    },
                    init_event: that.init_event // 初始化事件
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        hasError: function () {
            var count = 0;
            for (ver in this.errors) {
                this.errors[ver] = '';
            }
            if (!this.isClickSave) return false;
            if ((!this.operatorEntity.userName) || !$.validate(['requied', 'email'], this.operatorEntity.userName).boo) {
                this.errors.userName = "err";
                count++;
            }
            if ((!this.operatorEntity.name) || !$.validate(['requied'], this.operatorEntity.name).boo) {
                this.errors.name = "err";
                count++;
            }
            return count > 0;
        },
        get_index: function (arr, item) {
            var _index;
            arr.forEach(function (element, index) {
                if (element.bindId == item.bindId) {
                    _index = index;
                }
            }, this);
            return _index;
        },
        init_event: function () {
            var _this = this;
        },
        //初始化分页
        pager: function (totalPage, totalCount) {
            var _this = this;
            $.pager({
                target: '.js-pager', current: _this.page.current, pagesize: _this.page.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                    _this.page.current = current;
                    _this.page.pagesize = pagesize;
                    _this.load_list();
                }
            });
            Global.fun.updataLanguage('.js-pager');
        },
        load_list: function (callback) {
            var _this = this;
            _this.isloading = true;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize
            };
            Api.set({ key: 'getSubusers', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    _this.isloading = false;
                    if (data.code == _stauts.success) {
                        _this.list = data.result.dataList;
                        _this.page.count = data.result.totalCounts;
                        _this.totalcount = _this.page.count;
                        if (callback) callback.call(_this);
                        _this.pager(data.result.totalPages, data.result.totalCounts);
                    }
                }
            });
        },
        delete_subuser: function () {
            var _this = this;
            if (!_this.operatorEntity) return;
            var params = {
                userId: _this.operatorEntity.userId
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'deleteSubuser', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isDeleteUser = false;
                        _this.load_list();
                    }
                }
            });
        },
        reset_setaccount: function (item, state) {
            var _this = this;
            var params = {
                userId: item.userId,
                state: state
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'setSubuserState', type: 'PUT', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        $.msg.alertLan('operator');
                        _this.load_list();
                    }
                }
            });
        },
        update_subuser: function (bindIds,el) {
            var _this = this;
            var params = {
                userId: _this.operatorEntity.userId,
                name: _this.operatorEntity.name,
                userName: _this.operatorEntity.userName,
                department: _this.operatorEntity.department,
                bindIds: bindIds
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'updateSubuser', type: 'PUT', isToken: false, data: params,locked:el.target,loading:el.target}, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.load_list(function () {
                            _this.operator = 0;
                        });
                    }
                }
            });
        },
        save_subuser: function (bindIds,el) {
            var _this = this;
            var params = {
                userName: _this.operatorEntity.userName,
                userId: _this.operatorEntity.userId,
                name: _this.operatorEntity.name,
                department: _this.operatorEntity.department,
                bindIds: bindIds
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'saveSubuser', isToken: false, data: params, locked:el.target,loading:el.target}, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.load_list(function () {
                            _this.operator = 0;
                            _this.popup_personalAddOperatorCompleted = true;
                        });
                    }
                }
            });
        },
        resetEabyList:function(){
            var _this=this;
            _this.selectedbaylist=[];
            _this.unselectedbaylist=[];
            _this.list_ebay=[];
        },
        render_ebaylist: function (_boo) {
            var _this = this;
            _this.resetEabyList();
            Promise.all([_this.load_ebaylist.call(_this, false), _this.load_ebaylist.call(_this, true)]).then(function () {
                for (var i = 0; i < _this.list_ebay.length; i++) {
                    for (var j = 0; j < _this.selectedbaylist.length; j++) {
                        if (_this.list_ebay[i].bindId == _this.selectedbaylist[j].bindId) {
                            _this.list_ebay[i].isbinded = true;
                        }
                        // if (Global.option.isFile && i < 5) { //TODO 测试
                        //     _this.list_ebay[i].isbinded = false;
                        // }
                    }
                }
                // if (Global.option.isFile) { //TODO 测试
                //     _this.selectedbaylist.splice(0, 5);
                // }
                _this.unselectedbaylist = [];
                _this.list_ebay.forEach(function (item, index) {
                    if (!item.isbinded) _this.unselectedbaylist.push(item);
                });
            });
        },
        render_ebaylist2: function () {
            var _this = this;
            _this.resetEabyList();
            Promise.all([_this.load_ebaylist.call(_this, true)]).then(function () {
                for (var i = 0; i < _this.list_ebay.length; i++) {
                    for (var j = 0; j < _this.selectedbaylist.length; j++) {
                        if (_this.list_ebay[i].bindId == _this.selectedbaylist[j].bindId) {
                            _this.list_ebay[i].isbinded = true;
                        }
                        // if (Global.option.isFile && i < 5) { //TODO 测试
                        //     _this.list_ebay[i].isbinded = false;
                        // }
                    }
                }
                // if (Global.option.isFile) { //TODO 测试
                //     _this.selectedbaylist.splice(0, 5);
                // }
                _this.unselectedbaylist = [];
                _this.list_ebay.forEach(function (item, index) {
                    if (!item.isbinded) _this.unselectedbaylist.push(item);
                });
            });
        },
        load_ebaylist: function (isall) {
            var _this = this;
            isall = isall;
            var _stauts = Api.getData.getCode();
            var params = {
                pageable: false
            };
            // 编辑，则需要userId
            //if (_this.operator == 2) params.userId = _this.operatorEntity.userId;
            if (!isall) params.userId = _this.operatorEntity.userId;
            return new Promise(function (resolve, reject) {
                Api.set({ key: 'getEbayIds', type: 'GET', isToken: false, data: params }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            if (isall) {
                                _this.list_ebay = [];
                                _this.list_ebay = data.result.dataList;
                            }
                            else {
                                _this.selectedbaylist = [];
                                _this.selectedbaylist = data.result.dataList;
                            }
                            resolve();
                        } else {
                            _this.erroMsg = data.message;
                        }
                    }
                });
            });
        }
    };
});                                                                                                                                