/**
 *louis/20170803, order
 */
define(['api', 'global', 'data',
    '/build/controls/order-package/package.js',
    '/build/controls/pop-products/popup-products.js',
    '/build/controls/printbox-order/printbox-order.js'
], function (Api, Global, Data, packageList, popProducts, PrintboxOrder) {
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
            //初始化面包屑
            Global.fun.updataCrumbs([{
                lg: 'orderManagement',
                link: 'pendingOrder'
            }, {
                lg: 'pendingOrder'
            }]);
            //初始化分页
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isSelectAll: false,
                    isUnVeri: Global.option.user.verifyState == Api.getData.getUser.verifyState()[1],
                    status: Data.order.status.package.pending,
                    statisticsNumber: {
                        pending: 0,
                        incomplete: 0,
                        pendingSelect: 0,
                        pendingApply: 0,
                        pendingConfirm: 0,
                        unavailableProduct: 0,
                        pendingPickup: 0,
                        delivered: 0,
                        exception: 0,
                        deleted: 0
                    },
                    pagerObj: {
                        current: 1,
                        pagesize: 10
                    },
                    curPackageId: null, //当前包裹id
                    version: '', // 版本号加锁
                    openerRemark: 0, //显示备注弹层
                    sellerRemark: '', // 备注
                    openerPrint: 0, //显示打印弹层
                    openerViewPrint: 0, //显示打印预览
                    openerProduct: 0, //显示批量选择物流方案弹层
                    remarkMessage: null, //处理卖家备注错误信息
                    printData: null, //储存打印需要的包裹数据
                    statusData: Data.order.status.package, //所有包裹状态信息
                    select: {
                        sellersID: [{
                            ebayId: 'ALL',
                            bindId: 'all'
                        }],
                        isAlone: Data.order.select.isAlone,
                        isLiBattery: Data.order.select.isLiBatteryOld,
                        printStatus: Data.order.select.printStatus,
                        transactionStatus: Data.order.select.transactionStatus,
                        declareStatus: Data.order.select.declareStatus,
                        peintSheet: Data.order.select.peintSheet,
                        popPrint: Data.order.select.peintSheet,
                        deliveryMethod: [{
                            id: 0,
                            name: languages['deliveryMethod']
                        }]
                    },
                    selectLg: {
                        sellersIDLg: 'ALL',
                        isAloneLg: Data.order.select.isAlone[0].lg,
                        isLiBatteryLg: Data.order.select.isLiBatteryOld[0].lg,
                        printStatusLg: Data.order.select.printStatus[0].lg,
                        transactionStatusLg: Data.order.select.transactionStatus[0].lg,
                        declareStatusLg: Data.order.select.declareStatus[0].lg,
                        peintSheetLg: 'peintSheet',
                        popPrintLg: Data.order.select.peintSheet[0].lg,
                        deliveryMethodLg: Data.preferences.select.deliverType[0].lg //languages['deliveryMethod']
                    },
                    selectHighlight: {
                        sellersIDIndex: 0,
                        isAloneIndex: 0,
                        isLiBatteryIndex: 0,
                        printStatusIndex: 0,
                        transactionStatusIndex: 0,
                        declareStatusIndex: 0,
                        peintSheetIndex: -1,
                        deliveryMethodIndex: 0,
                        popPrintIndex: 0
                    },
                    selectId: {
                        sellersID: null,
                        isAlone: null,
                        isLiBattery: null,
                        printStatus: null,
                        transactionStatus: null,
                        declareStatus: null
                    },
                    paperType: -1,
                    printIds: [],
                    printCall: {
                        call: 0
                    },
                    isShowFilter: false
                },
                components: {
                    'package-list': packageList,
                    'pop-products': popProducts,
                    'printbox-order': PrintboxOrder
                },
                mounted: function () {
                    Global.fun.updataLanguage('.filter');
                    this.$refs.package.getType('pedding');
                    //初始化包裹信息
                    this.updataPackage();
                    //初始化卖家ID信息
                    that.getEbayId();
                    //获取交运方式列表
                    that.getDeliveryPreferences();
                },
                methods: {
                    toThousands: Global.fun.toThousands,
                    setSelect: function (event, type, index, id, lg) {
                        switch (type) {
                            case 'sellersID':
                                this.selectLg.sellersIDLg = $(event.target).html();
                                this.selectId.sellersID = id;
                                this.selectHighlight.sellersIDIndex = index;
                                break;
                            case 'isAlone':
                                this.selectLg.isAloneLg = lg;
                                this.selectId.isAlone = id;
                                this.selectHighlight.isAloneIndex = index;
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
                            case 'transactionStatus':
                                this.selectLg.transactionStatusLg = lg;
                                this.selectId.transactionStatus = id;
                                this.selectHighlight.transactionStatusIndex = index;
                                break;
                            case 'declareStatus':
                                this.selectLg.declareStatusLg = lg;
                                this.selectId.declareStatus = id;
                                this.selectHighlight.declareStatusIndex = index;
                                break;
                        }
                    },
                    setInput: function (event, type, index) {
                        if (type == 'remark' && /\S/.test($(event.target).val)) {
                            this.remarkMessage = 0;
                        }
                    },
                    setBlur: function (event, index) {

                    },
                    allCheckBox: function (flag) {
                        this.isSelectAll = arguments.length > 0 ? flag : !this.isSelectAll;
                        this.$refs.package.allCheckBox(this.isSelectAll);
                    },
                    //收缩筛选条件
                    showFilter: function (event) {
                        this.isShowFilter = !this.isShowFilter;
                    },
                    //批量选择交运方式
                    deliveryMethod: function (event, name, selectId, selectIndex) {
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        this.selectLg.deliveryMethodLg = 'deliveryMethod';
                        this.selectHighlight.deliveryMethodIndex = selectIndex;
                        // this.selectLg.deliveryMethodLg = this.select.deliveryMethod[0].name;
                        if (selectId) {
                            this.$refs.package.deliveryMethod(null, selectId, function (msg) {
                                // that.vue.selectLg.deliveryMethodLg = languages['deliveryMethod'];
                                // that.vue.selectLg.deliveryMethodLg = that.vue.select.deliveryMethod[0].name;
                                that.vue.selectHighlight.deliveryMethodIndex = 0;
                                $('.footer-order .checkBox em').removeClass('cur');
                                $.msg.renderToast(false, msg);
                            });
                        }
                    },
                    //批量运行物流规则
                    getAvailableProduct: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        $.loading.show({
                            dom: 'body'
                        });
                        this.$refs.package.getAvailableProduct(null, null, null, null, 'batch', function () {
                            $('.footer-order .checkBox em').removeClass('cur');
                            $.loading.hide();
                        });
                    },
                    //关闭物流产品弹层
                    closePopProduct: function () {
                        this.openerProduct = 0;
                    },
                    //批量保存物流产品
                    savePopProduct: function (productId) {
                        var that = this;
                        this.$refs.package.selectProduct(null, null, productId, 'batch', function () {
                            $('.footer-order .checkBox em').removeClass('cur');
                            $.msg.toast('operator-shipping');
                            that.openerProduct = 0;
                        });
                    },
                    //批量选择物流方案---显示弹层
                    selectedLogisticsProgram: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        this.openerProduct = 1;
                    },
                    //批量申请物流单号
                    applyTrackingNo: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        $.loading.show({
                            dom: 'body'
                        });
                        this.$refs.package.applyTrackingNo(null, null, function () {
                            $('.footer-order .checkBox em').removeClass('cur');
                            $.loading.hide();
                        });
                    },
                    //批量交运
                    deliveryPackages: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        $.loading.show({
                            dom: 'body'
                        });
                        this.$refs.package.deliveryPackages(null, null, function () {
                            $('.footer-order .checkBox em').removeClass('cur');
                            $.loading.hide();
                        });
                    },
                    //批量打印
                    batchPrint: function (event, lg, index, selectId) {
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        var packageIds = this.$refs.package.getPackageIds();
                        this.selectLg.peintSheetLg = lg;
                        this.selectHighlight.peintSheetIndex = index;
                        this.showPrint(packageIds, selectId);
                    },
                    //批量删除
                    batchDelete: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        var thatVue = this;
                        if (!that.fun.checkBox()) {
                            $.msg.alertLan('choose-package');
                            return false;
                        }
                        $.loading.show({
                            dom: 'body'
                        });
                        this.$refs.package.deletePackages(null, null, 'batch', function () {
                            $('.footer-order .checkBox em').removeClass('cur');
                            //window.location.href = Api.getData.getPageUrl('order');
                            thatVue.updataPackage();
                            $.loading.hide();
                        });
                    },
                    //保存备注
                    saveRemark: function (event) {
                        var that = this;
                        var val = $('.popup.remark textarea').val();
                        // if (!/\S/.test(val)) {
                        //     this.remarkMessage = 1;
                        //     return;
                        // }
                        this.remarkMessage = 0;
                        Api.set({
                            key: 'addSellerRemark',
                            isToken: false,
                            locked: event.target,
                            data: {
                                packageId: this.curPackageId,
                                sellerRemark: val,
                                version: this.version
                            }
                        }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.openerRemark = 0;
                                    that.updataPackage();
                                }
                            }
                        });
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager',
                            current: this.pagerObj.current,
                            pagesize: this.pagerObj.pagesize,
                            pagecount: totalPage,
                            count: totalCount,
                            callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.updataPackage();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //获取统计数据
                    packageNumber: function (packageNumber) {
                        this.statisticsNumber = packageNumber;
                        // Global.fun.menuVue.updataPageNum({ key: 'pending', value: packageNumber.pending });
                    },
                    //显示备注弹层
                    showRemark: function (packageId, version, sellerRemark) {
                        this.openerRemark = 1;
                        this.curPackageId = packageId;
                        this.version = version;
                        this.sellerRemark = sellerRemark;
                    },
                    //显示打印弹层
                    showPrint: function (packageIds, selectId) {
                        //this.openerPrint = 1;
                        //this.selectLg.popPrintLg = that.fun.getLg(selectId, Data.order.select.peintSheet);
                        //this.selectHighlight.popPrintIndex = that.fun.getIndex(selectId, Data.order.select.peintSheet);
                        //传递给printbox
                        if (selectId.length > 0) {
                            this.paperType = selectId;
                            this.printIds = packageIds;
                        }
                    },
                    //更新package列表
                    updataPackage: function () {
                        this.$refs.package.getPackage();
                        this.allCheckBox(false);
                    },
                    //更新筛选状态
                    setStatus: function (event, key) {
                        this.status = key;
                        this.pagerObj.current = 1;
                        $(event.target).parents('li').addClass('cur').siblings('li').removeClass('cur');
                        this.updataPackage();
                    },
                    //获取所有筛选条件
                    getFilter: function (callback) {
                        var sellerEbayId = this.selectId.sellersID || '';
                        var isSingle = this.selectId.isAlone || Data.order.select.isAlone[0].id;
                        var isBaterry = this.selectId.isLiBattery || Data.order.select.isLiBattery[0].id;
                        var isPrinted = this.selectId.printStatus || Data.order.select.printStatus[0].id;
                        var isShipped = this.selectId.transactionStatus || Data.order.select.transactionStatus[0].id;
                        var declareStatus = this.selectId.declareStatus || Data.order.select.declareStatus[0].id;
                        var filter = {
                            sellerEbayId: sellerEbayId,
                            buyerEbayId: $('.filter .buyerID input').val(),
                            orderId: $('.filter .transactionNumber input').val(),
                            itemId: $('.filter .itemId input').val(),
                            skuNo: $('.filter .SKU input').val(),
                            isSingle: isSingle,
                            isBaterry: isBaterry,
                            superTrackingCode: $('.filter .trackingNumber input').val(),
                            isPrinted: isPrinted,
                            isShipped: isShipped,
                            declareStatus: declareStatus,
                            sendDate: '',
                            status: this.status,
                            preferenceId: '',
                            pageNo: this.pagerObj.current,
                            pageSize: this.pagerObj.pagesize
                        };
                        if (callback) callback(filter);
                        return filter;
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
        //加载列表
        getEbayId: function () {
            var that = this;
            Api.set({
                key: 'getEbayIds',
                type: 'GET',
                isToken: false,
                data: {
                    pageable: false
                }
            }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.vue.select.sellersID = data.result.dataList;
                        that.vue.select.sellersID.unshift({
                            ebayId: 'ALL',
                            bindId: 'all'
                        });
                    }
                }
            });
        },
        //获取交运方式列表
        getDeliveryPreferences: function () {
            var that = this;
            Api.set({
                key: 'getDeliveryPreferences',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.vue.select.deliveryMethod = data.result;
                        //that.vue.selectLg.deliveryMethodLg=data.result[0].name;
                        that.vue.select.deliveryMethod.unshift({
                            id: 0,
                            name: languages['deliveryMethod']
                        });
                    }
                }
            });
        },
        fun: {
            checkBox: function () {
                return $('.package .item-list .box .title .checkBox em.cur').length > 0;
            },
            getIndex: function (id, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id) {
                        if (list[i].id == id) {
                            return i;
                        }
                    } else {
                        if (list[i] == id) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            getLg: function (id, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        return list[i].lg;
                    }
                }
                return '';
            }
        }
    };
})