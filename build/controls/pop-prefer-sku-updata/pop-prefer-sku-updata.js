// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/pop-prefer-sku-updata/pop-prefer-sku-updata.html'], function (Api, Global, Data, html) {
  var $method = {
    resetData: function () {
      this.erroMsg = '';
      $('.prefer-sku-updata .saveBtn').removeClass('reading');
      $('.selectFileBtn input').removeAttr('disabled');
    },
    closePop: function () {
      this.resetData();
      $('.selectFileBtn input').val('');
      $('.popup.prefer-sku-updata').hide();
    },
    saveFileClick: function (_el) {
      var that = this;
      var el = _el.target;
      var files = $('.selectFileBtn input').prop('files');
      if (files.length > 0) {
        that.erroMsg = '';
        if (!$(el).hasClass('reading')) {
          $(el).addClass('reading');
          $('.selectFileBtn input').attr('disabled', 'disabled');
          /* var reader = new FileReader();//新建一个FileReader
           reader.readAsText(files[0], "UTF-8");//读取文件 
           reader.onload = function (evt) { //读取完文件之后会回来这里
             that.updataFileDev(evt.target.result);
           }*/
          that.updataFileDev();
        }
      } else {
        //未选择文件报错
        that.erroMsg = 'plzSelectFile';
      }
    }
  };
  return {
    template: html,
    props: ['open'],
    data: function () {
      return {
        erroMsg: '',
        fileName: '',
        file: null//记录所选择的file对象
      };
    },
    watch: {
      // open: function (val) {
      //   var _index = $('.selectFileBtn input').val().lastIndexOf('\\');
      //   this.fileName = $('.selectFileBtn input').val().substring(_index + 1);
      // }
    },
    methods: {
      init: function () {
        var that = this;
        // $('.selectFileBtn input').change(function () {
        //   var _index = $(this).val().lastIndexOf('\\');
        //   that.fileName = $(this).val().substring(_index + 1);
        // });
      },
      resetData: $method.resetData,
      saveFileClick: $method.saveFileClick,
      closePop: $method.closePop,
      updataFileDev: function (event) {
        var that = this;
        var _stauts = Api.getData.getCode();
        $.upload({
          target: '#uploadForm',
          url: Api.getData.getApiUrl('importSKU'),
          token: Global.option.token,
          callback: function (res) {
            that.$emit('next', res.result);
            $.msg.alert(res.message);
          }
        });
      },
      fileChange: function (event) {
        var that = this;
        var oinput = $('.selectFileBtn input')[0].files[0];
        that.fileName = oinput.name;
      },
      getSKUTemplate: function (_key) {
        Api.set({ key: 'getSKUTemplate', type: 'GET' }, {
          success: function (data, params) {
            if (data.code == Api.getData.getCode().success) {
              Global.fun.redirect(data.result[_key], '_blank');
            }
          }
        });
      }
    },
    mounted: function () {
      this.init();
    },
    created: function () {
      this.resetData();
    },
    updated: function () {
      Global.fun.updataLanguage('.wrapper');
    }
  };
});