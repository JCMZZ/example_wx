'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_wepy$page) {
  _inherits(Register, _wepy$page);

  function Register() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Register);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Register.__proto__ || Object.getPrototypeOf(Register)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '注册'
    }, _this.data = {
      num: 60,
      btnshow: true,
      mobile: '',
      verificationCode: '',
      sessionId: '',
      URL: '',
      IMGURLEDIT: '',
      checked: true,
      class: 'checkactive',
      regtxtclass: 'reg-txt',
      disabled: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Register, [{
    key: 'get',
    value: function get() {
      if (this.checked === true) {
        this.class = 'checkactive';
        this.checked = false;
        this.regtxtclass = 'reg-txt';
        this.disabled = false;
      } else {
        this.class = '';
        this.checked = true;
        this.regtxtclass = 'reg-txt reg-txtactive';
        this.disabled = true;
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 同步取缓存中数据
      try {
        var value = wx.getStorageSync('sessionId');
        if (value) {
          this.sessionId = value;
        }
      } catch (e) {}
      // var sessionId = this.sessionId
      // business.getStorage(this.sessionId)
    }
    // 获取填写手机号

  }, {
    key: 'getMobile',
    value: function getMobile(e) {
      this.mobile = e.detail.value;
    }
    // 获取填写的验证码

  }, {
    key: 'getCode',
    value: function getCode(e) {
      this.verificationCode = e.detail.value;
    }
    // 获取验证码  regExp = "^1[3|4|5|6|7|8|9]\\d{9}$";

  }, {
    key: 'getVerifyCode',
    value: function getVerifyCode() {
      var _this2 = this;

      if (this.mobile) {
        if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.mobile)) {
          this.btnshow = false;
          // 验证码倒计时
          var timer = setInterval(function () {
            _this2.num = _this2.num - 1;
            _this2.$apply();
            if (_this2.num === 0) {
              clearInterval(timer);
              _this2.num = 60;
              _this2.btnshow = true;
              _this2.$apply();
            }
          }, 1000);
          if (this.num === 60) {
            // 请求获取验证码
            wx.request({
              url: this.URL + 'sendCode',
              data: {
                mobile: this.mobile
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'sessionId': this.sessionId
              },
              method: 'POST',
              success: function success(res) {
                var data = res.data;
                if (data.success === false) {
                  _common2.default.tipAlert(data.message);
                }
              }
            });
          }
        } else {
          _common2.default.tipAlert('请输入正确的手机号');
        }
      } else {
        _common2.default.tipAlert('请输入手机号');
      }
    }
    // 登录请求

  }, {
    key: 'login',
    value: function login() {
      if (this.verificationCode) {
        wx.request({
          url: this.URL + 'register',
          data: {
            mobile: this.mobile,
            verificationCode: this.verificationCode
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'sessionId': this.sessionId
          },
          method: 'POST',
          success: function success(res) {
            // 判断是否超时，超时跳回到授权页授权
            if (res.data.success) {
              wx.setStorageSync('login', true);
              wx.redirectTo({
                url: 'binduser'
              });
            } else {
              wx.showModal({
                content: res.data.message,
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    // wx.redirectTo({
                    //   url: 'index'
                    // })
                  }
                }
              });
            }
          },
          fail: function fail() {
            wx.redirectTo({
              url: 'register'
            });
          }
        });
      } else {
        wx.showModal({
          content: '请输入验证码',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        });
      }
    }
  }]);

  return Register;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Register , 'pages/register'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbIlJlZ2lzdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJudW0iLCJidG5zaG93IiwibW9iaWxlIiwidmVyaWZpY2F0aW9uQ29kZSIsInNlc3Npb25JZCIsIlVSTCIsIklNR1VSTEVESVQiLCJjaGVja2VkIiwiY2xhc3MiLCJyZWd0eHRjbGFzcyIsImRpc2FibGVkIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ2YWx1ZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwiZGV0YWlsIiwidGVzdCIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCIkYXBwbHkiLCJjbGVhckludGVydmFsIiwicmVxdWVzdCIsInVybCIsImhlYWRlciIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb21tb24iLCJ0aXBBbGVydCIsIm1lc3NhZ2UiLCJzZXRTdG9yYWdlU3luYyIsInJlZGlyZWN0VG8iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNvbmZpcm0iLCJmYWlsIiwiY29uc29sZSIsImxvZyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxlQUFTLElBRko7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLHdCQUFrQixFQUpiO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsV0FBSyxFQU5BO0FBT0xDLGtCQUFZLEVBUFA7QUFRTEMsZUFBUyxJQVJKO0FBU0xDLGFBQU8sYUFURjtBQVVMQyxtQkFBYSxTQVZSO0FBV0xDLGdCQUFVO0FBWEwsSzs7Ozs7MEJBYUQ7QUFDSixVQUFJLEtBQUtILE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekIsYUFBS0MsS0FBTCxHQUFh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QyxHQUFELEVBQVM7QUFDaEI7QUFDQSxnQkFBSUEsSUFBSTdCLElBQUosQ0FBUzRCLE9BQWIsRUFBc0I7QUFDcEJiLGlCQUFHa0IsY0FBSCxDQUFrQixPQUFsQixFQUEyQixJQUEzQjtBQUNBbEIsaUJBQUdtQixVQUFILENBQWM7QUFDWlQscUJBQUs7QUFETyxlQUFkO0FBR0QsYUFMRCxNQUtPO0FBQ0xWLGlCQUFHb0IsU0FBSCxDQUFhO0FBQ1hDLHlCQUFTUCxJQUFJN0IsSUFBSixDQUFTZ0MsT0FEUDtBQUVYSyw0QkFBWSxLQUZEO0FBR1hULHlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsc0JBQUlBLElBQUlTLE9BQVIsRUFBaUI7QUFDZjtBQUNBO0FBQ0E7QUFDRDtBQUNGO0FBVFUsZUFBYjtBQVdEO0FBQ0YsV0EvQlE7QUFnQ1RDLGdCQUFNLGdCQUFNO0FBQ1Z4QixlQUFHbUIsVUFBSCxDQUFjO0FBQ1pULG1CQUFLO0FBRE8sYUFBZDtBQUdEO0FBcENRLFNBQVg7QUFzQ0QsT0F2Q0QsTUF1Q087QUFDTFYsV0FBR29CLFNBQUgsQ0FBYTtBQUNYQyxtQkFBUyxRQURFO0FBRVhDLHNCQUFZLEtBRkQ7QUFHWFQsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUEsSUFBSVMsT0FBUixFQUFpQjtBQUNmRSxzQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBUFUsU0FBYjtBQVNEO0FBQ0Y7Ozs7RUFuSm1DQyxlQUFLQyxJOztrQkFBdEI5QyxRIiwiZmlsZSI6InJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCdcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG51bTogNjAsXHJcbiAgICBidG5zaG93OiB0cnVlLFxyXG4gICAgbW9iaWxlOiAnJyxcclxuICAgIHZlcmlmaWNhdGlvbkNvZGU6ICcnLFxyXG4gICAgc2Vzc2lvbklkOiAnJyxcclxuICAgIFVSTDogJycsXHJcbiAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICBjbGFzczogJ2NoZWNrYWN0aXZlJyxcclxuICAgIHJlZ3R4dGNsYXNzOiAncmVnLXR4dCcsXHJcbiAgICBkaXNhYmxlZDogZmFsc2VcclxuICB9XHJcbiAgZ2V0KCkge1xyXG4gICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsYXNzID0gJ2NoZWNrYWN0aXZlJ1xyXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICB0aGlzLnJlZ3R4dGNsYXNzID0gJ3JlZy10eHQnXHJcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGFzcyA9ICcnXHJcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWVcclxuICAgICAgdGhpcy5yZWd0eHRjbGFzcyA9ICdyZWctdHh0IHJlZy10eHRhY3RpdmUnXHJcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uU2hvdyAoKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgdGhpcy5JTUdVUkxFRElUID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMRURJVFxyXG4gICAgLy8g5ZCM5q2l5Y+W57yT5a2Y5Lit5pWw5o2uXHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSB2YWx1ZVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgICAvLyB2YXIgc2Vzc2lvbklkID0gdGhpcy5zZXNzaW9uSWRcclxuICAgIC8vIGJ1c2luZXNzLmdldFN0b3JhZ2UodGhpcy5zZXNzaW9uSWQpXHJcbiAgfVxyXG4gIC8vIOiOt+WPluWhq+WGmeaJi+acuuWPt1xyXG4gIGdldE1vYmlsZSAoZSkge1xyXG4gICAgdGhpcy5tb2JpbGUgPSBlLmRldGFpbC52YWx1ZVxyXG4gIH1cclxuICAvLyDojrflj5bloavlhpnnmoTpqozor4HnoIFcclxuICBnZXRDb2RlKGUpIHtcclxuICAgIHRoaXMudmVyaWZpY2F0aW9uQ29kZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgfVxyXG4gIC8vIOiOt+WPlumqjOivgeeggSAgcmVnRXhwID0gXCJeMVszfDR8NXw2fDd8OHw5XVxcXFxkezl9JFwiO1xyXG4gIGdldFZlcmlmeUNvZGUgKCkge1xyXG4gICAgaWYgKHRoaXMubW9iaWxlKSB7XHJcbiAgICAgIGlmICgvXjFbM3w0fDV8Nnw3fDh8OV1cXGR7OX0kLy50ZXN0KHRoaXMubW9iaWxlKSkge1xyXG4gICAgICAgIHRoaXMuYnRuc2hvdyA9IGZhbHNlXHJcbiAgICAgICAgLy8g6aqM6K+B56CB5YCS6K6h5pe2XHJcbiAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5udW0gPSB0aGlzLm51bSAtIDFcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIGlmICh0aGlzLm51bSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLm51bSA9IDYwXHJcbiAgICAgICAgICAgIHRoaXMuYnRuc2hvdyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgaWYgKHRoaXMubnVtID09PSA2MCkge1xyXG4gICAgICAgICAgLy8g6K+35rGC6I635Y+W6aqM6K+B56CBXHJcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLlVSTCArICdzZW5kQ29kZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBtb2JpbGU6IHRoaXMubW9iaWxlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICdzZXNzaW9uSWQnOiB0aGlzLnNlc3Npb25JZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JylcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7fovpPlhaXmiYvmnLrlj7cnKVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyDnmbvlvZXor7fmsYJcclxuICBsb2dpbiAoKSB7XHJcbiAgICBpZiAodGhpcy52ZXJpZmljYXRpb25Db2RlKSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAncmVnaXN0ZXInLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIG1vYmlsZTogdGhpcy5tb2JpbGUsXHJcbiAgICAgICAgICB2ZXJpZmljYXRpb25Db2RlOiB0aGlzLnZlcmlmaWNhdGlvbkNvZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIC8vIOWIpOaWreaYr+WQpui2heaXtu+8jOi2heaXtui3s+WbnuWIsOaOiOadg+mhteaOiOadg1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ2luJywgdHJ1ZSlcclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYmluZHVzZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgICAvLyAgIHVybDogJ2luZGV4J1xyXG4gICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICB1cmw6ICdyZWdpc3RlcidcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICBjb250ZW50OiAn6K+36L6T5YWl6aqM6K+B56CBJyxcclxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=