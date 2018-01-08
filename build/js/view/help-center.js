// 帮助中心 add by gena
var keyword = "";
var keycount=0;
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        focusWatchArr: [],
        initialize: function () {
            var that = this;
            Global.fun.startLoadHtml(function () {
                that.createComponent();
            });
        },
        createComponent: function () {
            var that = this;
            that.vue = new Vue({
                el: ".help-center",
                data: {
                    page: { // 页码块
                        pagesize: 10,
                        count: keycount,
                        current: 1
                    }
                },
                mounted: function () {
                    this.init();
                },
                methods: {
                    init: function () {
                        this.init_event();
                        // 初始化触发某个栏目
                        this.trigger(0);
                        // 分页控件
                        this.pager();
                    },
                    init_event: function () {
                        var _this = this;
                        $('#a_query').on('click',function () {
                            //获取输入框的值
                            keyword=$("#keyword").val();
                            _this.querykey(keyword);
                        });
                        $('.help-center .menu-left').on('click', 'dt', function () {
                            var $parent = $(this).parents('dl');
                            if($parent.hasClass('curr')){
                                $parent.removeClass('curr');
                                $(this).siblings('dd').slideUp();
                            }
                            else{
                                $parent.addClass('curr');
                                $(this).siblings('dd').slideDown();
                                $parent.siblings('dl').removeClass('curr').find('dd').slideUp();
                            }
                        });
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:8060/user/listAllTitle",
                            dataType:'json',
                            success: function(msg){
                                if(msg.state==1){
                                    var data=msg.dataObject;
                                    for(var i=0;i<data.length;i++){
                                        $(".menu-left").append("<dl><dt><a href='javascript:;'>"+data[i].firstTitle+"</a></dt></dl>");
                                        var x=data[i].secondMenuses;
                                        for(var j=0;j<x.length;j++){
                                            //alert("<dd><a href='javascript:show("+x[j].secondId+','+msg[i].firstTitle+','+x[j].secondTitle+");'>"+x[j].secondTitle+"</a></dd>");
                                            //alert("<dd><a href='javascript:show("+x[j].secondId+");'>"+x[j].secondTitle+"</a></dd>")
                                            var html=x[j].secondId+",\""+data[i].firstTitle+"\""+",\""+x[j].secondTitle+"\"";
                                            $(".menu-left dl:eq("+i+")").append("<dd><a href='javascript:showSecondContent("+html+");'>"+x[j].secondTitle+"</a></dd>");
                                        }
                                    }
                                }
                            }
                        });

                    },
                    pager: function () { // 分页
                        var _this = this;
                        $.pager({
                            target: '.js-pager',
                            count: _this.page.count,
                            current: _this.page.current,
                            pagesize: _this.page.pagesize,
                            callback: function (current, pagesize, pagecount) {
                                _this.page.current = current;
                                _this.page.pagesize = pagesize;
                                _this.page.pagecount = pagecount;
                                // _this.load_list();
                                _this.updatepage(current,pagesize,pagecount);
                                Global.fun.updataLanguage('.js-pager');
                            }
                        });
                        Global.fun.updataLanguage('.js-pager');
                    },
                    trigger:function(index){ // 初始化触发某个栏目
                        $('.help-center .menu-left dt').eq(index).trigger('click');
                    },
                    updatepage:function (current,pagesize,pagecount) {
                        //获取分页的页数和每页显示的条数
                        //清空append();
                        $("article").html("");
                        $.ajax(
                            {
                                type: 'POST',
                                url: "http://localhost:8060/user/queryByPage",
                                data: {
                                    'keyword': keyword,
                                    "pageno": current,
                                    "pagesize": pagesize
                                },
                                dataType: 'json',
                                success: function (data) {
                                    if(data.state == 1){
                                        $("#count").html('关于<span class="red">' + keyword + '</span>，共找到了<span class="red">' + data.dataObject.countByKeyword + '</span>相关问题');
                                        $.each(data.dataObject.list, function (index, value) {
                                            console.log("value.content-->" + value.content);
                                            var title = value.secondTitle.replace(/ /g,'&#32;');
                                            var secondId = value.secondId;
                                            var secondTitle = value.secondTitle;
                                            $("#searcharticle").append("<div class='res'><h4 class='title'><a style='color: #41a83e' href='javascript:querycontent("+secondId+",\""+secondTitle+"\")' class='"+secondId+"'></a></h4> <p id='"+secondId+"'></p > </div>");
                                            if (value.content.indexOf(keyword) >= 0) {
                                                value.content = value.content.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                                            }
                                            if (title.indexOf(keyword) >= 0) {
                                                title = title.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                                            }
                                            $("."+secondId+"").html(value.secondTitle);
                                            $("#"+secondId+"").html(value.content);
                                        });
                                    }else if(data.state == 0){
                                        console.log("错误信息-->"+data.message);
                                    }

                                },
                                error: function () {
                                    alert("服务器请求异常");
                                }
                            });
                        $("#page").css('display', 'none');
                        Global.fun.updataLanguage('.js-pager');
                    },
                    //根据关键词查询
                    querykey : function(keyword){
                        $('#querycontent').css('display','block');
                        var _this = this;
                        $("#searcharticle").html("");
                        $.ajax(
                            {
                                type: 'POST',
                                url: "http://localhost:8060/user/queryByKeyWords",
                                data: {
                                    'keyword': keyword
                                },
                                dataType: 'json',
                                success: function (data) {
                                    if(data.state == 1){
                                        keycount = data.dataObject.countByKeyword;
                                        $("#count").html('关于<span class="red">' + keyword + '</span>，共找到了<span class="red">' + data.dataObject.countByKeyword + '</span>相关问题');
                                        $.each(data.dataObject.list, function (index, value) {
                                            console.log("value.content-->" + value.content);
                                            var title = value.secondTitle.replace(/ /g,'&#32;');
                                            var secondId = value.secondId;
                                            var secondTitle = value.secondTitle;
                                            $("#searcharticle").append("<div class='res'><h4 class='title'><a style='color: #41a83e' href='javascript:querycontent("+secondId+",\""+secondTitle+"\")' class='"+secondId+"'></a></h4> <p id='"+secondId+"'></p > </div>");
                                            if (value.content.indexOf(keyword) >= 0) {
                                                value.content = value.content.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                                            }
                                            if (title.indexOf(keyword) >= 0) {
                                                title = title.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                                            }
                                            $("."+secondId+"").html(title);
                                            $("#"+secondId+"").html(value.content);
                                            _this.page.count=keycount;
                                            _this.page.current=1;
                                            _this.page.pagesize=10;
                                            _this.pager();
                                        });
                                    }else if(data.state == 0){
                                        console.log("没有相关搜索");
                                        var keywordspan = "";
                                        keywordspan += "<img src='/img/sorry.png' />";
                                        keywordspan += "     ";
                                        keywordspan += "很抱歉，我们暂时无 “"+"<font style='font-weight: bolder' '>"+keyword+"</font>"+"” 的相关信息，请您重新搜索。";
                                        $("#searcharticle").html(keywordspan);
                                        $("#count").html("");
                                        $(".js-pager").html("");
                                    }
                                },
                                error: function () {
                                    alert("服务器请求异常");
                                }
                            });
                        $('#menucontent').css('display','none');
                    },
                },
                updated: function () {
                    Global.fun.updataLanguage('.help-center');
                }
            });
        },
        init_event: function () {
            var _this = this;
        }
    };
});
//根据标题查询内容
function querycontent(secondid,secondTitle) {
    $("#menucontent").html("");
    $.ajax({
        type: 'POST',
        url: "http://localhost:8060/user/queryByTitle",
        data: {
            secondId: secondid
        },
        dataType: 'json',
        success: function (data) {
            $("#querycontent").css('display', 'none');
            $("#menucontent").css('display', 'block');
            $("#menucontent").html("<nav>"+data.dataObject.firstTitle+">"+secondTitle+"</nav>"+data.dataObject.html);
        }
    });
};

function showSecondContent(id,title1,title2) {
    $('nav').html(title1+">"+title2);
    $.ajax({
        type: "POST",
        url: "http://localhost:8060/user/queryHtmlBySecondId",
        data:{secondId:id},
        dataType:'json',
        success: function(msg){
            if(msg.state==1) {
                $('#menucontent').html("<nav>"+title1+">"+title2+"</nav>"+msg.dataObject);
                $('#querycontent').css('display', 'none');
                $('#menucontent').css('display', 'block');
            }
        }
    });
}

