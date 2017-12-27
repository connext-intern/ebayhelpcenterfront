// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/printbox-order/printbox-order.html'], function (Api, Global, Data, html) {
  var $method = {
    getPrintPreference: function () {
      var _this = this;
      var _stauts = Api.getData.getCode();
      Api.set({
        key: 'getPrintPreference',
        type: 'GET',
        isToken: false,
        data: {}
      }, {
        success: function (_data, params) {
          if (_data.code == _stauts.success) {
            _this.item = {} || _this.item;
            _this.item.buyerId = _data.result.buyerId;
            _this.item.sellerId = _data.result.sellerId;
            _this.item.itemId = _data.result.itemId;
            _this.item.skuCode = _data.result.skuNo;
            _this.item.declareNameCh = _data.result.nameZh;
            _this.item.declareNameEn = _data.result.nameEn;
            _this.item.quantity = _data.result.quantity;
            _this.item.productPro = _data.result.property;

            _this.getGenerateCoverSheet();
            document.getElementById('thermal-paper').innerHTML = "";
          }
        }
      });
    },
    getJson: function (str) {
      try {
        return !!str ? JSON.parse(str) : {};
      } catch (error) {
        return {}
      }
    },
    setTableWidth: function () {
      var that = this;
      var _total = 0;
      var _width = $('.printBox .tableWrapper').width();
      var lineObj = {
        itemId: 16,
        skuCode: 15,
        productPro: 20,
        quantity: 9,
        declareNameCh: 20,
        declareNameEn: 20
      };
      $.each(that.item, function (k, v) {
        if (k == 'buyerId' || k == 'sellerId') {
          if (v) {
            $('.printBox .grayBg .' + k).show();
          } else {
            $('.printBox .grayBg .' + k).hide();
          }
        } else {
          if (v) {
            _total += lineObj[k];
            $('.printBox .tableWrapper .' + k).parent().show();
          } else {
            $('.printBox .tableWrapper .' + k).parent().hide();
          }
        }
      });
      $.each(lineObj, function (k, v) {
        var _per = v / _total;
        _per = _per *(_width);
        // $('.printBox .tableWrapper .' + k).parent().width(_per);
        $('.printBox .tableWrapper .' + k).width(_per);
      });
    },
    html2Pdf: function (el, callback) {
      var that = this;
      var canvas = document.createElement("canvas");

      var ratio = 4;
      var w = $(el).width(),
        h = $(el).height();
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      var context = canvas.getContext("2d");
      context.scale(3.988, 3.988);

      html2canvas($(el), {
        canvas: canvas,
        onrendered: function (canvas) {
          var url = canvas.toDataURL('image/jpeg', 1);
          var canvas2 = document.createElement("canvas");
          canvas2.width = canvas.width;
          canvas2.height = canvas.height;
          canvas2.style.width = canvas2.width + "px";
          canvas2.style.height = canvas2.height + "px";
          var cxt2 = canvas2.getContext("2d");
          var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          cxt2.putImageData(imgData, 0, 0);
          var url = canvas2.toDataURL('image/jpeg', 1);
          if (that.from.type == 0) {
            //a4
            var pointArr = [
              [4, 5],
              [106, 5],
              [4, 128],
              [106, 128]
            ]
            var yushu = that.printTime % 4;
            if (that.printTime > 0 && yushu == 0) that.doc.addPage();
            that.doc.addImage(url, 'JPEG', pointArr[yushu][0], pointArr[yushu][1], 100, 100);
          } else {
            //热敏
            if (that.printTime > 0) that.doc.addPage();
            that.doc.addImage(url, 'JPEG', 0, 0, 100, 100);
          }

          callback();
        },
        background: "#000",
        allowTaint: true ///避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
      });
    },
    getGenerateCoverSheet: function () {
      var that = this;
      var _data = {
        paperType: that.from.type,
        packageIds: that.from.ids.join(',')
      }
      //请求打印数据
      Api.set({
        key: 'generateCoverSheet',
        type: 'GET',
        data: _data,
        isToken: false
      }, {
        success: function (data, params) {
          if (data.code == Api.getData.getCode().success) {
            that.boxArr = data.result;
            that.printTime = 0;
            if (that.from.type == 0) {
              that.doc = new jsPDF();
            } else {
              that.doc = new jsPDF('p', 'mm', [100, 100]);
            }
            that.renderHtml(0);
          }
        }
      });
    },
    showLoading: function (_cur, _max) {
      if ($('.popup.printLoading').length < 1) {
        $('body').append("<div class='popup printLoading' >\
          <div class='mask'></div>\
          <div class='content'>\
              <div class='loadImg'></div>\
              <p>" + languages['loading'] + "</p>\
            </div>\
          </div >\
        ");
      }
      $('.popup.printLoading').show();
      $('.popup.printLoading p').html(languages['loading'] + ' ' + _cur + ' / ' + _max);
    },
    hideLoading: function () {
      $('.popup.printLoading').hide();
    },
    renderHtml: function (_index) {
      var that = this;
      var _data = that.boxArr[_index];
      //更新Loading
      that.showLoading(_index + 1, that.boxArr.length);
      //初始化数据
      that.boxArr[_index].lengther = 0;
      $('.printBox .tableWrapper table').empty();
      $('.printBox .tableWrapper table').append('<tr><th><span class="itemId">Item ID</span></th><th><span class="skuCode">' + languages['SKUNumber'] + '</span></th><th><span class="declareNameCh">' + languages['skuCnName'] + '</span></th><th><span class="declareNameEn">' + languages['skuEnName'] + '</span></th><th><span class="quantity">' + languages['quantity'] + '</span></th><th><span class="productPro">' + languages['pdtProfile'] + '</span></th></tr>');
      //循环构建
      for (var i = 0; i < _data.coverSkuList.length; i++) {
        //数据转换
        var _str = '';
        var _obj = that.getJson(_data.coverSkuList[i].productPro);
        $.each(_obj, function (a, s) {
          _str += a;
          _str += ":";
          _str += s;
          _str += "  ";
        });
        _data.coverSkuList[i].productPro = _str;
        //计算数量
        that.boxArr[_index].lengther += parseInt(_data.coverSkuList[i].quantity);
        //添加数据
        $('.printBox .tableWrapper table').append('<tr><th><span class="itemId">' + _data.coverSkuList[i].itemId + '</span></th><th><span class="skuCode">' + _data.coverSkuList[i].skuCode + '</span></th><th><span class="declareNameCh">' + _data.coverSkuList[i].declareNameCh + '</span></th><th><span class="declareNameEn">' + _data.coverSkuList[i].declareNameEn + '</span></th><th><span class="quantity">' + _data.coverSkuList[i].quantity + '</span></th><th><span class="productPro">' + _data.coverSkuList[i].productPro + '</span></th></tr>');
      }
      //描写头部总结
      $('.printBox .grayBg .buyerId .val').html(_data.buyerId);
      $('.printBox .grayBg .sellerId .val').html(_data.sellerId);
      $('.printBox .grayBg .lengther .num').html(_data.lengther);
      //条形码
      $('.printBox .nav .super img').attr('src', _data.barcodeStr1);
      $('.printBox .nav .superNum em').html(_data.trackingNumber);
      $('.printBox .logo span').html(_data.trackingNumber ? _data.trackingNumber.substr(-7, 4).replace(/\b(0+)/, '') : '');
      $('.printBox .reference img').attr('src', _data.barcodeStr2);
      $('.printBox .referenceNum em').html(_data.referenceNumber);
      //是否带电
      var sImg = '';
      if (_data.isBattery) {
        sImg = '../../../assets/imgs/printbox/print_order01.jpg';
      } else {
        sImg = '../../../assets/imgs/printbox/print_order01_0.jpg';
      }
      $('.printBox .nav .leftS img').attr('src', sImg);
      //更新发货地址
      if (_data.address) {
        $('.printBox .grayBg table.adr .sendAdr .adrHeight').empty().html('<p>' + (_data.address.contactName||'') + '</p><p>' + (_data.address.phone||'') + '</p><p>' + (_data.address.country||'') + ' ' + (_data.address.province||'') + '</p><p>' + (_data.address.city||'') + ' ' + (_data.address.county||'') + '</p><p>' + (_data.address.address1||'') + ' ' + (_data.address.address2||'') + ' ' + (_data.address.address3||'') + '</p><p>' + (_data.address.zipcode||'') + '</p>');
      }
      //更新仓库地址
      if (_data.site) {
        $('.printBox .grayBg table.adr .storeAdr .adrHeight').empty().html('<p>' + (_data.site.contactName||'') + '</p><p>' + (_data.site.contactTel||'') + '</p><p>' + (_data.site.country||'') + ' ' + (_data.site.province||'') + '</p><p>' + (_data.site.city||'') + ' ' + (_data.site.area||'') + '</p><p>' + (_data.site.address1||'') + '</p><p>' + (_data.site.address2||'') + ' ' + (_data.site.address3||'') + '</p>');
      }
      //更新宽度和隐藏不显示
      that.setTableWidth();

      document.getElementById('thermal-paper').innerHTML += $('.printBox').html();

      //添加HTML2CANVAS2PDF
      that.html2Pdf('.printBox .printSampleWrapper', function () {
        that.printTime++;
        if (that.printTime < that.boxArr.length) {
          that.renderHtml(that.printTime);
        } else {
          that.hideLoading();
          $('#thermal-paper').removeClass('remin a4').addClass(that.from.type==1?'remin':'a4');
          var _version = $.browser.isIE()?'ie':'';
          _version= $.browser.isOpera()?'opera':_version;
          _version= $.browser.isSafari()?'safari':_version;
          _version= $.browser.isFF()?'ff':_version;
          _version= $.browser.isChrome()?'chrome':_version;
          $('#thermal-paper').removeClass('ie ff chrome safari opera').addClass(_version);

          $('#txtrealcontent').val(that.doc.output('datauristring'));
          $('.popup.printIframe').show();
          $('#printIframe').attr("src", "../../assets/web/viewer.html");
        }
      });
    },
    dev_getUrlByStr: function (_str) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      _data.base64Str = str.replace('data:application/pdf;base64,', '');
      Api.set({
        key: 'upload',
        type: 'POST',
        data: _data
      }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            window.open(data.result, '_blank');
          }
        }
      });
    }
  };
  return {
    template: html,
    props: ['papertype', 'printids', 'printcall'],
    data: function () {
      return {
        item: {
          buyerId: true,
          sellerId: true,
          itemId: true,
          skuCode: true,
          declareNameCh: true,
          declareNameEn: true,
          quantity: true,
          productPro: true
        },
        from: {},
        boxArr: [],
        doc: null,
        printTime: 0
      };
    },
    watch: {
      papertype: function (val) {
        var that = this;
        that.from.type = val;
        document.getElementById('paperType').value = val;
      },
      printids: function (val) {
        var that = this;
        that.from.ids = val;
        that.getPrintPreference();
      },
      printcall: function (val) {
        var that = this;
        that.from.call = val;
        that.doc.save('print.pdf');
        //that.doc.output('datauri');
      }
    },
    methods: {
      init: function () {
        var that = this;
        $('.popup.printIframe .close').click(function () {
          $('.popup.printIframe').hide();
          $('#txtrealcontent').val('');
          $('#printIframe').removeAttr("src");
        });
        // if($('.printBox .tableWrapper table tr').length>=4){
        //   $('.printBox .tableWrapper').addClass('hasMore');
        // }
      },
      //@page
      setTableWidth: $method.setTableWidth,
      html2Pdf: $method.html2Pdf,
      getGenerateCoverSheet: $method.getGenerateCoverSheet,
      getPrintPreference: $method.getPrintPreference,
      getJson: $method.getJson,
      dev_getUrlByStr: $method.dev_getUrlByStr,
      renderHtml: $method.renderHtml,
      showLoading: $method.showLoading,
      hideLoading: $method.hideLoading
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.printBox');
    }
  };
});
