// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/pop-prefer-deliver/pop-prefer-deliver.html'], function (Api, Global, Data, html) {
  var $html = $(html);
  $.each($html.find('[inputKey]'), function (i, v) {
    var _key = $(v).attr('inputKey');
    $(v).attr('v-bind:class', 'modelManager.' + _key + '.isErro?"erro":""');
    $(v).find('input').attr({
      'v-model': 'modelManager.' + _key + '.val',
      'v-on:blur': 'inputBlurFun("' + _key + '")',
      'v-on:input': 'inputTypingFun("' + _key + '")'
    });
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
    getCheckBoxIndexByValue: function (_key, _value) {
      var that = this;
      var _index = 0;
      for (var i = 0; i < that.modelManager[_key].val.length; i++) {
        if (that.modelManager[_key].val[i] == _value) _index = i;
      }
      return _index;
    },
    getCheckBoxIndexByValue1: function (_key, _value) {
      var that = this;
      var _index = 0;
      for (var i = 0; i < that.modelManager[_key].val.length; i++) {
        if (that.modelManager[_key].val[i].name == _value) _index = i;
      }
      return that.modelManager[_key].val[_index];
    },
    getSelectCode: function (_key) {
      var that = this;
      var _index = that.modelManager[_key].index;
      return that.modelManager[_key].codes[_index];
    },
    getCheckBoxValueByIndex: function (_key, _index) {
      var that = this;
      var _selected = that.modelManager[_key].selected[_index];
      return that.modelManager[_key].val[_selected];
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
    setCheckBoxByValue: function (_key, _val) {
      var that = this;
      for (i = 0; i < that.modelManager[_key].val.length; i++) {

      }
    },
    setCheckBoxByCode: function (_key, _code) {
      var that = this;
      var _index = 0;
      for (i = 0; i < that.modelManager[_key].codes.length; i++) {
        if (that.modelManager[_key].codes[i] == _code) _index = i;
      }
      that.fun_checkRadioClick(_key, _index);
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

        if (_key == 'zipcode') {
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
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else {
          _result = $.validate([element], that.modelManager[_key].val);
        }

      }, this);
      if (!_result) return true;
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
    fun_checkRadioClick1: function (_key, obj) {
      var that = this;
      this.setCheckBox(_key, obj);
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
        if (!that.modelManager[_key].radios[_index]) {
          for (var i = 0; i < that.modelManager[_key].radios.length; i++) {
            that.modelManager[_key].radios[i] = false;
          }
          that.modelManager[_key].radios.splice(_index, 1, true);
          that.modelManager[_key].selected[0] = _index;
        }
      }
      if (_key == 'type') {
        for (var i = that.erroArr.length - 1; i >= 0; i--) {
          that.findErro(that.erroArr[i], true);
        }
      }
    },
    //@page
    resetData: function () {
      var that = this;
      that.erroArr = [];
      that.errorMessage = 'errorMessage';
      that.sendSites = [];
      that.sendSitesIndex = 0;
      that.dftAddress = false;
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
      that.setSelectByIndex('sendCountry', 0);
      that.resetSelectOptions('sendCity');
      //checkBox
      that.modelManager.type.radios = [true, false];
      that.modelManager.type.selected = [0];
      that.modelManager.pickupTime.radios = [true, false, false, false];
      that.modelManager.pickupTime.selected = [0];
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
        case 'sendCountry':
          that.resetSelectOptions('sendCity');
          if (_index > 0) {
            var _countryCode = that.getSelectCode('sendCountry');
            that.dev_getSites('country', _countryCode, function (_options) {
              that.back_getSelectOptionsData('sendCity', _options.cityDtos);
            });
          }
          break;
        case 'sendCity':
          if (_index > 0 || that.modelManager.sendCountry.index > 0) {
            var _cityCode = that.getSelectCode('sendCity');
            that.dev_getSites('city', _cityCode, function (_options) {
              that.sendSites = _options.siteDtos;
            });
          }
          break;
      }
    },
    dev_getSites: function (_key, _code, _callback) {
      var that = this;
      //清除数据
      that.sendSites = [];
      that.sendSitesIndex = -1;
      //请求API
      var _stauts = Api.getData.getCode();
      var _data = {};
      _data[_key] = _code;
      if (_key == 'city') _data.country = that.getSelectCode('sendCountry');
      Api.set({ key: 'getSites', type: 'GET', isToken: false, data: _data }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _callback(data.result);
          }
        }
      });
    },
    clickSiteFun: function (_index) {
      var that = this;
      that.sendSitesIndex = _index;
      that.findErro('sendSites', true);
    },
    dev_getSelectOptionsData: function (_code, _type, _callback) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      _data = {
        code: _code,
        type: _type
      };
      Api.set({ key: 'getSubRegionByCode1', type: 'GET', isToken: false, data: _data }, {
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
      _data.defaultAddress = that.dftAddress;
      var _apiKey = 'createDeliveryPreference';
      var _type = "POST";
      if (that.operator.index > 0) {
        _data.preferenceId = that.item.id;
        _apiKey = 'updateDeliveryPreference';
        _type = "PUT";
      }
      _data.siteId = null;
      _data.pickupAddress = null;
      _data.pickupTime = null;
      //验证和获取
      _data.name = that.modelManager.name.val;
      that.checkInputVaild('name');
      if (!that.modelManager.type.selected[0] > 0) {
        //收揽pickup
        _data.type = 'CANVASSION';
        _data.pickupAddress = {};
        $.each(that.modelManager, function (k, v) {
          if (v.type == 'input') {
            _data.pickupAddress[k] = v.val;
            that.checkInputVaild(k);
          }
          if (v.type == 'select' && k != 'sendCountry' && k != 'sendCity') {
            _data.pickupAddress[k] = that.getSelectCode(k);
            that.checkSelectVaild(k);
          }
        });

        _data.pickupTime = that.modelManager['pickupTime'].selectItem.name; // that.getCheckBoxValueByIndex('pickupTime', 0);
      } else {
        //自送send
        _data.type = 'SELLER_SENDING';
        if (that.sendSites.length > 0) {
          if (that.sendSitesIndex >= 0) {
            _data.siteId = that.sendSites[that.sendSitesIndex].id;
            that.findErro('sendSites', true);
          } else {
            that.findErro('sendSites', false);
          }
        } else {
          that.checkSelectVaild('sendCountry');
          that.checkSelectVaild('sendCity');
        }
      }
      if (that.isexternal) _data.defaultAddress = true;
      //请求
      if (that.erroArr.length == 0) {
        var el = _el.target;
        var _stauts = Api.getData.getCode();
        Api.set({ key: _apiKey, isToken: false, type: _type, locked: el, loading: el, data: _data }, {
          success: function (data, params) {
            if (data.code == _stauts.success) {
              if (!that.isexternal) that.resetData();
              that.$emit('next', that.mainTitleLg);
            } else if (data.code == _stauts.form) {
              that.errorMessage = data.message;
            }
          }
        });
      }
    },
    setDftClick: function () {
      this.dftAddress = !this.dftAddress;
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
        mainTitleLg: '',
        errorMessage: 'errorMessage',
        erroArr: [],
        modelManager: {
          'name': { type: 'input', val: '', vaild: 'requied', isErro: false, err: 'err1' },
          'contactName': { type: 'input', val: '', vaild: 'requied', isErro: false, err: 'err1' },
          'companyName': { type: 'input', val: '', vaild: '', isErro: false },
          'address1': { type: 'input', val: '', vaild: 'requied', isErro: false, err: 'err1' },
          'address2': { type: 'input', val: '', vaild: '', isErro: false },
          'address3': { type: 'input', val: '', vaild: '', isErro: false },
          'zipcode': { type: 'input', val: '', vaild: 'zipcode&requied', isErro: false, err: 'err4' },
          'phone': { type: 'input', val: '', vaild: 'tel&requied', isErro: false, err: 'err5' },
          //select
          'country': { type: 'select', val: '', index: 0, options: ['country'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'province': { type: 'select', val: '', index: 0, options: ['province'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'city': { type: 'select', val: '', index: 0, options: ['city'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'county': { type: 'select', val: '', index: 0, options: ['county'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'sendCountry': { type: 'select', val: '', index: 0, options: ['sendCountry'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'sendCity': { type: 'select', val: '', index: 0, options: ['city'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          //checkBox
          'type': { type: 'checkBox', radios: [true, false], val: ['pickup', 'send'], codes: [1, 2], selected: [0], checkType: 'radio', vaild: '', isErro: false },
          'pickupTime': {
            type: 'checkBox',
            val: Data.preferences.select.pickupTime,
            selected: Data.preferences.select.pickupTime[0].code, checkType: 'radio', vaild: '', isErro: false,
            selectItem: Data.preferences.select.pickupTime[0]
          },
          'sendSites': { type: 'custom', isErro: false }
        },
        dftAddress: false,
        sendSites: [],
        sendSitesIndex: -1
      };
    },
    watch: {
      item: function (val) {
        var that = this;
        that.dftAddress = val.defaultAddress == "true" ? true : false;
        that.setInputByValue('name', val.name);
        that.setCheckBoxByCode('type', val.type);
        if (val.typeLg == 'sellers') {
          that.setSelectByCode('sendCountry', val.siteAddress.countryCode);
          that.dev_getSites('country', val.siteAddress.countryCode, function (_options) {
            that.back_getSelectOptionsData('sendCity', _options.cityDtos);
            that.setSelectByCode('sendCity', val.siteAddress.cityCode);
          });
          that.dev_getSites('city', val.siteAddress.cityCode, function (_options) {
            that.sendSites = _options.siteDtos;
            var _index = 0;
            for (var i = 0; i < that.sendSites.length; i++) {
              if (that.sendSites[i].id == val.siteAddress.id) _index = i;
            }
            that.sendSitesIndex = _index;
          });
        } else {
          $.each(that.modelManager, function (k, v) {
            if (v.type == 'input') {
              v.val = val.address[k];
            }
          });
          that.setSelectByCode('country', val.address.countryCode);
          that.dev_getSelectOptionsData(val.address.countryCode, 'province', function (_options) {
            that.back_getSelectOptionsData('province', _options);
            that.setSelectByCode('province', val.address.provinceCode);
          });
          that.dev_getSelectOptionsData(val.address.provinceCode, 'city', function (_options) {
            that.back_getSelectOptionsData('city', _options);
            that.setSelectByCode('city', val.address.cityCode);
          });
          that.dev_getSelectOptionsData(val.address.cityCode, 'county', function (_options) {
            that.back_getSelectOptionsData('county', _options);
            that.setSelectByCode('county', val.address.countyCode);
          });
          if (val.address != null) {
            var _obj = that.getCheckBoxIndexByValue1('pickupTime', val.pickupTime);
            that.fun_checkRadioClick1('pickupTime', _obj);
          }
        }
      },
      operator: function (val) {
        switch (val.index) {
          case 0:
            this.mainTitleLg = 'addPreferDeliver';
            break;
          case 1:
            this.mainTitleLg = 'editPreferDeliver';
            break;
        }
      }
    },
    methods: {
      setCheckBox: function (key, obj) {
        this.modelManager[key].selected = obj.code;
        this.modelManager[key].selectItem = obj;
      },
      init: function () {
        var that = this;
        that.modelManager.type.codes = [
          Data.preferences.select.deliverType[1].id,
          Data.preferences.select.deliverType[2].id
        ];

        // var _countryArr = Data.preferences.select.country;
        // _countryArr.splice(3, 1);
        that.dev_getSelectOptionsData('', 'country', function (_options) {
          that.back_getSelectOptionsData('country', _options);
          that.setSelectByIndex('province', 0);
          that.setSelectByIndex('city', 0);
          that.setSelectByIndex('county', 0);
        });

        that.dev_getSites('', 'country', function (_options) {
          that.back_getSelectOptionsData('sendCountry', _options.cityDtos);
          that.setSelectByIndex('sendCity', 0);
        });
      },
      //frame@
      closePopup: $method.closePopup,//清空/复原数据，并关闭弹窗
      resetSelectOptions: $method.resetSelectOptions,//还原下拉框的选项列表
      getCheckBoxIndexByValue: $method.getCheckBoxIndexByValue, //根据code获取checkBox的index字段
      getCheckBoxIndexByValue1: $method.getCheckBoxIndexByValue1, //根据code获取checkBox的index字段
      getSelectCode: $method.getSelectCode,//获取输入框被选中的选项对应的code
      getCheckBoxValueByIndex: $method.getCheckBoxValueByIndex, //根据index获取checkBox的val字段
      setInputByValue: $method.setInputByValue,//写入输入框数据 by value
      setSelectByCode: $method.setSelectByCode,//写入下拉数据 by value
      setSelectByIndex: $method.setSelectByIndex,//写入下拉数据 by index
      setCheckBoxByValue: $method.setCheckBoxByValue,//写入选框数据 by value
      setCheckBoxByCode: $method.setCheckBoxByCode,//写入选框数据 by code
      checkInputVaild: $method.checkInputVaild,//验证输入框
      checkSelectVaild: $method.checkSelectVaild,//验证下拉框
      checkBoxVaild: $method.checkBoxVaild,//验证单/复选框
      findErro: $method.findErro,//添加/删除 检测结果
      inputBlurFun: $method.inputBlurFun,//监视离开输入框
      inputTypingFun: $method.inputTypingFun,//监视正在输入
      fun_selectClick: $method.fun_selectClick,//点击页面选择下拉选项
      fun_checkRadioClick: $method.fun_checkRadioClick,//点击页面单/复选框
      fun_checkRadioClick1: $method.fun_checkRadioClick1,//点击页面单/复选框
      //page@
      resetData: $method.resetData,//还原数据初始数据
      screenBox: $method.screenBox,//条件过滤器
      loadNextLevel: $method.loadNextLevel,//选择地址下拉选项后加载下一级的数据
      dev_getSelectOptionsData: $method.dev_getSelectOptionsData,//外部申请获取下拉框数据
      dev_getSites: $method.dev_getSites,//获取所有仓库信息
      clickSiteFun: $method.clickSiteFun,
      back_getSelectOptionsData: $method.back_getSelectOptionsData,//外部获取下拉数据完成
      setDftClick: $method.setDftClick,
      saveClick: $method.saveClick, //保存弹窗并结束
      prevClick: $method.prevClick, //上一步
      nextClick: $method.nextClick //下一步
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.prefer-deliver');
    }
  };
});