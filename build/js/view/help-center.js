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
                        var _this = this;
                        $('#a_query').on('click',function () {
                            _this.querykey();
                        });
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
                                _this.updatepage();
                                Global.fun.updataLanguage('.js-pager');
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    trigger:function(index){ // 初始化触发某个栏目
                        $('.help-center .menu-left dt').eq(index).trigger('click');
                    },
                    updatepage:function (current,pagesize) {
                        $('#searcharticle').html('<h2>这是下一页内容</h2>')
                        Global.fun.updataLanguage('.js-pager');
                    },
                    querykey : function(){
                        var _this = this;
                        $('#searcharticle').html('<h2>这是分页内容</h2>')
                        $('#querycontent').css('display','block');
                        $('#menucontent').css('display','none');
                        _this.page.count=100;
                        _this.page.current=1;
                        _this.page.pagesize=10;
                        _this.pager();
                    },
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

function showSecondContent(titleId) {
    $('#menucontent').html('<h2>这是二级菜单内容</h2>')
    $('#querycontent').css('display','none');
    $('#menucontent').css('display','block');
}