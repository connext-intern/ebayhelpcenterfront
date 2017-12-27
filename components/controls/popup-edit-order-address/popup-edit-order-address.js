// 编辑收货地址 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-edit-order-address/popup-edit-order-address.html'
], function (Api, Global, Data, html) {
  var $method = {
    save: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      $.loading.show({
        dom: 'body'
      });
      Api.set({
        key: 'updateReceiverAddress',
        type: 'PUT',
        isToken: false,
        data: this.params
      }, {
        success: function (data, params) {
          $.loading.hide();
          if (data.code == _stauts.success) {
            _this.isClickSave = 0;
            _this.$emit('refresh');
            _this.close();
          }
        }
      });
    },
    getProvince: function (code) {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var currProv = null;
      Api.set({
        key: 'getSubRegionByCode',
        type: 'GET',
        isToken: false,
        data: {
          code: code,
          type: 'province'
        }
      }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.provinces = _this.provinces.concat(data.result);
            _this.provinces.forEach(function (element) {
              if (element.value == _this.params.receiverProvince) {
                currProv = element;
              }
            }, this);
            _this.fnSelectProv(currProv || {
              value: _this.params.receiverProvince,
              code: _this.params.receiverProvince,
              name: _this.params.receiverProvinceName
            });
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['item'],
    data: function () {
      return {
        isClickSave: false,
        countries: [],
        provinces: [],
        countryText: '',
        ProvText: '',
        params: {
          packageId: 0,
          receiverName: '',
          receiverCountry: '',
          receiverCountryName: '',
          receiverProvince: '',
          receiverProvinceName: '',
          receiverCity: '',
          receiverCounty: '',
          receiverAddress1: '',
          receiverAddress2: '',
          receiverZipCode: '',
          receiverPhone: '',
          version: '',
        },
        errors: {

        }
      };
    },
    watch: {
      'params.receiverCountry': function (value, newcountry) {
        if (value != newcountry) {
          this.provinces = [];
          this.getProvince(value);
        }
      },
      item: function (newitem) {
        var _this = this;
        if (newitem) {
          this.params.packageId = newitem.packageId;
          this.params.receiverName = newitem.receiverName;
          this.params.receiverCountry = newitem.receiverCountry;
          this.params.receiverCountryName = newitem.receiverCountryName;
          this.params.receiverProvince = newitem.receiverProvince;
          this.params.receiverProvinceName = newitem.receiverProvinceName;
          this.params.receiverCity = newitem.receiverCity;
          this.params.receiverCounty = newitem.receiverCounty;
          this.params.receiverAddress1 = newitem.receiverAddress1;
          this.params.receiverAddress2 = newitem.receiverAddress2;
          this.params.receiverZipCode = newitem.receiverZipCode;
          this.params.receiverPhone = newitem.receiverPhone;
          this.params.version = newitem.version;
          this.getName(this.params.receiverCountry);
          
          var currProv = null;
          _this.provinces.forEach(function (element) {
            if (element.value == _this.params.receiverProvince) {
              currProv = element;
            }
          }, this);
          _this.fnSelectProv(currProv || {
            value: _this.params.receiverProvince,
            code: _this.params.receiverProvince,
            name: _this.params.receiverProvinceName
          });
        }
      }
    },
    methods: {
      init: function () {
        this.getCountry();
      },
      hasError: function () {
        var count = 0;
        for (var ver in this.errors) {
          this.errors[ver] = '';
        }
        if (!this.isClickSave) return false;
        // if ((!this.params.receiverName) || !$.validate(['send-address'], this.params.receiverName).boo) {
        //   this.errors.receiverName = "err15";
        //   count++;
        // }
        if ((!this.params.receiverName) || !$.validate(['requied'], this.params.receiverName).boo) {
          this.errors.receiverName = "err1";
          count++;
        }
        if ((!this.params.receiverCountry) || !$.validate(['requied'], this.params.receiverCountry).boo) {
          this.errors.receiverCountry = "err1";
          count++;
        }
        if ((!this.params.receiverProvince) || !$.validate(['requied'], this.params.receiverProvince).boo) {
          this.errors.receiverProvince = "err1";
          count++;
        }
        if ((!this.params.receiverCity) || !$.validate(['requied'], this.params.receiverCity).boo) {
          this.errors.receiverCity = "err1";
          count++;
        }
        // if ((!this.params.receiverAddress1) || !$.validate(['send-address'], this.params.receiverAddress1).boo) {
        //   this.errors.receiverAddress1 = "err15";
        //   count++;
        // }
        if ((!this.params.receiverAddress1) || !$.validate(['requied'], this.params.receiverAddress1).boo) {
          this.errors.receiverAddress1 = "err1";
          count++;
        }
        // if (this.params.receiverAddress2 && !$.validate(['send-address'], this.params.receiverAddress2).boo) {
        //   this.errors.receiverAddress2 = "err15";
        //   count++;
        // }
        // if ((!this.params.receiverZipCode) || !$.validate(['zipcode-us'], this.params.receiverZipCode).boo) {
        //   this.errors.receiverZipCode = "err4";
        //   count++;
        // }
        if ((!this.params.receiverZipCode) || !$.validate(['requied'], this.params.receiverZipCode).boo) {
          this.errors.receiverZipCode = "err1";
          count++;
        }
        // if ((!this.params.receiverPhone) || !$.validate(['tel'], this.params.receiverPhone).boo) {
        //   this.errors.receiverPhone = "err5";
        //   count++;
        // }
        if ((!this.params.receiverPhone) || !$.validate(['requied'], this.params.receiverPhone).boo) {
          this.errors.receiverPhone = "err1";
          count++;
        }
        return count > 0;
      },
      getCountry: function () { // 获取国家
        Data.preferences.select.country.splice(0,3);
        this.countries = Data.preferences.select.country;
        // this.countries.unshift({ code: 0, lg: 'settingCondition' });
        this.fnSelectCount(this.countries[0]);
      },
      getProvince: $method.getProvince, // 获取省份
      fnSelectCount: function (country) { // 选择国家
        this.params.receiverCountry = country.code;
        this.countryText = country.lg;
        this.params.receiverCountryName = languages[this.countryText];
      },
      fnSelectProv: function (prov) { // 选择国家
        if (!prov) return;
        if (prov.code == 0) {
          prov.name = languages[prov.lg];
        }
        this.params.receiverProvince = prov.code;
        this.ProvText = prov.name;
        this.params.receiverProvinceName = prov.name;
      },
      getName: function (code) {
        if (!code) return;
        this.countries.forEach(function (element) {
          if (element.code == code.toString()) {
            this.countryText = element.lg;
            this.params.receiverCountryName = languages[this.countryText];
          }
        }, this);
      },
      close: function () {
        this.$emit('close');
        this.params = {
          packageId: 0,
          receiverName: '',
          receiverCountry: '',
          receiverCountryName: '',
          receiverProvince: '',
          receiverProvinceName: '',
          receiverCity: '',
          receiverCounty: '',
          receiverAddress1: '',
          receiverAddress2: '',
          receiverZipCode: '',
          receiverPhone: '',
          version: '',
        }
        this.isClickSave = false;
      },
      save: function () {
        this.isClickSave++;
        if (!this.hasError()) $method.save.call(this);
      }
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.edit-order-address');
    },
    mounted: function () {
      this.init();
    }
  };
});