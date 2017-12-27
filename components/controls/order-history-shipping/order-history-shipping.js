// 历史物流 add by gena
define(['api', 'global', 'data', 'text!/build/controls/order-history-shipping/order-history-shipping.html'], function (Api, Global, Data, html) {
  var $method = {
  };
  return {
    template: html,
    props: ['item'],
    data: function () {
      return {
        list:[]
      };
    },
    watch:{
      item:function(newentity){
        this.list=newentity;
      }
    },
    methods: {
      init: function () {
        
      },
      set_list:function(newList){
        this.list = newList;
      },
      close:function(){
        this.$emit('close');
      }
    },
    mounted: function () {
      this.init();
    }
  };
});