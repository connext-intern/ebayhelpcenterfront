/**
 * gfh 20170904
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
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
                    ebaylist: null,
                    selectedbaylist: [],
                    unselectedbaylist: [],
                    isAll: false,
                    fiiterInput: '',
                    showPop: 0,
                    popItem: null,

                    list: [],//初始化数据列表
                    pagerObj: { current: 1, pagesize: 10 }
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        this.adminMessageGet();
                    },
                    //checkbox选择
                    setCheckbox: function (event, index) {
                        this.list[index].isCheck = !this.list[index].isCheck;
                    },
                    //全选
                    setAllCheckbox: function (event) {
                        var flag = $(event.target).parent().hasClass('cur');
                        if (flag) { $(event.target).parent().removeClass('cur'); } else { $(event.target).parent().addClass('cur'); }
                        for (var i = 0; i < this.list.length; i++) {
                            this.list[i].isCheck = !flag;
                        }
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.adminMessageGet();
                            }
                        });
                    },
                    //发送
                    adminMessageSend: function (item) {
                        var that = this;
                        that.popItem = item;
                        this.loadList(function () {
                            that.showPop = 1;
                        })
                    },
                    dev_adminMessageSend: function () {
                        var that = this;
                        var _stauts = Api.getData.getCode().success;
                        var _data = {};
                        _data.messageId = that.popItem.messageId;
                        var _listArr = that.getSelectedList();
                        _data.eBayIds = _listArr;
                        var _boo = false;
                        if (that.selectedbaylist.length == that.popItem.maxLengther) _boo = true;
                        _data.isAll = _boo;
                        Api.set({ key: 'adminMessageSend', type: 'POST', accountType: 'admin', data: _data }, {
                            success: function (data, params) {
                                if (data.code == _stauts) {
                                    that.showPop = 0;
                                }
                            }
                        });
                    },
                    //显示编辑
                    openPopup: function (messageId, index) {
                        window.location.href = Api.getData.getPageUrl('stationLetterManagementEdit', 'admin') + '?messageId=' + messageId;
                    },
                    openPopupReadonly:function(messageId, index){
                        window.location.href = Api.getData.getPageUrl('stationLetterManagementReadonly', 'admin') + '?messageId=' + messageId;
                    },
                    //批量删除
                    adminMessageDel: function (event, messageIds) {
                        var that = this;
                        if (!messageIds) {
                            if (!this.checkboxStatus()) { $.msg.alertLan('choose-website-msg'); return false; }
                            messageIds = messageIds ? messageIds : this.getMessageIds();
                        }
                        $.msg.confirmLan('confirm-delete', callback);
                        function callback() {
                            Api.set({ key: 'adminMessageDel', locked: event ? event.target : null, accountType: 'admin', data: { messageIds: messageIds } }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        $('.slct-page .del-item').removeClass('cur');
                                        that.adminMessageGet();
                                    }
                                }
                            });
                        };
                    },
                    //获取站内信列表
                    adminMessageGet: function () {
                        var that = this;
                        Api.set({ key: 'adminMessageGet', isToken: false, type: 'GET', accountType: 'admin', data: { pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    for (var i = 0; i < data.result.dataList.length; i++) {
                                        data.result.dataList[i].isCheck = 0;
                                    };
                                    that.list = data.result.dataList;
                                    that.pager(data.result.totalPages, data.result.totalCounts);
                                }
                            }
                        });
                    },
                    //获取选择的MessageId
                    getMessageIds: function () {
                        var arr = [];
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { arr.push(this.list[i].messageId); }
                        }
                        return arr;
                    },
                    //检查checkbox状态
                    checkboxStatus: function () {
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { return true; }
                        }
                        return false;
                    },
                    //弹窗
                    resetPop: function () {
                        var that = this;
                        that.ebaylist = {};
                        that.selectedbaylist = [];
                        that.unselectedbaylist = [];
                        that.fiiterInput = '';
                        that.isAll = false;
                    },
                    clearSelected: function () {
                        var that = this;
                        for (var i = that.selectedbaylist.length - 1; i >= 0; i--) {
                            that.setDisabled(that.selectedbaylist[i]);
                        }
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
                        Api.set({ key: 'ISAccountSearch', type: 'GET', accountType: 'admin', isToken: false, data: params }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.resetPop();
                                    that.popItem.maxLengther=data.result.dataList.length;
                                    that.unselectedbaylist=data.result.dataList;
                                    if(that.popItem.sendObject=='all')that.selectAll();
                                    if(_callback)_callback();
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
                        this.ebaylist[item.ISId] = true;
                        var _index = this.selectedbaylist.indexOf(item);
                        if (_index >= 0) {
                            this.selectedbaylist.splice(_index, 1, item);
                        } else {
                            this.selectedbaylist.splice(_index, 0, item);
                        }
                    },
                    setDisabled: function (item) { //设置未绑定
                        this.ebaylist[item.ISId] = false;

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