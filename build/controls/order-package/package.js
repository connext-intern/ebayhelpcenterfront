define(['api', 'global', 'data',
    'text!/build/controls/order-package/package.html',
    '/build/controls/order-history-shipping/order-history-shipping.js'
], function (Api, Global, Data, html, OrderHistoryShipping) {
    return {
        template: html,
        props: ['resource'],
        data: function () {
            return {
                isSandBox: Global.option.isSandBox,
                isloading: true,
                popDeliver: {
                    status: 0,
                    success: 0,
                    failed: 0,
                    isSuccess: false,
                    isNeedBatteryAuth: false,
                    message: 0
                },
                isUnVeri: Global.option.user.verifyState == Api.getData.getUser.verifyState()[1],
                language: Global.option.language,
                pageList: { dataList: [] },
                statusData: Data.order.status.package,//所有包裹状态信息
                payStatus: Data.order.status.pay,//所有支付状态信息
                shipStatus: Data.order.status.ship,//所有发货状态信息
                type: '',//页面类型
                history: { status: false, transitionEntity: null }, //
                isMutiPackage: false,
                operator: 0 // 1申请物流单号 2删除 3重新发货 4取消交运 5恢复 6清空 7交运
            }
        },
        components: {
            'order-history-shipping': OrderHistoryShipping
        },
        mounted: function () {
            if (this.isSandBox) this.isUnVeri = true;
            this.setMenuNum();
            this.init();
        },
        updated: function () {
            Global.fun.updataLanguage('.package');
            Global.fun.replaceHref('.package');
        },
        methods: {
            dispaPage: function (type, package) {
                if (type !== 'all') return;
                switch (package.status) {
                    case this.statusData.packageInfoLack:
                    case this.statusData.noUsefulShipping:
                    case this.statusData.selectedShipping:
                    case this.statusData.appliedTrackingCode:
                    case this.statusData.toBeShipped:
                        location.href = Api.getData.getPageUrl('pendingOrder') + '?id=' + package.packageId
                        break;
                    case this.statusData.toBeReceived:
                        location.href = Api.getData.getPageUrl('waitingPickedUpOrder') + '?id=' + package.packageId
                        break;
                    case this.statusData.onShipping:
                    case this.statusData.delivered:
                        location.href = Api.getData.getPageUrl('deliveryInquireOrder') + '?id=' + package.packageId
                        break;
                    case this.statusData.declaredFailed:
                        location.href = Api.getData.getPageUrl('packageError') + '?id=' + package.packageId
                        break;
                    case this.statusData.deleted:
                        location.href = Api.getData.getPageUrl('deletedOrder') + '?id=' + package.packageId
                        break;
                }
            },
            init: function () {
                var that = this;
                // that.setMenuNum();
            },
            setMenuNum: function () {
                var that = this;
                if (that.type != 'all') {
                    //更新包裹统计数据
                    Api.set({ key: 'getAllPackageStatistics', type: 'GET', isToken: false }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                var packageNumber = data.result;
                                Global.fun.menuVue.updataPageNum(packageNumber.pending, packageNumber.pendingPickup, packageNumber.delivered, packageNumber.exception, packageNumber.deleted);
                            }
                        }
                    });
                }
            },
            dev_getSsoUrl: function(_str){
                Global.fun.dev_getSsoUrl(_str);
            },
            //初始化包裹类型
            getType: function (type) {
                this.type = type;
            },
            hisLogisticsNumberEvent: function (event, trackingRecords) {
                this.history.transitionEntity = trackingRecords;
                this.history.status = true;
                var selfTarget = $('.ui-tooltip-container');
                var target = event.target || event.srcElement;
                var _left = $(target).offset().left;
                var _top = $(target).offset().top;
                var _width = $(target).outerWidth(true);
                var _height = $(target).outerHeight(true);
                console.log(_left, _top);
                $('.ui-tooltip-container').css({ 'left': 342 + 'px', 'top': (_top + _height + 10) - 50 + 'px' });
            },
            //checkbox运算
            setCheckBox: function (event, packageIndex) {
                var flag = $(event.target).hasClass('cur');
                this.pageList.dataList[packageIndex].isCheck = !flag;
            },
            //全选
            allCheckBox: function (flag) {
                for (var i = 0; i < this.pageList.dataList.length; i++) {
                    this.pageList.dataList[i].isCheck = flag;
                }
            },
            //显示备注弹层
            showRemark: function (packageId, version, remark) {
                this.$emit('showremark', packageId, version, remark);
            },
            //打印页单
            printPackage: function (event, packageIds, selectId, packageIndex) {
                this.pageList.dataList[packageIndex].printSelect.lg = $(event.target).attr('lg');
                this.pageList.dataList[packageIndex].printSelect.cur = selectId;
                this.$emit('showprint', packageIds, selectId);
            },
            //运行物流规则
            getAvailableProduct: function (event, packageIds, index, status, type, callback) {
                var that = this;
                packageIds = packageIds ? packageIds : this.getPackageIds();
                Api.set({ key: 'getAvailableProduct', type: 'POST', isToken: false, locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                    success: function (data, params) {
                        $.msg.alert(data.message);
                        if (data.code == Api.getData.getCode().success) {
                            if (type) {//批量运行物流规则
                                that.getPackage();
                                if (callback) callback(data.result);
                            } else {
                                if (status == that.statusData.selectedShipping) {
                                    that.getPackage();
                                    // that.pageList.dataList[index].availableProductList = data.result;
                                } else {
                                    that.getPackage();
                                }
                            }
                        }
                    }
                });
            },
            //单个选择物流产品
            singlePackageSelectProduct: function (event, packageId, sysId, version) {
                var that = this;
                Api.set({ key: 'singlePackageSelectProduct', isToken: false, data: { packageId: packageId, sysId: sysId, version: version } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.getPackage();
                        }
                    }
                });
            },
            //选择物流产品
            selectProduct: function (event, packageIds, productId, type, callback) {
                if (event) { $(event.target).parents('.selectBox').find('.selectVal').html($(event.target).text()); }
                var that = this;
                packageIds = packageIds ? packageIds : this.getPackageIds();
                Api.set({ key: 'selectProduct', isToken: false, data: { packageIds: packageIds, productId: productId } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.getPackage();
                            if (type) {//批量选择物流产品
                                if (callback) callback(data.result);
                            }
                        }
                    }
                });
            },
            //申请物流单号
            applyTrackingNo: function (event, packageIds, callback) {
                var that = this;
                packageIds = packageIds ? packageIds : this.getPackageIds();
                Api.set({ key: 'applyTrackingNo', isToken: false, locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            if (callback) callback();
                            that.operator = 1;
                            that.getPackage();
                        }
                    }
                });
            },
            //交运
            deliveryPackages: function (event, packageIds, callback) {
                var that = this;
                packageIds = packageIds ? packageIds : this.getPackageIds();
                that.isMutiPackage = packageIds.length > 1;
                Api.set({ key: 'deliveryPackages', locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                    success: function (data, params) {
                        that.operator = 7;
                        // if (data.code == Api.getData.getCode().success) {
                        if (callback) callback();
                        that.getPackage(function (_result) {

                        });
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
                        // }
                    }
                });
            },
            //交运方式
            deliveryMethod: function (packageIds, preferenceId, callback) {
                var that = this;
                packageIds = packageIds ? packageIds : this.getPackageIds();
                Api.set({ key: 'selectDeliveryPreference', data: { packageIds: packageIds, preferenceId: preferenceId } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            if (callback) callback(data&&data.message);
                            that.getPackage();
                        }
                    }
                });
            },
            //取消包裹
            cancelPackage: function (event, packageId) {
                var that = this;
                Api.set({ key: 'cancelPackage', isToken: false, locked: event.target, data: { packageId: packageId } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.getPackage();
                        }
                    }
                });
            },
            //删除包裹
            deletePackages: function (event, packageIds, type, callback) {
                var that = this;
                $.msg.confirmLan('confirm-delete', $.proxy(tempcallback, that));
                function tempcallback() {
                    packageIds = packageIds ? packageIds : this.getPackageIds();
                    Api.set({ key: 'deletePackages', locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.operator = 2;
                                if (type) {
                                    // 批量删除
                                    if (callback) callback();
                                } else {
                                    that.getPackage();
                                }
                            }
                        }
                    });
                }
            },
            //恢复
            restorePackages: function (event, packageIds, type, callback) {
                var that = this;
                $.msg.confirmLan('confirm-resore', $.proxy(callback, that));
                function callback() {
                    packageIds = packageIds ? packageIds : this.getPackageIds();
                    Api.set({ key: 'restorePackages', isToken: false, locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.operator = 5;
                                if (type) {
                                    // 批量恢复
                                    if (callback) callback();
                                } else {
                                    that.getPackage();
                                }
                            }
                        }
                    });
                }
            },
            //清空
            clearPackages: function (event, packageIds, type, callback) {
                var that = this;
                Api.set({ key: 'clearPackages', isToken: false, locked: event ? event.target : null }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.operator = 6;
                            if (type) {
                                // 批量清空
                                if (callback) callback();
                            } else {
                                that.getPackage();
                            }
                        }
                    }
                });
            },
            getJson: function (str) {
                try {
                    return !!str ? JSON.parse(str) : {};
                } catch (error) {
                    return {}
                }
            },
            //获取包裹数据和统计数据
            getPackage: function (_callback) {
                var that = this;
                that.isloading = true;
                //获取包裹数据
                this.$emit('filter', function (data) {
                    if (that.type == 'all') { // 全部订单
                        data.status = 'ALL';
                    }
                    if (Global.option.urlParam.id) {
                        data.packageId = Global.option.urlParam.id;
                    }
                    Api.set({ key: 'getPackages', type: 'GET', data: data }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.isloading = false;
                                for (var i = 0; i < data.result.dataList.length; i++) {
                                    data.result.dataList[i].printSelect = { data: Data.order.select.peintSheet, lg: 'peintSheet', cur: -1 };
                                    data.result.dataList[i].isCheck = 0;
                                }
                                that.pageList = data.result;
                                //that.pageList.dataList=[];
                                that.$emit('pager', data.result.totalPages, data.result.totalCounts);
                            }
                        }
                    });
                    that.setOperator(data);
                });
            },
            setOperator: function (data) {
                var that = this;
                if (that.resource == 1) { // 待处理页面
                    switch (that.operator) {
                        case 1: // 申请物流单号
                            that.getPackageStatistics(data);
                            break;
                        case 2: // 删除
                            that.setMenuNum();
                            that.getPackageStatistics(data);
                            break;
                        case 5: // 恢复
                            that.setMenuNum();
                            break;
                        case 7: // 交运
                            that.setMenuNum();
                            that.getPackageStatistics(data);
                            break;
                        default:
                            that.getPackageStatistics(data);
                            break;
                    }
                }
                else if (that.resource == 3) { // 已删除页面
                    switch (that.operator) {
                        case 6: // 清空
                            that.setMenuNum();
                            break;
                        case 5: // 恢复
                            that.setMenuNum();
                            break;
                        default:
                            that.setMenuNum();
                            break;
                    }
                }
            },
            getPackageStatistics: function (data) {
                var that = this;
                var statisticsData = $.extend({}, data, { status: that.statusData.pending });
                if (that.type == 'all') return;
                if (that.type == 'delete') statisticsData.status = that.statusData.deleted;
                //更新包裹统计数据
                Api.set({ key: 'getPackageStatistics', type: 'GET', isToken: false, data: statisticsData }, {
                    success: function (res, params) {
                        if (res.code == Api.getData.getCode().success) {
                            that.$emit('packagenumber', res.result);
                        }
                    }
                });
            },
            /****************************************************************************/
            getPackageIds: function () {
                var arr = [];
                for (var i = 0; i < this.pageList.dataList.length; i++) {
                    if (this.pageList.dataList[i].isCheck) { arr.push(this.pageList.dataList[i].packageId); }
                }
                return arr;
            }
        }
    };
});