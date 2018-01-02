// 获取物流产品
define(['api', 'global', 'data',
    'text!/build/controls/pop-logistics-info/pop-logistics-info.html'
], function (Api, Global, Data, html) {
    return {
        template: html,
        data: function () {
            return {
                logisticsInfo: null//记录物流信息
            };
        },
        methods: {
            close: function () {// 关闭当前窗口
                this.$emit('close');
            },
            getPackageTrackingInfo: function (trackingNo, accountType, urlType) {
                var that = this;
                if(accountType=='admin'){
                    Api.set({ key: 'adminPackageTracking', isToken: false, type: 'GET', accountType: accountType ? accountType : '', data: { trackingCode: trackingNo } }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.logisticsInfo = data.result;
                            }
                        }
                    });
                }else{
                    Api.set({ key: 'getPackageTrackingInfo', isToken: false, type: 'GET', accountType: accountType ? accountType : '', urlType: urlType, data: { trackingNo: trackingNo } }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                that.logisticsInfo = data.result;
                            }
                        }
                    });
                }
                
            }
        },
        updated: function () { Global.fun.updataLanguage('.popup.logistics-info-list'); },
        mounted: function () { }
    };
});