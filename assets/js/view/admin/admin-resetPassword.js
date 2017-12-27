/**
 *robin/20170815, resetPassword
 */
define(['api','global'], function (Api,Global) {
    return {
        focusWatchArr:[],
        initialize: function () {
            var that=this;
            that.vue=new Vue({
                el: '.main',
                data: {
                    step:'2',
                    passwordInput:'',
                    rePasswordInput:'',
                    erroMsg:''
                },
                mounted: function () {
                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function(){that.run();});
                }
            });
        },
        run:function(){
            var that=this;
            //监视输入框
            $.each($('.inputBox'),function(i,v){
                var _focusWatcher=$.focusWatch(v,function(_msgType){
                    var _attr='msg-'+_msgType;
                    var _erroMsg=$(v).find('.erroMsg').attr(_attr);
                    $(v).find('.erroMsg').attr('lg',_erroMsg);
                    Global.fun.updataLanguage('.inputBox');
                });
                that.focusWatchArr.unshift(_focusWatcher);
            });
            //绑定事件
            that.event();
        },
        event:function(){
            var that=this;
            $('.js-ensureBtn').bind('click',function(){
                var _vailResult=true;
                $.each(that.focusWatchArr,function(v,i){
                    if(!i.determin(false)) _vailResult=false;
                });
                if(_vailResult){
                    if(that.vue.passwordInput!=that.vue.rePasswordInput){
                        $('.reInput').addClass('erro').find('.erroMsg').attr({'lg':'erroNewPwd'});
                        Global.fun.updataLanguage('.reInput')
                    }else{
                        that.sendPersonInfo(this);
                    }
                }
            });
        },
        sendPersonInfo:function(el){
            var that=this;
            var _stauts=Api.getData.getCode();
            var _newPassword=that.vue.rePasswordInput;
            var _urlOption=Global.option.urlParam
            var _email=_urlOption.email || null;
            var _verifyCode=_urlOption.verifyCode || null;
            Api.set({key: 'adminResetPassword',accountType: 'admin', isToken: true,  data: {
                newPassword: _newPassword,
                email:_email,
                verifyCode:_verifyCode
            }}, {
                success: function (data, params) {
                    if(data.code==_stauts.success){
                        var _href=Api.getData.getPageUrl('resetPasswordSuccess','admin');
                        window.location.href=_href;
                    }else if(data.code==_stauts.form){
                        that.vue.erroMsg=data.message;
                    }
                }
            });
        }
    };
})