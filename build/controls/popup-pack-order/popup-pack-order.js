// 合并包裹 add by gena
//#TODO 订单合并规则|
define(['api', 'global', 'data',
  'text!/build/controls/popup-pack-order/popup-pack-order.html'
], function (Api, Global, Data, html) {
  var $method = {
    save: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var sourcePackageIds = [];
      this.list.mergePackageList.forEach(function (element) {
        if (element.isSelected) {
          sourcePackageIds.push(element.packageId);
        }
      }, this);
      if (sourcePackageIds.length == 0) return;
      var params = {
        packageId: _this.item.packageId,
        packageIds: sourcePackageIds,
        addrPackageId: _this.currAddress.packageId,
        version: _this.item.version
      };
      Api.set({
        key: 'combinePackages',
        isToken: false,
        data: params
      }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.isShow = 0;
            _this.clickSaveCount = 0;
            _this.$emit('refresh');
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['item', 'list', 'operator'],
    data: function () {
      return {
        currAddress: null,
        // list: null, // 待处理订单_可合单包裹
        isShow: 0, //显示当前弹层
        clickSaveCount: 0,
        filterAddressList: []
      };
    },
    watch: {
      list: function (newlist) {
        var _this = this;
        _this.currAddress = newlist.addressList && newlist.addressList.length > 0 ? newlist.addressList[0] : null;
      },
      operator: function (val) {
        this.isShow = val;
      }
    },
    methods: {
      init: function () {

      },
      selectAddressEvent: function (address) { // 选择地址
        this.currAddress = address;
      },
      selectPackage: function (package, index) { // 选择可合并的包裹
        package.isSelected = !package.isSelected;
        this.list.mergePackageList.splice(index, 1, package);
      },
      // getCombinePackages: $method.getCombinePackages, // 待处理订单_获取可合单包裹
      saveFirst: function () { // 合并包裹
        var that = this;
        var sourcePackageIds = [];
        this.list.mergePackageList.forEach(function (element) {
          if (element.isSelected) {
            sourcePackageIds.push(element.packageId);
          }
        }, this);
        if (sourcePackageIds.length == 0) return;
        if (this.list.addressList.length > 1) {
          that.filterAddressList = [];

          this.list.addressList.forEach(function (element) {
            if (element.packageId == that.item.packageId) {
              that.filterAddressList.push(element);
            }
            if (sourcePackageIds.indexOf(element.packageId) >= 0) {
              that.filterAddressList.push(element);
            }
          }, this);
          this.clickSaveCount++;
          return;
        }
        this.save();
      },
      save: function () { // 保存
        $method.save.call(this);
      }
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.pack-order');
    },
    mounted: function () {
      this.init();
    }
  };
});