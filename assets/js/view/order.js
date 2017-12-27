/**
 *louis/20170803, order
 */
define(['api','global','data','/build/controls/order-package/package.js'], function (Api,Global,Data,packageList) {
    return {
        initialize: function () {
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function(){
            var that=this;
            Global.fun.menuVue.hignlight={index:0,subIndex:-1};
            //初始化面包屑
            Global.fun.updataCrumbs([{lg:'orderManagement',link:'pendingOrder'},{lg:'allOrder'}]);
            //初始化分页
            //初始化vue
            this.vue=new Vue({
                el: ".page-wrapper",
                data: {
                    status:Data.order.status.package.toBeReceived,
                    pagerObj:{current:1,pagesize:10,totalCount:0},
                    urlParam:{
                        superTrackingCode:Global.option.urlParam.superTrackingCode||'',
                        buyerEbayId:Global.option.urlParam.buyerEbayId||'',
                        itemId:Global.option.urlParam.itemId||''
                    },//url参数
                    curPackageId:null//当前包裹id
                },
                components: {'package-list': packageList},
                mounted: function () {
                    this.$refs.package.getType('all');
                    //初始化包裹信息
                    this.updataPackage();
                },
                methods: {
                    //初始化分页
                    pager:function(totalPage,totalCount){
                        this.pagerObj.totalCount=totalCount;
                        var that=this;
                        $.pager({ target: '.js-pager',current:this.pagerObj.current,pagesize:this.pagerObj.pagesize,pagecount:totalPage,count:totalCount ,callback:function(current, pagesize){
                            that.pagerObj.current=current;
                            that.pagerObj.pagesize=pagesize;
                            that.updataPackage();
                        }});
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //获取统计数据
                    packageNumber:function(packageNumber){
                        Global.fun.menuVue.updataPageNum(packageNumber.pending,packageNumber.pendingPickup,packageNumber.delivered,packageNumber.exception,packageNumber.deleted);
                    },
                    //更新package列表
                    updataPackage:function(){
                        this.$refs.package.getPackage();
                    },
                    //获取所有筛选条件
                    getFilter:function(callback){
                        var filter={
                            status:this.status,pageNo:this.pagerObj.current,pageSize:this.pagerObj.pagesize
                        };
                        filter=$.extend(this.urlParam, filter);
                        if(callback)callback(filter);
                        return filter;
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        }
    };
})