'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBar = function (_wepy$component) {
  _inherits(TabBar, _wepy$component);

  function TabBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TabBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      selecte: {
        type: Number,
        default: 'null'
      }
    }, _this.data = {
      tabbar: {
        color: '#7A7E83',
        selectedColor: '#67ABFE',
        backgroundColor: '#ffffff',
        list: [{
          pagePath: '../pages/index',
          iconPath: '../images/index.png',
          selectedIconPath: '../images/index1.png',
          text: '首页',
          selected: 1
        }, {
          pagePath: '../pages/cart',
          iconPath: '../images/cart.png',
          selectedIconPath: '../images/cart1.png',
          text: '产品',
          selected: 2
        }, {
          pagePath: '../pages/me',
          iconPath: '../images/me.png',
          selectedIconPath: '../images/me1.png',
          text: '管理',
          selected: 3
        }]
      }
    }, _this.globalData = {
      userInfo: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return TabBar;
}(_wepy2.default.component);

exports.default = TabBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmJhci5qcyJdLCJuYW1lcyI6WyJUYWJCYXIiLCJwcm9wcyIsInNlbGVjdGUiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsImRhdGEiLCJ0YWJiYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTO0FBQ1BDLGNBQU1DLE1BREM7QUFFUEMsaUJBQVM7QUFGRjtBQURILEssUUFNUkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZUFBTyxTQUREO0FBRU5DLHVCQUFlLFNBRlQ7QUFHTkMseUJBQWlCLFNBSFg7QUFJTkMsY0FBTSxDQUFDO0FBQ0xDLG9CQUFVLGdCQURMO0FBRUxDLG9CQUFVLHFCQUZMO0FBR0xDLDRCQUFrQixzQkFIYjtBQUlMQyxnQkFBTSxJQUpEO0FBS0xDLG9CQUFVO0FBTEwsU0FBRCxFQU1IO0FBQ0RKLG9CQUFVLGVBRFQ7QUFFREMsb0JBQVUsb0JBRlQ7QUFHREMsNEJBQWtCLHFCQUhqQjtBQUlEQyxnQkFBTSxJQUpMO0FBS0RDLG9CQUFVO0FBTFQsU0FORyxFQVlIO0FBQ0RKLG9CQUFVLGFBRFQ7QUFFREMsb0JBQVUsa0JBRlQ7QUFHREMsNEJBQWtCLG1CQUhqQjtBQUlEQyxnQkFBTSxJQUpMO0FBS0RDLG9CQUFVO0FBTFQsU0FaRztBQUpBO0FBREgsSyxRQTBCUEMsVSxHQUFhO0FBQ1hDLGdCQUFVO0FBREMsSzs7OztFQWpDcUJDLGVBQUtDLFM7O2tCQUFwQnBCLE0iLCJmaWxlIjoidGFiYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJCYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgc2VsZWN0ZToge1xyXG4gICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICBkZWZhdWx0OiAnbnVsbCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgdGFiYmFyOiB7XHJcbiAgICAgICAgY29sb3I6ICcjN0E3RTgzJyxcclxuICAgICAgICBzZWxlY3RlZENvbG9yOiAnIzY3QUJGRScsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgbGlzdDogW3tcclxuICAgICAgICAgIHBhZ2VQYXRoOiAnLi4vcGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICcuLi9pbWFnZXMvaW5kZXgucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuLi9pbWFnZXMvaW5kZXgxLnBuZycsXHJcbiAgICAgICAgICB0ZXh0OiAn6aaW6aG1JyxcclxuICAgICAgICAgIHNlbGVjdGVkOiAxXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICcuLi9wYWdlcy9jYXJ0JyxcclxuICAgICAgICAgIGljb25QYXRoOiAnLi4vaW1hZ2VzL2NhcnQucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuLi9pbWFnZXMvY2FydDEucG5nJyxcclxuICAgICAgICAgIHRleHQ6ICfkuqflk4EnLFxyXG4gICAgICAgICAgc2VsZWN0ZWQ6IDJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogJy4uL3BhZ2VzL21lJyxcclxuICAgICAgICAgIGljb25QYXRoOiAnLi4vaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi4vaW1hZ2VzL21lMS5wbmcnLFxyXG4gICAgICAgICAgdGV4dDogJ+euoeeQhicsXHJcbiAgICAgICAgICBzZWxlY3RlZDogM1xyXG4gICAgICAgIH1dXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdsb2JhbERhdGEgPSB7XHJcbiAgICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=