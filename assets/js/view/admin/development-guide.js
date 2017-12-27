// 开发指南 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 2, subIndex: 1 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    clickAdd: 0, // 点击添加
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    articleType: 'd', // List<String> 物流政策：policy  ,物流详情：detil ，开发指南：developer
                    whiteTypes: Data.preferences.select.whiteType,
                    isAll: false, // 全选
                    filter: { // 过滤条件
                        value: '',
                        type: { key: '', text: '全部' } // devId|email|null
                    },
                    currDevID: '', // 添加白名单id
                    currWhiteEntity: null,
                    list: [],
                    errors: { currDevID: '' }
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
                        this.getList();
                    },
                    fnSelectAll: function () { // 全选|反选
                        this.isAll = !this.isAll;
                        this.list.forEach(function (element, index) {
                            element.selected = this.isAll;
                        }, this);
                    },
                    deleteList: function () { // 删除接口 删除选中项
                        var ids = [];
                        this.list.forEach(function (element, index) {
                            if (element.selected) ids.push(element.articleId);
                        }, this);
                        that.articleDelete.call(this, ids);
                    },
                    selectOne: function (item, index) { // 选中|取消
                        item.selected = !item.selected;
                        this.list.splice(index, 1, item);
                    },
                    articleDelete: function (item) { // 删除接口
                        that.articleDelete.call(this, [item.articleId]);
                    },
                    closeAdd: function () { // 关闭添加弹层
                        this.clickAdd = 0;
                        this.clickAddSearch = 0;
                        this.currDevID = '';
                        this.currWhiteEntity = null;
                    },
                    openPopup: that.openPopup, // 编辑
                    articleToNotice: that.articleToNotice, // 设为/撤销公告接口
                    getList: that.getList // 列表查询接口
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        articleToNotice: function (item, bool) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                notice: bool,
                articleId: item.articleId
            };
            Api.set({ key: 'articleToNotice', accountType: 'admin', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.getList();
                    }
                }
            });
        },
        openPopup: function (item) {
            var url = Api.getData.getPageUrl('developmentGuideEdit', 'admin');
            if (item) url += '?id=' + item.articleId;
            window.location.href = url;
        },
        articleDelete: function (ids) {
            var _this = this;
            $.msg.confirmLan('confirm-delete', callback);
            function callback() {
                var _stauts = Api.getData.getCode();
                var params = {
                    articleIds: ids
                };
                Api.set({ key: 'articleDelete', accountType: 'admin', data: params }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            _this.getList();
                        }
                    }
                });
            }
        },
        getList: function (callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                articleType: _this.articleType
            };
            Api.set({ key: 'articleListSearch', accountType: 'admin', type: 'GET', data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isAll = false;
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
                                _this.getList();
                            }
                        });
                        if (callback && typeof callback == 'function') callback.call(_this, data);
                    }
                }
            });
        }
    };
})