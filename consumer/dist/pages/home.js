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

var Home = function (_wepy$page) {
  _inherits(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '首页'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 1,
      URL: '',
      IMGURL: '',
      src: [],
      telnumber: '',
      address: '',
      txtvalue: '',
      adLinkPath: '', // 图片链接路径
      adImagePath: '' // 图片路径
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'phone',
    value: function phone() {
      wx.makePhoneCall({
        phoneNumber: this.telnumber
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.IMGURL = this.$parent.globalData.IMGURL;
      wx.showShareMenu({
        withShareTicket: true
      });
      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      // 回显数据
      wx.request({
        url: this.URL + 'store/selectStore',
        method: 'POST',
        data: {
          storeId: this.$parent.globalData.storeId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'storeId': this.$parent.globalData.storeId,
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          var result = data.result;
          if (data.success) {
            _this2.src = result.imgList || [];
            _this2.telnumber = result.mobile || '';
            _this2.txtvalue = result.describe || '';
            _this2.address = result.address || '';
            _this2.dimension = result.dimension || '';
            _this2.longitude = result.longitude || '';
            _this2.adLinkPath = result.adLinkPath || '';
            _this2.adImagePath = result.adImagePath || '';
            _this2.$apply();
          }
        },
        fail: function fail(res) {
          console.log(res);
        }
      });
    }
    // 图片点击事件

  }, {
    key: 'handlebanner',
    value: function handlebanner() {
      if (this.adLinkPath !== '') {
        wx.navigateTo({
          url: 'out?adLinkPath=' + this.adLinkPath
        });
      }
    }
  }]);

  return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJVUkwiLCJJTUdVUkwiLCJzcmMiLCJ0ZWxudW1iZXIiLCJhZGRyZXNzIiwidHh0dmFsdWUiLCJhZExpbmtQYXRoIiwiYWRJbWFnZVBhdGgiLCJ3eCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJzdG9yZUlkIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJzdWNjZXNzIiwicmVzIiwicmVzdWx0IiwiaW1nTGlzdCIsIm1vYmlsZSIsImRlc2NyaWJlIiwiZGltZW5zaW9uIiwibG9uZ2l0dWRlIiwiJGFwcGx5IiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkMsY0FBUUM7QUFEQSxLLFFBR1ZDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLFdBQUssRUFGQTtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsV0FBSyxFQUpBO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGdCQUFVLEVBUEw7QUFRTEMsa0JBQVksRUFSUCxFQVFXO0FBQ2hCQyxtQkFBYSxFQVRSLENBU1c7QUFUWCxLOzs7Ozs0QkFXRTtBQUNQQyxTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHFCQUFhLEtBQUtQO0FBREgsT0FBakI7QUFHRDs7OzZCQUNTO0FBQUE7O0FBQ1IsV0FBS0YsTUFBTCxHQUFjLEtBQUtVLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlgsTUFBdEM7QUFDQU8sU0FBR0ssYUFBSCxDQUFpQjtBQUNmQyx5QkFBaUI7QUFERixPQUFqQjtBQUdBO0FBQ0EsV0FBS2QsR0FBTCxHQUFXLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlosR0FBbkM7QUFDQTtBQUNBUSxTQUFHTyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLaEIsR0FBTCxHQUFXLG1CQURQO0FBRVRpQixnQkFBUSxNQUZDO0FBR1RuQixjQUFNO0FBQ0pvQixtQkFBUyxLQUFLUCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JNO0FBRDdCLFNBSEc7QUFNVEMsZ0JBQVE7QUFDTiwwQkFBZ0IsaURBRFY7QUFFTixxQkFBVyxLQUFLUixPQUFMLENBQWFDLFVBQWIsQ0FBd0JNLE9BRjdCO0FBR04sdUJBQWFWLEdBQUdZLGNBQUgsQ0FBa0IsV0FBbEI7QUFIUCxTQU5DO0FBV1RDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSXhCLE9BQU93QixJQUFJeEIsSUFBZjtBQUNBLGNBQUl5QixTQUFTekIsS0FBS3lCLE1BQWxCO0FBQ0EsY0FBSXpCLEtBQUt1QixPQUFULEVBQWtCO0FBQ2hCLG1CQUFLbkIsR0FBTCxHQUFXcUIsT0FBT0MsT0FBUCxJQUFrQixFQUE3QjtBQUNBLG1CQUFLckIsU0FBTCxHQUFpQm9CLE9BQU9FLE1BQVAsSUFBaUIsRUFBbEM7QUFDQSxtQkFBS3BCLFFBQUwsR0FBZ0JrQixPQUFPRyxRQUFQLElBQW1CLEVBQW5DO0FBQ0EsbUJBQUt0QixPQUFMLEdBQWVtQixPQUFPbkIsT0FBUCxJQUFrQixFQUFqQztBQUNBLG1CQUFLdUIsU0FBTCxHQUFpQkosT0FBT0ksU0FBUCxJQUFvQixFQUFyQztBQUNBLG1CQUFLQyxTQUFMLEdBQWlCTCxPQUFPSyxTQUFQLElBQW9CLEVBQXJDO0FBQ0EsbUJBQUt0QixVQUFMLEdBQWtCaUIsT0FBT2pCLFVBQVAsSUFBcUIsRUFBdkM7QUFDQSxtQkFBS0MsV0FBTCxHQUFtQmdCLE9BQU9oQixXQUFQLElBQXNCLEVBQXpDO0FBQ0EsbUJBQUtzQixNQUFMO0FBQ0Q7QUFDRixTQXpCUTtBQTBCVEMsY0FBTSxjQUFVUixHQUFWLEVBQWU7QUFDbkJTLGtCQUFRQyxHQUFSLENBQVlWLEdBQVo7QUFDRDtBQTVCUSxPQUFYO0FBOEJEO0FBQ0Q7Ozs7bUNBQ2U7QUFDYixVQUFJLEtBQUtoQixVQUFMLEtBQW9CLEVBQXhCLEVBQTRCO0FBQzFCRSxXQUFHeUIsVUFBSCxDQUFjO0FBQ1pqQixlQUFLLG9CQUFvQixLQUFLVjtBQURsQixTQUFkO0FBR0Q7QUFDRjs7OztFQXhFK0I0QixlQUFLQyxJOztrQkFBbEI5QyxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1J1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzZWxlY3RlZDogMSxcclxuICAgICAgVVJMOiAnJyxcclxuICAgICAgSU1HVVJMOiAnJyxcclxuICAgICAgc3JjOiBbXSxcclxuICAgICAgdGVsbnVtYmVyOiAnJyxcclxuICAgICAgYWRkcmVzczogJycsXHJcbiAgICAgIHR4dHZhbHVlOiAnJyxcclxuICAgICAgYWRMaW5rUGF0aDogJycsIC8vIOWbvueJh+mTvuaOpei3r+W+hFxyXG4gICAgICBhZEltYWdlUGF0aDogJycgLy8g5Zu+54mH6Lev5b6EXHJcbiAgICB9XHJcbiAgICBwaG9uZSAoKSB7XHJcbiAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xyXG4gICAgICAgIHBob25lTnVtYmVyOiB0aGlzLnRlbG51bWJlclxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgdGhpcy5JTUdVUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxcclxuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIOiOt+WPluWFqOWxgOeahHVybFxyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICAvLyDlm57mmL7mlbDmja5cclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdzdG9yZS9zZWxlY3RTdG9yZScsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgc3RvcmVJZDogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzdG9yZUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZCxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGxldCByZXN1bHQgPSBkYXRhLnJlc3VsdFxyXG4gICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNyYyA9IHJlc3VsdC5pbWdMaXN0IHx8IFtdXHJcbiAgICAgICAgICAgIHRoaXMudGVsbnVtYmVyID0gcmVzdWx0Lm1vYmlsZSB8fCAnJ1xyXG4gICAgICAgICAgICB0aGlzLnR4dHZhbHVlID0gcmVzdWx0LmRlc2NyaWJlIHx8ICcnXHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IHJlc3VsdC5hZGRyZXNzIHx8ICcnXHJcbiAgICAgICAgICAgIHRoaXMuZGltZW5zaW9uID0gcmVzdWx0LmRpbWVuc2lvbiB8fCAnJ1xyXG4gICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGUgfHwgJydcclxuICAgICAgICAgICAgdGhpcy5hZExpbmtQYXRoID0gcmVzdWx0LmFkTGlua1BhdGggfHwgJydcclxuICAgICAgICAgICAgdGhpcy5hZEltYWdlUGF0aCA9IHJlc3VsdC5hZEltYWdlUGF0aCB8fCAnJ1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Zu+54mH54K55Ye75LqL5Lu2XHJcbiAgICBoYW5kbGViYW5uZXIoKSB7XHJcbiAgICAgIGlmICh0aGlzLmFkTGlua1BhdGggIT09ICcnKSB7XHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdvdXQ/YWRMaW5rUGF0aD0nICsgdGhpcy5hZExpbmtQYXRoXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19