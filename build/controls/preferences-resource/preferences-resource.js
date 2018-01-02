// 订单来源 add by gena
define(['api', 'global', 'text!/build/controls/preferences-resource/preferences-resource.html'], function (Api, Global, html) {
  var $method = {
    save: function () {
      var _this = this;
      var params = {
        orderSource: _this.orderSource
      };
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'setOrderSource', type: 'PUT', isToken: false, data: params }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.$emit('next', _this.operator);
          }
        }
      });
    },
    init_event: function () {
      var _this = this;
      //初始化选择项
      var checkBoxHandle = new $.checkBox($(".popup.preferences .checkBox"), function (_answear) {
        _this.orderSource = $(this).attr('data-key');
      });
    }
  };
  return {
    template: html,
    props: ['operator'],
    data: function () {
      return {
        orderSource: ''
      };
    },
    methods: {
      init: function () {
        this.orderSource = Global.option.user.orderSource;
        this.init_event();
      },
      save: $method.save,
      init_event: $method.init_event
    },
    mounted: function () {
      this.init();
    }
  };
});