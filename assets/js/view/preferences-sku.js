/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data','/build/controls/pop-prefer-sku/pop-prefer-sku.js', '/build/controls/pop-prefer-sku-updata/pop-prefer-sku-updata.js'], function (Api, Global, Data,PreferencesSku, PreferencesSkuUpdata) {
    return {
        initialize: function () {
            var that = this;
            //根据账号类型初始化页面模块
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'preferences', link: 'preferencesOrderSource' }, { lg: 'SKUDefault' }]);
            if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 0 };
            } else {
                Global.fun.menuVue.hignlight = { index: 0, subIndex: 2 };
            }
            //初始化VUE
            that.vue = new Vue({
                el: '.page-wrapper',
                data: {
                    selectAll: false,
                    operator: 0,
                    skuItem: {},
                    skuListData: [],
                    skuListStauts: [],
                    pageInfo: { current: 1, pagesize: 10 },
                    searchSkuVal: '',
                    newOpen: {},
                    popRepeat: { show: 0, total: 0, repeat: 0, id: '' },
                    exportSelectValue: 'plzSelect',
                    //skuUpdata
                    erroMsg: '',
                    fileName: ''
                },
                components: {
                    'preferences-sku': PreferencesSku,
                    'preferences-sku-updata': PreferencesSkuUpdata
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    saveFileClick: function (event) {
                        var that = this;
                        if(that.fileName.length>0){
                            that.erroMsg='';
                            // var _testObj={
                            //     "filename":"缓存的上传文件名",
                            //     "totalNo":"8",
                            //     "errorNo":"错误的数目",
                            //     "repeatNo":"0"
                            // }
                            // that.closePop();
                            // that.updataCallback(_testObj);
                            // return;
                            $.upload({
                                target: '#uploadForm',
                                url: Api.getData.getApiUrl('importSKU'),
                                token: Global.option.token,
                                callback: function (res) {
                                    if(res.code==Api.getData.getCode().success){
                                        that.closePop();
                                        that.updataCallback(res.result);
                                    }else{
                                        $.msg.alert(res.message);
                                    }                                    
                                }
                            });
                        }else{
                            that.erroMsg='plzSelectFile';
                        }
                    },
                    init: function () {
                        //获取数据
                        this.getListData();
                    },
                    addSkuFun: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        this.operator = { index: 0 };
                        $('.popup.prefer-sku').show();
                    },
                    editSkuFun: function (_item) {
                        this.operator = { index: 1 };
                        this.skuItem = $.extend({}, _item); //Object.assign({}, _item);
                        $('.popup.prefer-sku').show();
                        $('.skuIdInputer').attr('disabled', 'disabled');
                    },
                    selectAllFun: function () {
                        this.selectAll = !this.selectAll;
                        for (var i = 0; i < this.skuListStauts.length; i++) {
                            this.skuListStauts.splice(i, 1, this.selectAll)
                        }
                    },
                    optionClickFun: function (_index) {
                        var _this = this;
                        _this.skuListStauts.splice(_index, 1, !_this.skuListStauts[_index]);
                        var _boo = true;
                        $.each(_this.skuListStauts, function (i, v) {
                            if (!v) _boo = false;
                        });
                        _this.selectAll = _boo;
                        //that.vue.$forceUpdate();
                    },
                    delSkuFun: function (_el, _index) {
                        var _this = this;
                        _this.delSkuCall(_el.target, _this.skuListData[_index].skuId);
                    },
                    delSelected: function () {
                        var _this = this;
                        var _str = '';
                        $.each(_this.skuListData, function (i, v) {
                            if (_this.skuListStauts[i]) _str += ',' + v.skuId;
                        });
                        _str = _str.substring(1);
                        if (_str.length > 0) _this.delSkuCall($('.js-delSelected'), _str);
                        else $.msg.alertLan('choose-data');
                    },
                    popSaveCallback: function (val) {
                        if (val == 'addSkuPrefer' || val == 'editSkuPrefer') {
                            this.getListData();
                        }
                        $('.skuIdInputer').removeAttr('disabled');
                        $('.popup.prefer-sku').hide();
                    },
                    searchBySku: function () {
                        var _this = this;
                        _this.getListData(_this.searchSkuVal);
                    },
                    updataPopCall: function ($event) {
                        var $target = $($event.srcElement || $event.target);
                        if ($target.hasClass('disabled')) return false;
                        //this.newOpen = { index: 0 };
                        $('.popup.prefer-sku-updata').show();
                    },
                    updataCallback: function (result) {
                        if (result.repeatNo > 0) {
                            this.popRepeat.show = 1;
                            this.popRepeat.total = result.totalNo;
                            this.popRepeat.repeat = result.repeatNo;
                            this.popRepeat.id = result.filename;
                        }else{
                            $.msg.alertLan('updata-success');
                            this.getListData();
                        }
                    },
                    delSkuCall: function (el, _skuIds) {
                        var _this = this;
                        $.msg.confirmLan('confirm-delete', callback);
                        function callback() {
                            var _stauts = Api.getData.getCode();
                            var _data = {
                                skuIds: _skuIds
                            }
                            Api.set({ key: 'deleteSKU', isToken: false, locked: el, data: _data }, {
                                success: function (data, params) {
                                    if (data.code == _stauts.success) {
                                        //alert('删除成功');
                                        _this.getListData();
                                    }
                                }
                            });
                        }
                    },
                    pageCallback: function (current, pagesize, pagecount) {
                        this.pageInfo.current = current;
                        this.pageInfo.pagesize = pagesize;
                        this.pageInfo.pagecount = pagecount;
                        this.getListData();
                    },
                    getListData: function (_searchSkuNo) {
                        var _this = this;
                        var _stauts = Api.getData.getCode();
                        var _data = {};
                        _data.pageNo = _this.pageInfo.current;
                        _data.pageSize = _this.pageInfo.pagesize;
                        if (_searchSkuNo) {
                            _data.skuId = _searchSkuNo;
                            _data.pageNo = 1;
                        }
                        Api.set({ key: 'getSKUs', type: 'GET', isToken: false, data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    _this.skuListData = data.result.dataList;
                                    _this.skuListStauts = [];
                                    _this.selectAll = false;
                                    $.pager({
                                        target: '.js-pager',
                                        pagesize: _this.pageInfo.pagesize,
                                        current: _this.pageInfo.current,
                                        count: data.result.totalCounts,
                                        callback: function (current, pagesize, pagecount) { _this.pageCallback(current, pagesize, pagecount) }
                                    });
                                    for (var i = 0; i < _this.skuListData.length; i++) {
                                        _this.skuListStauts.push(false);
                                    }
                                }
                            }
                        });
                    },
                    dev_repeatSKU: function (_str) {
                        var _that = this;
                        //请求API
                        var _stauts = Api.getData.getCode();
                        var _data = {
                            fileId: _that.popRepeat.id,
                            option: _str
                        }
                        Api.set({ key: 'repeatSKU', isToken: false, data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    //上传重复数据
                                    _that.popRepeat.show = 0;
                                    _that.getListData();
                                }
                            }
                        });
                    },
                    exportSKU: function (_str) {
                        var _that = this;
                        _that.exportSelectValue = _str;
                        if (_str != 'plzSelect') {
                            var _data = {};
                            if (_str == 'exportCSV') _data.type = 'csv';
                            if (_str == 'exportExcel') _data.type = 'excel';
                            Api.set({ key: 'exportSKU', type: 'GET', data: _data }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        Global.fun.redirect(data.result, '_blank');
                                    }
                                }
                            });
                        }
                    },
                    getNameBattery:function(battery){
                        var entity = null;
                        Data.order.select.isLiBattery.forEach(function(element) {
                            if(element.id==battery){
                                entity = element;
                            }
                        }, this);
                        return entity?entity.lg:'';
                    },
                    //skuUpdata
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
                        that.erroMsg='';
                      },
                      getSKUTemplate: function (_key) {
                        Api.set({ key: 'getSKUTemplate', type: 'GET' }, {
                          success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                              Global.fun.redirect(data.result[_key], '_blank');
                            }
                          }
                        });
                      },
                      resetData: function () {
                        this.erroMsg = '';
                        $('.prefer-sku-updata .saveBtn').removeClass('reading');
                        $('.selectFileBtn input').removeAttr('disabled');
                      },
                      closePop: function () {
                        this.resetData();
                        this.fileName='';
                        $('.selectFileBtn input').val('');
                        $('.popup.prefer-sku-updata').hide();
                      }
                },
                updated: function () {
                    Global.fun.updataLanguage('.wrapper');
                }
            });
        }
    };
})