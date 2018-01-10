/**
 * Created by Zach.Zhang on 2017/12/28.
 */
//让菜单能拖动
$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable2" ).sortable();
    $( "#sortable2" ).disableSelection();
});
//查找出所有的一级菜单并显示在页面上
function showAllFirst(){
    $.post("http://localhost:8060/manager/showAllFirst",
        function(data){
            $("#sortable").empty();
            for(var i=0;i<data.dataObject.length;i++){
                $("#sortable").append(" <li class='ui-state-default' id='"+data.dataObject[i].firstSerial+"'>"+data.dataObject[i].firstTitle+"&nbsp;&nbsp;<button class='mdui-btn mdui-btn-dense mdui-color-red mdui-ripple' style='float:right' onclick='showSecondTitle("+data.dataObject[i].firstId+")'>显示二级菜单</button></li>");
            }
            $(".sortFirstClass").append("<button class='mdui-btn mdui-color-blue' onclick='sortFirst()'>排序一级菜单</button>")
        })
}

//对一级菜单进行排序
function sortFirst() {
        var length = $("#sortable .ui-state-default").length;
        var firstSerials = new Array();
        for(var i=1;i<=10000;i++ ){
            $("#sortable .ui-state-default").each(function () {
                if($(this).attr("id")==i){
                    firstSerials.push($(this).index()+1);
                }
            })
        }
        alert(firstSerials);
        $.post("http://localhost:8060/manager/sortFirstTitle/"+firstSerials,
            function(data,status){
                alert(data.message+"---"+data.state+"---"+data.dataObject);
                setTimeout(function () {
                    window.location.href = "admin.html";
                },500)
            })
}

//根据一级菜单id查出所有的二级标题
function showSecondTitle(id){
    $.post("http://localhost:8060/manager/listSecondTitle/"+id,
        function(data){
            new mdui.Panel('#panel').open(0);
            $("#sortable2").empty();
            for(var i=0;i<data.dataObject.length;i++){
                $("#sortable2").append(" <li class='ui-state-default' id='"+data.dataObject[i].secondSerial+"'>"+data.dataObject[i].secondTitle+"</li>");
            }
        })
    //对二级菜单进行排序
   $("#sortSecond").click(function () {
       var length = $("#sortable2 .ui-state-default").length;
       var secondSerials = new Array();
       for(var i=1;i<=10000;i++ ){
           $("#sortable2 .ui-state-default").each(function () {
               if($(this).attr("id")==i){
                   secondSerials.push($(this).index()+1);
               }
           })
       }
       $.post("http://localhost:8060/manager/sortSecondTitle/"+id+"/"+secondSerials,
           function(data){
                if(data.state == 1){
                    mdui.snackbar({
                        message: '排序成功！',
                        position: 'top'
                    });
                    setTimeout(function () {
                        window.location.href = "admin.html";
                    },500)
                }else if(data.state == 0){
                    console.log("error info-->"+data.message);
                }

           })
   });
}
