// 激活页状态页 add by gena
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.createComponent(); });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".main",
                data: {
                    status: 0,
                    count: 20,
                    message: ''
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        var _this = this;
                        this.dev_saveAuthorizationResult();
                        var timer = setInterval(function () {
                            if (_this.count == 0 && _this.status != 2) {
                                _this.status = 4;
                                timer = null;
                                return;
                            }
                            _this.count--;
                        }, 1000);
                    },
                    dev_saveAuthorizationResult: that.dev_saveAuthorizationResult,
                    getUrlParam: that.getUrlParam
                }
            });
        },
        dev_saveAuthorizationResult: function () {
            var _this = this;
            var _sessionId = _this.getUrlParam('sessionId');
            var _username = _this.getUrlParam('username');
            var _bindId = _this.getUrlParam('bindId');
            if (_sessionId != null && _username != null) {
                var _stauts = Api.getData.getCode();
                var _data = {
                    sessionId: _sessionId,
                    userName: _username
                }
                if (_bindId != null) _data.bindId = _bindId;
                _this.status = 1;
                Api.set({ key: 'saveAuthorizationResult', isToken: false, data: _data }, {
                    success: function (data, params) {
                        _this.message = data.message;
                        if (data.code == _stauts.success) {
                            _this.status = 2;
                        }
                        else if (data.code == _stauts.timeout) {
                            _this.status = 4;
                        }
                        else {
                            _this.status = 3;
                        }
                    }
                });
            } else {
                _this.status = 0;
            }
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    }
});                                                                                                     