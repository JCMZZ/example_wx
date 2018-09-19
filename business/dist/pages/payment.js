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

var Payment = function (_wepy$page) {
  _inherits(Payment, _wepy$page);

  function Payment() {
    _classCallCheck(this, Payment);

    var _this = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this));

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

    _this.getPayData = _this.getPayData.bind(_this);
    _this.confirmPayment = _this.confirmPayment.bind(_this);
    return _this;
  }

  _createClass(Payment, [{
    key: 'getPayData',
    value: function getPayData(res) {
      var data = res.data;
      if (_common2.default.Interceptor(data)) {
        if (data.success) {
          this.wxRequest('pay/buyService', { serviceId: data.result.id }, this.confirmPayment);
        } else {
          this.alertTip('请重新支付');
        }
      }
    }
  }, {
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
      this.msg = option.msg;
      if (this.type === '3') {
        var customers = wx.getStorageSync('selfrcmd').filter(function (value) {
          return value.checked;
        });
        var customerIds = customers.map(function (value) {
          return value.id;
        }).join();
        this.wxRequest('service/ownBatch', { customerIds: customerIds, content: this.msg }, this.getPayData);
      } else {
        this.wxRequest('service/batch', { serviceId: wx.getStorageSync('serviceId'), content: this.msg }, this.getPayData);
      }
    }
  }]);

  return Payment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Payment , 'pages/payment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnQuanMiXSwibmFtZXMiOlsiUGF5bWVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJub2RlcyIsIm5hbWUiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwibm9kZXMyIiwiVVJMIiwibXNnIiwicmVzIiwibWV0aG9kcyIsInBheSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJ3eCIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwicmVkaXJlY3RUbyIsInVybCIsInByaWNlIiwiY29uc29sZSIsImxvZyIsImFsZXJ0VGlwIiwiZ2V0UGF5RGF0YSIsImJpbmQiLCJjb25maXJtUGF5bWVudCIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwid3hSZXF1ZXN0Iiwic2VydmljZUlkIiwiaWQiLCIkYXBwbHkiLCJwcm9kdWN0RGVzYyIsImZ1bmMiLCJyZXF1ZXN0IiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZXRob2QiLCJvcHRpb24iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImN1c3RvbWVycyIsImZpbHRlciIsInZhbHVlIiwiY2hlY2tlZCIsImN1c3RvbWVySWRzIiwibWFwIiwiam9pbiIsImNvbnRlbnQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7O0FBQ25CLHFCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFLZkMsTUFMZSxHQUtOO0FBQ1BDLDhCQUF3QjtBQURqQixLQUxNO0FBQUEsVUFRaEJDLE9BUmdCLEdBUU4sRUFSTTtBQUFBLFVBU2pCQyxNQVRpQixHQVNSLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVB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QUFnQyxFQUFDQyxXQUFXbkIsR0FBRzBCLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBWixFQUE0Q1ksU0FBUyxLQUFLNUMsR0FBMUQsRUFBaEMsRUFBZ0csS0FBS21CLFVBQXJHO0FBQ0Q7QUFDRjs7OztFQTNIa0MwQixlQUFLQyxJOztrQkFBckJoRSxPIiwiZmlsZSI6InBheW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXltZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmdldFBheURhdGEgPSB0aGlzLmdldFBheURhdGEuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5jb25maXJtUGF5bWVudCA9IHRoaXMuY29uZmlybVBheW1lbnQuYmluZCh0aGlzKVxyXG4gIH1cclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LuY5qy+J1xyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIG5vZGVzOiBbe1xyXG4gICAgICBuYW1lOiAnaDInLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgdGV4dDogJydcclxuICAgICAgfV1cclxuICAgIH1dLFxyXG4gICAgbm9kZXMyOiBbe1xyXG4gICAgICBuYW1lOiAnaDEnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgdGV4dDogJydcclxuICAgICAgfV1cclxuICAgIH1dLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIG1zZzogJycsXHJcbiAgICB0eXBlOiAnJyxcclxuICAgIHJlczogJydcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHBheSAoKSB7XHJcbiAgICAgIGlmICh0aGlzLnJlcyAmJiB0aGlzLnJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucmVzLmRhdGEucmVzdWx0XHJcbiAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgJ3RpbWVTdGFtcCc6IGRhdGEudGltZVN0YW1wLFxyXG4gICAgICAgICAgJ25vbmNlU3RyJzogZGF0YS5ub25jZVN0cixcclxuICAgICAgICAgICdwYWNrYWdlJzogZGF0YS5wYWNrYWdlLFxyXG4gICAgICAgICAgJ3NpZ25UeXBlJzogZGF0YS5zaWduVHlwZSxcclxuICAgICAgICAgICdwYXlTaWduJzogZGF0YS5wYXlTaWduLFxyXG4gICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgIHVybDogJ3N1Y2Nlc3NwYXk/dHlwZT0nICsgdGhpcy50eXBlICsgJyZwcmljZT0nICsgZGF0YS5wcmljZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIHJlcylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYWxlcnRUaXAoJ+ivt+mHjeaWsOaUr+S7mCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0UGF5RGF0YSAocmVzKSB7XHJcbiAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICB0aGlzLnd4UmVxdWVzdCgncGF5L2J1eVNlcnZpY2UnLCB7c2VydmljZUlkOiBkYXRhLnJlc3VsdC5pZH0sIHRoaXMuY29uZmlybVBheW1lbnQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hbGVydFRpcCgn6K+36YeN5paw5pSv5LuYJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25maXJtUGF5bWVudCAocmVzKSB7XHJcbiAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKHJlcy5kYXRhKSkge1xyXG4gICAgICB0aGlzLnJlcyA9IHJlc1xyXG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEucmVzdWx0XHJcbiAgICAgICAgdGhpcy5ub2RlczIgPSBbe1xyXG4gICAgICAgICAgbmFtZTogJ2gxJyxcclxuICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6ICfvv6UnICsgZGF0YS5wcmljZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9XVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLm5vZGVzID0gW3tcclxuICAgICAgICAgIG5hbWU6ICdoMicsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB0ZXh0OiBkYXRhLnByb2R1Y3REZXNjXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH1dXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYWxlcnRUaXAoJ+ivt+mHjeaWsOaUr+S7mCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgd3hSZXF1ZXN0ICh1cmwsIGRhdGEsIGZ1bmMpIHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoaXMuVVJMICsgdXJsLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jXHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgdGhpcy50eXBlID0gb3B0aW9uLnR5cGUgKyAnJ1xyXG4gICAgdGhpcy5tc2cgPSBvcHRpb24ubXNnXHJcbiAgICBpZiAodGhpcy50eXBlID09PSAnMycpIHtcclxuICAgICAgbGV0IGN1c3RvbWVycyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZWxmcmNtZCcpLmZpbHRlcih2YWx1ZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNoZWNrZWRcclxuICAgICAgfSlcclxuICAgICAgbGV0IGN1c3RvbWVySWRzID0gY3VzdG9tZXJzLm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmlkXHJcbiAgICAgIH0pLmpvaW4oKVxyXG4gICAgICB0aGlzLnd4UmVxdWVzdCgnc2VydmljZS9vd25CYXRjaCcsIHtjdXN0b21lcklkcywgY29udGVudDogdGhpcy5tc2d9LCB0aGlzLmdldFBheURhdGEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnd4UmVxdWVzdCgnc2VydmljZS9iYXRjaCcsIHtzZXJ2aWNlSWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXJ2aWNlSWQnKSwgY29udGVudDogdGhpcy5tc2d9LCB0aGlzLmdldFBheURhdGEpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==