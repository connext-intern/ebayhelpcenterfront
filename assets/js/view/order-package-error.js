/**
 * 异常包裹 add by gena
 */
define(['api', 'global', 'data',
    '/build/controls/order-package-errorlist/order-package-errorlist.js'
], function (Api, Global, Data, OrderPackageErrorlist) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 4 };
            // 初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'orderManagement', link: 'pendingOrder' }, { lg: 'errorPackage' }]);
            // 初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    pagerObj: { current: 1, pagesize: 10 },
                    select: {
                        sellersID: [{ ebayId: 'ALL', bindId: 'all' }],
                        isLiBattery: Data.order.select.isLiBatteryOld
                    },
                    selectLg: {
                        sellersIDLg: 'ALL',
                        isLiBatteryLg: Data.order.select.isLiBatteryOld[0].lg
                    },
                    orderStatus: Data.order.status.package,
                    selectHighlight: { sellersIDIndex: 0, isLiBatteryIndex: 0 },
                    selectId: { sellersID: 0, isLiBattery: Data.order.select.isLiBatteryOld[0].id },
                    filter: { // 过滤条件
                        buyerEbayId: '', // 买家ID
                        orderId: '', // 交易编号
                        itemId: '', // itemId
                        skuNo: '', // 产品SKU

                        superTrackingCode: '', // 物流单号
                        sendDate: '', // 交运时间（物流查询订单）
                        preferenceId: '' // 交运偏好ID
                    },
                    list: [], // 列表数据
                    isShowFilter: false
                },
                mounted: function () {
                    Api.set({ key: 'getAllPackageStatistics', type: 'GET', isToken: false }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                var packageNumber = data.result;
                                Global.fun.menuVue.updataPageNum(packageNumber.pending, packageNumber.pendingPickup, packageNumber.delivered, packageNumber.exception, packageNumber.deleted);
                            }
                        }
                    });
                    this.init();
                },
                methods: {
                    init: function () {
                        //初始化包裹信息
                        this.getPackage();
                        //初始化卖家ID信息
                        this.getEbayId();
                    },
                    packageNumber: that.packageNumber,
                    setSelect: that.setSelect,
                    getEbayId: that.getEbayId, // 获取卖家ebayid
                    getPackage: that.getPackage, // 获取包裹数据和统计数据
                    pager: that.pager, // 初始化分页
                    showFilter: that.showFilter // 收缩筛选条件
                },
                components: {
                    'order-package-errorlist': OrderPackageErrorlist
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        // 获取ebayid
        getEbayId: function () {
            var _this = this;
            Api.set({ key: 'getEbayIds', type: 'GET', isToken: false, data: { pageable: false } }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        _this.select.sellersID = data.result.dataList;
                        _this.select.sellersID.unshift({ ebayId: 'ALL', bindId: 'all' });
                    }
                }
            });
        },
        // 获取包裹数据和统计数据
        getPackage: function () {
            var that = this;
            // 获取包裹数据
            var params = $.extend({}, that.filter, { pageNo: that.pagerObj.current, pageSize: that.pagerObj.pagesize, status: that.orderStatus.declaredFailed }, {sellersID:that.selectId.sellersID,isBaterry:that.selectId.isLiBattery});
            if (Global.option.urlParam.id) {
                params.packageId = Global.option.urlParam.id;
            }
            Api.set({ key: 'getPackages', type: 'GET', data: params }, {
                success: function (data) {
                    if (data.code == Api.getData.getCode().success) {
                        that.list = data.result.dataList;
                        that.pager(data.result.totalPages, data.result.totalCounts);
                    }
                }
            });
            // 更新包裹统计数据
            // Api.set({ key: 'getPackageStatistics', type: 'GET', isToken: false, data: params }, {
            //     success: function (data, params) {
            //         if (data.code == Api.getData.getCode().success) {
            //             that.packageNumber(data.result);
            //         }
            //     }
            // });
        },
        //获取统计数据
        packageNumber: function (packageNumber) {
            this.statisticsNumber = packageNumber;
            // Global.fun.menuVue.updataPageNum({ key: 'exception', value: packageNumber.exception });
        },
        // 收缩筛选条件
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
        // 初始化分页
        pager: function (totalPage, totalCount) {
            var that = this;
            $.pager({
                target: '.js-pager', current: that.pagerObj.current, pageSize: that.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                    that.pagerObj.current = current;
                    that.pagerObj.pagesize = pagesize;
                    that.getPackage();
                }
            });
            Global.fun.updataLanguage('.js-pager');
        },
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
            }
        }
    };
})
