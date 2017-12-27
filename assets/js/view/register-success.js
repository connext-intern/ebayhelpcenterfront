/**
 *robin/20170813, register
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        emailHash: Data.emailHash,
        initialize: function () {
            var that = this;
            that.vue = new Vue({
                el: '.main',
                data: {
                    erroMsg: '',
                    email: Global.option.urlParam.email
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () { that.run(); });
                },
                methods: {
                }
            });
        },
        run: function () {
            var that = this;
            //绑定事件
            this.event();
        },
        event: function () {
            var that = this;
            $('.registerGuild .jumpToMailBtn').bind('click', function () {
                if (!that.vue.email) return;
                that.vue.email = decodeURIComponent(that.vue.email);
                var url = that.vue.email.split('@')[1];
                if (url in that.emailHash) {
                    Global.fun.redirect(that.emailHash[url]);
                } else {
                    window.open('about:blank', '_blank');
                }
            });
        }
    };
})