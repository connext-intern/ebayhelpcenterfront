/**
 *louis/20170816, ui数据，
 *
 */
define('data', [], function () {
    var Data = {};
    //select配置
    Data.select = {
        language: [{
            id: 'zh-cn',
            text: '简体中文',
            lg: ''
        }, {
            id: 'zh-hk',
            text: '繁体中文',
            lg: ''
        }, {
            id: 'en-us',
            text: 'English',
            lg: ''
        }],
        searhList: [{
                id: 'superTrackingCode',
                lg: 'shippingNumber',
                text: '物流编号'
            },
            {
                id: 'buyerEbayId',
                lg: 'buyerID',
                text: '买家ID'
            },
            {
                id: 'itemId',
                lg: 'itemId',
                text: 'Item ID'
            }
        ],
        helpList: [{
                lg: 'instructions',
                text: '使用说明',
                link: ''
            },
            {
                lg: 'logisticsServiceList',
                text: '物流服务一览',
                link: 'logisticsService'
            }
        ]
    };
    Data.emailHash = {
        'qq.com': 'http://mail.qq.com',
        'gmail.com': 'http://mail.google.com',
        'sina.com': 'http://mail.sina.com.cn',
        '163.com': 'http://mail.163.com',
        '126.com': 'http://mail.126.com',
        'yeah.net': 'http://www.yeah.net/',
        'sohu.com': 'http://mail.sohu.com/',
        'tom.com': 'http://mail.tom.com/',
        'sogou.com': 'http://mail.sogou.com/',
        '139.com': 'http://mail.10086.cn/',
        'hotmail.com': 'http://www.hotmail.com',
        'live.com': 'http://login.live.com/',
        'live.cn': 'http://login.live.cn/',
        'live.com.cn': 'http://login.live.com.cn',
        '189.com': 'http://webmail16.189.cn/webmail/',
        'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
        'yahoo.cn': 'http://mail.cn.yahoo.com/',
        'eyou.com': 'http://www.eyou.com/',
        '21cn.com': 'http://mail.21cn.com/',
        '188.com': 'http://www.188.com/',
        'foxmail.com': 'http://www.foxmail.com'
    };
    //个人中心ui配置
    Data.personal = {
        //主账号菜单
        menu: [{
                lg: 'personalCenter',
                text: '个人中心',
                link: '',
                item: [{
                        lg: 'accountInfo',
                        text: '账户信息',
                        link: 'accountInfo'
                    },
                    {
                        lg: 'ebayid-manage',
                        text: 'eBayID管理',
                        link: 'eBayIDManage'
                    },
                    {
                        lg: 'subuser-manage',
                        text: '子账号管理',
                        link: 'subManage'
                    },
                ]
            },
            {
                lg: 'finInfo',
                text: '财务信息',
                link: 'financeInfo'
            },
            {
                lg: 'dataSta',
                text: '数据统计',
                link: 'dataStatistics'
            },
            {
                lg: 'dev,management',
                text: '开发者管理',
                link: 'devManage'
            }
        ],
        //子账号菜单
        menuSub: [{
                lg: 'personalCenter',
                text: '个人中心',
                link: '',
                item: [{
                    lg: 'accountInfo',
                    text: '账户信息',
                    link: 'accountInfo'
                }, ]
            },
            {
                lg: 'dataSta',
                text: '数据统计',
                link: 'dataStatistics'
            }
        ],
        batteryState: {
            "000": "battery-000", // 未认证
            "111": "battery-111", // 已认证
            "001": "battery-001", // 纯电池已认证，内置电池和配套电池未认证
            "010": "battery-010", // 配套电池已认证，内置电池和纯电池未认证
            "011": "battery-011", // 配套电池和纯电池已认证，内置电池未认证
            "100": "battery-100", // 内置电池已认证，配套电池和纯电池未认证
            "101": "battery-101", // 内置电池和纯电池已认证，配套电池未认证
            "110": "battery-110" // 内置电池和配套电池已认证，纯电池未认证
        },
        //筛选流水
        billType: [{
                id: 'ALL',
                lg: 'all-record',
                text: '全部流水'
            },
            {
                id: 'CHARGE',
                lg: 'charge-record',
                text: '充值流水'
            },
            {
                id: 'COST',
                lg: 'cost-record',
                text: '消费流水'
            }
        ],
        //筛选币种
        currency: [{
                id: 'ALL',
                lg: 'all-currency',
                text: '全部币种'
            },
            {
                id: 'CNY',
                lg: 'CNY',
                text: '人民币'
            },
            {
                id: 'TWD',
                lg: 'TWD',
                text: '新台币'
            },
            {
                id: 'HKD',
                lg: 'HKD',
                text: '港币'
            }
        ],
        //筛选时间
        offset: [{
                id: '0',
                lg: 'cur-month',
                text: '当月'
            },
            {
                id: '1',
                lg: 'recent-onemonth',
                text: '最近一个月'
            },
            {
                id: '2',
                lg: 'recent-twomonths',
                text: '最近二个月'
            },
            {
                id: '3',
                lg: 'recent-threemonths',
                text: '最近三个月'
            }
        ],
        //授权状态
        authorizeStatus: [{
                id: 'ALL',
                lg: 'all',
                text: '全部'
            },
            {
                id: 'VALID',
                lg: 'effective',
                text: '有效'
            },
            {
                id: 'EXPIRED',
                lg: 'beOverdue',
                text: '过期'
            }
        ],
        //数据统计导出
        export: [{
                id: null,
                lg: 'dataOutput',
                text: '- 数据导出 -'
            },
            {
                id: true,
                lg: 'exportExcel',
                text: '导出excel'
            },
            {
                id: false,
                lg: 'exportCSV',
                text: '导出csv'
            }
        ]
    };
    //偏好设置ui配置
    Data.preferences = {
        menu: [{
            lg: 'preferences',
            text: '习惯偏好',
            link: '',
            item: [{
                    lg: 'orderSource',
                    text: '订单来源',
                    link: 'preferencesOrderSource'
                },
                {
                    lg: 'addressManagement',
                    text: '地址管理',
                    link: 'preferencesAdr'
                },
                {
                    lg: 'SKUDefault',
                    text: 'SKU预设',
                    link: 'preferencesSku'
                },
                {
                    lg: 'printPreferences',
                    text: '打印偏好',
                    link: 'preferencesPrint'
                },
                {
                    lg: 'shippingPreferences',
                    text: '交运偏好设置',
                    link: 'preferencesDeliver'
                },
                {
                    lg: 'logisticsPreferences',
                    text: '物流偏好设置',
                    link: 'preferencesLogistics'
                }
            ]
        }],
        menuSub: [{
            lg: 'preferences',
            text: '习惯偏好',
            link: '',
            item: [{
                    lg: 'SKUDefault',
                    text: 'SKU预设',
                    link: 'preferencesSku'
                },
                {
                    lg: 'addressManagement',
                    text: '地址管理',
                    link: 'preferencesAdr'
                },
                {
                    lg: 'printPreferences',
                    text: '打印偏好',
                    link: 'preferencesPrint'
                },
                {
                    lg: 'shippingPreferences',
                    text: '交运偏好设置',
                    link: 'preferencesDeliver'
                },
                {
                    lg: 'logisticsPreferences',
                    text: '物流偏好设置',
                    link: 'preferencesLogistics'
                }
            ]
        }],
        select: {
            whiteType: [
                { key: '', text: '全部' },
                { key: 'devId', text: '开发者ID' },
                { key: 'email', text: 'IS账号' }
            ],
            logisticsItem: [{
                    id: "0",
                    lg: 'settingLogisticsCondition',
                    text: '- 请选择设置条件 -',
                    zid: [0]
                },
                {
                    id: "TOTAL_WEIGHT",
                    lg: 'packageWeight',
                    text: '包裹总重量',
                    zid: [0, 1, 2]
                },
                {
                    id: "TOTAL_AMOUNT",
                    lg: 'packagePrice',
                    text: '包裹总交易金额',
                    zid: [0, 1, 2]
                },
                {
                    id: "COUNTRY",
                    lg: 'buyerCountry',
                    text: '买家所在国家(路向)',
                    zid: [0, 3, 4]
                },
                {
                    id: "FREIGHT",
                    lg: 'buyerFreight',
                    text: '买家所付运费',
                    zid: [0, 1, 2]
                },
                {
                    id: "SHIPPING_WAY",
                    lg: 'wayDelivery',
                    text: '交运方式',
                    zid: [0, 5, 6]
                }
            ],
            symbol: [{
                    id: "0",
                    lg: 'settingSymbol',
                    text: '- 请选择符号 -',
                    zid: 0,
                    symbol: ''
                },
                {
                    id: "GT_EQ",
                    lg: 'moreEqual',
                    text: '大于等于',
                    zid: 1,
                    symbol: '≥'
                },
                {
                    id: "LT",
                    lg: 'lessThan',
                    text: '小于',
                    zid: 2,
                    symbol: '<'
                },
                {
                    id: "INCLUDE",
                    lg: 'included',
                    text: '包含',
                    zid: 3,
                    symbol: '包含'
                },
                {
                    id: "EXCLUDE",
                    lg: 'notIncluded',
                    text: '不包含',
                    zid: 4,
                    symbol: '不包含'
                },
                {
                    id: "EQS",
                    lg: 'true',
                    text: '是',
                    zid: 5,
                    symbol: '是'
                },
                {
                    id: "UN_EQS",
                    lg: 'false',
                    text: '否',
                    zid: 6,
                    symbol: '否'
                }
            ],
            country: [{
                    code: 'CN',
                    lg: 'chinaMain'
                },
                {
                    code: 'HK',
                    lg: 'chinaHk'
                },
                {
                    code: 'TW',
                    lg: 'chinaTaiwan'
                },
                {
                    code: 'US',
                    lg: 'america'
                },
                {
                    code: 'DE',
                    lg: 'germany'
                },
                {
                    code: 'UK',
                    lg: 'unitedKingdom'
                }
            ],
            trueFalse: [{
                    code: "true",
                    lg: 'true'
                }, //是
                {
                    code: 'false',
                    lg: 'false'
                } //否
            ],
            origin: [{
                    code: "001",
                    name: 'HK'
                }, //是
                {
                    code: '002',
                    name: 'MK'
                }, //否
                {
                    code: '003',
                    name: 'SK'
                }, //否
                {
                    code: '004',
                    name: 'ASD'
                } //否
            ],
            pickupTime: [{
                    code: 0,
                    name: '14:00-16:00'
                },
                {
                    code: 1,
                    name: '16:00-18:00'
                }

                // { code: 0, name: '10:00-13:00' },
                // { code: 1, name: '13:00-16:00' },
                // { code: 2, name: '16:00-19:00' },
                // { code: 3, name: '19:00-20:00' }
            ],
            deliverType: [{
                    id: "0",
                    lg: 'deliveryMethod',
                    text: '- 请选择交运方式 -'
                },
                {
                    id: "CANVASSION",
                    lg: 'pickUp',
                    text: '上门揽收'
                },
                {
                    id: "SELLER_SENDING",
                    lg: 'sellers',
                    text: '卖家自送'
                }
            ]
        }
    };
    //最新公告
    Data.notices = {
        menu: [{
            lg: 'newNotices',
            text: '最新公告',
            link: ''
        }]
    };
    //站内信
    Data.messages = {
        menu: [{
            lg: 'message',
            text: '站内信',
            link: ''
        }]
    };
    //物流详情
    Data.shipping = {
        menu: [{
            lg: 'delivey-detail',
            text: '物流详情',
            link: ''
        }]
    };
    //物流政策
    Data.shippingPolicies = {
        menu: [{
            lg: 'delivey-policy',
            text: '物流政策',
            link: ''
        }]
    }
    //订单管理UI
    Data.order = {
        menu: [{
            lg: 'orderManagement',
            text: '订单管理',
            link: '',
            item: [{
                    lg: 'pending',
                    text: '待处理',
                    link: 'pendingOrder',
                    isNum: true,
                    num: 0
                },
                {
                    lg: 'waitingPickedUp',
                    text: '待取件',
                    link: 'waitingPickedUpOrder',
                    isNum: true,
                    num: 0
                },
                {
                    lg: 'deliveryInquire',
                    text: '物流查询',
                    link: 'deliveryInquireOrder',
                    isNum: true,
                    num: 0
                },
                {
                    line: 1
                },
                {
                    lg: 'errorPackage',
                    text: '异常包裹',
                    link: 'packageError',
                    isNum: true,
                    num: 0
                },
                {
                    lg: 'deleted',
                    text: '已删除',
                    isNum: true,
                    link: 'deletedOrder',
                    num: 0
                }
            ]
        }],
        select: {
            isAlone: [{
                    id: "ALL",
                    lg: 'all',
                    text: 'ALL'
                },
                {
                    id: "TRUE",
                    lg: 'comSheet',
                    text: '已合单'
                },
                {
                    id: "FALSE",
                    lg: 'incomSheet',
                    text: '未合单'
                }
            ],
            isLanguage: [{
                    code: "USD",
                    lg: 'currency1',
                    text: '美元'
                },
                {
                    code: "GBP",
                    lg: 'currency2',
                    text: '英镑'
                },
                {
                    code: "CAD",
                    lg: 'currency3',
                    text: '加币'
                },
                {
                    code: "AUD",
                    lg: 'currency4',
                    text: '澳币'
                },
                {
                    code: "EUR",
                    lg: 'currency5',
                    text: '欧元'
                }
            ],
            isLiBatteryOld: [{
                    id: "ALL",
                    lg: 'all',
                    text: 'ALL'
                },
                {
                    id: "TRUE",
                    lg: 'liBattery',
                    text: '含锂电池'
                },
                {
                    id: "FALSE",
                    lg: 'noLiBattery',
                    text: '不含锂电池'
                }
            ],
            isLiBattery: [{
                    id: "0",
                    code: "0",
                    lg: 'battery-state1',
                    text: '无锂电池'
                },
                {
                    id: "1",
                    code: "1",
                    lg: 'battery-state2',
                    text: '内置电池'
                },
                {
                    id: "2",
                    code: "2",
                    lg: 'battery-state3',
                    text: '配套电池'
                },
                {
                    id: "3",
                    code: "3",
                    lg: 'battery-state4',
                    text: '纯电池'
                }
                // { id: "ALL", lg: 'all', text: 'ALL' },
                // { id: "TRUE", lg: 'liBattery', text: '含锂电池' },
                // { id: "FALSE", lg: 'noLiBattery', text: '不含锂电池' }
            ],
            printStatus: [{
                    id: "ALL",
                    lg: 'all',
                    text: 'ALL'
                },
                {
                    id: "TRUE",
                    lg: 'printd',
                    text: '已打印'
                },
                {
                    id: "FALSE",
                    lg: 'noPrint',
                    text: '未打印'
                }
            ],
            transactionStatus: [{
                    id: "ALL",
                    lg: 'all',
                    text: 'ALL'
                },
                {
                    id: "TRUE",
                    lg: 'shipped',
                    text: '已发货'
                },
                {
                    id: "FALSE",
                    lg: 'noShipped',
                    text: '未发货'
                }
            ],
            declareStatus: [{
                    id: "ALL",
                    lg: 'all',
                    text: 'ALL'
                },
                {
                    id: "PENDING",
                    lg: 'declareing',
                    text: '申报中'
                },
                {
                    id: "SUCCESS",
                    lg: 'declared',
                    text: '申报通过'
                }
            ],
            peintSheet: [
                //{ id: "", lg: 'peintSheet', text: '打印面单' },
                {
                    id: "0",
                    lg: 'A4',
                    text: 'A4纸'
                },
                {
                    id: "1",
                    lg: 'thermalPaper',
                    text: '热敏纸'
                }
            ],
            deliveryTime: [ // 揽件时间
                {
                    id: '',
                    text: 'ALL'
                },
                {
                    id: '14:00-16:00',
                    text: '14:00-16:00'
                },
                {
                    id: '16:00-18:00',
                    text: '16:00-18:00'
                }

                // { id: '10:00-13:00', text: '10:00-13:00' },
                // { id: '13:00-16:00', text: '13:00-16:00' },
                // { id: '16:00-19:00', text: '16:00-19:00' },
                // { id: '19:00-20:00', text: '19:00-20:00' }
            ]
        },
        status: {
            package: {
                shippingException: 'SHIPPED_ERROR', // 物流查询异常
                all: "ALL", //全部
                pending: "PENDING", //待处理----待处理,
                declaredFailed: 'DECLARED_FAILED', //预申报未通过----预申报未通过
                packageInfoLack: 'PACKAGE_INFO_LACK', //待处理----包裹信息不完整
                noUsefulShipping: 'NO_USEFUL_SHIPPING', //待处理----无可用物流方案
                selectedShipping: 'SELECTED_SHIPPING', //待处理----待选择物流方案
                appliedTrackingCode: 'APPLIED_TRACKING_CODE', //待处理----待申请运单号
                toBeShipped: 'TO_BE_SHIPPED', //待处理----待交运
                toBeReceived: 'TO_BE_RECEIVED', //待取件----待取件
                ReceiveConfirmation: 'RECEIVE_CONFIRMATION', ////待收货----总类
                onShipping: 'ON_SHIPPING', //待收货----运输中
                delivered: 'DELIVERED', //待收货----已妥投
                deleted: 'DELETED' //待收货----已删除
                // pending: "Pending",//待处理----待处理,
                // declaredFailed: 'Declared_Failed',//预申报未通过----预申报未通过
                // packageInfoLack: 'Package_Info_Lack',//待处理----包裹信息不完整
                // noUsefulShipping: 'No_Useful_Shipping',//待处理----无可用物流方案
                // selectedShipping: 'Selected_Shipping',//待处理----待选择物流方案
                // appliedTrackingCode: 'Applied_Tracking_Code',//待处理----待申请运单号
                // toBeShipped: 'To_Be_Shipped',//待处理----待交运
                // toBeReceived: 'To_Be_Received',//待取件----待取件
                // ReceiveConfirmation: 'Receive_Confirmation',////待收货----总类
                // onShipping: 'On_Shipping',//待收货----运输中
                // delivered: 'Delivered',//待收货----已妥投
                // deleted: 'Deleted'//待收货----已删除
            },
            pay: {
                complete: 'COMPLETE', //已支付
                incomplete: 'INCOMPLETE' //退货
            },
            ship: {
                shipped: 'SHIPPED', //已发货
                beShipped: 'BE_SHIPPED' //未发货
            },
            declare: {
                declaring: 'DECLARING', //预申报中
                declaredSuccessed: 'DECLARED_SUCCESSED', //预申报通过
                declaredFailed: 'DECLARED_FAILED' //预申报失败
            }
        }
    };
    //管理员页面
    Data.admin = {
        menu: [{
                lg: 'infoInquiryAndManagement',
                text: '信息查询及管理',
                link: '',
                code: '',
                show: true,
                item: [{
                        lg: 'packageInfoQuery',
                        text: '包裹信息查询',
                        link: 'packageInfoQuery',
                        show: true,
                        code: 'packageInfo'
                    },
                    {
                        lg: 'ISAccountManagement',
                        text: '用户账号管理',
                        link: 'backstageUserManagement',
                        show: true,
                        code: 'isAccount'
                    }
                ]
            },
            {
                lg: 'frontContentManagement',
                text: '前台内容管理',
                link: '',
                code: '',
                item: [{
                        lg: 'adSlotManagement',
                        text: '广告位管理',
                        link: 'adSlotManagement',
                        code: 'banner'
                    },
                    {
                        lg: 'stationLetterManagement',
                        text: '站内信管理',
                        link: 'stationLetterManagement',
                        code: 'message'
                    },
                    {
                        lg: 'logisticsArticleManagement',
                        text: '物流文章管理',
                        link: 'logisticsArticleManagement',
                        code: 'text'
                    }
                ]
            },
            {
                lg: 'developerManagement',
                text: '开发者管理',
                link: '',
                code: '',
                item: [{
                        lg: 'whiteListManagement',
                        text: '白名单管理',
                        link: 'whiteListManagement',
                        code: 'whiteList'
                    },
                    {
                        lg: 'developmentGuide',
                        text: '开发指南',
                        link: 'developmentGuide',
                        code: 'devText'
                    },
                    {
                        lg: 'SDKManagement',
                        text: 'SDK管理',
                        link: 'SDKManagement',
                        code: 'sdk'
                    },
                    // { lg: 'APIDocumentManagement', text: 'API文档管理', link: 'APIDocumentManagement', code: 'apiDocument' },
                    {
                        lg: 'APIDataReport',
                        text: 'API调用数据报告',
                        link: 'APIDataReport',
                        code: 'apiUse'
                    }
                ]
            },
            {
                lg: 'admin-account-manage',
                text: '管理员账号管理',
                link: 'userAccountManagement',
                show: true,
                item: null
            },
            {
                lg: 'dataOutput',
                text: '数据导出',
                link: 'dataOutput',
                code: 'dateExport',
                item: null
            },
            {
                lg: 'logisticsServiceInfo',
                text: '物流服务信息',
                link: 'logisticsServiceInfo',
                code: 'logistics',
                item: null
            }
        ],
        meunList: {
            "text": false,
            "banner": false,
            "message": false,
            // "apiDocument":false,
            "sdk": false,
            "whiteList": false,
            "devText": false,
            "apiUse": false,
            "dateExport": false,
            "logistics": false
        },
        select: {
            sdkType: [{
                    key: 'JAVA',
                    text: 'JAVA'
                },
                {
                    key: '.Net',
                    text: '.Net'
                }
            ],
            ISAccountFields: [{
                    key: '',
                    text: '全部'
                },
                {
                    key: 'ISId',
                    text: 'IS主账号'
                },
                {
                    key: 'ebayId',
                    text: 'ebayId'
                },
                {
                    key: 'email',
                    text: 'email'
                }
            ],
            dataTypes: [{
                    key: 'package',
                    text: '包裹'
                },
                {
                    key: 'recharge',
                    text: '充值流水'
                },
                {
                    key: 'consume',
                    text: '消费流水'
                }
            ]
        },
        status: {
            adminStatus: {
                NOTACTIVE: {
                    'key': 'NOTACTIVE',
                    text: '未激活'
                },
                DISABLE: {
                    'key': 'DISABLE',
                    text: '停用'
                },
                ENABLE: {
                    'key': 'ENABLE',
                    text: '启用'
                }
            }
        }
    };
    return Data;
});

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
/**
 *louis/20170817, 相关场景测试，
 */
