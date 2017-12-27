// 包裹列表 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/order-package-errorlist/order-package-errorlist.html'
], function (Api, Global, Data, html) {
  var $method = {

  };
  return {
    template: html,
    props: ['item'],
    data: function () {
      return {
        list: []
      };
    },
    methods: {
      refresh: function () { //刷新
        this.$emit('refresh');
      },
      getJson: function (str) {
        try {
            return !!str ? JSON.parse(str) : {};
        } catch (error) {
            return {}
        }
    },
    },
    watch: {
      item: function (newentity) {
        this.list = newentity;
      }
    },
    mounted: function () {

    }
  };
});