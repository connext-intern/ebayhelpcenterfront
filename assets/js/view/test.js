/**
 *louis/20170803, testpage
 */
define(['api', 'global'], function (Api, Global) {
    return {
        initialize: function () {
            var that = this;
            this.vue = new Vue({
                el: ".wrapper",
                data: {
                    user: Global.option.user
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () { that.run(); });
                    // $.loadHtml.start('body', function(){that.run();});
                },
                methods: {
                    uploadForm: function (event) {
                        $.upload({
                            target: '#uploadForm',
                            url: Api.getData.getApiUrl('importSKU'),
                            token: Global.option.token,
                            callback: function () {
                                $.msg.alert('上传成功')
                            }
                        });
                        // var formData = new FormData($( "#uploadForm" )[0]);
                        // Api.set({ key: 'importSKU', other:{processData:false}, data: formData}, {
                        //     success: function (data, params) {
                        //         if (data.code == Api.getData.getCode().success) {
                        //             alert('上传成功')
                        //         }
                        //     }
                        // });
                    }
                }
            });
        },
        run: function () {
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 't8', link: 'login' }, { lg: 't9' }]);
            console.log(this.vue.user);
            //获取用户类型
            console.log(Global.fun.getUserIndex.userType());
            //Global.fun.getUserIndex.verifyState()
            //Global.fun.getUserIndex.verifyType()
            //Global.fun.headerVue.verifyState=2;
            //setTimeout(function(){Global.fun.updataLanguage('header');},100);
            this.event();
        },
        event: function () {
            $(".js-cn").bind('click', function () { Global.fun.changeLanguage('zh-cn'); });
            $(".js-en").bind('click', function () { Global.fun.changeLanguage('en-us'); });
            $(".js-hk").bind('click', function () { Global.fun.changeLanguage('zh-hk'); });
        }
    };
})