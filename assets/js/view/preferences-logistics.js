/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data', '/build/controls/preferences-logistics/preferences-logistics.js'], function (Api, Global, Data, popLogistics) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 4 };
            } else {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 5 };
            }
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'preferences', link: 'preferencesOrderSource' }, { lg: 'logisticsPreferences' }]);
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    list: []//列表数据
                },
                components: { 'pop-logistics': popLogistics },
                mounted: function () {
                    that.load();
                },
                methods: {
                    showPopup: function () {
                        this.$refs.logistics.showPopup();
                    },
                    refreshCall: function () {
                        that.load();
                    },
                    //删除列表数据
                    deleteShippingPreference: function (event, preferenceId) {
                        $.msg.confirmLan('confirm-delete', callback);
                        function callback() {
                            Api.set({ key: 'deleteShippingPreference', isToken: false, locked: event.target, data: { preferenceId: preferenceId } }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) { that.load(); }
                                }
                            });
                        }
                    },
                    //调整列表顺序
                    adjustShippingPreferenceOrder: function (event, preferenceId, direction) {
                        Api.set({ key: 'adjustShippingPreferenceOrder', type: 'PUT', isToken: false, locked: event.target, data: { preferenceId: preferenceId, direction: direction } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) { that.load(); }
                            }
                        });
                    },
                    //编辑物流偏好
                    updateShippingPreference: function (event, index, preferencesId) {
                        var obj = {
                            preferencesId: preferencesId,
                            logsName: this.list[index].name,
                            productId: this.list[index].productId,
                            logsList: []
                        };
                        //储存所有信息
                        var itemCode = Data.preferences.select.logisticsItem;
                        // this.providerActive=that.fun.getIndex(this.list[index].productId,this.providerList);
                        if (this.list[index].conditions && this.list[index].conditions.length) {
                            for (var i = 0; i < this.list[index].conditions.length; i++) {
                                var itemIndex = that.fun.getIndex(this.list[index].conditions[i].item, Data.preferences.select.logisticsItem);
                                var symbolIndex = that.fun.getIndex(this.list[index].conditions[i].symbol, Data.preferences.select.symbol);
                                var _symbolList = that.fun.getSymbolIdArr(Data.preferences.select.logisticsItem[itemIndex].zid);
                                var symbolHiglightIndex = that.fun.getIndex(this.list[index].conditions[i].symbol, _symbolList);
                                var valueIndex = (Data.preferences.select.logisticsItem[itemIndex].id == itemCode[5].id || Data.preferences.select.logisticsItem[itemIndex].id == itemCode[3].id) ? this.list[index].conditions[i].value : '';
                                obj.logsList.push({
                                    logsLg: Data.preferences.select.logisticsItem[itemIndex].lg,
                                    symbolLg: Data.preferences.select.symbol[symbolIndex].lg,
                                    valueLg: valueIndex ? this.list[index].conditions[i].valueName : 0,
                                    logsHiglight: itemIndex,
                                    symbolHiglight: symbolHiglightIndex,
                                    valueHiglight: valueIndex,
                                    logsItem: Data.preferences.select.logisticsItem,
                                    symbolItem: that.fun.getSymbol(itemIndex),
                                    value: (Data.preferences.select.logisticsItem[itemIndex].id == itemCode[5].id || Data.preferences.select.logisticsItem[itemIndex].id == itemCode[3].id) ? null : this.list[index].conditions[i].value
                                });
                            };
                        }
                        this.$refs.logistics.editShippingPreference(obj, this.list[index].conditions);
                        //计算需要禁止掉的供应商产品
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        //加载列表
        load: function () {
            var that = this;
            var itemCode = Data.preferences.select.logisticsItem;
            Api.set({ key: 'getShippingPreferences', type: 'GET', isToken: false }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        if (data.result && data.result.length > 0) {
                            for (var i = 0; i < data.result.length; i++) {
                                var obj = { weight: '', price: '', country: '', freight: '', delivery: '' };
                                for (var j = 0; j < data.result[i].conditions.length; j++) {
                                    if (data.result[i].conditions[j].item == itemCode[1].id) {
                                        var str = obj.weight == '' ? '' : obj.weight + '，';
                                        obj.weight = str + that.fun.getSymbolLg(data.result[i].conditions[j].symbol) + ' ' + data.result[i].conditions[j].value;
                                        //obj.weight.push({lg:that.fun.getSymbolLg(data.result[i].conditions[j].symbol),val:data.result[i].conditions[j].value});
                                    }
                                    if (data.result[i].conditions[j].item == itemCode[2].id) {
                                        var str = obj.price == '' ? '' : obj.price + '，';
                                        obj.price = str + that.fun.getSymbolLg(data.result[i].conditions[j].symbol) + ' ' + data.result[i].conditions[j].value;
                                        //obj.price.push({lg:that.fun.getSymbolLg(data.result[i].conditions[j].symbol),val:data.result[i].conditions[j].value});
                                    }
                                    if (data.result[i].conditions[j].item == itemCode[3].id) {
                                        var str = obj.country == '' ? '' : obj.country + '，';
                                        obj.country = str + that.fun.getSymbolLg(data.result[i].conditions[j].symbol) + ' ' + data.result[i].conditions[j].valueName;
                                        //obj.country.push({lg:that.fun.getSymbolLg(data.result[i].conditions[j].symbol),val:data.result[i].conditions[j].value});
                                    }
                                    if (data.result[i].conditions[j].item == itemCode[4].id) {
                                        var str = obj.freight == '' ? '' : obj.freight + '，';
                                        obj.freight = str + that.fun.getSymbolLg(data.result[i].conditions[j].symbol) + ' ' + data.result[i].conditions[j].value;

                                        //obj.freight.push({lg:that.fun.getSymbolLg(data.result[i].conditions[j].symbol),val:data.result[i].conditions[j].value});
                                    }
                                    if (data.result[i].conditions[j].item == itemCode[5].id) {
                                        var str = obj.delivery == '' ? '' : obj.delivery + '，';
                                        obj.delivery = str + that.fun.getSymbolLg(data.result[i].conditions[j].symbol) + ' ' + data.result[i].conditions[j].valueName;
                                        //obj.delivery.push({lg:that.fun.getSymbolLg(data.result[i].conditions[j].symbol),val:data.result[i].conditions[j].value});
                                    }
                                }
                                data.result[i].shippingList = obj;
                            };
                            that.vue.list = data.result;
                        } else {
                            that.vue.list = [];
                        }
                    };
                }
            });
        },
        fun: {
            //获取交运方式Lg
            getDeliverType: function (str) {
                for (var i = 0; i < Data.preferences.select.deliverType.length; i++) {
                    if (str == Data.preferences.select.deliverType[i].id) {
                        return Data.preferences.select.deliverType[i].lg;
                    }
                }
                return '';
            },
            //条件项筛选比较符号
            getSymbol: function (index) {
                var _index = index || 0;
                var arr = Data.preferences.select.logisticsItem[_index].zid;
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    newArr.push(Data.preferences.select.symbol[arr[i]]);
                }
                return newArr;
            },
            //获取比较符号的语言
            getSymbolLg: function (str) {
                for (var i = 0; i < Data.preferences.select.symbol.length; i++) {
                    if (str == Data.preferences.select.symbol[i].id) {
                        return languages[Data.preferences.select.symbol[i].lg];
                    }
                }
                return '';
            },
            getIndex: function (id, list) {
                if (!list) return -1;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id) {
                        if (list[i].id == id) { return i; }
                    } else {
                        if (list[i] == id) { return i; }
                    }
                }
                return -1;
            },
            getSymbolIdArr: function (list) {
                var _arr = [];
                for (var i = 0; i < list.length; i++) {
                    for (var a = 0; a < Data.preferences.select.symbol.length; a++) {
                        if (list[i] == Data.preferences.select.symbol[a].zid) _arr.push(Data.preferences.select.symbol[a].id);
                    }
                }
                return _arr;
            }
        }
    };
})