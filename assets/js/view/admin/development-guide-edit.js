// 购物指南编辑 add by gena
define(['api', 'global', 'data', '/build/controls/kindeditor/kindeditor.js'], function (Api, Global, Data, kindeditor) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 2, subIndex: 1 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    errors: { articleTitle: '', articleText: '' },
                    isClickSave: 0,
                    height: '240px', // 设置编辑器的高度
                    id: Global.option.urlParam.id,
                    articleType: 'developer',
                    articleDetil: { articleTitle: '', articleType: '', articleText: '', notice: false } // 储存文章详情信息
                },
                components: {
                    'kindeditor': kindeditor
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        if (this.id) { this.getArticleDetilGet(); };
                    },
                    getcontent: function (content) {
                        this.articleDetil.articleText = content;
                    },
                    hasError: that.hasError,
                    articleSave: that.articleSave, // 保存
                    getArticleDetilGet: that.getArticleDetilGet,  // 获取文章详情信息
                    //修改input
                    setInput:function(event,type,index){
                        if(type=='input'){
                            this.articleDetil.articleTitle=$(event.target).val();
                            if(/\S/.test($(event.target).val())){
                                $(event.target).parent().removeClass('error');
                            }
                        }
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        hasError: function () {
            var count = 0;
            for (ver in this.errors) {
                this.errors[ver] = '';
            }
            if (!this.isClickSave) return false;
            if ((!this.articleDetil.articleTitle) || !$.validate(['requied'], this.articleDetil.articleTitle).boo) {
                this.errors.articleTitle = "err";
                count++;
            }
            return count > 0;
        },
        getArticleDetilGet: function () {
            var _this = this;
            var params = {
                articleId: _this.id,
                articleType: _this.articleType
            };
            Api.set({ key: 'articleDetilGet', type: 'GET', isToken: false,accountType: 'admin', data: params }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        _this.articleDetil = data.result;
                    }
                }
            });
        },
        articleSave: function () {
            var _this = this;
            this.isClickSave++;
            if (this.hasError()) return;
            var _stauts = Api.getData.getCode();
            var params = {
                articleTitle: _this.articleDetil.articleTitle,
                articleText: _this.$refs.kindeditor.getKindEditorHtml(),
                isNotice: _this.articleDetil.notice,
                articleType: _this.articleType
            };
            if(_this.id)params.articleId=_this.id;
            if(_this.articleDetil.uploadTime)params.uploadTime=_this.articleDetil.uploadTime;
            Api.set({ key: 'articleSave', accountType: 'admin', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        window.location.href = Api.getData.getPageUrl('developmentGuide', 'admin');
                    }
                }
            });
        }
    };
})