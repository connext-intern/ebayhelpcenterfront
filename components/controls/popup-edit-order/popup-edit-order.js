// 编辑包裹 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-edit-order/popup-edit-order.html'
], function (Api, Global, Data, html) {
  var $method = {

  };
  return {
    template: html,
    props: ['item', 'package'],
    data: function () {
      return {
        entity: null,
        isShowSKUPre: false,
        skuCurrencyCode:'',
        params: {
          packageId: '',
          orderLineId: '',
          skuPrice: '',
          skuLength: '',
          skuWidth: '',
          skuHeight: '',
          skuWeight: '',
          skuNameEN: '',
          skuNameZH: '',
          skuIsBattery: '',
          skuOrigin: '',
          skuTariffCode: '',
          skuRemark: '',
          version: ''
        },
        skuOriginText: '', // 原产地文本
        skuIsBatteryText: '',
        countries: [],
        isBattaries: Data.order.select.isLiBattery,
        isClickSave: false,
        isClickSaveSku: false,
        errors: {

        },
        showType: 'style1'
      };
    },
    methods: {
      init: function () {
        this.dev_getOrigin();
      },
      close: function () { // 关闭当前窗口
        this.$emit('close-edit-order');
        this.isClickSave = false;
        this.isClickSaveSku = false;
      },
      fnSelectCount: function (country) { // 选择省份
        this.params.skuOrigin = country.code;
        this.skuOriginText = country.description;
      },
      fnSelectBattery: function (item) { // 选择是否有锂电池
        this.params.skuIsBattery = item.code;
        this.skuIsBatteryText = item.lg;
      },
      dev_getOrigin: function (callback) {
        var that = this;
        var _stauts = Api.getData.getCode();
        if (that.countries.length > 1) {
          if (typeof callback === 'function') callback.call(this);
          return;
        }
        Api.set({ key: 'getOrigin', type: 'GET', isToken: false }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              that.countries = data.result;
              if (typeof callback === 'function') callback.call(this);
            }
          }
        });
      },
      saveToPre: function () { // 存为预设
        var _this = this;
        this.isClickSaveSku++;
        if (this.hasError()) return;
        var _stauts = Api.getData.getCode();
        var params = {
          skuId: _this.item.sku,
          nameZh: _this.params.skuNameZH,
          nameEn: _this.params.skuNameEN,
          price: _this.params.skuPrice,
          weight: _this.params.skuHeight,
          origin: _this.params.skuOrigin,
          isLiBattery: _this.params.skuIsBattery,
          tariffCode: _this.params.skuTariffCode,
          length: _this.params.skuLength,
          width: _this.params.skuWidth,
          height: _this.params.skuHeight,
          remark: _this.params.skuRemark,
          currency:_this.item.skuCurrencyCode
        };
        Api.set({ key: 'createSKU', type: 'PUT', isToken: false, data: params }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              $.msg.alertLan('save-sku-tip');
            }
          }
        });
      },
      save: function () { // 保存
        var _this = this;
        this.isClickSave++;
        if (this.hasError()) return;
        var _stauts = Api.getData.getCode();
        $.loading.show({ dom: 'body' });
        Api.set({ key: 'updateTransaction', type: 'PUT', isToken: false, data: this.params }, {
          success: function (data, params) {
            $.loading.hide();
            if (data.code == _stauts.success) {
              _this.$emit('refresh');
              _this.close();
            }
          }
        });
      },
      hasError: function () {
        var count = 0;
        for (ver in this.errors) {
          this.errors[ver] = '';
        }
        if (!this.isClickSave && !this.isClickSaveSku) return false;
        if ((!this.params.skuPrice) || !$.validate(['dignum'], this.params.skuPrice).boo) {
          this.errors.skuPrice = "err3";
          count++;
        }
        if ((!this.params.skuPrice) || !$.validate(['requied'], this.params.skuPrice).boo) {
          this.errors.skuPrice = "err1";
          count++;
        }
        if (this.isClickSaveSku) {
          if ((!this.params.skuLength) || !$.validate(['dignum2'], this.params.skuLength).boo) {
            this.errors.skuLength = "err3";
            count++;
          }
          if ((!this.params.skuLength) || !$.validate(['requied'], this.params.skuLength).boo) {
            this.errors.skuLength = "err1";
            count++;
          }
          if ((!this.params.skuHeight) || !$.validate(['dignum2'], this.params.skuHeight).boo) {
            this.errors.skuHeight = "err3";
            count++;
          }
          if ((!this.params.skuHeight) || !$.validate(['requied'], this.params.skuHeight).boo) {
            this.errors.skuHeight = "err1";
            count++;
          }
          if ((!this.params.skuWidth) || !$.validate(['dignum2'], this.params.skuWidth).boo) {
            this.errors.skuWidth = "err3";
            count++;
          }
          if ((!this.params.skuWidth) || !$.validate(['requied'], this.params.skuWidth).boo) {
            this.errors.skuWidth = "err1";
            count++;
          }
        }
        if ((!this.params.skuWeight) || !$.validate(['dignum1'], this.params.skuWeight).boo) {
          this.errors.skuWeight = "err3";
          count++;
        }
        if ((!this.params.skuWeight) || !$.validate(['requied'], this.params.skuWeight).boo) {
          this.errors.skuWeight = "err1";
          count++;
        }
        if ((!this.params.skuNameZH) || !$.validate(['requied'], this.params.skuNameZH).boo) {
          this.errors.skuNameZH = "err1";
          count++;
        }
        if ((!this.params.skuNameEN) || !$.validate(['english'], this.params.skuNameEN).boo) {
          this.errors.skuNameEN = "err2";
          count++;
        }
        if ((!this.params.skuNameEN) || !$.validate(['requied'], this.params.skuNameEN).boo) {
          this.errors.skuNameEN = "err1";
          count++;
        }
        if (this.params.skuIsBattery < 0) {
          this.errors.skuIsBattery = "err1";
          count++;
        }
        if ((!this.params.skuOrigin) || !$.validate(['requied'], this.params.skuOrigin).boo) {
          this.errors.skuOrigin = "err1";
          count++;
        }
        return count > 0;
      },
      dev_getSsoUrl: function (_str) {
        Global.fun.dev_getSsoUrl(_str);
      }
    },
    watch: {
      item: function (newentity) {
        this.entity = newentity;
        if (newentity) {
          this.isShowSKUPre = newentity.sku;
          this.skuCurrencyCode = newentity.skuCurrencyCode;
          this.params.packageId = this.package.packageId;
          this.params.orderLineId = this.entity.orderLineItem;
          this.params.skuPrice = this.entity.skuPrice;
          this.params.skuLength = this.entity.skuLength;
          this.params.skuWidth = this.entity.skuWidth;
          this.params.skuWeight = this.entity.skuWeight;
          this.params.skuHeight = this.entity.skuHeight;
          this.params.skuNameEN = this.entity.skuNameEN;
          this.params.skuNameZH = this.entity.skuNameZH;
          this.params.skuTariffCode = this.entity.skuTariffCode;
          this.params.skuRemark = this.entity.skuRemark;
          this.params.version = this.package.version;
          if (this.entity.skuIsBattery !== null) {
            this.isBattaries.forEach(function (element) {
              if (element.code == this.entity.skuIsBattery.toString()) {
                this.params.skuIsBattery = element.code;
                this.skuIsBatteryText = element.lg;
              }
            }, this);
          }
          if (this.entity.skuOrigin !== null) {
            this.dev_getOrigin(function () {
              this.countries.forEach(function (element) {
                if (element.code == this.entity.skuOrigin.toString()) {
                  this.params.skuOrigin = element.code;
                  this.skuOriginText = element.description;
                }
              }, this);
            });
          }
        }
        var _isMainUser = true;
        var _isBattery = Global.option.user.batteryVerifyStat == 'TRUE';
        if (Api.getData.getUser.userType()[0] == Global.option.user.userType) _isMainUser = false;
        if (!_isBattery) this.showType = _isMainUser ? 'style2' : 'style3';

      }
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.edit-order');
    },
    mounted: function () {
      this.init();
    }
  };
});