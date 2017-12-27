/**
 *louis/20170803, require.config
 */
//获取页面入口js名称
var curPage = document.getElementById('wrapper').getAttribute('js-view');
var rHtmlUrl = '/build/controls/';
//require基础配置
require.config({
    baseUrl: '/build/js',
    paths: {
        'text': 'frame/text',
        'currentPage': curPage,
        'sandbox': 'frame/sandbox'
    },
    urlArgs: 'r=' + (new Date()).getTime()
});
//框架启动,完成后进入当前页面的js文件
require(['currentPage', 'common', 'global'], function (CurrentPage, common, Global) {
    // 沙箱环境
    if (Global.option.isSandBox) {
        require(['sandbox'], function (SandBox) {
            SandBox.init();
            init();
        });
    }else{
        init();
    }
    // 初始化
    function init() {
        common.initialize();
        common.loadUserStatus = function () {
            CurrentPage && (CurrentPage.initialize());
        };
        common.load();
    }
});