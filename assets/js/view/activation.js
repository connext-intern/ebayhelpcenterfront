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
                    item: {
                        status: '', // 失败 成功 超时
                        module: '' // 模块
                    },
                    apiStatus: Api.getData.getCode(),
                    modules: {
                        'register': { key: 'activate', type: '', isToken: true, ajaxtype: 'POST' },
                        'forgetpwd': { key: 'validateEmailCaptcha', isToken: true, type: '', ajaxtype: 'POST' }, // 缺少api
                        'addoperator': { key: 'validateEmail', isToken: true, type: '' },
                        'admin_forgetpwd': { key: 'adminConfirmEmail', isToken: true, type: 'admin' }  // 缺少api
                    },
                    email: decodeURI(Global.option.urlParam.email),
                    verifyCode: decodeURI(Global.option.urlParam.verifyCode),
                    isId:decodeURI(Global.option.urlParam.isId),
                    resetPasswordSuccess: Api.getData.getPageUrl('resetPasswordSuccess'),
                    erroMsg: '' // 错误信息
                },
                mounted: function () {
                    this.module = $(".txtModule").val() || '';
                    this.init();
                },
                methods: {
                    init: function () {
                        this.activate();
                    },
                    activate: that.activate, // 即刻激活
                    login: function () { // 立即登录
                        location.href = Api.getData.getPageUrl('login');
                    },
                    register: function () { // 立即注册
                        location.href = Api.getData.getPageUrl('register');
                    },
                    forgetPassword: function () { //忘记密码->填写个人信息
                        location.href = Api.getData.getPageUrl('forgetPassword');
                    },
                    resetPassword: function () { //忘记密码->设置密码
                        location.href = Api.getData.getPageUrl('resetPassword')+'?email='+this.email+'&verifyCode='+this.verifyCode;
                    },
                    subuserSetPassword: function () { //添加操作员->设置密码
                        location.href = Api.getData.getPageUrl('subuserSetPassword')+'?email='+this.email+'&isId='+this.isId;
                    },
                    subuserAdd: function () { //添加操作员
                        location.href = Api.getData.getPageUrl('subManage');
                    },
                    adminResetPassword: function () {
                        location.href = Api.getData.getPageUrl('forgetPwd', this.modules[this.module].type);
                    }
                }
            });
        },
        activate: function () {
            var _this = this;
            var _params = {
                email: _this.email,
                verifyCode: _this.verifyCode
            };
            var temp = _this.modules[_this.module];
            if(_this.module=='addoperator'){
                _params=$.extend({isId:_this.isId},_params);
            };
            Api.set({ key: temp.key, accountType: temp.type, type: temp.ajaxtype || 'POST', isToken: temp.isToken || false, data: _params }, {
                success: function (data, params) {
                    _this.item.status = data.code;
                }
            });
        }
    }
});                                                                                                     