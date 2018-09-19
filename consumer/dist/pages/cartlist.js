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

var Cartlist = function (_wepy$page) {
  _inherits(Cartlist, _wepy$page);

  function Cartlist() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cartlist);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cartlist.__proto__ || Object.getPrototypeOf(Cartlist)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '产品'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 2,
      URL: '',
      IMGURL: '',
      list: [],
      start: 1,
      limit: 10,
      topclass: 'sortClass sort_top',
      bottomclass: 'sortClass sort_bottom',
      priceSort: true,
      orderMethod: 0,
      orderType: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cartlist, [{
    key: 'onShow',
    value: function onShow() {
      wx.showShareMenu({
        withShareTicket: true
      });
      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.backData({
        start: 1,
        limit: this.start * this.limit
      });
    }
  }, {
    key: 'saveId',
    value: function saveId(e) {
      wx.setStorageSync('id', e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/goods-details'
      });
    }
  }, {
    key: 'getMore',
    value: function getMore() {
      var _this2 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'goods/ajax/list',
        method: 'POST',
        data: {
          orderType: this.orderType,
          orderMethod: this.orderMethod,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'storeId': this.$parent.globalData.storeId,
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (data.result.list.length === 0) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 3000
            });
          } else {
            for (var i = 0; i < data.result.list.length; i++) {
              _this2.list.push(data.result.list[i]);
            }
            _this2.$apply();
          }
        }
      });
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this3 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      wx.request({
        url: this.URL + 'goods/ajax/list',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId'),
          'storeId': this.$parent.globalData.storeId
        },
        success: function success(res) {
          var data = res.data;
          if (data.result.list !== null) {
            _this3.list = data.result.list;
            _this3.$apply();
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
    // 切换样式

  }, {
    key: 'togglelist',
    value: function togglelist() {
      wx.redirectTo({
        url: 'cart'
      });
    }
  }]);

  return Cartlist;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cartlist , 'pages/cartlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnRsaXN0LmpzIl0sIm5hbWVzIjpbIkNhcnRsaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYmJhciIsImRhdGEiLCJzZWxlY3RlZCIsIlVSTCIsIklNR1VSTCIsImxpc3QiLCJzdGFydCIsImxpbWl0IiwidG9wY2xhc3MiLCJib3R0b21jbGFzcyIsInByaWNlU29ydCIsIm9yZGVyTWV0aG9kIiwib3JkZXJUeXBlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJiYWNrRGF0YSIsImUiLCJzZXRTdG9yYWdlU3luYyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInN0b3JlSWQiLCJnZXRTdG9yYWdlU3luYyIsInN1Y2Nlc3MiLCJyZXMiLCJyZXN1bHQiLCJsZW5ndGgiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImkiLCJwdXNoIiwiJGFwcGx5IiwicmVkaXJlY3RUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFZO0FBQ1BDLGNBQVFDO0FBREQsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLFlBQU0sRUFKRDtBQUtMQyxhQUFPLENBTEY7QUFNTEMsYUFBTyxFQU5GO0FBT0xDLGdCQUFVLG9CQVBMO0FBUUxDLG1CQUFhLHVCQVJSO0FBU0xDLGlCQUFXLElBVE47QUFVTEMsbUJBQWEsQ0FWUjtBQVdMQyxpQkFBVztBQVhOLEs7Ozs7OzZCQWFHO0FBQ1JDLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHQztBQUNELFdBQUtaLEdBQUwsR0FBVyxLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLEdBQW5DO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLEtBQUtZLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmIsTUFBdEM7QUFDQSxXQUFLYyxRQUFMLENBQWM7QUFDWlosZUFBTyxDQURLO0FBRVpDLGVBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBRmIsT0FBZDtBQUlEOzs7MkJBQ09ZLEMsRUFBRztBQUNUTixTQUFHTyxjQUFILENBQWtCLElBQWxCLEVBQXdCRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsRUFBaEQ7QUFDQVYsU0FBR1csVUFBSCxDQUFjO0FBQ1pDLGFBQUs7QUFETyxPQUFkO0FBR0Q7Ozs4QkFDVTtBQUFBOztBQUNULFdBQUtuQixLQUFMLEdBQWEsS0FBS0EsS0FBTCxHQUFhLENBQTFCO0FBQ0FPLFNBQUdhLE9BQUgsQ0FBVztBQUNURCxhQUFLLEtBQUt0QixHQUFMLEdBQVcsaUJBRFA7QUFFVHdCLGdCQUFRLE1BRkM7QUFHVDFCLGNBQU07QUFDSlcscUJBQVcsS0FBS0EsU0FEWjtBQUVKRCx1QkFBYSxLQUFLQSxXQUZkO0FBR0pMLGlCQUFPLEtBQUtBLEtBSFI7QUFJSkMsaUJBQU8sS0FBS0E7QUFKUixTQUhHO0FBU1RxQixnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHFCQUFXLEtBQUtaLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlksT0FGN0I7QUFHTix1QkFBYWhCLEdBQUdpQixjQUFILENBQWtCLFdBQWxCO0FBSFAsU0FUQztBQWNUQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUkvQixPQUFPK0IsSUFBSS9CLElBQWY7QUFDQSxjQUFJQSxLQUFLZ0MsTUFBTCxDQUFZNUIsSUFBWixDQUFpQjZCLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQ2pDckIsZUFBR3NCLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxTQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0QsV0FORCxNQU1PO0FBQ0wsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdEMsS0FBS2dDLE1BQUwsQ0FBWTVCLElBQVosQ0FBaUI2QixNQUFyQyxFQUE2Q0ssR0FBN0MsRUFBa0Q7QUFDaEQscUJBQUtsQyxJQUFMLENBQVVtQyxJQUFWLENBQWV2QyxLQUFLZ0MsTUFBTCxDQUFZNUIsSUFBWixDQUFpQmtDLENBQWpCLENBQWY7QUFDRDtBQUNELG1CQUFLRSxNQUFMO0FBQ0Q7QUFDRjtBQTVCUSxPQUFYO0FBOEJEO0FBQ0Q7Ozs7K0JBQ29CO0FBQUE7O0FBQUEsVUFBWHhDLElBQVcsdUVBQUosRUFBSTs7QUFDbEJZLFNBQUdhLE9BQUgsQ0FBVztBQUNURCxhQUFLLEtBQUt0QixHQUFMLEdBQVcsaUJBRFA7QUFFVHdCLGdCQUFRLE1BRkM7QUFHVDFCLGtCQUhTO0FBSVQyQixnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHVCQUFhZixHQUFHaUIsY0FBSCxDQUFrQixXQUFsQixDQUZQO0FBR04scUJBQVcsS0FBS2QsT0FBTCxDQUFhQyxVQUFiLENBQXdCWTtBQUg3QixTQUpDO0FBU1RFLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSS9CLE9BQU8rQixJQUFJL0IsSUFBZjtBQUNBLGNBQUlBLEtBQUtnQyxNQUFMLENBQVk1QixJQUFaLEtBQXFCLElBQXpCLEVBQStCO0FBQzdCLG1CQUFLQSxJQUFMLEdBQVlKLEtBQUtnQyxNQUFMLENBQVk1QixJQUF4QjtBQUNBLG1CQUFLb0MsTUFBTDtBQUNEO0FBQ0Y7QUFmUSxPQUFYO0FBaUJEO0FBQ0Q7Ozs7Z0NBQ2E7QUFDWCxXQUFLL0IsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixLQUFLRCxTQUFMLEdBQWlCLENBQWpCLEdBQXFCLENBQXhDO0FBQ0EsV0FBS0UsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUksS0FBS0YsU0FBTCxLQUFtQixJQUF2QixFQUE2QjtBQUMzQixhQUFLRixRQUFMLEdBQWdCLCtCQUFoQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsdUJBQW5CO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBS0QsUUFBTCxHQUFnQixvQkFBaEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLHFDQUFuQjtBQUNEO0FBQ0QsV0FBS1MsUUFBTCxDQUFjO0FBQ1pOLG1CQUFXLEtBQUtBLFNBREo7QUFFWkQscUJBQWEsS0FBS0EsV0FGTjtBQUdaTCxlQUFPLENBSEs7QUFJWkMsZUFBTyxLQUFLRCxLQUFMLEdBQWEsS0FBS0M7QUFKYixPQUFkO0FBTUQ7QUFDRDs7Ozs4QkFDVztBQUNULFdBQUtDLFFBQUwsR0FBZ0Isb0JBQWhCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQix1QkFBbkI7QUFDQSxXQUFLRSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFdBQUtNLFFBQUwsQ0FBYztBQUNaTixtQkFBVyxLQUFLQSxTQURKO0FBRVpELHFCQUFhLEtBQUtBLFdBRk47QUFHWkwsZUFBTyxDQUhLO0FBSVpDLGVBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBSmIsT0FBZDtBQU1EO0FBQ0Q7Ozs7aUNBQ2M7QUFDWk0sU0FBRzZCLFVBQUgsQ0FBYztBQUNaakIsYUFBSztBQURPLE9BQWQ7QUFHRDs7OztFQW5JbUNrQixlQUFLQyxJOztrQkFBdEJwRCxRIiwiZmlsZSI6ImNhcnRsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0bGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqflk4EnXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cz0ge1xyXG4gICAgICB0YWJiYXI6IFRhYmJhclxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDIsXHJcbiAgICAgIFVSTDogJycsXHJcbiAgICAgIElNR1VSTDogJycsXHJcbiAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICBzdGFydDogMSxcclxuICAgICAgbGltaXQ6IDEwLFxyXG4gICAgICB0b3BjbGFzczogJ3NvcnRDbGFzcyBzb3J0X3RvcCcsXHJcbiAgICAgIGJvdHRvbWNsYXNzOiAnc29ydENsYXNzIHNvcnRfYm90dG9tJyxcclxuICAgICAgcHJpY2VTb3J0OiB0cnVlLFxyXG4gICAgICBvcmRlck1ldGhvZDogMCxcclxuICAgICAgb3JkZXJUeXBlOiAwXHJcbiAgICB9XHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcclxuICAgICAgfSlcclxuICAgICAgIC8vIOiOt+WPluWFqOWxgOeahHVybFxyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICB0aGlzLklNR1VSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTFxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHNhdmVJZCAoZSkge1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2dvb2RzLWRldGFpbHMnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRNb3JlICgpIHtcclxuICAgICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnZ29vZHMvYWpheC9saXN0JyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlLFxyXG4gICAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJNZXRob2QsXHJcbiAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3N0b3JlSWQnOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zdG9yZUlkLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmsqHmnInmm7TlpJrmlbDmja7kuoYnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdC5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZGF0YS5yZXN1bHQubGlzdFtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Zue5pi+5pWw5o2uXHJcbiAgICBiYWNrRGF0YShkYXRhID0ge30pIHtcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdnb29kcy9hamF4L2xpc3QnLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJyksXHJcbiAgICAgICAgICAnc3RvcmVJZCc6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnN0b3JlSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdC5saXN0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOS7t+agvOaOkuW6j1xyXG4gICAgc3JvdHByaWNlICgpIHtcclxuICAgICAgdGhpcy5wcmljZVNvcnQgPSAhdGhpcy5wcmljZVNvcnRcclxuICAgICAgdGhpcy5vcmRlck1ldGhvZCA9IHRoaXMucHJpY2VTb3J0ID8gMSA6IDBcclxuICAgICAgdGhpcy5vcmRlclR5cGUgPSAxXHJcbiAgICAgIGlmICh0aGlzLnByaWNlU29ydCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudG9wY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfdG9wIHRvcC1hY3RpdmUnXHJcbiAgICAgICAgdGhpcy5ib3R0b21jbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF9ib3R0b20nXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50b3BjbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF90b3AnXHJcbiAgICAgICAgdGhpcy5ib3R0b21jbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF9ib3R0b20gYm90dG9tLWFjdGl2ZSdcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlLFxyXG4gICAgICAgIG9yZGVyTWV0aG9kOiB0aGlzLm9yZGVyTWV0aG9kLFxyXG4gICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLnN0YXJ0ICogdGhpcy5saW1pdFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g57u85ZCI5o6S5bqPXHJcbiAgICBzcm90YWxsICgpIHtcclxuICAgICAgdGhpcy50b3BjbGFzcyA9ICdzb3J0Q2xhc3Mgc29ydF90b3AnXHJcbiAgICAgIHRoaXMuYm90dG9tY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfYm90dG9tJ1xyXG4gICAgICB0aGlzLm9yZGVyTWV0aG9kID0gMFxyXG4gICAgICB0aGlzLm9yZGVyVHlwZSA9IDBcclxuICAgICAgdGhpcy5iYWNrRGF0YSh7XHJcbiAgICAgICAgb3JkZXJUeXBlOiB0aGlzLm9yZGVyVHlwZSxcclxuICAgICAgICBvcmRlck1ldGhvZDogdGhpcy5vcmRlck1ldGhvZCxcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOWIh+aNouagt+W8j1xyXG4gICAgdG9nZ2xlbGlzdCAoKSB7XHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogJ2NhcnQnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=