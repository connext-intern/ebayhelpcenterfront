/**
 *louis/20170803, order
 */
define(['api', 'global', 'data',
    '/build/controls/order-package-logistics/package-logistics.js',
    '/build/controls/pop-print-delivery-order/pop-print-delivery-order.js',
    '/build/controls/printbox-order/printbox-order.js',
    '/build/controls/printbox-deliver/printbox-deliver.js'
], function (Api, Global, Data, packageLogisticsList, printDeliveryOrder, PrintboxOrder, PrintboxDeliver) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 1 };
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'orderManagement', link: 'pendingOrder' }, { lg: 'waitingPickedUpOrder' }]);
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isSelectAll: false,
                    isUnVeri: Global.option.user.verifyState == Api.getData.getUser.verifyState()[1],
                    status: Data.order.status.package.toBeReceived,
                    pagerObj: { current: 1, pagesize: 10 },
                    openerPrint: 0,//显示打印弹层
                    openerViewPrint: 0,//显示打印预览
                    printDeliveryOrderStatus: false,//打印交接单显示和隐藏
                    select: {
                        sellersID: [{ ebayId: 'ALL', bindId: 'all' }],
                        isLiBattery: Data.order.select.isLiBatteryOld,
                        printStatus: Data.order.select.printStatus,
                        peintSheet: Data.order.select.peintSheet,
                        popPrint: Data.order.select.peintSheet
                    },
                    selectLg: {
                        sellersIDLg: 'ALL',
                        isLiBatteryLg: Data.order.select.isLiBatteryOld[0].lg,
                        printStatusLg: Data.order.select.printStatus[0].lg,
                        peintSheetLg: 'peintSheet',
                        popPrintLg: Data.order.select.peintSheet[0].lg
                    },
                    selectHighlight: { sellersIDIndex: 0, isLiBatteryIndex: 0, printStatusIndex: 0, peintSheetIndex: -1, popPrintIndex: 0 },
                    selectId: { sellersID: null, isLiBattery: null, printStatus: null },
                    paperType: -1,
                    printIds: [],
                    printCall: { call: 0 },
                    printDeliverCall: { call: 0 },
                    isShowFilter: false,
                    statusFilers: [],
                    statusEntity: { preferenceId: '' },
                    allcount: 0 // 总数
                },
                components: {
                    'package-logistics-list': packageLogisticsList,
                    'pop-print-delivery-order': printDeliveryOrder,
                    'printbox-order': PrintboxOrder,
                    'printbox-deliver': PrintboxDeliver
                },
                mounted: function () {
                    Global.fun.updataLanguage('.filter');
                    this.$refs.packageLogistics.getType(this.status);
                    //初始化包裹信息
                    this.updataPackage();
                    //初始化卖家ID信息
                    that.getEbayId();
                },
                methods: {
                    setBlur: function (event, index) {

                    },
                    toThousands: Global.fun.toThousands,
                    setSelect: function (event, type, index, id, lg) {
                        switch (type) {
                            case 'sellersID':
                                this.selectLg.sellersIDLg = $(event.target).html();
                                this.selectId.sellersID = id;
                                this.selectHighlight.sellersIDIndex = index;
                                break;
                            case 'isLiBattery':
                                this.selectLg.isLiBatteryLg = lg;
                                this.selectId.isLiBattery = id;
                                this.selectHighlight.isLiBatteryIndex = index;
                                break;
                            case 'printStatus':
                                this.selectLg.printStatusLg = lg;
                                this.selectId.printStatus = id;
                                this.selectHighlight.printStatusIndex = index;
                                break;
                        }
                    },
                    allCheckBox: function (flag) {
                        this.isSelectAll = arguments.length > 0 ? flag : !this.isSelectAll;
                        this.$refs.packageLogistics.allCheckBox(this.isSelectAll);
                    },
                    //收缩筛选条件
                    showFilter: function (event) {
                        this.isShowFilter = !this.isShowFilter;
                        // if ($(event.target).hasClass('cur')) {
                        //     $(event.target).removeClass('cur');
                        //     $('.filter').show();
                        // } else {
                        //     $(event.target).addClass('cur');
                        //     $('.filter').hide();
                        // }
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.updataPackage();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //批量打印交接单
                    printDeliveryOrder: function () {
                        $('#paperType').val(3);//重置打印交接单，热敏纸设置的值
                        var _this = this;
                        if (!that.fun.checkBox()) { $.msg.alertLan('choose-package'); return false; }
                        var packageIds = this.$refs.packageLogistics.getPackageIds();
                        //this.printDeliveryOrderStatus = true;
                        //this.$refs.printdeliveryorder.setDeliveryOrder(packageIds);
                        // 模拟
                        Api.set({ key: 'generateHandoverSheet', type: 'GET', isToken: false, data: { packageIds: packageIds.join(',') } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    var _obj = {
                                        ids: packageIds.length > 1 ? data.message : "",
                                        result: data.result
                                    }
                                    _this.printDeliverCall = _obj;
                                }
                            }
                        });
                    },
                    //显示打印弹层
                    showPrint: function (packageIds, selectId) {
                        //this.openerPrint = 1;
                        //this.selectLg.popPrintLg = that.fun.getLg(selectId, Data.order.select.peintSheet);
                        //this.selectHighlight.popPrintIndex = that.fun.getIndex(selectId, Data.order.select.peintSheet);
                        //传递给printbox
                        this.paperType = selectId;
                        this.printIds = packageIds;
                    },
                    //批量打印
                    batchPrint: function (event, lg, index, selectId) {
                        if (!that.fun.checkBox()) { $.msg.alertLan('choose-package'); return false; }
                        var packageIds = this.$refs.packageLogistics.getPackageIds();
                        this.selectLg.peintSheetLg = lg;
                        this.selectHighlight.peintSheetIndex = index;
                        this.showPrint(packageIds, selectId);
                    },
                    //更新筛选状态
                    setStatus: function (obj,ev) {
                        var $target = $(ev.srcElement||ev.target||ev.currentTarget);
                        this.statusEntity = obj || this.statusEntity;
                        // this.status = Data.order.status.package[key];
                        this.pagerObj.current = 1;
                        $target.parents('li').addClass('cur').siblings('li').removeClass('cur');
                        this.updataPackage();
                    },

                    //更新package列表
                    updataPackage: function () {
                        var that = this;
                        this.allCheckBox(false);
                        this.$refs.packageLogistics.getPackage(function () {
                            that.$refs.packageLogistics.getDeliveryStatistics();
                        });
                    },
                    packageNumber: function (packageNumber) {
                        this.statisticsNumber = packageNumber;
                        // Global.fun.menuVue.updataPageNum({ key: 'pendingPickup', value: packageNumber.pendingPickup });
                    },
                    //获取统计数据
                    updatestatus: function (data) {
                        var _this = this;
                        this.allcount = 0;
                        this.statusFilers = data;
                        this.statusFilers.forEach(function (element) {
                            _this.allcount = _this.allcount + element.packageCount;
                        }, this);
                    },
                    //获取所有筛选条件
                    getFilter: function (callback) {
                        var sellerEbayId = this.selectId.sellersID || '';
                        var isBaterry = this.selectId.isLiBattery || Data.order.select.isLiBattery[0].id;
                        var isPrinted = this.selectId.printStatus || Data.order.select.printStatus[0].id;
                        var filter = {
                            preferenceId: this.statusEntity.preferenceId,
                            sellerEbayId: sellerEbayId, buyerEbayId: $('.filter .buyerID input').val(), orderId: $('.filter .transactionNumber input').val(), itemId: $('.filter .itemId input').val(),
                            skuNo: $('.filter .SKU input').val(), isBaterry: isBaterry, superTrackingCode: $('.filter .trackingNumber input').val(), isPrinted: isPrinted,
                            status: this.status, pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize
                        };
                        if (callback) callback(filter);
                        return filter;
                    },
                    printCallFun: function () {
                        this.printCall = $.extend({}, this.printCall); //Object.assign({}, this.printCall);
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        //加载列表
        getEbayId: function () {
            var that = this;
            Api.set({ key: 'getEbayIds', type: 'GET', isToken: false, data: { pageable: false } }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.vue.select.sellersID = data.result.dataList;
                        that.vue.select.sellersID.unshift({ ebayId: 'ALL', bindId: 'all' });
                    }
                }
            });
        },

        fun: {
            checkBox: function () {
                return $('.package-logistics .item-list table thead .checkBox em.cur').length > 0;
            },
            getIndex: function (id, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id) {
                        if (list[i].id == id) { return i; }
                    } else {
                        if (list[i] == id) { return i; }
                    }
                }
                return -1;
            },
            getLg: function (id, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == id) { return list[i].lg; }
                }
                return '';
            }
        }
    };
})