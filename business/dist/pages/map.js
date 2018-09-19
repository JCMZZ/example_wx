'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import common from '../utils/common'
var Map = function (_wepy$page) {
  _inherits(Map, _wepy$page);

  function Map() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Map);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Map.__proto__ || Object.getPrototypeOf(Map)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '当前地理位置'
    }, _this.data = {
      isGet: false,
      height: '',
      controls: null,
      address: '',
      latitude: '',
      longitude: ''
    }, _this.methods = {
      // 获取经纬度信息
      getCenterLocation: function getCenterLocation() {
        var _this2 = this;

        wx.chooseLocation({
          type: 'wgs84',
          success: function success(res) {
            console.log(res);
            res.address || (res.address = '中国地区');
            wx.redirectTo({
              url: 'index?address=' + res.address + '&latitude=' + res.latitude + '&longitude=' + res.longitude
            });
          },
          fail: function fail() {
            wx.redirectTo({
              url: 'index?address=中国地区&latitude=' + _this2.latitude + '&longitude=' + _this2.longitude
            });
          }
        });
      },

      // 取消选择
      moveToLocation: function moveToLocation() {
        wx.redirectTo({
          url: 'index?address=中国地区&latitude=' + this.latitude + '&longitude=' + this.longitude
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Map, [{
    key: 'initialize',

    // 初始化地图
    value: function initialize(options) {
      var _this3 = this;

      if (options.latitude === '' || options.longitude === '') {
        wx.getLocation({
          type: 'wgs84',
          success: function success(res) {
            console.log(res.address);
            _this3.latitude = res.latitude;
            _this3.longitude = res.longitude;
            _this3.$apply();
          }
        });
      } else {
        this.address = options.address;
        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.$apply();
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this4 = this;

      // 获取地理位置权限
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success: function success(res) {
                _this4.initialize(options);
              },
              fail: function fail() {
                wx.openSetting({
                  success: function success(res) {
                    if (!res.authSetting['scope.userLocation']) {
                      wx.redirectTo({
                        url: 'index?address=' + _this4.address + '&latitude=' + _this4.latitude + '&longitude=' + _this4.longitude
                      });
                    } else {
                      _this4.initialize(options);
                    }
                  }
                });
              }
            });
          } else {
            _this4.initialize(options);
          }
        }
      });
      wx.getSystemInfo({
        success: function success(res) {
          _this4.height = res.windowHeight - 150;
          _this4.controls = [{
            id: 1,
            iconPath: '/images/location.png',
            position: {
              left: (res.windowWidth - 50) / 2,
              top: (res.windowHeight - 150 - 75) / 2,
              width: 50,
              height: 50
            }
          }];
          _this4.isGet = true;
          _this4.$apply();
        }
      });
    }
  }]);

  return Map;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Map , 'pages/map'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyJdLCJuYW1lcyI6WyJNYXAiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzR2V0IiwiaGVpZ2h0IiwiY29udHJvbHMiLCJhZGRyZXNzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJtZXRob2RzIiwiZ2V0Q2VudGVyTG9jYXRpb24iLCJ3eCIsImNob29zZUxvY2F0aW9uIiwidHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwicmVkaXJlY3RUbyIsInVybCIsImZhaWwiLCJtb3ZlVG9Mb2NhdGlvbiIsIm9wdGlvbnMiLCJnZXRMb2NhdGlvbiIsIiRhcHBseSIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImF1dGhvcml6ZSIsInNjb3BlIiwiaW5pdGlhbGl6ZSIsIm9wZW5TZXR0aW5nIiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImlkIiwiaWNvblBhdGgiLCJwb3NpdGlvbiIsImxlZnQiLCJ3aW5kb3dXaWR0aCIsInRvcCIsIndpZHRoIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBO0lBQ3FCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxLQURGO0FBRUxDLGNBQVEsRUFGSDtBQUdMQyxnQkFBVSxJQUhMO0FBSUxDLGVBQVMsRUFKSjtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLGlCQUFXO0FBTk4sSyxRQVFQQyxPLEdBQVU7QUFDUjtBQUNBQyx1QkFGUSwrQkFFYTtBQUFBOztBQUNuQkMsV0FBR0MsY0FBSCxDQUFrQjtBQUNoQkMsZ0JBQU0sT0FEVTtBQUVoQkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkMsb0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBQSxnQkFBSVQsT0FBSixLQUFnQlMsSUFBSVQsT0FBSixHQUFjLE1B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QjtBQUdSTyxxQkFBTyxFQUhDO0FBSVJuQyxzQkFBUTtBQUpBO0FBSEssV0FBRCxDQUFoQjtBQVVBLGlCQUFLRCxLQUFMLEdBQWEsSUFBYjtBQUNBLGlCQUFLcUIsTUFBTDtBQUNEO0FBZmMsT0FBakI7QUFpQkQ7Ozs7RUF2RzhCZ0IsZUFBS0MsSTs7a0JBQWpCMUMsRyIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuLy8gaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W9k+WJjeWcsOeQhuS9jee9ridcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIGlzR2V0OiBmYWxzZSxcclxuICAgIGhlaWdodDogJycsXHJcbiAgICBjb250cm9sczogbnVsbCxcclxuICAgIGFkZHJlc3M6ICcnLFxyXG4gICAgbGF0aXR1ZGU6ICcnLFxyXG4gICAgbG9uZ2l0dWRlOiAnJ1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g6I635Y+W57uP57qs5bqm5L+h5oGvXHJcbiAgICBnZXRDZW50ZXJMb2NhdGlvbiAoKSB7XHJcbiAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcclxuICAgICAgICB0eXBlOiAnd2dzODQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgIHJlcy5hZGRyZXNzIHx8IChyZXMuYWRkcmVzcyA9ICfkuK3lm73lnLDljLonKVxyXG4gICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgIHVybDogJ2luZGV4P2FkZHJlc3M9JyArIHJlcy5hZGRyZXNzICsgJyZsYXRpdHVkZT0nICsgcmVzLmxhdGl0dWRlICsgJyZsb25naXR1ZGU9JyArIHJlcy5sb25naXR1ZGVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgdXJsOiAnaW5kZXg/YWRkcmVzcz3kuK3lm73lnLDljLombGF0aXR1ZGU9JyArIHRoaXMubGF0aXR1ZGUgKyAnJmxvbmdpdHVkZT0nICsgdGhpcy5sb25naXR1ZGVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIOWPlua2iOmAieaLqVxyXG4gICAgbW92ZVRvTG9jYXRpb24gKCkge1xyXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6ICdpbmRleD9hZGRyZXNzPeS4reWbveWcsOWMuiZsYXRpdHVkZT0nICsgdGhpcy5sYXRpdHVkZSArICcmbG9uZ2l0dWRlPScgKyB0aGlzLmxvbmdpdHVkZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyDliJ3lp4vljJblnLDlm75cclxuICBpbml0aWFsaXplIChvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5sYXRpdHVkZSA9PT0gJycgfHwgb3B0aW9ucy5sb25naXR1ZGUgPT09ICcnKSB7XHJcbiAgICAgIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgICB0eXBlOiAnd2dzODQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5hZGRyZXNzKVxyXG4gICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZVxyXG4gICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hZGRyZXNzID0gb3B0aW9ucy5hZGRyZXNzXHJcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSBvcHRpb25zLmxhdGl0dWRlXHJcbiAgICAgIHRoaXMubG9uZ2l0dWRlID0gb3B0aW9ucy5sb25naXR1ZGVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQgKG9wdGlvbnMpIHtcclxuICAgIC8vIOiOt+WPluWcsOeQhuS9jee9ruadg+mZkFxyXG4gICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckxvY2F0aW9uJ10pIHtcclxuICAgICAgICAgIHd4LmF1dGhvcml6ZSh7XHJcbiAgICAgICAgICAgIHNjb3BlOiAnc2NvcGUudXNlckxvY2F0aW9uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvcHRpb25zKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckxvY2F0aW9uJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2luZGV4P2FkZHJlc3M9JyArIHRoaXMuYWRkcmVzcyArICcmbGF0aXR1ZGU9JyArIHRoaXMubGF0aXR1ZGUgKyAnJmxvbmdpdHVkZT0nICsgdGhpcy5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplKG9wdGlvbnMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgLSAxNTBcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gW3tcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICcvaW1hZ2VzL2xvY2F0aW9uLnBuZycsXHJcbiAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICBsZWZ0OiAocmVzLndpbmRvd1dpZHRoIC0gNTApIC8gMixcclxuICAgICAgICAgICAgdG9wOiAocmVzLndpbmRvd0hlaWdodCAtIDE1MCAtIDc1KSAvIDIsXHJcbiAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA1MFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbiAgICAgICAgdGhpcy5pc0dldCA9IHRydWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==