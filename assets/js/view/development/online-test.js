/**
 *ffc/20170803, homepage
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
                data:{
                    isShowApiName:false,
                    isPost:true,
                    isGet:false,
                    radio:'',
                    select:{items:['idontkonw.ebay',22,33,44], lg:'idontkonw.ebay',index:0}
                },
                methods: {
                    fnSelectEvent:function(){
                        this.isShowApiName=true;
                    },

                    fnRadio:function(type){
                        this.radio=type;
                    },
                    liApiName:function(event,index,text) {
                        this.select.lg = text;
                        this.select.index = index;
                    }
                }
            });

        }
    };
})