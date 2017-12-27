// 添加地址 add by gena
define(['api', 'global', 'text!/build/controls/preferences-address/preferences-address.html'], function (Api, Global, html) {
  var $method = {
    init_event: function () {
      var _this = this;
    }
  };
  return {
    template: html,
    props: ['item', 'operator'], // operator 0添加 1编辑
    data: function () {
      return {
        showErroMsg: false
      };
    },
    methods: {
      init: function () {
        this.init_event();
      },
      init_event: $method.init_event,
      save: function () {
        var _this = this;
        _this.$emit('next', _this.operator);
      }
    },
    mounted: function () {
      this.init();
    }
  };
});