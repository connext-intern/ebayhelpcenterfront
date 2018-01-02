define(['api', 'global', 'data', 'text!/build/controls/preferences-logistics/popup-create-logistics-preferences.html'], function (Api, Global, Data, html) {
    return {
        template: html,
        props: ['item'], //显示和隐藏弹层
        data: function () {
            return {
                operator: 0,
                //设置条件
                logsName: '',//产品名称
                title: 'addLogisticsPreferences',
                logsListItemCode:Data.preferences.select.logisticsItem,
                logsDeliver:null,//记录交运方式下拉数据
                logsDirection:null,//记录路向下拉数据
                logsList: [
                    {
                        logsLg: Data.preferences.select.logisticsItem[0].lg,//item select默认文案
                        symbolLg: Data.preferences.select.symbol[0].lg,//symbol select默认文案
                        valueLg: 0,//value select默认文案
                        logsHiglight: 0,//item select默认高亮索引
                        symbolHiglight: 0,//symbol select默认高亮索引
                        valueHiglight: 0,//value select默认高亮索引
                        logsItem: Data.preferences.select.logisticsItem,//item  select所有内容
                        symbolItem: this.getSymbol(),//symbol select所有内容
                        value: ''
                    }
                ],
                language: Global.option.language,
                providerActive: -1,//物流商高亮状态
                providerList: [],//物流商产品
                filterProviderResult: null,//供应商筛选结果
                type: null,//记录是新增还是更新
                preferencesId: null,//记录编辑时的物流偏好ID
                conditions: [],//储存需要提交的conditions信息
                errorMessageLogs: null,//记录物流设置错误信息
                errorMessageProduct: null//记录物流商错误信息
            }
        },
        mounted: function () {
            if (this.item) { //外部组件进入
                this.showPopup();
            }
        },
        updated: function () { Global.fun.updataLanguage('.create-logistics-preferences'); },
        methods: {
            prevStep: function () {
                this.operator = 1;
                this.$emit('prev', 'logistics');
            },
            //显示物流商弹层
            showPopup: function (productId, type) {
                var that = this;
                this.operator = 1;
                this.errorMessageLogs = null;
                this.errorMessageProduct = null;
                this.providerList=[];
                $('.create-logistics-preferences .selectBox,.create-logistics-preferences .input-group').removeClass('error');
                this.type = type;
                this.title = this.type == 'edit' ? 'editLogisticsPreferences' : 'addLogisticsPreferences';
                if (type != 'edit') {
                    //清空弹层内容
                    this.type = null;
                    this.logsList.splice(0, this.logsList.length);
                    this.logsName = '';
                    this.providerActive = -1;
                    this.creatLogItem();
                    if (this.providerList.length > 0) $.each(this.providerList, function (index, item) { item.enabled = false; });
                };
                //获取交运方式下拉数据
                if(!this.logsDeliver){
                    this.getDeliver(function(deliverData){
                        that.logsDeliver=deliverData;
                        if(type == 'edit'){that.updataShippingPreference('deliver');}//将列表的数据进行解析
                    });
                }else{
                    if(type == 'edit'){that.updataShippingPreference('deliver');}//将列表的数据进行解析
                };
                //获取路向下拉数据
                if(!this.logsDirection){
                    this.getDirectionToList(function(directionData){
                        that.logsDirection=directionData;
                        if(type == 'edit'){that.updataShippingPreference('direction');}//将列表的数据进行解析
                    });
                }else{
                    if(type == 'edit'){that.updataShippingPreference('direction');}//将列表的数据进行解析
                };
                //初始化供应产品
                if (this.providerList.length == 0) {
                    Api.set({ key: 'getProducts', type: 'GET',isToken: false }, {
                        success: function (data, params) {
                            if (data.code == Api.getData.getCode().success) {
                                if (type == 'edit' && that.filterProviderResult) {
                                    //禁止掉供应商可选择按钮
                                    that.providerList = that.updataProductList(that.filterProviderResult, data.result);
                                } else {
                                    that.providerList = data.result;
                                };
                                //更新供应商高亮状态
                                that.providerActive = that.getIndex(productId, that.providerList);
                            }
                        }
                    });
                };
            },
            /******************************设置弹层操作*************************************/
            //添加物流偏好名称
            setNameInput: function (event) {
                this.logsName = event.target.value;
                this.domEvent(event, 'blur');
            },
            //选择条件
            setLogsItem: function (boxIndex, logsIndex) {
                var _this=this;
                this.logsList[boxIndex].logsHiglight = logsIndex;
                this.logsList[boxIndex].symbolHiglight = 0;
                this.logsList[boxIndex].logsLg = Data.preferences.select.logisticsItem[logsIndex].lg;
                this.logsList[boxIndex].symbolItem = this.getSymbol(logsIndex);
                this.logsList[boxIndex].symbolLg = this.logsList[boxIndex].symbolItem[0].lg;
                if (Data.preferences.select.logisticsItem[logsIndex].id == this.logsListItemCode[5].id||Data.preferences.select.logisticsItem[logsIndex].id == this.logsListItemCode[3].id) {
                    if(Data.preferences.select.logisticsItem[logsIndex].id == this.logsListItemCode[5].id){
                        this.logsList[boxIndex].value =this.logsDeliver;
                    }else{
                        this.logsList[boxIndex].value =this.logsDirection;
                    }
                    this.logsList[boxIndex].valueHiglight = 0;
                    if(this.logsList[boxIndex].value.length>0)this.logsList[boxIndex].valueLg = this.logsList[boxIndex].value[0].lg;
                    if(this.logsList[boxIndex].value.length==0)this.logsList[boxIndex].valueLg='';
                } else{
                    this.logsList[boxIndex].value = '';
                };
                this.domEvent(null, 'click');
            },
            //选择符号
            setSymbolItem: function (boxIndex, symbolIndex) {
                this.logsList[boxIndex].symbolHiglight = symbolIndex;
                this.logsList[boxIndex].symbolLg = this.logsList[boxIndex].symbolItem[symbolIndex].lg;
                this.domEvent(null, 'click');
            },
            //输入值
            setInput: function (event, boxIndex) {
                this.logsList[boxIndex].value = event.target.value;
                this.domEvent(event, 'blur');
            },
            //选择值
            setValueItem: function (event, boxIndex, valueIndex) {
                this.logsList[boxIndex].valueHiglight = valueIndex;
                this.logsList[boxIndex].valueLg = this.logsList[boxIndex].value[valueIndex].lg;
                this.domEvent(null, 'click');
            },
            //新增条件
            creatLogItem: function (boxIndex) {
                this.logsList.push({
                    logsLg: Data.preferences.select.logisticsItem[0].lg,
                    symbolLg: Data.preferences.select.symbol[0].lg,
                    valueLg: 0,
                    logsHiglight: 0,
                    symbolHiglight: 0,
                    valueHiglight: 0,
                    logsItem: Data.preferences.select.logisticsItem,
                    symbolItem: this.getSymbol(),
                    value: ''
                });
            },
            //删除条件
            deleteLogItem: function (boxIndex) {
                this.logsList.splice(boxIndex, 1);
                this.domEvent(null, 'click');
            },
            //选择物流商
            chooseProvider: function (event, index) {
                if ($(event.target).hasClass('disabled') || $(event.target).parents('.disabled').length > 0) return false;
                this.providerActive = index;
            },
            /***********************************************列表操作*******************************/
            //更新和保存物流偏好
            saveShippingPreference: function (event) {
                if (!this.checkShippingPreference(true)) { return false; }
                var tVue = this;
                var obj = {
                    name: $('.create-logistics-preferences .name-input input').val(),
                    productId: $('.create-logistics-preferences .provider-list li.active').attr('data-id'),
                    conditions: tVue.conditions
                };
                var key = this.type == 'edit' ? 'updateShippingPreference' : 'createShippingPreference';
                var type = this.type == 'edit' ? 'PUT' : 'POST';
                if (this.type == 'edit') { obj = $.extend({ preferenceId: this.preferencesId }, obj); }
                Api.set({ key: key, type: type, locked: event.target, data: obj }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            tVue.type = null;
                            if (tVue.item) { // 如果是外部进来的插件
                                tVue.dev_firstLogin(function(){
                                    tVue.$emit('next', 'logistics');
                                });
                                return;
                            } else {
                                tVue.$emit('refresh');
                            }
                            tVue.operator = 0;
                        }
                    }
                });
            },
            skip:function(){
                var that=this;
                that.dev_firstLogin(function(){
                    that.$emit('next', 'logistics');
                });
            },
            //获取所有路向
            getDirectionToList:function(callback){
                var that=this;
                Api.set({ key: 'getDirectionToList', type: 'GET'}, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            for(var i=0; i<data.result.length; i++){
                                data.result[i].id=data.result[i].code;
                                data.result[i].lg=data.result[i].name;
                            }
                            if(callback)callback(data.result);
                        }
                    }
                });
            },
            //获取所有交运方式
            getDeliver: function (_callback) {
                var that = this;
                var _stauts = Api.getData.getCode();
                Api.set({ key: 'getDeliveryPreferences', type: 'GET', isToken: false }, {
                    success: function (data, params) {
                        if (data.code == _stauts.success) {
                            var _arr=[];
                            for(var i=0; i<data.result.length; i++){
                                var _obj={};
                                _obj.id=data.result[i].id;
                                _obj.lg=data.result[i].name;
                                _arr.push(_obj);
                            }
                            _callback(_arr);
                        }
                    }
                });
            },
            //首次登陆保存
            dev_firstLogin:function(callback){
                var tVue = this;
                Api.set({ key: 'firstLogin', type: 'POST'}, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            if(callback) callback.call(tVue);
                        }else{
                            $.msg.alert(data.message);
                        }
                    }
                });
            },
            //change & blur &click 事件更新物流商
            domEvent: function (event, eventType, domType, index) {
                var that = this, setNum = null;
                setNum = window.setTimeout(function () {
                    if (eventType != 'change') {
                        var flag = that.checkShippingPreference();
                        if (flag) { that.loadProducts(that.conditions); }
                    } else {
                        if (domType == 'name') {
                            that.logsName = event.target.value;
                        } else if (domType == 'value') {
                            that.logsList[index].value = event.target.value;
                        };
                        that.checkShippingPreference();
                    }
                    window.clearTimeout(setNum);
                }, 1);
            },
            //检查是否满足条件
            checkShippingPreference: function (isSave) {
                var flag = true;
                //检查设置条件
                $('.create-logistics-preferences .item-list>ul').each(function () {
                    //判断select状态
                    $(this).find('.selectBox').each(function () {
                        if($(this).hasClass('logs-select')){
                            $(this).removeClass('error');
                        }else if($(this).hasClass('logs-select-deliver')){
                            if($(this).find('.selectOptions li').length>0){
                                $(this).removeClass('error');
                            }else{
                                flag = false;
                                if (isSave) { $(this).addClass('error'); }
                            }
                        }else{
                            if ($(this).find('.selectOptions li').eq(0).hasClass('cur')) {
                                flag = false;
                                if (isSave) { $(this).addClass('error'); }
                            } else {
                                $(this).removeClass('error');
                            }
                        }
                    });
                    //判断input
                    $(this).find('input').each(function () {
                        if (!/\S/.test($(this).val())) {
                            flag = false;
                            if (isSave) { $(this).parents('.input-group').addClass('error'); }
                        } else {
                            $(this).parents('.input-group').removeClass('error');
                        }
                    });
                });
                //储存Conditions信息
                if (flag) { this.conditions = this.getConditions(); } else { this.conditions.splice(0); }
                //保存需要的其他信息检查
                var name = $('.create-logistics-preferences .name-input input').val();
                if (!/\S/.test(name)) { if (isSave) { flag = false; $('.create-logistics-preferences .name-input').addClass('error'); } } else { $('.create-logistics-preferences .name-input').removeClass('error') };
                if (!flag) { if (isSave) { this.errorMessageLogs = 1; } } else { this.errorMessageLogs = null; }
                //验证物流方案
                if ($('.create-logistics-preferences .provider-list li.active').length == 0) { if (isSave) { flag = false; this.errorMessageProduct = 1; } } else { this.errorMessageProduct = null; }

                return flag;
            },
            getConditions: function () {
                var arr = [];
                $('.create-logistics-preferences .item-list>ul').each(function () {
                    var obj = { item: null, symbol: null, value: null };
                    $(this).find('.selectBox').each(function () {
                        if ($(this).parents('.item').length > 0) {
                            obj.item = $(this).find('li.cur').attr('data-id');
                        };
                        if ($(this).parents('.symbol').length > 0) {
                            obj.symbol = $(this).find('li.cur').attr('data-id');
                        };
                        if ($(this).parents('.value').length > 0) {
                            obj.value = $(this).find('li.cur').attr('data-id');
                        };
                    });
                    if (!obj.value) { obj.value = $(this).find('.value input').val(); };
                    arr.push(obj);
                });
                return arr;
            },
            /************************************接入方法*******************************************/
            editShippingPreference: function (obj, conditions) {
                this.preferencesId = obj.preferencesId;
                this.logsName = obj.logsName;
                this.productId = obj.productId;
                this.providerActive = this.getIndex(obj.productId, this.providerList);

                this.logsList = obj.logsList;
                this.loadProducts(conditions);
                this.showPopup(obj.productId, 'edit');
            },
            updataShippingPreference:function(key){
                var that=this;
                $.each(this.logsList,function(index,item){
                        if(key=='deliver'&&item.logsHiglight==5){
                            item.valueHiglight =that.getIndex(item.valueHiglight,that.logsDeliver);
                            item.value=that.logsDeliver;
                        };
                        if(key=='direction'&&item.logsHiglight==3){
                            item.valueHiglight =that.getIndex(item.valueHiglight,that.logsDirection);
                            item.value=that.logsDirection;
                        }
                });
            },
            /************************************加载物流商*******************************************/
            loadProducts: function (data) {
                console.log(data);
                var that = this;
                Api.set({ key: 'getProductsByCondition', type: 'POST', isToken: false,data: { conditions: data } }, {
                    success: function (data, params) {
                        if (data.code == Api.getData.getCode().success) {
                            if (that.providerList.length > 0) {
                                //that.providerList = that.updataProductList(data.result, that.providerList);
                                that.providerList = data.result;
                            } else {
                                that.filterProviderResult = data.result;
                            }
                        }
                    }
                });
            },
            /************************************计算部分*******************************************/
            //条件项筛选比较符号
            getSymbol: function (index) {
                var _index = index || 0;
                var arr = Data.preferences.select.logisticsItem[_index].zid;
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    newArr.push(Data.preferences.select.symbol[arr[i]]);
                }
                return newArr;
            },
            //获取物流产品选中的索引
            getIndex: function (id, list) {
                //console.log(id,list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id) {
                        if (list[i].id == id) { return i; }
                    } else {
                        if (list[i] == id) { return i; }
                    }
                }
                return -1;
            },
            //更新物流商不可选中状态
            updataProductList: function (filterArr, productArr) {
                var arr = new Array();
                arr = productArr.concat();
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < filterArr.length; j++) {
                        if (arr[i].id == filterArr[j].id) {
                            arr[i].enabled = true;
                        }
                    }
                };
                return arr;
            }
        }
    };
});