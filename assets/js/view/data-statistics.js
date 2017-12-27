// 数据统计 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
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
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    eBayEntity: Global.option.user, // 当前ebayid实体
                    isSubAccount: Api.getData.getUser.userType()[0],
                    filter: { // 过滤条件
                        userId: '',
                        offset: 3
                    },

                    totalpackagecount: 0, //总计包裹
                    subUserList: [],
                    list: [], // 总数组
                    select: {
                        offset: Data.personal.offset,
                        export: Data.personal.export
                    },//总筛选
                    selectHighlight: { userId: 0, offset: 0, export: 0 },//筛选的高亮索引
                    selectLg: {
                        offset: Data.personal.offset[0].lg,
                        export: Data.personal.export[0].lg
                    },//筛选的初始化内容
                    erroMsg: '' // 错误信息
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                            Global.fun.menuVue.hignlight = { index: 1, subIndex: '' };
                        } else {
                            Global.fun.menuVue.hignlight = { index: 2, subIndex: '' };
                        }
                        this.page.current = (Global.option.urlParam && Global.option.urlParam.current) || 1;
                        Global.fun.updataCrumbs([{ lg: 'dataSta' }]);
                        this.filter = { userId: '', offset: Data.personal.offset[0].id };
                        this.load_list();
                        this.get_subUsers();
                        this.init_event();
                    },
                    load_list: that.load_list,
                    init_event: that.init_event, // 初始化事件
                    get_subUsers: that.get_subUsers,
                    export_event: that.export_event, //导出
                    setSelect: function (event, type, index, value) {
                        this.filter[type] = value;
                        this.selectHighlight[type] = index;
                        if (type == 'offset') {
                            this.selectLg[type] = Data.personal[type][index].lg;
                        }
                        this.load_list();
                    },
                    selectExport: function (_excel) {
                        var _this = this;
                        var _stauts = Api.getData.getCode();
                        var params = {
                            userId: _this.filter.userId,
                            offset: _this.filter.offset,
                            excel: _excel
                        };
                        if(Global.option.user.userType == Api.getData.getUser.userType()[0]){
                            params.userId = Global.option.user.isId;
                        }
                        
                        Api.set({ key: 'exportStatistics', type: 'GET', isToken: false, data: params }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    Global.fun.redirect(data.result, '_blank');
                                    // alert('这里返回的是二进制数据流');
                                }
                            }
                        });
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        init_event: function () {
            var _this = this;
            /* $.select($('.subuser_options'), function (obj) {
                 _this.filter.userId = obj.value;
                 _this.load_list();
             });
             $.select($('.subuser_time'), function (obj) {
                 _this.filter.offset = obj.value;
                 _this.load_list();
             })*/
        },
        get_subUsers: function (callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'getUsers', isToken: false, type: 'GET', data: {} }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.subUserList = data.result.dataList;
                        _this.subUserList.unshift({ userId: '', name: languages['all-subuser'] });
                    }
                }
            });
        },
        export_event: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                userId: _this.filter.userId,
                offset: _this.filter.offset
            };
            Api.set({ key: 'exportStatistics', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        // alert('这里返回的是二进制数据流');
                    }
                }
            });
        },
        load_list: function (callback) {
            var _this = this;
            _this.isloading = true;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                userId: _this.filter.userId,
                offset: _this.filter.offset
            };
            Api.set({ key: 'getStatistics', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    _this.isloading = false;
                    if (data.code == _stauts.success) {
                        _this.list = data.result.statisticsLines.dataList;
                        _this.page.count = data.result.statisticsLines.totalCounts;
                        _this.totalpackagecount = data.result.totalPackageCount;
                        if (callback) callback.call(_this);
                        $.pager({
                            target: '.js-pager',
                            count: _this.page.count,
                            current: _this.page.current,
                            pagesize: _this.page.pagesize,
                            callback: function (current, pagesize, pagecount) {
                                _this.page.current = current;
                                _this.page.pagesize = pagesize;
                                _this.load_list();
                            }
                        });
                    } else {
                        _this.erroMsg = data.message;
                    }
                }
            });
        }
    };
});