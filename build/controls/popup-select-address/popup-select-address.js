// 选择其他预设地址 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-select-address/popup-select-address.html'
], function (Api, Global, Data, html) {
  var $method = {
    getAddresses: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var _data = {
        type: Api.getData.getAddressType().send
      };
      Api.set({ key: 'getAddresses', type: 'GET', isToken: false, data: _data }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.list = data.result;
            if (_this.list.length) _this.currentAddress = _this.list[0];
            if (_this.item.sendAddress) {
              _this.list.forEach(function (element) {
                if (element.id == _this.item.sendAddress.id) {
                  _this.currentAddress = element;
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
        packageId: _this.item.packageId,
        addressId: _this.currentAddress.id,
        version: _this.item.version
      };
      $.loading.show({dom:'body'});
      Api.set({ key: 'updateSendAddress', type: 'PUT', isToken: false, data: params }, {
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
        currentAddress: {
          name: '',
          type: '',
          address: {
            name: '',
            contactName: '',
            companyName: '',
            country: '',
            countryCode: '',
            province: '',
            provinceCode: '',
            city: '',
            cityCode: '',
            county: '',
            countyCode: '',
            address1: '',
            address2: '',
            address3: '',
            zipcode: '',
            phone: '',
            type: '',
            isDefault: false
          },
          pickupTime: ''
        }
      };
    },
    watch: {
      operator: function (value) {
        if (value) {
          this.getAddresses();
        }
      }
    },
    methods: {
      init: function () {
      },
      close: function () {
        this.$emit('close');
      },
      save: $method.save,
      selectAddressEvent: function (entity) { // 选择发货地址
        this.currentAddress = entity;
      },
      getAddresses: $method.getAddresses // 获取发货地址列表
    },
    updated: function () {
      Global.fun.replaceHref('.popup.select-address');
      Global.fun.updataLanguage('.popup.select-address');
    },
    mounted: function () {
      this.init();
    }
  };
});