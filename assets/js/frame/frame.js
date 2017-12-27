/**
 *louis/20170803, ajax,loadHtml,loadJavascript
 */
(function ($) {
    /*
    HTML:
        <div class='selectBox basic'>
            <div class='selectVal'></div>
            <ul class='selectOptions'>
                <li data-value="one">first</li>
                <li data-value="two">second</li>
                <li data-value="three">thirdly</li>
            </ul>
        </div>
        默认选中第一个如果需要指定添加class=>cur
    JS:
        var selectBoxHandle=new $.selectBox($(".selectBox.basic"),function(_val){
            console.log(_val);
        });
    */
    $.loading = {
        show: function (paramater) {
            if ($(paramater.dom).find('.commonLoad').length > 0) {
                return;
            }
            var loading = $('<div class="commonLoad"><div class="loadImg"></div></div>');
            var mask = $('<div class="commonMask">mask</div>');
            $(paramater.dom).append(mask);
            $(paramater.dom).append(loading);
            $('.commonLoad,.commonMask').fadeIn(500);
        },
        //关闭loading
        hide: function (callback) {
            $("body").find(".commonLoad").remove();
            $("body").find(".commonMask").remove();
            if (callback) callback();
        }
    };
    $.selectBox = function (el, callback) {
        var $selectBox = {};
        var val, options, option, cur;
        $selectBox.init = function () {
            val = $(el).find('.selectVal');
            options = $(el).find('.selectOptions');
            option = $(el).find('.selectOptions li');
            cur = $(el).find('.selectOptions li.cur').index();
            cur < 0 ? cur = 0 : cur++;
            $selectBox.select(cur);
            val.click(function () {
                el.hasClass('isOpen') ? $selectBox.hide() : $selectBox.show();
            });
            option.click(function () {
                cur = $(this).index();
                $selectBox.select(cur);
                $selectBox.hide();
            });
        };
        $selectBox.show = function () {
            el.addClass('isOpen')
            options.show();
        };
        $selectBox.hide = function () {
            el.removeClass('isOpen')
            options.hide();
        };
        $selectBox.select = function (_index) {
            option.removeClass('cur');
            option.eq(_index).addClass('cur');
            var _value = option.eq(_index).attr('data-value');
            var _val = option.eq(_index).html();
            if (_value) _val = _value;
            val.html(_val);
        };
        $selectBox.init();
        return $selectBox;
    }
    $.buildPop = function (option) {
        var $buildPop = {};
        var popContent;
        $buildPop.init = function () {
            popContent = $('.popup.' + option.popupName);
            popContent.find('.close,.mask').click(function () {
                $buildPop.close();
            });
        };
        $buildPop.find = function (_ele) {
            return popContent.find(_ele);
        };
        $buildPop.show = function () {
            popContent.show();
        };
        $buildPop.close = function () {
            popContent.hide();
        };
        $buildPop.init();
        return $buildPop;
    };
    $.validate = function (keys, val) {
        var result = {
            boo: true,
            msgType: 'success'
        };
        var types = {
            'requied': {
                'rule': /\S/ig,
                'msgType': 'err2'
            },
            'send-address': {
                // 'rule': /^[a-z\sA-Z0-9~`@#$%^&*-_=+|\\?\/()\<\>\[\]\{\}",.;'!]+$/ig, 全角没有包含
                // 'rule': /^[^\u4E00-\u9FA5]+$/ig, 不要中文
                'rule': /^.+$/ig, // 任意
                'msgType': ''
            },
            'username': { // verify username for sandbox
                'rule': /^[0-9]{8}$/ig,
                'msgType': 'erro'
            },
            'passwordForsandbox': { // verify password for sandbox
                'rule': /^[a-zA-Z0-9]{36}$/ig,
                'msgType': 'erro'
            },
            'email': {
                'rule': /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/ig,
                'msgType': ''
            },
            'password': {
                'rule': /^[a-zA-Z0-9!@#$%^*-_+=]{6,20}$/ig,
                'msgType': 'erro'
            },
            'identifyingCode': {
                'rule': /^[a-zA-Z0-9]{4}$/ig,
                'msgType': 'erro'
            },
            'tel': {
                'rule': /^[0-9\s\*\#\-\+]{6,20}$/ig,
                'msgType': 'erro'
            },
            'tel-HK': {
                'rule': /^[0-9+]{8}$/ig,
                'msgType': 'erro'
            },
            'tel-TW': {
                'rule': /^[0-9+]{10}$/ig,
                'msgType': 'erro'
            },
            'tel-CN': {
                'rule': /^[0-9+]{11}$/ig,
                'msgType': 'erro'
            },
            'english': {
                'rule': /^[A-Za-z\s0-9]+$/ig,
                'msgType': 'err1'
            },
            'zipcode-us': {
                'rule': /^[\d-]{1,10}$/ig,
                'msgType': 'erro'
            },
            'zipcode': {
                'rule': /^[\d]{1,10}$/ig,
                'msgType': 'erro'
            },
            'num': {
                'rule': /^\d+$/ig,
                'msgType': 'erro'
            },
            'dignum': { // 验证价格
                'rule': /^([0-9]{0,8})(\.[0-9]{1,2})?$/ig,
                'msgType': 'erro'
            },
            'dignum1': { // 验证重量
                'rule': /^([0-9]{0,7})(\.[0-9]{1,2})?$/ig,
                'msgType': 'erro'
            },
            'dignum2': { // 验证长宽高
                'rule': /^([0-9]{0,3})(\.[0-9]{1,2})?$/ig,
                'msgType': 'erro'
            },
            'nozh': {
                'rule': /^[a-zA-Z0-9]+$/ig,
                'msgType': 'erro'
            },
            'emailbefore': {
                'rule': /^[0-9a-zA-Z._]+$/ig,
                'msgType': 'erro'
            }
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in types) {
                if (types.hasOwnProperty(key)) {
                    result.msgType = types[key].msgType;
                    result.boo = types[key].rule.test(val);
                    if (!result.boo) {
                        return result;
                    }
                }
            } else {
                console.log('未知的验证类型' + key);
            }
        }
        return result;
    }
    $.focusWatch = function (el, callback) {
        var $focusWatch = {};
        var _types = $(el).attr('data-vail').split('&');
        var _input = $(el).find('input');
        var _status = 'unvisited';
        $focusWatch.init = function () {
            if (_types[0] == '') _types = [];
            _input.bind('blur input propertychange', function (evt) {
                var _isInput = false;
                if (evt.type == 'input') _isInput = true;
                $focusWatch.determin(_isInput);
            });
        };
        $focusWatch.determin = function (_isInput) {
            _types = $(el).attr('data-vail').split('&');
            if (_types[0] == '') _types = [];
            var _val = _input.val();
            var _result = $.validate(_types, _val);
            if (!_result.boo && !_isInput) {
                $(el).addClass('erro');
                callback(_result.msgType);
                return false;
            } else {
                $(el).removeClass('erro');
            }
            return true;
        }
        $focusWatch.init();
        return $focusWatch;
    };
    $.cookite = {
        addCookie: function (name, value, expiresHours) {
            var cookieString = name + '=' + encodeURIComponent(value);
            //判断是否设置过期时间,0代表关闭浏览器时失效
            if (expiresHours > 0) {
                var date = new Date();
                date.setTime(date.getTime + expiresHours * 3600 * 1000);
                cookieString = cookieString + '; expires=' + date.toGMTString();
            }
            document.cookie = cookieString;
        },
        delCookie: function (name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000); //设定一个过去的时间即可
            document.cookie = name + '=v; expires=' + date.toGMTString();
        },
        getCookie: function (name) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split('; ');
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split('=');
                if (arr[0] == name) {
                    return arr[1];
                }
            }
            return '';
        }
    };
    $.setAjax = function (parameter) {
        var type = parameter.type || 'GET';
        var dataType = parameter.dataType || 'html';
        var url = parameter.url || null;
        var data = parameter.data || null;
        var success = parameter.success || null;
        var error = parameter.error || null;
        if (!parameter.url || parameter.url == '') {
            setTimeout(function () {
                if (success) success(parameter.test, parameter);
            }, 500);
            return false;
        }
        $.ajax({
            type: type,
            dataType: dataType,
            url: url + '?r=' + new Date().getTime(),
            data: data,
            success: function (msg) {
                if (success) success(msg, parameter);
            },
            error: function (msg) {
                if (error) error(msg, parameter);
            }
        });
    };
    /*checkBox
    HTML:
        <div class="checkBox multi">
            <div class="radio">option1</div>
            <div class="radio">option2</div>
        </div>
    JS:
        var checkBoxHandle=new $.checkBox($(".checkBox"),function(_answear){
            console.log(_answear);
        });
    CSS:
        .radio.cur
    */
    $.checkBox = function (elements, _clickCallBack) {
        elements.each(function (index, _element) {
            _element = $(_element);
            var $checkBox = {};
            var isMulti, checkBoxArr, checkedArr;
            $checkBox.init = function () {
                isMulti = _element.hasClass("multi");
                checkBoxArr = _element.find(".radio");
                checkedArr = [];
                for (var i = 0; i < checkBoxArr.length; i++) {
                    $(checkBoxArr[i]).attr({
                        "data-selection": i
                    });
                }
                checkBoxArr.click(function () {
                    var _index = $(this).attr("data-selection");
                    if ($(this).hasClass("cur")) {
                        if (isMulti) {
                            $(this).removeClass("cur");
                            $.each(checkedArr, function (i, v) {
                                if (v == _index) checkedArr.splice(i, 1);
                            });
                        }
                    } else {
                        if (!isMulti) {
                            _element.find(".cur").removeClass("cur");
                            checkedArr = [];
                        }
                        $(this).addClass("cur")
                        checkedArr.push(_index);
                    }
                    checkedArr.sort(function (a, b) {
                        return a - b;
                    });
                    if (_clickCallBack) _clickCallBack.call(this, checkedArr);
                });
            };
            $checkBox.removeCall = function () {
                for (var i = 0; i < checkBoxArr.length; i++) {
                    $(checkBoxArr[i]).removeAttr("data-selection");
                    $(checkBoxArr[i]).removeClass("cur");
                }
                $(checkBoxArr).unbind();
            };
            $checkBox.init();
        });
    };
    /**
     * tooltips add by gena
     * $.tooltips({
                target: '.hello',
                content:'你好',
                fnclose: function () {
                    alert(1);
                }
            });
     */
    $.tooltips = function (options) {
        if (!options.target) return;
        var defaults = {
            trigger: 'click', // 触发hover|click
            isarrow: true, // 是否显示箭头
            direction: 'up', // 方向down|up|left|right
            content: '', // 内容
            width: '200',
            height: 'auto',
            zIndex: 100,
            fnclose: $.noop
        };
        var Tooltip = (function () {

            function TooltipContext(element, options) {
                this.element = element;
                this.options = options;
                var _id = "#tooltip" + this.getId();
                if ($(_id).length > 0) $(_id).hide();
                this.container = $('<div id="tooltip' + this.getId() + '" class="ui-tooltip-container"/>');
                $('body').append(this.container);
                this.element.attr('data-target', _id);
                this.format();
                this.init_event();
            }
            TooltipContext.prototype.getId = function () {
                var _length = $('.ui-tooltip-container').length;
                return _length++;
            }
            TooltipContext.prototype.format = function () {
                var html = '<div class="ui-tooltip-content">';
                html += '<div class="ui-tooltip-head"></div>';
                html += '<div class="ui-tooltip-body">' + this.options.content + '</div>';
                this.container.html(html);
                this.setdirection();
                this.setposition();
            };
            TooltipContext.prototype.init_event = function () {
                switch (this.options.trigger) {
                    case 'hover':
                        this.bind_event_hover();
                        break;
                    case 'click':
                        this.bind_event_click();
                        break;
                }
            };
            TooltipContext.prototype.bind_event_hover = function () {
                var that = this;
                this.element.hover(function () {
                    that.container.show();
                }, function () {
                    that.container.hide();
                    if (that.options.fnclose) that.options.fnclose.call(that);
                });
            };
            TooltipContext.prototype.bind_event_click = function () {
                var that = this;
                this.element.on('click', function () {
                    that.container.show();
                });
                // $(document).on('click', function (ev) {
                //     that.container.hide();
                // });
            };
            TooltipContext.prototype.setdirection = function () {
                // var _left = this.element.offset().left, _top = this.element.offset().top, _width = this.element.outerWidth(), _height = this.element.outerHeight();
                // if (!this.options.direction) {

                // }
                this.container.addClass(this.options.direction);
            };
            TooltipContext.prototype.setposition = function () {
                var _left = this.element.offset().left,
                    _top = this.element.offset().top,
                    _width = this.element.outerWidth(),
                    _height = this.element.outerHeight();
                var containerLeft = 0,
                    containerTop = 0,
                    containerWidth = this.container.outerWidth(),
                    containerHeight = this.container.outerHeight();
                switch (this.options.direction) {
                    case 'up':
                        containerLeft = _left + (_width / 5) - (containerWidth / 2 + 20);
                        containerTop = _top + _height + 10;
                        break;
                    case 'down':
                        containerLeft = _left + (_width / 5);
                        containerTop = _top - containerHeight;
                        break;
                }
                this.container.css({
                    'left': containerLeft + 'px',
                    'top': containerTop + 'px',
                    'z-index': this.options.zIndex
                }).show();
            };
            return TooltipContext;
        })();
        $(options.target).each(function (index, item) {
            new Tooltip($(item), $.extend({}, defaults, $(this).data(), options, {
                zIndex: 100 - index
            }));
        });
    };
    /* js-select add by gena
    $('.js-select').each(function () { $.select($(this),function(obj){alert(obj.value);alert(obj.text);}) });
    <div class="js-select"><select><option></option></select>></div>
    */
    $.select = function (element, callback) {
            var $select = $(element).children('select');
            var methods = {
                init: function () {
                    if ($(element).find('.select-val').length == 0) $(element).append('<div class="select-val"></div>');
                    var _index = $select[0].selectedIndex || 0;
                    this.set_val(_index);
                    this.init_event();
                },
                set_val: function (index) {
                    var selectedItem = $select[0].options[index];
                    $(element).find('.select-val').text(selectedItem.text);
                    selectedItem.selected = true;
                    return selectedItem;
                },
                init_event: function () {
                    var _this = this;
                    $select.change(function () {
                        var selectedItem = _this.set_val(this.selectedIndex);
                        if (callback) callback.call($select, selectedItem);
                    });
                }
            }
            methods.init();
        },
        // 消息提示 add by gena
        $.msg = {
            // 使用 $.msg.confirm('你确定删除吗？',function(){
            //     alert(111);
            // });
            toast: function (msg) {
                this.renderToast(true, msg);
            },
            confirm: function (msg, callback) {
                this.render(false, msg, callback);
                $('.popup.confirm').find('.cancel,.save').removeClass('hide');
            },
            // $.msg.alert('测试试试');
            alert: function (msg) {
                this.render(false, msg);
                $('.popup.confirm').find('.ok').removeClass('hide');
            },
            confirmLan: function (strLanguage, callback) {
                this.render(true, strLanguage, callback);
                $('.popup.confirm').find('.cancel,.save').removeClass('hide');
            },
            alertLan: function (strLanguage) {
                this.render(true, strLanguage);
                $('.popup.confirm').find('.ok').removeClass('hide');
            },
            confirmNext: function (msg, callback) {
                this.render(false, msg, callback);
                $('.popup.confirm').find('.save').removeClass('hide');
            },
            render: function (istrans, msg, callback) {
                var attrs = '';
                if (istrans) {
                    attrs = "lg=" + msg;
                }
                if ($('.popup.confirm').length > 0) {
                    $('.popup.confirm').remove();
                }
                $('body').append("<div class='popup confirm show'>\
                <div class='mask'></div>\
                <div class='content'>\
                    <div class='popup-body' " + attrs + ">" + msg + "</div>\
                    <div class='popup-footer'>\
                        <a class='hide btn cancel' href='javascript:;' lg='cancel'></a>\
                        <a class='hide btn save' href='javascript:;' lg='save'></a>\
                        <a class='hide btn ok' href='javascript:;' lg='save'></a>\
                    </div>\
                </div>\
            </div>");
                $('.popup.confirm').find('.cancel').click(function () {
                    $(this).parents('.popup').remove();
                    $.loading.hide();
                });
                $('.popup.confirm').find('.save').click(function () {
                    $(this).parents('.popup').remove();
                    if (callback && typeof callback === 'function') callback.call($('.popup.confirm'));
                });
                $('.popup.confirm').find('.ok').click(function () {
                    $(this).parents('.popup').remove();
                    $.loading.hide();
                });
                this.updata('.popup.confirm');
            },
            renderToast: function (istrans, msg) {
                var attrs = '';
                if (istrans) {
                    msg = tipsMsgs[msg];
                }
                if ($('.toast').length > 0) $('.toast').remove();
                $('body').append("<p class='toast'>" + msg + "</p>");
                setTimeout(function () {
                    $('.toast').addClass('hide1');
                }, 3000);
            },
            //更新html中的ui语言
            updata: function (module) {
                var newModule = module || 'body';
                //console.log($(newModule)[0]);
                $(newModule).find('[lg]').each(function () {
                    var arr = $(this).attr('lg').split(',');
                    var arrTemp = [];
                    arr.forEach(function (item) {
                        if (item == '-') {
                            arrTemp.push('-');
                        } else {
                            arrTemp.push(tipsMsgs[item]);
                        };
                    });
                    if (this.tagName == 'INPUT') {
                        $(this).attr('placeholder', arrTemp.join(''));
                    } else {
                        $(this).html(arrTemp.join(''));
                    }
                });
            }
        }

    // 上传文件 $.upload({
    //     target: '#uploadForm',
    //     token:Global.option.adminToken||Global.option.token
    //     url: Api.getData.getApiUrl('importSKU'),
    //     callback: function () {
    //         alert('上传成功')
    //     }
    // });
    $.upload = function (options) {
            var defaults = {
                target: null,
                url: '',
                token: '',
                callback: $.noop,
                complete: $.noop,
                error: $.noop
            };
            var params = $.extend({}, defaults, options);
            if (!params.target || !params.url) {
                $.msg.alert('元素或地址为空');
            }

            var formData = new FormData($(params.target)[0]);
            $.ajax({
                type: "POST",
                cache: false,
                data: formData,
                url: params.url,
                contentType: false,
                processData: false,
                beforeSend: function (request) {
                    request.setRequestHeader("language", $.cookite.getCookie('_language')||'zh-cn');
                    if (params.token) {
                        request.setRequestHeader("token", params.token);
                    }
                },
                success: function (res) {
                    if (params.callback) params.callback.call($(params.target), res);
                },
                error: function () {
                    if (params.error) params.error.call($(params.target));
                },
                complete: function () {
                    if (params.complete) params.complete.call($(params.target));
                }
            });

        },
        // 可拖拽的 add by gena
        $.drop = function (options) {
            if (!options.target) return;
            var defaults = {
                callback: $.noop,
            };
            var Drop = (function () {
                function DropContext(element, options) {
                    this.element = $(element);
                    this.options = options;
                }
                DropContext.prototype.init = function () {
                    this.element.onmousedown = mousedown;
                }
                DropContext.prototype.mousedown = function (ev) {

                }
                DropContext.prototype.init = function () {

                }
                return DropContext;
            })();
            new Drop(options.target, $.extend({}, defaults, options));
        },
        /**
         * 分页 add by gena
         * if ($('.js-pager').length > 0) {
                    // $.pager({ target: '.js-pager',count:100,callback:function(current, pagesize, pagecount){} });
                    // $.pager({ target: '.js-pager',pagecount:10 });
           }
         */
        $.pager = function (options) {
            if (!options.target) return;
            var defaults = {
                callback: $.noop,
                pagesize: 10, // 每页显示条数
                pagecount: 0, // 总页数
                count: 0, //数据总条数
                current: 1, // 当前页
                istoolbar: true,
                pageSizeList: [10, 20, 50]
            };
            var Pager = (function () {
                function PagerContext(element, options) {
                    this.element = element;
                    if (this.element.length > 0) this.element.empty();
                    this.options = options;
                    this.container = $('<div class="ui-pager-container cf" />');
                    $(element).append(this.container);
                    this.render();
                    if (this.pagecount == 0) return;
                    this.format();
                    this.init_event();
                }
                PagerContext.prototype.render = function (opt) {
                    this.count = (opt && opt.count) || this.options.count;
                    this.pagesize = (opt && opt.pagesize) || this.options.pagesize;
                    this.current = (opt && opt.current) || this.options.current;
                    var _pagecount = ((opt && opt.pagecount) || this.options.pagecount);
                    this.pagecount = _pagecount ? _pagecount : Math.ceil(((opt && opt.count) || this.options.count) / ((opt && opt.pagesize) || this.options.pagesize));
                };
                PagerContext.prototype.format = function () {
                    var html = '<ul class="fl">';
                    html += '<li class="js-page-prev ui-page ui-page-prev" lg="previous-page">上一页</li>';
                    if (this.pagecount > 7) { //超过7页
                        html += '<li data-page="1" class="ui-page">1</li>'
                        if (this.current >= 6) { //当前页数大于6页
                            html += '<li data-page="2" class="ui-page">2</li>';
                            html += '<li class="ui-page ui-pager-ellipse">...</li>';
                            for (var i = this.current - 2; i <= Math.min(this.current + 2, this.pagecount); i++) {
                                html += '<li data-page="' + i + '" class="ui-page">' + i + '</li>';
                            }
                        } else { //当前页数小于6页
                            for (var i = 2; i < 6; i++) {
                                html += '<li data-page="' + i + '" class="ui-page">' + i + '</li>';
                            }
                            if (this.current == 5) {
                                html += '<li data-page="6" class="ui-page">6</li>';
                            }
                        }
                        if (this.current < this.pagecount - 2) html += '<li class="ui-page ui-pager-ellipse">...</li>';
                    } else {
                        for (var i = 1; i <= this.pagecount; i++) {
                            html += '<li data-page="' + i + '" class="ui-page">' + i + '</li>'
                        }
                    }
                    html += '<li class="js-page-next ui-page ui-page-next"  lg="next-page">下一页</li>';
                    html += '</ul>';
                    this.container.html(html);
                    this.container.find('li[data-page="' + this.current + '"]').addClass('cur');
                    if (this.current == 1) {
                        $('.js-page-prev', this.container).addClass('ui-page-disabled');
                        $('.js-page-first', this.container).addClass('ui-page-disabled');
                    }
                    if (this.current == this.pagecount) {
                        $('.js-page-next', this.container).addClass('ui-page-disabled');
                        $('.js-page-last', this.container).addClass('ui-page-disabled');
                    }
                    if (this.options.istoolbar) {
                        this.set_toolbar();
                    }
                };
                PagerContext.prototype.set_toolbar = function () {
                    var _this = this;
                    var html = '<li class="ui-pager-toolbar"><span lg="total"></span>' + this.count + '<span lg="records"></span> | ' + this.pagecount + '<span lg="page"></span>，<span lg="to"></span><span lg="the"></span><input class="ui-pager-count" type="text" value="1" /><span lg="page"></span><a class="ui-pager-go" href="javascript:;" lg="go"></a></li>';
                    this.container.children('ul').append(html);
                    var summaryhtml = '<div class="ui-pager-summary fr">\
					<span class="fl" lg="show-perpage"></span>\
					<div class="js-select ui-select-pagesize">\
						<select></select>\
					</div>\
					<span class="fr" lg="record_info"></span>\
				</div>';
                    this.container.append(summaryhtml);
                    var selecthtml = '';
                    for (var i = 0; i < this.options.pageSizeList.length; i++) {
                        if (this.options.pageSizeList[i] == this.pagesize) {
                            selecthtml += '<option selected value=' + this.options.pageSizeList[i] + '>' + this.options.pageSizeList[i] + '</option>';
                        } else {
                            selecthtml += '<option value=' + this.options.pageSizeList[i] + '>' + this.options.pageSizeList[i] + '</option>';
                        }
                    }
                    var $select = this.container.find('select').append(selecthtml);
                    this.container.find('.ui-pager-count').val(_this.current);
                    $.select(this.container.find('.js-select'), function (obj) {
                        _this.change_pagesize(obj.value);
                    });
                    this.container.find('.ui-pager-go').on('click', function () {
                        var _value = $(this).siblings('input').val();
                        if (isNaN(_value) || _value > _this.pagecount) {
                            return;
                        }
                        _this.go(_value);
                        return false;
                    });
                };
                PagerContext.prototype.init_event = function () {
                    var _this = this;
                    this.container.on('click', 'li.ui-page', function () {
                        var $this = $(this);
                        if ($this.hasClass('ui-page-disabled')) return;
                        if ($this.hasClass('cur')) return;
                        if ($this.hasClass('js-page-prev')) {
                            _this.current--;
                        } else if ($this.hasClass('js-page-next')) {
                            _this.current = Math.min(_this.pagecount, _this.current + 1);
                        } else if ($(this).data('page')) {
                            _this.current = parseInt($(this).data('page'));
                        }
                        _this.go();
                        return;
                    });
                };
                PagerContext.prototype.change_pagesize = function (pagesize) {
                    this.render({
                        current: 1,
                        pagesize: pagesize
                    });
                    this.go(this.current);
                };
                PagerContext.prototype.go = function (index) {
                    var _this = this;
                    this.current = index || this.current;
                    this.current = Math.max(1, _this.current);
                    this.current = Math.min(this.current, _this.pagecount);
                    if (!this.current) this.current = 1;
                    this.format();
                    _this.options.callback && _this.options.callback.call(_this, this.current, this.pagesize, this.pagecount);
                }
                return PagerContext;
            })();
            $(options.target).each(function (index, item) {
                new Pager($(item), $.extend({}, defaults, $(this).data(), options, {
                    zIndex: 100 - index
                }));
            });
        };
    $.loadHtml = {
        start: function (dom, callback) {
            var count = 0,
                total = 0,
                self = this;
            var content = $(dom).find('[data-htmlfile]');
            total = content.size();
            if (total == 0) {
                if (callback) callback();
                return;
            }
            content.each(function () {
                $.setAjax({
                    el: $(this),
                    url: $(this).attr('data-htmlfile'),
                    vrs: $(this).attr('vrs'),
                    success: function (data, parameter) {
                        parameter.el.replaceWith(data);
                        count++;
                        if (count == total) {
                            self.start(dom, callback);
                        };
                    },
                    error: function () {
                        count++;
                        if (count == total) {
                            self.start(dom, callback);
                        };
                    }
                });
            });
        }
    };
    $.browser = {
            isIE: function () {
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                    return true;
                else
                    return false;
            },
            isFF: function () {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Firefox") > -1) {
                    return true;
                }
                return false;
            },
            isSafari: function () {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Safari") > -1) {
                    return true;
                }
                return false;
            },
            isChrome: function () {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Chrome") > -1) {
                    return true;
                }
                return false;
            },
            isOpera: function () {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Opera") > -1) {
                    return true;
                }
                return false;
            }
        },
        $.javaSrcipt = {
            start: function (path, arr, callback) {
                var count = 0,
                    total = arr.length,
                    self = this;
                if (total == 0) {
                    if (callback) callback();
                    return;
                }
                $.each(arr, function (index, item) {
                    $.getScript(path + item + '.js', function (data) {
                        count++;
                        if (count == total) {
                            if (callback) callback();
                        };
                    });
                });
            }
        };
})(jQuery);
// //session操作
(function ($) {
    $.session = {
        _id: null,
        _cookieCache: undefined,
        _init: function () {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();
            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        window.sessionStorage.setItem(key, this._cookieCache[key]);
                    } catch (e) {};
                }
            }
            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires=' + (new Date((new Date).getTime() + 120000)).toUTCString();
        },
        _generatePrefix: function () {
            return '__session:' + this._id + ':';
        },
        _initCache: function () {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },
        _setFallback: function (key, value, onceOnly) {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 120000)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },
        _getFallback: function (key) {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },
        _clearFallback: function () {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },
        _deleteFallback: function (key) {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },
        get: function (key) {
            return window.sessionStorage.getItem(key) || this._getFallback(key);
        },
        set: function (key, value, onceOnly) {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {}
            this._setFallback(key, value, onceOnly || false);
            return this;
        },
        'delete': function (key) {
            return this.remove(key);
        },
        remove: function (key) {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {};
            this._deleteFallback(key);
            return this;
        },
        _clearSession: function () {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
        },
        clear: function () {
            this._clearSession();
            this._clearFallback();
            return this;
        }
    };
    // $.session._init();
})(jQuery);