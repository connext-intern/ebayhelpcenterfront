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
                data: {
                    page: { // 页码块
                        pagesize: 10,
                        count: 100,
                        current: 1
                    }
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        this.init_event();
                        // 初始化触发某个栏目
                        this.trigger(0);
                        // 分页控件
                        this.pager();
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
                    pager: function () { // 分页
                        var _this = this;
                        $.pager({
                            target: '.js-pager',
                            count: _this.page.count,
                            current: _this.page.current,
                            pagesize: _this.page.pagesize,
                            callback: function (current, pagesize, pagecount) {
                                _this.page.current = current;
                                _this.page.pagesize = pagesize;
                                // _this.load_list();
                                Global.fun.updataLanguage('.js-pager');
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    trigger:function(index){ // 初始化触发某个栏目
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