define('test',['global'], function (Global) {
    var Test={};
    Test.run=function(msg,option,Api){
        //处理api中的code场景, code=form&key=login, code对应配置文件中的错误代码，key对应配置文件中的api接口
        if(Global.option.urlParam.key){msg.code=option.codeObj[Global.option.urlParam.code]||1;}
        else if(Global.option.urlParam.code){msg.code=codeObj[Global.option.urlParam.code]||1;};
        //处理账户场景，userType=0&verifyState=0&verifyType=0，  参数分别为配置文件中的索引值
        if(Global.option.urlParam.userType&&option.key=='userinfo'){msg.result.userType=Api.getData.getUser.userType()[Global.option.urlParam.userType]||1;};
        if(Global.option.urlParam.verifyState&&option.key=='userinfo'){msg.result.verifyState=Api.getData.getUser.verifyState()[Global.option.urlParam.verifyState]||1;};
        if(Global.option.urlParam.verifyType&&option.key=='userinfo'){msg.result.verifyType=Api.getData.getUser.verifyType()[Global.option.urlParam.verifyType]||1;};
        //处理个人中心--总页数场景测试
        if(Global.option.urlParam.totalPages&&(option.key=='getSubusers'||option.key=="getAccountBills"||option.key=='getEbayIds')){msg.result.totalPages=Global.option.urlParam.totalPages||1;};
        //偏好设置---物流偏好列表内容
        if(Global.option.urlParam.shippingPreferences&&option.key=='getShippingPreferences'){msg.result=[];};
        //偏好设置---供应商产品屏蔽
        if(Global.option.urlParam.disabled&&option.key=='getProducts'&&option.data){msg.result.splice(Global.option.urlParam.disabled,1);};
    };
    return Test;
});
/*
信息垂直居中显示，后面一个参数不传就是正常，传个1就是带注册按钮不带X
Global.fun.msgPop('需要显示的信息',1);
*/
/**
 *louis/20170803, common
 */
