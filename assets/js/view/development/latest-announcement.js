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
                    noticeList:[],
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    }
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
                        var _data={};
                        _data.pageNo=that.page.current;
                        _data.pageSize=that.page.pagesize;
                        Api.set({ key: 'devNoticeGet', accountType: 'development',type:'GET',isToken: true, data: _data }, {
                            success: function (data, params) {
                                if (data.code== _stauts.success) {
                                    that.noticeList=data.result.dataList;
                                    that.pager(data.result.totalPages, data.result.totalCounts);
                                }
                            }
                        });
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var _this = this;
                        $.pager({
                            target: '.js-pager', current: _this.page.current, pagesize: _this.page.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                _this.page.current = current;
                                _this.page.pagesize = pagesize;
                                _this.dev_devNoticeGet();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    }
                },
                updated:function(){
                    Global.fun.replaceHref();
                }
            })

        },
        event:function(){

        }
    };
})