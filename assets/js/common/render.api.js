/**
 *louis/20170803, api处理。
 *
 */
define('api', ['global', 'test'], function (Global, Test) {
    var Api = {};
    /*
     *api请求入口。
     * params：数据参数，参考data
     * option为返回方法：success(data,params),error(data,params),complete(data,params)
     *
     * 注：所有的按钮点击需要增加locked字段。
     *
     */
    Api.set = function (params, option) {
        var data = {
            key: params.key,//对应json配置的可以
            async: params.async || true,//是否异步， 默认异步
            isToken: params.isToken || false,//是否token接口,注： 登录， 注册， 找回密码不需要token
            type: params.type || 'POST',//请求的类型,默认POST， 如果是GET方式，需要参数设置
            data: params.data || null,//提交参数
            locked: params.locked || null,//是否需要锁定当前点击的按钮，屏蔽连续点击，jquery对象
            loading: params.loading || null,//当前按钮是否需要loading，jquery对象
            dataType: params.dataType || 'json',//返回的数据格式
            url: params.url || null,//可单独传递url， 不传递默认通过以上key值去获取
            urlType: params.urlType || null,//url的类型， 如果有参数，指定到对应站点的url，sellers||admin||development
            accountType: params.accountType || 'sellers',//账户类型， 分别为sellers（卖家）, admin（管理员）, development(开发者)
            other: params.other || null,//ajax需要的其他参数
            token: params.token || null//增加token的入参
        };
        Api.request.ajax(data, option);
    };
    //配置数据的获取
    Api.getData = {
        //获取页面url
        getPageUrl: function (key, accountType) {
            return Global.option.isFile ? Global.file.page[accountType || 'sellers'][key] : Global.dev.page[accountType || 'sellers'][key];
        },
        //获取接口的url
        getApiUrl: function (key, accountType) {
            return Global.option.isFile ? Global.file.api[accountType || 'sellers'][key] + '?r=' + new Date().getTime() : Global.dev.api[accountType || 'sellers'][key];
        },
        //获取code配置
        getCode: function () {
            return Global.option.isFile ? Global.file.code : Global.dev.code;
        },
        //获取用户信息的配置
        getUser: {
            userType: function () {
                return Global.option.isFile ? Global.file.user.userType.split('|') : Global.dev.user.userType.split('|');
            },
            verifyState: function () {
                return Global.option.isFile ? Global.file.user.verifyState.split('|') : Global.dev.user.verifyState.split('|');
            },
            verifyType: function () {
                return Global.option.isFile ? Global.file.user.verifyType.split('|') : Global.dev.user.verifyType.split('|');
            },
            batteryState:function(){
                return Global.option.isFile ? Global.file.user.batteryState.split('|') : Global.dev.user.batteryState.split('|');
            }
        },
        //获取address类型
        getAddressType: function () {
            return Global.option.isFile ? Global.file.addressType : Global.dev.addressType;
        }
    };
    //测试处理
    Api.test = {
        getType: function (type) {
            return Global.option.isFile ? 'GET' : (type || 'POST');
        },
        getAsync: function (async) {
            return Global.option.isFile ? true : (async || false);
        },
        getContentType: function (type, key) {
            return !Global.option.isFile && (type == 'POST' || type == 'PUT' || type == 'DELETE') ? key == 'importSKU' ? { contentType: false } : { contentType: "application/json;" } : null;
        }
    };
    //异步的操作
    Api.request = {
        ajax: function (params, option) {
            var params = !params ? {} : params;
            //判断token是否存在--卖家
            var token = params.token ? params.token : params.accountType == 'sellers' ? Global.option.token : params.accountType == 'admin' ? Global.option.adminToken : Global.option.devToken;
            //console.log(token,params.accountType,params.key);
            if (params.accountType != 'development') {
                if (!token && !params.isToken) {
                    //if (!Global.option.isFile) $.msg.alertLan('token-not-exit');
                    window.location.href = Api.getData.getPageUrl('login', params.accountType);
                    return;
                };
            }
            //初始化参数
            var locked = params.locked || null;
            var loading = params.loading || null;
            var data = params.data || null;
            var key = params.key || null;
            var dataType = (params && params.dataType) || 'json';
            var url = params.url || params.urlType ? Api.getData.getApiUrl(key, params.urlType) : Api.getData.getApiUrl(key, params.accountType);
            var type = Api.test.getType(params.type);
            var async = Api.test.getAsync(params.async);
            //新增token参数
            //if(params.accountType!='development'){if(!params.isToken) {data=$.extend({token:token},data);};}
            //新增语言参数
            //data=$.extend({language:Global.option.language},data);
            //加锁--屏蔽连续点击
            if (locked && $(locked).hasClass('locked')) { return; };
            if (locked) { $(locked).addClass('locked'); }
            //显示loading
            if (loading) { $(loading).addClass('btn-loading'); };
            //修改data为json格式
            var _data = data ? (type == "POST" || type == "PUT" || type == "DELETE") ? JSON.stringify(data) : data : null;
            if (Global.option.isFile) _data = null;
            if (Global.option.isSandBox && (type == "POST" || type == "PUT" || type == "DELETE") && params.key != 'login') return false;
           
            //异步操作
            var ajaxConfig = {
                type: type, dataType: dataType, url: url, data: _data, async: async, cache: false,
                //通过header传递language和token
                beforeSend: function (request) {
                    request.setRequestHeader("language", Global.option.language);
                    if (params.accountType != 'development') {
                        if (!params.isToken) {
                            request.setRequestHeader("token", token);
                        }
                    }
                },
                success: function (msg) {
                    if (params.key === 'apidocs') { if (option.success) option.success(msg, params, 'success'); }
                    Api.request.requestEnd(locked, loading);
                    var codeObj = Api.getData.getCode();
                    //场景测试
                    if (Global.option.isFile && Global.option.urlParam) { Test.run(msg, { key: key, codeObj: codeObj, data: params.data }, Api); };

                    switch (params.accountType) {
                        case 'admin':
                            if (msg.code == codeObj.adminNoLogin) {
                                window.location.href = Api.getData.getPageUrl('login', params.accountType);
                                return;
                            }
                            break;
                        case 'development':
                            break;
                        default:
                            if (msg.code == codeObj.tokenExpired || msg.code == codeObj.noLogin) {
                                window.location.href = Api.getData.getPageUrl('login', params.accountType);
                                return;
                            }
                            break;
                    }
                    console.log(params.key, msg);
                    // 批量删除 批量恢复 
                    // debugger
                    // applyTrackingNo
                    //api的code 需要当前页面处理code状态
                    if (params.key == 'login' || params.key == 'validateEmailCaptcha' || params.key == 'hasNewMessage' || params.key == 'activate' || params.key == 'validateEmail' || params.key == 'deliveryPackages' || params.key == 'saveAuthorizationResult' || params.key == 'adminLogin') {
                        if (option.success) option.success(msg, params);
                        //login页面需要处理错误弹层
                        if (params.key == 'login') {
                            switch (msg.code) {
                                case '11':
                                    $.msg.alertLan('login-error');
                                    break;
                                case '44010003':
                                    $.msg.alertLan('login-error1');
                                    break;
                                case '44010009':
                                    $.msg.alertLan('login-error2');
                                    break;
                            }
                        }
                    }
                    else {
                        if (msg.code == Api.getData.getCode().success) {
                            if (option.success) option.success(msg, params, 'success');
                            // 申请物流单号|恢复包裹|批量  需要弹出失败，成功条数
                            if ((params.key == 'applyTrackingNo' || params.key == 'restorePackages') && params.data.packageIds.length > 1) {
                                $.msg.alert(msg.message);
                            }
                        } else {
                            //弹层显示错误message
                            if (msg.message) $.msg.alert(msg.message); //Global.fun.msgPop(msg.message, 0);
                        }
                    }
                },
                error: function (msg) {
                    if(params.key=='selectDeliveryPreference'){
                        // debugger
                    }
                    Api.request.requestEnd(locked, loading);
                    if (option.error) option.error(msg, params, 'error');
                    // 加个弹层
                    if (msg.status == '401') {
                        window.location.href = Api.getData.getPageUrl('login', params.accountType);
                    } else {
                        if (msg.message) Global.fun.msgPop(msg.message, 0);
                    }
                },
                complete: function (msg) {
                    $.loading.hide();
                    if (option.complete) option.complete(msg, params, 'complete');
                    Api.request.requestEnd(locked, loading);
                }
            };
            var contentType = Api.test.getContentType(type, key);
            if (contentType) { ajaxConfig = $.extend(ajaxConfig, contentType); }
            if (params.other) { ajaxConfig = $.extend(ajaxConfig, params.other); }
            console.log('request:::', data, { ajaxConfig: ajaxConfig });
            $.ajax(ajaxConfig);
            //$.loading.show({dom:'body'});
        },
        //ajax结束（success,error）
        requestEnd: function (locked, loading) {
            //解锁
            if (locked) { $(locked).removeClass('locked'); }
            //关闭loading
            if (loading) { $(loading).removeClass('btn-loading'); }
            //关闭全屏弹层
            // $.loading.hide();
        }
    };
    return Api;
});