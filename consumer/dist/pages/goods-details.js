'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodsDetails = function (_wepy$page) {
  _inherits(GoodsDetails, _wepy$page);

  function GoodsDetails() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GoodsDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsDetails.__proto__ || Object.getPrototypeOf(GoodsDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '产品详情'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 2,
      src: [],
      name: '',
      description: '',
      oldPrice: '',
      discount: '',
      newPrice: '',
      IMGURL: '',
      URL: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GoodsDetails, [{
    key: 'openToast',
    value: function openToast() {
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 3000
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      // 回显数据
      wx.request({
        url: this.URL + 'goods/ajax/info',
        method: 'POST',
        data: {
          goodsId: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'storeId': this.$parent.globalData.storeId,
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          _this2.name = data.result.name || '';
          _this2.description = data.result.goodsDescribe || '';
          _this2.oldPrice = data.result.price || '';
          _this2.newPrice = data.result.discountPrice || '';
          _this2.discount = data.result.discount || '';
          _this2.src = data.result.imgList || [];
          _this2.$apply();
        }
      });
    }
  }]);

  return GoodsDetails;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(GoodsDetails , 'pages/goods-details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLWRldGFpbHMuanMiXSwibmFtZXMiOlsiR29vZHNEZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYkJhciIsImRhdGEiLCJzZWxlY3RlZCIsInNyYyIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsIm9sZFByaWNlIiwiZGlzY291bnQiLCJuZXdQcmljZSIsIklNR1VSTCIsIlVSTCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJnb29kc0lkIiwiZ2V0U3RvcmFnZVN5bmMiLCJoZWFkZXIiLCJzdG9yZUlkIiwic3VjY2VzcyIsInJlcyIsInJlc3VsdCIsImdvb2RzRGVzY3JpYmUiLCJwcmljZSIsImRpc2NvdW50UHJpY2UiLCJpbWdMaXN0IiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQVk7QUFDVEMsY0FBUUM7QUFEQyxLLFFBR1hDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLFdBQUssRUFGQTtBQUdMQyxZQUFNLEVBSEQ7QUFJTEMsbUJBQWEsRUFKUjtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxjQUFRLEVBUkg7QUFTTEMsV0FBSztBQVRBLEs7Ozs7O2dDQVdNO0FBQ1hDLFNBQUdDLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLEtBREk7QUFFWEMsY0FBTSxTQUZLO0FBR1hDLGtCQUFVO0FBSEMsT0FBYjtBQUtEOzs7NkJBQ1M7QUFBQTs7QUFDUjtBQUNBLFdBQUtMLEdBQUwsR0FBVyxLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JQLEdBQW5DO0FBQ0EsV0FBS0QsTUFBTCxHQUFjLEtBQUtPLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsTUFBdEM7QUFDQTtBQUNBRSxTQUFHTyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLVCxHQUFMLEdBQVcsaUJBRFA7QUFFVFUsZ0JBQVEsTUFGQztBQUdUbkIsY0FBTTtBQUNKb0IsbUJBQVNWLEdBQUdXLGNBQUgsQ0FBa0IsSUFBbEI7QUFETCxTQUhHO0FBTVRDLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4scUJBQVcsS0FBS1AsT0FBTCxDQUFhQyxVQUFiLENBQXdCTyxPQUY3QjtBQUdOLHVCQUFhYixHQUFHVyxjQUFILENBQWtCLFdBQWxCO0FBSFAsU0FOQztBQVdURyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUl6QixPQUFPeUIsSUFBSXpCLElBQWY7QUFDQSxpQkFBS0csSUFBTCxHQUFZSCxLQUFLMEIsTUFBTCxDQUFZdkIsSUFBWixJQUFvQixFQUFoQztBQUNBLGlCQUFLQyxXQUFMLEdBQW1CSixLQUFLMEIsTUFBTCxDQUFZQyxhQUFaLElBQTZCLEVBQWhEO0FBQ0EsaUJBQUt0QixRQUFMLEdBQWdCTCxLQUFLMEIsTUFBTCxDQUFZRSxLQUFaLElBQXFCLEVBQXJDO0FBQ0EsaUJBQUtyQixRQUFMLEdBQWdCUCxLQUFLMEIsTUFBTCxDQUFZRyxhQUFaLElBQTZCLEVBQTdDO0FBQ0EsaUJBQUt2QixRQUFMLEdBQWdCTixLQUFLMEIsTUFBTCxDQUFZcEIsUUFBWixJQUF3QixFQUF4QztBQUNBLGlCQUFLSixHQUFMLEdBQVdGLEtBQUswQixNQUFMLENBQVlJLE9BQVosSUFBdUIsRUFBbEM7QUFDQSxpQkFBS0MsTUFBTDtBQUNEO0FBcEJRLE9BQVg7QUFzQkQ7Ozs7RUF2RHVDQyxlQUFLQyxJOztrQkFBMUIxQyxZIiwiZmlsZSI6Imdvb2RzLWRldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRhYkJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzRGV0YWlscyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S6p+WTgeivpuaDhSdcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHM9IHtcclxuICAgIHRhYmJhcjogVGFiQmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMixcclxuICAgIHNyYzogW10sXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgIG9sZFByaWNlOiAnJyxcclxuICAgIGRpc2NvdW50OiAnJyxcclxuICAgIG5ld1ByaWNlOiAnJyxcclxuICAgIElNR1VSTDogJycsXHJcbiAgICBVUkw6ICcnXHJcbiAgfVxyXG4gIG9wZW5Ub2FzdCAoKSB7XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZTogJ+W3suaUtuiXjycsXHJcbiAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgZHVyYXRpb246IDMwMDBcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdyAoKSB7XHJcbiAgICAvLyDojrflj5blhajlsYDnmoR1cmxcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB0aGlzLklNR1VSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTFxyXG4gICAgLy8g5Zue5pi+5pWw5o2uXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdnb29kcy9hamF4L2luZm8nLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGdvb2RzSWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzdG9yZUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZCxcclxuICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5yZXN1bHQubmFtZSB8fCAnJ1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLnJlc3VsdC5nb29kc0Rlc2NyaWJlIHx8ICcnXHJcbiAgICAgICAgdGhpcy5vbGRQcmljZSA9IGRhdGEucmVzdWx0LnByaWNlIHx8ICcnXHJcbiAgICAgICAgdGhpcy5uZXdQcmljZSA9IGRhdGEucmVzdWx0LmRpc2NvdW50UHJpY2UgfHwgJydcclxuICAgICAgICB0aGlzLmRpc2NvdW50ID0gZGF0YS5yZXN1bHQuZGlzY291bnQgfHwgJydcclxuICAgICAgICB0aGlzLnNyYyA9IGRhdGEucmVzdWx0LmltZ0xpc3QgfHwgW11cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==