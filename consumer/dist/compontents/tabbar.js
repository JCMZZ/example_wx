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
        // borderStyle: 'black',
        backgroundColor: '#ffffff',
        list: [{
          pagePath: '../pages/home',
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
          text: '我的',
          selected: 3
        }]
      }
    }, _this.globalData = {
      userInfo: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TabBar, [{
    key: 'onLoad',
    value: function onLoad() {
      // console.log(this.selecte)
    }
  }]);

  return TabBar;
}(_wepy2.default.component);

exports.default = TabBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmJhci5qcyJdLCJuYW1lcyI6WyJUYWJCYXIiLCJwcm9wcyIsInNlbGVjdGUiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsImRhdGEiLCJ0YWJiYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSyxHQUFRO0FBQ05DLGVBQVM7QUFDUEMsY0FBTUMsTUFEQztBQUVQQyxpQkFBUztBQUZGO0FBREgsSyxRQU1SQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOO0FBQ0FDLHlCQUFpQixTQUpYO0FBS05DLGNBQU0sQ0FBQztBQUNMQyxvQkFBVSxlQURMO0FBRUxDLG9CQUFVLHFCQUZMO0FBR0xDLDRCQUFrQixzQkFIYjtBQUlMQyxnQkFBTSxJQUpEO0FBS0xDLG9CQUFVO0FBTEwsU0FBRCxFQU1IO0FBQ0RKLG9CQUFVLGVBRFQ7QUFFREMsb0JBQVUsb0JBRlQ7QUFHREMsNEJBQWtCLHFCQUhqQjtBQUlEQyxnQkFBTSxJQUpMO0FBS0RDLG9CQUFVO0FBTFQsU0FORyxFQVlIO0FBQ0RKLG9CQUFVLGFBRFQ7QUFFREMsb0JBQVUsa0JBRlQ7QUFHREMsNEJBQWtCLG1CQUhqQjtBQUlEQyxnQkFBTSxJQUpMO0FBS0RDLG9CQUFVO0FBTFQsU0FaRztBQUxBO0FBREgsSyxRQTJCUEMsVSxHQUFhO0FBQ1hDLGdCQUFVO0FBREMsSzs7Ozs7NkJBR0o7QUFDUDtBQUNEOzs7O0VBdkNpQ0MsZUFBS0MsUzs7a0JBQXBCcEIsTSIsImZpbGUiOiJ0YWJiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYkJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBzZWxlY3RlOiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICB0YWJiYXI6IHtcclxuICAgICAgICBjb2xvcjogJyM3QTdFODMnLFxyXG4gICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNjdBQkZFJyxcclxuICAgICAgICAvLyBib3JkZXJTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBsaXN0OiBbe1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICcuLi9wYWdlcy9ob21lJyxcclxuICAgICAgICAgIGljb25QYXRoOiAnLi4vaW1hZ2VzL2luZGV4LnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi4vaW1hZ2VzL2luZGV4MS5wbmcnLFxyXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXHJcbiAgICAgICAgICBzZWxlY3RlZDogMVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiAnLi4vcGFnZXMvY2FydCcsXHJcbiAgICAgICAgICBpY29uUGF0aDogJy4uL2ltYWdlcy9jYXJ0LnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi4vaW1hZ2VzL2NhcnQxLnBuZycsXHJcbiAgICAgICAgICB0ZXh0OiAn5Lqn5ZOBJyxcclxuICAgICAgICAgIHNlbGVjdGVkOiAyXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICcuLi9wYWdlcy9tZScsXHJcbiAgICAgICAgICBpY29uUGF0aDogJy4uL2ltYWdlcy9tZS5wbmcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4uL2ltYWdlcy9tZTEucG5nJyxcclxuICAgICAgICAgIHRleHQ6ICfmiJHnmoQnLFxyXG4gICAgICAgICAgc2VsZWN0ZWQ6IDNcclxuICAgICAgICB9XVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBnbG9iYWxEYXRhID0ge1xyXG4gICAgICB1c2VySW5mbzogbnVsbFxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGUpXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=