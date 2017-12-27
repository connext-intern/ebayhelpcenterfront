// dashbord add by gena
define(['api', 'global', 'data',
    '/build/controls/swiper/swiper.js',
    '/build/controls/preferences-resource/preferences-resource.js',
    '/build/controls/pop-prefer-address/pop-prefer-address.js',
    '/build/controls/pop-prefer-address-return/pop-prefer-address-return.js',
    '/build/controls/pop-prefer-deliver/pop-prefer-deliver.js',
    '/build/controls/preferences-logistics/preferences-logistics.js',
    '/build/controls/preferences-print/preferences-print.js'
], function (Api, Global, Data, Swiper, PreferencesResource, PreferencesAddAdr, PreferencesReturnAdr, PreferencesDeliver, PreferencesLogistics, PreferencesPrint) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () {
                that.createComponent();
            });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".main",
                data: {
                    isSandBox: Global.option.isSandBox,
                    openerViewPrint: 0,
                    noticePage: {
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    operator: 2,
                    notice_list: [],
                    shipppingDetail_list: [],
                    shipppingPolicie_list: [],
                    order_summary: {
                        pending: 0,
                        pendingPickup: 0,
                        received: 0
                    },
                    total_summary: [],
                    erroMsg: '', // 错误信息
                    item: {
                        itemId: false,
                        skuNo: false,
                        nameZh: false,
                        nameEn: false,
                        property: false,
                        quantity: false,
                        sellerId: false,
                        buyerId: false
                    },
                    //地址
                    popAdrOperator: {},
                    popAdrItem: {},
                    //交运
                    popDeliverOperator: {},
                    popDeliverItem: {},
                    Timer: null
                },
                mounted: function () {
                    var _this = this;
                    this.init();
                    this.switchTab();
                },
                methods: {
                    init: function () {
                        this.operator = (Global.option.user.firstLogin && Api.getData.getUser.userType()[1] == Global.option.user.userType) ? 1 : 0;
                        this.get_notices();
                        this.get_shipppingDetails();
                        this.get_shipppingPolicies();
                        this.get_packageStatistics();
                        if (!this.isSandBox) {
                            this.get_account();
                        }
                        if (this.isSandBox) {
                            this.total_summary = [{
                                "currency": "CNY",
                                "avaliable": "--",
                                "blocked": "--",
                                "total": 1
                            }, {
                                "currency": "HKD",
                                "avaliable": "--",
                                "blocked": "--",
                                "total": 2
                            }, {
                                "currency": "TWD",
                                "avaliable": "--",
                                "blocked": "--",
                                "total": 3
                            }];
                        }
                    },
                    prev: function (step) { //上一步
                        var _this = this;
                        if (step == 'addSendAdr' || step == 'editSendAdr') step = 2; // 发货地址
                        //从交运偏好而来，进入发货地址
                        if (step == 'addPreferDeliver' || step == 'editPreferDeliver') {
                            _this.getAdrListDataCall();
                            return;
                        }
                        //从打印偏好而来，进入交运偏好
                        if (step == 5) {
                            _this.getDeliverListDataCall();
                            return;
                        }
                        if (step == 'logistics') step = 6; // 物流偏好单独处理
                        step--;
                        this.operator = step;
                    },
                    next: function (step) { // 下一步
                        var _this = this;
                        //从订单来源而来，进入发货地址
                        if (step == 1) {
                            _this.getAdrListDataCall();
                            return;
                        }
                        //从发货地址而来，进入交运偏好
                        if (step == 'addSendAdr' || step == 'editSendAdr') {
                            _this.getDeliverListDataCall();
                            return;
                        }
                        //从交运偏好而来，进入面单打印偏好
                        if (step == 'addPreferDeliver' || step == 'editPreferDeliver') step = 4;
                        //从物流偏好而来，结束首次引导，显示绑定指示
                        if (step == 'logistics') step = 6;
                        step++;
                        this.operator = step;
                    },
                    getAdrListDataCall: function () {
                        var _this = this;
                        _this.getAdrListData(function (_result) {
                            if (_result.length > 0) {
                                _this.popAdrOperator = {
                                    index: 1
                                };
                                _this.popAdrItem = _result[0];
                            } else {
                                _this.popAdrOperator = {
                                    index: 0
                                }
                            }
                            _this.operator = 2;
                        });
                    },
                    getDeliverListDataCall: function () {
                        var _this = this;
                        _this.getDeliver(function (_result) {
                            if (_result.length > 0) {
                                _this.popDeliverOperator = {
                                    index: 1
                                };
                                _this.popDeliverItem = _result[0];
                            } else {
                                _this.popDeliverOperator = {
                                    index: 0
                                }
                            }
                            _this.operator = 4;
                        });
                    },
                    goBindID: function () { // 去绑定ebayID
                        this.get_authorizationUrl();
                    },
                    switchTab: function (index) { //切换
                        var _this = this;
                        if (index == undefined) {
                            index = this.noticePage.current;
                            _this.Timer = setTimeout(function () {
                                _this.switchTab();
                            }, 3000);
                        } else _this.Timer = null;
                        if (index) { //+
                            this.noticePage.current++;
                            // this.noticePage.current = Math.min(this.noticePage.current, this.noticePage.count);
                            if (this.noticePage.current == this.noticePage.count * 1 + 1) {
                                this.noticePage.current = 1;
                            }
                        } else { //-
                            this.noticePage.current--;
                            // this.noticePage.current = Math.max(this.noticePage.current, 1);
                            if (this.noticePage.current < 1) {
                                this.noticePage.current = this.noticePage.count;
                            }
                        }
                    },
                    preview: function (_item) {
                        this.item = _item;
                        this.openerViewPrint = 1;
                    },
                    dev_getSsoUrl: function (_str, ev) {
                        var $target = $(ev.srcElement || ev.target);
                        if ($target.hasClass('disabled')) return;
                        var that = this;
                        Global.fun.dev_getSsoUrl(_str);
                    },
                    get_authorizationUrl: that.get_authorizationUrl,
                    get_packageStatistics: that.get_packageStatistics, // 获取订单状态统计数据
                    get_account: that.get_account, //获取账户信息
                    get_notices: that.get_notices, // 获取公告列表
                    get_shipppingDetails: that.get_shipppingDetails, // 获取物流详情
                    get_shipppingPolicies: that.get_shipppingPolicies, // 获取物流政策
                    getAdrListData: that.getAdrListData,
                    getDeliver: that.getDeliver,
                },
                components: {
                    'swiper': Swiper,
                    'preferences-resource': PreferencesResource,
                    'pop-prefer-address-return': PreferencesReturnAdr,
                    'pop-prefer-address': PreferencesAddAdr,
                    'preferences-logistics': PreferencesLogistics,
                    'preferences-print': PreferencesPrint,
                    'pop-prefer-deliver': PreferencesDeliver
                },
                updated: function () {
                    Global.fun.updataLanguage('.main');
                    Global.fun.replaceHref('.main');
                }
            });
        },
        getAdrListData: function (callback) {
            var that = this;
            var _stauts = Api.getData.getCode();
            var _data = {
                type: 'SHIPPING' //SHIPPING,RETURN
            }
            Api.set({
                key: 'getAddresses',
                type: 'GET',
                isToken: false,
                data: _data
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        callback(data.result);
                    }
                }
            });
        },
        getDeliver: function (callback) {
            var that = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getDeliveryPreferences',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        var _arr = data.result;
                        $.each(data.result, function (index, v) {
                            var _index;
                            for (var i = 0; i < Data.preferences.select.deliverType.length; i++) {
                                var _value = Data.preferences.select.deliverType[i];
                                if (v.type == _value.id) _index = i;
                            }
                            _arr[index].typeLg = Data.preferences.select.deliverType[_index].lg;
                            if (_arr[index].address != null) {
                                for (var i = 0; i < Data.preferences.select.pickupTime.length; i++) {
                                    if (Data.preferences.select.pickupTime[i].code == v.pickupTime) {
                                        _arr[index].pickupTimeName = Data.preferences.select.pickupTime[i].name;
                                    }
                                }
                            }
                        })
                        callback(_arr);
                    }
                }
            });
        },
        get_authorizationUrl: function () {
            window.location.href = Api.getData.getPageUrl('eBayIDManage');
            // var _this = this;
            // var _stauts = Api.getData.getCode();
            // var params = {
            //     bindId: _this.eBayEntity && _this.eBayEntity.bindId
            // };
            // Api.set({ key: 'getAuthorizationUrl', type: 'GET', isToken: false, data: params }, {
            //     success: function (data, params) {
            //         if (data.code == _stauts.success) {
            //             //_this.redirecturl = data.result;
            //             //_this.operator = 0;
            //             //Global.fun.redirect(_this.redirecturl);
            //             //window.location.href = Api.getData.getPageUrl('eBayIDManage');
            //         }
            //     }
            // });
        },
        get_packageStatistics: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getAllPackageStatistics',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.order_summary = data.result;
                    }
                }
            });
        },
        get_account: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getAccounts',
                isToken: false,
                type: 'GET'
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.total_summary = data.result;
                    }
                }
            });
        },
        get_notices: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getNotices',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.notice_list = data.result;
                        _this.noticePage.current = 1;
                        _this.noticePage.count = _this.notice_list.length > 0 ? _this.notice_list.length : 0;
                    }
                }
            });
        },
        get_shipppingDetails: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getShipppingDetailsList',
                type: 'GET',
                isToken: false,
                data: {
                    pageNo: 1,
                    pageSize: 5
                }
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.shipppingDetail_list = data.result;
                    }
                }
            });
        },
        get_shipppingPolicies: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getShipppingPolicies',
                type: 'GET',
                isToken: false,
                data: {
                    pageNo: 1,
                    pageSize: 5
                }
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.shipppingPolicie_list = data.result;
                    }
                }
            });
        }
    };
})
