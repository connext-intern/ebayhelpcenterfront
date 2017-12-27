/**
 * gfh/20170904
 */
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            Global.fun.menuVue.hignlight = { index: 1, subIndex: 0 };
            //初始化vue
            this.vue = new Vue({
                el: ".page-wrapper",
                data: {
                    list: [],//列表数据
                    openerAD: 0,//广告弹层
                    errorMessage: 0,//记录新增或编辑弹层的错误信息
                    ADData: { bannerNumber: '', bannerTitle: '', bannerURL: '', imageURL: '', saveFlag: "I", uploadDate: '' }
                },
                mounted: function () {
                    this.getAdminBannerGet();
                },
                methods: {
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
                    //输入框记录
                    inputChange: function (event, type) {
                        if (type == 'name') { this.ADData.bannerTitle = $(event.target).val(); }
                        if (type == 'link') { this.ADData.bannerURL = $(event.target).val(); }
                    },
                    //显示广告位弹层
                    showAdPopup: function (type, index) {
                        this.openerAD = 1;
                        this.ADData.bannerTitle = '';
                        this.ADData.bannerURL = '';
                        this.ADData.imageURL = '';
                        this.ADData.saveFlag = 'I';
                        this.errorMessage = 0;
                        $('.popup.add-ad-slot .section input').val('');
                        $('.popup.add-ad-slot .error').removeClass('error');
                        if (type == 'edit') {
                            this.ADData = $.extend(this.ADData, this.list[index]);
                            this.ADData.saveFlag = 'U';
                        }
                    },
                    //选择图片
                    fileChange: function (event) {
                        var that = this;
                        var file = event.currentTarget.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var image = new Image();
                            image.onload = function () {
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                canvas.width = this.width;
                                canvas.height = this.height;
                                context.drawImage(this, 0, 0, this.width, this.height);
                                that.ADData.imageURL = canvas.toDataURL('image/jpeg');
                                canvas = null;
                            };
                            image.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    },
                    //新增和编辑广告位
                    adminBannerSave: function (event) {
                        var that = this;
                        if (!this.checkForm()) { return false; }
                        this.ADData.bannerTitle = $('.popup.add-ad-slot .section input.title').val();
                        this.ADData.bannerURL = $('.popup.add-ad-slot .section input.link').val();
                        Api.set({ key: 'adminBannerSave', isToken: false, accountType: 'admin', locked: event ? event.target : null, data: this.ADData }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.openerAD = 0;
                                    that.getAdminBannerGet();
                                }
                            }
                        });
                    },
                    //调整顺序
                    adminBannerChange: function (event, bannerId, num) {
                        var that = this;
                        Api.set({ key: 'adminBannerChange', isToken: false, accountType: 'admin', locked: event ? event.target : null, data: { bannerId: bannerId, newNumber: num } }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    that.getAdminBannerGet();
                                }
                            }
                        });
                    },
                    //批量删除
                    adminBannerDel: function (event, bannerIds) {
                        var that = this;
                        if (!bannerIds) {
                            if (!this.checkboxStatus()) { $.msg.alertLan('choose-adv'); return false; }
                            bannerIds = bannerIds ? bannerIds : this.bannerIds();
                        }
                        $.msg.confirmLan('confirm-delete', callback);
                        function callback() {
                            Api.set({ key: 'adminBannerDel', isToken: false, locked: event ? event.target : null, accountType: 'admin', data: { bannerIds: bannerIds } }, {
                                success: function (data, params) {
                                    if (data.code == Api.getData.getCode().success) {
                                        $('.slct-page .del-item').removeClass('cur');
                                        that.getAdminBannerGet();
                                    }
                                }
                            });
                        };
                    },
                    //获取广告位列表
                    getAdminBannerGet: function () {
                        var that = this;
                        Api.set({ key: 'adminBannerGet', type: 'GET', isToken: false, accountType: 'admin' }, {
                            success: function (data, params) {
                                if (data.code == Api.getData.getCode().success) {
                                    if (data.result) {
                                        for (var i = 0; i < data.result.length; i++) {
                                            data.result[i].isCheck = 0;
                                        };
                                    }
                                    that.list = data.result;
                                }
                            }
                        });
                    },
                    //获取选择的MessageId
                    bannerIds: function () {
                        var arr = [];
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { arr.push(this.list[i].bannerId); }
                        }
                        return arr;
                    },
                    //检查checkbox状态
                    checkboxStatus: function () {
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].isCheck) { return true; }
                        }
                        return false;
                    },
                    //检查新增或编辑广告位
                    checkForm: function () {
                        var flag = true;
                        $('.popup.add-ad-slot .section input').each(function (index, item) {
                            if (!/\S/.test($(this).val()) && index<1) {
                                flag = false;
                                $(this).parents('.input-group').addClass('error');
                            } else {
                                $(this).parents('.input-group').removeClass('error');
                            }
                        });
                        if (this.ADData.imageURL == '') {
                            flag = false;
                            $('.popup.add-ad-slot .fileerror').html('请上传广告图片');
                        } else {
                            $('.popup.add-ad-slot .fileerror').html('');
                        }
                        if (!flag) { this.errorMessage = 1; } else { this.errorMessage = 0; };
                        return flag;
                    }
                },
                updated: function () {
                    Global.fun.updataLanguage('.page-wrapper');
                }
            });
        }
    };
})