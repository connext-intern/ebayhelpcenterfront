// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/pop-prefer-address-return/pop-prefer-address-return.html'], function (Api, Global, Data, html) {
  var $html = $(html);
  $.each($html.find('[inputKey]'), function (i, v) {
    var _key = $(v).attr('inputKey');
    $(v).attr('v-bind:class', 'modelManager.' + _key + '.isErro?"erro":""');
    $(v).find('input').attr({
      'v-model': 'modelManager.' + _key + '.val',
      'v-on:blur': 'inputBlurFun("' + _key + '")',
      'v-on:input': 'inputTypingFun("' + _key + '")'
    })
  });
  $.each($html.find('[selectKey]'), function (i, v) {
    var _key = $(v).attr('selectKey');
    $(v).attr('v-bind:class', 'modelManager.' + _key + '.isErro?"erro":""');
    $(v).find('.selectVal').html('{{modelManager.' + _key + '.val}}');
    $(v).find('.selectOptions').html('<li v-for=\'(itemValue,itemIndex) in modelManager.' + _key + '.options\' v-bind:class=\'modelManager.' + _key + '.index==itemIndex?"cur":""\' v-on:click=\'setModelIndex({key:' + _key + ',indx:itemIndex})\'>{{itemValue}}</li>')
  });
  var $method = {
    closePopup: function () {
      var that = this;
      that.resetData();
      that.$emit('next', 'closePop');
    },
    resetData: function () {
      var that = this;
      that.erroArr = [];
      //input
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') v.val = '';
        v.isErro = false;
      });
      //checkBox
      that.modelManager.isDefault.radios = [false];
      that.modelManager.isDefault.selected = [];
    },
    resetSelectOptions: function (_key) {
      var that = this;
      that.modelManager[_key].index = 0;
      that.modelManager[_key].val = that.modelManager[_key].options[0];
      var _length = that.modelManager[_key].codes.length;
      that.modelManager[_key].codes.splice(1, _length - 1);
      that.modelManager[_key].options.splice(1, _length - 1);
    },
    getSelectCode: function (_key) {
      var that = this;
      var _index = that.modelManager[_key].index;
      return that.modelManager[_key].codes[_index];
    },
    setInputByValue: function (_key, _val) {
      var that = this;
      that.modelManager[_key].val = _val;
    },
    setSelectByValue: function (_key, _val) {
      var that = this;
      var _index = 0;
      for (var i = 0; i < that.modelManager[_key].codes.length; i++) {
        if (that.modelManager[_key].codes[i] == _code) _index = i;
      }
      that.setSelectByIndex(_key, _index);
    },
    setSelectByIndex: function (_key, _index) {
      var that = this;
      var _options = that.modelManager[_key].options;
      that.modelManager[_key].val = _options[_index];
      that.modelManager[_key].index = _index;
    },
    checkInputVaild: function (_key) {
      var _result;
      var _screenArr = this.modelManager[_key].vaild;
      _screenArr = (_screenArr == '') ? [] : _screenArr.split('&');
      _result = $.validate(_screenArr, this.modelManager[_key].val);
      this.findErro(_key, _result.boo);
      return _result.boo;
    },
    checkSelectVaild: function (_key) {
      var _boo = true;
      if (this.modelManager[_key].vaild == 'requied') {
        if (this.modelManager[_key].index == 0) {
          _boo = false;
        }
      }
      this.findErro(_key, _boo);
      return _boo;
    },
    checkBoxVaild: function (_key) {
      var _boo = true;
      if (this.modelManager[_key].vaild == 'requied') {
        if (this.modelManager[_key].selected.length == 0) {
          _boo = false;
        }
      }
      this.findErro(_key, _boo);
      return _boo;
    },
    findErro: function (_key, _boo) {
      var _keyIndex = -1;
      if (this.erroArr.length > 0) {
        for (var i = 0; i < this.erroArr.length; i++) {
          if (this.erroArr[i] == _key) _keyIndex = i;
        }
      }
      if (_boo) {
        if (_keyIndex >= 0) this.erroArr.splice(_keyIndex, 1);
      } else {
        if (_keyIndex < 0) this.erroArr.push(_key);
      }
      this.modelManager[_key].isErro = !_boo;
    },
    inputBlurFun: function (_key) {
      this.checkInputVaild(_key);
      if (_key == 'zipcode') {
        this.dev_getCountryByZipCode();
      }
    },
    inputTypingFun: function (_key) {
      this.findErro(_key, true);
    },
    fun_selectClick: function (_key, _index) {
      var that = this;
      var _curIndex = that.modelManager[_key].index;
      if (_index != _curIndex) {
        that.setSelectByIndex(_key, _index);
        switch (_key) {
          case 'country':
            if (_index > 0) {
              that.dev_getSelectOptionsData(_key, 'province', function (_options) {
                that.back_getSelectOptionsData('province', _options);
              });
            } else {
              that.resetSelectOptions('province');
            }
            that.resetSelectOptions('city');
            that.resetSelectOptions('county');
            break;
          case 'province':
            if (_index > 0) {
              that.dev_getSelectOptionsData(_key, 'city', function (_options) {
                that.back_getSelectOptionsData('city', _options);
              });
            } else {
              that.resetSelectOptions('city');
            }
            that.resetSelectOptions('county');
            break;
          case 'city':
            if (_index > 0) {
              that.dev_getSelectOptionsData(_key, 'county', function (_options) {
                that.back_getSelectOptionsData('county', _options);
              });
            } else {
              that.resetSelectOptions('county');
            }
            break;
        }
        that.checkSelectVaild(_key);
      }
    },
    fun_checkRadioClick: function (_key, _index) {
      var that = this;
      var type = that.modelManager[_key].checkType;
      if (type == 'multi') {
        //复选
        that.modelManager[_key].radios.splice(_index, 1, !that.modelManager[_key].radios[_index]);
        if (that.modelManager[_key].radios[_index]) {
          that.modelManager[_key].selected.push(_index);
        } else {
          var _delIndex;
          for (var i = 0; i < that.modelManager[_key].selected.length; i++) {
            if (that.modelManager[_key].selected == _index) _delIndex = i;
          }
          that.modelManager[_key].selected.splice(_delIndex, 1);
        }
      } else {
        //单选
      }
    },
    dev_getCountryByZipCode: function () {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      var _zipCode = this.modelManager.zipcode.val;
      if (_zipCode.length > 0) {
        _data = {
          zipCode: _zipCode
        };
        Api.set({ key: 'getCountryByZipCode', type:'GET', isToken: false, data: _data }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              that.back_getCountryByZipCode('country', data.result.countryCode, data.result.countryName);
              that.back_getCountryByZipCode('province', data.result.stateCode, data.result.stateName);
              that.back_getCountryByZipCode('city', data.result.cityCode, data.result.cityName);
            }
          }
        });
      } else {
        that.setInputByValue('country', '');
        that.setInputByValue('province', '');
        that.setInputByValue('city', '');
      }
    },
    back_getCountryByZipCode: function (_key, _code, _name) {
      this.modelManager[_key].val = _name;
      this.modelManager[_key].code = _code;
    },
    dev_getSelectOptionsData: function (_key, _type, _callback) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      var _code = that.getSelectCode(_key);
      _data = {
        code: _code,
        type: _type
      };
      Api.set({ key: 'getSubRegionByCode', type: 'GET', isToken: false, data: _data }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _callback(data.result);
          }
        }
      });
    },
    back_getSelectOptionsData: function (_key, _options) {
      var that = this;
      var _type = that.modelManager[_key].valType;
      for (var i = 0; i < _options.length; i++) {
        that.modelManager[_key].codes.push(_options[i].code);
        that.modelManager[_key].options.push(_options[i][_type]);
      }
      that.setSelectByIndex(_key, 0);
    },
    saveClick: function (_el) {
      var that = this;
      //判定
      var _data = {};
      var _apiKey = 'createAddress';
      var _type = "POST";
      if (that.operator.index > 0) {
        _data.addressId = that.item.id;
        _apiKey = 'updateAddress';
        _type = "PUT";
      }else{
        _data.type = that.addressType.return;
      }
      //验证
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') {
          if (k == 'country' || k == 'province' || k == 'city') {
            _data[k] = v.code;
          } else {
            var _k=k;
            if(k=='zipcode')_k='zipCode';
            if(k=='phone')_k='phoneNum';
            _data[_k]=v.val;
          }
          that.checkInputVaild(k);
        }
        if (v.type == 'select') {
          _data[k] = that.getSelectCode(k);
          that.checkSelectVaild(k);
        }
      });
      _data.isDefault = that.modelManager.isDefault.radios[0];
      //请求
      if (that.erroArr.length == 0) {
        var el = _el.target;
        var _stauts = Api.getData.getCode();
        Api.set({ key: _apiKey, type:_type, isToken: false, locked: el, loading: el, data: _data }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              if(!that.isexternal)that.resetData();
              that.$emit('next', that.mainTitleLg);
            } else if (data.code == _stauts.form) {
              that.vue.errorMessage = data.message;
            }
          }
        });
      }
    },
    prevClick: function () {
      this.resetData();
      this.$emit('prev', this.mainTitleLg);
    },
    nextClick: function () {
      this.resetData();
      this.$emit('next', this.mainTitleLg);
    }
  };
  return {
    template: $html[0].outerHTML,
    props: ['item', 'operator', 'isexternal'],
    data: function () {
      return {
        addressType:Api.getData.getAddressType(),//获取所有地址类型
        mainTitleLg: '',
        erroArr: [],
        selectOptionsData: {},
        modelManager: {
          'name': { type: 'input', val: '', vaild: 'requied', isErro: false },
          'contactName': { type: 'input', val: '', vaild: 'requied', isErro: false },
          'companyName': { type: 'input', val: '', vaild: 'requied', isErro: false },
          'address1': { type: 'input', val: '', vaild: 'requied', isErro: false },
          'address2': { type: 'input', val: '', vaild: '', isErro: false },
          'address3': { type: 'input', val: '', vaild: '', isErro: false },
          'zipcode': { type: 'input', val: '', vaild: 'requied&num', isErro: false },
          'phone': { type: 'input', val: '', vaild: 'requied&tel', isErro: false },
          'country': { type: 'input', val: '', vaild: '', isErro: false },
          'province': { type: 'input', val: '', vaild: '', isErro: false },
          'city': { type: 'input', val: '', vaild: '', isErro: false },
          'isDefault': { type: 'checkBox', radios: [false], selected: [], checkType: 'multi', vaild: '', isErro: false }
        }
      };
    },
    watch: {
      item: function (val) {
        var that = this;
        $.each(that.modelManager, function (k, v) {
          if (v.type == 'input') {
            if (k != 'country' && k != 'province' && k != 'city') {
              v.val = val[k];
            }
          }
          if (k == 'isDefault') {
            if (val.isDefault) {
              that.modelManager.isDefault.radios = [true];
              that.modelManager.isDefault.selected = [0];
            } else {
              that.modelManager.isDefault.radios = [false];
              that.modelManager.isDefault.selected = [];
            }
          }
        });
        that.dev_getCountryByZipCode();
      },
      operator: function (val) {
        switch (val.index) {
          case 0:
            this.mainTitleLg = 'addReturnAdr';
            break;
          case 1:
            this.mainTitleLg = 'editReturnAdr';
            break;
        }
      }
    },
    methods: {
      init: function () {
        var that = this;
      },
      closePopup: $method.closePopup,//清空/复原数据，并关闭弹窗
      resetData: $method.resetData,//还原数据初始数据
      resetSelectOptions: $method.resetSelectOptions,//还原下拉框的选项列表
      getSelectCode: $method.getSelectCode,//获取输入框被选中的选项对应的code
      setInputByValue: $method.setInputByValue,//写入输入框数据 by value
      setSelectByValue: $method.setSelectByValue,//写入下拉数据 by value
      setSelectByIndex: $method.setSelectByIndex,//写入下拉数据 by index
      checkInputVaild: $method.checkInputVaild,//验证输入框
      checkSelectVaild: $method.checkSelectVaild,//验证下拉框
      checkBoxVaild: $method.checkBoxVaild,//验证单/复选框
      findErro: $method.findErro,//添加/删除 检测结果
      inputBlurFun: $method.inputBlurFun,//监视离开输入框
      inputTypingFun: $method.inputTypingFun,//监视正在输入
      fun_selectClick: $method.fun_selectClick,//点击页面选择下拉选项
      fun_checkRadioClick: $method.fun_checkRadioClick,//点击页面单/复选框
      dev_getSelectOptionsData: $method.dev_getSelectOptionsData,//外部申请获取下拉框数据
      back_getSelectOptionsData: $method.back_getSelectOptionsData,//外部获取下拉数据完成
      dev_getCountryByZipCode: $method.dev_getCountryByZipCode,//请求根据邮编获取地区数据
      back_getCountryByZipCode: $method.back_getCountryByZipCode,//完成根据邮编获取地区数据
      saveClick: $method.saveClick, //保存弹窗并结束
      prevClick: $method.prevClick, //上一步
      nextClick: $method.nextClick //下一步
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.wrapper');
    }
  };
});