/**
 *robin/20170815, forgetPassword
 */
define(['api','global'], function (Api,Global) {
    return {
        focusWatchArr:[],
        initialize: function () {
            var that=this;

            that.vue=new Vue({
                el: '.main',
                data: {
                    step:'0',
                    emailInput:'',
                    codeImgUrl:'',
                    inputCode:'',
                    codeId:'',
                    codeImgUrl:'',
                    erroMsg:''
                },
                mounted: function () {

                    //根据账号类型初始化页面模块
                    Global.fun.startLoadHtml(function(){that.run();});

                },
                methods:{
                    changeIdfCode:function(){
                        that.getIdyCode($('.codeImg'));
                    }

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
            //获取img
            that.getIdyCode($('.codeImg'));
            //绑定事件
            that.event();
        },
        event:function(){
            var that=this;
            $('.js-nextStep').bind('click',function(){
                var _vailResult=true;
                $.each(that.focusWatchArr,function(v,i){
                    if(!i.determin(false)) _vailResult=false;
                });
                if(_vailResult)that.sendPersonInfo(this);
            });
        },
        getIdyCode:function(el){
            var that=this;
            var _stauts=Api.getData.getCode();
            Api.set({key: 'generateVerifyCode', isToken: true, locked:el,accountType:'admin', type:'GET'}, {
                success: function (data, params) {
                    if(data.code==_stauts.success){
                        that.vue.codeImgUrl=data.result.verifyCodePic;
                        that.vue.codeId=data.result.verifyCodeId;
                    }
                }
            });
        },
        sendPersonInfo:function(el){
            var that=this;
            var _stauts=Api.getData.getCode();
            var _email=that.vue.emailInput;
            var _verifyCodeId=that.vue.codeId;
            var _verifyCode=that.vue.inputCode;
            Api.set({key: 'adminConfirmEmail',accountType: 'admin', isToken: true,  data: {
                email:_email,
                verifyCodeId: _verifyCodeId,
                verifyCode: _verifyCode
            }}, {
                success: function (data, params) {
                    if(data.code==_stauts.success){
                        that.vue.step=1;
                    }else if(data.code==_stauts.form){
                        that.vue.erroMsg=data.message;
                    }
                }
            });
        }
    };
})