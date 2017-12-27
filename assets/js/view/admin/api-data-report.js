// API调用数据报告 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 2, subIndex: 3 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    offsets: Data.personal.offset,
                    apiSuccess: 0, // 调用接口成功数总计
                    apiFailed: 0, // 调用接口是失败数总计
                    filter: { // 过滤条件
                        span: { text: '当月', id: '0' }
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
                    selectSpan: function (item) { // 选择下拉框
                        this.filter.span = item;
                        this.getList();
                    },
                    closeAdd: function () { // 关闭添加弹层
                        this.clickAdd = 0;
                        this.clickAddSearch = 0;
                        this.currDevID = '';
                        this.currWhiteEntity = null;
                    },
                    exportToExcel: that.exportToExcel, // 导出
                    getList: that.getList // API调用次数查询
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        exportToExcel: function (callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                searcScope: _this.filter.span.id
            };
            $.msg.alertLan('getmail');
            Api.set({ key: 'apiExport', accountType: 'admin', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        if (callback && typeof callback == 'function') callback.call(_this, data);
                        // Global.fun.redirect(data.result, '_blank');
                    }
                }
            });
        },
        getList: function (callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                searcScope: _this.filter.span.id,
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize
            };
            Api.set({ key: 'apiSearch', type: 'GET', accountType: 'admin', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.list = data.result.pageDto.dataList;
                        _this.page.count = data.result.pageDto.totalCounts;
                        _this.apiSuccess = data.result.apiSuccess;
                        _this.apiFailed = data.result.apiFailed;
                        
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