// 帮助中心 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () {
                that.createComponent();
            });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".help-center",
                data: {},
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        this.init_event();
                        // 初始化触发某个栏目
                        this.trigger(0);
                    },
                    init_event: function () {
                        $('.help-center .menu-left').on('click', 'dt', function () {
                            var $parent = $(this).parents('dl');
                            if($parent.hasClass('curr')){
                                $parent.removeClass('curr');
                                $(this).siblings('dd').slideUp();
                            }
                            else{
                                $parent.addClass('curr');
                                $(this).siblings('dd').slideDown();

                                $parent.siblings('dl').removeClass('curr').find('dd').slideUp();
                            }
                        });
                    },
                    trigger:function(index){
                        $('.help-center .menu-left dt').eq(index).trigger('click');
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.help-center');
                }
            });
        },
        init_event: function () {
            var _this = this;
        }
    };
});