/**
 *ffc /20170803, homepage
 */
define(['api','global'], function (Api,Global) {
    return {
        initialize: function () {
            $('.footer-development').addClass('footer-cur');
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function(){
            var that=this;
            that.vue=new Vue({
                el: '.page',
                data:  {
                    dItem:{}
                },
                mounted:function(){
                    this.init();
                },
                methods:{
                    init:function(){
                        this.dev_getDeveloperGuideDetail();
                    },
                    dev_getDeveloperGuideDetail:function(){
                        var that=this;
                        var _stauts = Api.getData.getCode();
                        var _data={};
                        _data.guideId=Global.option.urlParam["id"];
                        Api.set({ key: 'getDeveloperGuideDetail', accountType: 'development',type:'GET', isToken: true, data: _data }, {
                            success: function (data, params) {
                                if (data.code== _stauts.success) {
                                    that.dItem=data.result;
                                }
                            }
                        });
                    }
                }
            })

        },
        event:function(){

        }
    };
})