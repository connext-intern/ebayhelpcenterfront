//很据关键字查询标题
var keyword = "";

function querykeyword() {
    keyword = $("#keyword").val();
    $("article").html("");
    $.ajax(
        {
            type: 'POST',
            url: "http://localhost:8060/user/queryByKeyWords",
            data: {
                'keyword': keyword
            },
            dataType: 'json',
            success: function (data) {
                $("#count").html('关于<span class="red">' + keyword + '</span>，共找到了<span class="red">' + data.countByKeyword + '</span>相关问题');
                $.each(data.list, function (index, value) {
                    console.log("value.content-->" + value.content);
                    if (value.content.indexOf(keyword) >= 0) {
                        value.content = value.content.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                    }
                    $("article").append('<div class="res"><input class="secondid" type="hidden" value="' + value.secondId + '"/> <h4 class="title"><a href="javascript:querycontent()">' + value.secondTitle + '</a></h4> <p class="desc"></p > </div>');
                    $(".desc").html(value.content);
                });
                createComponent(data.countByKeyword);
            },
            error: function () {
                alert("服务器请求异常");
            }
        });
    $("#page").css('display', 'none');
    $("#title").css('display', 'none');
}

//根据标题查询内容
function querycontent() {
    var secondid = $(".secondid").val();
    $.ajax({
        type: 'POST',
        url: "http://localhost:8060/user/queryByTitle",
        data: {
            secondId: secondid
        },
        dataType: 'json',
        success: function (data) {
            alert(data.secondTitle);
            $("#titlelist").css('display', 'none');
            $("#title").css('display', 'block');
            html = data.secondTitle + data.content;
            $("#title").html(html);
        }
    });
};

function createComponent(count) {
    var that = this;
    that.vue = new Vue({
        el: ".help-center",
        data: {
            page: { // 页码块
                pagesize: 10,
                count: count,
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
                $('.help-center .menu-left').on('click', 'dt', function () {
                    var $parent = $(this).parents('dl');
                    if ($parent.hasClass('curr')) {
                        $parent.removeClass('curr');
                        $(this).siblings('dd').slideUp();
                    }
                    else {
                        $parent.addClass('curr');
                        $(this).siblings('dd').slideDown();
                        $parent.siblings('dl').removeClass('curr').find('dd').slideUp();
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
                        // _this.load_list();
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
                                    $("#count").html('关于<span class="red">' + keyword + '</span>，共找到了<span class="red">' + data.countByKeyword + '</span>相关问题');
                                    $.each(data.list, function (index, value) {
                                        console.log("value.content-->" + value.content);
                                        if (value.content.indexOf(keyword) >= 0) {
                                            value.content = value.content.replace(new RegExp(keyword, "gm"), "<font color='red' >" + keyword + "</font>");
                                        }
                                        $("article").append('<div class="res"><input class="secondid" type="hidden" value="' + value.secondId + '"/> <h4 class="title"><a href="javascript:querycontent()">' + value.secondTitle + '</a></h4> <p class="desc"></p > </div>');
                                        $(".desc").html(value.content);

                                    });
                                },
                                error: function () {
                                    alert("服务器请求异常");
                                }
                            });
                        $("#page").css('display', 'none');
                        Global.fun.updataLanguage('.js-pager');
                    }
                });
                Global.fun.updataLanguage('.js-pager');
            },
            trigger: function (index) { // 初始化触发某个栏目
                $('.help-center .menu-left dt').eq(index).trigger('click');
            }
        },
        updated: function () {
            Global.fun.updataLanguage('.help-center');
        }
    });
}

function init_event() {
    var _this = this;
}

