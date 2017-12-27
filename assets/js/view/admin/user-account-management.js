/**
 *louis/20170803, testpage
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 3, subIndex: '' };
            //初始化面包屑
            Global.fun.updataCrumbs([{ lg: 'message' }]);
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    adminstatuss: Data.admin.status.adminStatus,
                    openerAddAdmin: 0,// 打开添加管理员弹层
                    pagerObj: { current: 1, pagesize: 10 },
                    adminData: { adminId: '', role: null },
                    list: [],// 列表数据
                    selecterArr:[],
                    selecterAllArr:[
                        {arr:[],boo:false},
                        {arr:[],boo:false},
                        {arr:[],boo:false},
                        {arr:[],boo:false}
                    ],
                    popidinput:'',
                    popup_personalAddOperatorCompleted:false,
                    operatorEntity:{userName:''}
                },
                mounted: function () {
                    this.init();
                    this.adminAccountSearch();
                },
                methods: {
                    init:function(){
                        this.dev_adminAllRolesGet();
                    },
                    add_subuser:function(){
                        var that=this;
                        that.popup_personalAddOperatorCompleted=false;
                        that.showPopup(1);
                    },
                    checkSelecter:function(){
                        for(var i=0; i<this.selecterAllArr.length; i++){
                            var _arr=this.selecterAllArr[i].arr;
                            var _boo=true;
                            for(var a=0; a<_arr.length; a++){
                                if(this.selecterArr[_arr[a]].class=='')_boo=false;
                            }
                            this.selecterAllArr[i].boo=_boo;
                        }
                    },
                    selectAllClick:function(_index){
                        var _arr=this.selecterAllArr[_index].arr;
                        var _class='';
                        if(!this.selecterAllArr[_index].boo)_class='cur';
                        for(var i=0; i<_arr.length; i++){
                            this.selecterArr[_arr[i]].class=_class;
                        }
                        this.selecterAllArr[_index].boo=!this.selecterAllArr[_index].boo;
                    },
                    selecterClick:function(_index){
                        if(this.selecterArr[_index].class=='cur'){
                            this.selecterArr[_index].class='';
                        }else{
                            this.selecterArr[_index].class='cur';
                        }
                        this.selecterArr.splice(_index,1,this.selecterArr[_index]);
                        this.checkSelecter();
                    },
                    dev_adminAccountSave:function(){
                        var that = this;
                        var _data={}
                        if(that.openerAddAdmin==1){
                            //新增
                            _data.updateFlag='I';
                        }else{
                            //编辑
                            _data.updateFlag='U';
                            _data.adminId=that.adminData.adminId;
                        }
                        _data.email=that.popidinput;
                        var _role=[];
                        for(var i=0; i<that.selecterArr.length; i++){
                            var _obj={};
                            if(that.selecterArr[i].class=='cur'){
                                _obj.level=that.selecterArr[i].level;
                                _obj.code=that.selecterArr[i].code;
                                _obj.value=that.selecterArr[i].value;
                                _role.push(_obj);
                            }
                        }
                        _data.role=_role;
                        //获取权限列表
                        var _vailObj=$.validate(['requied'],that.popidinput);
                        if(_vailObj.boo){
                            Api.set({ key: 'adminAccountSave', type: 'POST', accountType: 'admin',data:_data}, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        that.adminAccountSearch();
                                        if(_data.updateFlag=='I'){
                                            that.operatorEntity.userName=that.popidinput+'@ebay.com';
                                            that.popup_personalAddOperatorCompleted=true;
                                        }
                                        that.closePopup();
                                        
                                    };
                                }
                            });
                        }else{
                            $('.popup.addAdmin .groupInput').addClass('erro');
                        }
                    },
                    groupInputBlur:function(){
                        var that = this;
                        var _vailObj=$.validate(['requied'],that.popidinput);
                        if(!_vailObj.boo){
                            $('.popup.addAdmin .groupInput').addClass('erro');
                        }
                    },
                    groupInputInput:function(){
                        $('.popup.addAdmin .groupInput').removeClass('erro');
                    },
                    //checkbox选择
                    setCheckbox: function (event, index) {
                        this.list[index].isCheck = !this.list[index].isCheck;
                    },
                    //全选
                    setAllCheckbox: function (event) {
                        var flag = $(event.target).parent().hasClass('cur');
                        if (flag) { $(event.target).parent().removeClass('cur'); } else { $(event.target).parent().addClass('cur'); }
                        for (var i = 0; i < this.list.length; i++) {
                            this.list[i].isCheck = !flag;
                        }
                    },
                    //显示弹层
                    showPopup: function (type, data) {
                        var that=this;
                        if (type == 2) {
                            for(var i=0; i<that.selecterArr.length; i++){
                                
                                for(var a=0; a<data.roles.length; a++){
                                    if(that.selecterArr[i].code==data.roles[a].code)that.selecterArr[i].class='cur';
                                };
                            }
                            that.checkSelecter();
                            that.adminData = data;

                            var _str=that.adminData.email;
                            var _index=_str.indexOf('@');
                            _str=_str.slice(0,_index);

                            that.popidinput=_str;
                            that.openerAddAdmin = 2;
                        }else{
                            that.openerAddAdmin = 1;
                        }
                    },
                    closePopup:function(){
                        var that=this;
                        that.popidinput='';
                        for(var i=0; i<that.selecterArr.length; i++){
                            that.selecterArr[i].class='';
                        }
                        that.checkSelecter();
                        that.openerAddAdmin=0;
                    },
                    //初始化分页
                    pager: function (totalPage, totalCount) {
                        var that = this;
                        $.pager({
                            target: '.js-pager', current: this.pagerObj.current, pagesize: this.pagerObj.pagesize, pagecount: totalPage, count: totalCount, callback: function (current, pagesize) {
                                that.pagerObj.current = current;
                                that.pagerObj.pagesize = pagesize;
                                that.adminAccountSearch();
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //停用和启用
                    adminAccountStatusChange: function (event, adminId, changeStatus) {
                        var that = this;
                        Api.set({ key: 'adminAccountStatusChange', locked: event ? event.target : null, accountType: 'admin', data: { changeStatus: changeStatus, adminId: adminId } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.adminAccountSearch();
                                };
                            }
                        });
                    },
                    //批量删除
                    adminAccountDelete: function (event, adminIds) {
                        var that = this;
                        if (!adminIds) {
                            if (!this.checkboxStatus()) { $.msg.alertLan('choose-manager'); return false; }
                            adminIds = adminIds ? adminIds : this.getAdminIds();
                        }
                        $.msg.confirmLan('confirm-delete',function(){
                            Api.set({ key: 'adminAccountDelete', locked: event ? event.target : null, accountType: 'admin', data: { adminIds: adminIds } }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        $('.slct-page .del-item').removeClass('cur');
                                        that.adminAccountSearch();
                                    }
                                }
                            });
                        });
                    },
                    //获取管理员里列表
                    adminAccountSearch: function () {
                        var that = this;
                        Api.set({ key: 'adminAccountSearch', type: 'GET', accountType: 'admin', data: { pageNo: this.pagerObj.current, pageSize: this.pagerObj.pagesize } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    for (var i = 0; i < data.result.dataList.length; i++) {
                                        data.result.dataList[i].isCheck = 0;
                                    };
                                    that.list = data.result.dataList;
                                    that.pager(data.result.totalPages, data.result.totalCounts);
                                };
                            }
                        });
                    },
                    dev_adminAllRolesGet:function(){
                        var that = this;
                        //获取权限列表
                        Api.set({ key: 'adminAllRolesGet', type: 'GET', accountType: 'admin' }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.selecterArr = data.result;
                                    for(var i=0; i<that.selecterArr.length; i++){
                                        that.selecterArr[i].class='';
                                        that.selecterAllArr[that.selecterArr[i].level-2].arr.push(i);
                                        //selecterArr
                                    }
                                    //console.log(that.selecterAllArr);
                                };
                            }
                        });
                    },
                    //获取选择的MessageId
                    getAdminIds: function () {
                        var arr = [];
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { arr.push(this.list[i].adminId); }
                        }
                        return arr;
                    },
                    //检查checkbox状态
                    checkboxStatus: function () {
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { return true; }
                        }
                        return false;
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                    Global.fun.replaceHref('.page-wrapper');
                }
            });
        }
    };
})