'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Newrcmd = function (_wepy$page) {
  _inherits(Newrcmd, _wepy$page);

  function Newrcmd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Newrcmd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Newrcmd.__proto__ || Object.getPrototypeOf(Newrcmd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '智能营销'
    }, _this.data = {
      selected: 3,
      tabs: ['待推荐', '待支付', '已付费'],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      onelist: [],
      twolist: [],
      threelist: [],
      sessionId: '',
      URL: '',
      IMGURLEDIT: '',
      serviceId: '',
      start: 1,
      limit: 10,
      serviceState: [0, 1, 2],
      index: 0
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置


  _createClass(Newrcmd, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      var sliderWidth = 75;
      wx.getSystemInfo({
        success: function success(res) {
          that.sliderLeft = (res.windowWidth / that.data.tabs.length - sliderWidth) / 2;
          that.sliderOffset = res.windowWidth / that.data.tabs.length * that.data.activeIndex;
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 获取缓存数据
      this.sessionId = wx.getStorageSync('sessionId');
      // 数据显示
      wx.request({
        url: this.URL + 'service/selectService',
        data: {
          serviceType: 1,
          serviceState: this.serviceState[this.index],
          start: 1,
          limit: this.start * this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            _this2.onelist = data.result.list;
            _this2.$apply();
          }
        }
      });
    }
  }, {
    key: 'tabClick',
    value: function tabClick(e) {
      var _this3 = this;

      this.sliderOffset = e.currentTarget.offsetLeft;
      this.activeIndex = e.currentTarget.id;
      // 待推荐
      if (this.activeIndex === '0') {
        this.index = 0;
        wx.request({
          url: this.URL + 'service/selectService',
          data: {
            serviceType: 1,
            serviceState: 0,
            start: 1,
            limit: this.start * this.limit
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'sessionId': this.sessionId
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              _this3.onelist = data.result.list;
              _this3.$apply();
            }
          }
        });
      }
      // 待支付
      if (this.activeIndex === '1') {
        this.index = 1;
        wx.request({
          url: this.URL + 'service/selectService',
          data: {
            serviceType: 1,
            serviceState: 1,
            start: 1,
            limit: this.start * this.limit
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'sessionId': this.sessionId
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              _this3.twolist = data.result.list;
              _this3.$apply();
              // 存储serviceId
              _this3.serviceId = data.result.list.id;
              wx.setStorageSync('serviceId', _this3.serviceId);
            }
          }
        });
      }
      // 已付费
      if (this.activeIndex === '2') {
        this.index = 2;
        wx.request({
          url: this.URL + 'service/selectService',
          data: {
            serviceType: 1,
            serviceState: 2,
            start: 1,
            limit: this.start * this.limit
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'sessionId': this.sessionId
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              _this3.threelist = data.result.list;
              _this3.$apply();
              // 存储serviceId
              _this3.serviceId = data.result.list.id;
              wx.setStorageSync('serviceId', _this3.serviceId);
            }
          }
        });
      }
    }
  }, {
    key: 'sendmsg',
    value: function sendmsg(e) {
      var id = e.currentTarget.dataset.id;
      // 存储serviceId
      this.serviceId = id;
      wx.setStorageSync('serviceId', this.serviceId);
    }
    // 待推荐获取更多

  }, {
    key: 'onegetMore',
    value: function onegetMore() {
      var _this4 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'service/selectService',
        data: {
          serviceType: 1,
          serviceState: 0,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length !== 0) {
              for (var i = 0; i < data.result.list.length; i++) {
                _this4.onelist.push(data.result.list[i]);
              }
              _this4.$apply();
            } else {
              wx.showModal({
                content: '没有更多数据了',
                showCancel: false,
                success: function success(res) {}
              });
            }
          }
        }
      });
    }
    // 待支付获取更多

  }, {
    key: 'twogetMore',
    value: function twogetMore() {
      var _this5 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'service/selectService',
        data: {
          serviceType: 1,
          serviceState: 1,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length !== 0) {
              for (var i = 0; i < data.result.list.length; i++) {
                _this5.twolist.push(data.result.list[i]);
                _this5.$apply();
              }
            } else {
              wx.showModal({
                content: '没有更多数据了',
                showCancel: false,
                success: function success(res) {}
              });
            }
          }
        }
      });
    }
    // 已付费获取更多

  }, {
    key: 'threegetMore',
    value: function threegetMore() {
      var _this6 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'service/selectService',
        data: {
          serviceType: 1,
          serviceState: 2,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length !== 0) {
              for (var i = 0; i < data.result.list.length; i++) {
                _this6.threelist.push(data.result.list[i]);
              }
              _this6.$apply();
            } else {
              wx.showModal({
                content: '没有更多数据了',
                showCancel: false,
                success: function success(res) {}
              });
            }
          }
        }
      });
    }
  }]);

  return Newrcmd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Newrcmd , 'pages/newrcmd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3JjbWQuanMiXSwibmFtZXMiOlsiTmV3cmNtZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2VsZWN0ZWQiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0Iiwib25lbGlzdCIsInR3b2xpc3QiLCJ0aHJlZWxpc3QiLCJzZXNzaW9uSWQiLCJVUkwiLCJJTUdVUkxFRElUIiwic2VydmljZUlkIiwic3RhcnQiLCJsaW1pdCIsInNlcnZpY2VTdGF0ZSIsImluZGV4IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwidGhhdCIsInNsaWRlcldpZHRoIiwid3giLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwibGVuZ3RoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJ1cmwiLCJzZXJ2aWNlVHlwZSIsImhlYWRlciIsIm1ldGhvZCIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwicmVzdWx0IiwibGlzdCIsIiRhcHBseSIsImUiLCJjdXJyZW50VGFyZ2V0Iiwib2Zmc2V0TGVmdCIsImlkIiwic2V0U3RvcmFnZVN5bmMiLCJkYXRhc2V0IiwiaSIsInB1c2giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxZQUFNLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLENBRkQ7QUFHTEMsbUJBQWEsQ0FIUjtBQUlMQyxvQkFBYyxDQUpUO0FBS0xDLGtCQUFZLENBTFA7QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGVBQVMsRUFQSjtBQVFMQyxpQkFBVyxFQVJOO0FBU0xDLGlCQUFXLEVBVE47QUFVTEMsV0FBSyxFQVZBO0FBV0xDLGtCQUFZLEVBWFA7QUFZTEMsaUJBQVcsRUFaTjtBQWFMQyxhQUFPLENBYkY7QUFjTEMsYUFBTyxFQWRGO0FBZUxDLG9CQUFjLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBZlQ7QUFnQkxDLGFBQU87QUFoQkYsSyxRQWtCUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGNBQVFDO0FBREUsSzs7QUF6Qlo7Ozs7OzZCQTRCVTtBQUNSLFVBQUlDLE9BQU8sSUFBWDtBQUNBLFVBQUlDLGNBQWMsRUFBbEI7QUFDQUMsU0FBR0MsYUFBSCxDQUFpQjtBQUNmQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCTCxlQUFLbEIsVUFBTCxHQUFrQixDQUFDdUIsSUFBSUMsV0FBSixHQUFrQk4sS0FBS3ZCLElBQUwsQ0FBVUUsSUFBVixDQUFlNEIsTUFBakMsR0FBMENOLFdBQTNDLElBQTBELENBQTVFO0FBQ0FELGVBQUtuQixZQUFMLEdBQW9Cd0IsSUFBSUMsV0FBSixHQUFrQk4sS0FBS3ZCLElBQUwsQ0FBVUUsSUFBVixDQUFlNEIsTUFBakMsR0FBMENQLEtBQUt2QixJQUFMLENBQVVHLFdBQXhFO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLTyxHQUFMLEdBQVcsS0FBS3FCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnRCLEdBQW5DO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixLQUFLb0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCckIsVUFBMUM7QUFDQTtBQUNBLFdBQUtGLFNBQUwsR0FBaUJnQixHQUFHUSxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0E7QUFDQVIsU0FBR1MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS3pCLEdBQUwsR0FBVyx1QkFEUDtBQUVUVixjQUFNO0FBQ0pvQyx1QkFBYSxDQURUO0FBRUpyQix3QkFBYyxLQUFLQSxZQUFMLENBQWtCLEtBQUtDLEtBQXZCLENBRlY7QUFHSkgsaUJBQU8sQ0FISDtBQUlKQyxpQkFBTyxLQUFLRCxLQUFMLEdBQWEsS0FBS0M7QUFKckIsU0FGRztBQVFUdUIsZ0JBQVE7QUFDTiwwQkFBZ0IsaURBRFY7QUFFTix1QkFBYSxLQUFLNUI7QUFGWixTQVJDO0FBWVQ2QixnQkFBUSxNQVpDO0FBYVRYLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSTVCLE9BQU80QixJQUFJNUIsSUFBZjtBQUNBLGNBQUl1QyxpQkFBT0MsV0FBUCxDQUFtQnhDLElBQW5CLENBQUosRUFBOEI7QUFDNUIsbUJBQUtNLE9BQUwsR0FBZU4sS0FBS3lDLE1BQUwsQ0FBWUMsSUFBM0I7QUFDQSxtQkFBS0MsTUFBTDtBQUNEO0FBQ0Y7QUFuQlEsT0FBWDtBQXFCRDs7OzZCQUNTQyxDLEVBQUc7QUFBQTs7QUFDWCxXQUFLeEMsWUFBTCxHQUFvQndDLEVBQUVDLGFBQUYsQ0FBZ0JDLFVBQXBDO0FBQ0EsV0FBSzNDLFdBQUwsR0FBbUJ5QyxFQUFFQyxhQUFGLENBQWdCRSxFQUFuQztBQUNBO0FBQ0EsVUFBSSxLQUFLNUMsV0FBTCxLQUFxQixHQUF6QixFQUE4QjtBQUM1QixhQUFLYSxLQUFMLEdBQWEsQ0FBYjtBQUNBUyxXQUFHUyxPQUFILENBQVc7QUFDVEMsZUFBSyxLQUFLekIsR0FBTCxHQUFXLHVCQURQO0FBRVRWLGdCQUFNO0FBQ0pvQyx5QkFBYSxDQURUO0FBRUpyQiwwQkFBYyxDQUZWO0FBR0pGLG1CQUFPLENBSEg7QUFJSkMsbUJBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBSnJCLFdBRkc7QUFRVHVCLGtCQUFRO0FBQ04sNEJBQWdCLGlEQURWO0FBRU4seUJBQWEsS0FBSzVCO0FBRlosV0FSQztBQVlUNkIsa0JBQVEsTUFaQztBQWFUWCxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGdCQUFJNUIsT0FBTzRCLElBQUk1QixJQUFmO0FBQ0EsZ0JBQUl1QyxpQkFBT0MsV0FBUCxDQUFtQnhDLElBQW5CLENBQUosRUFBOEI7QUFDNUIscUJBQUtNLE9BQUwsR0FBZU4sS0FBS3lDLE1BQUwsQ0FBWUMsSUFBM0I7QUFDQSxxQkFBS0MsTUFBTDtBQUNEO0FBQ0Y7QUFuQlEsU0FBWDtBQXFCRDtBQUNEO0FBQ0EsVUFBSSxLQUFLeEMsV0FBTCxLQUFxQixHQUF6QixFQUE4QjtBQUM1QixhQUFLYSxLQUFMLEdBQWEsQ0FBYjtBQUNBUyxXQUFHUyxPQUFILENBQVc7QUFDVEMsZUFBSyxLQUFLekIsR0FBTCxHQUFXLHVCQURQO0FBRVRWLGdCQUFNO0FBQ0pvQyx5QkFBYSxDQURUO0FBRUpyQiwwQkFBYyxDQUZWO0FBR0pGLG1CQUFPLENBSEg7QUFJSkMsbUJBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBSnJCLFdBRkc7QUFRVHVCLGtCQUFRO0FBQ04sNEJBQWdCLGlEQURWO0FBRU4seUJBQWEsS0FBSzVCO0FBRlosV0FSQztBQVlUNkIsa0JBQVEsTUFaQztBQWFUWCxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGdCQUFJNUIsT0FBTzRCLElBQUk1QixJQUFmO0FBQ0EsZ0JBQUl1QyxpQkFBT0MsV0FBUCxDQUFtQnhDLElBQW5CLENBQUosRUFBOEI7QUFDNUIscUJBQUtPLE9BQUwsR0FBZVAsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBM0I7QUFDQSxxQkFBS0MsTUFBTDtBQUNBO0FBQ0EscUJBQUsvQixTQUFMLEdBQWlCWixLQUFLeUMsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxFQUFsQztBQUNBdEIsaUJBQUd1QixjQUFILENBQWtCLFdBQWxCLEVBQStCLE9BQUtwQyxTQUFwQztBQUNEO0FBQ0Y7QUF0QlEsU0FBWDtBQXdCRDtBQUNEO0FBQ0EsVUFBSSxLQUFLVCxXQUFMLEtBQXFCLEdBQXpCLEVBQThCO0FBQzVCLGFBQUthLEtBQUwsR0FBYSxDQUFiO0FBQ0FTLFdBQUdTLE9BQUgsQ0FBVztBQUNUQyxlQUFLLEtBQUt6QixHQUFMLEdBQVcsdUJBRFA7QUFFVFYsZ0JBQU07QUFDSm9DLHlCQUFhLENBRFQ7QUFFSnJCLDBCQUFjLENBRlY7QUFHSkYsbUJBQU8sQ0FISDtBQUlKQyxtQkFBTyxLQUFLRCxLQUFMLEdBQWEsS0FBS0M7QUFKckIsV0FGRztBQVFUdUIsa0JBQVE7QUFDTiw0QkFBZ0IsaURBRFY7QUFFTix5QkFBYSxLQUFLNUI7QUFGWixXQVJDO0FBWVQ2QixrQkFBUSxNQVpDO0FBYVRYLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUk1QixPQUFPNEIsSUFBSTVCLElBQWY7QUFDQSxnQkFBSXVDLGlCQUFPQyxXQUFQLENBQW1CeEMsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixxQkFBS1EsU0FBTCxHQUFpQlIsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBN0I7QUFDQSxxQkFBS0MsTUFBTDtBQUNBO0FBQ0EscUJBQUsvQixTQUFMLEdBQWlCWixLQUFLeUMsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxFQUFsQztBQUNBdEIsaUJBQUd1QixjQUFILENBQWtCLFdBQWxCLEVBQStCLE9BQUtwQyxTQUFwQztBQUNEO0FBQ0Y7QUF0QlEsU0FBWDtBQXdCRDtBQUNGOzs7NEJBQ1FnQyxDLEVBQUc7QUFDVixVQUFJRyxLQUFLSCxFQUFFQyxhQUFGLENBQWdCSSxPQUFoQixDQUF3QkYsRUFBakM7QUFDQTtBQUNBLFdBQUtuQyxTQUFMLEdBQWlCbUMsRUFBakI7QUFDQXRCLFNBQUd1QixjQUFILENBQWtCLFdBQWxCLEVBQStCLEtBQUtwQyxTQUFwQztBQUNEO0FBQ0Q7Ozs7aUNBQ2M7QUFBQTs7QUFDWixXQUFLQyxLQUFMLEdBQWEsS0FBS0EsS0FBTCxHQUFhLENBQTFCO0FBQ0FZLFNBQUdTLE9BQUgsQ0FBVztBQUNUQyxhQUFLLEtBQUt6QixHQUFMLEdBQVcsdUJBRFA7QUFFVFYsY0FBTTtBQUNKb0MsdUJBQWEsQ0FEVDtBQUVKckIsd0JBQWMsQ0FGVjtBQUdKRixpQkFBTyxLQUFLQSxLQUhSO0FBSUpDLGlCQUFPLEtBQUtBO0FBSlIsU0FGRztBQVFUdUIsZ0JBQVE7QUFDTiwwQkFBZ0IsaURBRFY7QUFFTix1QkFBYSxLQUFLNUI7QUFGWixTQVJDO0FBWVQ2QixnQkFBUSxNQVpDO0FBYVRYLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSTVCLE9BQU80QixJQUFJNUIsSUFBZjtBQUNBLGNBQUl1QyxpQkFBT0MsV0FBUCxDQUFtQnhDLElBQW5CLENBQUosRUFBOEI7QUFDNUIsZ0JBQUlBLEtBQUt5QyxNQUFMLENBQVlDLElBQVosQ0FBaUJaLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQ2pDLG1CQUFLLElBQUlvQixJQUFJLENBQWIsRUFBZ0JBLElBQUlsRCxLQUFLeUMsTUFBTCxDQUFZQyxJQUFaLENBQWlCWixNQUFyQyxFQUE2Q29CLEdBQTdDLEVBQWtEO0FBQ2hELHVCQUFLNUMsT0FBTCxDQUFhNkMsSUFBYixDQUFrQm5ELEtBQUt5QyxNQUFMLENBQVlDLElBQVosQ0FBaUJRLENBQWpCLENBQWxCO0FBQ0Q7QUFDRCxxQkFBS1AsTUFBTDtBQUNELGFBTEQsTUFLTztBQUNMbEIsaUJBQUcyQixTQUFILENBQWE7QUFDWEMseUJBQVMsU0FERTtBQUVYQyw0QkFBWSxLQUZEO0FBR1gzQix5QkFBUyxpQkFBVUMsR0FBVixFQUFlLENBQUU7QUFIZixlQUFiO0FBS0Q7QUFDRjtBQUNGO0FBN0JRLE9BQVg7QUErQkQ7QUFDRDs7OztpQ0FDYztBQUFBOztBQUNaLFdBQUtmLEtBQUwsR0FBYSxLQUFLQSxLQUFMLEdBQWEsQ0FBMUI7QUFDQVksU0FBR1MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS3pCLEdBQUwsR0FBVyx1QkFEUDtBQUVUVixjQUFNO0FBQ0pvQyx1QkFBYSxDQURUO0FBRUpyQix3QkFBYyxDQUZWO0FBR0pGLGlCQUFPLEtBQUtBLEtBSFI7QUFJSkMsaUJBQU8sS0FBS0E7QUFKUixTQUZHO0FBUVR1QixnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHVCQUFhLEtBQUs1QjtBQUZaLFNBUkM7QUFZVDZCLGdCQUFRLE1BWkM7QUFhVFgsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJNUIsT0FBTzRCLElBQUk1QixJQUFmO0FBQ0EsY0FBSXVDLGlCQUFPQyxXQUFQLENBQW1CeEMsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixnQkFBSUEsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQlosTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsbUJBQUssSUFBSW9CLElBQUksQ0FBYixFQUFnQkEsSUFBSWxELEtBQUt5QyxNQUFMLENBQVlDLElBQVosQ0FBaUJaLE1BQXJDLEVBQTZDb0IsR0FBN0MsRUFBa0Q7QUFDaEQsdUJBQUszQyxPQUFMLENBQWE0QyxJQUFiLENBQWtCbkQsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQlEsQ0FBakIsQ0FBbEI7QUFDQSx1QkFBS1AsTUFBTDtBQUNEO0FBQ0YsYUFMRCxNQUtPO0FBQ0xsQixpQkFBRzJCLFNBQUgsQ0FBYTtBQUNYQyx5QkFBUyxTQURFO0FBRVhDLDRCQUFZLEtBRkQ7QUFHWDNCLHlCQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLGVBQWI7QUFLRDtBQUNGO0FBQ0Y7QUE3QlEsT0FBWDtBQStCRDtBQUNEOzs7O21DQUNnQjtBQUFBOztBQUNkLFdBQUtmLEtBQUwsR0FBYSxLQUFLQSxLQUFMLEdBQWEsQ0FBMUI7QUFDQVksU0FBR1MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS3pCLEdBQUwsR0FBVyx1QkFEUDtBQUVUVixjQUFNO0FBQ0pvQyx1QkFBYSxDQURUO0FBRUpyQix3QkFBYyxDQUZWO0FBR0pGLGlCQUFPLEtBQUtBLEtBSFI7QUFJSkMsaUJBQU8sS0FBS0E7QUFKUixTQUZHO0FBUVR1QixnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHVCQUFhLEtBQUs1QjtBQUZaLFNBUkM7QUFZVDZCLGdCQUFRLE1BWkM7QUFhVFgsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJNUIsT0FBTzRCLElBQUk1QixJQUFmO0FBQ0EsY0FBSXVDLGlCQUFPQyxXQUFQLENBQW1CeEMsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixnQkFBSUEsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQlosTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsbUJBQUssSUFBSW9CLElBQUksQ0FBYixFQUFnQkEsSUFBSWxELEtBQUt5QyxNQUFMLENBQVlDLElBQVosQ0FBaUJaLE1BQXJDLEVBQTZDb0IsR0FBN0MsRUFBa0Q7QUFDaEQsdUJBQUsxQyxTQUFMLENBQWUyQyxJQUFmLENBQW9CbkQsS0FBS3lDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQlEsQ0FBakIsQ0FBcEI7QUFDRDtBQUNELHFCQUFLUCxNQUFMO0FBQ0QsYUFMRCxNQUtPO0FBQ0xsQixpQkFBRzJCLFNBQUgsQ0FBYTtBQUNYQyx5QkFBUyxTQURFO0FBRVhDLDRCQUFZLEtBRkQ7QUFHWDNCLHlCQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLGVBQWI7QUFLRDtBQUNGO0FBQ0Y7QUE3QlEsT0FBWDtBQStCRDs7OztFQXRRa0MyQixlQUFLQyxJOztrQkFBckIzRCxPIiwiZmlsZSI6Im5ld3JjbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdyY21kIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAvLyB2YXIgc2xpZGVyV2lkdGggPSA5NiAvLyDpnIDopoHorr7nva5zbGlkZXLnmoTlrr3luqbvvIznlKjkuo7orqHnrpfkuK3pl7TkvY3nva5cclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pm66IO96JCl6ZSAJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2VsZWN0ZWQ6IDMsXHJcbiAgICB0YWJzOiBbJ+W+heaOqOiNkCcsICflvoXmlK/ku5gnLCAn5bey5LuY6LS5J10sXHJcbiAgICBhY3RpdmVJbmRleDogMCxcclxuICAgIHNsaWRlck9mZnNldDogMCxcclxuICAgIHNsaWRlckxlZnQ6IDAsXHJcbiAgICBvbmVsaXN0OiBbXSxcclxuICAgIHR3b2xpc3Q6IFtdLFxyXG4gICAgdGhyZWVsaXN0OiBbXSxcclxuICAgIHNlc3Npb25JZDogJycsXHJcbiAgICBVUkw6ICcnLFxyXG4gICAgSU1HVVJMRURJVDogJycsXHJcbiAgICBzZXJ2aWNlSWQ6ICcnLFxyXG4gICAgc3RhcnQ6IDEsXHJcbiAgICBsaW1pdDogMTAsXHJcbiAgICBzZXJ2aWNlU3RhdGU6IFswLCAxLCAyXSxcclxuICAgIGluZGV4OiAwXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNlbGVjdGUub25jZVwiOlwic2VsZWN0ZWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgdGFiYmFyOiBUYWJiYXJcclxuICB9XHJcbiAgb25Mb2FkICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgdmFyIHNsaWRlcldpZHRoID0gNzVcclxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICB0aGF0LnNsaWRlckxlZnQgPSAocmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoIC0gc2xpZGVyV2lkdGgpIC8gMlxyXG4gICAgICAgIHRoYXQuc2xpZGVyT2Zmc2V0ID0gcmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoICogdGhhdC5kYXRhLmFjdGl2ZUluZGV4XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdyAoKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgdGhpcy5JTUdVUkxFRElUID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMRURJVFxyXG4gICAgLy8g6I635Y+W57yT5a2Y5pWw5o2uXHJcbiAgICB0aGlzLnNlc3Npb25JZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgLy8g5pWw5o2u5pi+56S6XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc2VydmljZVR5cGU6IDEsXHJcbiAgICAgICAgc2VydmljZVN0YXRlOiB0aGlzLnNlcnZpY2VTdGF0ZVt0aGlzLmluZGV4XSxcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgIHRoaXMub25lbGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIHRhYkNsaWNrIChlKSB7XHJcbiAgICB0aGlzLnNsaWRlck9mZnNldCA9IGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0XHJcbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmlkXHJcbiAgICAvLyDlvoXmjqjojZBcclxuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ID09PSAnMCcpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHNlcnZpY2VUeXBlOiAxLFxyXG4gICAgICAgICAgc2VydmljZVN0YXRlOiAwLFxyXG4gICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbmVsaXN0ID0gZGF0YS5yZXN1bHQubGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5b6F5pSv5LuYXHJcbiAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA9PT0gJzEnKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSAxXHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnc2VydmljZS9zZWxlY3RTZXJ2aWNlJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBzZXJ2aWNlVHlwZTogMSxcclxuICAgICAgICAgIHNlcnZpY2VTdGF0ZTogMSxcclxuICAgICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHdvbGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAvLyDlrZjlgqhzZXJ2aWNlSWRcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSWQgPSBkYXRhLnJlc3VsdC5saXN0LmlkXHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzZXJ2aWNlSWQnLCB0aGlzLnNlcnZpY2VJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlt7Lku5jotLlcclxuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ID09PSAnMicpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IDJcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHNlcnZpY2VUeXBlOiAxLFxyXG4gICAgICAgICAgc2VydmljZVN0YXRlOiAyLFxyXG4gICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy50aHJlZWxpc3QgPSBkYXRhLnJlc3VsdC5saXN0XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgLy8g5a2Y5YKoc2VydmljZUlkXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZUlkID0gZGF0YS5yZXN1bHQubGlzdC5pZFxyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc2VydmljZUlkJywgdGhpcy5zZXJ2aWNlSWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBzZW5kbXNnIChlKSB7XHJcbiAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgLy8g5a2Y5YKoc2VydmljZUlkXHJcbiAgICB0aGlzLnNlcnZpY2VJZCA9IGlkXHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnc2VydmljZUlkJywgdGhpcy5zZXJ2aWNlSWQpXHJcbiAgfVxyXG4gIC8vIOW+heaOqOiNkOiOt+WPluabtOWkmlxyXG4gIG9uZWdldE1vcmUgKCkge1xyXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc2VydmljZVR5cGU6IDEsXHJcbiAgICAgICAgc2VydmljZVN0YXRlOiAwLFxyXG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB0aGlzLnNlc3Npb25JZFxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdC5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vbmVsaXN0LnB1c2goZGF0YS5yZXN1bHQubGlzdFtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmm7TlpJrmlbDmja7kuoYnLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHt9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICAvLyDlvoXmlK/ku5jojrflj5bmm7TlpJpcclxuICB0d29nZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAnc2VydmljZS9zZWxlY3RTZXJ2aWNlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHNlcnZpY2VUeXBlOiAxLFxyXG4gICAgICAgIHNlcnZpY2VTdGF0ZTogMSxcclxuICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdFxyXG4gICAgICB9LFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZXN1bHQubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHRoaXMudHdvbGlzdC5wdXNoKGRhdGEucmVzdWx0Lmxpc3RbaV0pXHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmm7TlpJrmlbDmja7kuoYnLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHt9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICAvLyDlt7Lku5jotLnojrflj5bmm7TlpJpcclxuICB0aHJlZWdldE1vcmUgKCkge1xyXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc2VydmljZVR5cGU6IDEsXHJcbiAgICAgICAgc2VydmljZVN0YXRlOiAyLFxyXG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB0aGlzLnNlc3Npb25JZFxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdC5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy50aHJlZWxpc3QucHVzaChkYXRhLnJlc3VsdC5saXN0W2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+ayoeacieabtOWkmuaVsOaNruS6hicsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge31cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==