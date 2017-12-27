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
            that.vueTop=new Vue({
                el: '.noticeMsgSelecter',
                data:  {
                    noticeList:[]
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
                        _data.pageNo=1;
                        _data.pageSize=4;
                        Api.set({ key: 'devNoticeGet', accountType: 'development',type:'GET', isToken: true, data: _data }, {
                            success: function (data, params) {
                                if (data.code== _stauts.success) {
                                    that.noticeList=data.result.dataList;
                                }
                            }
                        });
                    }
                },
                updated:function(){
                    Global.fun.replaceHref();
                }
            });
            that.vueRight=new Vue({
                el: '.otherContetn .right',
                data:  {
                    guideList:[]
                },
                mounted:function(){
                    this.init();
                },
                methods: {
                    init:function(){
                        this.dev_developerGuideList();
                    },
                    dev_developerGuideList:function(){
                        var that=this;
                        var _stauts = Api.getData.getCode();
                        var _data={};
                        _data.pageNo=1;
                        _data.pageSize=5;
                        Api.set({ key: 'getDeveloperGuideList', accountType: 'development',type:'GET', isToken: true, data: _data }, {
                            success: function (data, params) {
                                if (data.code== _stauts.success) {
                                    that.guideList=data.result.dataList;
                                }
                            }
                        });
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