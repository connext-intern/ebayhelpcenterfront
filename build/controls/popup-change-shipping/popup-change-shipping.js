// 选择交运方式 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-change-shipping/popup-change-shipping.html'
], function (Api, Global, Data, html) {
  var $method = {
    save: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      if (!_this.currProd) return;
      var _productId = _this.operator ? _this.currProd.productId : _this.currProd.id;
      var params = {
        packageIds: [_this.item.packageId],
        productId: _productId,
        version: _this.item.version
      };
      Api.set({
        key: 'selectProduct',
        isToken: false,
        data: params
      }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.$emit('refresh');
            _this.close();
          }
        }
      });
    },
    getAvailableProduct: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var params = {
        packageIds: [_this.item.packageId]
      };
      Api.set({
        key: 'getAvailableProduct',
        type: 'POST',
        isToken: false,
        data: params
      }, {
        success: function (data, params) {
          $.msg.alert(data.message);
          if (data.code == _stauts.success) {
            _this.list = data.result;
            if (_this.list.length > 0) _this.currProd = _this.list[0];
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['item', 'operator', 'list'],
    data: function () {
      return {
        language: Global.option.language,
        currProd: null
      };
    },
    watch: {
      list: function (_list) {
        // this.list = this.availableProductList;
        // this.getAvailableProduct();
      }
    },
    methods: {
      init: function () {

      },
      close: function () {
        this.$emit('close');
      },
      selectProd: function (entity) { // 选择物流产品
        this.currProd = entity;
      },
      save: $method.save, // 保存
      getAvailableProduct: $method.getAvailableProduct // 运行物流规则（查询可用物流产品）
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.shipping-products');
    },
    mounted: function () {
      this.init();
    }
  };
});