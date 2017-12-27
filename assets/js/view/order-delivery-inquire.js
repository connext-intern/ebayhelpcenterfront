/**
 *louis/20170803, order
 */
define(['api', 'global', 'data',
    '/build/controls/order-package-logistics/package-logistics.js',
    '/build/controls/jeDate/jeDate.js'
], function (Api, Global, Data, packageLogisticsList, jedate) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 2 };
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'orderManagement', link: 'pendingOrder' }, { lg: 'deliveryInquireOrder' }]);
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    deliveryTime: '',
                    status: Data.order.status.package.ReceiveConfirmation,
                    statisticsNumber: { onShipping: 0, received: 0 },
                    pagerObj: { current: 1, pagesize: 10, totalCount: 0 },
                    statusData: Data.order.status.package,//所有包裹状态信息
                    select: {
                        sellersID: [{ ebayId: 'ALL', bindId: 'all' }],
                        deliveryTime: Data.order.select.deliveryTime
                    },
                    selectLg: {
                        sellersIDLg: 'ALL',
                        deliveryTimeLg: Data.order.select.deliveryTime[0].text
                    },
                    selectHighlight: { sellersIDIndex: 0, deliveryTimeIndex: 0 },
                    selectId: { sellersID: null, sendDate: '' },
                    isShowFilter: false
                },
                components: {
                    'package-logistics-list': packageLogisticsList,
                    'jedate': jedate
                },
                mounted: function () {
                    Global.fun.updataLanguage('.filter');
                    this.$refs.packageLogistics.getType('deliveryInquire');
                    //初始化包裹信息
                    this.updataPackage();
                    //初始化卖家ID信息
                    that.getEbayId();
                },
                methods: {
                    toThousands: Global.fun.toThousands,
                    getVal: function (val) {
                        this.deliveryTime = val;
                    },
                    setSelect: function (event, type, index, id, lg) {
                        switch (type) {
                            case 'sellersID':
                                this.selectLg.sellersIDLg = $(event.target).html();
                                this.selectId.sellersID = id;
                                this.selectHighlight.sellersIDIndex = index;
                                break;
                            case 'deliveryTime':
                                this.selectLg.deliveryTimeLg = lg;
                                this.selectId.sendDate = id;
                                this.selectHighlight.deliveryTimeIndex = index;
                                break;
                        }
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
                        this.pagerObj.totalCount = totalCount;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.updataPackage();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //显示打印弹层
                    showPrint: function (packageIds, selectId) {
                        this.openerPrint = 1;
                        this.selectLg.popPrintLg = that.fun.getLg(selectId, Data.order.select.peintSheet);
                        this.selectHighlight.popPrintIndex = that.fun.getIndex(selectId, Data.order.select.peintSheet);
                    },
                    //更新筛选状态
                    setStatus: function (event, key) {
                        this.status = key;
                        this.pagerObj.current = 1;
                        $(event.target).parents('li').addClass('cur').siblings('li').removeClass('cur');
                        this.updataPackage();
                    },
                    //更新package列表
                    updataPackage: function () {
                        this.$refs.packageLogistics.getPackage();
                    },
                    //获取统计数据
                    packageNumber: function (packageNumber) {
                        this.statisticsNumber = packageNumber;
                        // Global.fun.menuVue.updataPageNum({ key: 'delivered', value: packageNumber.delivered });
                    },
                    //获取所有筛选条件
                    getFilter: function (callback) {
                        var sellerEbayId = this.selectId.sellersID || '';
                        var filter = {
                            sellerEbayId: sellerEbayId, buyerEbayId: $('.filter .buyerID input').val(), orderId: $('.filter .transactionNumber input').val(), itemId: $('.filter .itemId input').val(),
                            skuNo: $('.filter .SKU input').val(), superTrackingCode: $('.filter .trackingNumber input').val(), sendDate: this.deliveryTime.replace(/-/ig, ''),
                            status: this.status, pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize
                        };
                        if (callback) callback(filter);
                        return filter;
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

        }
    };
})