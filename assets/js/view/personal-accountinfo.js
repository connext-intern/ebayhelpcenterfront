
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        initialize: function () {
            var that = this;
            that.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    user: Global.option.user,//用户信息
                    subAccount: Api.getData.getUser.userType()[0],//子账号信息
                    verifyState: Global.fun.getUserIndex.verifyState(),//对应状态索引值,0|1|2
                    verifyType: Global.fun.getUserIndex.verifyType(),//对应状态索引值,0|1
                    batteryvail: Global.option.user.batteryVerifyState,
                    batteryvailState: Api.getData.getUser.batteryState(),
                    batteryvailStates: Data.personal.batteryState
                },
                methods: {
                    dev_getSsoUrl: Global.fun.dev_getSsoUrl
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () {
                        that.run();
                    });
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        run: function () {
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'personalCenter', link: 'accountInfo' }, { lg: 'accountInfo' }]);
        }
    };
})