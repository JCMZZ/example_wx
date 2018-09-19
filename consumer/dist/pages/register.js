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
      URL: '',
      num: 60,
      btnshow: true,
      mobile: '',
      verificationCode: '',
      sessionId: '',
      checked: true,
      class: 'checkactive',
      regtxtclass: 'reg-txt',
      disabled: false,
      btnclass: 'reg-btn'
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
      var sessionId = wx.getStorageSync('sessionId');
      this.sessionId = sessionId;
    }
    // 获取手机号

  }, {
    key: 'getMobile',
    value: function getMobile(e) {
      this.mobile = e.detail.value;
    }
    // 获取验证码

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
                'sessionId': this.sessionId,
                'storeId': this.$parent.globalData.storeId
              },
              method: 'POST',
              success: function success(res) {
                var data = res.data;
                if (_common2.default.Interceptor(data)) {
                  if (data.message === '同一手机号每天只能发送3次验证码') {
                    _common2.default.tipAlert('同一手机号每天只能发送3次验证码');
                  }
                  if (data.message === '同一IP每天只能发送10次验证码') {
                    _common2.default.tipAlert('同一IP每天只能发送10次验证码');
                  }
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
    // 获取填写的验证码

  }, {
    key: 'getCode',
    value: function getCode(e) {
      this.verificationCode = e.detail.value;
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
            'sessionId': this.sessionId,
            'storeId': this.$parent.globalData.storeId
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              // 判断是否超时，超时跳回到授权页授权
              if (data.success) {
                wx.redirectTo({
                  url: 'me'
                });
              } else {
                _common2.default.tipAlert(data.message);
              }
            }
          },
          fail: function fail() {
            wx.redirectTo({
              url: 'register'
            });
          }
        });
      } else {
        _common2.default.tipAlert('请输入验证码');
      }
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      wx.redirectTo({
        url: 'me'
      });
    }
  }]);

  return Register;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Register , 'pages/register'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbIlJlZ2lzdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJVUkwiLCJudW0iLCJidG5zaG93IiwibW9iaWxlIiwidmVyaWZpY2F0aW9uQ29kZSIsInNlc3Npb25JZCIsImNoZWNrZWQiLCJjbGFzcyIsInJlZ3R4dGNsYXNzIiwiZGlzYWJsZWQiLCJidG5jbGFzcyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInRlc3QiLCJ0aW1lciIsInNldEludGVydmFsIiwiJGFwcGx5IiwiY2xlYXJJbnRlcnZhbCIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJzdG9yZUlkIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImNvbW1vbiIsIkludGVyY2VwdG9yIiwibWVzc2FnZSIsInRpcEFsZXJ0IiwicmVkaXJlY3RUbyIsImZhaWwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxXQUFLLEVBREE7QUFFTEMsV0FBSyxFQUZBO0FBR0xDLGVBQVMsSUFISjtBQUlMQyxjQUFRLEVBSkg7QUFLTEMsd0JBQWtCLEVBTGI7QUFNTEMsaUJBQVcsRUFOTjtBQU9MQyxlQUFTLElBUEo7QUFRTEMsYUFBTyxhQVJGO0FBU0xDLG1CQUFhLFNBVFI7QUFVTEMsZ0JBQVUsS0FWTDtBQVdMQyxnQkFBVTtBQVhMLEs7Ozs7OzBCQWFEO0FBQ0osVUFBSSxLQUFLSixPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLGFBQUtDLEtBQUwsR0FBYSxhQUFiO0FBQ0EsYUFBS0QsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLRSxXQUFMLEdBQW1CLFNB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WEM7QUFZVEMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSTlCLE9BQU84QixJQUFJOUIsSUFBZjtBQUNBLGdCQUFJK0IsaUJBQU9DLFdBQVAsQ0FBbUJoQyxJQUFuQixDQUFKLEVBQThCO0FBQzVCO0FBQ0Esa0JBQUlBLEtBQUs2QixPQUFULEVBQWtCO0FBQ2hCZixtQkFBR3FCLFVBQUgsQ0FBYztBQUNaVix1QkFBSztBQURPLGlCQUFkO0FBR0QsZUFKRCxNQUlPO0FBQ0xNLGlDQUFPRyxRQUFQLENBQWdCbEMsS0FBS2lDLE9BQXJCO0FBQ0Q7QUFDRjtBQUNGLFdBeEJRO0FBeUJURyxnQkFBTSxnQkFBTTtBQUNWdEIsZUFBR3FCLFVBQUgsQ0FBYztBQUNaVixtQkFBSztBQURPLGFBQWQ7QUFHRDtBQTdCUSxTQUFYO0FBK0JELE9BaENELE1BZ0NPO0FBQ0xNLHlCQUFPRyxRQUFQLENBQWdCLFFBQWhCO0FBQ0Q7QUFDRjs7OytCQUNVO0FBQ1RwQixTQUFHcUIsVUFBSCxDQUFjO0FBQ1pWLGFBQUs7QUFETyxPQUFkO0FBR0Q7Ozs7RUF0SW1DWSxlQUFLQyxJOztrQkFBdEJ6QyxRIiwiZmlsZSI6InJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCdcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIFVSTDogJycsXHJcbiAgICBudW06IDYwLFxyXG4gICAgYnRuc2hvdzogdHJ1ZSxcclxuICAgIG1vYmlsZTogJycsXHJcbiAgICB2ZXJpZmljYXRpb25Db2RlOiAnJyxcclxuICAgIHNlc3Npb25JZDogJycsXHJcbiAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgY2xhc3M6ICdjaGVja2FjdGl2ZScsXHJcbiAgICByZWd0eHRjbGFzczogJ3JlZy10eHQnLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgYnRuY2xhc3M6ICdyZWctYnRuJ1xyXG4gIH1cclxuICBnZXQoKSB7XHJcbiAgICBpZiAodGhpcy5jaGVja2VkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY2xhc3MgPSAnY2hlY2thY3RpdmUnXHJcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgIHRoaXMucmVndHh0Y2xhc3MgPSAncmVnLXR4dCdcclxuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNsYXNzID0gJydcclxuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICB0aGlzLnJlZ3R4dGNsYXNzID0gJ3JlZy10eHQgcmVnLXR4dGFjdGl2ZSdcclxuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcclxuICAgIH1cclxuICB9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB2YXIgc2Vzc2lvbklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25JZFxyXG4gIH1cclxuICAvLyDojrflj5bmiYvmnLrlj7dcclxuICBnZXRNb2JpbGUgKGUpIHtcclxuICAgIHRoaXMubW9iaWxlID0gZS5kZXRhaWwudmFsdWVcclxuICB9XHJcbiAgLy8g6I635Y+W6aqM6K+B56CBXHJcbiAgZ2V0VmVyaWZ5Q29kZSAoKSB7XHJcbiAgICBpZiAodGhpcy5tb2JpbGUpIHtcclxuICAgICAgaWYgKC9eMVszfDR8NXw2fDd8OHw5XVxcZHs5fSQvLnRlc3QodGhpcy5tb2JpbGUpKSB7XHJcbiAgICAgICAgdGhpcy5idG5zaG93ID0gZmFsc2VcclxuICAgICAgICAvLyDpqozor4HnoIHlgJLorqHml7ZcclxuICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtIC0gMVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgaWYgKHRoaXMubnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXHJcbiAgICAgICAgICAgIHRoaXMubnVtID0gNjBcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93ID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgICAgICBpZiAodGhpcy5udW0gPT09IDYwKSB7XHJcbiAgICAgICAgICAvLyDor7fmsYLojrflj5bpqozor4HnoIFcclxuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ3NlbmRDb2RlJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG1vYmlsZTogdGhpcy5tb2JpbGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkLFxyXG4gICAgICAgICAgICAgICdzdG9yZUlkJzogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlID09PSAn5ZCM5LiA5omL5py65Y+35q+P5aSp5Y+q6IO95Y+R6YCBM+asoemqjOivgeeggScpIHtcclxuICAgICAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCflkIzkuIDmiYvmnLrlj7fmr4/lpKnlj6rog73lj5HpgIEz5qyh6aqM6K+B56CBJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UgPT09ICflkIzkuIBJUOavj+WkqeWPquiDveWPkemAgTEw5qyh6aqM6K+B56CBJykge1xyXG4gICAgICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+WQjOS4gElQ5q+P5aSp5Y+q6IO95Y+R6YCBMTDmrKHpqozor4HnoIEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpeaJi+acuuWPtycpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIOiOt+WPluWhq+WGmeeahOmqjOivgeeggVxyXG4gIGdldENvZGUoZSkge1xyXG4gICAgdGhpcy52ZXJpZmljYXRpb25Db2RlID0gZS5kZXRhaWwudmFsdWVcclxuICB9XHJcbiAgLy8g55m75b2V6K+35rGCXHJcbiAgbG9naW4gKCkge1xyXG4gICAgaWYgKHRoaXMudmVyaWZpY2F0aW9uQ29kZSkge1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ3JlZ2lzdGVyJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBtb2JpbGU6IHRoaXMubW9iaWxlLFxyXG4gICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTogdGhpcy52ZXJpZmljYXRpb25Db2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHRoaXMuc2Vzc2lvbklkLFxyXG4gICAgICAgICAgJ3N0b3JlSWQnOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zdG9yZUlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpui2heaXtu+8jOi2heaXtui3s+WbnuWIsOaOiOadg+mhteaOiOadg1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdtZSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICB1cmw6ICdyZWdpc3RlcidcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7fovpPlhaXpqozor4HnoIEnKVxyXG4gICAgfVxyXG4gIH1cclxuICBvblVubG9hZCgpIHtcclxuICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICB1cmw6ICdtZSdcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==