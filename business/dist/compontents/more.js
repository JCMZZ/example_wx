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

var More = function (_wepy$page) {
  _inherits(More, _wepy$page);

  function More() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, More);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = More.__proto__ || Object.getPrototypeOf(More)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '查看更多'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(More, [{
    key: 'getMore',
    value: function getMore() {
      console.log('获取更多数据');
    }
  }]);

  return More;
}(_wepy2.default.page);

exports.default = More;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vcmUuanMiXSwibmFtZXMiOlsiTW9yZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEs7Ozs7OzhCQUdFO0FBQ1RDLGNBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7Ozs7RUFOK0JDLGVBQUtDLEk7O2tCQUFsQk4sSSIsImZpbGUiOiJtb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vcmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmn6XnnIvmm7TlpJonXHJcbiAgfVxyXG4gIGdldE1vcmUgKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+iOt+WPluabtOWkmuaVsOaNricpXHJcbiAgfVxyXG59XHJcbiJdfQ==