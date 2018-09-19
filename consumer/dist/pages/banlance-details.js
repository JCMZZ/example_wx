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

var IntegralRecord = function (_wepy$page) {
  _inherits(IntegralRecord, _wepy$page);

  function IntegralRecord() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IntegralRecord);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntegralRecord.__proto__ || Object.getPrototypeOf(IntegralRecord)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '余额明细'
    }, _this.components = {
      Tabbar: _tabbar2.default
    }, _this.data = {
      URL: '',
      list: [],
      start: 1,
      limit: 10
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntegralRecord, [{
    key: 'onLoad',
    value: function onLoad() {
      this.URL = this.$parent.globalData.URL;
      this.getData(false);
    }
    // 获取余额明细数据

  }, {
    key: 'getData',
    value: function getData(isGetMore) {
      var _this2 = this;

      if (wx.getStorageSync('islogin') !== false) {
        wx.request({
          url: this.URL + 'customer/findBalanceRecord',
          data: {
            start: 1,
            limit: this.start * this.limit
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'storeId': this.$parent.globalData.storeId,
            'sessionId': wx.getStorageSync('sessionId')
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              if (isGetMore && data.result.list.length === _this2.list.length) {
                _common2.default.tipAlert('没有更多数据了');
                _this2.start--;
                return;
              }
              _this2.list = data.result.list.map(function (value) {
                value.createTime = value.createTime.substr(0, 19);
                return value;
              });
              _this2.$apply();
            }
          }
        });
      }
    }
  }, {
    key: 'getMore',
    value: function getMore() {
      this.start++;
      this.getData(true);
    }
  }]);

  return IntegralRecord;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(IntegralRecord , 'pages/banlance-details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbmxhbmNlLWRldGFpbHMuanMiXSwibmFtZXMiOlsiSW50ZWdyYWxSZWNvcmQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIlRhYmJhciIsImRhdGEiLCJVUkwiLCJsaXN0Iiwic3RhcnQiLCJsaW1pdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0RGF0YSIsImlzR2V0TW9yZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwic3RvcmVJZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb21tb24iLCJJbnRlcmNlcHRvciIsInJlc3VsdCIsImxlbmd0aCIsInRpcEFsZXJ0IiwibWFwIiwidmFsdWUiLCJjcmVhdGVUaW1lIiwic3Vic3RyIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBWTtBQUNWQztBQURVLEssUUFHWkMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsYUFBTyxDQUhGO0FBSUxDLGFBQU87QUFKRixLOzs7Ozs2QkFNRztBQUNSLFdBQUtILEdBQUwsR0FBVyxLQUFLSSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JMLEdBQW5DO0FBQ0EsV0FBS00sT0FBTCxDQUFhLEtBQWI7QUFDRDtBQUNEOzs7OzRCQUNTQyxTLEVBQVc7QUFBQTs7QUFDbEIsVUFBSUMsR0FBR0MsY0FBSCxDQUFrQixTQUFsQixNQUFpQyxLQUFyQyxFQUE0QztBQUMxQ0QsV0FBR0UsT0FBSCxDQUFXO0FBQ1RDLGVBQUssS0FBS1gsR0FBTCxHQUFXLDRCQURQO0FBRVRELGdCQUFNO0FBQ0pHLG1CQUFPLENBREg7QUFFSkMsbUJBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBRnJCLFdBRkc7QUFNVFMsa0JBQVE7QUFDTiw0QkFBZ0IsaURBRFY7QUFFTix1QkFBVyxLQUFLUixPQUFMLENBQWFDLFVBQWIsQ0FBd0JRLE9BRjdCO0FBR04seUJBQWFMLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEI7QUFIUCxXQU5DO0FBV1RLLGtCQUFRLE1BWEM7QUFZVEMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSWpCLE9BQU9pQixJQUFJakIsSUFBZjtBQUNBLGdCQUFJa0IsaUJBQU9DLFdBQVAsQ0FBbUJuQixJQUFuQixDQUFKLEVBQThCO0FBQzVCLGtCQUFJUSxhQUFhUixLQUFLb0IsTUFBTCxDQUFZbEIsSUFBWixDQUFpQm1CLE1BQWpCLEtBQTRCLE9BQUtuQixJQUFMLENBQVVtQixNQUF2RCxFQUErRDtBQUM3REgsaUNBQU9JLFFBQVAsQ0FBZ0IsU0FBaEI7QUFDQSx1QkFBS25CLEtBQUw7QUFDQTtBQUNEO0FBQ0QscUJBQUtELElBQUwsR0FBWUYsS0FBS29CLE1BQUwsQ0FBWWxCLElBQVosQ0FBaUJxQixHQUFqQixDQUFxQixpQkFBUztBQUN4Q0Msc0JBQU1DLFVBQU4sR0FBbUJELE1BQU1DLFVBQU4sQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLEVBQTNCLENBQW5CO0FBQ0EsdUJBQU9GLEtBQVA7QUFDRCxlQUhXLENBQVo7QUFJQSxxQkFBS0csTUFBTDtBQUNEO0FBQ0Y7QUExQlEsU0FBWDtBQTRCRDtBQUNGOzs7OEJBQ1U7QUFDVCxXQUFLeEIsS0FBTDtBQUNBLFdBQUtJLE9BQUwsQ0FBYSxJQUFiO0FBQ0Q7Ozs7RUFyRHlDcUIsZUFBS0MsSTs7a0JBQTVCbEMsYyIsImZpbGUiOiJiYW5sYW5jZS1kZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYWxSZWNvcmQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvZnpop3mmI7nu4YnXHJcbiAgfVxyXG4gIGNvbXBvbmVudHM9IHtcclxuICAgIFRhYmJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgVVJMOiAnJyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgc3RhcnQ6IDEsXHJcbiAgICBsaW1pdDogMTBcclxuICB9XHJcbiAgb25Mb2FkICgpIHtcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB0aGlzLmdldERhdGEoZmFsc2UpXHJcbiAgfVxyXG4gIC8vIOiOt+WPluS9memineaYjue7huaVsOaNrlxyXG4gIGdldERhdGEgKGlzR2V0TW9yZSkge1xyXG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKCdpc2xvZ2luJykgIT09IGZhbHNlKSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnY3VzdG9tZXIvZmluZEJhbGFuY2VSZWNvcmQnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3N0b3JlSWQnOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zdG9yZUlkLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoaXNHZXRNb3JlICYmIGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoID09PSB0aGlzLmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfmsqHmnInmm7TlpJrmlbDmja7kuoYnKVxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhcnQtLVxyXG4gICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3QubWFwKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICB2YWx1ZS5jcmVhdGVUaW1lID0gdmFsdWUuY3JlYXRlVGltZS5zdWJzdHIoMCwgMTkpXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1vcmUgKCkge1xyXG4gICAgdGhpcy5zdGFydCsrXHJcbiAgICB0aGlzLmdldERhdGEodHJ1ZSlcclxuICB9XHJcbn1cclxuIl19