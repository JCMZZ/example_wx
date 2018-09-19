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

var Dialog = function (_wepy$component) {
  _inherits(Dialog, _wepy$component);

  function Dialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      showModal: true,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }, _this.events = {}, _this.methods = {
      preventTouchMove: function preventTouchMove() {},

      /**
      * 对话框取消按钮点击事件
      */
      onCancel: function onCancel() {
        this.hideModal();
      },

      /**
      * 对话框确认按钮点击事件
      */
      onConfirm: function onConfirm() {
        this.hideModal();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dialog, [{
    key: 'hideModal',
    value: function hideModal() {
      this.showModal = false;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      // 查看是否授权
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function success(res) {
                console(res.userInfo);
              }
            });
          }
        }
      });
    }
  }]);

  return Dialog;
}(_wepy2.default.component);

exports.default = Dialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy5qcyJdLCJuYW1lcyI6WyJEaWFsb2ciLCJkYXRhIiwic2hvd01vZGFsIiwiY2FuSVVzZSIsInd4IiwiZXZlbnRzIiwibWV0aG9kcyIsInByZXZlbnRUb3VjaE1vdmUiLCJvbkNhbmNlbCIsImhpZGVNb2RhbCIsIm9uQ29uZmlybSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnZXRVc2VySW5mbyIsImNvbnNvbGUiLCJ1c2VySW5mbyIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxlQUFTQyxHQUFHRCxPQUFILENBQVcsOEJBQVg7QUFGSixLLFFBSVBFLE0sR0FBUyxFLFFBRVRDLE8sR0FBVTtBQUNSQyxzQkFEUSw4QkFDVyxDQUNsQixDQUZPOztBQUdSOzs7QUFHQUMsY0FOUSxzQkFNRztBQUNULGFBQUtDLFNBQUw7QUFDRCxPQVJPOztBQVNSOzs7QUFHQUMsZUFaUSx1QkFZSztBQUNYLGFBQUtELFNBQUw7QUFDRDtBQWRPLEs7Ozs7O2dDQWdCRztBQUNYLFdBQUtQLFNBQUwsR0FBaUIsS0FBakI7QUFDRDs7OzZCQUNTLENBQ1Q7Ozs2QkFDUztBQUNQO0FBQ0RFLFNBQUdPLFVBQUgsQ0FBYztBQUNaQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGNBQUlBLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckM7QUFDQVYsZUFBR1csV0FBSCxDQUFlO0FBQ2JILHVCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJHLHdCQUFRSCxJQUFJSSxRQUFaO0FBQ0Q7QUFIWSxhQUFmO0FBS0Q7QUFDRjtBQVZXLE9BQWQ7QUFZRDs7OztFQTFDaUNDLGVBQUtDLFM7O2tCQUFwQm5CLE0iLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2cgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93TW9kYWw6IHRydWUsXHJcbiAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKVxyXG4gICAgfVxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgcHJldmVudFRvdWNoTW92ZSgpIHtcclxuICAgICAgfSxcclxuICAgICAgLyoqXHJcbiAgICAgICog5a+56K+d5qGG5Y+W5raI5oyJ6ZKu54K55Ye75LqL5Lu2XHJcbiAgICAgICovXHJcbiAgICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZU1vZGFsKClcclxuICAgICAgfSxcclxuICAgICAgLyoqXHJcbiAgICAgICog5a+56K+d5qGG56Gu6K6k5oyJ6ZKu54K55Ye75LqL5Lu2XHJcbiAgICAgICovXHJcbiAgICAgIG9uQ29uZmlybSAoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlTW9kYWwoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBoaWRlTW9kYWwgKCkge1xyXG4gICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfVxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgIC8vIOafpeeci+aYr+WQpuaOiOadg1xyXG4gICAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7BcclxuICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZShyZXMudXNlckluZm8pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==