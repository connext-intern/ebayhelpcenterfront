$(function () {
    $("#btn1").hide();
    $("#btn2").hide();
    //页面初始化加载一级二级标题
    $.ajax({
        type:"post",
        url:"http://localhost:8060/user/listAllTitle",
        dataType:"json",
        success:function (data) {
            var menus = "";
            console.log("data-->"+data);
            $.each(data.dataObject,function (index,firstvalue) {
                console.log("一级标题-->"+firstvalue.firstTitle);
                menus += "<li class=\"mdui-collapse-item\">";
                menus += "<div class=\"mdui-collapse-item-header mdui-list-item mdui-ripple\">";
                menus += "<button class='mdui-btn mdui-btn-icon  mdui-ripple'><i class=\"mdui-list-item-icon mdui-icon material-icons\">&#xe3a0;</i></button>";
                menus += "<div class=\"mdui-list-item-content\">"+firstvalue.firstTitle+"</div>"+"<button class='mdui-btn mdui-btn-dense mdui-ripple mdui-color-red deleteFirstMenuBtn' firstid='"+firstvalue.firstId+"' style='width: 80px;height: 30px;'>删除一级</button>";
                menus += "<i class=\"mdui-collapse-item-arrow mdui-icon material-icons\">keyboard_arrow_down</i>";
                menus += "</div>";
                menus += "<ul class=\"mdui-collapse-item-body mdui-list mdui-list-dense\">";
                menus += "<li class=\"mdui-list-item mdui-ripple toEditFirstMenu\"  firstid='"+firstvalue.firstId+"' firsttitle='"+firstvalue.firstTitle+"' firstserial='"+firstvalue.firstSerial+"'><i class=\"mdui-list-item-icon mdui-btn-icon mdui-icon material-icons mdui-color-blue-accent\">&#xe22b;</i>修改该一级菜单标题</li>";
                $.each(firstvalue.secondMenuses,function (index, secondvalue) {
                    console.log("二级标题-->"+secondvalue.secondTitle);
                    menus += "<li class='mdui-list-item mdui-ripple' style='display: flex;justify-content: space-between' onclick='edit("+secondvalue.secondId+",\""+secondvalue.secondTitle+"\""+")'>"+secondvalue.secondTitle;
                    menus += "<button class='mdui-btn mdui-btn-dense mdui-ripple mdui-color-red-a200 deleteSecondMenuBtn' secondid='"+secondvalue.secondId+"'>删除二级</button></li>";
                });
                menus += "<li class=\"mdui-list-item mdui-ripple\" onclick='addSecondMenu("+firstvalue.firstId+")'><i class=\"mdui-list-item-icon mdui-icon material-icons mdui-color-blue-accent\">add</i>添加二级菜单</li>";
                menus += "</ul>";
                menus += "</li>";
            });
            //将一级二级标题放入div中
            $("#menulists").append(menus);

            //删除一级菜单
            $(".deleteFirstMenuBtn").click(function () {
                console.log("deleteFirstMenuBtn");
                var firstId = $(this).attr("firstid");
                console.log("firstid-->"+firstId);
                if(confirm("您确定要删除该一级菜单及该一级菜单下所有内容吗？")){
                    $.ajax({
                        type:"post",
                        url:"http://localhost:8060/manager/deleteFirstMenu/"+firstId,
                        dataType:"json",
                        success:function (data) {
                            if(data.state == 1){
                                window.location.href = "admin.html";
                            }else if(data.state == 0){
                                console.log("错误信息-->"+data.message);
                            }
                        },
                        error:function () {
                            alert("服务器请求错误");
                        }
                    });
                }
            });

            //删除二级菜单
            $(".deleteSecondMenuBtn").click(function () {
                console.log("deleteSecondMenuBtn");
                var secondId = $(this).attr("secondid");
                console.log("secondid-->"+secondId);
                if(confirm("您确定要删除该二级菜单所有内容吗？")){
                    $.ajax({
                        type:"post",
                        url:"http://localhost:8060/manager/deleteSecondMenu/"+secondId,
                        dataType:"json",
                        success:function (data) {
                            if(data.state == 1){
                                console.log("删除该二级菜单成功");
                                window.location.href = "admin.html";
                            }else if(data.state == 0){
                                console.log("错误信息-->"+data.message);
                            }
                        },
                        error:function () {
                            alert("服务器请求错误");
                        }
                    });
                }
            });

            //点击编辑一级菜单按钮
            var firstId = "";
            var firstSerial="";
            $(".toEditFirstMenu").click(function () {
                //把文本框里的内容设为空
                 $(".w-e-text").empty();
                //把按钮删了
                $(".saveFirstTitle").hide();
                 $(".mdui-textfield-input").val($(this).attr("firsttitle"));
                 firstId = $(this).attr("firstid");
                 firstSerial = $(this).attr("firstserial");
                 $(".mdui-textfield").append("<button class='mdui-btn mdui-ripple mdui-color-blue saveFirstTitle'>保存标题</button>");
                //点击保存一级菜单按钮
                $(".saveFirstTitle").click(function () {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8060/manager/updateFirst",
                        data:{firstSerial:firstSerial,
                            firstTitle:$(".mdui-textfield-input").val(),
                            firstId:firstId},
                        dataType:'text',
                        success:function(msg){
                            mdui.alert("你输入的新一级菜单保存成功");
                            setTimeout(function(){window.location.href = "admin.html"},500);
                        }
                    });
                })
            })
        },
        error:function () {
            alert("服务器请求错误");
        }
    });
});
/**
 * 点击二级菜单进入编辑模式
 * @param id
 * @param title
 */
