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

// import common from '../utils/common'
var device = wx.getSystemInfoSync();
var width = device.windowWidth;
var height = device.windowHeight - 75;

var Goodspic = function (_wepy$page) {
  _inherits(Goodspic, _wepy$page);

  function Goodspic() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Goodspic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Goodspic.__proto__ || Object.getPrototypeOf(Goodspic)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
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
          y: (height - 200) / 2,
          width: 360,
          height: 200
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
              url: _this3.$parent.globalData.URL + 'goods/uploadImg', // 仅为示例，非真实的接口地址
              header: {
                'content-type': 'multipart/form-data',
                'sessionId': wx.getStorageSync('sessionId')
              },
              filePath: src,
              name: 'file',
              formData: {
                'goodsId': wx.getStorageSync('goodsId')
              },
              success: function success(res) {
                wx.redirectTo({
                  url: 'goods-details'
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

  _createClass(Goodspic, [{
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

  return Goodspic;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Goodspic , 'pages/goodspic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzcGljLmpzIl0sIm5hbWVzIjpbImRldmljZSIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aWR0aCIsIndpbmRvd1dpZHRoIiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiR29vZHNwaWMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzVXBsb2FkIiwiSU1HVVJMRURJVCIsImNyb3BwZXJPcHQiLCJzY2FsZSIsInpvb20iLCJjdXQiLCJ4IiwieSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNyb3BwZXIiLCJDcm9wcGVyIiwibWV0aG9kcyIsInVwbG9hZFRhcCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwic3JjIiwidGVtcEZpbGVQYXRocyIsIiRpbnZva2UiLCJnZXRDcm9wcGVySW1hZ2UiLCJ1cGxvYWRGaWxlIiwidXJsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJVUkwiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwicmVkaXJlY3RUbyIsInRvYXN0IiwidGl0bGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTtBQUNBLElBQU1BLFNBQVNDLEdBQUdDLGlCQUFILEVBQWY7QUFDQSxJQUFNQyxRQUFRSCxPQUFPSSxXQUFyQjtBQUNBLElBQU1DLFNBQVNMLE9BQU9NLFlBQVAsR0FBc0IsRUFBckM7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsS0FETDtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGtCQUFZO0FBQ1ZWLG9CQURVO0FBRVZFLHNCQUZVO0FBR1ZTLGVBQU8sR0FIRztBQUlWQyxjQUFNLENBSkk7QUFLVkMsYUFBSztBQUNIQyxhQUFHLENBQUNkLFFBQVEsR0FBVCxJQUFnQixDQURoQjtBQUVIZSxhQUFHLENBQUNiLFNBQVMsR0FBVixJQUFpQixDQUZqQjtBQUdIRixpQkFBTyxHQUhKO0FBSUhFLGtCQUFRO0FBSkw7QUFMSztBQUhQLEssUUFnQlJjLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsWUFBekMsRUFBc0QsdUJBQXNCLElBQTVFLEVBQVgsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsZUFBU0M7QUFEQyxLLFFBR1pDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQUE7O0FBQ1h6QixXQUFHMEIsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkcsRUFFeUI7QUFDdENDLHNCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQyxFQUdvQjtBQUNqQ0MsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBTUMsTUFBTUQsSUFBSUUsYUFBSixDQUFrQixDQUFsQixDQUFaO0FBQ0EsbUJBQUt2QixRQUFMLEdBQWdCLElBQWhCO0FBQ0E7QUFDQSxtQkFBS3dCLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLFlBQXhCLEVBQXNDRixHQUF0QztBQUNEO0FBVFksU0FBZjtBQVdELE9BYk87QUFjUkcscUJBZFEsNkJBY1c7QUFBQTs7QUFDakIsYUFBS0QsT0FBTCxDQUFhLFNBQWIsRUFBd0IsaUJBQXhCLEVBQTJDLFVBQUNGLEdBQUQsRUFBUztBQUNsRCxjQUFJQSxPQUFPLE9BQUt0QixRQUFoQixFQUEwQjtBQUN4QjtBQUNBO0FBQ0FWLGVBQUdvQyxVQUFILENBQWM7QUFDWkMsbUJBQUssT0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxHQUF4QixHQUE4QixpQkFEdkIsRUFDMEM7QUFDdERDLHNCQUFRO0FBQ04sZ0NBQWdCLHFCQURWO0FBRU4sNkJBQWF6QyxHQUFHMEMsY0FBSCxDQUFrQixXQUFsQjtBQUZQLGVBRkk7QUFNWkMsd0JBQVVYLEdBTkU7QUFPWlksb0JBQU0sTUFQTTtBQVFaQyx3QkFBVTtBQUNSLDJCQUFXN0MsR0FBRzBDLGNBQUgsQ0FBa0IsU0FBbEI7QUFESCxlQVJFO0FBV1paLHVCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIvQixtQkFBRzhDLFVBQUgsQ0FBYztBQUNaVCx1QkFBSztBQURPLGlCQUFkO0FBR0Q7QUFmVyxhQUFkO0FBaUJELFdBcEJELE1Bb0JPO0FBQ0wsbUJBQUtVLEtBQUwsQ0FBVyxrQkFBWDtBQUNEO0FBQ0YsU0F4QkQ7QUF5QkQ7QUF4Q08sSzs7Ozs7MEJBMENIQyxLLEVBQU87QUFDWmhELFNBQUdpRCxTQUFILENBQWE7QUFDWEQsb0JBRFc7QUFFWEUsY0FBTSxNQUZLO0FBR1hDLGtCQUFVO0FBSEMsT0FBYjtBQUtEOzs7NkJBQ1M7QUFDUixXQUFLeEMsVUFBTCxHQUFrQixLQUFLMkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCNUIsVUFBMUM7QUFDRDs7OztFQTdFbUN5QyxlQUFLQyxJOztrQkFBdEIvQyxRIiwiZmlsZSI6Imdvb2RzcGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBDcm9wcGVyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3dlcHktY29tLWNyb3BwZXInXHJcbi8vIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5jb25zdCBkZXZpY2UgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbmNvbnN0IHdpZHRoID0gZGV2aWNlLndpbmRvd1dpZHRoXHJcbmNvbnN0IGhlaWdodCA9IGRldmljZS53aW5kb3dIZWlnaHQgLSA3NVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZHNwaWMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuIrkvKDlm77niYcnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBpc1VwbG9hZDogZmFsc2UsXHJcbiAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgIGNyb3BwZXJPcHQ6IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgc2NhbGU6IDIuNSxcclxuICAgICAgem9vbTogOCxcclxuICAgICAgY3V0OiB7XHJcbiAgICAgICAgeDogKHdpZHRoIC0gMzYwKSAvIDIsXHJcbiAgICAgICAgeTogKGhlaWdodCAtIDIwMCkgLyAyLFxyXG4gICAgICAgIHdpZHRoOiAzNjAsXHJcbiAgICAgICAgaGVpZ2h0OiAyMDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY3JvcHBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6b3B0aW9ucy5vbmNlXCI6XCJjcm9wcGVyT3B0XCIsXCJiaW5kYmVmb3JlSW1hZ2VMb2FkXCI6XCJibFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBjcm9wcGVyOiBDcm9wcGVyXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB1cGxvYWRUYXAgKCkge1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHNyYyA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdXHJcbiAgICAgICAgICB0aGlzLmlzVXBsb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgLy8gIOiOt+WPluijgeWJquWbvueJh+i1hOa6kOWQju+8jOe7mWRhdGHmt7vliqBzcmPlsZ7mgKflj4rlhbblgLxcclxuICAgICAgICAgIHRoaXMuJGludm9rZSgnY3JvcHBlcicsICdwdXNoT3JpZ2luJywgc3JjKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRDcm9wcGVySW1hZ2UgKCkge1xyXG4gICAgICB0aGlzLiRpbnZva2UoJ2Nyb3BwZXInLCAnZ2V0Q3JvcHBlckltYWdlJywgKHNyYykgPT4ge1xyXG4gICAgICAgIGlmIChzcmMgJiYgdGhpcy5pc1VwbG9hZCkge1xyXG4gICAgICAgICAgLy8g6KOB5Ymq5ZCO55qE5Zu+54mH5LiK5Lyg57uZ5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAvLyDojrflj5blhajlsYDnmoR1cmxcclxuICAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTCArICdnb29kcy91cGxvYWRJbWcnLCAvLyDku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBzcmMsXHJcbiAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICAgICAgICAnZ29vZHNJZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdnb29kc0lkJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnZ29vZHMtZGV0YWlscydcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnRvYXN0KCfojrflj5blm77niYflnLDlnYDlpLHotKXvvIzor7fph43mlrDmt7vliqDlm77niYcnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgdG9hc3QgKHRpdGxlKSB7XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgfSlcclxuICB9XHJcbiAgb25Mb2FkICgpIHtcclxuICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICB9XHJcbn1cclxuIl19