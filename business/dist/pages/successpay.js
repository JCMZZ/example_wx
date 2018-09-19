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

var Successpay = function (_wepy$page) {
  _inherits(Successpay, _wepy$page);

  function Successpay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Successpay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Successpay.__proto__ || Object.getPrototypeOf(Successpay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '支付完成'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      nodes: [{
        name: 'h1',
        children: [{
          type: 'text',
          text: ''
        }]
      }],
      type: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Successpay, [{
    key: 'onLoad',
    value: function onLoad(option) {
      this.type = option.type;
      this.nodes = [{
        name: 'h1',
        children: [{
          type: 'text',
          text: '￥' + option.price
        }]
      }];
    }
  }]);

  return Successpay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Successpay , 'pages/successpay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Y2Nlc3NwYXkuanMiXSwibmFtZXMiOlsiU3VjY2Vzc3BheSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJub2RlcyIsIm5hbWUiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwib3B0aW9uIiwicHJpY2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsVUFBekMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxjQUFRQztBQURFLEssUUFHWkMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sSUFEQTtBQUVOQyxrQkFBVSxDQUFDO0FBQ1RDLGdCQUFNLE1BREc7QUFFVEMsZ0JBQU07QUFGRyxTQUFEO0FBRkosT0FBRCxDQUZGO0FBU0xELFlBQU07QUFURCxLOzs7OzsyQkFXQUUsTSxFQUFRO0FBQ2IsV0FBS0YsSUFBTCxHQUFZRSxPQUFPRixJQUFuQjtBQUNBLFdBQUtILEtBQUwsR0FBYSxDQUFDO0FBQ1pDLGNBQU0sSUFETTtBQUVaQyxrQkFBVSxDQUFDO0FBQ1RDLGdCQUFNLE1BREc7QUFFVEMsZ0JBQU0sTUFBTUMsT0FBT0M7QUFGVixTQUFEO0FBRkUsT0FBRCxDQUFiO0FBT0Q7Ozs7RUE5QnFDQyxlQUFLQyxJOztrQkFBeEJuQixVIiwiZmlsZSI6InN1Y2Nlc3NwYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRhYmJhciBmcm9tICcuLi9jb21wb250ZW50cy90YWJiYXInXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1Y2Nlc3NwYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlK/ku5jlrozmiJAnXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNlbGVjdGUub25jZVwiOlwic2VsZWN0ZWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgdGFiYmFyOiBUYWJiYXJcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNlbGVjdGVkOiAzLFxyXG4gICAgbm9kZXM6IFt7XHJcbiAgICAgIG5hbWU6ICdoMScsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICB0ZXh0OiAnJ1xyXG4gICAgICB9XVxyXG4gICAgfV0sXHJcbiAgICB0eXBlOiAnJ1xyXG4gIH1cclxuICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICB0aGlzLnR5cGUgPSBvcHRpb24udHlwZVxyXG4gICAgdGhpcy5ub2RlcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdoMScsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICB0ZXh0OiAn77+lJyArIG9wdGlvbi5wcmljZVxyXG4gICAgICB9XVxyXG4gICAgfV1cclxuICB9XHJcbn1cclxuIl19