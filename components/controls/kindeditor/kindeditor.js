// 编辑器 add by louis
define(['api', 'global','data'], function (Api, Global, Data) {
    return {
        template: '<textarea id="kindeditor-textarea"></textarea>',
        props: ['height','content'],
        data: function () {
            return {
                editor:null,//编辑器对象
                param:{
                    width:'100%',
                    height:this.height,
                    items: [
                        'source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
                        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                         'table', 'hr', 'pagebreak', 'anchor', 'link', 'unlink'
                    ],
                    filterMode: true,
                    loadStyleMode: false,
                    resizeType:0
                }
            };
        },
        methods: {
            //编辑器初始化
            init:function(){
                var that=this;
                this.editor = KindEditor.create('#kindeditor-textarea', this.param);
                $(this.editor.container[0]).find('textarea').bind('input propertychange',function(){that.addEventlistenerTextarea();});
                $(this.editor.edit.doc.body).bind('DOMNodeInserted',function(){that.addEventlistenerTextarea();})
            },
            //获取编辑器富文本内容
            getKindEditorHtml:function(){
                return this.editor.html();
            },
            //设置编辑器错误状态
            setEditorError:function(flag){
                //flag：true为错误状态，falsh为默认状态
                var val=flag?'#e42e35':'#ccc';
                $(this.editor.container[0]).css({borderColor:val});
            },
            //编辑器内容的监听
            addEventlistenerTextarea:function(){
                var text=this.getKindEditorHtml();
                if(/\S/.test(text)){this.setEditorError();}
            }
        },
        watch:{
            content:function(text){
                this.editor.html(text);
            }
        },
        mounted: function () {
            this.init();
        }
    };
});