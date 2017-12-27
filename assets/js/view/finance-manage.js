// 财务管理 add by gena
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
                    filter: { // 过滤条件
                        currency: '',
                        offset: 3,
                        billType: '' //全部流水
                    },
                    isShowBtn:false,
                    isExpandSummary: true,
                    total_summary: [ //币种账户信息
                        {
                            currency: 'CNY',
                            avaliable: '0',
                            blocked: '0',
                            curtotalCost: 0,
                            prevtotalCost: 0,
                            show: false
                        },
                        {
                            currency: 'HKD',
                            avaliable: '0',
                            blocked: '0',
                            curtotalCost: 0,
                            prevtotalCost: 0,
                            show: false
                        },
                        {
                            currency: 'TWD',
                            avaliable: '0',
                            blocked: '0',
                            curtotalCost: 0,
                            prevtotalCost: 0,
                            show: false
                        }
                    ],
                    exportSelectValue: 'exportFinance',
                    list: [], // 总数组
                    select: { billType: Data.personal.billType, currency: Data.personal.currency, offset: Data.personal.offset },//总筛选
                    selectHighlight: { billType: 0, currency: 0, offset: 0 },//筛选的高亮索引
                    selectLg: { billType: Data.personal.billType[0].lg, currency: Data.personal.currency[0].lg, offset: Data.personal.offset[0].lg },//筛选的初始化内容
                    erroMsg: '' // 错误信息
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    dev_getSsoUrl:Global.fun.dev_getSsoUrl,
                    init: function () {
                        Global.fun.menuVue.hignlight = { index: 1, subIndex: '' };
                        Global.fun.updataCrumbs([{ lg: 'finance-manage' }]);
                        this.page.current = (Global.option.urlParam && Global.option.urlParam.current) || 1;
                        this.filter = { billType: Data.personal.billType[0].id, currency: Data.personal.currency[0].id, offset: Data.personal.offset[0].id };
                        this.load_list();
                        this.render();
                        this.init_event();
                    },
                    load_list: that.load_list,
                    get_summary: that.get_summary, //获取费用汇总
                    get_account: that.get_account, //获取所有币种账户信息
                    render: that.render,
                    export_event: that.export_event, //导出
                    init_event: that.init_event, // 初始化事件
                    setSelect: function (event, type, index, value) {
                        this.filter[type] = value;
                        this.selectHighlight[type] = index;
                        this.selectLg[type] = Data.personal[type][index].lg;
                        this.load_list();
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        init_event: function () {
            var _this = this;
            /* $.select($('.js-select-detail'), function (obj) {
                 _this.filter.billType = obj.value;
                 _this.load_list();
             });
             $.select($('.js-select-currency'), function (obj) {
                 _this.filter.currency = obj.value;
                 _this.load_list();
             });
             $.select($('.js-select-time'), function (obj) {
                 _this.filter.offset = obj.value;
                 _this.load_list();
             })*/
        },
        render: function () {
            var _this = this, _date = new Date(), _year = _date.getFullYear(), _month = _date.getMonth();
            var monthfee = _this.get_summary(0); //本月费用
            var prev_monthfee = _this.get_summary(1); //上月费用
            var account_summary = _this.get_account(); //币种信息
            account_summary.then(function (arr1) {
                for (var i = 0; i < _this.total_summary.length; i++) {
                    for (var j = 0; j < arr1.length; j++) {
                        if (_this.total_summary[i].currency == arr1[j].currency) {
                            _this.total_summary[i].avaliable = arr1[j].avaliable;
                            _this.total_summary[i].blocked = arr1[j].blocked;
                            _this.total_summary[i].show = true;
                        }
                    }
                }
            });
            monthfee.then(function (arr2) {
                for (var i = 0; i < _this.total_summary.length; i++) {
                    for (var j = 0; j < arr2.length; j++) {
                        if (_this.total_summary[i].currency == arr2[j].currency) {
                            _this.total_summary[i].curtotalCost = arr2[j].totalCost;
                        }
                    }
                }
            });
            prev_monthfee.then(function (arr3) {
                for (var m = 0; m < _this.total_summary.length; m++) {
                    for (var n = 0; n < arr3.length; n++) {
                        if (_this.total_summary[m].currency == arr3[n].currency) {
                            _this.total_summary[m].prevtotalCost = arr3[n].totalCost;
                        }
                    }
                }
            });
        },
        get_account: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            return new Promise(function (resolve, reject) {
                Api.set({ key: 'getAccounts', isToken: false, type: 'GET' }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            resolve(data.result);
                            _this.isShowBtn = data.result.length>1;
                        }
                    }
                });
            });
        },
        get_summary: function (val) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                offset: val
            };
            return new Promise(function (resolve, reject) {
                Api.set({ key: 'getAccountsSummary', type: 'GET', isToken: false, data: params }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            resolve(data.result);
                        }
                    }
                });
            });
        },
        load_list: function (callback) {
            var _this = this;
            _this.isloading = true;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                offset: _this.filter.offset,
                currency: _this.filter.currency,
                billType: _this.filter.billType
            };
            Api.set({ key: 'getAccountBills', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    _this.isloading = false;
                    if (data.code == _stauts.success) {
                        _this.list = data.result.dataList;
                        _this.page.count = data.result.totalCounts;
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
        },
        export_event: function (event,_str,index) {
            var _this = this;
            _this.exportSelectValue = _str;
            if(index==1){return false;}
            var _stauts = Api.getData.getCode();
            var params = {
                billType: _this.filter.billType,
                currency: _this.filter.currency,
                offset: _this.filter.offset,
                isExcel:index==3?true:false
            };
            //var url = Api.getData.getApiUrl('exportAccountBills') + "&billType=" + params.billType + "&currency=" + params.currency + "&offset=" + params.offset+"&isExcel="+params.isExcel;
           // Global.fun.redirect(url);
            Api.set({ key: 'exportAccountBills', type: 'GET', data: params }, {
                 success: function (data, params) {
                     if (data.code == _stauts.success) {
                         Global.fun.redirect(data.result,'_blank');
                     }
                 }
             });
        }
    };
});