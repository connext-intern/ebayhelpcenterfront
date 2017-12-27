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
                    netList:[],
                    javaList:[]
                },
                mounted:function(){
                    this.init();
                },
                methods: {
                    init:function(){
                        this.dev_devNoticeGet();
                    },
                    dev_devNoticeGet:function(){
                        var that=this;
                        var _stauts = Api.getData.getCode();
                        Api.set({ key: 'sdkSearch', accountType: 'development', isToken: true, type:'GET'}, {
                            success: function (data, params) {
                                if (data.code== _stauts.success) {
                                    that.javaList=[];
                                    that.netList=[];
                                    for(var i=0; i<data.result.length; i++){
                                        if(data.result[i].sdkType==0)that.javaList.push(data.result[i]);
                                        if(data.result[i].sdkType==1)that.netList.push(data.result[i]);
                                    }
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