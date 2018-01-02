// 首页轮播图模块 add by gena
define(['api', 'global', 'text!/build/controls/swiper/swiper.html'], function (Api, Global, html) {
  var $method = {
    get_banners: function (callback) {
      var _this = this;
      var _stauts = Api.getData.getCode();
      Api.set({
        key: 'getBanners',
        type: 'GET',
        isToken: false
      }, {
        success: function (data, params) {
          if (data.code == _stauts.success) {
            _this.list = data.result;
            setTimeout(function () {
              _this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                autoplay: 5000,
                loop: true
              });
            }, 100);
          }
        }
      });
    }
  };
  return {
    template: html,
    data: function () {
      return {
        list: [],
        mySwiper: null
      };
    },
    methods: {
      get_banners: $method.get_banners
    },
    mounted: function () {
      var _this = this;
      this.get_banners();
      $('.swiper-pagination').on('click', 'span', function () {
        _this.mySwiper.slideTo($(this).index() * 1 + 1, 1000, false);
        _this.mySwiper.startAutoplay();
      });
    }
  };
});