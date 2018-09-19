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

var Unpaid = function (_wepy$page) {
  _inherits(Unpaid, _wepy$page);

  function Unpaid() {
    _classCallCheck(this, Unpaid);

    var _this = _possibleConstructorReturn(this, (Unpaid.__proto__ || Object.getPrototypeOf(Unpaid)).call(this));

    _this.config = {
      navigationBarTitleText: '付款'
    };
    _this.$repeat = {};
    _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } };
    _this.$events = {};
    _this.components = {
      tabbar: _tabbar2.default
    };
    _this.data = {
      selected: 3,
      nodes: [{
        name: 'h2',
        children: [{
          type: 'text',
          text: ''
        }]
      }],
      nodes2: [{
        name: 'h1',
        children: [{
          type: 'text',
          text: ''
        }]
      }],
      URL: '',
      msg: '',
      type: '',
      res: ''
    };
    _this.methods = {
      pay: function pay() {
        var _this2 = this;

        if (this.res && this.res.data.success) {
          var data = this.res.data.result;
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function success(res) {
              wx.redirectTo({
                url: 'successpay?type=' + _this2.type + '&price=' + data.price
              });
            },
            'fail': function fail(res) {
              console.log('fail', res);
            }
          });
        } else {
          this.alertTip('请重新支付');
        }
      }
    };

    _this.confirmPayment = _this.confirmPayment.bind(_this);
    return _this;
  }

  _createClass(Unpaid, [{
    key: 'confirmPayment',
    value: function confirmPayment(res) {
      if (_common2.default.Interceptor(res.data)) {
        this.res = res;
        if (res.data.success) {
          var data = res.data.result;
          this.nodes2 = [{
            name: 'h1',
            children: [{
              type: 'text',
              text: '￥' + data.price
            }]
          }];
          this.$apply();
          this.nodes = [{
            name: 'h2',
            children: [{
              type: 'text',
              text: data.productDesc
            }]
          }];
          this.$apply();
        } else {
          this.alertTip('请重新支付');
        }
      }
    }
  }, {
    key: 'wxRequest',
    value: function wxRequest(url, data, func) {
      wx.request({
        url: this.URL + url,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: func
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      this.URL = this.$parent.globalData.URL;
      this.type = option.type + '';
      this.wxRequest('pay/buyService', { serviceId: option.serviceId }, this.confirmPayment);
    }
  }]);

  return Unpaid;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Unpaid , 'pages/unpaid'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVucGFpZC5qcyJdLCJuYW1lcyI6WyJVbnBhaWQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNlbGVjdGVkIiwibm9kZXMiLCJuYW1lIiwiY2hpbGRyZW4iLCJ0eXBlIiwidGV4dCIsIm5vZGVzMiIsIlVSTCIsIm1zZyIsInJlcyIsIm1ldGhvZHMiLCJwYXkiLCJzdWNjZXNzIiwicmVzdWx0Iiwid3giLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwicGF5U2lnbiIsInJlZGlyZWN0VG8iLCJ1cmwiLCJwcmljZSIsImNvbnNvbGUiLCJsb2ciLCJhbGVydFRpcCIsImNvbmZpcm1QYXltZW50IiwiYmluZCIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwiJGFwcGx5IiwicHJvZHVjdERlc2MiLCJmdW5jIiwicmVxdWVzdCIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kIiwib3B0aW9uIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3eFJlcXVlc3QiLCJzZXJ2aWNlSWQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7O0FBQ25CLG9CQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFJZkMsTUFKZSxHQUlOO0FBQ1BDLDhCQUF3QjtBQURqQixLQUpNO0FBQUEsVUFPaEJDLE9BUGdCLEdBT04sRUFQTTtBQUFBLFVBUWpCQyxNQVJpQixHQVFSLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEVBUlE7QUFBQSxVQVNqQkMsT0FUaUIsR0FTUCxFQVRPO0FBQUEsVUFVaEJDLFVBVmdCLEdBVUg7QUFDVkMsY0FBUUM7QUFERSxL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QWIsQ0FBd0JqQyxHQUFuQztBQUNBLFdBQUtILElBQUwsR0FBWWtDLE9BQU9sQyxJQUFQLEdBQWMsRUFBMUI7QUFDQSxXQUFLcUMsU0FBTCxDQUFlLGdCQUFmLEVBQWlDLEVBQUNDLFdBQVdKLE9BQU9JLFNBQW5CLEVBQWpDLEVBQWdFLEtBQUtmLGNBQXJFO0FBQ0Q7Ozs7RUFyR2lDZ0IsZUFBS0MsSTs7a0JBQXBCdEQsTSIsImZpbGUiOiJ1bnBhaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnBhaWQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuY29uZmlybVBheW1lbnQgPSB0aGlzLmNvbmZpcm1QYXltZW50LmJpbmQodGhpcylcclxuICB9XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S7mOasvidcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYmJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2VsZWN0ZWQ6IDMsXHJcbiAgICBub2RlczogW3tcclxuICAgICAgbmFtZTogJ2gyJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIHRleHQ6ICcnXHJcbiAgICAgIH1dXHJcbiAgICB9XSxcclxuICAgIG5vZGVzMjogW3tcclxuICAgICAgbmFtZTogJ2gxJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIHRleHQ6ICcnXHJcbiAgICAgIH1dXHJcbiAgICB9XSxcclxuICAgIFVSTDogJycsXHJcbiAgICBtc2c6ICcnLFxyXG4gICAgdHlwZTogJycsXHJcbiAgICByZXM6ICcnXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBwYXkgKCkge1xyXG4gICAgICBpZiAodGhpcy5yZXMgJiYgdGhpcy5yZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICd0aW1lU3RhbXAnOiBkYXRhLnRpbWVTdGFtcCxcclxuICAgICAgICAgICdub25jZVN0cic6IGRhdGEubm9uY2VTdHIsXHJcbiAgICAgICAgICAncGFja2FnZSc6IGRhdGEucGFja2FnZSxcclxuICAgICAgICAgICdzaWduVHlwZSc6IGRhdGEuc2lnblR5cGUsXHJcbiAgICAgICAgICAncGF5U2lnbic6IGRhdGEucGF5U2lnbixcclxuICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICB1cmw6ICdzdWNjZXNzcGF5P3R5cGU9JyArIHRoaXMudHlwZSArICcmcHJpY2U9JyArIGRhdGEucHJpY2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnLCByZXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFsZXJ0VGlwKCfor7fph43mlrDmlK/ku5gnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbmZpcm1QYXltZW50IChyZXMpIHtcclxuICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IocmVzLmRhdGEpKSB7XHJcbiAgICAgIHRoaXMucmVzID0gcmVzXHJcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5yZXN1bHRcclxuICAgICAgICB0aGlzLm5vZGVzMiA9IFt7XHJcbiAgICAgICAgICBuYW1lOiAnaDEnLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgdGV4dDogJ++/pScgKyBkYXRhLnByaWNlXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH1dXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHRoaXMubm9kZXMgPSBbe1xyXG4gICAgICAgICAgbmFtZTogJ2gyJyxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6IGRhdGEucHJvZHVjdERlc2NcclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfV1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hbGVydFRpcCgn6K+36YeN5paw5pSv5LuYJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB3eFJlcXVlc3QgKHVybCwgZGF0YSwgZnVuYykge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmNcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uTG9hZChvcHRpb24pIHtcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB0aGlzLnR5cGUgPSBvcHRpb24udHlwZSArICcnXHJcbiAgICB0aGlzLnd4UmVxdWVzdCgncGF5L2J1eVNlcnZpY2UnLCB7c2VydmljZUlkOiBvcHRpb24uc2VydmljZUlkfSwgdGhpcy5jb25maXJtUGF5bWVudClcclxuICB9XHJcbn1cclxuIl19