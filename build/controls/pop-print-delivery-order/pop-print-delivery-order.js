// 获取物流产品
define(['api', 'global', 'data',
  'text!/build/controls/pop-print-delivery-order/pop-print-delivery-order.html'
], function (Api, Global, Data, html) {
    return {
        template: html,
        data: function () {
            return {
                packageIds:null//批量包裹id
            };
        },
        methods: {
            close: function () {// 关闭当前窗口
              this.$emit('close');
            },
            setDeliveryOrder:function(packageIds){
                this.packageIds=packageIds;
            },
            saveDeliveryOrder:function(event){

            }
        },
      updated: function () { Global.fun.updataLanguage('.popup.print-delivery-order'); },
      mounted: function () {}
    };
});