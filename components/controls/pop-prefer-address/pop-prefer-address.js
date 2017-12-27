// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/pop-prefer-address/pop-prefer-address.html'], function (Api, Global, Data, html) {
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
  var $method = {
    //@frame
    closePopup: function () {
      var that = this;
      that.resetData();
      that.$emit('next', 'closePop');
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
    setSelectByCode: function (_key, _code) {
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
      /* << 选择地区香港时清空邮编的错误 */
      if (_key == 'country' && that.modelManager[_key].val == 'chinaHk') {
        that.findErro('zipcode', true);
        that.modelManager.zipcode.isErro = false;
      }
      /* >> */
    },
    checkInputVaild: function (_key) {
      var that = this;
      /* << 地区香港时验证直接通过 */
      if (this.modelManager.country.val == 'chinaHk' && _key == 'zipcode') {
        return true;
      }
      /* >> */
      var _result, _screenArr = this.modelManager[_key].vaild.split('&');
      if (_screenArr.length == 0) return true;

      _screenArr.forEach(function (element) {
        if (!element) return;
        if (_key == 'name' || _key == 'contactName' || _key == 'address1') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'send-address') {
            that.modelManager[_key].err = 'err15';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'companyName' || _key == 'address2' || _key == 'address3') {
          if (that.modelManager[_key].val && $.validate([element], that.modelManager[_key].val).boo == false && element === 'send-address') {
            that.modelManager[_key].err = 'err15';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'zipcode') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'zipcode') {
            that.modelManager[_key].err = 'err4-1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'phone') {
          if (element === 'tel') {
            var countrycode = that.modelManager['country'].codes[that.modelManager['country'].index];
            if (countrycode == 'HK' && $.validate(['tel-HK'], that.modelManager[_key].val).boo == false) {
              that.modelManager[_key].err = 'err5-2';
              _result = $.validate(['tel-HK'], that.modelManager[_key].val);
            } else if (countrycode == 'TW' && $.validate(['tel-TW'], that.modelManager[_key].val).boo == false) {
              that.modelManager[_key].err = 'err5-3';
              _result = $.validate(['tel-TW'], that.modelManager[_key].val);
            } else if (countrycode == 'CN' && $.validate(['tel-CN'], that.modelManager[_key].val).boo == false) {
              that.modelManager[_key].err = 'err5-1';
              _result = $.validate(['tel-CN'], that.modelManager[_key].val);
            } else {
              that.modelManager[_key].err = 'err5';
              _result = $.validate([element], that.modelManager[_key].val);
            }
          }
        }
        else {
          _result = $.validate([element], that.modelManager[_key].val);
        }

      }, this);

      if (!_result) {
        this.modelManager[_key].isErro = false;
        return true;
      };
      this.findErro(_key, _result.boo);
      this.modelManager[_key].isErro = !_result.boo;
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
      this.modelManager[_key].isErro = !_boo;
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
      this.modelManager[_key].isErro = !_boo;
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
    },
    inputBlurFun: function (_key) {
      this.checkInputVaild(_key);
    },
    inputTypingFun: function (_key) {
      this.findErro(_key, true);
    },
    fun_selectClick: function (_key, _index) {
      var that = this;
      var _curIndex = that.modelManager[_key].index;
      if (_index != _curIndex) {
        that.setSelectByIndex(_key, _index);
        that.loadNextLevel(_key, _index);
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
    //@page
    resetData: function () {
      var that = this;
      that.erroArr = [];
      //input
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') v.val = '';
        v.isErro = false;
      });
      //selecter
      that.setSelectByIndex('country', 0);
      that.resetSelectOptions('city');
      that.resetSelectOptions('county');
      that.resetSelectOptions('province');
      //checkBox
      that.modelManager.isDefault.radios = [false];
      that.modelManager.isDefault.selected = [];
    },
    screenBox: function (_key, _screen, _boo) {

    },
    loadNextLevel: function (_key, _index) {
      var that = this;
      switch (_key) {
        case 'country':
          that.resetSelectOptions('province');
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'province', function (_options) {
              that.back_getSelectOptionsData('province', _options);
            });
          }
          that.resetSelectOptions('city');
          that.resetSelectOptions('county');
          break;
        case 'province':
          that.resetSelectOptions('city');
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'city', function (_options) {
              that.back_getSelectOptionsData('city', _options);
            });
          }
          that.resetSelectOptions('county');
          break;
        case 'city':
          that.resetSelectOptions('county');
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'county', function (_options) {
              that.back_getSelectOptionsData('county', _options);
            });
          }
          break;
      }
    },
    dev_getSelectOptionsData: function (_code, _type, _callback) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
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
      } else {
        _data.type = that.addressType.send;
      }
      //验证和获取
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') {
          var _k = k;
          if (k == 'zipcode') _k = 'zipCode';
          if (k == 'phone') _k = 'phoneNum';
          _data[_k] = v.val;
          that.checkInputVaild(k);
        }
        if (v.type == 'select') {
          _data[k] = that.getSelectCode(k);
          that.checkSelectVaild(k);
        }
      });
      _data.isDefault = that.modelManager.isDefault.radios[0];
      if (that.isexternal) _data.isDefault = true;
      //请求
      if (that.erroArr.length == 0) {
        var el = _el.target;
        var _stauts = Api.getData.getCode();
        Api.set({ key: _apiKey, isToken: false, locked: el, loading: el, data: _data, type: _type, }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              if (!that.isexternal) that.resetData();
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
        addressType: Api.getData.getAddressType(),//获取所有地址类型
        mainTitleLg: '',
        erroArr: [],
        modelManager: {
          'name': { type: 'input', val: '', vaild: 'send-address&requied', isErro: false, err: 'err1' },
          'contactName': { type: 'input', val: '', vaild: 'send-address&requied', isErro: false, err: 'err1' },
          'companyName': { type: 'input', val: '', vaild: 'send-address', isErro: false, err: 'err15' },
          'address1': { type: 'input', val: '', vaild: 'send-address&requied', isErro: false, err: 'err1' },
          'address2': { type: 'input', val: '', vaild: 'send-address', isErro: false },
          'address3': { type: 'input', val: '', vaild: 'send-address', isErro: false },
          'zipcode': { type: 'input', val: '', vaild: 'zipcode&requied', isErro: false, err: 'err1' },
          'phone': { type: 'input', val: '', vaild: 'tel&requied', isErro: false, err: 'err1' },
          'country': { type: 'select', val: '', index: 0, options: ['settingCondition'], valType: 'lg', codes: ['-1'], vaild: 'requied', isErro: false },
          'province': { type: 'select', val: '', index: 0, options: ['province'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'city': { type: 'select', val: '', index: 0, options: ['city'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'county': { type: 'select', val: '', index: 0, options: ['county'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'isDefault': { type: 'checkBox', radios: [false], selected: [], checkType: 'multi', vaild: '', isErro: false }
        }
      };
    },
    watch: {
      item: function (val) {
        var that = this;
        $.each(that.modelManager, function (k, v) {
          if (v.type == 'input') {
            v.val = val[k];
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
        that.setSelectByCode('country', val.countryCode);
        that.dev_getSelectOptionsData(val.countryCode, 'province', function (_options) {
          that.back_getSelectOptionsData('province', _options);
          that.setSelectByCode('province', val.provinceCode);
        });
        that.dev_getSelectOptionsData(val.provinceCode, 'city', function (_options) {
          that.back_getSelectOptionsData('city', _options);
          that.setSelectByCode('city', val.cityCode);
        });
        that.dev_getSelectOptionsData(val.cityCode, 'county', function (_options) {
          that.back_getSelectOptionsData('county', _options);
          that.setSelectByCode('county', val.countyCode);
        });
      },
      operator: function (val) {
        switch (val.index) {
          case 0:
            this.mainTitleLg = 'addSendAdr';
            break;
          case 1:
            this.mainTitleLg = 'editSendAdr';
            break;
        }
      }
    },
    methods: {
      init: function () {
        var that = this;
        var _countryArr = Data.preferences.select.country;
        that.back_getSelectOptionsData('country', _countryArr.splice(0, 3));
        that.setSelectByIndex('province', 0);
        that.setSelectByIndex('city', 0);
        that.setSelectByIndex('county', 0);
      },
      //frame@
      closePopup: $method.closePopup,//清空/复原数据，并关闭弹窗
      resetSelectOptions: $method.resetSelectOptions,//还原下拉框的选项列表
      getSelectCode: $method.getSelectCode,//获取输入框被选中的选项对应的code
      setInputByValue: $method.setInputByValue,//写入输入框数据 by value
      setSelectByCode: $method.setSelectByCode,//写入下拉数据 by value
      setSelectByIndex: $method.setSelectByIndex,//写入下拉数据 by index
      checkInputVaild: $method.checkInputVaild,//验证输入框
      checkSelectVaild: $method.checkSelectVaild,//验证下拉框
      checkBoxVaild: $method.checkBoxVaild,//验证单/复选框
      findErro: $method.findErro,//添加/删除 检测结果
      inputBlurFun: $method.inputBlurFun,//监视离开输入框
      inputTypingFun: $method.inputTypingFun,//监视正在输入
      fun_selectClick: $method.fun_selectClick,//点击页面选择下拉选项
      fun_checkRadioClick: $method.fun_checkRadioClick,//点击页面单/复选框
      //page@
      resetData: $method.resetData,//还原数据初始数据
      screenBox: $method.screenBox,//条件过滤器
      loadNextLevel: $method.loadNextLevel,//选择地址下拉选项后加载下一级的数据
      dev_getSelectOptionsData: $method.dev_getSelectOptionsData,//外部申请获取下拉框数据
      back_getSelectOptionsData: $method.back_getSelectOptionsData,//外部获取下拉数据完成
      saveClick: $method.saveClick, //保存弹窗并结束
      prevClick: $method.prevClick, //上一步
      nextClick: $method.nextClick //下一步
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.prefer-addAdr');
    }
  };
});