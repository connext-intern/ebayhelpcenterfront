// 物流服务信息 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 5, subIndex: '' };
            // 初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'message' }]);
            // 初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    pagerObj: { current: 1, pagesize: 10 },
                    list: [] // 列表数据
                },
                mounted: function () {
                    this.loadList();
                },
                methods: {
                    pager: that.pager, // 初始化分页
                    loadList: that.loadList,
                    viewDetail: that.viewDetail, // 查看描述
                    getNewArr: that.getNewArr,
                    getOneArr: that.getOneArr
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        viewDetail: function (item) {
            window.location.href = Api.getData.getPageUrl('logisticsServiceInfoDetail', 'admin') + '?id=' + item.sysId;
        },
        loadList: function () {
            var that = this;
            that.list = [];
            Api.set({ key: 'transportGet', type: 'GET',isToken: false, accountType: 'admin', data: { pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize } }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.pager(data.result.totalPages, data.result.totalCounts);
                        var newArr = that.getNewArr(data.result.dataList);
                        newArr.forEach(function (element) {
                            that.list.push(that.getOneArr(element, data.result.dataList));
                        }, this);
                    };
                }
            });
        },
        getNewArr: function (array) { // 去重
            var arr = [], json = {};
            array.forEach(function (element) {
                if (!json[element.transportId]) {
                    arr.push(element);
                    json[element.transportId] = element;
                }
            }, this);
            return arr;
        },
        getOneArr: function (curr, array) { // 获取单个分类
            var arr = [];
            array.forEach(function (element) {
                if (element.transportId == curr.transportId) {
                    arr.push(element);
                }
            }, this);
            return arr;
        },
        pager: function (totalPage, totalCount) {
            var that = this;
            $.pager({
                target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                    that.pagerObj.current = current;
                    that.pagerObj.pagesize = pagesize;
                    that.loadList();
                }
            });
            Global.fun.updataLanguage('.js-pager');
        }
    };
});