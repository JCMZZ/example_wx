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
      navigationBarTitleText: '积分明细'
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
      if (wx.getStorageSync('islogin') !== false) {
        this.getData(false);
      }
    }
    // 获取积分明细数据

  }, {
    key: 'getData',
    value: function getData(isGetMore) {
      var _this2 = this;

      if (wx.getStorageSync('islogin') !== false) {
        wx.request({
          url: this.URL + 'customer/findScoreRecord',
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(IntegralRecord , 'pages/integral-record'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVncmFsLXJlY29yZC5qcyJdLCJuYW1lcyI6WyJJbnRlZ3JhbFJlY29yZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiVGFiYmFyIiwiZGF0YSIsIlVSTCIsImxpc3QiLCJzdGFydCIsImxpbWl0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsImlzR2V0TW9yZSIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJzdG9yZUlkIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwicmVzdWx0IiwibGVuZ3RoIiwidGlwQWxlcnQiLCJtYXAiLCJ2YWx1ZSIsImNyZWF0ZVRpbWUiLCJzdWJzdHIiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFZO0FBQ1ZDO0FBRFUsSyxRQUdaQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxhQUFPLENBSEY7QUFJTEMsYUFBTztBQUpGLEs7Ozs7OzZCQU1HO0FBQ1IsV0FBS0gsR0FBTCxHQUFXLEtBQUtJLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkwsR0FBbkM7QUFDQSxVQUFJTSxHQUFHQyxjQUFILENBQWtCLFNBQWxCLE1BQWlDLEtBQXJDLEVBQTRDO0FBQzFDLGFBQUtDLE9BQUwsQ0FBYSxLQUFiO0FBQ0Q7QUFDRjtBQUNEOzs7OzRCQUNTQyxTLEVBQVc7QUFBQTs7QUFDbEIsVUFBSUgsR0FBR0MsY0FBSCxDQUFrQixTQUFsQixNQUFpQyxLQUFyQyxFQUE0QztBQUMxQ0QsV0FBR0ksT0FBSCxDQUFXO0FBQ1RDLGVBQUssS0FBS1gsR0FBTCxHQUFXLDBCQURQO0FBRVRELGdCQUFNO0FBQ0pHLG1CQUFPLENBREg7QUFFSkMsbUJBQU8sS0FBS0QsS0FBTCxHQUFhLEtBQUtDO0FBRnJCLFdBRkc7QUFNVFMsa0JBQVE7QUFDTiw0QkFBZ0IsaURBRFY7QUFFTix1QkFBVyxLQUFLUixPQUFMLENBQWFDLFVBQWIsQ0FBd0JRLE9BRjdCO0FBR04seUJBQWFQLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEI7QUFIUCxXQU5DO0FBV1RPLGtCQUFRLE1BWEM7QUFZVEMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSWpCLE9BQU9pQixJQUFJakIsSUFBZjtBQUNBLGdCQUFJa0IsaUJBQU9DLFdBQVAsQ0FBbUJuQixJQUFuQixDQUFKLEVBQThCO0FBQzVCLGtCQUFJVSxhQUFhVixLQUFLb0IsTUFBTCxDQUFZbEIsSUFBWixDQUFpQm1CLE1BQWpCLEtBQTRCLE9BQUtuQixJQUFMLENBQVVtQixNQUF2RCxFQUErRDtBQUM3REgsaUNBQU9JLFFBQVAsQ0FBZ0IsU0FBaEI7QUFDQSx1QkFBS25CLEtBQUw7QUFDQTtBQUNEO0FBQ0QscUJBQUtELElBQUwsR0FBWUYsS0FBS29CLE1BQUwsQ0FBWWxCLElBQVosQ0FBaUJxQixHQUFqQixDQUFxQixpQkFBUztBQUN4Q0Msc0JBQU1DLFVBQU4sR0FBbUJELE1BQU1DLFVBQU4sQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLEVBQTNCLENBQW5CO0FBQ0EsdUJBQU9GLEtBQVA7QUFDRCxlQUhXLENBQVo7QUFJQSxxQkFBS0csTUFBTDtBQUNEO0FBQ0Y7QUExQlEsU0FBWDtBQTRCRDtBQUNGOzs7OEJBQ1U7QUFDVCxXQUFLeEIsS0FBTDtBQUNBLFdBQUtNLE9BQUwsQ0FBYSxJQUFiO0FBQ0Q7Ozs7RUF2RHlDbUIsZUFBS0MsSTs7a0JBQTVCbEMsYyIsImZpbGUiOiJpbnRlZ3JhbC1yZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhbFJlY29yZCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enr+WIhuaYjue7hidcclxuICB9XHJcbiAgY29tcG9uZW50cz0ge1xyXG4gICAgVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBVUkw6ICcnLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBzdGFydDogMSxcclxuICAgIGxpbWl0OiAxMFxyXG4gIH1cclxuICBvbkxvYWQgKCkge1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYygnaXNsb2dpbicpICE9PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmdldERhdGEoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIOiOt+WPluenr+WIhuaYjue7huaVsOaNrlxyXG4gIGdldERhdGEgKGlzR2V0TW9yZSkge1xyXG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKCdpc2xvZ2luJykgIT09IGZhbHNlKSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnY3VzdG9tZXIvZmluZFNjb3JlUmVjb3JkJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBzdGFydDogMSxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLnN0YXJ0ICogdGhpcy5saW1pdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzdG9yZUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZCxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgaWYgKGlzR2V0TW9yZSAmJiBkYXRhLnJlc3VsdC5saXN0Lmxlbmd0aCA9PT0gdGhpcy5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5rKh5pyJ5pu05aSa5pWw5o2u5LqGJylcclxuICAgICAgICAgICAgICB0aGlzLnN0YXJ0LS1cclxuICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhLnJlc3VsdC5saXN0Lm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsdWUuY3JlYXRlVGltZSA9IHZhbHVlLmNyZWF0ZVRpbWUuc3Vic3RyKDAsIDE5KVxyXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQrK1xyXG4gICAgdGhpcy5nZXREYXRhKHRydWUpXHJcbiAgfVxyXG59XHJcbiJdfQ==