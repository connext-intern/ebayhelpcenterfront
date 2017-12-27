// 开发者管理 add by gena
define(['api', 'global'], function (Api, Global) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.createComponent(); });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    pop: { openPopApplyDev: 0, openPopAuthorizeThirdDeveloper: 0, openInfo: 0, openPopApplyThirdDeveloper: 0 },//控制弹层的显示和隐藏
                    isAppliID: false,
                    isAgreeAuth: false,
                    applyDeveloperID: { developerId: null, secret: null },//储存个人开发者信息
                    thirdDeveloperDeveloperId: null,//储存第三方开发者信息
                    authThirdPartyDevelopers: null,//储存已授权第三方开发者列表
                    erroMsg: { third: null, apply: null },//错误信息
                    input: { third: null }//input内容判断
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        Global.fun.menuVue.hignlight = { index: 3, subIndex: '' };
                        Global.fun.updataCrumbs([{ lg: 'dev-manage' }]);
                        this.getDeveloperInfo();
                        this.getAuthThirdPartyDevelopers();
                    },
                    /************************************申请开发者id***********************************/
                    //显示申请开发者id的弹层
                    showApplyDevId: function () {
                        var that = this;
                        callback();
                        // $.msg.confirmLan('confirm-apply-developer', callback);
                        function callback() {
                            Api.set({ key: 'applyDeveloperID', isToken: false }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        that.applyDeveloperID = data.result;
                                        that.isAppliID = true;
                                    }
                                }
                            });
                        }
                    },
                    // 查看信息
                    viewinfo: function () {
                        if (this.applyDeveloperID.developerType === 'private') this.pop.openInfo = 1;
                    },
                    //显示授权弹层
                    showDeveloperByDeveloper: function () {
                        this.thirdDeveloperDeveloperId = null;
                        this.erroMsg.third = null;
                        this.input.third = null;
                        $('.popup-authorize-third-developer .box input').val('');
                        this.pop.openPopAuthorizeThirdDeveloper = 1;
                        this.isAgreeAuth = 0;
                    },
                    //重置秘钥
                    resetSecret: function (event) {
                        var that = this;
                        $.msg.confirmLan('confirm-reset-secret', callback);
                        function callback() {
                            Api.set({ key: 'resetSecret', isToken: false, locked: event.target }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        $.msg.toast('resetSecret');
                                        that.applyDeveloperID.secret = data.result;
                                    }
                                }
                            });
                        }
                    },
                    /**************************************授权弹层**********************************/
                    //根据第三方开发者id查询开发者信息
                    getThirdPartyDeveloperByDeveloperId: function (event) {
                        var that = this;
                        var val = $('.popup-authorize-third-developer .box input').val();
                        if (!/\S/.test(val)) {
                            this.erroMsg.third = 1;
                            return;
                        } else {
                            this.erroMsg.third = null;
                        }
                        Api.set({ key: 'getThirdPartyDeveloperByDeveloperId', type: 'GET', isToken: false, locked: event.target, data: { developerId: val } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.thirdDeveloperDeveloperId = data.result;
                                    if(!data.result){
                                        $.msg.alertLan('not-found-developer');
                                    }
                                }
                            }
                        });
                    },
                    //授权第三方开发者
                    authorizeThirdPartyDeveloper: function (event) {
                        var val = $('.popup-authorize-third-developer .box input').val();
                        var flag = $('.popup-authorize-third-developer .box .protocol .checkBox .radio').hasClass('cur');
                        if (!/\S/.test(val)) {
                            this.erroMsg.third = 1;
                            return false;
                        };
                        if (!flag) {
                            $('.popup-authorize-third-developer .box .protocol .error-checkbox').addClass('cur');
                            return false;
                        }
                        $('.popup-authorize-third-developer .box .protocol .error-checkbox').removeClass('cur');
                        var that = this;
                        Api.set({ key: 'authorizeThirdPartyDeveloper', isToken: false, locked: event.target, data: { developerId: val } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.pop.openPopAuthorizeThirdDeveloper = 0;
                                    that.getAuthThirdPartyDevelopers();//更新列表
                                }
                            }
                        });
                    },
                    //申请成为第三方开发者
                    applyThirdPartyDeveloper: function (event) {
                        var that = this;
                        if (!this.checkApplyThirdDeveloper()) { that.erroMsg.apply = true; return false; }
                        var _dom = $('.popup-apply-third-developer .box');
                        var _data = {
                            contactName: _dom.find('.name input').val(),
                            contactPhone: _dom.find('.phone input').val(),
                            contactEmail: _dom.find('.email input').val(),
                            applicationName: _dom.find('.app-name input').val(),
                            company: _dom.find('.company-name input').val(),
                            applicationDescription: _dom.find('.app-des textarea').val(),
                            appUrl: _dom.find('.app-link input').val()
                        };
                        that.erroMsg.apply = null;
                        Api.set({ key: 'applyThirdPartyDeveloper', isToken: false, locked: event.target, data: _data }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    $.msg.alertLan('operator');
                                    that.pop.openPopApplyThirdDeveloper = 0;
                                    that.getAuthThirdPartyDevelopers();//更新列表
                                }
                            }
                        });
                    },
                    //校验form表单信息
                    checkApplyThirdDeveloper: function () {
                        var count = 0;
                        $('.popup-apply-third-developer input,.popup-apply-third-developer textarea').each(function () {
                            var reg = $(this).attr('data-reg'), regs = (reg && reg.split(',')) || [], _value = $(this).val(), _title = $(this).attr('data-title');
                            regs.forEach(function (element) {
                                if (!$.validate([element], _value).boo) {
                                    count++;
                                    $(this).parents('.input-group').addClass('error').attr('title', _title);
                                }
                                else {
                                    $(this).parents('.input-group').removeClass('error').removeAttr('title');
                                }
                            }, this);
                        });
                        Global.fun.updataLanguage('.page-wrapper');
                        return count == 0;
                    },
                    //取消授权
                    revokeAuthorization: function (event, developerId) {
                        var that = this;
                        Api.set({ key: 'developerRevokeAuthorization', isToken: false, locked: event.target, data: { developerId: developerId } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.getAuthThirdPartyDevelopers();
                                }
                            }
                        });
                    },
                    //api--查询开发者信息
                    getDeveloperInfo: function () {
                        var that = this;
                        Api.set({ key: 'getDeveloperInfo', type: 'GET', isToken: false }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    if (data.result) {
                                        that.applyDeveloperID = data.result;
                                        that.isAppliID = true;
                                    }
                                }
                            }
                        });
                    },
                    //api--查询已授权的第三方开发者列表
                    getAuthThirdPartyDevelopers: function () {
                        var that = this;
                        Api.set({ key: 'getAuthThirdPartyDevelopers', type: 'GET', isToken: false }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.authThirdPartyDevelopers = data.result;
                                }
                            }
                        });
                    },
                    //清楚input内容
                    clearInput: function (event) {
                        if ($(event.target).parents('.error').length > 0) { return false; };
                        $(event.target).siblings('input').val('');
                        this.input.third = null;
                        this.thirdDeveloperDeveloperId = null;
                    },
                    //input监听输入
                    onInput: function (event, type) {
                        if (type == 'apply') {
                            if (event.value != "") {
                                $(event.target).parents('.input-group').removeClass('error');
                                if ($(event.target).parents('.box').find('.error').length <= 0) {
                                    this.erroMsg.apply = null;
                                }
                            }
                        } else {
                            if (event.value != "") {
                                this.erroMsg.third = null;
                                this.input.third = 1;
                            } else {
                                this.input.third = null;
                            }
                        }
                    }
                },
                updated: function () { Global.fun.updataLanguage('.page-wrapper'); }
            });
        }
    }
});