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

var Out = function (_wepy$page) {
  _inherits(Out, _wepy$page);

  function Out() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Out);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Out.__proto__ || Object.getPrototypeOf(Out)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '广告'
    }, _this.data = {
      adLinkPath: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Out, [{
    key: 'onLoad',
    value: function onLoad(option) {
      this.adLinkPath = option.adLinkPath;
    }
  }]);

  return Out;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Out , 'pages/out'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm91dC5qcyJdLCJuYW1lcyI6WyJPdXQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImFkTGlua1BhdGgiLCJvcHRpb24iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVk7QUFEUCxLOzs7OzsyQkFHQUMsTSxFQUFRO0FBQ2IsV0FBS0QsVUFBTCxHQUFrQkMsT0FBT0QsVUFBekI7QUFDRDs7OztFQVQ4QkUsZUFBS0MsSTs7a0JBQWpCUCxHIiwiZmlsZSI6Im91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflub/lkYonXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBhZExpbmtQYXRoOiAnJ1xyXG4gIH1cclxuICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICB0aGlzLmFkTGlua1BhdGggPSBvcHRpb24uYWRMaW5rUGF0aFxyXG4gIH1cclxufVxyXG4iXX0=