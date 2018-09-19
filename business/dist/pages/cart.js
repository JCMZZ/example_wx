'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_wepy$page) {
  _inherits(Cart, _wepy$page);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '产品'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 2,
      list: [],
      more: false,
      start: 1,
      limit: 10,
      IMGURL: '',
      IMGURLEDIT: '',
      priceSort: true,
      orderMethod: 0,
      orderType: 0,
      sessionId: '',
      topclass: 'sortClass sort_top',
      bottomclass: 'sortClass sort_bottom'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cart, [{
    key: 'onLoad',
    value: function onLoad() {
      wx.showShareMenu({
        withShareTicket: true
      });
      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 回显数据
      this.sessionId = wx.getStorageSync('sessionId');
      // this.orderMethod = 0
      // this.orderType = 0
      this.backData({
        orderType: this.orderType,
        orderMethod: this.orderMethod,
        start: 1,
        limit: this.start * this.limit
      });
    }
    // 存储商品id

  }, {
    key: 'getGoodsid',
    value: function getGoodsid(e) {
      wx.setStorageSync('goodsId', e.currentTarget.dataset.id);
    }
    // 查看更多

  }, {
    key: 'getMore',
    value: function getMore() {
      var _this2 = this;

      this.start = this.start + 1;
      wx.setStorageSync('start', this.start);
      wx.request({
        url: this.URL + 'goods/findGoods',
        method: 'POST',
        data: {
          orderType: this.orderType,
          orderMethod: this.orderMethod,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length <= 0) {
              _common2.default.tipAlert('没有更多数据了');
            } else {
              for (var i = 0; i < data.result.list.length; i++) {
                _this2.list.push(data.result.list[i]);
              }
              _this2.$apply();
            }
          }
        }
      });
    }
    // 数据回显

  }, {
    key: 'backData',
    value: function backData() {
      var _this3 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      wx.request({
        url: this.URL + 'goods/findGoods',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              if (data.result.list !== null) {
                if (data.result.list.length === 1) {
                  wx.navigateTo({
                    url: 'goods-details'
                  });
                  _this3.list = data.result.list;
                  _this3.$apply();
                } else {
                  _this3.list = data.result.list;
                  if (_this3.list.length > 9) {
                    _this3.more = true;
                  }
                  _this3.$apply();
                }
              }
            }
          }
        }
      });
    }
    // 价格排序

  }, {
    key: 'srotprice',
    value: function srotprice() {
      this.priceSort = !this.priceSort;
      this.orderMethod = this.priceSort ? 1 : 0;
      this.orderType = 1;
      if (this.priceSort === true) {
        this.topclass = 'sortClass sort_top top-active';
        this.bottomclass = 'sortClass sort_bottom';
      } else {
        this.topclass = 'sortClass sort_top';
        this.bottomclass = 'sortClass sort_bottom bottom-active';
      }
      this.backData({
        orderType: this.orderType,
        orderMethod: this.orderMethod,
        start: 1,
        limit: this.start * this.limit
      });
    }
    // 综合排序

  }, {
    key: 'srotall',
    value: function srotall() {
      this.topclass = 'sortClass sort_top';
      this.bottomclass = 'sortClass sort_bottom';
      this.orderMethod = 0;
      this.orderType = 0;
      this.backData({
        orderType: this.orderType,
        orderMethod: this.orderMethod,
        start: 1,
        limit: this.start * this.limit
      });
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJsaXN0IiwibW9yZSIsInN0YXJ0IiwibGltaXQiLCJJTUdVUkwiLCJJTUdVUkxFRElUIiwicHJpY2VTb3J0Iiwib3JkZXJNZXRob2QiLCJvcmRlclR5cGUiLCJzZXNzaW9uSWQiLCJ0b3BjbGFzcyIsImJvdHRvbWNsYXNzIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwiVVJMIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRTdG9yYWdlU3luYyIsImJhY2tEYXRhIiwiZSIsInNldFN0b3JhZ2VTeW5jIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29tbW9uIiwiSW50ZXJjZXB0b3IiLCJyZXN1bHQiLCJsZW5ndGgiLCJ0aXBBbGVydCIsImkiLCJwdXNoIiwiJGFwcGx5IiwibWVzc2FnZSIsIm5hdmlnYXRlVG8iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFZO0FBQ1BDLGNBQVFDO0FBREQsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsWUFBTSxLQUhEO0FB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LHFDQUFuQjtBQUNEO0FBQ0QsV0FBS1EsUUFBTCxDQUFjO0FBQ1pYLG1CQUFXLEtBQUtBLFNBREo7QUFFWkQscUJBQWEsS0FBS0EsV0FGTjtBQUdaTCxlQUFPLENBSEs7QUFJWkMsZUFBTyxLQUFLRCxLQUFMLEdBQWEsS0FBS0M7QUFKYixPQUFkO0FBTUQ7QUFDRDs7Ozs4QkFDVztBQUNULFdBQUtPLFFBQUwsR0FBZ0Isb0JBQWhCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQix1QkFBbkI7QUFDQSxXQUFLSixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFdBQUtXLFFBQUwsQ0FBYztBQUNaWCxtQkFBVyxLQUFLQSxTQURKO0FBRVpELHFCQUFhLEtBQUtBLFdBRk47QUFHWkwsZUFBTyxDQUhLO0FBSVpDLGVBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBSmIsT0FBZDtBQU1EOzs7O0VBbkorQnNDLGVBQUtDLEk7O2tCQUFsQnJELEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbiAgaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqflk4EnXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cz0ge1xyXG4gICAgICB0YWJiYXI6IFRhYmJhclxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDIsXHJcbiAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICBtb3JlOiBmYWxzZSxcclxuICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgIGxpbWl0OiAxMCxcclxuICAgICAgSU1HVVJMOiAnJyxcclxuICAgICAgSU1HVVJMRURJVDogJycsXHJcbiAgICAgIHByaWNlU29ydDogdHJ1ZSxcclxuICAgICAgb3JkZXJNZXRob2Q6IDAsXHJcbiAgICAgIG9yZGVyVHlwZTogMCxcclxuICAgICAgc2Vzc2lvbklkOiAnJyxcclxuICAgICAgdG9wY2xhc3M6ICdzb3J0Q2xhc3Mgc29ydF90b3AnLFxyXG4gICAgICBib3R0b21jbGFzczogJ3NvcnRDbGFzcyBzb3J0X2JvdHRvbSdcclxuICAgIH1cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xyXG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgICAvLyDojrflj5blhajlsYDnmoR1cmxcclxuICAgICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgICAgdGhpcy5JTUdVUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxcclxuICAgICAgdGhpcy5JTUdVUkxFRElUID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMRURJVFxyXG4gICAgICAvLyDlm57mmL7mlbDmja5cclxuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgLy8gdGhpcy5vcmRlck1ldGhvZCA9IDBcclxuICAgICAgLy8gdGhpcy5vcmRlclR5cGUgPSAwXHJcbiAgICAgIHRoaXMuYmFja0RhdGEoe1xyXG4gICAgICAgIG9yZGVyVHlwZTogdGhpcy5vcmRlclR5cGUsXHJcbiAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJNZXRob2QsXHJcbiAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlrZjlgqjllYblk4FpZFxyXG4gICAgZ2V0R29vZHNpZCAoZSkge1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnZ29vZHNJZCcsIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxyXG4gICAgfVxyXG4gICAgLy8g5p+l55yL5pu05aSaXHJcbiAgICBnZXRNb3JlICgpIHtcclxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdGFydCcsIHRoaXMuc3RhcnQpXHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnZ29vZHMvZmluZEdvb2RzJyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlLFxyXG4gICAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJNZXRob2QsXHJcbiAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5rKh5pyJ5pu05aSa5pWw5o2u5LqGJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGRhdGEucmVzdWx0Lmxpc3RbaV0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOaVsOaNruWbnuaYvlxyXG4gICAgYmFja0RhdGEoZGF0YSA9IHt9KSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnZ29vZHMvZmluZEdvb2RzJyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2dvb2RzLWRldGFpbHMnXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gZGF0YS5yZXN1bHQubGlzdFxyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA+IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOS7t+agvOaOkuW6j1xyXG4gICAgc3JvdHByaWNlICgpIHtcclxuICAgICAgdGhpcy5wcmljZVNvcnQgPSAhdGhpcy5wcmljZVNvcnRcclxuICAgICAgdGhpcy5vcmRlck1ldGhvZCA9IHRoaXMucHJpY2VTb3J0ID8gMSA6IDBcclxuICAgICAgdGhpcy5vcmRlclR5cGUgPSAxXHJcbiAgICAgIGlmICh0aGlzLnByaWNlU29ydCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudG9wY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfdG9wIHRvcC1hY3RpdmUnXHJcbiAgICAgICAgdGhpcy5ib3R0b21jbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF9ib3R0b20nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50b3BjbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF90b3AnXHJcbiAgICAgICAgdGhpcy5ib3R0b21jbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF9ib3R0b20gYm90dG9tLWFjdGl2ZSdcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlLFxyXG4gICAgICAgIG9yZGVyTWV0aG9kOiB0aGlzLm9yZGVyTWV0aG9kLFxyXG4gICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLnN0YXJ0ICogdGhpcy5saW1pdFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g57u85ZCI5o6S5bqPXHJcbiAgICBzcm90YWxsICgpIHtcclxuICAgICAgdGhpcy50b3BjbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF90b3AnXHJcbiAgICAgIHRoaXMuYm90dG9tY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfYm90dG9tJ1xyXG4gICAgICB0aGlzLm9yZGVyTWV0aG9kID0gMFxyXG4gICAgICB0aGlzLm9yZGVyVHlwZSA9IDBcclxuICAgICAgdGhpcy5iYWNrRGF0YSh7XHJcbiAgICAgICAgb3JkZXJUeXBlOiB0aGlzLm9yZGVyVHlwZSxcclxuICAgICAgICBvcmRlck1ldGhvZDogdGhpcy5vcmRlck1ldGhvZCxcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==