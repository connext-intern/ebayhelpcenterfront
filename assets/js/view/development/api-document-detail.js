// add by gena API文档
define(['api', 'global'], function (Api, Global) {
    return {
        initialize: function () {
            $('.footer-development').addClass('footer-cur');
            var that = this;
            Global.fun.startLoadHtml(function () { that.run(); });
        },
        run: function () {
            var that = this;
            that.vue = new Vue({
                el: '.page',
                data: {
                    apiDTO: null,
                    apiEntity: { operationId: '' },
                    list: [],
                    currCodeType: 'java',
                    responseJSONCodes: null,
                    javaCodes: null,
                    csharpCodes: null,
                    requestParams: [],
                    responseParams: []
                },
                methods: {
                    init: function () {
                        this.getAPI();
                    },
                    getAPI: that.getAPI, // 获取api文档
                    setCurrEntity: function (item) {
                        $(".requestParams table tbody tr[data-level!=0]").remove();
                        $(".requestParams table tbody tr[class~='minus']").removeClass('minus').addClass('plus');
                        $(".responseParams table tbody tr[data-level!=0]").remove();
                        $(".responseParams table tbody tr[class~='minus']").removeClass('minus').addClass('plus');
                        this.apiEntity = item;
                        this.responseJSONCodes = null;
                    },
                    objMap: that.objMap,
                    setValue: that.setValue,
                    isArray: that.isArray,
                    isObject: that.isObject,
                    setJSON: that.setJSON
                },
                watch: {
                    apiEntity: function (item) {
                        var _this = this;
                        this.javaCodes = item['x-exp']['JAVA'].split('\n\r');
                        this.csharpCodes = item['x-exp']['.Net'].split('\n\r');
                        this.requestParams = item.parameters;
                        this.responseParams = item.responses['200'].schema['$ref'];
                        if (this.responseParams) {
                            var arr = this.responseParams.split('/');
                            this.responseParams = this.apiDTO[arr[arr.length - 1]];
                            this.responseJSONCodes = this.setJSON(this.apiDTO, {}, this.responseParams.properties);
                        }
                    }
                },
                mounted: function () {
                    this.init();
                }
            });
        },
        setJSON: function (ori, strinit, strcurr) {
            var str = strinit;
            for (var b in strcurr) {
                if (strcurr.hasOwnProperty(b)) {
                    var a = strcurr[b];
                    if (!a.type || a.type == 'array' || a.type === 'object') {
                        var curr = '';
                        if (a.type == 'array') curr = a.items['$ref'];
                        else curr = a['$ref'];
                        var arr = curr.split('/');
                        var paramsobj = ori[arr[arr.length - 1]];
                        str[b] = {};
                        arguments.callee(ori, str[b], paramsobj.properties);
                    }
                    else str[b] = a.description;
                }
            }
            return str;
        },
        setValue: function (obj, item) {
            var _this = this;
            var $target = $(obj.srcElement || obj.target), $parent = $target.parent('tr'), _index = ($('.minus').length + 1);
            var arr = item.split('/');
            var paramsobj = this.apiDTO[arr[arr.length - 1]];

            if ($parent.hasClass('minus')) {
                var removeIndex = $parent.attr('data-level') ? ($parent.attr('data-level') * 1 + 1) : 0;
                $parent.siblings('[data-level]').each(function () {
                    if (this.getAttribute('data-level') >= removeIndex) $(this).remove();
                });
                $parent.removeClass('minus').addClass('plus');
                return;
            }
            if (item) { $parent.removeClass('plus').addClass('minus'); }
            else return;
            _this.objMap(paramsobj.properties, function (a, b) {
                var plus = '', curr = a['$ref'];
                if (curr || a.type == 'object' || a.type == 'array') {
                    plus = ' plus';
                }
                if (a.type == 'array') {
                    curr = a.items['$ref'];
                }
                var $tr = $('<tr data-level=' + _index + ' class="control control' + _index + '' + plus + '">\
                <td class="name" style="text-indent:'+ (_index * 20) + 'px;" data-ref=' + (curr || '') + '>' + b + '</td>\
                <td class="type">'+ (a.type || 'object') + '</td>\
                <td class="sampleValue">'+ (a.example || '') + '</td>\
                <td class="describe">'+ (a.description || '') + '</td>\
                </tr>');
                $tr.find('td').click(function (ev) {
                    var temp = this.getAttribute('data-ref');
                    _this.setValue(ev, temp);
                });
                $target.parent('tr').after($tr);
            });

        },
        getAPI: function () {
            var _this = this;
            Api.set({ key: 'apidocs', type: 'GET', accountType: 'development', isToken: true }, {
                success: function (data, params) {
                    _this.apiDTO = data.definitions;
                    _this.objMap(data.paths, function (a, b) {
                        _this.list.push(a['post'] || a['get']);
                    });
                    _this.apiEntity = _this.list[0];
                }
            });
        },
        isFn: function (fn) {
            return typeof fn === "function"
        },
        isObject: function (obj) {
            return !!obj && typeof obj === "object"
        },
        isArray: function (thing) {
            return Array.isArray(thing)
        },
        objMap: function (obj, fn) {
            var reducer = function (newObj, key) {
                newObj[key] = fn(obj[key], key);
                return newObj;
            };
            return Object.keys(obj).reduce(reducer, {});
        },
        objReduce: function (obj, fn) {
            var reducer = function (newObj, key) {
                var res = fn(obj[key], key)
                if (res && typeof res === "object")
                    Object.assign(newObj, res);
                return newObj;
            };
            return Object.keys(obj).reduce(reducer, {});
        }
    };
})