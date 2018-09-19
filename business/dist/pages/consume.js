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

var Consume = function (_wepy$page) {
  _inherits(Consume, _wepy$page);

  function Consume() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Consume);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Consume.__proto__ || Object.getPrototypeOf(Consume)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '消费记录'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      list: [],
      URL: '',
      start: 1,
      limit: 10
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Consume, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      wx.request({
        url: this.URL + 'userManage/findBalanceRecord',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        data: {
          userCustomerId: wx.getStorageSync('customerId'),
          start: this.start,
          limit: this.limit
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              _this2.list = data.result.list.map(function (value) {
                value.createTime = value.createTime.substr(0, 19);
                return value;
              });
              _this2.$apply();
            }
          }
        }
      });
    }
  }, {
    key: 'getMore',
    value: function getMore() {
      var _this3 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'userManage/findBalanceRecord',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        data: {
          userCustomerId: wx.getStorageSync('customerId'),
          start: this.start,
          limit: this.limit
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              for (var i = 0; i < data.result.list.length; i++) {
                _this3.list.push(data.result.list[i]);
              }
              _this3.list = _this3.list.map(function (value) {
                value.createTime = value.createTime.substr(0, 19);
                return value;
              });
              _this3.$apply();
            }
          }
        }
      });
    }
  }]);

  return Consume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Consume , 'pages/consume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bWUuanMiXSwibmFtZXMiOlsiQ29uc3VtZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJsaXN0IiwiVVJMIiwic3RhcnQiLCJsaW1pdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid3giLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyQ3VzdG9tZXJJZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb21tb24iLCJJbnRlcmNlcHRvciIsInRpcEFsZXJ0IiwibWVzc2FnZSIsInJlc3VsdCIsIm1hcCIsInZhbHVlIiwiY3JlYXRlVGltZSIsInN1YnN0ciIsIiRhcHBseSIsImkiLCJsZW5ndGgiLCJwdXNoIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsVUFBekMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxjQUFRQztBQURFLEssUUFHWkMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLFdBQUssRUFIQTtBQUlMQyxhQUFPLENBSkY7QUFLTEMsYUFBTztBQUxGLEs7Ozs7OzZCQU9HO0FBQUE7O0FBQ1IsV0FBS0YsR0FBTCxHQUFXLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkosR0FBbkM7QUFDQUssU0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS1AsR0FBTCxHQUFXLDhCQURQO0FBRVRRLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQUZDO0FBTVRaLGNBQU07QUFDSmEsMEJBQWdCTCxHQUFHSSxjQUFILENBQWtCLFlBQWxCLENBRFo7QUFFSlIsaUJBQU8sS0FBS0EsS0FGUjtBQUdKQyxpQkFBTyxLQUFLQTtBQUhSLFNBTkc7QUFXVFMsZ0JBQVEsTUFYQztBQVlUQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUloQixPQUFPZ0IsSUFBSWhCLElBQWY7QUFDQSxjQUFJaUIsaUJBQU9DLFdBQVAsQ0FBbUJsQixJQUFuQixDQUFKLEVBQThCO0FBQzVCLGdCQUFJQSxLQUFLZSxPQUFMLEtBQWlCLEtBQXJCLEVBQTRCO0FBQzFCRSwrQkFBT0UsUUFBUCxDQUFnQm5CLEtBQUtvQixPQUFyQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFLbEIsSUFBTCxHQUFZRixLQUFLcUIsTUFBTCxDQUFZbkIsSUFBWixDQUFpQm9CLEdBQWpCLENBQXFCLGlCQUFTO0FBQ3hDQyxzQkFBTUMsVUFBTixHQUFtQkQsTUFBTUMsVUFBTixDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsRUFBMkIsRUFBM0IsQ0FBbkI7QUFDQSx1QkFBT0YsS0FBUDtBQUNELGVBSFcsQ0FBWjtBQUlBLHFCQUFLRyxNQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBekJRLE9BQVg7QUEyQkQ7Ozs4QkFDVTtBQUFBOztBQUNULFdBQUt0QixLQUFMLEdBQWEsS0FBS0EsS0FBTCxHQUFhLENBQTFCO0FBQ0FJLFNBQUdDLE9BQUgsQ0FBVztBQUNUQyxhQUFLLEtBQUtQLEdBQUwsR0FBVyw4QkFEUDtBQUVUUSxnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHVCQUFhSCxHQUFHSSxjQUFILENBQWtCLFdBQWxCO0FBRlAsU0FGQztBQU1UWixjQUFNO0FBQ0phLDBCQUFnQkwsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQURaO0FBRUpSLGlCQUFPLEtBQUtBLEtBRlI7QUFHSkMsaUJBQU8sS0FBS0E7QUFIUixTQU5HO0FBV1RTLGdCQUFRLE1BWEM7QUFZVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJaEIsT0FBT2dCLElBQUloQixJQUFmO0FBQ0EsY0FBSWlCLGlCQUFPQyxXQUFQLENBQW1CbEIsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixnQkFBSUEsS0FBS2UsT0FBTCxLQUFpQixLQUFyQixFQUE0QjtBQUMxQkUsK0JBQU9FLFFBQVAsQ0FBZ0JuQixLQUFLb0IsT0FBckI7QUFDRCxhQUZELE1BRU87QUFDTCxtQkFBSyxJQUFJTyxJQUFJLENBQWIsRUFBZ0JBLElBQUkzQixLQUFLcUIsTUFBTCxDQUFZbkIsSUFBWixDQUFpQjBCLE1BQXJDLEVBQTZDRCxHQUE3QyxFQUFrRDtBQUNoRCx1QkFBS3pCLElBQUwsQ0FBVTJCLElBQVYsQ0FBZTdCLEtBQUtxQixNQUFMLENBQVluQixJQUFaLENBQWlCeUIsQ0FBakIsQ0FBZjtBQUNEO0FBQ0QscUJBQUt6QixJQUFMLEdBQVksT0FBS0EsSUFBTCxDQUFVb0IsR0FBVixDQUFjLGlCQUFTO0FBQ2pDQyxzQkFBTUMsVUFBTixHQUFtQkQsTUFBTUMsVUFBTixDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsRUFBMkIsRUFBM0IsQ0FBbkI7QUFDQSx1QkFBT0YsS0FBUDtBQUNELGVBSFcsQ0FBWjtBQUlBLHFCQUFLRyxNQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBNUJRLE9BQVg7QUE4QkQ7Ozs7RUEvRWtDSSxlQUFLQyxJOztrQkFBckJ4QyxPIiwiZmlsZSI6ImNvbnN1bWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdW1lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5raI6LS56K6w5b2VJ1xyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIHN0YXJ0OiAxLFxyXG4gICAgbGltaXQ6IDEwXHJcbiAgfVxyXG4gIG9uU2hvdyAoKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAndXNlck1hbmFnZS9maW5kQmFsYW5jZVJlY29yZCcsXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJDdXN0b21lcklkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VzdG9tZXJJZCcpLFxyXG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhLnJlc3VsdC5saXN0Lm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsdWUuY3JlYXRlVGltZSA9IHZhbHVlLmNyZWF0ZVRpbWUuc3Vic3RyKDAsIDE5KVxyXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBnZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAndXNlck1hbmFnZS9maW5kQmFsYW5jZVJlY29yZCcsXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJDdXN0b21lcklkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VzdG9tZXJJZCcpLFxyXG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhLnJlc3VsdC5saXN0W2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5tYXAodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIHZhbHVlLmNyZWF0ZVRpbWUgPSB2YWx1ZS5jcmVhdGVUaW1lLnN1YnN0cigwLCAxOSlcclxuICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19