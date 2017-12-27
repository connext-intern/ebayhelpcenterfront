/**
 * 物流服务信息描述 add by gena
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 5, subIndex: '' };
            // 初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    item: null,
                    sysId: Global.option.urlParam.id
                },
                mounted: function () {
                    this.transportDetilGet();
                    
                },
                methods: {
                    transportDetilGet: function () { // admin物流产品详情
                        var _this = this;
                        var _stauts = Api.getData.getCode();
                        Api.set({ key: 'transportDetilGet', type: 'GET', accountType: 'admin', isToken: false, data: { sysId: _this.sysId } }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    _this.item = data.result;
                                }
                            }
                        });
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})