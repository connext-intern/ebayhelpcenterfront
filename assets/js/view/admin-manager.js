/**
 *louis/20170803, testpage
 */
define(['api','global','data'], function (Api,Global,Data) {
    return {
        initialize: function () {
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function(){
            var that=this;
            Global.fun.menuVue.hignlight={index:0,subIndex:''};
            //初始化面包屑
            Global.fun.updataCrumbs([{lg:'message'}]);
            //初始化vue
            this.vue=new Vue({
                el: ".page-wrapper",
                data: {
                    pagerObj:{current:1,pagesize:10},
                    list:[]//列表数据
                },
                mounted: function () {
                    this.loadList();
                },
                methods: {
                    //初始化分页
                    pager:function(totalPage,totalCount){
                        var that=this;
                        $.pager({ target: '.js-pager',current:this.pagerObj.current,pagesize:this.pagerObj.pagesize,pagecount:totalPage,count:totalCount ,callback:function(current, pagesize){
                            that.pagerObj.current=current;
                            that.pagerObj.pagesize=pagesize;
                            that.loadList();
                        }});
                        Global.fun.updataLanguage('.js-pager');
                    },
                    loadList:function(){
                        var that=this;
                        Api.set({ key: 'getAllMessage', type:'GET',data:{pageNo:this.pagerObj.current,pageSize:this.pagerObj.pagesize} },{success:function(data,params){
                            if(data.code==Api.getData.getCode().success){
                                that.list=data.result;
                                that.pager(data.result.totalPages,data.result.totalCounts);
                            };
                        }});
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                    Global.fun.replaceHref('.page-wrapper');
                }
            });
        }
    };
})