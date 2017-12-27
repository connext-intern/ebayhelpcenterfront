/**
 *louis/20170803, order
 */
define(['api', 'global', 'data', '/build/controls/order-package/package.js'], function (Api, Global, Data, packageList) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 5 };
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'orderManagement', link: 'pendingOrder' }, { lg: 'deleted' }]);
            //初始化分页
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isSelectAll: false,
                    isUnVeri: Global.option.user.verifyState == Api.getData.getUser.verifyState()[1],
                    status: Data.order.status.package.deleted,
                    statisticsNumber: { pending: 0, incomplete: 0, pendingSelect: 0, pendingApply: 0, pendingConfirm: 0, unavailableProduct: 0, pendingPickup: 0, delivered: 0, exception: 0, deleted: 0 },
                    pagerObj: { current: 1, pagesize: 10 },
                    curPackageId: null,//当前包裹id
                    openerRemark: 0,//显示备注弹层
                    remarkMessage: null,//处理卖家备注错误信息
                    select: {
                        sellersID: [{ ebayId: 'ALL', bindId: 'all' }]
                    },
                    selectLg: {
                        sellersIDLg: 'ALL'
                    },
                    selectHighlight: { sellersIDIndex: 0 },
                    selectId: { sellersID: null },
                    isShowFilter: false
                },
                components: { 'package-list': packageList },
                mounted: function () {
                    Global.fun.updataLanguage('.filter');
                    this.$refs.package.getType('delete');
                    //初始化包裹信息
                    this.updataPackage();
                    //初始化卖家ID信息
                    that.getEbayId();
                },
                methods: {
                    setSelect: function (event, type, index, id, lg) {
                        switch (type) {
                            case 'sellersID':
                                this.selectLg.sellersIDLg = $(event.target).html();
                                this.selectId.sellersID = id;
                                this.selectHighlight.sellersIDIndex = index;
                                break;
                        }
                    },
                    setInput: function (event, type, index) {
                        if (type = 'remark' && /\S/.test($(event.target).val)) {
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
                        // if ($(event.target).hasClass('cur')) {
                        //     $(event.target).removeClass('cur');
                        //     $('.filter').show();
                        // } else {
                        //     $(event.target).addClass('cur');
                        //     $('.filter').hide();
                        // }
                    },
                    //保存备注
                    saveRemark: function (event) {
                        var that = this;
                        var val = $('.popup.remark textarea').val();
                        if (!/\S/.test(val)) {
                            this.remarkMessage = 1;
                            return;
                        }
                        this.remarkMessage = 0;
                        Api.set({ key: 'addSellerRemark', isToken: false, locked: event.target, data: { packageId: this.curPackageId, sellerRemark: val } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.openerRemark = 0;
                                    that.updataPackage();
                                }
                            }
                        });
                        //this.curPackageId
                    },
                    //批量恢复包裹
                    restorePackages: function ($event) {
                        var _this = this;
                        if (!that.fun.checkBox()) { $.msg.alertLan('choose-package'); return false; }
                        this.$refs.package.restorePackages(null, null, null, null, 'batch', function () {
                            _this.allCheckBox(false);
                        });
                    },
                    //批量清空包裹
                    clearPackages: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        var that = this;
                        // if (!that.fun.checkBox()) { $.msg.alertLan('choose-package'); return false; }
                        $.msg.confirmLan('confirm-clear-package', callback);
                        function callback() {
                            that.allCheckBox(false);
                            that.$refs.package.clearPackages(null, null, null, null, 'batch', function () {
                                $('.footer-order .checkBox em').removeClass('cur');
                            });
                        }
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
                    //获取统计数据
                    packageNumber: function (packageNumber) {
                        this.statisticsNumber = packageNumber;
                        // Global.fun.menuVue.updataPageNum(packageNumber.pending, packageNumber.pendingPickup, packageNumber.delivered, packageNumber.exception, packageNumber.deleted);
                    },
                    //显示备注弹层
                    showRemark: function (packageId) {
                        this.openerRemark = 1;
                        this.curPackageId = packageId;
                    },
                    //更新package列表
                    updataPackage: function () {
                        this.$refs.package.getPackage();
                        this.allCheckBox(false);
                    },
                    setStatus: function (event, key) {
                        this.status = Data.order.status.package[key];
                        this.pagerObj.current = 1;
                        $(event.target).parents('li').addClass('cur').siblings('li').removeClass('cur');
                        this.updataPackage();
                    },
                    //获取所有筛选条件
                    getFilter: function (callback) {
                        var sellerEbayId = this.selectId.sellersID || '';
                        var filter = {
                            sellerEbayId: sellerEbayId, buyerEbayId: $('.filter .buyerID input').val(), orderId: $('.filter .transactionNumber input').val(), itemId: $('.filter .itemId input').val(),
                            skuNo: $('.filter .SKU input').val(),
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
            checkBox: function () {
                return $('.package .item-list .box .title .checkBox em.cur').length > 0;
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