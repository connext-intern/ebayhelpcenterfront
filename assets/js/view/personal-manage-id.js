// eBayID管理 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        status: {
            'TRUE': 'TRUE',
            'FALSE': 'FALSE',
            'ALL': 'ALL'
        },
        authorize_status: {
            'VALID': Data.personal.authorizeStatus[0].id,
            'EXPIRED': Data.personal.authorizeStatus[1].id,
            'ALL': Data.personal.authorizeStatus[2].id
        },
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.createComponent(); });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    isloading: true,
                    status: this.status, //是|否|所有|操作员
                    authorize_status: this.authorize_status, //授权状态
                    authorizeText: { data: Data.personal.authorizeStatus, index: 0 },//授权状态信息
                    page: { // 页码块
                        pagesize: 10,
                        count: 0,
                        current: 1
                    },
                    filter: { // 过滤条件
                        assigned: that.status.ALL,
                        authState: '', //授权状态
                        eBayID: ''
                    },
                    isFilterAuthorizeState: false,
                    isCancelAuthorize: false,
                    eBayEntity: null, //当前选择ebayid账号
                    subaccounts: [], // 所有子账号
                    selectedaccounts: [],// 已选择的子账号
                    totalcount: 0, // 已绑定个数
                    redirecturl: '', //外部链接 绑定id|重新授权
                    list: [], // 总数组
                    erroMsg: '' // 错误信息
                },
                mounted: function () {
                    this.init();
                },
                watch: {
                    subaccounts: function (item) {
                        var _this = this;
                        _this.selectedaccounts = [];
                        _this.subaccounts.forEach(function (element) {
                            if (element.isbinded) {
                                _this.selectedaccounts.push(element);
                            }
                        }, this);
                    }
                },
                methods: {
                    init: function () {
                        Global.fun.menuVue.hignlight = { index: 0, subIndex: 1 };
                        Global.fun.updataCrumbs([{ lg: 'personalCenter', link: 'accountInfo' }, { lg: 'eBayID-manage' }]);
                        this.page.current = (Global.option.urlParam && Global.option.urlParam.current) || 1;
                        this.load_list();
                        this.init_event();
                    },
                    switchAuthorize: function (key, selectIndex) { //授权状态切换
                        var _this = this;
                        _this.filter.authState = key;
                        _this.authorizeText.index = selectIndex;
                        _this.load_list(function () {
                            _this.isFilterAuthorizeState = false;
                        });
                    },
                    pager: that.pager,
                    load_list: that.load_list,
                    init_event: that.init_event, // 初始化事件
                    bind_subaccount: that.bind_subaccount, // 指定子账号
                    get_subaccount: that.get_subaccount, // 获取所有子账号
                    setActive: that.setActive, // 单击绑定子账号
                    setDisabled: that.setDisabled, // 单击移除子账号
                    resetSetAccount: that.resetSetAccount, // 清空指定子账号
                    getUrlParam: that.getUrlParam,
                    revoke_authorization: function (item) { // 取消授权
                        this.eBayEntity = item;
                        this.isCancelAuthorize = true;
                    },
                    comfirm_authrize: function (el) { //确认取消授权
                        that.revoke_authorization.call(this,el);
                    },
                    saveSetAccount: function () { // 保存指定只帐号
                        var _arr = [];
                        this.subaccounts.forEach(function (element, index) {
                            if (element.isbinded) {
                                _arr.push(element.userId);
                            }
                        }, this);
                        //that.saveSetAccount.call(this, _arr.join(','));
                        that.saveSetAccount.call(this, _arr);
                    },
                    get_authorizationUrl: that.get_authorizationUrl
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        },
        init_event: function () {
            var _this = this;
            // 仅显示未指定操作员的eBayID
            var checkBoxHandle = new $.checkBox($(".checkBox"), function (_answear) {
                _this.filter.assigned = $(this).hasClass('cur') ? _this.status.FALSE : _this.status.ALL;
                _this.load_list();
            });
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
        revoke_authorization: function (_el) {
            var _this = this;
            var el=_el.target;
            var params = {
                bindId: this.eBayEntity.bindId
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'revokeAuthorization', isToken: false, data: params, locked: el, loading: el}, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isCancelAuthorize = false;
                        _this.load_list();
                    }
                }
            });
        },
        resetSetAccount: function () {
            this.subaccounts.forEach(function (element, index) {
                element.isbinded = false;
                this.subaccounts.splice(index, 1, element);
            }, this);
        },
        saveSetAccount: function (subuserIds) {
            var _this = this;
            var params = {
                bindId: this.eBayEntity.bindId,
                subuserIds: subuserIds
            };
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'assignSubuser', type: 'PUT', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.subaccounts = [];
                        _this.load_list();
                    }
                }
            });
        },
        setActive: function (item, index) {
            item.isbinded = true;
            this.subaccounts.splice(index, 1, item);
        },
        setDisabled: function (item) {
            item.isbinded = false;
            this.subaccounts.forEach(function (element, index) {
                if (element.userId == item.userId) {
                    this.subaccounts.splice(index, 1, item);
                }
            }, this);
        },
        bind_subaccount: function (item) {
            var _this = this;
            if (item.authState != 'VALID') return;
            this.eBayEntity = item;
            this.subaccount = item.assignedSubusers;
            _this.get_subaccount();
        },
        get_subaccount: function () {
            var _this = this;
            _this.selectedaccounts = [];
            var _stauts = Api.getData.getCode();
            var params = {
                pageable: false
            };
            Api.set({ key: 'getSubusers', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        if (data.result.dataList.length > 0) {
                            _this.subaccounts = data.result.dataList;
                            _this.selectedaccounts = [];
                            for (var i = 0; i < _this.subaccounts.length; i++) {
                                for (var j = 0; j < _this.subaccount.length; j++) {
                                    if (_this.subaccounts[i].userId == _this.subaccount[j].userId) {
                                        _this.subaccounts[i].isbinded = true;
                                        _this.selectedaccounts.push(_this.subaccounts[i]);
                                    }
                                }
                            }
                        } else {
                            Global.fun.msgPop('请先添加操作员');
                        }

                    }
                }
            });
        },
        get_authorizationUrl: function (type) {
            var _this = this;
            var _stauts = Api.getData.getCode();
            var params = {
                bindId: type=='add'?null:_this.eBayEntity && _this.eBayEntity.bindId
            };
            Api.set({ key: 'getAuthorizationUrl', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.redirecturl = data.result;
                        window.open(data.result,'_blank');
                        //window.location.href = data.result;
                    }
                }
            });
        },
        //初始化分页
        pager: function (totalPage, totalCount) {
            var _this = this;
            $.pager({
                target: '.js-pager', current: _this.page.current, pagesize: _this.page.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                    _this.page.current = current;
                    _this.page.pagesize = pagesize;
                    _this.load_list();
                }
            });
            Global.fun.updataLanguage('.js-pager');
        },
        load_list: function (callback) {
            var _this = this;
            _this.isloading = true;
            var _stauts = Api.getData.getCode();
            var params = {
                pageNo: _this.page.current,
                pageSize: _this.page.pagesize,
                assigned: _this.filter.assigned,
                authState: _this.filter.authState,
                ebayId: _this.filter.eBayID
            };
            Api.set({ key: 'getEbayIds', type: 'GET', isToken: false, data: params }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        _this.isloading = false;
                        _this.list = data.result.dataList;
                        _this.page.count = data.result.totalCounts;
                        _this.totalcount = _this.page.count;
                        if (callback && typeof callback == 'function') callback.call(_this);
                        _this.pager(data.result.totalPages, data.result.totalCounts);
                    } else {
                        _this.erroMsg = data.message;
                    }
                }
            });
        }
    };
});