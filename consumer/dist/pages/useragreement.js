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

var Useragreement = function (_wepy$page) {
  _inherits(Useragreement, _wepy$page);

  function Useragreement() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Useragreement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Useragreement.__proto__ || Object.getPrototypeOf(Useragreement)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '使用条款'
    }, _this.data = {
      IMGURLEDIT: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Useragreement, [{
    key: 'onLoad',
    value: function onLoad() {
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
    }
  }]);

  return Useragreement;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Useragreement , 'pages/useragreement'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJhZ3JlZW1lbnQuanMiXSwibmFtZXMiOlsiVXNlcmFncmVlbWVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiSU1HVVJMRURJVCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsYTs7Ozs7Ozs7Ozs7Ozs7b01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZO0FBRFAsSzs7Ozs7NkJBR0U7QUFDUCxXQUFLQSxVQUFMLEdBQWtCLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsVUFBMUM7QUFDRDs7OztFQVR3Q0csZUFBS0MsSTs7a0JBQTNCUixhIiwiZmlsZSI6InVzZXJhZ3JlZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlcmFncmVlbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S9v+eUqOadoeasvidcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIElNR1VSTEVESVQ6ICcnXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICB9XHJcbn1cclxuIl19