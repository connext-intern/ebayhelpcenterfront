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
