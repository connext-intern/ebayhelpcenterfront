/**
 *louis/20170803, testpage
 */
define(['api', 'global'], function (Api, Global) {
    return {
        initialize: function () {
            var that = this;
            that.vue = new Vue({
                el: '.main',
                data: {
                    orderSource: ''
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () { that.run(); });
                    this.orderSource = Global.option.user.orderSource;
                }
            });
        },
        run: function () {
            var that = this;
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'preferences', link: 'preferencesOrderSource' }, { lg: 'orderSource' }]);
            Global.fun.menuVue.hignlight = { index: 0, subIndex: 0 };
            //初始化选择项
            var checkBoxHandle = new $.checkBox($(".checkBox"), function (_answear) {
                if (_answear[0] == '0') {
                    that.vue.orderSource = 'AUTO';
                } else {
                    that.vue.orderSource = 'API';
                }
            });
            //获取默认值
            //that.vue.orderSource = Global.option.user.orderSource;
            //绑定事件
            that.event();
        },
        event: function () {
            var that = this;
            $('.js-saveBtn').click(function () {
                that.setOrderSource(this);
            });
        },
        setOrderSource: function (el) {
            var that = this;
            var _stauts = Api.getData.getCode();
            var _data = {
                orderSource: that.vue.orderSource
            }
            if (Global.option.user.orderSource != that.vue.orderSource) {
                $.msg.confirmLan('oder-source-change', OrderSourceHandler);
                function OrderSourceHandler() {
                    Api.set({ key: 'setOrderSource', type: 'PUT', isToken: false, locked: el, data: _data }, {
                        success: function (data, params) {
                            if (data.code == _stauts.success) {
                                $.msg.alertLan('operator');
                            }
                        }
                    });
                }
            } else {
                $.msg.alertLan('operator');
            }
        }
    };
})