// 编辑包裹信息 add by gena
define(['api', 'global', 'data',
  'text!/build/controls/popup-edit-package/popup-edit-package.html'
], function (Api, Global, Data, html) {
  return {
    template: html,
    props: ['item'],
    data: function () {
      return {
        isClickSave: 0,
        params: {
          packageId: 0,
          packageLength: '',
          packageWidth: '',
          packageHeight: '',
          sellerRemark: '',
          version: ''
        },
        errors: {

        }
      };
    },
    watch: {
      item: function (newentity) {
        if (newentity) {
          this.params.packageId = newentity.packageId;
          this.params.packageLength = newentity.packageLength;
          this.params.packageWidth = newentity.packageWidth;
          this.params.packageHeight = newentity.packageHeight;
          this.params.packageWeight = newentity.packageWeight;
          this.params.sellerRemark = newentity.sellerRemark;
          this.params.version = newentity.version;
        }
      }
    },
    methods: {
      close: function () {
        this.isClickSave = false;
        this.$emit('close');
      },
      save: function () { // 保存编辑包裹信息
        var _this = this;
        this.isClickSave++;
        if (_this.hasError()) return;
        var _stauts = Api.getData.getCode();
        $.loading.show({ dom: 'body' });
        Api.set({ key: 'updatePackage', type: 'PUT', isToken: false, data: this.params }, {
          success: function (data, params) {
            $.loading.hide();
            if (data.code == _stauts.success) {
              _this.$emit('refresh');
              _this.close();
            }
          }
        });
      },
      init: function () {

      },
      hasError: function () {
        var count = 0;
        for (ver in this.errors) {
          this.errors[ver] = '';
        }
        if (!this.isClickSave) return false;
        if ((!this.params.packageLength) || !$.validate(['dignum2'], this.params.packageLength).boo) {
          this.errors.packageLength = "err3";
          count++;
        }
        if ((!this.params.packageLength) || !$.validate(['requied'], this.params.packageLength).boo) {
          this.errors.packageLength = "err1";
          count++;
        }
        if ((!this.params.packageWidth) || !$.validate(['dignum2'], this.params.packageWidth).boo) {
          this.errors.packageWidth = "err3";
          count++;
        }
        if ((!this.params.packageWidth) || !$.validate(['requied'], this.params.packageWidth).boo) {
          this.errors.packageWidth = "err1";
          count++;
        }
        if ((!this.params.packageHeight) || !$.validate(['dignum2'], this.params.packageHeight).boo) {
          this.errors.packageHeight = "err3";
          count++;
        }
        if ((!this.params.packageHeight) || !$.validate(['requied'], this.params.packageHeight).boo) {
          this.errors.packageHeight = "err1";
          count++;
        }
        if ((!this.params.packageWeight) || !$.validate(['dignum1'], this.params.packageWeight).boo) {
          this.errors.packageWeight = "err3";
          count++;
        }
        if ((!this.params.packageWeight) || !$.validate(['requied'], this.params.packageWeight).boo) {
          this.errors.packageWeight = "err1";
          count++;
        }
        return count > 0;
      },
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.package-info');
    },
    mounted: function () {
      this.init();
    }
  };
});