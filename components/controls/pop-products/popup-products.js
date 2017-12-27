// 获取物流产品
define(['api', 'global', 'data',
  'text!/build/controls/pop-products/popup-products.html'
], function (Api, Global, Data, html) {
    return {
        template: html,
        data: function () {
            return {
                list:[],//列表数据
                language: Global.option.language,
                productId:null//选中产品的id
            };
        },
        methods: {
            close: function () {// 关闭当前窗口
              this.$emit('close');
            },
            setProgramSelect:function(event,index,id){
                this.productId=id;
                $('.popup.shipping-products .list li').eq(index).addClass('cur').siblings().removeClass('cur');
            },
            saveProduct:function(event){
                this.$emit('save',this.productId);
            },
            //获取所有产品列表
            getProducts:function(){
                var that=this;
                Api.set({ key:'getProducts', type: 'GET',isToken: false},{success:function(data,params){
                    if(data.code==Api.getData.getCode().success){
                        that.list = data.result;
                    }
                }});
            }
        },
      updated: function () { Global.fun.updataLanguage('.popup.shipping-products'); },
      mounted: function () {this.getProducts();}
    };
});