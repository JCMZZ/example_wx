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

  _createClass(Cart, [{
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
            if (data.result.list.length < 2) {
              wx.redirectTo({
                url: 'goods-details'
              });
            } else {
              _this3.list = data.result.list;
              _this3.$apply();
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
    // 切换样式

  }, {
    key: 'togglelist',
    value: function togglelist() {
      wx.redirectTo({
        url: 'cartlist'
      });
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJVUkwiLCJJTUdVUkwiLCJsaXN0Iiwic3RhcnQiLCJsaW1pdCIsInRvcGNsYXNzIiwiYm90dG9tY2xhc3MiLCJwcmljZVNvcnQiLCJvcmRlck1ldGhvZCIsIm9yZGVyVHlwZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYmFja0RhdGEiLCJlIiwic2V0U3RvcmFnZVN5bmMiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInN0b3JlSWQiLCJnZXRTdG9yYWdlU3luYyIsInN1Y2Nlc3MiLCJyZXMiLCJyZXN1bHQiLCJsZW5ndGgiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImkiLCJwdXNoIiwiJGFwcGx5IiwicmVkaXJlY3RUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFZO0FBQ1BDLGNBQVFDO0FBREQsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLFlBQU0sRUFKRDtBQUtMQyxhQUFPLENBTEY7QUFNTEMs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ZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqflk4EnXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cz0ge1xyXG4gICAgICB0YWJiYXI6IFRhYmJhclxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDIsXHJcbiAgICAgIFVSTDogJycsXHJcbiAgICAgIElNR1VSTDogJycsXHJcbiAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICBzdGFydDogMSxcclxuICAgICAgbGltaXQ6IDEwLFxyXG4gICAgICB0b3BjbGFzczogJ3NvcnRDbGFzcyBzb3J0X3RvcCcsXHJcbiAgICAgIGJvdHRvbWNsYXNzOiAnc29ydENsYXNzIHNvcnRfYm90dG9tJyxcclxuICAgICAgcHJpY2VTb3J0OiB0cnVlLFxyXG4gICAgICBvcmRlck1ldGhvZDogMCxcclxuICAgICAgb3JkZXJUeXBlOiAwXHJcbiAgICB9XHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcclxuICAgICAgfSlcclxuICAgICAgIC8vIOiOt+WPluWFqOWxgOeahHVybFxyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICB0aGlzLklNR1VSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTFxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHNhdmVJZCAoZSkge1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcclxuICAgIH1cclxuICAgIGdldE1vcmUgKCkge1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5zdGFydCArIDFcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdnb29kcy9hamF4L2xpc3QnLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIG9yZGVyVHlwZTogdGhpcy5vcmRlclR5cGUsXHJcbiAgICAgICAgICBvcmRlck1ldGhvZDogdGhpcy5vcmRlck1ldGhvZCxcclxuICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc3RvcmVJZCc6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnN0b3JlSWQsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+ayoeacieabtOWkmuaVsOaNruS6hicsXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhLnJlc3VsdC5saXN0W2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlm57mmL7mlbDmja5cclxuICAgIGJhY2tEYXRhKGRhdGEgPSB7fSkge1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ2dvb2RzL2FqYXgvbGlzdCcsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKSxcclxuICAgICAgICAgICdzdG9yZUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnZ29vZHMtZGV0YWlscydcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDku7fmoLzmjpLluo9cclxuICAgIHNyb3RwcmljZSAoKSB7XHJcbiAgICAgIHRoaXMucHJpY2VTb3J0ID0gIXRoaXMucHJpY2VTb3J0XHJcbiAgICAgIHRoaXMub3JkZXJNZXRob2QgPSB0aGlzLnByaWNlU29ydCA/IDEgOiAwXHJcbiAgICAgIHRoaXMub3JkZXJUeXBlID0gMVxyXG4gICAgICBpZiAodGhpcy5wcmljZVNvcnQgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnRvcGNsYXNzID0gJ3NvcnRDbGFzcyBzb3J0X3RvcCB0b3AtYWN0aXZlJ1xyXG4gICAgICAgIHRoaXMuYm90dG9tY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfYm90dG9tJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudG9wY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfdG9wJ1xyXG4gICAgICAgIHRoaXMuYm90dG9tY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfYm90dG9tIGJvdHRvbS1hY3RpdmUnXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYWNrRGF0YSh7XHJcbiAgICAgICAgb3JkZXJUeXBlOiB0aGlzLm9yZGVyVHlwZSxcclxuICAgICAgICBvcmRlck1ldGhvZDogdGhpcy5vcmRlck1ldGhvZCxcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOe7vOWQiOaOkuW6j1xyXG4gICAgc3JvdGFsbCAoKSB7XHJcbiAgICAgIHRoaXMudG9wY2xhc3MgPSAnc29ydENsYXNzIHNvcnRfdG9wJ1xyXG4gICAgICB0aGlzLmJvdHRvbWNsYXNzID0gJ3NvcnRDbGFzcyBzb3J0X2JvdHRvbSdcclxuICAgICAgdGhpcy5vcmRlck1ldGhvZCA9IDBcclxuICAgICAgdGhpcy5vcmRlclR5cGUgPSAwXHJcbiAgICAgIHRoaXMuYmFja0RhdGEoe1xyXG4gICAgICAgIG9yZGVyVHlwZTogdGhpcy5vcmRlclR5cGUsXHJcbiAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJNZXRob2QsXHJcbiAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDliIfmjaLmoLflvI9cclxuICAgIHRvZ2dsZWxpc3QgKCkge1xyXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6ICdjYXJ0bGlzdCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==