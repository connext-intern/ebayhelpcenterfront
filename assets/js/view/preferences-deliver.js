/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data', '/build/controls/pop-prefer-deliver/pop-prefer-deliver.js'], function (Api, Global, Data, PreferencesDeliver) {
    return {
        initialize: function () {
            var that = this;
            //根据账号类型初始化页面模块
            Global.fun.startLoadHtml(function () {
                that.run();
            });
        },
        run: function () {
            var that = this;
            //初始化面包屑
            if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                Global.fun.menuVue.hignlight = {
                    index: 0,
                    subIndex: 3
                };
            } else if (Global.option.isSandBox) {
                Global.fun.menuVue.hignlight = {
                    index: 0,
                    subIndex: 1
                };
            } else {
                Global.fun.menuVue.hignlight = {
                    index: 0,
                    subIndex: 4
                };
            }
            Global.fun.updataCrumbs([{
                lg: 'preferences',
                link: 'preferencesOrderSource'
            }, {
                lg: 'shippingPreferences'
            }]);
            //初始化VUE
            that.vue = new Vue({
                el: '.page-wrapper',
                data: {
                    deliverListData: [],
                    popAdrOperator: '',
                    popAdrItem: {}
                },
                components: {
                    'preferences-deliver': PreferencesDeliver
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        //获取列表数据
                        that.getDeliver();
                    },
                    addDeliverCall: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        this.popAdrOperator = {
                            index: 0
                        };
                        that.showDeliverPop();
                    },
                    editDeliverCall: function (_item, $event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        this.popAdrOperator = {
                            index: 1
                        };
                        this.popAdrItem = $.extend({}, _item); //Object.assign({}, _item);
                        that.showDeliverPop();
                    },
                    delDeliverCall: function (_el, _item, _index) {
                        var _that = this;
                        var el = _el.target;
                        if ($(el).hasClass('disabled')) return false;
                        $.msg.confirmLan('confirm-delete', callback);

                        function callback() {
                            //请求API
                            var _stauts = Api.getData.getCode();
                            var _data = {
                                preferenceId: _item.id
                            }
                            Api.set({
                                key: 'deleteDeliveryPreference',
                                isToken: false,
                                data: _data
                            }, {
                                success: function (data, params) {
                                    if (data.code == _stauts.success) {
                                        that.getDeliver();
                                        //that.deliverListData.splice(_index,1);
                                    }
                                }
                            });
                        }
                    },
                    dev_updateDefault: function (_id, _dft) {
                        var _that = this;
                        //请求API
                        var _stauts = Api.getData.getCode();
                        var _data = {
                            preferenceId: _id,
                            defaultAddress: _dft
                        }
                        Api.set({
                            key: 'updateDefault',
                            type: 'PUT',
                            isToken: false,
                            data: _data
                        }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    that.getDeliver();
                                }
                            }
                        });
                    },
                    popCloseCallback: function (val) {
                        //console.log('@popCloseCallback-val='+val)
                        $('.popup.prefer-deliver').hide();
                        that.getDeliver();
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.wrapper');
                }
            });
        },
        showDeliverPop: function () {
            $('.popup.prefer-deliver').show();
        },
        getDeliver: function () {
            var that = this;
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'getDeliveryPreferences',
                type: 'GET',
                isToken: false
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        that.vue.deliverListData = data.result;

                        $.each(data.result, function (index, v) {
                            var _index;
                            for (var i = 0; i < Data.preferences.select.deliverType.length; i++) {
                                var _value = Data.preferences.select.deliverType[i];
                                if (v.type == _value.id) _index = i;
                            }
                            that.vue.deliverListData[index].typeLg = Data.preferences.select.deliverType[_index].lg;
                            if (that.vue.deliverListData[index].address != null) {
                                for (var i = 0; i < Data.preferences.select.pickupTime.length; i++) {
                                    if (Data.preferences.select.pickupTime[i].code == v.pickupTime) {
                                        that.vue.deliverListData[index].pickupTimeName = Data.preferences.select.pickupTime[i].name;
                                    }
                                }
                            }
                        })
                    }
                }
            });
        }
    };
})