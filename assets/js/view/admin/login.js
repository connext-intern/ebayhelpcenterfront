/**
 * gfh 20170904
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            // 避免因图片过大而造成页面滚动条：
            $('body').addClass('full-screen');
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            //初始化vue
            this.vue = new Vue({
                el: ".page",
                data: {
                    isClickLogin: 0, // 点击登陆
                    username: '',
                    password: '',
                    errors: {},
                    erroTimes: 0,
                    yzCodeInput: '',
                    yzCodeSrc: '',
                    yzCodeId: '',
                    errorMessage: []
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        var that = this;
                        $.cookite.delCookie('_admin_token');
                        $(document).keypress(function (e) {
                            if (e.which == 13) that.startLogin();
                        });
                    },
                    hasError: that.hasError,
                    startLogin: function () {
                        var _this = this;
                        _this.isClickLogin++;
                        if (this.hasError()) return;
                        var _stauts = Api.getData.getCode();
                        var params = {
                            userName: _this.username,
                            password: _this.password,
                            verifyCodeId: _this.yzCodeId,
                            verifyCode: _this.yzCodeInput
                        };
                        Api.set({ key: 'adminLogin', accountType: 'admin', isToken: true, data: params }, {
                            success: function (data, params) {
                                if (data.code == _stauts.success) {
                                    $.cookite.addCookie('_admin_token', data.result.token);
                                    sessionStorage.setItem('adminLogin', JSON.stringify(data.result));
                                    window.location.href = Api.getData.getPageUrl('packageInfoQuery', 'admin');
                                } else {
                                    _this.erroTimes++;
                                    _this.username = '';
                                    _this.password = '';
                                    _this.isClickLogin = 0;
                                    if (data.message) $.msg.alert(data.message); //Global.fun.msgPop(msg.message, 0);
                                    if (_this.erroTimes > 2) _this.changeIdfCode();
                                }
                            }
                        });
                    },
                    changeIdfCode: function () {
                        var that = this;
                        Api.set({ key: 'generateVerifyCode', accountType: 'admin', isToken: true, type: 'GET' }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.yzCodeSrc = data.result.verifyCodePic;
                                    that.yzCodeId = data.result.verifyCodeId;
                                }
                            }
                        });
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page');
                }
            });
        },
        hasError: function () {
            var count = 0;
            for (ver in this.errors) {
                this.errors[ver] = '';
            }
            this.errorMessage = [];
            if (!this.isClickLogin) return false;

            if (!$.validate(['requied'], this.username).boo) {
                this.errors.username = '请输入账号';
                this.errorMessage.push(this.errors.username);
                count++;
            }
            if ((this.username) && !$.validate(['emailbefore'], this.username).boo) {
                this.errors.username = '输入的账号格式不正确，请重新输入';
                this.errorMessage.push(this.errors.username);
                count++;
            }
            if (!$.validate(['requied'], this.password).boo) {
                this.errors.password = '请输入密码';
                this.errorMessage.push(this.errors.password);
                count++;
            }

            return count > 0;
        }
    };
})