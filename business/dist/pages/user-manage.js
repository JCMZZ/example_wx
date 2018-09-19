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
// import api from '../api/api'


var UserManage = function (_wepy$page) {
  _inherits(UserManage, _wepy$page);

  function UserManage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UserManage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserManage.__proto__ || Object.getPrototypeOf(UserManage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '用户管理'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      list: [],
      URL: '',
      IMGURL: '',
      start: 1,
      limit: 10
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UserManage, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      wx.request({
        url: this.URL + 'userManage/customerList',
        data: {
          start: 1,
          limit: this.start * this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
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
  }, {
    key: 'getCustomerid',
    value: function getCustomerid(e) {
      // 存储customerId
      wx.setStorageSync('customerId', e.currentTarget.dataset.id);
    }
  }, {
    key: 'getMore',
    value: function getMore() {
      var _this3 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'userManage/customerList',
        data: {
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length <= 0) {
              _common2.default.tipAlert('没有更多数据了');
            } else {
              for (var i = 0; i < data.result.list.length; i++) {
                _this3.list.push(data.result.list[i]);
              }
              _this3.$apply();
            }
          }
        }
      });
    }
  }]);

  return UserManage;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(UserManage , 'pages/user-manage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItbWFuYWdlLmpzIl0sIm5hbWVzIjpbIlVzZXJNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNlbGVjdGVkIiwibGlzdCIsIlVSTCIsIklNR1VSTCIsInN0YXJ0IiwibGltaXQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwicmVzdWx0IiwiJGFwcGx5IiwiZSIsInNldFN0b3JhZ2VTeW5jIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImxlbmd0aCIsInRpcEFsZXJ0IiwiaSIsInB1c2giLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRkE7OztJQUdxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGNBQVFDO0FBREUsSyxRQUdaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsV0FBSyxFQUhBO0FBSUxDLGNBQVEsRUFKSDtBQUtMQyxhQUFPLENBTEY7QUFNTEMsYUFBTztBQU5GLEs7Ozs7OzZCQVFHO0FBQUE7O0FBQ1IsV0FBS0gsR0FBTCxHQUFXLEtBQUtJLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkwsR0FBbkM7QUFDQSxXQUFLQyxNQUFMLEdBQWMsS0FBS0csT0FBTCxDQUFhQyxVQUFiLENBQXdCSixNQUF0QztBQUNBSyxTQUFHQyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLUixHQUFMLEdBQVcseUJBRFA7QUFFVEgsY0FBTTtBQUNKSyxpQkFBTyxDQURIO0FBRUpDLGlCQUFPLEtBQUtELEtBQUwsR0FBYSxLQUFLQztBQUZyQixTQUZHO0FBTVRNLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQU5DO0FBVVRDLGdCQUFRLE1BVkM7QUFXVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJaEIsT0FBT2dCLElBQUloQixJQUFmO0FBQ0EsY0FBSWlCLGlCQUFPQyxXQUFQLENBQW1CbEIsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixtQkFBS0UsSUFBTCxHQUFZRixLQUFLbUIsTUFBTCxDQUFZakIsSUFBeEI7QUFDQSxtQkFBS2tCLE1BQUw7QUFDRDtBQUNGO0FBakJRLE9BQVg7QUFtQkQ7OztrQ0FDY0MsQyxFQUFHO0FBQ2hCO0FBQ0FaLFNBQUdhLGNBQUgsQ0FBa0IsWUFBbEIsRUFBZ0NELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxFQUF4RDtBQUNEOzs7OEJBQ1U7QUFBQTs7QUFDVCxXQUFLcEIsS0FBTCxHQUFhLEtBQUtBLEtBQUwsR0FBYSxDQUExQjtBQUNBSSxTQUFHQyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLUixHQUFMLEdBQVcseUJBRFA7QUFFVEgsY0FBTTtBQUNKSyxpQkFBTyxLQUFLQSxLQURSO0FBRUpDLGlCQUFPLEtBQUtBO0FBRlIsU0FGRztBQU1UTSxnQkFBUTtBQUNOLDBCQUFnQixpREFEVjtBQUVOLHVCQUFhSCxHQUFHSSxjQUFILENBQWtCLFdBQWxCO0FBRlAsU0FOQztBQVVUQyxnQkFBUSxNQVZDO0FBV1RDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSWhCLE9BQU9nQixJQUFJaEIsSUFBZjtBQUNBLGNBQUlpQixpQkFBT0MsV0FBUCxDQUFtQmxCLElBQW5CLENBQUosRUFBOEI7QUFDNUIsZ0JBQUlBLEtBQUttQixNQUFMLENBQVlqQixJQUFaLENBQWlCd0IsTUFBakIsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDaENULCtCQUFPVSxRQUFQLENBQWdCLFNBQWhCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsbUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNUIsS0FBS21CLE1BQUwsQ0FBWWpCLElBQVosQ0FBaUJ3QixNQUFyQyxFQUE2Q0UsR0FBN0MsRUFBa0Q7QUFDaEQsdUJBQUsxQixJQUFMLENBQVUyQixJQUFWLENBQWU3QixLQUFLbUIsTUFBTCxDQUFZakIsSUFBWixDQUFpQjBCLENBQWpCLENBQWY7QUFDRDtBQUNELHFCQUFLUixNQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBdkJRLE9BQVg7QUF5QkQ7Ozs7RUF4RXFDVSxlQUFLQyxJOztrQkFBeEJ4QyxVIiwiZmlsZSI6InVzZXItbWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbi8vIGltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyTWFuYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55So5oi3566h55CGJ1xyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIElNR1VSTDogJycsXHJcbiAgICBzdGFydDogMSxcclxuICAgIGxpbWl0OiAxMFxyXG4gIH1cclxuICBvblNob3cgKCkge1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgIHRoaXMuSU1HVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICd1c2VyTWFuYWdlL2N1c3RvbWVyTGlzdCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdGFydDogMSxcclxuICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgfSxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhLnJlc3VsdC5saXN0XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBnZXRDdXN0b21lcmlkIChlKSB7XHJcbiAgICAvLyDlrZjlgqhjdXN0b21lcklkXHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnY3VzdG9tZXJJZCcsIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKVxyXG4gIH1cclxuICBnZXRNb3JlICgpIHtcclxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAndXNlck1hbmFnZS9jdXN0b21lckxpc3QnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgfSxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+ayoeacieabtOWkmuaVsOaNruS6hicpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhLnJlc3VsdC5saXN0W2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==