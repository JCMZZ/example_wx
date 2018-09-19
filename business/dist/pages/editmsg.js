'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editmsg = function (_wepy$page) {
  _inherits(Editmsg, _wepy$page);

  function Editmsg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Editmsg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editmsg.__proto__ || Object.getPrototypeOf(Editmsg)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑短信内容'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      show: true,
      IMGURLEDIT: '',
      selected: 3,
      disabled: 'true',
      msgclass: '',
      URL: '',
      msgT: '',
      msgvalue: '',
      type: ''
      // 编辑
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Editmsg, [{
    key: 'edit',
    value: function edit() {
      this.show = false;
    }
    // 取消

  }, {
    key: 'cancel',
    value: function cancel() {
      this.msgT = this.msgvalue;
      this.show = true;
    }
    // 保存

  }, {
    key: 'save',
    value: function save() {
      this.show = true;
      this.msgvalue = this.msgT;
    }
  }, {
    key: 'msgCache',
    value: function msgCache(e) {
      this.msgT = e.detail.value;
      // console.log(this.msgT)
    }
  }, {
    key: 'handlemsg',
    value: function handlemsg() {
      if (!this.show) {
        this.alertTip('请先保存短信内容');
        return;
      }
      // 校验短信内容
      if (!this.msgT) {
        this.alertTip('短信内容不能为空');
      } else {
        if (this.msgT.length > 1000) {
          this.alertTip('短信内容不能超过1000字');
        } else {
          wx.redirectTo({
            url: 'payment?type=' + this.type + '&msg=' + this.msgT
          });
        }
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      this.type = option.type;
    }
    // 提示框

  }, {
    key: 'alertTip',
    value: function alertTip(text) {
      wx.showModal({
        content: text,
        showCancel: false,
        success: function success(res) {}
      });
    }
  }]);

  return Editmsg;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Editmsg , 'pages/editmsg'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRtc2cuanMiXSwibmFtZXMiOlsiRWRpdG1zZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2hvdyIsIklNR1VSTEVESVQiLCJzZWxlY3RlZCIsImRpc2FibGVkIiwibXNnY2xhc3MiLCJVUkwiLCJtc2dUIiwibXNndmFsdWUiLCJ0eXBlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYWxlcnRUaXAiLCJsZW5ndGgiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJvcHRpb24iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRleHQiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsVUFBekMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxjQUFRQztBQURFLEssUUFHWkMsSSxHQUFPO0FBQ0xDLFlBQU0sSUFERDtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGdCQUFVLENBSEw7QUFJTEMsZ0JBQVUsTUFKTDtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLFdBQUssRUFOQTtBQU9MQyxZQUFNLEVBUEQ7QUFRTEMsZ0JBQVUsRUFSTDtBQVNMQyxZQUFNO0FBRVI7QUFYTyxLOzs7OzsyQkFZQztBQUNOLFdBQUtSLElBQUwsR0FBWSxLQUFaO0FBQ0Q7QUFDRDs7Ozs2QkFDVTtBQUNSLFdBQUtNLElBQUwsR0FBWSxLQUFLQyxRQUFqQjtBQUNBLFdBQUtQLElBQUwsR0FBWSxJQUFaO0FBQ0Q7QUFDRDs7OzsyQkFDUTtBQUNOLFdBQUtBLElBQUwsR0FBWSxJQUFaO0FBQ0EsV0FBS08sUUFBTCxHQUFnQixLQUFLRCxJQUFyQjtBQUNEOzs7NkJBQ1NHLEMsRUFBRztBQUNYLFdBQUtILElBQUwsR0FBWUcsRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNBO0FBQ0Q7OztnQ0FDWTtBQUNYLFVBQUksQ0FBQyxLQUFLWCxJQUFWLEVBQWdCO0FBQ2QsYUFBS1ksUUFBTCxDQUFjLFVBQWQ7QUFDQTtBQUNEO0FBQ0Q7QUFDQSxVQUFJLENBQUMsS0FBS04sSUFBVixFQUFnQjtBQUNkLGFBQUtNLFFBQUwsQ0FBYyxVQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxLQUFLTixJQUFMLENBQVVPLE1BQVYsR0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsZUFBS0QsUUFBTCxDQUFjLGVBQWQ7QUFDRCxTQUZELE1BRU87QUFDTEUsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGlCQUFLLGtCQUFrQixLQUFLUixJQUF2QixHQUE4QixPQUE5QixHQUF3QyxLQUFLRjtBQUR0QyxXQUFkO0FBR0Q7QUFDRjtBQUNGOzs7MkJBQ01XLE0sRUFBUTtBQUNiLFdBQUtaLEdBQUwsR0FBVyxLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLEdBQW5DO0FBQ0EsV0FBS0osVUFBTCxHQUFrQixLQUFLaUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCbEIsVUFBMUM7QUFDQSxXQUFLTyxJQUFMLEdBQVlTLE9BQU9ULElBQW5CO0FBQ0Q7QUFDRDs7Ozs2QkFDVVksSSxFQUFNO0FBQ2ROLFNBQUdPLFNBQUgsQ0FBYTtBQUNYQyxpQkFBU0YsSUFERTtBQUVYRyxvQkFBWSxLQUZEO0FBR1hDLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLE9BQWI7QUFLRDs7OztFQXJFa0NDLGVBQUtDLEk7O2tCQUFyQnJDLE8iLCJmaWxlIjoiZWRpdG1zZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG1zZyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e8lui+keefreS/oeWGheWuuSdcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYmJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvdzogdHJ1ZSxcclxuICAgIElNR1VSTEVESVQ6ICcnLFxyXG4gICAgc2VsZWN0ZWQ6IDMsXHJcbiAgICBkaXNhYmxlZDogJ3RydWUnLFxyXG4gICAgbXNnY2xhc3M6ICcnLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIG1zZ1Q6ICcnLFxyXG4gICAgbXNndmFsdWU6ICcnLFxyXG4gICAgdHlwZTogJydcclxuICB9XHJcbiAgLy8g57yW6L6RXHJcbiAgZWRpdCAoKSB7XHJcbiAgICB0aGlzLnNob3cgPSBmYWxzZVxyXG4gIH1cclxuICAvLyDlj5bmtohcclxuICBjYW5jZWwgKCkge1xyXG4gICAgdGhpcy5tc2dUID0gdGhpcy5tc2d2YWx1ZVxyXG4gICAgdGhpcy5zaG93ID0gdHJ1ZVxyXG4gIH1cclxuICAvLyDkv53lrZhcclxuICBzYXZlICgpIHtcclxuICAgIHRoaXMuc2hvdyA9IHRydWVcclxuICAgIHRoaXMubXNndmFsdWUgPSB0aGlzLm1zZ1RcclxuICB9XHJcbiAgbXNnQ2FjaGUgKGUpIHtcclxuICAgIHRoaXMubXNnVCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1zZ1QpXHJcbiAgfVxyXG4gIGhhbmRsZW1zZyAoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2hvdykge1xyXG4gICAgICB0aGlzLmFsZXJ0VGlwKCfor7flhYjkv53lrZjnn63kv6HlhoXlrrknKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIC8vIOagoemqjOefreS/oeWGheWuuVxyXG4gICAgaWYgKCF0aGlzLm1zZ1QpIHtcclxuICAgICAgdGhpcy5hbGVydFRpcCgn55+t5L+h5YaF5a655LiN6IO95Li656m6JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLm1zZ1QubGVuZ3RoID4gMTAwMCkge1xyXG4gICAgICAgIHRoaXMuYWxlcnRUaXAoJ+efreS/oeWGheWuueS4jeiDvei2hei/hzEwMDDlrZcnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgdXJsOiAncGF5bWVudD90eXBlPScgKyB0aGlzLnR5cGUgKyAnJm1zZz0nICsgdGhpcy5tc2dUXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgdGhpcy5JTUdVUkxFRElUID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMRURJVFxyXG4gICAgdGhpcy50eXBlID0gb3B0aW9uLnR5cGVcclxuICB9XHJcbiAgLy8g5o+Q56S65qGGXHJcbiAgYWxlcnRUaXAgKHRleHQpIHtcclxuICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7fVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19