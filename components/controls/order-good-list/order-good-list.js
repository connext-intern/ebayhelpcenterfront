// 物品清单 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/order-good-list/order-good-list.html',
  '/build/controls/popup-pack-order/popup-pack-order.js',
  '/build/controls/popup-edit-order/popup-edit-order.js',
  '/build/controls/order-history-shipping/order-history-shipping.js'
], function (Api, Global, Data, html, PopupPackOrder, PopupEditOrder, OrderHistoryShipping) {
  var $method = {
    hisLogisticsNumberEvent: function (item, ev) {
      var selfTarget = $('.ui-tooltip-container');
      var target = ev.target || ev.srcElement;
      var _left = $(target).position().left, _top = $(target).position().top, _width = $(target).outerWidth(true), _height = $(target).outerHeight(true);
      $('.ui-tooltip-container').css({ 'left': (_left - 87 / 2) + 'px', 'top': (_top + _height + 10) + 'px' });
      this.historyRecords = item.trackingRecords;
      this.type = 'history';
    },
    getCombinePackages: function () {
      var _this = this;
      var params = {
        packageId: _this.item.packageId,
        buyerId: _this.item.transactionList[0].buyerUserId,
        sellerId: _this.item.sellerToken
      };
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'getCombinePackages', type: 'GET', isToken: false, data: params }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.packlist = data.result;
          }
        }
      });
    },
    splitPackages: function (orderLineItem) {
      var _this = this;
      var _stauts = Api.getData.getCode();
      var params = {
        packageId: _this.item.packageId,
        orderLineItems: orderLineItem,
        version: _this.item.version
      };
      Api.set({ key: 'splitPackages', isToken: false, data: params }, {
        success: function (data, params) {
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
        type: '',// 点击按钮
        list: [],
        packlist: null,
        declare: Data.order.status.declare,
        pay: Data.order.status.pay,
        countries: Data.preferences.select.country,
        isBattaries: Data.order.select.isLiBattery,
        shipStatus: Data.order.status.ship,//所有发货状态信息
        transitionEntity: null, // 当前使用的交易实体
        historyRecords: [], // 历史物流单号
        clickPackOrder: 0 // 是否合单
      };
    },
    components: {
      'order-history-shipping': OrderHistoryShipping,
      'popup-pack-order': PopupPackOrder,
      'popup-edit-order': PopupEditOrder
    },
    methods: {
      splitPackages: function (item) { // 拆单
        $method.splitPackages.call(this, item.orderLineItem);
      },
      getCombinePackages: $method.getCombinePackages,
      refresh: function () { //刷新
        this.$emit('refresh');
      },
      getName: function (arr, code) {
        if (code === null) return '';
        var str = '';
        arr.forEach(function (element) {
          if (element.code == code.toString()) {
            str = element.lg;
          }
        }, this);
        return str;
      },
      getJson: function (str) {
        try {
          return !!str ? JSON.parse(str) : {};
        } catch (error) {
          return {}
        }
      },
      hisLogisticsNumberEvent: $method.hisLogisticsNumberEvent // 历史物流单号
    },
    watch: {
      item: function (newentity) {
        this.list = newentity.transactionList;
        this.getCombinePackages();
      }
    },
    mounted: function () {

    }
  };
});