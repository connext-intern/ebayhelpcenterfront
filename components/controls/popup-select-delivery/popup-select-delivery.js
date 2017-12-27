// 选择交运方式 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-select-delivery/popup-select-delivery.html'
], function (Api, Global, Data, html) {
  var $method = {
    getDeliveryPreferences: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'getDeliveryPreferences', type: 'GET', isToken: false, data: this.params }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.list = data.result;
            if (_this.list.length) _this.currentDelivery = _this.list[0];
            if (_this.item.deliveryInfo) {
              _this.list.forEach(function (element) {
                if (element.id == _this.item.deliveryInfo.id) {
                  _this.currentDelivery = element;
                }
              }, this);
            }
          }
        }
      });
    },
    save: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var params = {
        packageIds: [_this.item.packageId],
        preferenceId: _this.currentDelivery.id
      };
      $.loading.show({dom:'body'});
      Api.set({ key: 'selectDeliveryPreference', isToken: false, data: params }, {
        success: function (data, params) {
          $.loading.hide();
          if (data.code == _stauts.success) {
            _this.$emit('refresh');
            _this.close();
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['item', 'operator'],
    data: function () {
      return {
        list: [],
        deliverTypes: Data.preferences.select.deliverType,
        pickupTimes: Data.preferences.select.pickupTime,
        currentDelivery: {
          name: '',
          type: '',
          address: {},
          siteAddress:{},
          pickupTime: ''
        }
      };
    },
    watch: {
      operator: function (value) {
        if (value) {
          this.getDeliveryPreferences();
        }
      }
    },
    methods: {
      init: function () {
      },
      close: function () {
        this.$emit('close');
      },
      save: $method.save, // 保存 选择交运方式
      getPickTimeName: function (arr, code) {
        if(!code) return '';
        var str = '';
        arr.forEach(function (element) {
          if (element.code == code.toString()) {
            str = element.name;
          }
        }, this);
        return str;
      },
      getDeliveryName: function (arr, code) {
        if(!code) return '';
        var str = '';
        arr.forEach(function (element) {
          if (element.id == code.toString()) {
            str = element.text;
          }
        }, this);
        return str;
      },
      selectDeliveryEvent: function (entity) { // 选择交运方式
        this.currentDelivery = entity;
      },
      getDeliveryPreferences: $method.getDeliveryPreferences // 获取交运偏好列表
    },
    updated: function () {
      Global.fun.replaceHref('.popup.select-delivery');
      Global.fun.updataLanguage('.popup.select-delivery');
    },
    mounted: function () {
      this.init();
    }
  };
});