// 物品清单 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/order-package-info/order-package-info.html',
  '/build/controls/popup-edit-package/popup-edit-package.js'
], function (Api, Global, Data, html, PopupEditPackage) {
  var $method = {

  };
  return {
    template: html,
    props: ['item', 'isview', 'status'],
    data: function () {
      return {
        clickEdit: 0,
        packageStatus: Data.order.status.package,
        entity: null
      };
    },
    methods: {
      refresh: function () {
        this.$emit('refresh');
      }
    },
    components: {
      'popup-edit-package': PopupEditPackage
    },
    watch: {
      item: function (value) {
        this.entity = value;
      }
    },
    mounted: function () {

    }
  };
});