/**
 *louis/20170803, order
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            // Global.fun.menuVue.hignlight={index:0,subIndex:0};
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'logisticsService' }]);
            //初始化分页
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    menuList: [],//列表数据
                    detailName: '',//详情标题
                    index: 0
                },
                mounted: function () {
                    var that = this;
                    this.getProducts(function () {
                        setTimeout(function () { that.chooseProduct(); }, 100);
                    });
                },
                methods: {
                    //获取物流产品列表
                    getProducts: function (callback) {
                        var that = this;
                        Api.set({ key: 'getProducts', type: 'GET', isToken: false }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    $.each(data.result, function (index, item) {
                                        that.menuList.push({ id: item.id, text: Global.option.language == 'en-us' ? item.nameEn : item.nameZh });
                                    });
                                    Global.fun.menuVue.items = that.menuList;
                                    if (callback) callback();
                                }
                            }
                        });
                    },
                    //选择产品
                    chooseProduct: function () {
                        Global.fun.menuVue.hignlight = { index: this.index, subIndex: -1 };
                        this.detailName = $('.logictics-menu dt a').eq(0).text();
                        this.getProductDetail(this.menuList[0].id);
                        var that = this;
                        $('.logictics-menu dl').bind('click', function () {
                            that.index = $(this).index();
                            that.detailName = $(this).find('a').text();
                            that.getProductDetail($(this).attr('id'));
                        });
                    },
                    //获取物流产品详情
                    getProductDetail: function (productId) {
                        var that = this;
                        Api.set({ key: 'getProductById', type: 'GET', data: { productId: productId } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    $('.logistics-server-content').html(Global.option.language == 'en-us' ? data.result.descriptionEn : data.result.descriptionZh);
                                }
                            }
                        });
                    }
                },
                updated: function () {
                    Global.fun.menuVue.hignlight = { index: this.index, subIndex: -1 };
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})