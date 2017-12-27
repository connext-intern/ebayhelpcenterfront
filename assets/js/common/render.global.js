/**
 *louis/20170803, 相关数据，
 * 1. 包含有静态环境和接口环境的url配置
 * 2. 全局变量储存
 */
define('global', [], function () {
    var Global = {};
    //所有全局变量储存
    Global.option = {
        isSandBox: false, //是否是沙箱环境
        isFile: window.location.href.indexOf('.html') > -1,//判断是否本地环境
        token: null,//api请求需要的卖家token值
        adminToken: null,//api请求需要的管理员token值
        devToken: null,//api请求需要的开发者token值
        language: null,//默认中文语言
        user: null,//用户基本信息
        isGuestPage: false,//当前页面是否不需要用户状态等信息
        host: window.location.host,//获取当前url域名
        urlParam: null//url地址的参数
    };
    //所有全局方法储存
    Global.fun = {
        changeLanguage: null,//切换语言，params(str); eg:'zh-cn','zh-hk','en-us'
        updataLanguage: null,//更新语言, params：(module); eg:'.wrapper'
        updataCrumbs: null,//新增面包屑,params :(array,type); eg:[{lg:'t1',link:'home'},{lg:'t1,t2',link:'xxx'}], 'sellers||admin||development'
        startLoadHtml: null,//通知框架开始执行data-htmlfile加载, params:(callback);eg:function(){}
        getUserIndex: null,//获取用户状态的索引值，params:(null);
        replaceHref: null,//更新url配置
        headerVue: null,//header数据vue控件
        menuVue: null//menu数据的vue控件
    };
    //本地环境路径及api配置
    Global.file = {
        code: {
            success: '00',//通过
            tokenExpired: -1,//token失效
            noLogin: -2,//未登录
            adminNoLogin: 11, //admin未登录
            form: -3,//form表单提交报错
            fail: '',//api操作失败
            timeout: '44010010'//超时
        },
        user: {
            batteryState: '000|111|001|010|011|100|101|110', // 电池认证
            userType: 'a|b|c|d',//账号类型： 子账号||主账号||管理员||开发者
            verifyState: '1|2|3',//认证状态：已认证||未认证||认证中
            verifyType: '1|2'//认证类型：个人认证||企业认证
        },
        addressType: {
            send: 'SHIPPING',//发货
            return: 'RETURN',//退货
            pickUp: 'CANVASSION'//揽货
        },
        page: {
            sellers: {
                //第三方平台
                upgradeBusinessUser: 'upgradeBusinessUser',//升级为企业用户
                immediatelyCertification: 'immediatelyCertification',//立即认证
                viewCertificationInfo: 'viewCertificationInfo',//查看认证信息
                improvePersonalInfo: 'improvePersonalInfo',//完善个人信息
                messageCenter: 'messageCenter',//消息中心
                developerPlatform: 'open/home',//开发者平台
                toCharge: 'toCharge', //第三方充值
                //最新公告
                notices: 'notices.html',//最新公告
                messages: 'messages.html',//最新公告
                messagesDetail: 'messages-detail.html',//最新公告详情
                shippingList: 'shipping-list.html',//物流详情列表
                shippingDetail: 'shipping-detail.html',//物流详情
                shippingPolicyList: 'shipping-policies-list.html',//物流政策列表
                shippingPolicyIdDetail: 'shipping-policies-detail.html',//物流政策详情
                //账户中心
                login: 'login.html',//账号信息--登录
                register: 'register.html',//账号信息--注册
                registerSuccess: 'register-success.html',//账号信息--注册完成
                registerFailed: 'register-failed.html',//账号信息--注册失败
                registerTimeout: 'register-timeout.html',//账号信息--验证超时
                forgetPassword: 'forget-password.html',//账号信息--忘记密码
                resetPassword: 'reset-password.html',//账号信息--修改密码
                resetPasswordSuccess: 'reset-password-success.html',//账号信息--修改密码成功
                resetPasswordFailed: 'reset-password-failed.html',//账号信息--修改密码失败
                resetPasswordTimeout: 'reset-password-timeout.html',//账号信息--修改密码超时
                //个人中心
                accountInfo: 'personal-accountinfo.html',//个人中心--账户信息
                eBayIDManage: "personal-manage-id.html",//个人中心--eBayID管理
                subManage: "personal-manage-operator.html",//个人中心--子账号管理
                financeInfo: "finance-manage.html",//个人中心--财务信息
                dataStatistics: "data-statistics.html",//个人中心--数据统计
                devManage: "dev-manage.html",//个人中心--开发者管理
                subuserSetPassword: "subuser-set-password.html",//个人中心--操作员管理--新建操作员后设置密码页面
                //偏好设置
                preferencesOrderSource: 'preferences-order-source.html',//偏好设置-订单来源
                preferencesSku: 'preferences-sku.html',//偏好设置-SKU预设
                preferencesAdr: 'preferences-adr.html',//偏好设置-地址管理
                preferencesDeliver: 'preferences-deliver.html',//偏好设置-交运偏好
                preferencesLogistics: 'preferences-logistics.html',//偏好设置-物流偏好
                preferencesPrint: 'preferences-print.html',//偏好设置-打印偏好
                //dashboard
                dashboard: 'dashboard.html',//dashboard页面
                //订单管理
                order: 'order.html',//全部订单
                pendingOrder: 'order-pending.html',//待处理订单
                packageError: 'order-package-error.html',//异常包裹
                packageView: 'order-package-view.html',//查看包裹
                waitingPickedUpOrder: 'order-waiting-picked-up.html',//待取件订单
                deliveryInquireOrder: 'order-delivery-inquire.html',//物流查询订单
                deletedOrder: 'order-deleted.html',//已删除订单
                packageEdit: 'order-package-edit.html',//包裹编辑
                PackOrderRule: 'order-pack-rule.html',//订单合并规则
                //物流服务
                logisticsService: 'logistics-service-list.html'//物流服务一览
            },
            admin: {
                login: 'login.html',//登录
                forgetPwd: 'admin-forget-password.html', // 忘记密码
                passwordActivation: 'admin-reset-password-activation.html', // 激活-重置密码
                adminResetPassword: 'admin-reset-password.html',//重置密码
                packageInfoQuery: 'package-info-query.html',//首页-包裹信息查询
                userAccountManagement: 'user-account-management.html',//用户账号管理
                resetPasswordSuccess: 'reset-password-success.html',//账号信息--修改密码成功
                subuserSetpasswordSuccess: 'subuser-setpassword-success.html',//管理员账号密码设置成功
                adSlotManagement: 'ad-slot-management.html',//广告位管理
                stationLetterManagement: 'station-letter-management.html',//站内信管理
                stationLetterManagementEdit: 'station-letter-management-edit.html',//站内信管理编辑
                stationLetterManagementReadonly: 'station-letter-management-readonly.html',//站内信管理查看
                logisticsArticleManagement: 'logistics-article-management.html',//物流文章管理
                logisticsArticleManagementEdit: 'logistics-article-management-edit.html',//物流文章管理编辑
                whiteListManagement: 'white-list-management.html',//白名单管理
                developmentGuide: 'development-guide.html',//开发指南
                developmentGuideEdit: 'development-guide-edit.html',//开发指南编辑
                SDKManagement: 'sdk-management.html',//SDK管理
                APIDocumentManagement: 'api-document-management.html',//API文档管理
                APIDataReport: 'api-data-report.html',//API调用数据报告
                backstageUserManagement: 'backstage-user-management.html',//后台用户管理
                dataOutput: 'data-output.html',//数据导出
                logisticsServiceInfo: 'logistics-service-info.html',//物流服务信息列表
                logisticsServiceInfoDetail: 'logistics-service-info-detail.html',//物流服务信息详情
                subuserSetPassword: 'subuser-set-password.html',//子账号设置密码
                addoperatorActivation: 'addoperator-activation.html'//子账号激活成功
            },
            development: {
                sandbox: 'http://9660a58d-6572-440f-9da7-452342697c09.cloudapp.net/', // 沙箱地址
                home: 'home.html',//首页
                apiDocumentList: 'api-document-list.html',//api文档列表
                apiDocumentDetail: 'api-document-detail.html',//api文档详情
                SDKDownload: 'sdk-download.html',//SDK下载
                onlineTest: 'online-test.html',//在线测试
                developmentGuideList: 'development-guide-list.html',//开发指南列表
                developmentGuideDetail: 'development-guide-detail.html',//开发指南详情
                latestAnnouncement: 'latest-announcement.html'//最新公告
            }
        },
        api: {
            sellers: {
                //账户信息
                userinfo: '/assets/api/userinfo.json',//获取用户信息
                login: '/assets/api/login.json',//登录
                verifyCode: '/assets/api/verifyCode.json',//获取验证码
                logout: '/assets/api/logout.json',//登出
                register: '/assets/api/register.json',//注册
                forgetPassword: '/assets/api/forgetPassword.json',//忘记密码
                modifyPassword: '/assets/api/modifyPassword.json',//设置新密码
                activate: '/assets/api/activate.json',//激活账号
                validateEmailCaptcha: '/assets/api/validateEmailCaptcha.json', // 状态页 忘记密码
                //个人中心-eBayID管理
                getEbayIds: '/assets/api/getEbayIds.json',//获取ebayID列表
                getAuthorizationUrl: '/assets/api/getAuthorizationUrl.json',//获取绑定ebayID地址
                saveAuthorizationResult: '/assets/api/saveAuthorizationResult.json',//授权结果保存
                revokeAuthorization: '/assets/api/revokeAuthorization.json',//取消授权
                assignSubuser: '/assets/api/assignSubuser.json',//指定操作员
                //个人中心-操作员管理
                getUsers: '/assets/api/getUsers.json',//获取操作员列表
                getSubusers: '/assets/api/getSubusers.json',//获取操作员列表
                saveSubuser: '/assets/api/saveSubuser.json',//添加操作员
                updateSubuser: '/assets/api/updateSubuser.json',//更新操作员
                setSubuserState: '/assets/api/setSubuserState.json',//停用/启用操作员
                deleteSubuser: '/assets/api/deleteSubuser.json',//删除操作员
                validateEmail: '/assets/api/validateEmail.json',//新建操作员后，验证邮箱链接
                setPassword: '/assets/api/setPassword.json',//新建操作员后，邮箱验证通过，设置密码
                //个人中心-财务信息
                getAccounts: '/assets/api/getAccounts.json',//获取所有币种账户信息
                getAccountsSummary: '/assets/api/getAccountsSummary.json',//获取费用汇总
                getAccountBills: '/assets/api/getAccountBills.json',//获取流水信息
                exportAccountBills: '/assets/api/exportAccountBills.json',//导出流水信息
                //个人中心-数据统计
                getStatistics: '/assets/api/getStatistics.json',//获取数据统计
                exportStatistics: '/assets/api/exportStatistics.json',//数据统计导出
                //个人中心-开发者管理
                applyDeveloperID: '/assets/api/applyDeveloperID.json',//申请开发者ID
                getDeveloperInfo: '/assets/api/getDeveloperInfo.json',//查询开发者信息
                resetSecret: '/assets/api/resetSecret.json',//重置秘钥
                applyThirdPartyDeveloper: '/assets/api/applyThirdPartyDeveloper.json',//申请成为第三方开发者
                getAuthThirdPartyDevelopers: '/assets/api/getAuthThirdPartyDevelopers.json',//查询已授权的第三方开发者
                getThirdPartyDeveloperByDeveloperId: '/assets/api/getThirdPartyDeveloperByDeveloperId.json',//根据第三方开发者id查询开发者信息
                authorizeThirdPartyDeveloper: '/assets/api/authorizeThirdPartyDeveloper.json',//授权
                developerRevokeAuthorization: '/assets/api/revokeAuthorization.json',//取消授权
                //偏好设置-订单来源
                firstLogin: '/assets/api/firstLogin.json',
                setOrderSource: '/assets/api/setOrderSource.json',//设置订单来源
                //偏好设置-SKU预设
                getSKUs: '/assets/api/getSKUs.json',//获取SKU列表
                createSKU: '/assets/api/createSKU.json',//新增SKU
                updateSKU: '/assets/api/updateSKU.json',//更新SKU
                deleteSKU: '/assets/api/deleteSKU.json',//删除SKU
                repeatSKU: '/assets/api/repeatSKU.json',//SKU上传重复数据处理
                importSKU: '/assets/api/importSKU.json',//SKU上传
                exportSKU: '/assets/api/exportSKU.json',//SKU导出
                getSKUTemplate: '/assets/api/getSKUTemplate.json',//下载SKU模板
                //偏好设置-地址管理
                getAddresses: '/assets/api/getAddresses.json',//获取地址列表
                getAddress: '/assets/api/getAddress.json',//获取地址信息
                createAddress: '/assets/api/createAddress.json',//添加地址
                updateAddress: '/assets/api/updateAddress.json',//更新地址
                deleteAddress: '/assets/api/deleteAddress.json',//删除地址
                setDefaultAddress: '/assets/api/setDefaultAddress.json',//设为默认地址
                getOrigin: '/assets/api/getOrigin.json',//获取原产地
                //偏好设置-打印偏好
                getPrintPreference: '/assets/api/getPrintPreference.json',//获取已设置的打印偏好
                updatetPrintPreference: '/assets/api/updatetPrintPreference.json',//更新打印偏好
                //偏好设置-交运偏好
                getDeliveryPreferences: '/assets/api/getDeliveryPreferences.json',//获取交运偏好列表
                createDeliveryPreference: '/assets/api/createDeliveryPreference.json',//新增交运偏好
                updateDeliveryPreference: '/assets/api/updateDeliveryPreference.json',//更新交运偏好
                deleteDeliveryPreference: '/assets/api/deleteDeliveryPreference.json',//删除交运偏好
                getSites: '/assets/api/getSites.json',//获取卖家自送站点
                updateDefault: '/assets/api/updateDefault.json',//设置交运偏好的默认揽货地址

                //偏好设置-物流偏好
                getShippingPreferences: '/assets/api/getShippingPreferences.json',//获取物流偏好列表
                createShippingPreference: '/assets/api/createShippingPreference.json',//新增物流偏好
                updateShippingPreference: '/assets/api/updateShippingPreference.json',//更新物流偏好
                deleteShippingPreference: '/assets/api/deleteShippingPreference.json',//删除物流偏好
                adjustShippingPreferenceOrder: '/assets/api/adjustShippingPreferenceOrder.json',//物流偏好优先级调整
                getProducts: '/assets/api/getProducts.json',//获取物流产品列表
                getProductById: '/assets/api/getProductById.json',//获取物流产品详情
                getDirectionToList: '/assets/api/getDirectionToList.json',//获取路向列表
                getProductsByCondition: '/assets/api/getProductsByCondition.json',
                //dashboard
                getBanners: '/assets/api/getBanners.json',//获取轮播图列表
                getNotices: '/assets/api/getNotices.json',//获取公告列表
                getNoticeDetail: '/assets/api/getNoticeDetail.json',//获取公告详情
                getShipppingDetailsList: '/assets/api/getShipppingDetailsList.json',//获取物流详情列表
                getShipppingDetail: '/assets/api/getShipppingDetail.json',//获取物流详情
                getShipppingPolicies: '/assets/api/getShipppingPolicies.json',//获取物流政策列表
                getShipppingPolicyDetail: '/assets/api/getShipppingPolicyDetail.json',//获取物流政策详情
                hasNewMessage: '/assets/api/hasNewMessage.json',//查询是否有新未读消息
                getAllMessage: '/assets/api/getAllMessage.json',//获取全部消息列表
                getMessageDetil: '/assets/api/getMessageDetil.json',//获取消息详情
                //订单管理
                getPackages: '/assets/api/getPackages.json',//获取包裹列表
                getDeliveryStatistics: '/assets/api/getDeliveryStatistics.json',//获取包裹列表
                getPackageDetail: '/assets/api/getPackageDetail.json',//根据ID查询包裹详细信息
                addSellerRemark: '/assets/api/addSellerRemark.json',//添加卖家备注
                getAvailableProduct: '/assets/api/getAvailableProduct.json',//运行物流规则（查询可用物流产品）
                singlePackageSelectProduct: '/assets/api/singlePackageSelectProduct.json',//单个选择物流产品
                selectProduct: '/assets/api/selectProduct.json',//选择物流产品
                applyTrackingNo: '/assets/api/applyTrackingNo.json',//申请物流单号
                cancelPackage: '/assets/api/cancelPackage.json',//取消包裹
                getHistoryTrackingNo: '/assets/api/getHistoryTrackingNo.json',//查询历史物流单号
                selectDeliveryPreference: '/assets/api/selectDeliveryPreference.json',//选择交运方式
                deliveryPackages: '/assets/api/deliveryPackages.json',//交运
                generateCoverSheet: '/assets/api/generateCoverSheet.json',//打印面单-预览
                printCoverSheet: '/assets/api/printCoverSheet.json',//打印面单-提交
                updateReceiverAddress: '/assets/api/updateReceiverAddress.json',//编辑收货人地址
                updateSendAddress: '/assets/api/updateSendAddress.json',//编辑发货地址
                updateTransaction: '/assets/api/updateTransaction.json',//编辑交易信息
                updatePackage: '/assets/api/updatePackage.json',//编辑包裹信息
                splitPackages: '/assets/api/splitPackages.json',//待处理订单_拆分订单
                getCombinePackages: '/assets/api/getCombinePackages.json',//待处理订单_获取可合单包裹
                combinePackages: '/assets/api/combinePackages.json',//待处理订单_合并包裹
                generateHandoverSheet: '/assets/api/generateHandoverSheet.json',//打印交接单-预览
                printHandoverSheet: '/assets/api/printHandoverSheet.json',//打印交接单-提交
                getPackageTrackingInfo: '/assets/api/getPackageTrackingInfo.json',//运输中订单_获取包裹物流信息
                reship: '/assets/api/reship.json',//运输中订单_重新发货
                deletePackages: '/assets/api/deletePackages.json',//删除包裹
                restorePackages: '/assets/api/restorePackages.json',//已删除订单_恢复
                clearPackages: '/assets/api/clearPackages.json',//已删除订单_清空
                getPackageStatistics: '/assets/api/getPackageStatistics.json',//获取订单状态统计数据
                getAllPackageStatistics: '/assets/api/getAllPackageStatistics.json',//获取订单状态统计数据(查询dashboard及menu上的数据)
                upload: '/assets/api/upload.json',//上传PDF的BASE64代码获取URL
                //地址省市自治区联动接口
                getCountryByZipCode: '/assets/api/getCountryByZipCode.json',//根据邮编查询省市区
                getAllCities: '/assets/api/getAllCities.json',//查询国家的所有城市
                getSubRegionByCode: '/assets/api/getSubRegionByCode.json',//根据编码查询下级行政区域
                getSubRegionByCode1: '/assets/api/getSubRegionByCode.json',//交运偏好专用
                //单点登录跳转
                getSsoUrl: '/assets/api/getSsoUrl.json'
            },
            admin: {
                //登录和管理员账号
                userinfo: '/assets/api/userinfo.json',//获取用户信息
                adminLogin: '/assets/api/admin/adminLogin.json',//管理员登录
                adminConfirmEmail: '/assets/api/admin/adminConfirmEmail.json',//忘记密码-发送邮箱验证
                adminResetPassword: '/assets/api/admin/adminResetPassword.json',//忘记密码-设置新密码
                adminLogout: '/assets/api/admin/adminLogout.json',//管理员登出
                adminAccountSearch: '/assets/api/admin/adminAccountSearch.json',//管理员列表搜索
                adminAccountSave: '/assets/api/admin/adminAccountSave.json',//管理员设置权限&注册接口
                adminAccountDelete: '/assets/api/admin/adminAccountDelete.json',//管理员删除接口
                adminAccountStatusChange: '/assets/api/admin/adminAccountStatusChange.json',//管理员状态修改接口
                adminAllRolesGet: '/assets/api/admin/adminAllRolesGet.json',//获取所有权限列表的接口
                generateVerifyCode: '/assets/api/admin/generateVerifyCode.json',//验证码
                validateEmailCaptcha: '/assets/api/admin/validateEmailCaptcha.json', // 状态页 忘记密码
                //包裹查询
                adminPackgeSearch: '/assets/api/admin/adminPackgeSearch.json',//包裹列表查询
                adminPackageTracking: '/assets/api/admin/adminPackageTracking.json',
                //广告位
                adminBannerGet: '/assets/api/admin/adminBannerGet.json',//获取所有广告位列表
                adminBannerDel: '/assets/api/admin/adminBannerDel.json',//删除广告位
                adminBannerChange: '/assets/api/admin/adminBannerChange.json',//广告位顺序调整
                adminBannerSave: '/assets/api/admin/adminBannerSave.json',//保存广告位
                //站内信
                adminMessageSave: '/assets/api/admin/adminMessageSave.json',//站内信保存或更新接口
                adminMessageGet: '/assets/api/admin/adminMessageGet.json',//站内信列表查询
                adminMessageDel: '/assets/api/admin/adminMessageDel.json',//站内信删除
                adminMessageDetilGet: '/assets/api/admin/adminMessageDetilGet.json',//站内信详情查询
                adminMessageSend: '/assets/api/admin/adminMessageSend.json',//发送站内信
                //物流文章指南
                articleListSearch: '/assets/api/admin/articleListSearch.json',//文章列表查询接口
                articleSave: '/assets/api/admin/articleSave.json',//文章保存接口
                articleDelete: '/assets/api/admin/articleDelete.json',//文章删除接口
                articleToNotice: '/assets/api/admin/articleToNotice.json',//设为/撤销公告接口
                articleDetilGet: '/assets/api/admin/articleDetilGet.json',//文章详情查询接口
                //白名单
                whiteListSearch: '/assets/api/admin/whiteListSearch.json',//白名单列表查询接口
                whiteListAdd: '/assets/api/admin/whiteListAdd.json',//白名单增加接口
                whiteListDelete: '/assets/api/admin/whiteListDelete.json',//白名单删除接口
                //SDK
                sdkSearch: '/assets/api/admin/sdkSearch.json',//sdk列表查询接口
                sdkSave: '/assets/api/admin/sdkSave.json',//sdk提交或者保存
                sdkUpload: '/assets/api/admin/sdkUpload.json',//sdk上传
                sdkDelete: '/assets/api/admin/sdkDelete.json',//sdk删除接口
                //API调用
                apiSearch: '/assets/api/admin/apiSearch.json',//API调用次数查询
                apiExport: '/assets/api/admin/apiExport.json',
                //IS账号管理
                ISAccountSearch: '/assets/api/admin/ISAccountSearch.json',//IS账号列表
                eBayIDListSearch: '/assets/api/admin/eBayIDListSearch.json',//查询绑定eBayId列表接口
                eBayIDCannel: '/assets/api/admin/eBayIDCannel.json',//强制解绑接口
                validateEmail: '/assets/api/admin/validateEmail.json',//新建操作员后，验证邮箱链接
                setPassword: '/assets/api/admin/setPassword.json',//新建操作员后，邮箱验证通过，设置密码
                //数据导出&物流服务
                dataExport: '/assets/api/admin/dataExport.json',//数据导出接口
                transportGet: '/assets/api/admin/transportGet.json',//admin物流产品列表
                transportDetilGet: '/assets/api/admin/transportDetilGet.json'//admin物流产品详情
            },
            development: {
                devNoticeGet: '/assets/api/development/devNoticeGet.json',//获取所有开发者指南的公告
                getDeveloperGuideList: '/assets/api/development/getDeveloperGuideList.json',//获取开发者指南列表
                getDeveloperGuideDetail: '/assets/api/development/getDeveloperGuideDetail.json',//获取开发者指南详情
                apidocs: '/assets/api/api-docs.json', // 获取api文档
                sdkSearch: '/assets/api/development/sdkSearch.json' //获取SDK下载信息
            }
        }
    };
    //正式环境路径及api配置
    Global.dev = {
        code: {
            success: '00',//通过
            tokenExpired: -1,//token失效
            noLogin: -2,//未登录
            adminNoLogin: 11, //admin未登录
            form: -3,//form表单提交报错
            fail: '',//api操作失败
            timeout: '44010010'//超时
        },
        user: {
            batteryState: '000|111|001|010|011|100|101|110',
            userType: 'subuser|parent|admin|4',//账号类型： 子账号||主账号||管理员||开发者
            verifyState: 'HAS_AUTHENTICATED|NO_AUTHENTICATE|PENDING',//认证状态：已认证||未认证||认证中
            verifyType: 'personal|company'//认证类型：个人认证||企业认证
        },
        addressType: {
            send: 'SHIPPING',//发货
            return: 'RETURN',//退货
            pickUp: 'CANVASSION'//揽货
        },
        page: {
            sellers: {
                //第三方平台
                upgradeBusinessUser: 'upgradeBusinessUser',//升级为企业用户
                immediatelyCertification: 'immediatelyCertification',//立即认证
                viewCertificationInfo: 'viewCertificationInfo',//查看认证信息
                improvePersonalInfo: 'improvePersonalInfo',//完善个人信息
                messageCenter: 'messageCenter',//消息中心
                developerPlatform: '/open/home',//开发者平台
                toCharge: 'toCharge', //第三方充值
                //最新公告
                notices: '/seller/notices',//最新公告
                messages: '/seller/messages',//最新公告
                messagesDetail: '/seller/messages-detail',//最新公告详情
                shippingList: '/seller/shipping-list',//物流详情列表
                shippingDetail: '/seller/shipping-detail',//物流详情
                shippingPolicyList: '/seller/shipping-policies-list',//物流政策列表
                shippingPolicyIdDetail: '/seller/shipping-policies-detail',//物流政策详情
                //账户中心
                login: '/seller/login',//账号信息--登录
                register: '/seller/register',//账号信息--注册
                registerSuccess: '/seller/register-success',//账号信息--注册完成
                registerFailed: '/seller/register-failed',//账号信息--注册失败
                registerTimeout: '/seller/register-timeout',//账号信息--验证超时
                forgetPassword: '/seller/forget-password',//账号信息--忘记密码
                resetPassword: '/seller/reset-password',//账号信息--修改密码
                resetPasswordSuccess: '/seller/reset-password-success',//账号信息--修改密码成功
                resetPasswordFailed: '/seller/reset-password-failed',//账号信息--修改密码失败
                resetPasswordTimeout: '/seller/reset-password-timeout',//账号信息--修改密码超时
                //个人中心
                accountInfo: '/seller/personal-accountinfo',//个人中心--账户信息
                eBayIDManage: '/seller/personal-manage-id',//个人中心--eBayID管理
                subManage: '/seller/personal-manage-operator',//个人中心--子账号管理
                financeInfo: '/seller/finance-manage',//个人中心--财务信息
                dataStatistics: '/seller/data-statistics',//个人中心--数据统计
                devManage: '/seller/dev-manage',//个人中心--开发者管理
                subuserSetPassword: '/seller/subuser-set-password',//个人中心--操作员管理--新建操作员后设置密码页面
                //偏好设置
                preferencesOrderSource: '/seller/preferences-order-source',//偏好设置-订单来源
                preferencesSku: '/seller/preferences-sku',//偏好设置-SKU预设
                preferencesAdr: '/seller/preferences-adr',//偏好设置-地址管理
                preferencesDeliver: '/seller/preferences-deliver',//偏好设置-交运偏好
                preferencesLogistics: '/seller/preferences-logistics',//偏好设置-物流偏好
                preferencesPrint: '/seller/preferences-print',//偏好设置-打印偏好
                //dashboard
                dashboard: '/seller/dashboard',//dashboard页面
                //订单管理
                order: '/seller/order',//全部订单
                pendingOrder: '/seller/order-pending',//待处理订单
                packageError: '/seller/order-package-error',//异常包裹
                packageView: '/seller/order-package-view',//查看包裹
                waitingPickedUpOrder: '/seller/order-waiting-picked-up',//待取件订单
                deliveryInquireOrder: '/seller/order-delivery-inquire',//物流查询订单
                deletedOrder: '/seller/order-deleted',//已删除订单
                packageEdit: '/seller/order-package-edit',//包裹编辑
                PackOrderRule: '/seller/order-pack-rule',//订单合并规则
                //物流服务
                logisticsService: '/seller/logistics-service-list'//物流服务一览
            },
            admin: {
                login: '/admin/login',//登录
                forgetPwd: '/admin/admin-forget-password', // 忘记密码
                passwordActivation: '/admin/admin-reset-password-activation', // 激活-重置密码
                resetPasswordSuccess: '/admin/reset-password-success',//账号信息--修改密码成功
                subuserSetpasswordSuccess: '/admin/subuser-setpassword-success',//管理员账号密码设置成功
                adminResetPassword: '/admin/admin-reset-password',//重置密码
                packageInfoQuery: '/admin/package-info-query',//首页-包裹信息查询
                userAccountManagement: '/admin/user-account-management',//用户账号管理
                adSlotManagement: '/admin/ad-slot-management',//广告位管理
                stationLetterManagement: '/admin/station-letter-management',//站内信管理
                stationLetterManagementEdit: '/admin/station-letter-management-edit',//站内信管理编辑
                stationLetterManagementReadonly: '/admin/station-letter-management-readonly',//站内信管理查看
                logisticsArticleManagement: '/admin/logistics-article-management',//物流文章管理
                logisticsArticleManagementEdit: '/admin/logistics-article-management-edit',//物流文章管理编辑
                whiteListManagement: '/admin/white-list-management',//白名单管理
                developmentGuide: '/admin/development-guide',//开发指南
                developmentGuideEdit: '/admin/development-guide-edit',//开发指南编辑
                SDKManagement: '/admin/sdk-management',//SDK管理
                APIDocumentManagement: '/admin/api-document-management',//API文档管理
                APIDataReport: '/admin/api-data-report',//API调用数据报告
                backstageUserManagement: '/admin/backstage-user-management',//后台用户管理
                dataOutput: '/admin/data-output',//数据导出
                logisticsServiceInfo: '/admin/logistics-service-info',//物流服务信息列表
                logisticsServiceInfoDetail: '/admin/logistics-service-info-detail',//物流服务信息详情
                subuserSetPassword: '/admin/subuser-set-password',//子账号设置密码
                addoperatorActivation: '/admin/addoperator-activation'//子账号激活成功
            },
            development: {
                sandbox: 'http://9660a58d-6572-440f-9da7-452342697c09.cloudapp.net/', // 沙箱地址
                home: '/open/home',//首页
                apiDocumentList: '/open/api-document-list',//api文档列表
                apiDocumentDetail: '/open/api-document-detail',//api文档详情
                SDKDownload: '/open/sdk-download',//SDK下载
                onlineTest: '/open/online-test',//在线测试
                developmentGuideList: '/open/development-guide-list',//开发指南列表
                developmentGuideDetail: '/open/development-guide-detail',//开发指南详情
                latestAnnouncement: '/open/latest-announcement',//最新公告
            }
        },
        api: {
            sellers: {
                //账户信息
                userinfo: '/v1/frontend/userinfo',//获取用户信息
                login: '/v1/frontend/login',//登录
                verifyCode: '/v1/frontend/generateVerifyCode',//获取验证码
                logout: '/v1/frontend/logout',//登出
                register: '/v1/frontend/register',//注册
                validateEmailCaptcha: '/v1/frontend/validateEmailCaptcha', // 状态页 忘记密码
                forgetPassword: '/v1/frontend/validateEmail',//忘记密码
                modifyPassword: '/v1/frontend/resetPassword',//设置新密码
                activate: '/v1/frontend/activate',//激活账号
                //个人中心-eBayID管理
                getEbayIds: '/v1/frontend/ebayids',//获取ebayID列表
                getAuthorizationUrl: '/v1/frontend/ebayids/authurl',//获取绑定ebayID地址
                saveAuthorizationResult: '/v1/frontend/ebayids',//授权结果保存
                revokeAuthorization: '/v1/frontend/ebayids/revoke',//取消授权
                assignSubuser: '/v1/frontend/ebayids',//指定操作员
                //个人中心-操作员管理
                getUsers: '/v1/frontend/user/statistics/getUsers',//获取操作员列表
                getSubusers: '/v1/frontend/user/subusers/getSubusers',//获取操作员列表
                saveSubuser: '/v1/frontend/user/subusers/addSubuser',//添加操作员
                updateSubuser: '/v1/frontend/user/subusers/updateSubuser',//更新操作员
                setSubuserState: '/v1/frontend/user/subusers/setSubuserState',//停用/启用操作员
                deleteSubuser: '/v1/frontend/user/subusers/deleteSubuser',//删除操作员
                validateEmail: '/v1/frontend/user/subusers/validateEmail',//新建操作员后，验证邮箱链接
                setPassword: '/v1/frontend/user/subusers/setPassword',//新建操作员后，邮箱验证通过，设置密码
                //个人中心-财务信息
                getAccounts: '/v1/frontend/pim/user/accounts',//获取所有币种账户信息
                getAccountsSummary: '/v1/frontend/pim/user/accounts/summary',//获取费用汇总
                getAccountBills: '/v1/frontend/pim/user/account/bills',//获取流水信息
                exportAccountBills: '/v1/frontend/pim/user/accounts/bills/export',//导出流水信息
                //个人中心-数据统计
                getStatistics: '/v1/frontend/user/statistics',//获取数据统计
                exportStatistics: '/v1/frontend/user/statistics/export',//数据统计导出
                //个人中心-开发者管理
                applyDeveloperID: '/v1/frontend/developer/apply',//申请开发者ID
                getDeveloperInfo: '/v1/frontend/developer/',//查询开发者信息
                resetSecret: '/v1/frontend/developer/resetsecret',//重置秘钥
                applyThirdPartyDeveloper: '/v1/frontend/developer/thirdparty/apply',//申请成为第三方开发者
                getAuthThirdPartyDevelopers: '/v1/frontend/developer/thirdparty/authorized',//查询已授权的第三方开发者
                getThirdPartyDeveloperByDeveloperId: '/v1/frontend/developer/thirdparty',//根据第三方开发者id查询开发者信息
                authorizeThirdPartyDeveloper: '/v1/frontend/developer/thirdparty/authorize',//授权
                developerRevokeAuthorization: '/v1/frontend/developer/thirdparty/revoke',//取消授权
                //偏好设置-订单来源
                setOrderSource: '/v1/frontend/preference/orderSource/setOrderSource',//设置订单来源
                //偏好设置-SKU预设
                getSKUs: '/v1/frontend/preference/skus',//获取SKU列表
                createSKU: '/v1/frontend/preference/skus',//新增SKU
                updateSKU: '/v1/frontend/preference/skus',//更新SKU
                deleteSKU: '/v1/frontend/preference/skus/delete',//删除SKU
                repeatSKU: '/v1/frontend/preference/skus/repeatdata',//SKU上传重复数据处理
                importSKU: '/v1/frontend/preference/skus/import',//SKU上传
                exportSKU: '/v1/frontend/preference/skus/export',//SKU导出
                getSKUTemplate: '/v1/frontend/preference/skus/template',//下载SKU模板
                //偏好设置-地址管理
                getAddresses: '/v1/frontend/preference/address/addresses',//获取地址列表
                getAddress: '/v1/frontend/preference/address/getAddressById',//获取地址信息
                createAddress: '/v1/frontend/preference/address/createAddress',//添加地址
                updateAddress: '/v1/frontend/preference/address/updateAddress',//更新地址
                deleteAddress: '/v1/frontend/preference/address/deleteAddress',//删除地址
                setDefaultAddress: '/v1/frontend/preference/address/setDefaultAddress',//设为默认地址
                getOrigin: '/v1/frontend/preference/skus/getorigin',//获取原产地
                //偏好设置-打印偏好
                getPrintPreference: '/v1/frontend/account/printpref',//获取已设置的打印偏好
                updatetPrintPreference: '/v1/frontend/account/printpref',//更新打印偏好
                //偏好设置-交运偏好
                getDeliveryPreferences: '/v1/frontend/preference/delivery',//获取交运偏好列表
                createDeliveryPreference: '/v1/frontend/preference/delivery',//新增交运偏好
                updateDeliveryPreference: '/v1/frontend/preference/delivery',//更新交运偏好
                deleteDeliveryPreference: '/v1/frontend/preference/delivery/delete',//删除交运偏好
                getSites: '/v1/frontend/sites',//获取卖家自送站点
                updateDefault: '/v1/frontend/preference/delivery/default',//设置交运偏好的默认揽货地址
                //偏好设置-物流偏好
                getDirectionToList: '/v1/frontend/directionsTos',//获取路向列表
                firstLogin: '/v1/frontend/firstLogin',
                getShippingPreferences: '/v1/frontend/preference/shipping',//获取物流偏好列表
                createShippingPreference: '/v1/frontend/preference/shipping',//新增物流偏好
                updateShippingPreference: '/v1/frontend/preference/shipping',//更新物流偏好
                deleteShippingPreference: '/v1/frontend/preference/shipping/delete',//删除物流偏好
                adjustShippingPreferenceOrder: '/v1/frontend/preference/shipping/order',//物流偏好优先级调整
                getProducts: '/v1/frontend/products',//获取物流产品列表
                getProductById: '/v1/frontend/product',//获取物流产品详情
                getProductsByCondition: '/v1/frontend/products/getProductsByCondition',
                //dashboard
                getBanners: '/v1/frontend/pim/dashboard/banners',//获取轮播图列表
                getNotices: '/v1/frontend/pim/dashboard/notices',//获取公告列表
                getNoticeDetail: '/v1/frontend/pim/dashboard/noticeDetail',//获取公告详情
                getShipppingDetailsList: '/v1/frontend/pim/dashboard/shippingDetailsList',//获取物流详情列表
                getShipppingDetail: '/v1/frontend/pim/dashboard/shippingDetail',//获取物流详情
                getShipppingPolicies: '/v1/frontend/pim/dashboard/shippingPoliciesList',//获取物流政策列表
                getShipppingPolicyDetail: '/v1/frontend/pim/dashboard/shippingPolicyDetail',//获取物流政策详情
                hasNewMessage: '/v1/frontend/message/hasNewMessage',//查询是否有新未读消息
                getAllMessage: '/v1/frontend/message/getAllMessage',//获取全部消息列表
                getMessageDetil: '/v1/frontend/message/getMessageDetil',//获取消息详情
                //接口未完成先用假数据
                //hasNewMessage: '/v1/frontend/message/hasNewMessage',//查询是否有新未读消息
                //getAllMessage: '/v1/frontend/message/getMessageDetil',//获取全部消息列表
                //getMessageDetil: '/assets/api/getMessageDetil.json',//获取消息详情
                //订单管理
                getPackages: '/v1/frontend/packages',//获取包裹列表
                getDeliveryStatistics: '/v1/frontend/packages/deliveryStatistics',//获取包裹列表
                getPackageDetail: '/v1/frontend/package/detail',//根据ID查询包裹详细信息
                addSellerRemark: '/v1/frontend/packages/remark',//添加卖家备注
                getAvailableProduct: '/v1/frontend/packages/product/available',//运行物流规则（查询可用物流产品）
                singlePackageSelectProduct: '/v1/frontend/packages/product/singlePackageSelectProduct',//单个选择物流产品
                selectProduct: '/v1/frontend/packages/product/select',//选择物流产品
                applyTrackingNo: '/v1/frontend/package/applytrackingno',//申请物流单号
                cancelPackage: '/v1/frontend/package/cancel',//取消包裹
                getHistoryTrackingNo: '/assets/api/getHistoryTrackingNo.json',//查询历史物流单号
                selectDeliveryPreference: '/v1/frontend/package/delivery/preference',//选择交运方式
                deliveryPackages: '/v1/frontend/packages/delivery',//交运
                generateCoverSheet: '/v1/frontend/packages/coversheet/generate',//打印面单-预览
                printCoverSheet: '/v1/frontend/packages/coversheet/print',//打印面单-提交
                updateReceiverAddress: '/v1/frontend/package/receiveraddress',//编辑收货人地址
                updateSendAddress: '/v1/frontend/package/sendaddress',//编辑发货地址
                updateTransaction: '/v1/frontend/package/updatetransaction',//编辑交易信息
                updatePackage: '/v1/frontend/package/updatepackage',//编辑包裹信息
                splitPackages: '/v1/frontend/packages/split',//待处理订单_拆分订单
                getCombinePackages: '/v1/frontend/packages/combine/available',//待处理订单_获取可合单包裹
                combinePackages: '/v1/frontend/packages/combine',//待处理订单_合并包裹
                generateHandoverSheet: '/v1/frontend/packages/handoversheet/generate',//打印交接单-预览
                printHandoverSheet: '/v1/frontend/packages/handoversheet/print',//打印交接单-提交
                getPackageTrackingInfo: '/v1/frontend/tracking',//运输中订单_获取包裹物流信息
                reship: '/v1/frontend/package/reship/',//运输中订单_重新发货
                deletePackages: '/v1/frontend/package/delete',//删除包裹
                restorePackages: '/v1/frontend/package/restore',//已删除订单_恢复
                clearPackages: '/v1/frontend/package/clear',//已删除订单_清空
                getPackageStatistics: '/v1/frontend/packages/statistics',//获取订单状态统计数据
                getAllPackageStatistics: '/v1/frontend/packages/AllStatistics',//获取订单状态统计数据(查询dashboard及menu上的数据)
                upload: '/v1/frontend/packages/cover/upload',//上传PDF的BASE64代码获取URL
                //地址省市自治区联动接口
                getCountryByZipCode: '/v1/frontend/addressCascade/zipCodeAddress',//根据邮编查询省市区
                getAllCities: '/v1/frontend/sites',//查询国家的所有城市
                getSubRegionByCode: '/v1/frontend/addressCascade/subAddresses',//根据编码查询下级行政区域
                getSubRegionByCode1: '/v1/frontend/canvassion',//交运偏好专用
                //单点登录跳转
                getSsoUrl: '/v1/frontend/ssourl'
            },
            admin: {
                //登录和管理员账号
                userinfo: '/assets/api/userinfo.json',//获取用户信息
                adminLogin: '/v1/admin/user/loginPage/login',//管理员登录
                adminConfirmEmail: '/v1/admin/user/loginPage/adminConfirmEmail',//忘记密码-发送邮箱验证
                adminResetPassword: '/v1/admin/user/loginPage/adminResetPassword',//忘记密码-设置新密码
                adminLogout: '/v1/admin/user/loginPage/adminLogout',//管理员登出
                adminAccountSearch: '/v1/admin/user/accountPage/adminAccountSearch',//管理员列表搜索
                adminAccountSave: '/v1/admin/user/accountPage/adminAccountSave',//管理员设置权限&注册接口
                adminAccountDelete: '/v1/admin/user/accountPage/adminAccountDelete',//管理员删除接口
                adminAccountStatusChange: '/v1/admin/user/accountPage/adminAccountStatusChange',//管理员状态修改接口
                adminAllRolesGet: '/v1/admin/user/accountPage/adminAllRolesGet',//获取所有权限列表的接口
                generateVerifyCode: '/v1/admin/generateVerifyCode',//验证码
                validateEmailCaptcha: '/v1/admin/validateEmailCaptcha', // 状态页 忘记密码

                //包裹查询
                adminPackgeSearch: '/v1/admin/packagePage/adminPackageSearch',//包裹列表查询
                adminPackageTracking: '/v1/admin/packagePage/adminPackageTracking',
                //广告位
                adminBannerGet: '/v1/admin/bannerPage/adminBannerGet',//获取所有广告位列表
                adminBannerDel: '/v1/admin/bannerPage/adminBannerDel',//删除广告位
                adminBannerChange: '/v1/admin/bannerPage/adminBannerChange',//广告位顺序调整
                adminBannerSave: '/v1/admin/bannerPage/adminBannerSave',//保存广告位
                //站内信
                adminMessageSave: '/v1/admin/messagePage/adminMessageSave',//站内信保存或更新接口
                adminMessageGet: '/v1/admin/messagePage/adminMessageGet',//站内信列表查询
                adminMessageDel: '/v1/admin/messagePage/adminMessageDel',//站内信删除
                adminMessageDetilGet: '/v1/admin/messagePage/adminMessageDetailGet',//站内信详情查询
                adminMessageSend: '/assets/api/admin/adminMessageSend.json',//发送站内信
                //物流文章指南
                articleListSearch: '/v1/admin/textPage/articleListSearch',//文章列表查询接口
                articleSave: '/v1/admin/textPage/articleSave',//文章保存接口
                articleDelete: '/v1/admin/textPage/articleDelete',//文章删除接口
                articleToNotice: '/v1/admin/textPage/articleToNotice',//设为/撤销公告接口
                articleDetilGet: '/v1/admin/textPage/articleDetilGet',//文章详情查询接口
                //白名单
                whiteListSearch: '/v1/admin/whiteListPage/whiteListSearch',//白名单列表查询接口
                whiteListAdd: '/v1/admin/whiteListPage/whiteListAdd',//白名单增加接口
                whiteListDelete: '/v1/admin/whiteListPage/whiteListDelete',//白名单删除接口
                //SDK
                sdkSearch: '/v1/admin/sdk/search',//sdk列表查询接口
                sdkSave: '/v1/admin/sdk/save',//sdk提交或者保存
                sdkUpload: '/v1/admin/sdk/upload',//sdk上传
                sdkDelete: '/v1/admin/sdk/delete',//sdk删除接口
                //API调用
                apiSearch: '/v1/admin/apiPage/apiSearch',//API调用次数查询
                apiExport: '/v1/admin/apiPage/apiExport',
                //IS账号管理
                ISAccountSearch: '/v1/admin/ISAccountPage/ISAccountSearch',//IS账号列表
                eBayIDListSearch: '/v1/admin/ISAccountPage/eBayIDListSearch',//查询绑定eBayId列表接口
                eBayIDCannel: '/v1/admin/ISAccountPage/eBayIDCannel',//强制解绑接口
                validateEmail: '/v1/admin/validateEmailCaptcha',//新建操作员后，验证邮箱链接
                setPassword: '/v1/admin/user/loginPage/adminActivePassword',//新建操作员后，邮箱验证通过，设置密码
                //数据导出&物流服务
                dataExport: '/v1/admin/dataExportPage/dataExport',//数据导出接口
                transportGet: '/v1/admin/transportPage/transportGet', //admin物流产品列表
                transportDetilGet: '/v1/admin/transportPage/transportDetilGet' //admin物流产品详情
            },
            development: {
                devNoticeGet: '/v1/developer/devDashboard/devNoticeGet',//获取所有开发者指南的公告
                getDeveloperGuideList: '/v1/developer/devDashboard/developerGuideList',//获取开发者指南列表
                getDeveloperGuideDetail: '/v1/developer/devDashboard/developerGuideDetail',//获取开发者指南详情
                apidocs: '/v1/developer/swagger.json?group=openapi', // 获取api文档
                sdkSearch: '/v1/developer/sdk/search' //获取SDK下载信息
            }
        }
    };
    return Global;
});