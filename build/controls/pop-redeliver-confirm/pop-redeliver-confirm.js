// 获取物流产品
define(['api', 'global', 'data',
  'text!/build/controls/pop-redeliver-confirm/pop-redeliver-confirm.html'
], function (Api, Global, Data, html) {
    return {
        template: html,
        props: ['id'],
        data: function () {
            return {
                packageId:null//记录需要重新发货的包裹ID
            };
        },
        watch:{
            id:function(packageId){
                this.packageId=packageId;
            }
        },
        methods: {
            close: function () {// 关闭当前窗口
              this.$emit('close');
            },
            saveRedeliver:function(event){
                this.$emit('saveredeliver',this.packageId);
            }
        },
      updated: function () { Global.fun.updataLanguage('.popup.redeliver-confirm'); },
      mounted: function () {}
    };
});