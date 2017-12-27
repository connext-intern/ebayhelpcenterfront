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
                },
                methods: {

                }
            })

        },
        event:function(){

        }
    };
})