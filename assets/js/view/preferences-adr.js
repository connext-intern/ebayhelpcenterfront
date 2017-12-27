/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data', '/build/controls/pop-prefer-address/pop-prefer-address.js', '/build/controls/pop-prefer-address-return/pop-prefer-address-return.js'], function (Api, Global, Data, PreferencesAddress, PreferencesAddressReturn) {
    return {
        initialize: function () {
            var that = this;
            //根据账号类型初始化页面模块
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            //初始化面包屑
            if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 1 };
            } 
            else if(Global.option.isSandBox){
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 0 };
            }
            else {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 1 };
            }
            Global.fun.updataCrumbs([{ lg: 'preferences', link: 'preferencesOrderSource' }, { lg: 'addressManagement' }]);
            //获取地址类型
            var addressType = Api.getData.getAddressType();
            //初始化VUE
            that.vue = new Vue({
                el: '.page-wrapper',
                data: {
                    addressType: addressType,//获取所有地址类型
                    screenTab: addressType.send,
                    adrListData: [],
                    popAdrOperator: '',
                    popAdrItem: {},
                    popReturnItem: {}
                },
                mounted: function () {
                    this.init();
                },
                components: {
                    'preferences-address': PreferencesAddress,
                    'preferences-address-return': PreferencesAddressReturn
                },
                methods: {
                    init: function () {
                        //获取数据
                        that.getListData(this.screenTab);
                    },
                    clickTab: function (_str) {
                        if (this.screenTab != _str) that.getListData(_str);
                    },
                    addAdrCall: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        this.popAdrOperator = { index: 0 };
                        that.showPop();
                    },
                    editAdrCall: function (_item, $event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        this.popAdrOperator = { index: 1 };
                        if (this.screenTab == this.addressType.send) {
                            this.popAdrItem = $.extend({}, _item); //Object.assign({}, _item);
                        } else {
                            this.popReturnItem = $.extend({}, _item); // Object.assign({}, _item);
                        }
                        that.showPop();
                    },
                    delAdrCall: function (_el, _item, _index) {
                        var _that = this;
                        var el = _el.target;
                        if ($(el).hasClass('disabled')) return false;
                        $.msg.confirmLan('confirm-delete2', callback);
                        function callback() {
                            //请求API
                            var _stauts = Api.getData.getCode();
                            var _data = {
                                addressId: _item.id
                            }
                            Api.set({ key: 'deleteAddress', isToken: false, data: _data }, {
                                success: function (data, params) {
                                    if (data.code == _stauts.success) {
                                        //that.adrListData.splice(_index,1);
                                        that.getListData(_that.screenTab);
                                    }
                                }
                            });
                        }
                    },
                    setDftCall: function (_el, _item, _index) {
                        var _that = this;
                        var el = _el.target;
                        if ($(el).hasClass('disabled')) return false;
                        //请求API
                        var _stauts = Api.getData.getCode();
                        var _data = {
                            addressId: _item.id
                        }
                        Api.set({ key: 'setDefaultAddress', type: 'PUT', isToken: false, locked: el, loading: el, data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    //that.adrListData[_index].isDefault=true;
                                    that.getListData(_that.screenTab);
                                }
                            }
                        });
                    },
                    popSaveCallback: function (val) {
                        if (val == 'addSendAdr' || val == 'addReturnAdr') {
                            //alert('添加地址成功');
                        }
                        if (val == 'editSendAdr' || val == 'editReturnAdr') {
                            //alert('编辑地址成功');
                        }
                        that.getListData(this.screenTab);
                        $('.popup.prefer-addAdr').hide();
                        $('.popup.prefer-addAdr-return').hide();
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.wrapper');
                }
            });
        },
        showPop: function () {
            if (this.vue.screenTab == this.vue.addressType.send) {
                $('.popup.prefer-addAdr').show();
            } else {
                $('.popup.prefer-addAdr-return').show();
            }
        },
        getListData: function (_type) {
            var that = this;
            var _stauts = Api.getData.getCode();
            var _data = {
                type: _type
            }
            Api.set({ key: 'getAddresses', type: 'GET', isToken: false, data: _data }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        var _cLength = that.vue.adrListData.length;
                        for (var c = 0; c < _cLength; c++) {
                            that.vue.adrListData.shift();
                        }
                        for (var i = 0; i < data.result.length; i++) {
                            that.vue.adrListData.push(data.result[i]);
                        }
                        that.vue.screenTab = _type;
                    }
                }
            });
        }
    };
})