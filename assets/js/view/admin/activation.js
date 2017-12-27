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
                        'forgetpwd': { key: 'validateEmailCaptcha', isToken: true, type: 'admin', ajaxtype: 'POST' }, // 缺少api
                        'addoperator': { key: 'validateEmailCaptcha', isToken: true, type: 'admin',ajaxtype: 'POST' },
                        'admin_forgetpwd': { key: 'adminConfirmEmail', isToken: true, type: 'admin' }  // 缺少api
                    },
                    email: decodeURI(Global.option.urlParam.email),
                    verifyCode: decodeURI(Global.option.urlParam.verifyCode),
                    adminId:decodeURI(Global.option.urlParam.adminId),
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
                        location.href = Api.getData.getPageUrl('login','admin');
                    },
                    register: function () { // 立即注册
                        location.href = Api.getData.getPageUrl('register','admin');
                    },
                    forgetPassword: function () { //忘记密码->填写个人信息
                        location.href = Api.getData.getPageUrl('forgetPassword','admin');
                    },
                    resetPassword: function () { //忘记密码->设置密码
                        location.href = Api.getData.getPageUrl('adminResetPassword','admin')+'?email='+this.email+'&verifyCode='+this.verifyCode;
                    },
                    subuserSetPassword: function () { //添加操作员->设置密码
                        location.href = Api.getData.getPageUrl('subuserSetPassword','admin')+'?email='+this.email+'&verifyCode='+this.verifyCode;
                    },
                    subuserAdd: function () { //添加操作员
                        location.href = Api.getData.getPageUrl('subManage','admin');
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
                //_params=$.extend({adminId:_this.adminId},_params);
            };
            Api.set({ key: temp.key, accountType: temp.type, type: temp.ajaxtype || 'POST', isToken: temp.isToken || false, data: _params}, {
                success: function (data, params) {
                    _this.item.status = data.code;
                }
            });
        }
    }
});                                                                                                     