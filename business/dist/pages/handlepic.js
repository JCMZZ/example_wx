'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComCropper = require('./../compontents/wepy-com-cropper.js');

var _wepyComCropper2 = _interopRequireDefault(_wepyComCropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var device = wx.getSystemInfoSync();
var width = device.windowWidth;
var height = device.windowHeight - 75;

var Handlepic = function (_wepy$page) {
  _inherits(Handlepic, _wepy$page);

  function Handlepic() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Handlepic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Handlepic.__proto__ || Object.getPrototypeOf(Handlepic)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '上传图片'
    }, _this.data = {
      isUpload: false,
      IMGURLEDIT: '',
      cropperOpt: {
        width: width,
        height: height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 360) / 2,
          y: (height - 150) / 2,
          width: 360,
          height: 150
        }
      }
    }, _this.$repeat = {}, _this.$props = { "cropper": { "xmlns:v-bind": "", "v-bind:options.once": "cropperOpt", "bindbeforeImageLoad": "bl" } }, _this.$events = {}, _this.components = {
      cropper: _wepyComCropper2.default
    }, _this.methods = {
      uploadTap: function uploadTap() {
        var _this2 = this;

        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            var src = res.tempFilePaths[0];
            _this2.isUpload = true;
            //  获取裁剪图片资源后，给data添加src属性及其值
            _this2.$invoke('cropper', 'pushOrigin', src);
          }
        });
      },
      getCropperImage: function getCropperImage() {
        var _this3 = this;

        this.$invoke('cropper', 'getCropperImage', function (src) {
          if (src && _this3.isUpload) {
            // 裁剪后的图片上传给服务器
            // 获取全局的url
            wx.uploadFile({
              url: _this3.$parent.globalData.URL + 'store/uploadImg',
              header: {
                'sessionId': wx.getStorageSync('sessionId')
              },
              filePath: src,
              name: 'file',
              formData: {
                'user': 'test'
              },
              success: function success(res) {
                wx.redirectTo({
                  url: 'index'
                });
              }
            });
          } else {
            _this3.toast('获取图片地址失败，请重新添加图片');
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Handlepic, [{
    key: 'toast',
    value: function toast(title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
    }
  }]);

  return Handlepic;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Handlepic , 'pages/handlepic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhbmRsZXBpYy5qcyJdLCJuYW1lcyI6WyJkZXZpY2UiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwid2lkdGgiLCJ3aW5kb3dXaWR0aCIsImhlaWdodCIsIndpbmRvd0hlaWdodCIsIkhhbmRsZXBpYyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaXNVcGxvYWQiLCJJTUdVUkxFRElUIiwiY3JvcHBlck9wdCIsInNjYWxlIiwiem9vbSIsImN1dCIsIngiLCJ5IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY3JvcHBlciIsIkNyb3BwZXIiLCJtZXRob2RzIiwidXBsb2FkVGFwIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJzcmMiLCJ0ZW1wRmlsZVBhdGhzIiwiJGludm9rZSIsImdldENyb3BwZXJJbWFnZSIsInVwbG9hZEZpbGUiLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIlVSTCIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwiZmlsZVBhdGgiLCJuYW1lIiwiZm9ybURhdGEiLCJyZWRpcmVjdFRvIiwidG9hc3QiLCJ0aXRsZSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFNBQVNDLEdBQUdDLGlCQUFILEVBQWY7QUFDQSxJQUFNQyxRQUFRSCxPQUFPSSxXQUFyQjtBQUNBLElBQU1DLFNBQVNMLE9BQU9NLFlBQVAsR0FBc0IsRUFBckM7O0lBRXFCQyxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsS0FETDtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGtCQUFZO0FBQ1ZWLG9CQURVO0FBRVZFLHNCQUZVO0FBR1ZTLGVBQU8sR0FIRztBQUlWQyxjQUFNLENBSkk7QUFLVkMsYUFBSztBQUNIQyxhQUFHLENBQUNkLFFBQVEsR0FBVCxJQUFnQixDQURoQjtBQUVIZSxhQUFHLENBQUNiLFNBQVMsR0FBVixJQUFpQixDQUZqQjtBQUdIRixpQkFBTyxHQUhKO0FBSUhFLGtCQUFRO0FBSkw7QUFMSztBQUhQLEssUUFnQlJjLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsWUFBekMsRUFBc0QsdUJBQXNCLElBQTVFLEVBQVgsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsZUFBU0M7QUFEQyxLLFFBR1pDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQUE7O0FBQ1h6QixXQUFHMEIsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkcsRUFFeUI7QUFDdENDLHNCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQyxFQUdvQjtBQUNqQ0MsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBTUMsTUFBTUQsSUFBSUUsYUFBSixDQUFrQixDQUFsQixDQUFaO0FBQ0EsbUJBQUt2QixRQUFMLEdBQWdCLElBQWhCO0FBQ0E7QUFDQSxtQkFBS3dCLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLFlBQXhCLEVBQXNDRixHQUF0QztBQUNEO0FBVFksU0FBZjtBQVdELE9BYk87QUFjUkcscUJBZFEsNkJBY1c7QUFBQTs7QUFDakIsYUFBS0QsT0FBTCxDQUFhLFNBQWIsRUFBd0IsaUJBQXhCLEVBQTJDLFVBQUNGLEdBQUQsRUFBUztBQUNsRCxjQUFJQSxPQUFPLE9BQUt0QixRQUFoQixFQUEwQjtBQUN4QjtBQUNBO0FBQ0FWLGVBQUdvQyxVQUFILENBQWM7QUFDWkMsbUJBQUssT0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxHQUF4QixHQUE4QixpQkFEdkI7QUFFWkMsc0JBQVE7QUFDTiw2QkFBYXpDLEdBQUcwQyxjQUFILENBQWtCLFdBQWxCO0FBRFAsZUFGSTtBQUtaQyx3QkFBVVgsR0FMRTtBQU1aWSxvQkFBTSxNQU5NO0FBT1pDLHdCQUFVO0FBQ1Isd0JBQVE7QUFEQSxlQVBFO0FBVVpmLHVCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIvQixtQkFBRzhDLFVBQUgsQ0FBYztBQUNaVCx1QkFBSztBQURPLGlCQUFkO0FBR0Q7QUFkVyxhQUFkO0FBZ0JELFdBbkJELE1BbUJPO0FBQ0wsbUJBQUtVLEtBQUwsQ0FBVyxrQkFBWDtBQUNEO0FBQ0YsU0F2QkQ7QUF3QkQ7QUF2Q08sSzs7Ozs7MEJBeUNIQyxLLEVBQU87QUFDWmhELFNBQUdpRCxTQUFILENBQWE7QUFDWEQsb0JBRFc7QUFFWEUsY0FBTSxNQUZLO0FBR1hDLGtCQUFVO0FBSEMsT0FBYjtBQUtEOzs7NkJBQ1M7QUFDUixXQUFLeEMsVUFBTCxHQUFrQixLQUFLMkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCNUIsVUFBMUM7QUFDRDs7OztFQTVFb0N5QyxlQUFLQyxJOztrQkFBdkIvQyxTIiwiZmlsZSI6ImhhbmRsZXBpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgQ3JvcHBlciBmcm9tICcuLi9jb21wb250ZW50cy93ZXB5LWNvbS1jcm9wcGVyJ1xyXG5jb25zdCBkZXZpY2UgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbmNvbnN0IHdpZHRoID0gZGV2aWNlLndpbmRvd1dpZHRoXHJcbmNvbnN0IGhlaWdodCA9IGRldmljZS53aW5kb3dIZWlnaHQgLSA3NVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZGxlcGljIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg5Zu+54mHJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgaXNVcGxvYWQ6IGZhbHNlLFxyXG4gICAgSU1HVVJMRURJVDogJycsXHJcbiAgICBjcm9wcGVyT3B0OiB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHNjYWxlOiAyLjUsXHJcbiAgICAgIHpvb206IDgsXHJcbiAgICAgIGN1dDoge1xyXG4gICAgICAgIHg6ICh3aWR0aCAtIDM2MCkgLyAyLFxyXG4gICAgICAgIHk6IChoZWlnaHQgLSAxNTApIC8gMixcclxuICAgICAgICB3aWR0aDogMzYwLFxyXG4gICAgICAgIGhlaWdodDogMTUwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNyb3BwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbnMub25jZVwiOlwiY3JvcHBlck9wdFwiLFwiYmluZGJlZm9yZUltYWdlTG9hZFwiOlwiYmxcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgY3JvcHBlcjogQ3JvcHBlclxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgdXBsb2FkVGFwICgpIHtcclxuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzcmMgPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG4gICAgICAgICAgdGhpcy5pc1VwbG9hZCA9IHRydWVcclxuICAgICAgICAgIC8vICDojrflj5boo4Hliarlm77niYfotYTmupDlkI7vvIznu5lkYXRh5re75Yqgc3Jj5bGe5oCn5Y+K5YW25YC8XHJcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ2Nyb3BwZXInLCAncHVzaE9yaWdpbicsIHNyYylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0Q3JvcHBlckltYWdlICgpIHtcclxuICAgICAgdGhpcy4kaW52b2tlKCdjcm9wcGVyJywgJ2dldENyb3BwZXJJbWFnZScsIChzcmMpID0+IHtcclxuICAgICAgICBpZiAoc3JjICYmIHRoaXMuaXNVcGxvYWQpIHtcclxuICAgICAgICAgIC8vIOijgeWJquWQjueahOWbvueJh+S4iuS8oOe7meacjeWKoeWZqFxyXG4gICAgICAgICAgLy8g6I635Y+W5YWo5bGA55qEdXJsXHJcbiAgICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkwgKyAnc3RvcmUvdXBsb2FkSW1nJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogc3JjLFxyXG4gICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgJ3VzZXInOiAndGVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaW5kZXgnXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50b2FzdCgn6I635Y+W5Zu+54mH5Zyw5Z2A5aSx6LSl77yM6K+36YeN5paw5re75Yqg5Zu+54mHJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvYXN0ICh0aXRsZSkge1xyXG4gICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGljb246ICdub25lJyxcclxuICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uTG9hZCAoKSB7XHJcbiAgICB0aGlzLklNR1VSTEVESVQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxFRElUXHJcbiAgfVxyXG59XHJcbiJdfQ==