define('common', ['api', 'global', 'data'], function (Api, Global, Data) {
    var $common = {
        guestPage: ['login', 'register', 'register-success', 'forgetPassword', 'static', 'activation', 'resetPassword', 'subuserSetPassword', 'admin-forgetPassword', 'admin-resetPassword', 'help-search', 'help-center'], //不需要获取用户信息的页面
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
                            isSandBox: Global.option.isSandBox,
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
                    if(!Global.option.user) return;
                    return $common.fun.getArrayIndex(Global.option.user.userType, Api.getData.getUser.userType());
                },
                verifyState: function () {
                    if(!Global.option.user) return;
                    return $common.fun.getArrayIndex(Global.option.user.verifyState, Api.getData.getUser.verifyState());
                },
                verifyType: function () {
                    if(!Global.option.user) return;
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
/**
 *louis/20170803, require.config
 */
//获取页面入口js名称
var curPage = document.getElementById('wrapper').getAttribute('js-view');
var rHtmlUrl = '/build/controls/';
//require基础配置
require.config({
    baseUrl: '/build/js',
    paths: {
        'text': 'frame/text',
        'currentPage': curPage,
        'sandbox': 'frame/sandbox'
    },
    urlArgs: 'r=' + (new Date()).getTime()
});
//框架启动,完成后进入当前页面的js文件
require(['currentPage', 'common', 'global'], function (CurrentPage, common, Global) {
    // 沙箱环境
    if (Global.option.isSandBox) {
        require(['sandbox'], function (SandBox) {
            SandBox.init();
            init();
        });
    }else{
        init();
    }
    // 初始化
    function init() {
        common.initialize();
        common.loadUserStatus = function () {
            CurrentPage && (CurrentPage.initialize());
        };
        common.load();
    }
});