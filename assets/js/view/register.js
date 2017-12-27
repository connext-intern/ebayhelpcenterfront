/**
 *robin/20170813, register
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        emailHash: Data.emailHash,
        initialize: function () {
            var that = this;
            that.vue = new Vue({
                el: '.main',
                data: {
                    erroMsg: '',
                    userNameInput: '',
                    passwordInput: '',
                    verifyCodeInput: '',
                    codeId: '',
                    codeImgUrl: ''
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function () { that.run(); });
                },
                methods: {
                    changeIdfCode: function () {
                        that.getIdyCode($('.codeImg'));
                    }
                }
            });
        },
        run: function () {
            var that = this;
            //初始化弹框
            $.each($('.js-popCall'), function (i, v) {
                var _popupName = $(v).attr('data-pop');
                var _popuper = $.buildPop({
                    popupName: _popupName
                });
                $(v).click(function () {
                    _popuper.show();
                });
                _popuper.find('.agree').click(function () {
                    $(v).addClass('cur').removeClass('erro');
                    _popuper.close();
                });
                _popuper.find('.unagree').click(function () {
                    $(v).removeClass('cur');
                    _popuper.close();
                });
            });
            //监视输入框
            $.each($('.inputBox'), function (i, v) {
                var _focusWatcher = $.focusWatch(v, function (_msgType) {
                    var _attr = 'msg-' + _msgType;
                    var _erroMsg = $(v).find('.erroMsg').attr(_attr);
                    $(v).find('.erroMsg').attr('lg', _erroMsg);
                    // Global.fun.updataLanguage('.inputBox');
                });
                that.focusWatchArr.unshift(_focusWatcher);
            });
            //获取img
            that.getIdyCode($('.codeImg'));
            //绑定事件
            this.event();
        },
        event: function () {
            var that = this;
            $('.registerBtn').bind('click', function () {
                var _vailResult = true;
                $.each(that.focusWatchArr, function (v, i) {
                    if (!i.determin(false)) _vailResult = false;
                });
                $.each($('.radio'), function (i, v) {
                    if (!$(this).hasClass('cur')) {
                        $(this).addClass('erro');
                        _vailResult = false;
                    }
                });
                if (_vailResult) that.register(this);
            });
            $('.popup.registerGuild .jumpToMailBtn').bind('click', function () {
                var url = that.vue.userNameInput.split('@')[1];
                if (url in that.emailHash) {
                    window.open(that.emailHash[url], '_blank');
                } else {
                    window.open('about:blank', '_blank');
                }
            });
        },
        getIdyCode: function (el) {
            var that = this;
            var _stauts = Api.getData.getCode();
            Api.set({ key: 'verifyCode', isToken: true, locked: el, type: 'GET' }, {
                success: function (data, params) {
                    if (data.code == _stauts.success) {
                        that.vue.codeImgUrl = data.result.verifyCodePic;
                        that.vue.codeId = data.result.verifyCodeId;
                    }
                }
            });
        },
        register: function (el) {
            var that = this;
            var _stauts = Api.getData.getCode();
            var _userName = that.vue.userNameInput;
            var _password = that.vue.passwordInput;
            var _verifyCode = that.vue.verifyCodeInput;
            var _verifyCodeId = that.vue.codeId;
            Api.set({
                key: 'register', isToken: true, locked: el, loading: el, data: {
                    userName: _userName,
                    password: _password,
                    verifyCode: _verifyCode,
                    verifyCodeId: _verifyCodeId
                }
            }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            window.location.href = Api.getData.getPageUrl('registerSuccess') + '?email=' + _userName;
                        } else if (data.code == _stauts.form) {
                            that.vue.erroMsg = data.message;
                        }
                    }
                });
        }
    };
})