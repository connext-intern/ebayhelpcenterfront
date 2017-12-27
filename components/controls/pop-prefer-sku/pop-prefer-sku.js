// 添加地址 add by gena
define(['api', 'global', 'data', 'text!/build/controls/pop-prefer-sku/pop-prefer-sku.html'], function (Api, Global, Data, html) {
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
    getCheckBoxIndexByCode: function (_key, _code) {
      var that = this;
      var _index = 0;
      for (var i = 0; i < that.modelManager[_key].codes.length; i++) {
        if (that.modelManager[_key].codes[i] == _code) _index = i;
      }
      return _index;
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
        if (that.modelManager[_key].codes[i] == String(_code)) _index = i;
      }
      that.setSelectByIndex(_key, _index);
    },
    setSelectByIndex: function (_key, _index) {
      var that = this;
      var _options = that.modelManager[_key].options;
      that.modelManager[_key].val = _options[_index];
      that.modelManager[_key].index = _index;
    },
    setSelectByValue: function (_key, _val) {
      var that = this;
      var _index = 0;
      for (var i = 0; i < that.modelManager[_key].options.length; i++) {
        if (that.modelManager[_key].options[i] == _val) _index = i;
      }
      that.setSelectByIndex(_key, _index);
    },
    setCheckBoxByValue: function (_key, _val) {
      var that = this;
      for (i = 0; i < that.modelManager[_key].val.length; i++) {

      }
    },
    checkInputVaild: function (_key) {
      var that = this;
      var _result, _screenArr = this.modelManager[_key].vaild.split('&');
      if (_screenArr.length == 0) return true;
      _screenArr.forEach(function (element) {
        if(!element) return;
        if (_key == 'height') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'dignum2') {
            that.modelManager[_key].err = 'err14';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'length') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'dignum2') {
            that.modelManager[_key].err = 'err14';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'nameEn') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'english') {
            that.modelManager[_key].err = 'err2';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'weight') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'dignum1') {
            that.modelManager[_key].err = 'err13';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'width') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'dignum2') {
            that.modelManager[_key].err = 'err14';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else if (_key == 'price') {
          if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'dignum') {
            that.modelManager[_key].err = 'err3';
            _result = $.validate([element], that.modelManager[_key].val);
          }
          else if ($.validate([element], that.modelManager[_key].val).boo == false && element === 'requied') {
            that.modelManager[_key].err = 'err1';
            _result = $.validate([element], that.modelManager[_key].val);
          }
        }
        else {
          _result = $.validate([element], that.modelManager[_key].val);
        }

      }, this);
      if (!_result) _result = { boo: true };
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
      //input
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') v.val = '';
        v.isErro = false;
      });
      //selecter
      that.setSelectByIndex('origin', 0);
      that.setSelectByIndex('isLiBattery', 0);
      that.setSelectByIndex('isLanguage', 0);
      that.remarkInput = '';
    },
    screenBox: function (_key, _screen, _boo) {

    },
    loadNextLevel: function (_key, _index) {
      var that = this;
      switch (_key) {
        case 'country':
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'province', function (_options) {
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
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'city', function (_options) {
              that.back_getSelectOptionsData('city', _options);
            });
          } else {
            that.resetSelectOptions('city');
          }
          that.resetSelectOptions('county');
          break;
        case 'city':
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getSelectOptionsData(_code, 'county', function (_options) {
              that.back_getSelectOptionsData('county', _options);
            });
          } else {
            that.resetSelectOptions('county');
          }
          break;
        case 'sendCountry':
          if (_index > 0) {
            var _code = that.getSelectCode(_key);
            that.dev_getAllcity(_code, 'sendCity', function (_options) {
              that.back_getSelectOptionsData('sendCity', _options);
            });
          }
          break;
        case 'sendCity':
          if (_index > 0 || that.modelManager.sendCountry.index > 0) {
            that.dev_getSites();
          }
          break;
      }
    },
    dev_getAllcity: function (_code, _type, _callback) {
      var that = this;
      var _stauts = Api.getData.getCode();
      var _data = {};
      _data = {
        code: _code,
        type: _type
      };
      Api.set({ key: 'getAllCities', isToken: true, data: _data }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _callback(data.result);
          }
        }
      });
    },
    dev_getOrigin: function (_callback) {
      var that = this;
      var _stauts = Api.getData.getCode();
      Api.set({ key: 'getOrigin', type: 'GET', isToken: false }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _callback(data.result);
          }
        }
      });
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
      var _apiKey = 'createSKU';
      var _type = "POST";
      if (that.operator.index > 0) {
        _data.skuId = that.item.skuId;
        _apiKey = 'updateSKU';
        _type = "PUT";
      }
      //验证和获取
      $.each(that.modelManager, function (k, v) {
        if (v.type == 'input') {
          _data[k] = v.val;
          that.checkInputVaild(k);
        }
        if (v.type == 'select') that.checkSelectVaild(k);
      });
      var _origin = that.getSelectCode('origin');
      _data.origin = _origin;
      _data.isLiBattery = that.getSelectCode('isLiBattery');
      _data.currency = that.getSelectCode('isLanguage');
      _data.remark = that.remarkInput;
      //请求
      if (that.erroArr.length > 0) return false;
      var el = _el.target;
      var _stauts = Api.getData.getCode();
      Api.set({ key: _apiKey, type: _type, isToken: false, locked: el, loading: el, data: _data }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            that.resetData();
            that.$emit('next', that.mainTitleLg);
          } else if (data.code == _stauts.form) {
            that.errorMessage = data.message;
          }
        }
      });
    },
    prevClick: function () {
      that.resetData();
      that.$emit('prev', '');
    },
    nextClick: function () {
      that.resetData();
      that.$emit('next', '');
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
        /*isLiBattery,origin,remark,skuId*/
        modelManager: {
          'height': { type: 'input', val: '', vaild: 'dignum2&requied', isErro: false, err: 'err1' },
          'length': { type: 'input', val: '', vaild: 'dignum2&requied', isErro: false, err: 'err1' },
          'nameEn': { type: 'input', val: '', vaild: 'english&requied', isErro: false, err: 'err2' },
          'nameZh': { type: 'input', val: '', vaild: 'requied', isErro: false, err: 'err1' },
          'skuId': { type: 'input', val: '', vaild: 'requied', isErro: false, err: 'err1' },
          'tariffCode': { type: 'input', val: '', vaild: '', isErro: false },
          'weight': { type: 'input', val: '', vaild: 'dignum1&requied', isErro: false, err: 'err1' },
          'width': { type: 'input', val: '', vaild: 'dignum2&requied', isErro: false, err: 'err1' },
          'price': { type: 'input', val: '', vaild: 'dignum&requied', isErro: false, err: 'err1' },
          //select
          'origin': { type: 'select', val: '', index: 0, options: ['plzSelect'], valType: 'name', codes: ['-1'], vaild: 'requied', isErro: false },
          'isLiBattery': { type: 'select', val: '', index: 0, options: ['plzSelect'], valType: 'lg', codes: ['-1'], vaild: 'requied', isErro: false },
          'isLanguage': { type: 'select', val: '', index: 0, options: ['plzSelect'], valType: 'lg', codes: ['-1'], vaild: 'requied', isErro: false },
          //checkBox
          'type': { type: 'checkBox', radios: [true, false], val: ['pickup', 'send'], selected: [0], checkType: 'radio', vaild: '', isErro: false },
          'pickupTime': {
            type: 'checkBox', radios: [true, false, false, false], codes: [0, 1, 2, 3],
            val: ['10:00—13:00', '13:00—16:00', '16:00—19:00', '19:00—20:00'],
            selected: [0], checkType: 'radio', vaild: '', isErro: false
          }
        },
        remarkInput: '',
        showType: 'style1'
      };
    },
    watch: {
      item: function (val) {
        var that = this;
        $.each(that.modelManager, function (k, v) {
          if (v.type == 'input') {
            v.val = val[k];
          }
        });
        that.setSelectByCode('isLiBattery', val.isLiBattery);
        that.setSelectByCode('isLanguage', val.currency);
        that.setSelectByCode('origin', val.origin);
        that.remarkInput = val.remark;
      },
      operator: function (val) {
        switch (val.index) {
          case 0:
            this.mainTitleLg = 'addSkuPrefer';
            break;
          case 1:
            this.mainTitleLg = 'editSkuPrefer';
            break;
        }
      }
    },
    methods: {
      init: function () {
        var that = this;
        that.back_getSelectOptionsData('isLiBattery', Data.order.select.isLiBattery);
        that.back_getSelectOptionsData('isLanguage', Data.order.select.isLanguage);
        that.dev_getOrigin(function (_result) {
          var _arr = [];
          for (var i = 0; i < _result.length; i++) {
            var _obj = {};
            _obj.code = _result[i].code;
            _obj.name = _result[i].description;
            _arr.push(_obj);
          }
          that.back_getSelectOptionsData('origin', _arr);
        });
        var _isMainUser = true;
        var _isBattery = Global.option.user.batteryVerifyState == 'TRUE';
        if (Api.getData.getUser.userType()[0] == Global.option.user.userType) _isMainUser = false;
        if (!_isBattery) that.showType = _isMainUser ? 'style2' : 'style3';
      },
      //frame@
      closePopup: $method.closePopup,//清空/复原数据，并关闭弹窗
      resetSelectOptions: $method.resetSelectOptions,//还原下拉框的选项列表
      getCheckBoxIndexByCode: $method.getCheckBoxIndexByCode, //根据code获取checkBox的index字段
      getSelectCode: $method.getSelectCode,//获取输入框被选中的选项对应的code
      getCheckBoxValueByIndex: $method.getCheckBoxValueByIndex, //根据index获取checkBox的val字段
      setInputByValue: $method.setInputByValue,//写入输入框数据 by value
      setSelectByCode: $method.setSelectByCode,//写入下拉数据 by code
      setSelectByIndex: $method.setSelectByIndex,//写入下拉数据 by index
      setSelectByValue: $method.setSelectByValue,//写入下拉数据 by value
      setCheckBoxByValue: $method.setCheckBoxByValue,//写入选框数据 by value
      checkInputVaild: $method.checkInputVaild,//验证输入框
      checkSelectVaild: $method.checkSelectVaild,//验证下拉框
      checkBoxVaild: $method.checkBoxVaild,//验证单/复选框
      findErro: $method.findErro,//添加/删除 检测结果
      inputBlurFun: $method.inputBlurFun,//监视离开输入框
      inputTypingFun: $method.inputTypingFun,//监视正在输入
      fun_selectClick: $method.fun_selectClick,//点击页面选择下拉选项
      fun_checkRadioClick: $method.fun_checkRadioClick,//点击页面单/复选框
      //page@      
      dev_getSsoUrl: function (_str) {
        Global.fun.dev_getSsoUrl(_str);
      },//跳转链接
      dev_getOrigin: $method.dev_getOrigin,//获取原产地
      resetData: $method.resetData,//还原数据初始数据
      screenBox: $method.screenBox,//条件过滤器
      loadNextLevel: $method.loadNextLevel,//选择地址下拉选项后加载下一级的数据
      dev_getSelectOptionsData: $method.dev_getSelectOptionsData,//外部申请获取下拉框数据
      dev_getAllcity: $method.dev_getAllcity,//通过国家获取所有城市
      back_getSelectOptionsData: $method.back_getSelectOptionsData,//外部获取下拉数据完成
      saveClick: $method.saveClick, //保存弹窗并结束
      prevClick: $method.prevClick, //上一步
      nextClick: $method.nextClick //下一步
    },
    mounted: function () {
      this.init();
    },
    updated: function () {
      Global.fun.updataLanguage('.popup.prefer-sku');
    }
  };
});