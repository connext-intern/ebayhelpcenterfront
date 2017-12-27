/**
 *louis/20170803, homepage
 */
define(['api','global'], function (Api,Global) {
    return {
        initialize: function () {
            var that=this;
            $.loadHtml.start('body', function(){that.run();});
        },
        run:function(){

        },
        event:function(){

        }
    };
})