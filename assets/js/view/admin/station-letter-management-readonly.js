/**
 *gfh/20170906, order
 */
define(['api', 'global', 'data'], function (Api, Global, Data, kindeditor) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 1, subIndex: 1 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    inputTitle: '',
                    inputText: '',
                    myMessageId: '',
                    height: '240px',//设置编辑器的高度

                    ebaylist: null,
                    listMaxLength: 0,
                    selectedbaylist: [],
                    unselectedbaylist: [],
                    isAll: true,
                    fiiterInput: '',
                    showPop: 0,

                    parList: false
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        this.myMessageId = this.getQueryString('messageId');
                        if (this.myMessageId != null) this.dev_adminMessageDetilGet(this.myMessageId);
                    },
                    dev_adminMessageDetilGet: function (_id) {
                        var that = this;
                        var _stauts = Api.getData.getCode();
                        var _data = {};
                        _data.messageId = _id;
                        Api.set({ key: 'adminMessageDetilGet', type: 'GET', accountType: 'admin', data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    that.inputTitle = data.result.messageTitle;
                                    that.inputText = data.result.messageText;
                                    that.isAll = data.result.sendObject == 'all';
                                }
                            }
                        });
                    },
                    popSave: function () {
                        var that = this;
                        that.showPop = 0;
                        that.parList = that.getSelectedList();
                        that.isAll = that.listMaxLength == that.parList.length;
                    },
                    dev_adminMessageSave: function () {
                        var that = this;
                        var _stauts = Api.getData.getCode();
                        var _data = {};
                        if (this.myMessageId != null) _data.messageId = this.myMessageId;
                        _data.messageTitle = that.inputTitle;
                        _data.messageText = that.$refs.kindeditor.getKindEditorHtml();
                        _data.isAll = that.isAll;
                        if (!that.isAll) _data.eBayIds = that.parList;
                        Api.set({ key: 'adminMessageSave', accountType: 'admin', data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    window.location.href = Api.getData.getPageUrl('stationLetterManagement', 'admin')
                                }
                            }
                        });
                    },
                    getQueryString: function (name) {
                        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                        var r = window.location.search.substr(1).match(reg);
                        if (r != null) {
                            return unescape(r[2]);
                        }
                        return null;
                    },
                    //弹窗
                    selectPartObjectFun: function () {
                        var that = this;
                        that.resetPop();
                        that.loadList(function () {
                            that.showPop = 2;//保存
                        })
                    },
                    resetPop: function () {
                        var that = this;
                        that.resetList();
                        that.fiiterInput = '';
                        that.isAll = true;
                    },
                    resetList: function () {
                        var that = this;
                        that.ebaylist = {};
                        that.selectedbaylist = [];
                        that.unselectedbaylist = [];
                    },
                    clearSelected: function () {
                        var that = this;
                        // for(var i=that.selectedbaylist.length-1; i>=0; i--){
                        //     that.setDisabled(that.selectedbaylist[i]);
                        // }
                        that.resetPop();
                        that.loadList(function () { })
                    },
                    popFitter: function () {
                        var that = this;
                        that.loadList(null, {
                            searchField: 'email',
                            fieldValue: that.fiiterInput
                        });
                    },
                    loadList: function (_callback, _params) {
                        var that = this;
                        var params = {};
                        if (_params) params = _params;
                        Api.set({ key: 'ISAccountSearch', type: 'GET', accountType: 'admin', data: params }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.resetList();
                                    that.unselectedbaylist = data.result.dataList;
                                    that.listMaxLength = data.result.dataList.length;
                                    if (_callback) _callback();
                                };
                            }
                        });
                    },
                    getSelectedList: function () {
                        var that = this;
                        var _arr = [];
                        $.each(that.ebaylist, function (k, v) {
                            if (v) _arr.push(k);
                        });
                        return _arr;
                    },
                    selectAll: function () {
                        var that = this;
                        for (var i = 0; i < that.unselectedbaylist.length; i++) {
                            that.setActive(that.unselectedbaylist[i]);
                        }
                    },
                    setActive: function (item) { //设置绑定
                        this.ebaylist[item.isid] = true;
                        var _index = this.selectedbaylist.indexOf(item);
                        if (_index >= 0) {
                            this.selectedbaylist.splice(_index, 1, item);
                        } else {
                            this.selectedbaylist.splice(_index, 0, item);
                        }
                    },
                    setDisabled: function (item) { //设置未绑定
                        this.ebaylist[item.isid] = false;

                        var _index = this.selectedbaylist.indexOf(item);
                        if (_index >= 0) {
                            this.selectedbaylist.splice(_index, 1);
                        }
                    }

                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})