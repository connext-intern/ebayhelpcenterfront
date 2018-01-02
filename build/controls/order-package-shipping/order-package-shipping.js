// 物流信息 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/order-package-shipping/order-package-shipping.html',
  '/build/controls/popup-change-shipping/popup-change-shipping.js'
], function (Api, Global, Data, html, PopupChangeShipping) {
  var $method = {
    getPackageTrackingInfo: function () {
      var _this = this;
      var params = {
        trackingNo: _this.item.trackingNumber
      };
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'getPackageTrackingInfo', type: 'GET', isToken: false, data: params }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.trackingList = data.result.trackingEvents;
          }
        }
      });
    },
    applyTrackingNo: function () {
      var _this = this;
      var params = {
        packageIds: [_this.item.packageId]
      };
      var _stauts = Api.getData.getCode();
      $.loading.show({dom:'body'});
      Api.set({ key: 'applyTrackingNo', isToken: false, data: params }, {
        success: function (data, params) {
          $.loading.hide();
          if (data.code == _stauts.success) {
            $.msg.alertLan("operator");
            _this.$emit('refresh');
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['item', 'isview', 'status'],
    data: function () {
      return {
        language: Global.option.language,
        statusData: Data.order.status.package,
        trackingList: [],
        newentity: null,
        clickProdCount: 0
      };
    },
    watch: {
      item: function (newentity) {
        this.entity = newentity;
        switch (this.entity.status) {
          case this.statusData.toBeShipped:
          case this.statusData.toBeReceived:
          case this.statusData.onShipping:
          case this.statusData.delivered:
            this.getPackageTrackingInfo();
            break;
        }
      }
    },
    components: {
      'popup-change-shipping': PopupChangeShipping
    },
    methods: {
      init: function () {
      },
      changeShipping: function () {
        this.$emit('changeshipping');
      },
      refresh: function () {
        this.$emit('refresh');
      },
      applyTrackingNo: $method.applyTrackingNo, // 申请物流单号
      getPackageTrackingInfo: $method.getPackageTrackingInfo // 运输中订单_获取包裹物流信息
    },
    mounted: function () {
      this.init();
    }
  };
});