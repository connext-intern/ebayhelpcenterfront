// 白名单 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 2, subIndex: 0 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    clickAdd: 0, // 点击添加
                    clickAddSearch: 0, // 添加白名单，点击查询
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    whiteTypes: Data.preferences.select.whiteType,
                    isAll: false, // 全选
                    filter: { // 过滤条件
                        value: '',
                        type: { key: '', text: '全部' } // devId|email|null
                    },
                    currDevID: '', // 添加白名单id
                    currWhiteEntity: null,
                    list: [],
                    errors: {}
                },
                mounted: function () {
                    this.init();
                },
                watch: {
                    list: function (newlist) {
                        var count = 0;
                        newlist.forEach(function (element) {
                            if (element.selected) {
                                count++;
                            }
                        }, this);
                        this.isAll = count > 0;
                    }
                },
                methods: {
                    init: function () {
                        this.whiteListSearch();
                    },
                    fnSelectAll: function () { // 全选|反选
                        this.isAll = !this.isAll;
                        this.list.forEach(function (element, index) {
                            element.selected = this.isAll;
                        }, this);
                    },
                    deleteList: function () { // 白名单删除接口 删除选中项
                        var ids = [];
                        this.list.forEach(function (element, index) {
                            if (element.selected) ids.push(element.whiteId);
                        }, this);
                        that.whiteListDelete.call(this, ids);
                    },
                    whiteListDelete: function (item) { // 白名单删除接口
                        that.whiteListDelete.call(this, [item.whiteId]);
                    },
                    selectWhiteList: function (item, index) { // 选中|取消白名单
                        item.selected = !item.selected;
                        this.list.splice(index, 1, item);
                    },
                    closeAdd: function () { // 关闭添加弹层
                        this.clickAdd = 0;
                        this.clickAddSearch = 0;
                        this.currDevID = '';
                        this.currWhiteEntity = null;
                    },
                    hasError: that.hasError,
                    whiteListSearchOne: that.whiteListSearchOne, // 查询开发者id
                    whiteListAdd: that.whiteListAdd, // 添加白名单
                    whiteListSearch: that.whiteListSearch, // 白名单列表查询接口
                    getList: that.getList // 白名单列表查询接口
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        whiteListAdd: function () {
            var _this = this;
            this.clickAdd++;
            if (_this.hasError()) return;
            var _stauts = Api.getData.getCode();
            if (_this.currWhiteEntity) callback.call(_this);
            else this.whiteListSearchOne(callback);
            function callback() {
                var _this = this;
                var params = {
                    devId: _this.currWhiteEntity.devId
                };
                Api.set({ key: 'whiteListAdd', accountType: 'admin', isToken: false, data: params }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            _this.closeAdd();
                            _this.whiteListSearch();
                        }
                    }
                });
            }
        },
        whiteListDelete: function (ids) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                whiteIds: ids
            };
            $.msg.confirmLan('confirm-delete', callback);
            function callback() {
                Api.set({ key: 'whiteListDelete', accountType: 'admin', isToken: false, data: params }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            if (ids.length > 1) $.msg.alert(data.result);
                            _this.whiteListSearch();
                        }
                    }
                });
            }
        },
        hasError: function () {
            var _this = this;
            var count = 0;
            for (ver in this.errors) {
                this.errors[ver] = '';
            }
            if ((!_this.currDevID) || !$.validate(['requied'], _this.currDevID).boo) {
                this.errors.currDevID = '请输入正确的值';
                count++;
            }
            return count > 0;
        },
        whiteListSearchOne: function (callback) {
            this.clickAddSearch++;
            var _this = this;
            if (_this.hasError()) return;
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                searchValue: _this.currDevID,
                searchType: 'devId'
            };
            params.developerType = "private";
            _this.getList(params, function (data) {
                if (data.result.dataList.length > 0) {
                    _this.currWhiteEntity = data.result.dataList[0];
                    if (callback && typeof callback === 'function') callback.call(_this);
                }
                else {
                    $.msg.alert('没有查询到数据');
                }
            });
        },
        whiteListSearch: function () {
            var _this = this;
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                searchValue: _this.filter.value,
                searchType: _this.filter.type.key
            };
            params.developerType = "public";
            this.getList(params, function (data) {
                _this.list = data.result.dataList;
                _this.page.count = data.result.totalCounts;
                $.pager({
                    target: '.js-pager',
                    count: _this.page.count,
                    current: _this.page.current,
                    pagesize: _this.page.pagesize,
                    callback: function (current, pagesize, pagecount) {
                        _this.page.current = current;
                        _this.page.pagesize = pagesize;
                        _this.whiteListSearch();
                    }
                });
            });
        },
        getList: function (params, callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'whiteListSearch', type: 'GET', accountType: 'admin', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isAll = false;
                        if (callback && typeof callback == 'function') callback.call(_this, data);
                    }
                }
            });
        }
    };
})