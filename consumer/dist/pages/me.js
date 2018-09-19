'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _base = require('./../images/base64.js');

var _base2 = _interopRequireDefault(_base);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_wepy$page) {
  _inherits(Me, _wepy$page);

  function Me() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      URL: '',
      IMGURL: '',
      selected: 3,
      lists: [{
        text: '账户余额',
        src: 'balance.png',
        url: 'banlance-details'
      }, {
        text: '会员卡',
        src: 'bankcard.png',
        url: 'card-manage'
      }, {
        text: '我的积分',
        src: 'score.png',
        url: 'integral-record'
      }],
      nickname: '',
      cardnumber: '',
      balance: '',
      score: '',
      avatarUrl: '',
      icon: '',
      // 授权部分数据
      code: '',
      encryptedData: '',
      iv: '',
      rawData: '',
      signature: '',
      userInfo: {},
      sessionId: '',
      isReg: '',
      islogin: false
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.config = {
      navigationBarTitleText: '我的'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Me, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.icon = _base2.default.icon20;
      wx.login({
        // 获取code
        success: function success(res) {
          var JSCODE = res.code; // 返回code
          _this2.code = JSCODE;
          _this2.$apply();
        }
      });
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      // 展示我的页面
      this.backData();
    }
  }, {
    key: 'getUserinfo',
    value: function getUserinfo(e) {
      var _this3 = this;

      if (e.detail.userInfo) {
        this.encryptedData = e.detail.encryptedData;
        this.iv = e.detail.iv;
        this.rawData = e.detail.rawData;
        this.signature = e.detail.signature;
        this.userInfo = e.detail.userInfo;
        this.nickName = e.detail.userInfo.nickName;
        wx.request({
          url: this.URL + 'wxLoginAuth',
          data: {
            code: this.code,
            encryptedData: this.encryptedData,
            iv: this.iv,
            rawData: this.rawData,
            signature: this.signature,
            userInfo: this.userInfo
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'storeId': this.$parent.globalData.storeId
          },
          method: 'POST',
          success: function success(res) {
            if (res.data.success === false) {
              _common2.default.tipAlert(res.data.message);
            } else {
              // 在这里赋值并存储sessionId
              _this3.sessionId = res.data.result.sessionId;
              _this3.isReg = res.data.result.isReg;
              wx.setStorageSync('sessionId', _this3.sessionId);
              if (_this3.isReg === false) {
                wx.navigateTo({
                  url: 'register'
                });
              } else {
                wx.redirectTo({
                  url: 'me'
                });
              }
            }
          },
          fail: function fail() {
            console.log('me页请求失败');
          }
        });
      }
    }
  }, {
    key: 'setting',
    value: function setting() {
      // 显示小程序当前设置权限的界面
      wx.openSetting({
        success: function success(res) {
          res.authSetting = {
            'scope.userInfo': true,
            'scope.userLocation': true,
            'scope.camera': false
          };
        }
      });
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this4 = this;

      wx.request({
        url: this.URL + 'customer/findCustomer',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'storeId': this.$parent.globalData.storeId,
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          var result = data.result;
          if (result !== null) {
            if (result.isLogin === false) {
              _this4.islogin = result.isLogin;
              wx.setStorageSync('islogin', result.isLogin);
            } else {
              _this4.nickname = result.nickname;
              _this4.cardnumber = result.number;
              _this4.score = result.score;
              _this4.balance = result.balance;
              _this4.avatarUrl = result.customerHead;
              _this4.islogin = '';
              wx.removeStorageSync('islogin');
            }
          }
        }
      });
    }
  }]);

  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiZGF0YSIsIlVSTCIsIklNR1VSTCIsInNlbGVjdGVkIiwibGlzdHMiLCJ0ZXh0Iiwic3JjIiwidXJsIiwibmlja25hbWUiLCJjYXJkbnVtYmVyIiwiYmFsYW5jZSIsInNjb3JlIiwiYXZhdGFyVXJsIiwiaWNvbiIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwidXNlckluZm8iLCJzZXNzaW9uSWQiLCJpc1JlZyIsImlzbG9naW4iLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFzZTY0IiwiaWNvbjIwIiwid3giLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJKU0NPREUiLCIkYXBwbHkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImJhY2tEYXRhIiwiZSIsImRldGFpbCIsIm5pY2tOYW1lIiwicmVxdWVzdCIsImhlYWRlciIsInN0b3JlSWQiLCJtZXRob2QiLCJjb21tb24iLCJ0aXBBbGVydCIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJyZWRpcmVjdFRvIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJvcGVuU2V0dGluZyIsImF1dGhTZXR0aW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJpc0xvZ2luIiwibnVtYmVyIiwiY3VzdG9tZXJIZWFkIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxFOzs7Ozs7Ozs7Ozs7Ozs4S0FDbkJDLEksR0FBTTtBQUNKQyxXQUFLLEVBREQ7QUFFSkMsY0FBUSxFQUZKO0FBR0pDLGdCQUFVLENBSE47QUFJSkMsYUFBTyxDQUNMO0FBQ0VD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U0FBU3BELEtBQUtvRCxNQUFsQjtBQUNBLGNBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNuQixnQkFBSUEsT0FBT1UsT0FBUCxLQUFtQixLQUF2QixFQUE4QjtBQUM1QixxQkFBS3hDLE9BQUwsR0FBZThCLE9BQU9VLE9BQXRCO0FBQ0E3QixpQkFBR29CLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJELE9BQU9VLE9BQXBDO0FBQ0QsYUFIRCxNQUdPO0FBQ0wscUJBQUt0RCxRQUFMLEdBQWdCNEMsT0FBTzVDLFFBQXZCO0FBQ0EscUJBQUtDLFVBQUwsR0FBa0IyQyxPQUFPVyxNQUF6QjtBQUNBLHFCQUFLcEQsS0FBTCxHQUFheUMsT0FBT3pDLEtBQXBCO0FBQ0EscUJBQUtELE9BQUwsR0FBZTBDLE9BQU8xQyxPQUF0QjtBQUNBLHFCQUFLRSxTQUFMLEdBQWlCd0MsT0FBT1ksWUFBeEI7QUFDQSxxQkFBSzFDLE9BQUwsR0FBZSxFQUFmO0FBQ0FXLGlCQUFHZ0MsaUJBQUgsQ0FBcUIsU0FBckI7QUFDRDtBQUNGO0FBQ0Y7QUExQlEsT0FBWDtBQTRCRDs7OztFQXpKNkJDLGVBQUtDLEk7O2tCQUFoQnBFLEUiLCJmaWxlIjoibWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBiYXNlNjQgZnJvbSAnLi4vaW1hZ2VzL2Jhc2U2NCdcclxuICBpbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuICBpbXBvcnQgY29tbW9uIGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhPSB7XHJcbiAgICAgIFVSTDogJycsXHJcbiAgICAgIElNR1VSTDogJycsXHJcbiAgICAgIHNlbGVjdGVkOiAzLFxyXG4gICAgICBsaXN0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICfotKbmiLfkvZnpop0nLFxyXG4gICAgICAgICAgc3JjOiAnYmFsYW5jZS5wbmcnLFxyXG4gICAgICAgICAgdXJsOiAnYmFubGFuY2UtZGV0YWlscydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICfkvJrlkZjljaEnLFxyXG4gICAgICAgICAgc3JjOiAnYmFua2NhcmQucG5nJyxcclxuICAgICAgICAgIHVybDogJ2NhcmQtbWFuYWdlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ+aIkeeahOenr+WIhicsXHJcbiAgICAgICAgICBzcmM6ICdzY29yZS5wbmcnLFxyXG4gICAgICAgICAgdXJsOiAnaW50ZWdyYWwtcmVjb3JkJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgbmlja25hbWU6ICcnLFxyXG4gICAgICBjYXJkbnVtYmVyOiAnJyxcclxuICAgICAgYmFsYW5jZTogJycsXHJcbiAgICAgIHNjb3JlOiAnJyxcclxuICAgICAgYXZhdGFyVXJsOiAnJyxcclxuICAgICAgaWNvbjogJycsXHJcbiAgICAgIC8vIOaOiOadg+mDqOWIhuaVsOaNrlxyXG4gICAgICBjb2RlOiAnJyxcclxuICAgICAgZW5jcnlwdGVkRGF0YTogJycsXHJcbiAgICAgIGl2OiAnJyxcclxuICAgICAgcmF3RGF0YTogJycsXHJcbiAgICAgIHNpZ25hdHVyZTogJycsXHJcbiAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgc2Vzc2lvbklkOiAnJyxcclxuICAgICAgaXNSZWc6ICcnLFxyXG4gICAgICBpc2xvZ2luOiBmYWxzZVxyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHM9IHtcclxuICAgICAgdGFiYmFyOiBUYWJiYXJcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5pY29uID0gYmFzZTY0Lmljb24yMFxyXG4gICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgLy8g6I635Y+WY29kZVxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIHZhciBKU0NPREUgPSByZXMuY29kZSAvLyDov5Tlm55jb2RlXHJcbiAgICAgICAgICB0aGlzLmNvZGUgPSBKU0NPREVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICAgIHRoaXMuSU1HVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMXHJcbiAgICAgIC8vIOWxleekuuaIkeeahOmhtemdolxyXG4gICAgICB0aGlzLmJhY2tEYXRhKClcclxuICAgIH1cclxuICAgIGdldFVzZXJpbmZvKGUpIHtcclxuICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5lbmNyeXB0ZWREYXRhID0gZS5kZXRhaWwuZW5jcnlwdGVkRGF0YVxyXG4gICAgICAgIHRoaXMuaXYgPSBlLmRldGFpbC5pdlxyXG4gICAgICAgIHRoaXMucmF3RGF0YSA9IGUuZGV0YWlsLnJhd0RhdGFcclxuICAgICAgICB0aGlzLnNpZ25hdHVyZSA9IGUuZGV0YWlsLnNpZ25hdHVyZVxyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgICAgIHRoaXMubmlja05hbWUgPSBlLmRldGFpbC51c2VySW5mby5uaWNrTmFtZVxyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiB0aGlzLlVSTCArICd3eExvZ2luQXV0aCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuY29kZSxcclxuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogdGhpcy5lbmNyeXB0ZWREYXRhLFxyXG4gICAgICAgICAgICBpdjogdGhpcy5pdixcclxuICAgICAgICAgICAgcmF3RGF0YTogdGhpcy5yYXdEYXRhLFxyXG4gICAgICAgICAgICBzaWduYXR1cmU6IHRoaXMuc2lnbmF0dXJlLFxyXG4gICAgICAgICAgICB1c2VySW5mbzogdGhpcy51c2VySW5mb1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgJ3N0b3JlSWQnOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zdG9yZUlkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChyZXMuZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIOWcqOi/memHjOi1i+WAvOW5tuWtmOWCqHNlc3Npb25JZFxyXG4gICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbklkID0gcmVzLmRhdGEucmVzdWx0LnNlc3Npb25JZFxyXG4gICAgICAgICAgICAgIHRoaXMuaXNSZWcgPSByZXMuZGF0YS5yZXN1bHQuaXNSZWdcclxuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQpXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0ZXInXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAnbWUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21l6aG16K+35rGC5aSx6LSlJylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXR0aW5nICgpIHtcclxuICAgICAgLy8g5pi+56S65bCP56iL5bqP5b2T5YmN6K6+572u5p2D6ZmQ55qE55WM6Z2iXHJcbiAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICByZXMuYXV0aFNldHRpbmcgPSB7XHJcbiAgICAgICAgICAgICdzY29wZS51c2VySW5mbyc6IHRydWUsXHJcbiAgICAgICAgICAgICdzY29wZS51c2VyTG9jYXRpb24nOiB0cnVlLFxyXG4gICAgICAgICAgICAnc2NvcGUuY2FtZXJhJzogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlm57mmL7mlbDmja5cclxuICAgIGJhY2tEYXRhICgpIHtcclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICdjdXN0b21lci9maW5kQ3VzdG9tZXInLFxyXG4gICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc3RvcmVJZCc6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnN0b3JlSWQsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gZGF0YS5yZXN1bHRcclxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0xvZ2luID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuaXNsb2dpbiA9IHJlc3VsdC5pc0xvZ2luXHJcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzbG9naW4nLCByZXN1bHQuaXNMb2dpbilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLm5pY2tuYW1lID0gcmVzdWx0Lm5pY2tuYW1lXHJcbiAgICAgICAgICAgICAgdGhpcy5jYXJkbnVtYmVyID0gcmVzdWx0Lm51bWJlclxyXG4gICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSByZXN1bHQuc2NvcmVcclxuICAgICAgICAgICAgICB0aGlzLmJhbGFuY2UgPSByZXN1bHQuYmFsYW5jZVxyXG4gICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gcmVzdWx0LmN1c3RvbWVySGVhZFxyXG4gICAgICAgICAgICAgIHRoaXMuaXNsb2dpbiA9ICcnXHJcbiAgICAgICAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoJ2lzbG9naW4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19