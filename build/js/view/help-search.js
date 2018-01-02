// 帮助中心 add by gena
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
                el: ".help-center",
                data: {
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                    }
                },
                updated: function () { Global.fun.updataLanguage('.help-center'); }
            });
        },
        init_event: function () {
            var _this = this;
        }
    };
});