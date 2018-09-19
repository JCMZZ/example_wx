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
            wx.redirectTo({
              url: 'addgoods?src=' + src
            });
            // 裁剪后的图片上传给服务器
            // 获取全局的url
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Goodspic , 'pages/addgoodspic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZGdvb2RzcGljLmpzIl0sIm5hbWVzIjpbImRldmljZSIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aWR0aCIsIndpbmRvd1dpZHRoIiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiR29vZHNwaWMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzVXBsb2FkIiwiSU1HVVJMRURJVCIsImNyb3BwZXJPcHQiLCJzY2FsZSIsInpvb20iLCJjdXQiLCJ4IiwieSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNyb3BwZXIiLCJDcm9wcGVyIiwibWV0aG9kcyIsInVwbG9hZFRhcCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwic3JjIiwidGVtcEZpbGVQYXRocyIsIiRpbnZva2UiLCJnZXRDcm9wcGVySW1hZ2UiLCJyZWRpcmVjdFRvIiwidXJsIiwidG9hc3QiLCJ0aXRsZSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQSxJQUFNQSxTQUFTQyxHQUFHQyxpQkFBSCxFQUFmO0FBQ0EsSUFBTUMsUUFBUUgsT0FBT0ksV0FBckI7QUFDQSxJQUFNQyxTQUFTTCxPQUFPTSxZQUFQLEdBQXNCLEVBQXJDOztJQUVxQkMsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEtBREw7QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxrQkFBWTtBQUNWVixvQkFEVTtBQUVWRSxzQkFGVTtBQUdWUyxlQUFPLEdBSEc7QUFJVkMsY0FBTSxDQUpJO0FBS1ZDLGFBQUs7QUFDSEMsYUFBRyxDQUFDZCxRQUFRLEdBQVQsSUFBZ0IsQ0FEaEI7QUFFSGUsYUFBRyxDQUFDYixTQUFTLEdBQVYsSUFBaUIsQ0FGakI7QUFHSEYsaUJBQU8sR0FISjtBQUlIRSxrQkFBUTtBQUpMO0FBTEs7QUFIUCxLLFFBZ0JSYyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFlBQXpDLEVBQXNELHVCQUFzQixJQUE1RSxFQUFYLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGVBQVNDO0FBREMsSyxRQUdaQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUFBOztBQUNYekIsV0FBRzBCLFdBQUgsQ0FBZTtBQUNiQyxpQkFBTyxDQURNLEVBQ0g7QUFDVkMsb0JBQVUsQ0FBQyxVQUFELEVBQWEsWUFBYixDQUZHLEVBRXlCO0FBQ3RDQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEMsRUFHb0I7QUFDakNDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQU1DLE1BQU1ELElBQUlFLGFBQUosQ0FBa0IsQ0FBbEIsQ0FBWjtBQUNBLG1CQUFLdkIsUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBQ0EsbUJBQUt3QixPQUFMLENBQWEsU0FBYixFQUF3QixZQUF4QixFQUFzQ0YsR0FBdEM7QUFDRDtBQVRZLFNBQWY7QUFXRCxPQWJPO0FBY1JHLHFCQWRRLDZCQWNXO0FBQUE7O0FBQ2pCLGFBQUtELE9BQUwsQ0FBYSxTQUFiLEVBQXdCLGlCQUF4QixFQUEyQyxVQUFDRixHQUFELEVBQVM7QUFDbEQsY0FBSUEsT0FBTyxPQUFLdEIsUUFBaEIsRUFBMEI7QUFDeEJWLGVBQUdvQyxVQUFILENBQWM7QUFDWkMsbUJBQUssa0JBQWtCTDtBQURYLGFBQWQ7QUFHQTtBQUNBO0FBQ0QsV0FORCxNQU1PO0FBQ0wsbUJBQUtNLEtBQUwsQ0FBVyxrQkFBWDtBQUNEO0FBQ0YsU0FWRDtBQVdEO0FBMUJPLEs7Ozs7OzBCQTRCSEMsSyxFQUFPO0FBQ1p2QyxTQUFHd0MsU0FBSCxDQUFhO0FBQ1hELG9CQURXO0FBRVhFLGNBQU0sTUFGSztBQUdYQyxrQkFBVTtBQUhDLE9BQWI7QUFLRDs7OzZCQUNTO0FBQ1IsV0FBSy9CLFVBQUwsR0FBa0IsS0FBS2dDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmpDLFVBQTFDO0FBQ0Q7Ozs7RUEvRG1Da0MsZUFBS0MsSTs7a0JBQXRCeEMsUSIsImZpbGUiOiJhZGRnb29kc3BpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgQ3JvcHBlciBmcm9tICcuLi9jb21wb250ZW50cy93ZXB5LWNvbS1jcm9wcGVyJ1xyXG4vLyBpbXBvcnQgY29tbW9uIGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuY29uc3QgZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKVxyXG5jb25zdCB3aWR0aCA9IGRldmljZS53aW5kb3dXaWR0aFxyXG5jb25zdCBoZWlnaHQgPSBkZXZpY2Uud2luZG93SGVpZ2h0IC0gNzVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzcGljIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg5Zu+54mHJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgaXNVcGxvYWQ6IGZhbHNlLFxyXG4gICAgSU1HVVJMRURJVDogJycsXHJcbiAgICBjcm9wcGVyT3B0OiB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHNjYWxlOiAyLjUsXHJcbiAgICAgIHpvb206IDgsXHJcbiAgICAgIGN1dDoge1xyXG4gICAgICAgIHg6ICh3aWR0aCAtIDM2MCkgLyAyLFxyXG4gICAgICAgIHk6IChoZWlnaHQgLSAyMDApIC8gMixcclxuICAgICAgICB3aWR0aDogMzYwLFxyXG4gICAgICAgIGhlaWdodDogMjAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNyb3BwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbnMub25jZVwiOlwiY3JvcHBlck9wdFwiLFwiYmluZGJlZm9yZUltYWdlTG9hZFwiOlwiYmxcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgY3JvcHBlcjogQ3JvcHBlclxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgdXBsb2FkVGFwICgpIHtcclxuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzcmMgPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG4gICAgICAgICAgdGhpcy5pc1VwbG9hZCA9IHRydWVcclxuICAgICAgICAgIC8vICDojrflj5boo4Hliarlm77niYfotYTmupDlkI7vvIznu5lkYXRh5re75Yqgc3Jj5bGe5oCn5Y+K5YW25YC8XHJcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ2Nyb3BwZXInLCAncHVzaE9yaWdpbicsIHNyYylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0Q3JvcHBlckltYWdlICgpIHtcclxuICAgICAgdGhpcy4kaW52b2tlKCdjcm9wcGVyJywgJ2dldENyb3BwZXJJbWFnZScsIChzcmMpID0+IHtcclxuICAgICAgICBpZiAoc3JjICYmIHRoaXMuaXNVcGxvYWQpIHtcclxuICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICB1cmw6ICdhZGRnb29kcz9zcmM9JyArIHNyY1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC8vIOijgeWJquWQjueahOWbvueJh+S4iuS8oOe7meacjeWKoeWZqFxyXG4gICAgICAgICAgLy8g6I635Y+W5YWo5bGA55qEdXJsXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudG9hc3QoJ+iOt+WPluWbvueJh+WcsOWdgOWksei0pe+8jOivt+mHjeaWsOa3u+WKoOWbvueJhycpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICB0b2FzdCAodGl0bGUpIHtcclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQgKCkge1xyXG4gICAgdGhpcy5JTUdVUkxFRElUID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMRURJVFxyXG4gIH1cclxufVxyXG4iXX0=