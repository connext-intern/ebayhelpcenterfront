/**
 * 数据导出 add by gena
 */
define(['api', 'global', 'data',
    '/build/controls/jeDate/jeDate.js'
], function (Api, Global, Data, jedate) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 4, subIndex: '' };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    from: '',
                    to: '',
                    dataType: { key: '', text: '- 请选择数据类型 -' },
                    dataTypes: Data.admin.select.dataTypes
                },
                mounted: function () {
                    this.init();
                },
                components: {
                    jedate: jedate
                },
                methods: {
                    init: function () {
                        var myDate = new Date(), _month1 = myDate.getMonth() + 1, _date1 = myDate.getDate();
                        _month1 = _month1 < 10 ? '0' + _month1 : _month1;
                        _date1 = _date1 < 10 ? '0' + _date1 : _date1;
                        var _to = myDate.getFullYear() + '-' + _month1 + '-' + _date1;
                        this.to = _to;

                        var _fromData = new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * 7), _month2 = _fromData.getMonth() + 1, _date2 = _fromData.getDate();;
                        _month2 = _month2 < 10 ? '0' + _month2 : _month2;
                        _date2 = _date2 < 10 ? '0' + _date2 : _date2;
                        var _from = _fromData.getFullYear() + '-' + _month2 + '-' + _date2;
                        this.from = _from;
                    },
                    getFromVal: function (val) {
                        this.from = val;
                    },
                    getToVal: function (val) {
                        this.to = val;
                    },
                    exportToCSV: function () {
                        var _this = this;
                        var params = {
                            dataType: _this.dataType.key,
                            startDate: _this.from.replace(/-/ig, ''),
                            endDate: _this.to.replace(/-/ig, '')
                        };
                        if (params.dataType.length <= 0) {
                            $.msg.alertLan('data-output-erro01');
                            return;
                        }
                        if (params.startDate.length <= 0 || params.endDate.length <= 0) {
                            $.msg.alertLan('data-output-erro02');
                            return;
                        }
                        $.msg.alertLan('getmail');
                        var _stauts = Api.getData.getCode();
                        Api.set({ key: 'dataExport', accountType: 'admin', data: params }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    // Global.fun.redirect(data.result, '_blank');
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