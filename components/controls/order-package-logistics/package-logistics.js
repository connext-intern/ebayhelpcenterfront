define(['api', 'global', 'data',
    'text!/build/controls/order-package-logistics/package-logistics.html',
    '/build/controls/pop-redeliver-confirm/pop-redeliver-confirm.js',
    '/build/controls/pop-logistics-info/pop-logistics-info.js'
], function (Api, Global, Data, html, redeliverConfirm, logisticsInfo) {
    return {
        template: html,
        props: ['resource'],
        data: function () {
            return {
                isSandBox: Global.option.isSandBox,
                isUnVeri: Global.option.user.verifyState == Api.getData.getUser.verifyState()[1],
                isloading: true,
                language: Global.option.language,
                pageList: { dataList: [] },
                statusData: Data.order.status.package,//所有包裹状态信息
                redeliverConfirm: { status: false, packageId: null },//储存重新发货的confirm弹层信息
                logisticsInfo: { status: false },//储存物流详情的弹层信息
                isBattery: Data.preferences.select.trueFalse,//储存
                type: '',//页面类型
                operator: 0 // 1申请物流单号 2删除 3重新发货 4取消交运 5恢复 6清空 7交运
            }
        },
        components: {
            'pop-redeliver-confirm': redeliverConfirm,
            'pop-logistics-info': logisticsInfo
        },
        mounted: function () {
            if (this.isSandBox) this.isUnVeri = true;
            this.setMenuNum();
            this.init();
        },
        updated: function () {
            Global.fun.updataLanguage('.package-logistics');
        },
        methods: {
            setMenuNum: function () {
                var that = this;
                //更新包裹统计数据
                Api.set({ key: 'getAllPackageStatistics', type: 'GET', isToken: false }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            var packageNumber = data.result;
                            Global.fun.menuVue.updataPageNum(packageNumber.pending, packageNumber.pendingPickup, packageNumber.delivered, packageNumber.exception, packageNumber.deleted);
                        }
                    }
                });
            },
            init: function () {
                var that = this;
                // that.setMenuNum();
            },
            //初始化包裹类型
            getType: function (type) {
                this.type = type;
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
            //重新发货弹层
            showRedeliver: function (event, packageId) {
                this.redeliverConfirm.status = true;
                this.redeliverConfirm.packageId = packageId;
            },
            //删除包裹
            deletePackages: function (event, packageIds, type, callback) {
                var that = this;
                $.msg.confirmLan('confirm-delete1', $.proxy(tempcallback, that));
                function tempcallback() {
                    packageIds = packageIds ? packageIds : this.getPackageIds();
                    Api.set({ key: 'deletePackages', locked: event ? event.target : null, data: { packageIds: packageIds } }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.operator = 2;
                                // if (type) {
                                //     // 批量删除
                                //     if (callback) callback();
                                // } else {
                                that.getPackage();
                                // }
                            }
                        }
                    });
                }
            },
            //开始重新发货
            savereDeliver: function (packageId) {
                var that = this;
                Api.set({ key: 'reship', isToken: false, data: { packageId: packageId } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.redeliverConfirm.status = false;
                            that.operator = 3;
                            that.getPackage();
                        }
                    }
                });
            },
            //打印页单
            printPackage: function (event, packageIds, selectId, packageIndex) {
                this.pageList.dataList[packageIndex].printSelect.lg = $(event.target).attr('lg');
                this.pageList.dataList[packageIndex].printSelect.cur = selectId;
                if (selectId.length > 0) {
                    this.$emit('showprint', packageIds, selectId);
                }

            },
            //显示物流信息
            showShippingInfo: function (event, trackingNo) {
                this.logisticsInfo.status = true;
                this.$refs.logisticsinfo.getPackageTrackingInfo(trackingNo);
            },
            //取消包裹
            cancelPackage: function (event, packageId) {
                var that = this;
                Api.set({ key: 'cancelPackage', locked: event.target, data: { packageId: packageId } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            that.operator = 4;
                            that.getPackage();
                        }
                    }
                });
            },
            //获取包裹数据和统计数据
            getPackage: function (callback) {
                var that = this;
                that.isloading = true;
                //获取包裹数据
                this.$emit('filter', function (data) {
                    if (Global.option.urlParam.id) {
                        data.packageId = Global.option.urlParam.id;
                    }
                    Api.set({ key: 'getPackages', type: 'GET', data: data, isToken: false }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.isloading = false;
                                for (var i = 0; i < data.result.dataList.length; i++) {
                                    data.result.dataList[i].printSelect = { data: Data.order.select.peintSheet, lg: 'peintSheet', cur: -1 };
                                    data.result.dataList[i].isCheck = 0;
                                }
                                that.pageList = data.result;
                                if (callback && typeof callback === 'function') callback.call(data.result);
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
                if (that.resource == 1) { // 待取件
                    switch (that.operator) {
                        case 3: // 重新发货
                            that.setMenuNum();
                            that.getDeliveryStatistics(data);
                            break;
                        case 2: // 删除
                            that.setMenuNum();
                            that.getDeliveryStatistics(data);
                            break;
                        case 4: // 取消交运
                            that.setMenuNum();
                            that.getDeliveryStatistics(data);
                            break;
                        default:
                            // that.getDeliveryStatistics(data);
                            break;
                    }
                }
                else if (that.resource == 2) { // 物流查询
                    switch (that.operator) {
                        case 3: // 重新发货
                            that.setMenuNum();
                            that.getPackageStatistics(data);
                            break;
                        case 4: // 取消交运
                            that.getPackageStatistics(data);
                            break;
                        default:
                            that.getPackageStatistics(data);
                            break;
                    }
                }
            },
            getDeliveryStatistics: function () {
                var that = this;
                this.$emit('filter', function (_filter) {
                    Api.set({ key: 'getDeliveryStatistics', type: 'GET', isToken: false, data: _filter }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.$emit('updatestatus', data.result);
                            }
                        }
                    });
                });
            },
            getPackageStatistics: function (data) {
                var that = this;
                var statisticsData = $.extend({}, data, { status: that.statusData.toBeReceived });
                if (that.type === 'deliveryInquire') statisticsData.status = that.statusData.ReceiveConfirmation;
                //更新包裹统计数据
                Api.set({ key: 'getPackageStatistics', type: 'GET', isToken: false, data: statisticsData }, {
                    success: function (res, params) {
                        if (res.code == Api.getData.getCode().success) {
                            that.$emit('packagenumber', res.result);
                        }
                    }
                });
            },
            getDeliver: function () {
                var that = this;
                var _stauts = Api.getData.getCode();
                Api.set({ key: 'getDeliveryPreferences', type: 'GET', isToken: false }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            console.log(data);
                        }
                    }
                });
            },
            /****************************************************************************/
            getPackageIds: function () {
                var arr = [];
                for (var i = 0; i < this.pageList.dataList.length; i++) {
                    if (this.pageList.dataList[i].isCheck) arr.push(this.pageList.dataList[i].packageId);
                }
                return arr;
            }
        }
    };
});