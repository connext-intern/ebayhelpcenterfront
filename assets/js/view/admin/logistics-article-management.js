/**
 * gfh 20170904
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 1, subIndex: 2 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    list: [],//初始化数据列表
                    pagerObj: { current: 1, pagesize: 10 }
                },
                mounted: function () {
                    this.getArticleListSearch();
                },
                methods: {
                    //checkbox选择
                    setCheckbox: function (event, index) {
                        this.list[index].isCheck = !this.list[index].isCheck;
                    },
                    //全选
                    setAllCheckbox: function (event) {
                        var flag = $(event.target).parent().hasClass('cur');
                        if (flag) { $(event.target).parent().removeClass('cur'); } else { $(event.target).parent().addClass('cur'); }
                        for (var i = 0; i < this.list.length; i++) {
                            this.list[i].isCheck = !flag;
                        }
                    },
                    //显示编辑
                    openPopup: function (articleId, index) {
                        window.location.href = Api.getData.getPageUrl('logisticsArticleManagementEdit', 'admin') + '?articleId=' + articleId;
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.getArticleListSearch();
                            }
                        });
                    },
                    //撤销公告
                    articleToNotice: function (event, isNotice, articleId) {
                        var that = this;
                        Api.set({ key: 'articleToNotice', accountType: 'admin', isToken: false, data: { notice: isNotice, articleId: articleId } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.getArticleListSearch();
                                }
                            }
                        });
                    },
                    //批量删除
                    articleDelete: function (event, articleIds) {
                        var that = this;
                        $.msg.confirmLan('confirm-delete', callback);
                        function callback() {
                            if (!articleIds) {
                                if (!that.checkboxStatus()) { $.msg.alertLan('choose-shipping-article'); return false; }
                                articleIds = articleIds ? articleIds : that.getArticleIds();
                            }
                            Api.set({ key: 'articleDelete', locked: event ? event.target : null, accountType: 'admin', data: { articleIds: articleIds } }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        $('.slct-page .del-item').removeClass('cur');
                                        that.getArticleListSearch();
                                    }
                                }
                            });
                        }
                    },
                    //获取物流文章列表
                    getArticleListSearch: function () {
                        var that = this;
                        Api.set({ key: 'articleListSearch', type: 'GET', accountType: 'admin', data: { articleType: 'p', pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    for (var i = 0; i < data.result.dataList.length; i++) {
                                        data.result.dataList[i].isCheck = 0;
                                    };
                                    that.list = data.result.dataList;
                                    that.pager(data.result.totalPages, data.result.totalCounts);
                                }
                            }
                        });
                    },
                    //获取选择的MessageId
                    getArticleIds: function () {
                        var arr = [];
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { arr.push(this.list[i].articleId); }
                        }
                        return arr;
                    },
                    //检查checkbox状态
                    checkboxStatus: function () {
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { return true; }
                        }
                        return false;
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})