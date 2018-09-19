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
      navigationBarTitleText: '积分记录'
    }, _this.data = {
      selected: 3,
      list: [],
      URL: '',
      start: 1,
      limit: 10
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntegralRecord, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      wx.request({
        url: this.URL + 'userManage/findScoreRecord',
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
            _this2.list = data.result.list.map(function (value) {
              value.createTime = value.createTime.substr(0, 19);
              return value;
            });
            _this2.$apply();
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
        url: this.URL + 'userManage/findScoreRecord',
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
              for (var i = 0; i < res.data.result.list.length; i++) {
                _this3.list.push(res.data.result.list[i]);
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

  return IntegralRecord;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(IntegralRecord , 'pages/integral-record'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVncmFsLXJlY29yZC5qcyJdLCJuYW1lcyI6WyJJbnRlZ3JhbFJlY29yZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2VsZWN0ZWQiLCJsaXN0IiwiVVJMIiwic3RhcnQiLCJsaW1pdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYmJhciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid3giLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyQ3VzdG9tZXJJZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb21tb24iLCJJbnRlcmNlcHRvciIsInJlc3VsdCIsIm1hcCIsInZhbHVlIiwiY3JlYXRlVGltZSIsInN1YnN0ciIsIiRhcHBseSIsInRpcEFsZXJ0IiwibWVzc2FnZSIsImkiLCJsZW5ndGgiLCJwdXNoIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxXQUFLLEVBSEE7QUFJTEMsYUFBTyxDQUpGO0FBS0xDLGFBQU87QUFMRixLLFFBT1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsVUFBekMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxjQUFRQztBQURFLEs7Ozs7OzZCQUdGO0FBQUE7O0FBQ1IsV0FBS1IsR0FBTCxHQUFXLEtBQUtTLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlYsR0FBbkM7QUFDQVcsU0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS2IsR0FBTCxHQUFXLDRCQURQO0FBRVRjLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQUZDO0FBTVRsQixjQUFNO0FBQ0ptQiwwQkFBZ0JMLEdBQUdJLGNBQUgsQ0FBa0IsWUFBbEIsQ0FEWjtBQUVKZCxpQkFBTyxLQUFLQSxLQUZSO0FBR0pDLGlCQUFPLEtBQUtBO0FBSFIsU0FORztBQVdUZSxnQkFBUSxNQVhDO0FBWVRDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSXRCLE9BQU9zQixJQUFJdEIsSUFBZjtBQUNBLGNBQUl1QixpQkFBT0MsV0FBUCxDQUFtQnhCLElBQW5CLENBQUosRUFBOEI7QUFDNUIsbUJBQUtFLElBQUwsR0FBWUYsS0FBS3lCLE1BQUwsQ0FBWXZCLElBQVosQ0FBaUJ3QixHQUFqQixDQUFxQixpQkFBUztBQUN4Q0Msb0JBQU1DLFVBQU4sR0FBbUJELE1BQU1DLFVBQU4sQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLEVBQTNCLENBQW5CO0FBQ0EscUJBQU9GLEtBQVA7QUFDRCxhQUhXLENBQVo7QUFJQSxtQkFBS0csTUFBTDtBQUNEO0FBQ0Y7QUFyQlEsT0FBWDtBQXVCRDs7OzhCQUNVO0FBQUE7O0FBQ1QsV0FBSzFCLEtBQUwsR0FBYSxLQUFLQSxLQUFMLEdBQWEsQ0FBMUI7QUFDQVUsU0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBS2IsR0FBTCxHQUFXLDRCQURQO0FBRVRjLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQUZDO0FBTVRsQixjQUFNO0FBQ0ptQiwwQkFBZ0JMLEdBQUdJLGNBQUgsQ0FBa0IsWUFBbEIsQ0FEWjtBQUVKZCxpQkFBTyxLQUFLQSxLQUZSO0FBR0pDLGlCQUFPLEtBQUtBO0FBSFIsU0FORztBQVdUZSxnQkFBUSxNQVhDO0FBWVRDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSXRCLE9BQU9zQixJQUFJdEIsSUFBZjtBQUNBLGNBQUl1QixpQkFBT0MsV0FBUCxDQUFtQnhCLElBQW5CLENBQUosRUFBOEI7QUFDNUIsZ0JBQUlBLEtBQUtxQixPQUFMLEtBQWlCLEtBQXJCLEVBQTRCO0FBQzFCRSwrQkFBT1EsUUFBUCxDQUFnQi9CLEtBQUtnQyxPQUFyQjtBQUNELGFBRkQsTUFFTztBQUNMLG1CQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVgsSUFBSXRCLElBQUosQ0FBU3lCLE1BQVQsQ0FBZ0J2QixJQUFoQixDQUFxQmdDLE1BQXpDLEVBQWlERCxHQUFqRCxFQUFzRDtBQUNwRCx1QkFBSy9CLElBQUwsQ0FBVWlDLElBQVYsQ0FBZWIsSUFBSXRCLElBQUosQ0FBU3lCLE1BQVQsQ0FBZ0J2QixJQUFoQixDQUFxQitCLENBQXJCLENBQWY7QUFDRDtBQUNELHFCQUFLL0IsSUFBTCxHQUFZLE9BQUtBLElBQUwsQ0FBVXdCLEdBQVYsQ0FBYyxpQkFBUztBQUNqQ0Msc0JBQU1DLFVBQU4sR0FBbUJELE1BQU1DLFVBQU4sQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLEVBQTNCLENBQW5CO0FBQ0EsdUJBQU9GLEtBQVA7QUFDRCxlQUhXLENBQVo7QUFJQSxxQkFBS0csTUFBTDtBQUNEO0FBQ0Y7QUFDRjtBQTVCUSxPQUFYO0FBOEJEOzs7O0VBM0V5Q00sZUFBS0MsSTs7a0JBQTVCeEMsYyIsImZpbGUiOiJpbnRlZ3JhbC1yZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhbFJlY29yZCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+enr+WIhuiusOW9lSdcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNlbGVjdGVkOiAzLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBVUkw6ICcnLFxyXG4gICAgc3RhcnQ6IDEsXHJcbiAgICBsaW1pdDogMTBcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYmJhclxyXG4gIH1cclxuICBvblNob3cgKCkge1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoaXMuVVJMICsgJ3VzZXJNYW5hZ2UvZmluZFNjb3JlUmVjb3JkJyxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdXNlckN1c3RvbWVySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjdXN0b21lcklkJyksXHJcbiAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgdGhpcy5saXN0ID0gZGF0YS5yZXN1bHQubGlzdC5tYXAodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5jcmVhdGVUaW1lID0gdmFsdWUuY3JlYXRlVGltZS5zdWJzdHIoMCwgMTkpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGdldE1vcmUgKCkge1xyXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQgKyAxXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICd1c2VyTWFuYWdlL2ZpbmRTY29yZVJlY29yZCcsXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJDdXN0b21lcklkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VzdG9tZXJJZCcpLFxyXG4gICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5kYXRhLnJlc3VsdC5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gocmVzLmRhdGEucmVzdWx0Lmxpc3RbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0Lm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdmFsdWUuY3JlYXRlVGltZSA9IHZhbHVlLmNyZWF0ZVRpbWUuc3Vic3RyKDAsIDE5KVxyXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=