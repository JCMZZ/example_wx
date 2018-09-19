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

var Commsg = function (_wepy$page) {
  _inherits(Commsg, _wepy$page);

  function Commsg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Commsg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Commsg.__proto__ || Object.getPrototypeOf(Commsg)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑短信内容'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      show: true,
      selected: 3,
      IMGURLEDIT: '',
      disabled: 'true',
      msgclass: '',
      URL: '',
      msgT: '',
      msgvalue: '',
      type: ''
      // 编辑
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Commsg, [{
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
    }
  }, {
    key: 'handlemsg',
    value: function handlemsg() {
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

  return Commsg;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Commsg , 'pages/commsg'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1zZy5qcyJdLCJuYW1lcyI6WyJDb21tc2ciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNob3ciLCJzZWxlY3RlZCIsIklNR1VSTEVESVQiLCJkaXNhYmxlZCIsIm1zZ2NsYXNzIiwiVVJMIiwibXNnVCIsIm1zZ3ZhbHVlIiwidHlwZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImFsZXJ0VGlwIiwibGVuZ3RoIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwib3B0aW9uIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ0ZXh0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsY0FBUUM7QUFERSxLLFFBR1pDLEksR0FBTztBQUNMQyxZQUFNLElBREQ7QUFFTEMsZ0JBQVUsQ0FGTDtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGdCQUFVLE1BSkw7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxXQUFLLEVBTkE7QUFPTEMsWUFBTSxFQVBEO0FBUUxDLGdCQUFVLEVBUkw7QUFTTEMsWUFBTTtBQUVSO0FBWE8sSzs7Ozs7MkJBWUM7QUFDTixXQUFLUixJQUFMLEdBQVksS0FBWjtBQUNEO0FBQ0Q7Ozs7NkJBQ1U7QUFDUixXQUFLTSxJQUFMLEdBQVksS0FBS0MsUUFBakI7QUFDQSxXQUFLUCxJQUFMLEdBQVksSUFBWjtBQUNEO0FBQ0Q7Ozs7MkJBQ1E7QUFDTixXQUFLQSxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUtPLFFBQUwsR0FBZ0IsS0FBS0QsSUFBckI7QUFDRDs7OzZCQUNTRyxDLEVBQUc7QUFDWCxXQUFLSCxJQUFMLEdBQVlHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDRDs7O2dDQUNZO0FBQ1g7QUFDQSxVQUFJLENBQUMsS0FBS0wsSUFBVixFQUFnQjtBQUNkLGFBQUtNLFFBQUwsQ0FBYyxVQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxLQUFLTixJQUFMLENBQVVPLE1BQVYsR0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsZUFBS0QsUUFBTCxDQUFjLGVBQWQ7QUFDRCxTQUZELE1BRU87QUFDTEUsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGlCQUFLLGtCQUFrQixLQUFLUixJQUF2QixHQUE4QixPQUE5QixHQUF3QyxLQUFLRjtBQUR0QyxXQUFkO0FBR0Q7QUFDRjtBQUNGOzs7MkJBQ01XLE0sRUFBUTtBQUNiLFdBQUtaLEdBQUwsR0FBVyxLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLEdBQW5DO0FBQ0EsV0FBS0gsVUFBTCxHQUFrQixLQUFLZ0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCakIsVUFBMUM7QUFDQSxXQUFLTSxJQUFMLEdBQVlTLE9BQU9ULElBQW5CO0FBQ0Q7QUFDRDs7Ozs2QkFDVVksSSxFQUFNO0FBQ2ROLFNBQUdPLFNBQUgsQ0FBYTtBQUNYQyxpQkFBU0YsSUFERTtBQUVYRyxvQkFBWSxLQUZEO0FBR1hDLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLE9BQWI7QUFLRDs7OztFQWhFaUNDLGVBQUtDLEk7O2tCQUFwQnJDLE0iLCJmaWxlIjoiY29tbXNnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tc2cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvJbovpHnn63kv6HlhoXlrrknXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNlbGVjdGUub25jZVwiOlwic2VsZWN0ZWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgdGFiYmFyOiBUYWJiYXJcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNob3c6IHRydWUsXHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIElNR1VSTEVESVQ6ICcnLFxyXG4gICAgZGlzYWJsZWQ6ICd0cnVlJyxcclxuICAgIG1zZ2NsYXNzOiAnJyxcclxuICAgIFVSTDogJycsXHJcbiAgICBtc2dUOiAnJyxcclxuICAgIG1zZ3ZhbHVlOiAnJyxcclxuICAgIHR5cGU6ICcnXHJcbiAgfVxyXG4gIC8vIOe8lui+kVxyXG4gIGVkaXQgKCkge1xyXG4gICAgdGhpcy5zaG93ID0gZmFsc2VcclxuICB9XHJcbiAgLy8g5Y+W5raIXHJcbiAgY2FuY2VsICgpIHtcclxuICAgIHRoaXMubXNnVCA9IHRoaXMubXNndmFsdWVcclxuICAgIHRoaXMuc2hvdyA9IHRydWVcclxuICB9XHJcbiAgLy8g5L+d5a2YXHJcbiAgc2F2ZSAoKSB7XHJcbiAgICB0aGlzLnNob3cgPSB0cnVlXHJcbiAgICB0aGlzLm1zZ3ZhbHVlID0gdGhpcy5tc2dUXHJcbiAgfVxyXG4gIG1zZ0NhY2hlIChlKSB7XHJcbiAgICB0aGlzLm1zZ1QgPSBlLmRldGFpbC52YWx1ZVxyXG4gIH1cclxuICBoYW5kbGVtc2cgKCkge1xyXG4gICAgLy8g5qCh6aqM55+t5L+h5YaF5a65XHJcbiAgICBpZiAoIXRoaXMubXNnVCkge1xyXG4gICAgICB0aGlzLmFsZXJ0VGlwKCfnn63kv6HlhoXlrrnkuI3og73kuLrnqbonKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubXNnVC5sZW5ndGggPiAxMDAwKSB7XHJcbiAgICAgICAgdGhpcy5hbGVydFRpcCgn55+t5L+h5YaF5a655LiN6IO96LaF6L+HMTAwMOWtlycpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICB1cmw6ICdwYXltZW50P3R5cGU9JyArIHRoaXMudHlwZSArICcmbXNnPScgKyB0aGlzLm1zZ1RcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZChvcHRpb24pIHtcclxuICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICB0aGlzLklNR1VSTEVESVQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxFRElUXHJcbiAgICB0aGlzLnR5cGUgPSBvcHRpb24udHlwZVxyXG4gIH1cclxuICAvLyDmj5DnpLrmoYZcclxuICBhbGVydFRpcCAodGV4dCkge1xyXG4gICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgY29udGVudDogdGV4dCxcclxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHt9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=