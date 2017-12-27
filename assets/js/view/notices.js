/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 0, subIndex: '' };
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'newNotices' }]);
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    pagerObj: { current: 1, pagesize: 10 },
                    list: []//列表数据
                },
                mounted: function () {
                    that.load();
                },
                methods: {
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.updataPackage();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        //加载列表
        load: function () {
            var that = this;
            Api.set({ key: 'getNotices', type: 'GET', isToken: false,data: { pageNo: that.vue.pagerObj.current, pageSize: that.vue.pagerObj.pagesize } }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        if (data.result && data.result.length > 0) {
                            that.vue.list = data.result;
                            //that.vue.pager();
                        }
                    };
                }
            });
        }
    };
})