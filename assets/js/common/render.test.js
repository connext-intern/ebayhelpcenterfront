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