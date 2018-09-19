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

var Cart = function (_wepy$page) {
  _inherits(Cart, _wepy$page);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '产品'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 2,
      IMGURLEDIT: '',
      list: [],
      start: 1,
      limit: 10,
      goodsId: '',
      URL: '',
      IMGURL: '',
      priceSort: true,
      orderMethod: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cart, [{
    key: 'onShow',
    value: function onShow() {
      wx.showShareMenu({
        withShareTicket: true
      });
      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 页面展示
      this.backData({
        orderType: 0,
        orderMethod: 0,
        start: 1,
        limit: this.start * this.limit
      });
    }
  }, {
    key: 'goodsdel',
    value: function goodsdel(e) {
      var _this2 = this;

      this.goodsId = e.currentTarget.dataset.id;
      wx.showModal({
        title: '提示',
        content: '确定删除该商品吗?',
        success: function success(res) {
          if (res.confirm) {
            _this2.comRequest('delectGoods');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }, {
    key: 'goodstop',
    value: function goodstop(e) {
      var _this3 = this;

      this.goodsId = e.currentTarget.dataset.id;
      wx.showModal({
        title: '提示',
        content: '确定置顶该商品吗?',
        success: function success(res) {
          if (res.confirm) {
            _this3.comRequest('stick');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
    // 商品的删除置顶方法

  }, {
    key: 'comRequest',
    value: function comRequest(urL) {
      var _this4 = this;

      wx.request({
        url: this.URL + 'goods/' + urL,
        method: 'POST',
        data: {
          id: this.goodsId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              _this4.backData({
                orderType: 0,
                orderMethod: 0,
                start: 1,
                limit: _this4.start * _this4.limit
              });
            }
          }
        },
        fail: function fail(res) {
          console.log(res);
        }
      });
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this5 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      wx.request({
        url: this.URL + 'goods/findGoods',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            _this5.list = data.result.list;
            _this5.$apply();
          }
        },
        fail: function fail(res) {
          console.log(res);
        }
      });
    }
    // 查看更多

  }, {
    key: 'getMore',
    value: function getMore() {
      var _this6 = this;

      this.start = this.start + 1;
      wx.request({
        url: this.URL + 'goods/findGoods',
        method: 'POST',
        data: {
          orderType: 0,
          orderMethod: 0,
          start: this.start,
          limit: this.limit
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.result.list.length <= 0) {
              _common2.default.tipAlert('没有更多数据了');
            } else {
              for (var i = 0; i < data.result.list.length; i++) {
                _this6.list.push(data.result.list[i]);
              }
              _this6.$apply();
            }
          }
        }
      });
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/editgoods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRnb29kcy5qcyJdLCJuYW1lcyI6WyJDYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYmJhciIsImRhdGEiLCJzZWxlY3RlZCIsIklNR1VSTEVESVQiLCJsaXN0Iiwic3RhcnQiLCJsaW1pdCIsImdvb2RzSWQiLCJVUkwiLCJJTUdVUkwiLCJwcmljZVNvcnQiLCJvcmRlck1ldGhvZCIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYmFja0RhdGEiLCJvcmRlclR5cGUiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29tUmVxdWVzdCIsImNhbmNlbCIsImNvbnNvbGUiLCJsb2ciLCJ1ckwiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21tb24iLCJJbnRlcmNlcHRvciIsInRpcEFsZXJ0IiwibWVzc2FnZSIsImZhaWwiLCJyZXN1bHQiLCIkYXBwbHkiLCJsZW5ndGgiLCJpIiwicHVzaCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQVk7QUFDUEMsY0FBUUM7QUFERCxLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FB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QUosRUFBOEI7QUFDNUIsZ0JBQUlBLEtBQUsyQyxNQUFMLENBQVl4QyxJQUFaLENBQWlCMEMsTUFBakIsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDaENQLCtCQUFPRSxRQUFQLENBQWdCLFNBQWhCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsbUJBQUssSUFBSU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJOUMsS0FBSzJDLE1BQUwsQ0FBWXhDLElBQVosQ0FBaUIwQyxNQUFyQyxFQUE2Q0MsR0FBN0MsRUFBa0Q7QUFDaEQsdUJBQUszQyxJQUFMLENBQVU0QyxJQUFWLENBQWUvQyxLQUFLMkMsTUFBTCxDQUFZeEMsSUFBWixDQUFpQjJDLENBQWpCLENBQWY7QUFDRDtBQUNELHFCQUFLRixNQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBekJRLE9BQVg7QUEyQkQ7Ozs7RUF0SitCSSxlQUFLQyxJOztrQkFBbEIxRCxJIiwiZmlsZSI6ImVkaXRnb29kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbiAgaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqflk4EnXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cz0ge1xyXG4gICAgICB0YWJiYXI6IFRhYmJhclxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDIsXHJcbiAgICAgIElNR1VSTEVESVQ6ICcnLFxyXG4gICAgICBsaXN0OiBbXSxcclxuICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgIGxpbWl0OiAxMCxcclxuICAgICAgZ29vZHNJZDogJycsXHJcbiAgICAgIFVSTDogJycsXHJcbiAgICAgIElNR1VSTDogJycsXHJcbiAgICAgIHByaWNlU29ydDogdHJ1ZSxcclxuICAgICAgb3JkZXJNZXRob2Q6IG51bGxcclxuICAgIH1cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIOiOt+WPluWFqOWxgOeahHVybFxyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICB0aGlzLklNR1VSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTFxyXG4gICAgICB0aGlzLklNR1VSTEVESVQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxFRElUXHJcbiAgICAgIC8vIOmhtemdouWxleekulxyXG4gICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICBvcmRlclR5cGU6IDAsXHJcbiAgICAgICAgb3JkZXJNZXRob2Q6IDAsXHJcbiAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMuc3RhcnQgKiB0aGlzLmxpbWl0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnb29kc2RlbCAoZSkge1xyXG4gICAgICB0aGlzLmdvb2RzSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn56Gu5a6a5Yig6Zmk6K+l5ZWG5ZOB5ZCXPycsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tUmVxdWVzdCgnZGVsZWN0R29vZHMnKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGdvb2RzdG9wIChlKSB7XHJcbiAgICAgIHRoaXMuZ29vZHNJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfnoa7lrprnva7pobbor6XllYblk4HlkJc/JyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5jb21SZXF1ZXN0KCdzdGljaycpXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5ZWG5ZOB55qE5Yig6Zmk572u6aG25pa55rOVXHJcbiAgICBjb21SZXF1ZXN0ICh1ckwpIHtcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdnb29kcy8nICsgdXJMLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGlkOiB0aGlzLmdvb2RzSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLmJhY2tEYXRhKHtcclxuICAgICAgICAgICAgICAgIG9yZGVyVHlwZTogMCxcclxuICAgICAgICAgICAgICAgIG9yZGVyTWV0aG9kOiAwLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5zdGFydCAqIHRoaXMubGltaXRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Zue5pi+5pWw5o2uXHJcbiAgICBiYWNrRGF0YSAoZGF0YSA9IHt9KSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnZ29vZHMvZmluZEdvb2RzJyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGEucmVzdWx0Lmxpc3RcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOafpeeci+abtOWkmlxyXG4gICAgZ2V0TW9yZSAoKSB7XHJcbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0ICsgMVxyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ2dvb2RzL2ZpbmRHb29kcycsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgb3JkZXJUeXBlOiAwLFxyXG4gICAgICAgICAgb3JkZXJNZXRob2Q6IDAsXHJcbiAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQubGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5rKh5pyJ5pu05aSa5pWw5o2u5LqGJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGRhdGEucmVzdWx0Lmxpc3RbaV0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==