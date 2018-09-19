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

var Binduser = function (_wepy$page) {
  _inherits(Binduser, _wepy$page);

  function Binduser() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Binduser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Binduser.__proto__ || Object.getPrototypeOf(Binduser)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '绑定管理员'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Binduser, [{
    key: 'backindex',
    value: function backindex() {
      wx.request({
        url: this.$parent.globalData.URL + 'store/selectStore',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          if (res.data.result !== null) {
            if (res.data.result.isAdmin === false) {
              _common2.default.tipAlert('还未开通管理员权限，请耐心等候');
            } else if (res.data.result.isLogin === false) {
              wx.redirectTo({
                url: 'register'
              });
            } else {
              wx.redirectTo({
                url: 'index'
              });
              wx.setStorageSync('showModal', 0);
            }
          }
        }
      });
    }
  }]);

  return Binduser;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Binduser , 'pages/binduser'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmR1c2VyLmpzIl0sIm5hbWVzIjpbIkJpbmR1c2VyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInd4IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiVVJMIiwibWV0aG9kIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJzdWNjZXNzIiwicmVzIiwiZGF0YSIsInJlc3VsdCIsImlzQWRtaW4iLCJjb21tb24iLCJ0aXBBbGVydCIsImlzTG9naW4iLCJyZWRpcmVjdFRvIiwic2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLOzs7OztnQ0FHSTtBQUNYQyxTQUFHQyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLEdBQXhCLEdBQThCLG1CQUQxQjtBQUVUQyxnQkFBUSxNQUZDO0FBR1RDLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFQLEdBQUdRLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQUhDO0FBT1RDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSUEsSUFBSUMsSUFBSixDQUFTQyxNQUFULEtBQW9CLElBQXhCLEVBQThCO0FBQzVCLGdCQUFJRixJQUFJQyxJQUFKLENBQVNDLE1BQVQsQ0FBZ0JDLE9BQWhCLEtBQTRCLEtBQWhDLEVBQXVDO0FBQ3JDQywrQkFBT0MsUUFBUCxDQUFnQixpQkFBaEI7QUFDRCxhQUZELE1BRU8sSUFBSUwsSUFBSUMsSUFBSixDQUFTQyxNQUFULENBQWdCSSxPQUFoQixLQUE0QixLQUFoQyxFQUF1QztBQUM1Q2hCLGlCQUFHaUIsVUFBSCxDQUFjO0FBQ1pmLHFCQUFLO0FBRE8sZUFBZDtBQUdELGFBSk0sTUFJQTtBQUNMRixpQkFBR2lCLFVBQUgsQ0FBYztBQUNaZixxQkFBSztBQURPLGVBQWQ7QUFHQUYsaUJBQUdrQixjQUFILENBQWtCLFdBQWxCLEVBQStCLENBQS9CO0FBQ0Q7QUFDRjtBQUNGO0FBdEJRLE9BQVg7QUF3QkQ7Ozs7RUE3Qm1DQyxlQUFLQyxJOztrQkFBdEJ2QixRIiwiZmlsZSI6ImJpbmR1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5kdXNlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e7keWumueuoeeQhuWRmCdcclxuICB9XHJcbiAgYmFja2luZGV4ICgpIHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTCArICdzdG9yZS9zZWxlY3RTdG9yZScsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEucmVzdWx0LmlzQWRtaW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6L+Y5pyq5byA6YCa566h55CG5ZGY5p2D6ZmQ77yM6K+36ICQ5b+D562J5YCZJylcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmRhdGEucmVzdWx0LmlzTG9naW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnaW5kZXgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzaG93TW9kYWwnLCAwKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19