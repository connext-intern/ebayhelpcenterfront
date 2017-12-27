// IS账号管理 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 1 };
            // 初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'message' }]);
            // 初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    selectedbaylist: [],
                    unselectedbaylist: [],
                    searchFields: Data.admin.select.ISAccountFields,
                    isAll: false, // 全选
                    filter: { // 过滤条件
                        value: '',
                        type: { key: '', text: '全部' }
                    },
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    list: [], // 列表数据
                    currEntity: null // 当前编辑实体
                },
                mounted: function () {
                    this.loadList();
                },
                methods: {
                    pager: that.pager, // 初始化分页
                    loadList: that.loadList,
                    get_index: function (arr, item) {
                        var _index;
                        arr.forEach(function (element, index) {
                            if (element.eiasToken == item) {
                                _index = index;
                            }
                        }, this);
                        return _index;
                    },
                    selectAll: function () { // 编辑权限|全选
                        this.isAll = !this.isAll;
                        this.selectedbaylist = [];
                        this.unselectedbaylist.forEach(function (element) {
                            element.ischecked = this.isAll;
                        }, this);
                        if (this.isAll) {
                            this.unselectedbaylist.forEach(function (element) {
                                this.selectedbaylist.push(element);
                                console.log(element);
                            }, this);
                        }
                    },
                    setActive: function (item) { //设置绑定
                        item.ischecked = true;
                        var _index = this.get_index(this.selectedbaylist, item.eiasToken);
                        if (_index >= 0) {
                            this.selectedbaylist.splice(_index, 1, item);
                        }
                        else {
                            this.selectedbaylist.splice(_index, 0, item);
                        }
                    },
                    setDisabled: function (item) { //设置未绑定
                        item.ischecked = false;
                        var _index = this.get_index(this.selectedbaylist, item.eiasToken);
                        if (_index >= 0) {
                            this.selectedbaylist.splice(_index, 1);
                        }
                    },
                    resetAuthrize: function () { // 清空授权
                        this.load_ebaylist();
                    },
                    cancelAuthrize: function () { // 取消授权
                        var _this = this, eBayIds = [];
                        var _stauts = Api.getData.getCode();
                        _this.selectedbaylist.forEach(function (element) {
                            eBayIds.push(element.eiasToken);
                        }, this);
                        var params = {
                            isId: _this.currEntity.isid,
                            ebayIds: eBayIds
                        };
                        Api.set({ key: 'eBayIDCannel', accountType: 'admin', isToken: false, data: params }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    _this.unselectedbaylist = [];
                                    _this.loadList();
                                }
                            }
                        });
                    },
                    load_ebaylist: that.load_ebaylist,
                    editAuthorize: function (item) { // 查询绑定eBayId列表接口
                        this.currEntity = item;
                        this.load_ebaylist();
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        get_index: function (arr, item) {
            var _index;
            for (var key in arr) {
                if (key == item) {
                    _index = key;
                }
            }
            return _index;
        },
        loadList: function () {
            var _this = this;
            var params = {
                pageable: true,
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                fieldValue: _this.filter.value,
                searchField: _this.filter.type.key
            };
            Api.set({ key: 'ISAccountSearch', type: 'GET', accountType: 'admin', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        _this.list = data.result.dataList;
                        _this.pager(data.result.totalPages, data.result.totalCounts);
                    };
                }
            });
        },
        pager: function (totalPage, totalCount) {
            var that = this;
            $.pager({
                target: '.js-pager', current: this.page.current, pagesize: this.page.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                    that.page.current = current;
                    that.page.pagesize = pagesize;
                    that.loadList();
                }
            });
            Global.fun.updataLanguage('.js-pager');
        },
        load_ebaylist: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                isId: _this.currEntity.isid
            };
            Api.set({ key: 'eBayIDListSearch', accountType: 'admin', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.selectedbaylist = [];
                        _this.unselectedbaylist = [];
                        _this.isAll = false;
                        data.result.forEach(function (element) {
                            element.ischecked = false;
                        }, this);
                        _this.unselectedbaylist = data.result;
                    } else {
                        _this.erroMsg = data.message;
                    }
                }
            });
        }
    };
});