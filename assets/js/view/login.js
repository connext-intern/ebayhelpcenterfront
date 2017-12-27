/**
 *louis/20170803, login
 */
define(['api', 'global'], function (Api, Global) {
    return {
        focusWatchArr: [],
        initialize: function () {
            $.cookite.delCookie('_token');
            var that = this;
            that.vue = new Vue({
                el: '.main',
                data: {
                    isSandBox: Global.option.isSandBox,
                    erroMsg: '',
                    userNameInput: '',
                    passwordInput: '',
                    verifyCodeInput: '',
                    count: 0,
                    verifty: {
                        isVerify: false,
                        verifyCodePic: '',
                        verifyCodeId: null
                    }
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () {
                        that.run();
                    });
                },
                updated: function () {
                    Global.fun.updataLanguage('.wrapper');
                },
                methods: {
                    changeIdfCode: function (event) {
                        that.changeIdfCode(event);
                    }
                }
            });
        },
        run: function () {
            var that = this;
            //监视输入框
            $.each($('.inputBox'), function (i, v) {
                var _focusWatcher = $.focusWatch(v, function (_msgType) {
                    var _attr = 'msg-' + _msgType;
                    var _erroMsg = $(v).find('.erroMsg').attr(_attr);
                    $(v).find('.erroMsg').attr('lg', _erroMsg);
                });
                that.focusWatchArr.push(_focusWatcher);
            });
            //绑定事件
            this.event();
        },
        event: function () {
            var that = this;
            $('.loginBtn').bind('click', function () {
                var _vailResult = true;
                $.each(that.focusWatchArr, function (v, i) {
                    if (!i.determin(false)) _vailResult = false;
                });
                if (_vailResult) that.login(this);
            });
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    var _vailResult = true;
                    $.each(that.focusWatchArr, function (v, i) {
                        if (!i.determin(false)) _vailResult = false;
                    });
                    if (_vailResult) that.login(this);
                }
            });
        },
        //修改验证码
        changeIdfCode: function (event) {
            var that = this;
            Api.set({
                key: 'verifyCode',
                isToken: true,
                locked: event ? event.target : null,
                type: 'GET'
            }, {
                success: function (data, params) {
                    if (data.code == Api.getData.getCode().success) {
                        that.vue.verifty.verifyCodePic = data.result.verifyCodePic;
                        that.vue.verifty.verifyCodeId = data.result.verifyCodeId;
                    }
                }
            });
        },
        //开始登录
        login: function (el) {
            var that = this;
            var _stauts = Api.getData.getCode();
            var _data = {
                userName: that.vue.userNameInput,
                password: that.vue.passwordInput
            };
            if (that.vue.verifty.isVerify == 1) {
                _data = $.extend(_data, {
                    verifyCode: $('.identifyingCodeLabel input').val(),
                    verifyCodeId: that.vue.verifty.verifyCodeId
                });
            }
            Api.set({
                key: 'login',
                isToken: true,
                locked: el,
                loading: el,
                data: _data
            }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        $.cookite.addCookie('_token', data.result);
                        that.getUserinfo(el, data.result);
                    } else {
                        that.vue.count++;
                        if (that.vue.count > 2) {
                            that.vue.verifty.isVerify = true;
                            that.vue.verifty.verifyCodePic = null;
                            that.vue.verifty.verifyCodeId = null;
                            that.changeIdfCode();
                        }
                    }
                }
            });
        },
        getUserinfo: function (el, token) {
            var _stauts = Api.getData.getCode();
            Api.set({
                key: 'userinfo',
                token: token,
                type: 'GET',
                isToken: false,
                locked: el,
                loading: el
            }, {
                success: function (data) {
                    if (data.code == _stauts.success) {
                        //储存user信息
                        Global.option.user = data.result;
                        if (data.result.userType == Api.getData.getUser.userType()[0]) {
                            window.location.href = Api.getData.getPageUrl('pendingOrder');
                        } else {
                            window.location.href = Api.getData.getPageUrl('dashboard');
                        }
                    }
                }
            });
        }
    };
})