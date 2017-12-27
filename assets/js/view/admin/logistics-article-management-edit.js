/**
 *louis/20170803, order
 */
define(['api','global','data','/build/controls/kindeditor/kindeditor.js'], function (Api,Global,Data,kindeditor) {
    return {
        initialize: function () {
            var that=this;
            Global.fun.startLoadHtml(function(){that.run();});
        },
        run:function() {
            var that = this;
            Global.fun.menuVue.hignlight = {index: 1, subIndex: 2};
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    height:'240px',//设置编辑器的高度
                    params:{articleId:Global.option.urlParam.articleId,articleType:'detil'},//储存提交参数
                    articleDetil:{articleId:Global.option.urlParam.articleId,articleTitle:'',articleType:'',articleText:'',notice:false},//储存文章详情信息
                    select:{
                        data:[{id:'',text:'- 请选择文章类型 -'},{id:'policy',text:'物流政策'},{id:'detil',text:'物流详情'}],
                        text:'- 请选择文章类型 -',
                        index:0
                    }
                },
                components: {
                    'kindeditor': kindeditor
                },
                mounted: function () {
                    if(this.params.articleId){this.getArticleDetilGet();};
                },
                methods: {
                    //修改select信息
                    setSelect:function(event,text,index,id){
                        this.select.text=text;
                        this.select.index=index;
                        this.articleDetil.articleType=id;
                        if(index!=0){$('.selectVal').removeClass('error');}
                    },
                    //修改input
                    setInput:function(event,type,index){
                        if(type=='input'){
                            this.articleDetil.articleTitle=$(event.target).val();
                            if(/\S/.test($(event.target).val())){
                                $(event.target).parent().removeClass('error');
                            }
                        }
                    },
                    //设置checkbox
                    setCheckBox:function(){
                        this.articleDetil.notice=!this.articleDetil.notice;
                    },
                    //保存文章
                    saveArticle:function(event){
                        var _this=this;
                        if(!_this.checkFrom())return false;
                        var _stauts = Api.getData.getCode();
                        var params = {
                            articleTitle: _this.articleDetil.articleTitle,
                            articleText: _this.$refs.kindeditor.getKindEditorHtml(),
                            isNotice: _this.articleDetil.notice,
                            articleType: _this.articleDetil.articleType
                        };
                        if(_this.articleDetil.articleId)params.articleId=_this.articleDetil.articleId;
                        if(_this.articleDetil.uploadTime)params.uploadTime=_this.articleDetil.uploadTime;
                        Api.set({ key: 'articleSave', accountType: 'admin', isToken: false, data: params }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    window.location.href = Api.getData.getPageUrl('logisticsArticleManagement', 'admin');
                                }
                            }
                        });
                    },
                    //获取文章详情信息
                    getArticleDetilGet:function(){
                        var that=this;
                        Api.set({ key:'articleDetilGet',isToken: false, type:'GET',accountType:'admin',data:this.params},{success:function(data,params){
                            if(data.code==Api.getData.getCode().success){
                                that.articleDetil=data.result;
                                var obj=that.getSelectInfo(that.articleDetil.articleType);
                                that.select.text=obj.text;
                                that.select.index=obj.index;
                            }
                        }});
                    },
                    //获取select初始化信息
                    getSelectInfo:function(type){
                        for(var i=0;i<this.select.data.length;i++){
                            if(type==this.select.data[i].id){return {text:this.select.data[i].text,index:i};}
                        }
                        return null;
                    },
                    //检查form表单
                    checkFrom:function(){
                        var flag=true;
                        var title=$('.title').val();
                        if(!/\S/.test(title)){flag=false;$('.title').parent().addClass('error');}else{$('.title').parent().removeClass('error');}
                        if($('.selectOptions li').eq(0).hasClass('cur')){flag=false;$('.selectVal').addClass('error');}else{$('.selectVal').removeClass('error');}
                        var content=this.$refs.kindeditor.getKindEditorHtml();
                        if(!/\S/.test(content)){flag=false;this.$refs.kindeditor.setEditorError(true);}else{this.$refs.kindeditor.setEditorError();}
                        return flag;
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})