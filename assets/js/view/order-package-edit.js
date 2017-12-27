// 编辑包裹 add by gena
define(['api', 'global', 'data',
    '/build/controls/order-address/order-address.js',
    '/build/controls/order-good-list/order-good-list.js',
    '/build/controls/order-package-info/order-package-info.js',
    '/build/controls/order-package-delivery/order-package-delivery.js',
    '/build/controls/order-package-shipping/order-package-shipping.js',
    '/build/controls/popup-change-shipping/popup-change-shipping.js',
    '/build/controls/printbox-order/printbox-order.js'
], function (Api, Global, Data, OrderAddress, OrderGoodList, OrderPackageInfo, OrderPackageDelivery, OrderPackageShipping, PopupChangeShipping, PrintboxOrder) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () {
                that.run();
            });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = {
                index: 0,
                subIndex: 0
            };
            Global.fun.updataCrumbs([{
                lg: 'orderManagement',
                link: 'pendingOrder'
            }, {
                lg: 'packageEditInfo'
            }]);
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isChangeProduct:false,
                    products: [],
                    availableProducts: [],
                    changeProducts: [],
                    popDeliver: {
                        status: 0,
                        success: 0,
                        failed: 0,
                        isSuccess: false,
                        isNeedBatteryAuth: false,
                        message: 0
                    },
                    isCancelShipping: false,
                    clickProdCount: 0,
                    packageId: Global.option.urlParam.packageId,
                    item: null,
                    trackingRecordList: [],
                    packageStatus: Data.order.status.package, // 包裹状态
                    print: {
                        select: Data.order.select.peintSheet,
                        lg: 'peintSheet',
                        index: -1
                    },
                    status: {
                        // 啥是信息不完整
                        unWhole: false,
                        // 待选择物流方案
                        selectedShipping: false,
                        // 无可用物流方案
                        noUsefulShipping: false,
                        // 待申请运单号
                        appliedTrackingCode: false,
                        // 待交运
                        toBeShipped: false,
                        // 待取件
                        toBeReceived: false,
                        // 运输中
                        onShipping: false,
                        // 已妥投
                        delivered: false,
                        ReceiveConfirmation: false,
                        unpackage: false
                    },
                    paperType: -1,
                    printIds: [],
                    printCall: {
                        call: 0
                    }
                },
                mounted: function () {
                    this.getPackageDetail();
                },
                components: {
                    'order-address': OrderAddress,
                    'order-good-list': OrderGoodList,
                    'order-package-shipping': OrderPackageShipping,
                    'order-package-delivery': OrderPackageDelivery,
                    'order-package-info': OrderPackageInfo,
                    'popup-change-shipping': PopupChangeShipping,
                    'printbox-order': PrintboxOrder
                },
                watch: {
                    item: function (newitem) {
                        this.status.unWhole = newitem.lackOfPackageInfo || newitem.lackOfDeliveryInfo;
                        this.status.lackOfPackageInfo = newitem.lackOfPackageInfo && this.packageStatus.packageInfoLack == newitem.status;
                        this.status.lackOfDeliveryInfo = newitem.lackOfDeliveryInfo && this.packageStatus.packageInfoLack == newitem.status;
                        this.status.lackOfDeliveryInfo = newitem.declaring && this.packageStatus.packageInfoLack == newitem.status;
                        this.status.selectedShipping = this.packageStatus.selectedShipping == newitem.status;
                        this.status.noUsefulShipping = this.packageStatus.noUsefulShipping == newitem.status;
                        this.status.appliedTrackingCode = this.packageStatus.appliedTrackingCode == newitem.status;
                        this.status.toBeShipped = this.packageStatus.toBeShipped == newitem.status;
                        this.status.toBeReceived = this.packageStatus.toBeReceived == newitem.status;
                        this.status.onShipping = this.packageStatus.onShipping == newitem.status;
                        this.status.delivered = this.packageStatus.delivered == newitem.status;
                        this.status.ReceiveConfirmation = this.packageStatus.ReceiveConfirmation == newitem.status;
                        this.status.unpackage = newitem.lackOfPackageInfo;
                    }
                },
                methods: {
                    refresh: function () { //刷新页面
                        this.getPackageDetail();
                    },
                    backToList: function () {
                        this.popDeliver.status = 0;
                        if (this.popDeliver.success > 0) window.location.href = Api.getData.getPageUrl('pendingOrder');
                        else this.refresh();
                    },
                    dev_getSsoUrl: Global.fun.dev_getSsoUrl,
                    packageNumber: that.packageNumber,
                    getChangeProducts: that.getChangeProducts,
                    getProducts: that.getProducts,
                    getAvailableProduct: that.getAvailableProduct, // 运行物流规则（查询可用物流产品）
                    applyTrackingNo: that.applyTrackingNo, // 申请物流单号
                    deliveryPackages: that.deliveryPackages, // 交运
                    reship: that.reship, // 运输中订单_重新发货
                    cancelPackage: that.cancelPackage, // 取消包裹
                    deletePackages: that.deletePackages, // 删除包裹
                    getPackageDetail: that.getPackageDetail, // 根据ID查询包裹详细信息
                    //批量打印
                    batchPrint: function (event, lg, index, selectId) {
                        this.print.lg = lg;
                        this.print.index = index;
                        if (selectId.length > 0) {
                            this.paperType = selectId;
                            this.printIds = [this.item.packageId];
                        }
                    },
                    printCallFun: function () {
                        this.printCall = $.extend({}, this.printCall); //Object.assign({}, this.printCall)
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        getChangeProducts: function () {
            var that = this;
            that.isChangeProduct = true;
            that.clickProdCount++;
            that.changeProducts = that.item.availableProductList;
            that.products = that.changeProducts;
        },
        //获取所有产品列表
        getProducts: function () {
            var that = this;
            that.isChangeProduct = false;
            if (that.availableProducts.length > 0) {
                that.clickProdCount++;
                that.products = that.availableProducts;
                return;
            }
            Api.set({
                key: 'getProducts',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.clickProdCount++;
                        that.availableProducts = data.result;
                        that.products = that.availableProducts;
                    }
                }
            });
        },
        getAvailableProduct: function () { // 运行物流规则（查询可用物流产品）
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                packageIds: [_this.item.packageId]
            };
            $.loading.show({
                dom: 'body'
            });
            Api.set({
                key: 'getAvailableProduct',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    $.loading.hide();
                    if (data.code == _stauts.success) {
                        $.msg.alert(data.message);
                        _this.refresh();
                    }
                }
            });
        },
        packageNumber: function (packageNumber) {
            this.statisticsNumber = packageNumber;
            Global.fun.menuVue.updataPageNum(packageNumber.pending, packageNumber.pendingPickup, packageNumber.delivered, packageNumber.exception, packageNumber.deleted);
        },
        applyTrackingNo: function () {
            var _this = this;
            var params = {
                packageIds: [_this.item.packageId]
            };
            var _stauts = Api.getData.getCode();
            $.loading.show({
                dom: 'body'
            });
            Api.set({
                key: 'applyTrackingNo',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    $.loading.hide();
                    if (data.code == _stauts.success) {
                        _this.refresh();
                        $.msg.alertLan('operator');
                    }
                }
            });
        },
        deliveryPackages: function () {
            var that = this;
            var params = {
                packageIds: [that.packageId]
            };
            $.loading.show({
                dom: 'body'
            });
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'deliveryPackages',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    $.loading.hide();
                    that.popDeliver.status = 1;
                    that.popDeliver.isSuccess = data.code == '00';
                    // var _isMainUser = true;
                    // var _isBattery = Global.option.user.batteryVerifyState;
                    // if (Api.getData.getUser.userType()[0] == Global.option.user.userType) _isMainUser = false;
                    // if (!_isBattery) that.popDeliver.status = _isMainUser ? 2 : 3;
                    that.popDeliver.message = data.message;
                    if (!data.result) return;
                    that.popDeliver.success = data.result.successCount;
                    that.popDeliver.failed = data.result.failCount;
                    that.popDeliver.isNeedBatteryAuth = data.result.isNeedBatteryAuth;
                }
            });
        },
        reship: function () {
            var _this = this;
            var params = {
                packageId: _this.packageId
            };
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'reship',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.refresh();
                    }
                }
            });
        },
        cancelPackage: function () {
            var _this = this;
            var params = {
                packageId: _this.packageId
            };
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'cancelPackage',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.refresh();
                    }
                }
            });
        },
        deletePackages: function () {
            var _this = this;
            $.msg.confirmLan('confirm-delete', callback);

            function callback() {
                var params = {
                    packageIds: [_this.packageId]
                };
                var _stauts = Api.getData.getCode();
                Api.set({
                    key: 'deletePackages',
                    isToken: false,
                    data: params
                }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            window.location.href = Api.getData.getPageUrl('pendingOrder');
                        }
                    }
                });
            }
        },
        getPackageDetail: function () {
            var _this = this;
            var params = {
                packageId: _this.packageId
            };
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getPackageDetail',
                type: 'GET',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.item = data.result;
                    }
                }
            });
            // 更新包裹统计数据
            Api.set({
                key: 'getAllPackageStatistics',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        // console.log(data.result.received)
                        // console.log(data.result.incomplete)
                        _this.packageNumber(data.result);
                    }
                }
            });
        }
    };
})