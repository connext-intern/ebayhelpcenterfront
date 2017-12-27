// add by gena
define('sandbox', ['global', 'api', 'data'], function (Global, API, Data) {
  return {
    option: {
      page: ['forgetPassword', 'register', 'accountInfo', 'viewCertificationInfo', 'messages'],
      api: ['hasNewMessage','getSsoUrl','getEbayIds','assignSubuser','getorigin']
    },
    init: function () {
      $('body').addClass('sb');
      document.title = "SandBox eDIS International Shipping";
      var _config = Global.option.isFile ? Global.file : Global.dev;
      // 去掉链接
      this.option.page.forEach(function (element) {
        _config.page.sellers[element] = '';
      }, this);
      this.option.api.forEach(function (element) {
        _config.api.sellers[element] = '';
      }, this);
      // dom class | 事件
      $('.dashboard-right .btns a').addClass('btn disabled');
      $('.preferences-adr .page-wrapper a').addClass('disabled');
      $('.preferences-deliver .page-wrapper a').addClass('disabled');
      $('.preferences-sku .page-wrapper a').addClass('disabled');
      $('.order .page-wrapper .item-list').find('a').addClass('btn disabled');
      $('.order .page-wrapper .footer-order a').addClass('btn disabled');
      // 设置（单独处理，只保留两个菜单）
      Data.preferences.menu[0].item.splice(0, 1);
      Data.preferences.menu[0].item.splice(1, 1);
      Data.preferences.menu[0].item.splice(1, 1);
      Data.preferences.menu[0].item.splice(2, 1);
      // 重写方法
      $.msg = {
        confirm: function (msg, callback) {},
        alert: function (msg) {},
        confirmLan: function (strLanguage, callback) {},
        alertLan: function (strLanguage) {}
      }
    }
  };
});