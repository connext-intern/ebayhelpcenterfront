/**
 * gfh 20170904
 */
define(['api', 'global', 'data', '/build/controls/pop-logistics-info/pop-logistics-info.js',
    '/build/controls/jeDate/jeDate.js'
], function (Api, Global, Data, logisticsInfo, jedate) {
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
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    logisticsInfo: {
                        status: false
                    }, //储存物流详情的弹层信息
                    list: [], //初始化数据列表
                    pagerObj: {
                        current: 1,
                        pagesize: 10
                    },
                    statusData: Data.order.status.package, //记录所有包裹状态
                    status: Data.order.status.package.all, //记录当前页面的状态
                    from: '', //记录交运时间
                    to: '', //记录交运时间
                    selectStatus: {
                        data: [{
                                id: Data.order.status.package.all,
                                text: '全部'
                            },
                            {
                                id: Data.order.status.package.declaredFailed,
                                text: '异常'
                            },
                            {
                                id: Data.order.status.package.pending,
                                text: '待处理'
                            },
                            {
                                id: Data.order.status.package.toBeReceived,
                                text: '待取件'
                            },
                            {
                                id: Data.order.status.package.onShipping,
                                text: '运输中'
                            },
                            {
                                id: Data.order.status.package.delivered,
                                text: '已妥投'
                            },
                            {
                                id: Data.order.status.package.shippingException,
                                text: '物流状态异常'
                            },
                            {
                                id: Data.order.status.package.deleted,
                                text: '已删除'
                            }
                        ],
                        lg: '全部',
                        index: 0
                    } //下拉包裹状态
                },
                components: {
                    'pop-logistics-info': logisticsInfo,
                    'jedate': jedate
                },
                mounted: function () {
                    this.adminPackgeSearch();
                },
                methods: {
                    getFromVal: function (val) {
                        this.from = val;
                    },
                    getToVal: function (val) {
                        this.to = val;
                        if (new Date(this.from).getTime() - new Date(this.to).getTime() > 0) {
                            $.msg.alert('结束日期要大于开始日期');
                        }
                    },
                    //切换select
                    setSelect: function (event, type, index, id) {
                        switch (type) {
                            case 'status':
                                this.selectStatus.lg = $(event.target).html();
                                this.selectStatus.index = index;
                                this.status = id;
                                break;
                        }
                    },
                    //显示物流信息
                    showShippingInfo: function (event, trackingNo) {
                        this.logisticsInfo.status = true;
                        this.$refs.logisticsinfo.getPackageTrackingInfo(trackingNo, 'admin', 'sellers');
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
                                that.adminPackgeSearch();
                            }
                        });
                    },
                    //获取包裹列表
                    adminPackgeSearch: function () {
                        var that = this;
                        if (new Date(this.from).getTime() - new Date(this.to).getTime() > 0) return;
                        Api.set({
                            key: 'adminPackgeSearch',
                            type: 'GET',
                            isToken: false,
                            accountType: 'admin',
                            data: this.getFilter()
                        }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.list = data.result.dataList;
                                    that.pager(data.result.totalPages, data.result.totalCounts);
                                }
                            }
                        });
                    },
                    //获取所有筛选条件
                    getFilter: function () {
                        var filter = {
                            isId: $('.ISAccount').val(),
                            sellerEbayId: $('.sellerID').val(),
                            buyerEbayId: $('.buyerID').val(),
                            transactionId: $('.TXNID').val(),
                            itemId: $('.itemID').val(),
                            superTrackingCode: $('.superTrackingCode').val(),
                            status: this.status,
                            // sendDate: this.sendDate,
                            sendStartDate: this.from.replace(/-/ig, ''),
                            sendEndDate: this.to.replace(/-/ig, ''),
                            pageNo: this.pagerObj.current,
                            pageSize: this.pagerObj.pagesize
                        };
                        return filter;
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})