/**
 *louis/20170803, testpage
 */
define(['api','global','data'], function (Api,Global,Data) {
    return {
        initialize: function () {
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function(){
            var that=this;
            //初始化vue
            this.vue=new Vue({
                el: ".page",
                data: {
                    obj:{policyTitle:'',createTime:''}//详情数据
                },
                mounted: function () {
                    that.load();
                },
                methods: {

                },
                updated: function () { }
            });
        },
        //加载列表
        load:function(){
            var that=this;
            Api.set({ key: 'getShipppingPolicyDetail', type:'GET',isToken: false,data:{policyId:Global.option.urlParam.id} },{success:function(data,params){
                if(data.code==Api.getData.getCode().success){
                    that.vue.obj=data.result;
                    $('.article-detail .content-wrapper').html(data.result.content);
                };
            }});
        }
    };
})