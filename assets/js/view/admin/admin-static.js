/**
 *robin/20170815, registerSuccess
 */
define(['api','global'], function (Api,Global) {
    return {
        initialize: function () {
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function(){
            this.event();
        },
        event:function(){
        }
    };
})