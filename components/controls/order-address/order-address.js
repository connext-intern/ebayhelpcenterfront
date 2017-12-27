// 订单地址 add by gena
define(['api', 'global',
  'text!/build/controls/order-address/order-address.html',
  '/build/controls/popup-select-address/popup-select-address.js',
  '/build/controls/popup-edit-order-address/popup-edit-order-address.js'
], function (Api, Global, html, PopupSelectAddress, PopupEditOrderAddress) {
  var $method = {

  };
  return {
    template: html,
    props: ['item', 'isview','status'],
    data: function () {
      return {
        editAddress:null,
        clickEditAddressCount: 0,
        clickCount: 0,
        sendAddress: null
      };
    },
    components: {
      'popup-select-address': PopupSelectAddress,
      'popup-edit-order-address': PopupEditOrderAddress
    },
    watch: {
      item: function (newentity) {
        this.sendAddress = newentity.sendAddress;
      }
    },
    methods: {
      refresh: function () {
        this.$emit('refresh');
      }
    },
    mounted: function () {

    }
  };
});