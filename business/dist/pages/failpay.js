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
      navigationBarTitleText: '支付失败'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      nodes: [{
        name: 'h1',
        children: [{
          type: 'text',
          text: '￥ 5000'
        }]
      }],
      type: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Successpay, [{
    key: 'onLoad',
    value: function onLoad(option) {
      this.type = option.type;
    }
  }]);

  return Successpay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Successpay , 'pages/failpay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhaWxwYXkuanMiXSwibmFtZXMiOlsiU3VjY2Vzc3BheSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJub2RlcyIsIm5hbWUiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwib3B0aW9uIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsY0FBUUM7QUFERSxLLFFBR1pDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLElBREE7QUFFTkMsa0JBQVUsQ0FBQztBQUNUQyxnQkFBTSxNQURHO0FBRVRDLGdCQUFNO0FBRkcsU0FBRDtBQUZKLE9BQUQsQ0FGRjtBQVNMRCxZQUFNO0FBVEQsSzs7Ozs7MkJBV0FFLE0sRUFBUTtBQUNiLFdBQUtGLElBQUwsR0FBWUUsT0FBT0YsSUFBbkI7QUFDRDs7OztFQXZCcUNHLGVBQUtDLEk7O2tCQUF4QmxCLFUiLCJmaWxlIjoiZmFpbHBheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VjY2Vzc3BheSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUr+S7mOWksei0pSdcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYmJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2VsZWN0ZWQ6IDMsXHJcbiAgICBub2RlczogW3tcclxuICAgICAgbmFtZTogJ2gxJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIHRleHQ6ICfvv6UgNTAwMCdcclxuICAgICAgfV1cclxuICAgIH1dLFxyXG4gICAgdHlwZTogJydcclxuICB9XHJcbiAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgdGhpcy50eXBlID0gb3B0aW9uLnR5cGVcclxuICB9XHJcbn1cclxuIl19