// 日历控件
define(['api', 'global', 'data'], function (Api, Global, Data) {
    return {
        template: '<div class="date"><input class="wicon" v-model="initval" type="text" v-bind:placeholder="setLanguage()"  readonly /><span></span></div>',
        props: ['delay', 'initval', 'mindate'],
        data: function () {
            return {
                editor: null,
                param: {
                    width: '100%'
                }
            };
        },
        methods: {
            init: function () {
                if (this.delay) return;
                var _this = this;
                var $target = $(_this.$el).find('span'),
                    $source = $(_this.$el).find('input');
                $source.jeDate({
                    format: "YYYY-MM-DD",
                    isTime: false,
                    isinitVal: false,
                    okfun: function (obj, val) {
                        _this.$emit('getval', val);
                    },
                    choosefun: function (obj, val) {
                        _this.$emit('getval', val);
                    },
                    clearfun: function () {
                        _this.$emit('getval', '');
                    }
                });
                $target.on('click', function () {
                    $source.trigger('click');
                });
            },
            setLanguage: function () {
                return languages['plzSelect'];
            }
        },
        watch: {},
        mounted: function () {
            this.init();
        }
    };
});