function edit(id,title){
    $.ajax({
        type: "POST",
        url: "http://localhost:8060/manager/listSecondContent",
        data:{id:id},
        dataType:'json',
        success: function(msg){

            $("#editor").html(msg.dataObject.html);
            $("#id").val(id);
            $(".mdui-textfield-input").val(title);
            var E = window.wangEditor;
            var editor = new E('#editor');
            editor.create();
            $("#btn2").hide();
            $('#btn1').show();
        }
    });
}
/**
 * 点击保存按钮，保存所编辑的内容
 */
$('#btn1').click(function () {
    var html=$(".w-e-text").html();
    var content=$(".w-e-text").text();
    var id=$("#id").val();
    var title=$(".mdui-textfield-input").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8060/manager/updateSecond",
        data:{html:html,
            content:content,
            id:id,
            title:title},
        dataType:'text',
        success:function(msg){
            alert("保存成功");

        }
    });
});

/**
 * 点击添加一级菜单按钮
 */
$('#addFirstMenu').click(function () {
    mdui.prompt('请输入新的一级菜单标题', '新增一级菜单',
        function (value) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8060/manager/saveFirstMenus",
                data:{firstTitle:value},
                dataType:'text',
                success:function(msg){
                    mdui.alert("你输入的新一级菜单："+value+"保存成功");
                    setTimeout(window.location.href = "admin.html",300);
                }
            });
        }
    );
});

/**
 *  点击添加二级菜单按钮
 */
var firstId = "";
function addSecondMenu(secondFirstId){
    //把文本框和标题框里的内容设为空
    $(".mdui-textfield-input").val(" ");
    $(".w-e-text").empty();
    //把原来保存的按钮btn1隐藏
    $("#btn1").hide();
    //把保存新增的按钮btn2显示出来
    $("#btn2").show();
    firstId = secondFirstId;
}
//点击保存按钮btn2保存新增内容
$("#btn2").click(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8060/manager/saveSecondMenus",
        data:{secondTitle:$(".mdui-textfield-input").val(),
            content:$(".w-e-text").text(),
            html:$(".w-e-text").html(),
            secondFirstId:firstId},
        dataType:'text',
        success:function(msg){
            window.location.href = "admin.html";
        }
    });
})

