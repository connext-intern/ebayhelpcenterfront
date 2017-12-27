/**
 *louis/20170803, common
 */
define('common', ['api', 'global', 'data'], function (Api, Global, Data) {
    var $common = {
        guestPage: ['login', 'register', 'register-success', 'forgetPassword', 'static', 'activation', 'resetPassword', 'subuserSetPassword', 'admin-forgetPassword', 'admin-resetPassword'], //不需要获取用户信息的页面
        isLoadHtml: true, //记录初始化的html加载
        noUserSuberPage: [
            Global.option.isFile ? Api.getData.getPageUrl('eBayIDManage').split('.')[0] : Api.getData.getPageUrl('eBayIDManage').split('/')[2],
            Global.option.isFile ? Api.getData.getPageUrl('subManage').split('.')[0] : Api.getData.getPageUrl('eBayIDManage').split('/')[2],
            Global.option.isFile ? Api.getData.getPageUrl('financeInfo').split('.')[0] : Api.getData.getPageUrl('financeInfo').split('/')[2],
            Global.option.isFile ? Api.getData.getPageUrl('devManage').split('.')[0] : Api.getData.getPageUrl('devManage').split('/')[2],
            Global.option.isFile ? Api.getData.getPageUrl('preferencesOrderSource').split('.')[0] : Api.getData.getPageUrl('preferencesOrderSource').split('/')[2],
            Global.option.isFile ? Api.getData.getPageUrl('dashboard').split('.')[0] : Api.getData.getPageUrl('dashboard').split('/')[2]
        ]
    };
    $common.initialize = function () {
        //记录当前页面是否为强制登录页面
        Global.option.isGuestPage = $.inArray(curPage.split('/').length > 2 ? curPage.split('/')[2] : curPage.split('/')[1], this.guestPage) >= 0;
        //记录token值
        Global.option.token = $.cookite.getCookie('_token'); //卖家
        Global.option.adminToken = $.cookite.getCookie('_admin_token'); //管理员
        Global.option.devToken = $.cookite.getCookie('_dev_token'); //开发者
        //记录初始语言
        Global.option.language = ($('.admin').length > 0 || $('.development').length > 0) ? 'zh-cn' : ($.cookite.getCookie('_language') || this.language.init());
        //记录url上的参数
        Global.option.urlParam = this.fun.getUrlAllParam();
        //记录更新语言的方法
        Global.fun.updataLanguage = this.language.updata;
        //记录切换语言的方法
        Global.fun.changeLanguage = this.language.change;
        //记录更新面包屑的方法
        Global.fun.updataCrumbs = this.methods.fun.crumbs;
        //记录开始加载data-htmlfile的方法
        Global.fun.startLoadHtml = this.startLoadHtml;
        //记录用户索引查询方法
        Global.fun.getUserIndex = this.methods.fun.user;
        Global.fun.dev_getSsoUrl = this.methods.fun.dev_getSsoUrl;
        Global.fun.toThousands = this.methods.fun.toThousands;
        //跳转链接
        Global.fun.redirect = this.fun.redirect;
        //更新url
        Global.fun.replaceHref = this.methods.fun.replaceHref;
        //MSG弹窗
        Global.fun.msgPop = this.methods.fun.msgPop;
    };
    $common.load = function () {
        if ($('.main').hasClass('admin')) {
            $('body').addClass('background');
        }
        //加载语言文件配置
        this.language.loadConfig(Global.option.language, function () {
            /******语言配置完成后处理登录状态*****/
            //判断站点是不是开发者
            if ($('.development').length <= 0) {
                //不是登录/注册页面的时候，获取登录信息
                if (!Global.option.isGuestPage) {
                    Api.set({
                        key: 'userinfo',
                        type: 'GET',
                        isToken: false,
                        accountType: $('.admin').length > 0 ? 'admin' : null
                    }, {
                        success: function (data) {
                            //储存user信息
                            Global.option.user = data.result;
                            if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                                console.log(window.location.href, $common.noUserSuberPage);
                                for (var i = 0; i < $common.noUserSuberPage.length; i++) {
                                    if (window.location.href.indexOf($common.noUserSuberPage[i]) > -1) {
                                        window.location.href = Api.getData.getPageUrl('pendingOrder');
                                        return;
                                    }
                                }
                            };
                            //推送js入口
                            $common.loadUserStatus();
                        }
                    });
                    return;
                }
            }
            //推送js入口
            $common.loadUserStatus();
        });
    };
    //加载所有外部html文件,一张页面只能初始化一次
    $common.startLoadHtml = function (callback) {
        if (!$common.isLoadHtml) return;
        $common.isLoadHtml = false;
        $.loadHtml.start('body', function () {
            $(".page").show();
            $common.methods.run();
            $common.language.updata();
            if (callback) callback();
        });
    };
    //common中的方法
    $common.methods = {
        //common功能及业务初始化
        run: function () {
            //记录header的vue控件及header功能初始化
            Global.fun.headerVue = this.page.header.init();
            if (!Global.option.isGuestPage && $('.admin').length <= 0 && $('.development').length <= 0) {
                this.page.header.api();
            }
            //development的头部
            this.page.developmentHeader();
            //全局事件
            this.event();
            //初始化href替换
            this.fun.replaceHref();
            //初始化右边菜单数据
            if ($('.menu-left').length > 0) {
                Global.fun.menuVue = this.page.personal.menu.init();
            }
            //初始化header数据
            if ($('header.header-account').length > 0) {
                this.page.header.accountLanguage.setData();
            };
            //adminmenu
            $(".menu-left.admin-menu").delegate("dt", "click", function (evt) {
                $(evt.currentTarget).siblings('dd').slideToggle(150);
            });
        },
        event: function () {
            $('header.header-personal .popup .close').bind('click', function () {
                $(this).parents('.popup').hide();
                return false;
            });
            //header语言选择
            $('header .language .tips a').bind('click', function () {
                $common.methods.page.header.accountLanguage.subSelect(this);
                return false;
            });
            //页面点击事件
            $(window).bind('click', function (e) {
                $common.methods.page.stage(e);
            });
            //退出登录
            $('.js-loginout').bind('click', function () {
                $common.methods.page.header.loginout(this);
                return false;
            });
            $('.js-admin-loginout').bind('click', function () {
                $common.methods.page.header.adminLoginout(this);
                return false;
            });
            //关闭msgpopup
            if ($('.popup.msgPopup').length > 0) {
                $('.popup.msgPopup').find('.close').click(function () {
                    $('.popup.msgPopup').hide();
                });
            }
        },
        page: {
            personal: {
                menu: {
                    init: function () {
                        return new Vue({
                            el: '.menu-left',
                            data: {
                                hignlight: {
                                    index: 0,
                                    subIndex: 0
                                },
                                isPersonal: $('.personal-center').length > 0,
                                items: null
                            },
                            mounted: function () {
                                //菜单根据账号权限做不同显示
                                //$('.personal-center').length > 0 ? Data.personal.menu : $('.preferences').length > 0 ? Data.preferences.menu : $('.order').length > 0 ? Data.order.menu : $('.shipping-page').length > 0 ? Data.shipping.menu : $('.messages-page').length > 0 ? Data.messages.menu : $('.shipping-policies-page').length > 0 ? Data.shippingPolicies.menu : $('.admin').length > 0 ? Data.admin.menu : null
                                //个人中心
                                if ($('.personal-center').length > 0) {
                                    if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                                        this.items = Data.personal.menuSub;
                                    } else {
                                        this.items = Data.personal.menu;
                                    }
                                };
                                //偏好设置
                                if ($('.preferences').length > 0) {
                                    if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                                        this.items = Data.preferences.menuSub;
                                    } else {
                                        this.items = Data.preferences.menu;
                                    }
                                }
                                //订单管理
                                if ($('.order').length > 0) {
                                    this.items = Data.order.menu;
                                }
                                //物流列表
                                if ($('.shipping-page').length > 0) {
                                    this.items = Data.shipping.menu;
                                }
                                //站内信列表
                                if ($('.messages-page').length > 0) {
                                    this.items = Data.messages.menu;
                                }
                                //物流政策列表
                                if ($('.shipping-policies-page').length > 0) {
                                    this.items = Data.shippingPolicies.menu;
                                }
                                //admin站点
                                if ($('.admin-menu').length > 0) {
                                    var _controlObj = Data.admin.meunList;
                                    var _arr = JSON.parse(sessionStorage.getItem('adminLogin')).roles;
                                    for (var i = 0; i < _arr.length; i++) {
                                        var _pStr = _arr[i].code;
                                        _controlObj[_pStr] = {
                                            boo: true,
                                            value: _arr[i].value
                                        };
                                    }
                                    var _menuItem = Data.admin.menu;
                                    for (var o = _menuItem.length - 1; o >= 0; o--) {
                                        if ("show" in _menuItem[o]) continue;
                                        if (_menuItem[o].item != null) {
                                            //有子菜单
                                            var _boo = 0;
                                            $.each(_menuItem[o].item, function (index, item) {
                                                var _pStr = item.code;
                                                if (_pStr) _menuItem[o].item[index].show = _controlObj[_pStr].boo;
                                                if (_pStr) _menuItem[o].item[index].value = _controlObj[_pStr].value;
                                                if (_controlObj[_pStr].boo) _boo++;
                                            });
                                            _menuItem[o].show = _boo > 0;
                                        } else {
                                            //没有子菜单
                                            var _pStr = _menuItem[o].code;
                                            if (_pStr) _menuItem[o].show = _controlObj[_pStr].boo;
                                            if (_pStr) _menuItem[o].value = _controlObj[_pStr].value;
                                        }
                                    }
                                    this.items = _menuItem;
                                }
                            },
                            updated: function () {
                                Global.fun.updataLanguage('.menu-left');
                                //获取站点
                                var accountType = $('.admin').length > 0 ? 'admin' : null;
                                $common.methods.fun.replaceHref('.menu-left', null, accountType);
                                // Global.fun.replaceHref('.menu-left');
                            },
                            methods: {
                                toThousands: Global.fun.toThousands,
                                updataPageNum: function (pending, pendingPickup, delivered, exception, deleted) {
                                    var setNumObj = arguments[0];
                                    if (typeof setNumObj === 'object') {
                                        setNumObj.value = setNumObj.value || 0;
                                        if (setNumObj.key === 'pending') {
                                            this.items[0].item[0].num = setNumObj.value;
                                        } else if (setNumObj.key === 'pendingPickup') {
                                            this.items[0].item[1].num = setNumObj.value;
                                        } else if (setNumObj.key === 'delivered') {
                                            this.items[0].item[2].num = setNumObj.value;
                                        } else if (setNumObj.key === 'exception') {
                                            this.items[0].item[4].num = setNumObj.value;
                                        } else if (setNumObj.key === 'deleted') {
                                            this.items[0].item[5].num = setNumObj.value;
                                        }
                                    } else {
                                        this.items[0].item[0].num = pending || 0;
                                        this.items[0].item[1].num = pendingPickup || 0;
                                        this.items[0].item[2].num = delivered || 0;
                                        this.items[0].item[4].num = exception || 0;
                                        this.items[0].item[5].num = deleted || 0;
                                    }
                                }
                            }
                        });
                    }
                }
            },
            header: {
                init: function () {
                    if ($('header.header-admin').length > 0) {
                        var _loginData = JSON.parse(sessionStorage.getItem('adminLogin'));
                        if (!_loginData) {
                            window.location.href = Api.getData.getPageUrl('login', "admin");
                            return;
                        }
                        $('header.header-admin .header-content .userName .acountUser').html(_loginData.email);
                    }
                    if ($('header.header-personal').length <= 0) return;
                    if ($('.main').hasClass('order')) {
                        $('header.header-personal .order-management').addClass('cur');
                    }
                    if ($('.main').hasClass('help')) {
                        $('header.header-personal .help-center .title').addClass('cur');
                    }
                    return new Vue({
                        el: 'header',
                        data: {
                            link: {
                                accountInfo: Api.getData.getPageUrl('accountInfo'),
                                upgradeBusinessUser: Api.getData.getPageUrl('upgradeBusinessUser'),
                                immediatelyCertification: Api.getData.getPageUrl('immediatelyCertification')
                            },
                            isSandBox:Global.option.isSandBox,
                            user: Global.option.user, //用户信息
                            subAccount: Api.getData.getUser.userType()[0], //子账号信息
                            mainAccount: Api.getData.getUser.userType()[1], //主账号信息
                            verifyState: $common.methods.fun.user.verifyState(), //对应状态索引值,0|1|2
                            verifyType: $common.methods.fun.user.verifyType(), //对应状态索引值,0|1
                            languageItem: Data.select.language, //语言数据
                            language: Global.option.language,
                            isMessage: false, //是否有未读站内信
                            search: {
                                data: Data.select.searhList,
                                lg: Data.select.searhList[0].lg,
                                index: 0,
                                id: Data.select.searhList[0].id
                            }, //搜索数据
                            help: {
                                select: {
                                    data: Data.select.helpList,
                                    index: -1
                                }
                            } //帮助中心信息
                        },
                        mounted: function () {
                            var that = this;
                            if ($('header.header-personal').length > 0) {
                                if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                                    $('header .logo .img,header .logo .system').attr('href', 'javascript:;').removeAttr('data-href').css({
                                        'cursor': 'default'
                                    });
                                    $('header .setUp a').attr('data-href', 'preferencesSku');
                                    Global.fun.replaceHref('header');
                                }
                            }
                        },
                        methods: {
                            selectList: function (event, index, lg, id) {
                                this.search.lg = lg;
                                this.search.id = id;
                                this.search.index = index;
                            },
                            startSearch: function () {
                                var val = $('.search .groupInput').val();
                                window.location.href = Api.getData.getPageUrl('order') + '?' + this.search.id + '=' + val;
                            },
                            dev_getSsoUrl: Global.fun.dev_getSsoUrl,
                        },
                        updated: function () {
                            $common.language.updata('header');
                        }
                    });
                },
                api: function () {
                    Api.set({
                        key: 'hasNewMessage',
                        type: 'GET',
                        isToken: false
                    }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                if (Global.fun.headerVue) Global.fun.headerVue.isMessage = data.result === 0 ? true : false;
                            }
                        }
                    });
                },
                accountLanguage: {
                    setData: function () {
                        var obj = Data.select.language[$common.fun.getArrayIndex(Global.option.language, Data.select.language, 'id')];
                        var other = $common.fun.getArrayOther(Global.option.language, Data.select.language, 'id');
                        $('.js-changelanguage').html(obj.text).attr('data-id', obj.id);
                        $('.dropdown-menu li').each(function (index) {
                            $(this).find('a').html(other[index].text).attr('data-id', other[index].id);
                        });
                    },
                    subSelect: function (el) {
                        $common.language.change($(el).attr('data-id'));
                        if ($(el).parents('.header-account').length > 0) {
                            this.setData();
                        }
                        $(el).parents('.language').removeClass('cur');
                        if (Global.fun.headerVue) Global.fun.headerVue.language = Global.option.language;
                    }
                },
                loginout: function (el) {
                    Api.set({
                        key: 'logout',
                        type: 'GET',
                        isToken: false,
                        locked: el
                    }, {
                        success: function (data) {
                            if (data.code == Api.getData.getCode().success) {
                                $.cookite.delCookie('_token');
                                window.location.href = Api.getData.getPageUrl('login');
                            } else {
                                $.msg.alert(data.message);
                            }
                        }
                    });
                },
                adminLoginout: function (el) {
                    Api.set({
                        key: 'adminLogout',
                        type: 'GET',
                        accountType: 'admin',
                        isToken: false,
                        locked: el
                    }, {
                        success: function (data) {
                            if (data.code == Api.getData.getCode().success) {
                                $.cookite.delCookie('_admin_token');
                                window.location.href = Api.getData.getPageUrl('login', 'admin');
                            } else {
                                $.msg.alert(data.message);
                            }
                        }
                    });
                }
            },
            stage: function (e) {
                if ($(e.target).hasClass('js-tips') || $(e.target).parents(".js-tips").length > 0) {
                    var _target = $(e.target).hasClass('js-tips') ? $(e.target) : $(e.target).parents(".js-tips");

                    $(".js-tips").each(function () {
                        if ($(this)[0] != _target[0]) {
                            $(this).parent().removeClass('cur');
                        } else {
                            if ($(this).parent().hasClass('cur')) {
                                $(this).parent().removeClass('cur');
                            } else {
                                $(this).parent().addClass('cur');
                            }
                        }
                    });
                } else {
                    $(".js-tips").each(function () {
                        $(this).parent().removeClass('cur');
                    });
                };
            },
            developmentHeader: function () {
                if ($('header.header-development').length <= 0) return;
                var _highLightIndex = -1;
                if ($('.page.home').length > 0) _highLightIndex = 0;
                if ($('.page.api-document').length > 0) _highLightIndex = 1;
                if ($('.page.sdk-download').length > 0) _highLightIndex = 2;
                if ($('.page.online-test').length > 0) _highLightIndex = 3;
                if (_highLightIndex >= 0) $('header.header-development ul.right li').removeClass('cur').eq(_highLightIndex).addClass('cur');
            }
        },
        fun: {
            toThousands: function (num) {
                var num = (num || 0).toString(),
                    result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
                return result;
            },
            dev_getSsoUrl: function (_str) {
                if (_str.length > 0) {
                    var that = this;
                    var _stauts = Api.getData.getCode();
                    var _data = {
                        direction: _str
                    }
                    Api.set({
                        key: 'getSsoUrl',
                        type: 'GET',
                        isToken: false,
                        data: _data
                    }, {
                        success: function (data, params) {
                            if (data.code == _stauts.success) {
                                // window.location.href = data.result;
                                Global.fun.redirect(data.result, '_blank');
                            }
                        }
                    });
                }
            },
            //修改herf
            replaceHref: function (module, key, accountType) {
                var newModule = module ? $(module).find('[data-href]') : $('[data-href]');
                newModule.each(function () {
                    var _key = key || $(this).attr('data-href');
                    var _accountType = accountType || $(this).attr('accountType') || null;
                    var _href = Api.getData.getPageUrl(_key, _accountType);
                    if (!_href) {
                        $(this).attr({
                            'href': 'javascript:void(0);'
                        }).addClass('disabled');
                        return;
                    }
                    if ($(this).attr('href-param')) {
                        _href = _href + $(this).attr('href-param');
                    }
                    $(this).attr({
                        'href': _href
                    });
                });
            },
            //修改面包屑
            crumbs: function (arr, accountType) {
                return; // 需求要求去掉面包屑 2017.11.13
                if ($('.crumbs').length <= 0) return;
                if (Global.option.user.userType == Api.getData.getUser.userType()[0]) {
                    arr.unshift({
                        lg: 'home',
                        link: 'pendingOrder'
                    });
                } else {
                    arr.unshift({
                        lg: 'home',
                        link: 'dashboard'
                    });
                }
                $.each(arr, function (index, item) {
                    var link = (!item.link || item.link == '') ? 'javascript:;' : Api.getData.getPageUrl(item.link, accountType);
                    $('.crumbs').append('<a href="' + link + '" lg="' + item.lg + '"></a>');
                });
                $common.language.updata('.crumbs');
            },
            //信息弹窗
            msgPop: function (_string, _type) {
                var el = $('.popup.msgPopup');
                var type = _type || 0;
                type == 1 ? el.addClass('style1') : el.removeClass('style1');
                el.find('.msg').html(_string);
                var zIndex = 10;
                $('.popup').each(function (item) {
                    if ($(this).css('display') == 'block') {
                        zIndex = zIndex + $(this).css('z-index');
                    }
                });
                el.css({
                    'z-index': zIndex
                });
                el.show();
            },
            //获取用户信息索引
            user: {
                userType: function () {
                    return $common.fun.getArrayIndex(Global.option.user.userType, Api.getData.getUser.userType());
                },
                verifyState: function () {
                    return $common.fun.getArrayIndex(Global.option.user.verifyState, Api.getData.getUser.verifyState());
                },
                verifyType: function () {
                    return $common.fun.getArrayIndex(Global.option.user.verifyType, Api.getData.getUser.verifyType());
                }
            }
        }
    };
    Array.prototype.unique1 = function () {
        var res = [];
        var json = {};
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    };
    //全局功能
    $common.fun = {
        getUrlParam: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getUrlAllParam: function () {
            var obj = new Object();
            if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
                var strs = unescape(window.location.search).substring(1, window.location.search.length).split('&');
                for (var i = 0; i < strs.length; i++) {
                    obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return obj;
        },
        redirect: function (url, target) {
            var objA = document.createElement('a');
            objA.target = target;
            objA.href = url;
            document.body.appendChild(objA);
            objA.click();
            document.body.removeChild(objA);
            return false;
        },
        getArrayIndex: function (str, arr, key) {
            for (var i = 0; i < arr.length; i++) {
                if (key) {
                    if (str == arr[i][key]) return i;
                } else {
                    if (str == arr[i]) return i;
                }
            }
            return -1;
        },
        getArrayOther: function (str, arr, key) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (key) {
                    if (str != arr[i][key]) newArr.push(arr[i]);
                } else {
                    if (str != arr[i]) newArr.push(arr[i]);
                }
            }
            return newArr;
        }
    };
    //语言模块
    $common.language = {
        //加载对应语言的js文件
        loadConfig: function (str, callback) {
            if (str == typeof undefined) {
                str = this.init();
                Global.option.language = str;
            }
            $('body').removeClass('en-us').removeClass('zh-cn').addClass(Global.option.language);
            $.javaSrcipt.start('/build/js/language/', [str], function () {
                if (callback) callback();
            });
        },
        //初始化浏览器的语言版本
        init: function () {
            var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
            if (!currentLang) { //判断IE浏览器使用语言
                currentLang = navigator.browserLanguage;
            }
            currentLang = currentLang.toLowerCase();
            if (currentLang == 'zh-cn') return currentLang;
            if (currentLang == 'zh-hk' || currentLang == 'zh-tw') return 'zh-hk';
            if (currentLang.indexOf('en-') > -1) return 'en-us';
            return 'zh-cn';
        },
        //更新html中的ui语言
        updata: function (module) {
            var newModule = module || 'body';
            //console.log($(newModule)[0]);
            $(newModule).find('[lg]').each(function () {
                var arr = $(this).attr('lg').split(',');
                var arrTemp = [];
                arr.forEach(function (item) {
                    if (item == '-') {
                        arrTemp.push('-');
                    } else {
                        arrTemp.push(languages[item]);
                    };
                });
                if (this.tagName == 'INPUT') {
                    $(this).attr('placeholder', arrTemp.join(''));
                } else {
                    $(this).html(arrTemp.join(''));
                }
            });
            $(newModule).find('[title]').each(function () {
                var _title = $(this).attr('title');
                _title = (tipsMsgs[_title] || errorMsgs[_title]) || _title;
                this.title = _title;
            });
        },
        //切换语言
        change: function (str) { //'zh-cn','zh-hk','en-us'
            Global.option.language = str;
            $.cookite.addCookie('_language', str);
            $common.language.loadConfig(str, function () {
                $common.language.updata();
            });
        }
    };
    return $common;
});