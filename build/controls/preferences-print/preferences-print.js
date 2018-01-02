// 打印免单偏好 add by gena
define(['api', 'global',
  'text!/build/controls/preferences-print/preferences-print.html'
], function (Api, Global, html, PopPreferPrint) {
  var $method = {
    updatetPrintPreference: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'updatetPrintPreference',type: 'PUT', isToken: false, data: _this.item }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.$emit('next', _this.operator);
          }
        }
      });
    },
    setTableWidth: function () {
      var _this = this;
      var _total = 0;
      var _hasName = false;
      var lineArr = [13, 15, 20, 20, 9, 19];
      $.each(_this.item, function (k, v) {
          switch (k) {
              case 'itemId':
                  if (v) _total += 13;
                  break;
              case 'skuNo':
                  if (v) _total += 15;
                  break;
              case 'property':
                  if (v) _total += 19;
                  break;
              case 'quantity':
                  if (v) _total += 9;
                  break;
              case 'nameZh':
                  if (v) _total += 20;
                  break;
              case 'nameEn':
                  if (v) _total += 20;
                  break;
          }
      });
      for (var i = 0; i < lineArr.length; i++) {
          var _per = lineArr[i] / _total;
          _per = _per * 375;
          $('.line' + (i + 1)).css('width', _per + 'px');
      }
    },
    init_event: function () {
      var _this = this;
      new $.checkBox($('.popup.print .checkBox'), function (_answear) {
        var key = $(this).attr('data-key');
        _this.item[key] = !$(this).hasClass('cur');
        _this.setTableWidth();
      });
    }
  };
  return {
    template: html,
    props: ['operator'],
    data: function () {
      return {
        item: {
          itemId: false,
          skuNo: false,
          nameZh: false,
          nameEn: false,
          property: false,
          quantity: false,
          sellerId: false,
          buyerId: false
        }
      };
    },
    watch:{
      operator:function(val){
        
      }
    },
    methods: {
      init: function () {
        this.setTableWidth();
        this.init_event();
      },
      setTableWidth: $method.setTableWidth, //add by robin
      preview: $method.preview, //预览
      updatetPrintPreference: $method.updatetPrintPreference, //更新打印偏好
      prev: function () {
        this.$emit('prev', this.operator);
      },
      preview: function () {
        this.$emit('preview',this.item);
      },
      init_event: $method.init_event
    },
    mounted: function () {
      this.init();
    }
  };
});