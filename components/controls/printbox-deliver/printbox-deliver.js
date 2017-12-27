define(['api', 'global', 'data', 'text!/build/controls/printbox-deliver/printbox-deliver.html'], function (Api, Global, Data, html) {
  var $method = {
    getJson: function (str) {
      try {
        return !!str ? JSON.parse(str) : {};
      } catch (error) {
        return {}
      }
    },
    html2Pdf: function (el, callback) {
      var that = this;
      var canvas = document.createElement("canvas");
      canvas.width = $(el).css('width').replace('px', '') * 4;
      canvas.height = $(el).css('height').replace('px', '') * 4;
      canvas.style.width = $(el).css('width');
      canvas.style.height = $(el).css('height');
      var context = canvas.getContext("2d");
      context.scale(4, 4);

      html2canvas($(el), {
        canvas: canvas,
        onrendered: function (canvas) {
          var url = canvas.toDataURL('image/jpeg', 1);
          //var doc = new jsPDF('l', 'pt', 'a3');//l是横向
          //var doc = new jsPDF('p', 'mm', [290, 210]);//p是纵向
          if (that.printTime > 1) {
            that.doc.addPage();
          }
          that.doc.addImage(url, 'JPEG', 0, 0, 595, 842);
          callback();
        },
        background: "#ccc",
        allowTaint: true ///避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
      });
    },
    appendPdt: function (_obj) {
      this.pdtAccount++;
      var _html = '<li><p>' + this.pdtAccount + '</p><p>' + _obj.productName + '</p><p>' + _obj.type + '</p><p>' + _obj.packageNum + '</p></li>';
      $('.printBoxDeliver .packageLister').append(_html);
      var _height = this.getArrHeight($('.printBoxDeliver .packageLister li'));
      this.pdtsHeight = _height;
      if (_height >= 438) {
        return false;
      }
      return true;
    },
    emptyPdts: function () {
      $('.printBoxDeliver .packageLister').html('<div class="line1"></div><div class="line2"></div><div class="line3"></div><li><p>' + languages['idNum'] + '</p><p>' + languages['product'] + '</p><p>' + languages['transaction-method'] + '</p><p>' + languages['package-nums'] + '</p></li>');
    },
    getArrHeight: function (_liArr) {
      var _height = 0;
      for (var i = 0; i < _liArr.length; i++) {
        _height += $(_liArr[i]).height();
      }
      return _height;
    },
    readList: function (_start, _length) {
      console.log("@start to read@");
      //console.log(_start,_length);
      var that = this;
      that.showLoading(that.pageNum + 1, that.comeVal.length);
      that.emptyPdts();
      for (var i = _start; i < _length; i++) {
        var _boo = that.appendPdt(that.item.products[i]);
        if (!_boo) {
          $('.printBoxDeliver .packageLister li').eq(that.pdtAccount).remove();
          that.pdtAccount--;
          break;
        }
      }
      //return;
      if (that.pageNum == 0) {
        $('.printBoxDeliver .dliverheader').show();
      } else {
        $('.printBoxDeliver .dliverheader').hide();
      }
      that.pageNum++;
      that.printTime++;
      if (that.pdtAccount < that.item.products.length) {
        $('.signBlock').hide();
        $('.printBoxDeliver .packageLister').addClass('nofull');
        this.html2Pdf($('.printBoxDeliver .printSampleWrapper'), function () {
          that.readList(that.pdtAccount, that.item.products.length);
        });
      } else {
        $('.signBlock').show();
        $('.printBoxDeliver .packageLister').removeClass('nofull');
        this.html2Pdf($('.printBoxDeliver .printSampleWrapper'), function () {
          that.packageNum++;
          if (that.packageNum == that.comeVal.length) {
            /* << 保存 */
            //window.open(that.doc.output('datauristring'),'_blank');
            //that.doc.save('print.pdf');
            //that.doc.output('datauri');
            //that.dev_getUrlByStr(that.doc.output('datauristring'));

            //var _url=Api.getData.getPageUrl('viewer');
            //window.open('../../assets/web/viewer.html','_blank');
            $('#txtrealcontent').val(that.doc.output('datauristring'));
            $('.popup.printIframe').show();
            $('#printIframe').attr("src", "../../assets/web/viewer.html");
            /* >> 保存 */
            console.log("所有包裹完成");
            that.hideLoading();
          } else {
            that.readItem();
            console.log("一份包裹完成");
          }
        });
      }
    },
    showLoading: function (_cur, _max) {
      if ($('.popup.printLoading').length < 1) {
        $('body').append("<div class='popup printLoading'>\
            <div class='mask'></div>\
            <div class='content'>\
              <div class='loadImg'></div>\
              <p>"+ languages['loading'] + "</p>\
            </div>\
          </div>\
          ");
      }
      $('.popup.printLoading').show();
      $('.popup.printLoading p').html(languages['loading'] + ' ' + _cur + ' / ' + _max);
    },
    hideLoading: function () {
      $('.popup.printLoading').hide();
    },
    readItem: function () {
      var that = this;
      that.pageNum = 0;
      that.pdtsHeight = 0;
      that.pdtAccount = 0;
      that.item = that.comeVal[that.packageNum];
      $('.printBoxDeliver .packageTotal b').html(that.item.packageNum);
      $('.printBoxDeliver').find('.sellerA').html(that.item.seller);
      $('.printBoxDeliver').find('.contectWayA').html(that.item.phone);
      $('.printBoxDeliver').find('.isAcountA').html(that.item.isid);
      $('.printBoxDeliver').find('.contentPersonA').html(that.item.contact);
      $('.printBoxDeliver').find('.pickupA').html(that.item.address);
      $('.printBoxDeliver').find('.waterA').html(that.item.receiptId);
      var _src = '../../../assets/imgs/printbox/';
      if (that.item.isBattery == '1') {
        _src += 'print_order01.jpg';
      } else {
        _src += 'print_order01_0.jpg';
      }
      $('.printBoxDeliver .sBatteryImg img').attr("src", _src);
      that.readList(0, that.item.products.length);
    },
    dev_getUrlByStr: function (_str) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      _data.base64Str = _str.replace('data:application/pdf;base64,', '');
      Api.set({ key: 'upload', type: 'POST', data: _data }, {
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
    props: ['printdelivercall'],
    data: function () {
      return {
        item: {},
        comeVal: {},
        doc: null,
        pdtAccount: 0,
        pdtsHeight: 0,
        printTime: 0,
        pageNum: 0,
        packageNum: 0
      };
    },
    watch: {
      printdelivercall: function (val) {
        var that = this;
        that.comeVal = val.result;
        //reset
        that.doc = null;
        that.packageNum = 0;
        that.printTime = 0;
        that.doc = new jsPDF('p', 'pt', 'a4');
        //
        if (val.ids.length > 1) {
          // $.msg.confirmNext(val.ids,function(){
          that.readItem();
          // });
        } else {
          that.readItem();
        }
        //this.html2Pdf($('.printBoxDeliver .printSampleWrapper'));
      }
    },
    methods: {
      init: function () {
        var that = this;
        // if($('.printBox .tableWrapper table tr').length>=4){
        //   $('.printBox .tableWrapper').addClass('hasMore');
        // }

      },
      //@page
      readList: $method.readList,
      appendPdt: $method.appendPdt,
      emptyPdts: $method.emptyPdts,
      getArrHeight: $method.getArrHeight,
      html2Pdf: $method.html2Pdf,
      getJson: $method.getJson,
      readItem: $method.readItem,
      dev_getUrlByStr: $method.dev_getUrlByStr,
      showLoading: $method.showLoading,
      hideLoading: $method.hideLoading
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.printBoxDeliver');
    }
  };
});