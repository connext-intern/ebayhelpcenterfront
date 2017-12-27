// sdk管理 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () {
                that.run();
            });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = {
                index: 2,
                subIndex: 2
            };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isloading: false,
                    clickAdd: 0, // 点击添加
                    isClickSave: 0, // 点击保存
                    sdkTypes: Data.admin.select.sdkType,
                    sdkType: {
                        key: '0',
                        text: '- 请选择SDK类型 -'
                    },
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    isAll: false, // 全选
                    currEntity: {
                        sdkId: '',
                        sdkType: '',
                        sdkVersion: '',
                        sdkTitle: '',
                        sdkDesc: '',
                        sdkURL: ''
                    },
                    currFile: null,
                    list: [],
                    errors: {}
                },
                mounted: function () {
                    this.init();
                },
                watch: {
                    clickAdd: function (val) {
                        if (!val) {
                            this.sdkType = {
                                key: '0',
                                text: '- 请选择SDK类型 -'
                            };
                            this.currEntity = {
                                sdkId: '',
                                sdkType: '',
                                sdkVersion: '',
                                sdkTitle: '',
                                sdkDesc: '',
                                sdkURL: ''
                            };
                        }
                        this.currFile = null;
                        this.resetFileInput($('#uploadForm input[type="file"]'));
                        this.isClickSave = 0;
                    },
                    list: function (newlist) {
                        var count = 0;
                        newlist.forEach(function (element) {
                            if (element.selected) {
                                count++;
                            }
                        }, this);
                        this.isAll = count > 0;
                    },
                    'currEntity.sdkType': function (val) {
                        this.sdkTypes.forEach(function (element) {
                            if (element.key == val) {
                                this.sdkType = element;
                            }
                        }, this);
                    }
                },
                methods: {
                    resetFileInput: function (file) {
                        var that = this;
                        var $file = file.clone().val("");
                        file.after($file);
                        file.remove();
                        $file.on('change', that.changeFile);
                    },
                    init: function () {
                        this.getList();
                    },
                    changeFile: function (ev) {
                        var that = this;
                        var _files = ev.target.files[0];
                        that.currEntity.sdkTitle = _files.name;
                        var _temps = _files.name.split('.');
                        var extionname = _temps[_temps.length - 1]
                        if (extionname != 'zip') {
                            $.msg.alert('请上传zip文件');
                            return;
                        }
                        that.currFile = _files;
                    },
                    selectSdkType: function (item) { // 选择SDK
                        this.sdkType = item;
                    },
                    fnSelectAll: function () { // 全选|反选
                        this.isAll = !this.isAll;
                        this.list.forEach(function (element, index) {
                            element.selected = this.isAll;
                        }, this);
                    },
                    deleteList: function () { // sdk删除接口 删除选中项
                        var ids = [];
                        this.list.forEach(function (element, index) {
                            if (element.selected) ids.push(element.sdkId);
                        }, this);
                        that.delete.call(this, ids);
                    },
                    sdkEdit: function (item) { // 编辑
                        this.clickAdd++;
                        for (o in item) {
                            this.currEntity[o] = item[o];
                        }
                    },
                    sdkDelete: function (item) { // sdk删除接口
                        that.delete.call(this, [item.sdkId]);
                    },
                    selectOne: function (item, index) { // 选中|取消
                        item.selected = !item.selected;
                        this.list.splice(index, 1, item);
                    },
                    hasError: that.hasError,
                    closeAdd: function () { // 关闭添加弹层
                        if (this.isloading) return;
                        this.clickAdd = 0;
                    },
                    upload: that.upload,
                    sdkSave: that.sdkSave, // 添加白名单
                    getList: that.getList // sdk列表查询接口
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        },
        hasError: function () {
            var count = 0;
            for (var ver in this.errors) {
                this.errors[ver] = '';
            }
            if (!this.isClickSave) return false;
            if (this.sdkType.key == 0) {
                this.errors.sdkType = "err";
                count++;
            }
            if (!this.currEntity.sdkTitle) {
                this.errors.sdkTitle = "err";
                count++;
            }
            if (!this.currEntity.sdkDesc) {
                this.errors.sdkDesc = "err";
                count++;
            }
            return count > 0;
        },
        upload: function (callback) {
            var _this = this;
            if (!_this.currFile) {
                callback.call(_this);
                return;
            }
            if (_this.currFile) {
                var _size = _this.currFile.size / 1024 / 1024; // 单位M
                if (_size > 5) {
                    $.msg.alert('请上传5m以内的图片');
                    return;
                }
            }
            _this.isloading = true;
            var _stauts = Api.getData.getCode();
            $.upload({
                target: '#uploadForm',
                url: Api.getData.getApiUrl('sdkUpload', 'admin'),
                token: Global.option.adminToken,
                callback: function (res) {
                    _this.currEntity.sdkId = res.result;
                    if (res.code == _stauts.success) {
                        callback.call(_this);
                    } else {
                        $.msg.alert(res.message);
                    }
                },
                complete: function () {
                    _this.isloading = false;
                },
                error: function () {
                    $.msg.alert('网络错误');
                }
            });
        },
        sdkSave: function () {
            var _this = this;
            var _stauts = Api.getData.getCode();
            _this.isClickSave++;
            if (this.hasError()) return;
            if (_this.isloading) return;
            _this.upload(function () {
                var params = {
                    sdkType: _this.sdkType.key,
                    sdkDesc: _this.currEntity.sdkDesc
                };
                if (!_this.currEntity.sdkId) return;
                else {
                    params.sdkTitle = _this.currEntity.sdkTitle
                    params.sdkId = _this.currEntity.sdkId;
                }
                Api.set({
                    key: 'sdkSave',
                    accountType: 'admin',
                    isToken: false,
                    data: params
                }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            _this.closeAdd();
                            _this.getList();
                            // _this.isloading = false;
                        }
                    }
                });
            });
        },
        delete: function (ids) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                sdkIds: ids
            };
            $.msg.confirmLan('confirm-delete', callback);

            function callback() {
                Api.set({
                    key: 'sdkDelete',
                    accountType: 'admin',
                    isToken: false,
                    data: params
                }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            if (ids.length > 1) $.msg.alert(data.result);
                            _this.getList();
                        }
                    }
                });
            }
        },
        getList: function (callback) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize
            };
            Api.set({
                key: 'sdkSearch',
                type: 'GET',
                accountType: 'admin',
                isToken: false,
                data: params
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isAll = false;
                        _this.list = data.result.dataList;
                        _this.page.count = data.result.totalCounts;
                        $.pager({
                            target: '.js-pager',
                            count: _this.page.count,
                            current: _this.page.current,
                            pagesize: _this.page.pagesize,
                            callback: function (current, pagesize, pagecount) {
                                _this.page.current = current;
                                _this.page.pagesize = pagesize;
                                _this.getList();
                            }
                        });
                        if (callback && typeof callback == 'function') callback.call(_this, data);
                    }
                }
            });
        }
    };
})
