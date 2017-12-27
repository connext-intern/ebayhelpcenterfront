// 交运信息 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/order-package-delivery/order-package-delivery.html',
  '/build/controls/popup-select-delivery/popup-select-delivery.js'
], function (Api, Global, Data, html, PopupSelectDelivery) {
  var $method = {
  };
  return {
    template: html,
    props: ['item', 'isview', 'status'],
    data: function () {
      return {
        receiverCountryText: '',
        countries: Data.preferences.select.country,
        pickupTimes: Data.preferences.select.pickupTime,
        deliverTypes: Data.preferences.select.deliverType,
        clickCount: 0,
        deliveryInfo: null // 交运偏好
      }
    },
    methods: {
      init: function () {
      },
      // getName: function (code) {
      //   if (!code) return;
      //   debugger
      //   var str = '';
      //   this.pickupTimes.forEach(function (element) {
      //     if (element.code == code.toString()) {
      //       str = element.name;
      //     }
      //   }, this);
      //   return str;
      // },
      getDeliverType: function (code) {
        if (!code) return;
        var str = '';
        this.deliverTypes.forEach(function (element) {
          if (element.id == code.toString()) {
            str = element.lg;
          }
        }, this);
        return str;
      },
      refresh: function () {
        this.$emit('refresh');
      }
    },
    components: {
      'popup-select-delivery': PopupSelectDelivery
    },
    watch: {
      item: function (obj) {
        this.deliveryInfo = obj.deliveryInfo;
        // this.countries.forEach(function (element) {
        //   if (element.code === this.deliveryInfo.address.country) {
        //     this.receiverCountryText = element.lg;
        //   }
        // }, this);
      }
    },
    mounted: function () {
      this.init();
    }
  };
});