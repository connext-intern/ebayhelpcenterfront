// 打印偏好 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.createComponent(); });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    erroMsg: '', // 错误信息
                    item: {
                        itemId: false,
                        skuNo: false,
                        nameZh: false,
                        nameEn: false,
                        quantity: false,
                        sellerId: false,
                        buyerId: false,
                        property: false
                    }
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        Global.fun.updataCrumbs([{ lg: 'preferences', link: 'preferencesOrderSource' }, { lg: 'printPreferences' }]);
                        if(Global.option.user.userType==Api.getData.getUser.userType()[0]){
                            Global.fun.menuVue.hignlight = { index: 0, subIndex: 2 };
                        }else{
                            Global.fun.menuVue.hignlight = { index: 0, subIndex: 3 };
                        }
                        this.init_event();
                        this.getPrintPreference();

                    },
                    init_event: that.init_event,
                    setTableWidth: that.setTableWidth,
                    getPrintPreference: that.getPrintPreference, //获取已设置的打印偏好
                    updatetPrintPreference: that.updatetPrintPreference //更新打印偏好
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        init_event: function () {
            var _this = this;
            new $.checkBox($('.checkBox'), function (_answear) {
                var key = $(this).attr('data-key');
                _this.item[key] = $(this).hasClass('cur');
                _this.setTableWidth();
            });
        },
        setTableWidth: function () {
            var _this = this;
            var _total = 0;
            var _hasName = false;
            var lineArr = [13, 15, 20, 20, 9, 19];
            $.each(_this.item, function (k, v) {
                switch (k) {
                    case 'itemId':
                        if (v) _total += 13;
                        break;
                    case 'skuNo':
                        if (v) _total += 15;
                        break;
                    case 'property':
                        if (v) _total += 19;
                        break;
                    case 'quantity':
                        if (v) _total += 9;
                        break;
                    case 'nameZh':
                        if (v) _total += 20;
                        break;
                    case 'nameEn':
                        if (v) _total += 20;
                        break;
                }
            });

            for (var i = 0; i < lineArr.length; i++) {
                var _per = lineArr[i] / _total;
                _per = _per * 375;
                $('.line' + (i + 1)).css('width', _per + 'px');
            }
        },
        getPrintPreference: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'getPrintPreference', type: 'GET', isToken: false, data: {} }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.item = data.result || _this.item;
                        _this.setTableWidth();
                    }
                }
            });
        },
        updatetPrintPreference: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'updatetPrintPreference', type: 'PUT', isToken: false, data: _this.item }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        $.msg.alertLan('operator');
                    }
                }
            });
        }
    };
});