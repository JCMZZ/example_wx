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

var Oldrcmd = function (_wepy$page) {
  _inherits(Oldrcmd, _wepy$page);

  function Oldrcmd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Oldrcmd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Oldrcmd.__proto__ || Object.getPrototypeOf(Oldrcmd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '精准营销'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      tabs: ['待推荐', '待支付', '已付费'],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      list: [],
      sessionId: '',
      URL: '',
      IMGURLEDIT: '',
      start: 1,
      limit: 10,
      serviceState: [0, 1, 2],
      index: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置


  _createClass(Oldrcmd, [{
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
      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 获取缓存数据
      try {
        var value = wx.getStorageSync('sessionId');
        if (value) {
          this.sessionId = value;
        }
      } catch (e) {}
      // 待推荐请求
      this.backData({
        serviceType: 2,
        serviceState: this.serviceState[this.index],
        start: 1,
        limit: this.start * this.limit
      });
      // 待支付
      // if () {
      //   wx.request({
      //     url: this.URL + 'service/selectService',
      //     data: {
      //       serviceType: 2,
      //       serviceState: 1,
      //       start: 1,
      //       limit: this.start * this.limit
      //     },
      //     header: {
      //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      //       'sessionId': this.sessionId
      //     },
      //     method: 'POST',
      //     success: (res) => {
      //       let data = res.data
      //       if (common.Interceptor(data)) {
      //         this.list = data.result.list
      //         this.$apply()
      //       }
      //     }
      //   })
      // }
    }
  }, {
    key: 'tabClick',
    value: function tabClick(e) {
      this.sliderOffset = e.currentTarget.offsetLeft;
      this.activeIndex = e.currentTarget.id;
      // 待推荐
      if (this.activeIndex === '0') {
        this.index = 0;
        this.backData({
          serviceType: 2,
          serviceState: this.serviceState[this.index],
          start: 1,
          limit: this.start * this.limit
        });
      }
      // 待支付
      if (this.activeIndex === '1') {
        this.index = 1;
        this.backData({
          serviceType: 2,
          serviceState: this.serviceState[this.index],
          start: 1,
          limit: this.start * this.limit
        });
      }
      // 已付费
      if (this.activeIndex === '2') {
        this.index = 2;
        this.backData({
          serviceType: 2,
          serviceState: this.serviceState[this.index],
          start: 1,
          limit: this.start * this.limit
        });
      }
    }
  }, {
    key: 'sendmsg',
    value: function sendmsg(e) {
      var id = e.currentTarget.dataset.id;
      // 存储serviceId
      this.serviceId = id;
      try {
        wx.setStorageSync('serviceId', this.serviceId);
      } catch (e) {}
    }
    // 待推荐获取更多

  }, {
    key: 'onegetMore',
    value: function onegetMore() {
      this.start = this.start + 1;
      this.index = 0;
      this.commongetMore();
    }
    // 待支付获取更多

  }, {
    key: 'twogetMore',
    value: function twogetMore() {
      this.start = this.start + 1;
      this.index = 1;
      this.commongetMore();
    }
    // 已付费获取更多

  }, {
    key: 'threegetMore',
    value: function threegetMore() {
      this.start = this.start + 1;
      this.index = 2;
      this.commongetMore();
    }
    // 数据回显

  }, {
    key: 'backData',
    value: function backData() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      wx.request({
        url: this.URL + 'service/selectService',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            _this2.list = data.result.list;
            _this2.$apply();
          }
        }
      });
    }
    // 获取更多数据显示

  }, {
    key: 'commongetMore',
    value: function commongetMore() {
      var _this3 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      wx.request({
        url: this.URL + 'service/selectService',
        data: {
          serviceType: 2,
          serviceState: this.serviceState[this.index],
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
                _this3.list.push(data.result.list[i]);
              }
              _this3.$apply();
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

  return Oldrcmd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Oldrcmd , 'pages/oldrcmd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9sZHJjbWQuanMiXSwibmFtZXMiOlsiT2xkcmNtZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0IiwibGlzdCIsInNlc3Npb25JZCIsIlVSTCIsIklNR1VSTEVESVQiLCJzdGFydCIsImxpbWl0Iiwic2VydmljZVN0YXRlIiwiaW5kZXgiLCJ0aGF0Iiwic2xpZGVyV2lkdGgiLCJ3eCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93V2lkdGgiLCJsZW5ndGgiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInZhbHVlIiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwiYmFja0RhdGEiLCJzZXJ2aWNlVHlwZSIsImN1cnJlbnRUYXJnZXQiLCJvZmZzZXRMZWZ0IiwiaWQiLCJkYXRhc2V0Iiwic2VydmljZUlkIiwic2V0U3RvcmFnZVN5bmMiLCJjb21tb25nZXRNb3JlIiwicmVxdWVzdCIsInVybCIsImhlYWRlciIsIm1ldGhvZCIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwicmVzdWx0IiwiJGFwcGx5IiwiaSIsInB1c2giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFD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RCxNQUFMO0FBQ0QsYUFMRCxNQUtPO0FBQ0wzQixpQkFBRzhCLFNBQUgsQ0FBYTtBQUNYQyx5QkFBUyxTQURFO0FBRVhDLDRCQUFZLEtBRkQ7QUFHWDlCLHlCQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLGVBQWI7QUFLRDtBQUNGO0FBQ0Y7QUE3QlEsT0FBWDtBQStCRDs7OztFQWhNa0M4QixlQUFLQyxJOztrQkFBckIzRCxPIiwiZmlsZSI6Im9sZHJjbWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbGRyY21kIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAvLyB2YXIgc2xpZGVyV2lkdGggPSA5NiAvLyDpnIDopoHorr7nva5zbGlkZXLnmoTlrr3luqbvvIznlKjkuo7orqHnrpfkuK3pl7TkvY3nva5cclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57K+5YeG6JCl6ZSAJ1xyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIHRhYnM6IFsn5b6F5o6o6I2QJywgJ+W+heaUr+S7mCcsICflt7Lku5jotLknXSxcclxuICAgIGFjdGl2ZUluZGV4OiAwLFxyXG4gICAgc2xpZGVyT2Zmc2V0OiAwLFxyXG4gICAgc2xpZGVyTGVmdDogMCxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgc2Vzc2lvbklkOiAnJyxcclxuICAgIFVSTDogJycsXHJcbiAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgIHN0YXJ0OiAxLFxyXG4gICAgbGltaXQ6IDEwLFxyXG4gICAgc2VydmljZVN0YXRlOiBbMCwgMSwgMl0sXHJcbiAgICBpbmRleDogMFxyXG4gIH1cclxuICBvbkxvYWQgKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICB2YXIgc2xpZGVyV2lkdGggPSA3NVxyXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHRoYXQuc2xpZGVyTGVmdCA9IChyZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggLSBzbGlkZXJXaWR0aCkgLyAyXHJcbiAgICAgICAgdGhhdC5zbGlkZXJPZmZzZXQgPSByZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggKiB0aGF0LmRhdGEuYWN0aXZlSW5kZXhcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB0aGlzLklNR1VSTEVESVQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxFRElUXHJcbiAgICAvLyDojrflj5bnvJPlrZjmlbDmja5cclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNlc3Npb25JZCA9IHZhbHVlXHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgIH1cclxuICAgIC8vIOW+heaOqOiNkOivt+axglxyXG4gICAgdGhpcy5iYWNrRGF0YSh7XHJcbiAgICAgIHNlcnZpY2VUeXBlOiAyLFxyXG4gICAgICBzZXJ2aWNlU3RhdGU6IHRoaXMuc2VydmljZVN0YXRlW3RoaXMuaW5kZXhdLFxyXG4gICAgICBzdGFydDogMSxcclxuICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICB9KVxyXG4gICAgLy8g5b6F5pSv5LuYXHJcbiAgICAvLyBpZiAoKSB7XHJcbiAgICAvLyAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgLy8gICAgIHVybDogdGhpcy5VUkwgKyAnc2VydmljZS9zZWxlY3RTZXJ2aWNlJyxcclxuICAgIC8vICAgICBkYXRhOiB7XHJcbiAgICAvLyAgICAgICBzZXJ2aWNlVHlwZTogMixcclxuICAgIC8vICAgICAgIHNlcnZpY2VTdGF0ZTogMSxcclxuICAgIC8vICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgLy8gICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBoZWFkZXI6IHtcclxuICAgIC8vICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgLy8gICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIC8vICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAvLyAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAvLyAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgIC8vICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSlcclxuICAgIC8vIH1cclxuICB9XHJcbiAgdGFiQ2xpY2sgKGUpIHtcclxuICAgIHRoaXMuc2xpZGVyT2Zmc2V0ID0gZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnRcclxuICAgIHRoaXMuYWN0aXZlSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgIC8vIOW+heaOqOiNkFxyXG4gICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggPT09ICcwJykge1xyXG4gICAgICB0aGlzLmluZGV4ID0gMFxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBzZXJ2aWNlVHlwZTogMixcclxuICAgICAgICBzZXJ2aWNlU3RhdGU6IHRoaXMuc2VydmljZVN0YXRlW3RoaXMuaW5kZXhdLFxyXG4gICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLnN0YXJ0ICogdGhpcy5saW1pdFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5b6F5pSv5LuYXHJcbiAgICBpZiAodGhpcy5hY3RpdmVJbmRleCA9PT0gJzEnKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSAxXHJcbiAgICAgIHRoaXMuYmFja0RhdGEoe1xyXG4gICAgICAgIHNlcnZpY2VUeXBlOiAyLFxyXG4gICAgICAgIHNlcnZpY2VTdGF0ZTogdGhpcy5zZXJ2aWNlU3RhdGVbdGhpcy5pbmRleF0sXHJcbiAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlt7Lku5jotLlcclxuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ID09PSAnMicpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IDJcclxuICAgICAgdGhpcy5iYWNrRGF0YSh7XHJcbiAgICAgICAgc2VydmljZVR5cGU6IDIsXHJcbiAgICAgICAgc2VydmljZVN0YXRlOiB0aGlzLnNlcnZpY2VTdGF0ZVt0aGlzLmluZGV4XSxcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgc2VuZG1zZyAoZSkge1xyXG4gICAgdmFyIGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgIC8vIOWtmOWCqHNlcnZpY2VJZFxyXG4gICAgdGhpcy5zZXJ2aWNlSWQgPSBpZFxyXG4gICAgdHJ5IHtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3NlcnZpY2VJZCcsIHRoaXMuc2VydmljZUlkKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyDlvoXmjqjojZDojrflj5bmm7TlpJpcclxuICBvbmVnZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgdGhpcy5pbmRleCA9IDBcclxuICAgIHRoaXMuY29tbW9uZ2V0TW9yZSgpXHJcbiAgfVxyXG4gIC8vIOW+heaUr+S7mOiOt+WPluabtOWkmlxyXG4gIHR3b2dldE1vcmUgKCkge1xyXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICB0aGlzLmluZGV4ID0gMVxyXG4gICAgdGhpcy5jb21tb25nZXRNb3JlKClcclxuICB9XHJcbiAgLy8g5bey5LuY6LS56I635Y+W5pu05aSaXHJcbiAgdGhyZWVnZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgdGhpcy5pbmRleCA9IDJcclxuICAgIHRoaXMuY29tbW9uZ2V0TW9yZSgpXHJcbiAgfVxyXG4gIC8vIOaVsOaNruWbnuaYvlxyXG4gIGJhY2tEYXRhKGRhdGEgPSB7fSkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAnc2VydmljZS9zZWxlY3RTZXJ2aWNlJyxcclxuICAgICAgZGF0YSxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIC8vIOiOt+WPluabtOWkmuaVsOaNruaYvuekulxyXG4gIGNvbW1vbmdldE1vcmUoZGF0YSA9IHt9KSB7XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc2VydmljZVR5cGU6IDIsXHJcbiAgICAgICAgc2VydmljZVN0YXRlOiB0aGlzLnNlcnZpY2VTdGF0ZVt0aGlzLmluZGV4XSxcclxuICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdFxyXG4gICAgICB9LFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZXN1bHQubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGRhdGEucmVzdWx0Lmxpc3RbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5pu05aSa5pWw5o2u5LqGJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7fVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19