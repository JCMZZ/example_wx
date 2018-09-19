'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// 把wepy导入到当前页面


// 从wepy.app继承一个类，并导出到当前配置项
var _class = function (_wepy$app) {
  _inherits(_class, _wepy$app);

  function _class() {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    _this.config = {
      // 项目的页面配置
      pages: ['pages/index', 'pages/commsg', 'pages/register', 'pages/selfrcmd', 'pages/user-manage', 'pages/editmsg', 'pages/me', 'pages/cart', 'pages/edit-money', 'pages/editgoods', 'pages/consume', 'pages/integral-record', 'pages/newrcmd', 'pages/payment', 'pages/unpaid', 'pages/successpay', 'pages/oldrcmd', 'pages/card-manage', 'pages/map', 'pages/failpay', 'pages/goods-details', 'pages/handlepic', 'pages/goodspic', 'pages/addgoodspic', 'pages/binduser', 'pages/useragreement', 'pages/addgoods', 'pages/out'],
      // 导航与窗体配置
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#67ABFE',
        navigationBarTitleText: '小程序',
        navigationBarTextStyle: 'white'
      }
      // 全局变量
    };
    _this.globalData = {
      URL: 'https://weixin.m.cn/businessestore/', // 100.100.9.59:8080   127.0.0.1:8080  weixin.m.cn
      IMGURL: 'https://weixin.m.cn/',
      IMGURLEDIT: 'https://weixin.m.cn/baseimg/'
      // URL: 'http://127.0.0.1:8080/businessestore/',   // 100.100.8.233:8080   127.0.0.1:8080  weixin.m.cn
      // IMGURL: 'https://weixin.m.cn/',
      // IMGURLEDIT: 'https://weixin.m.cn/baseimg/'
    };

    _this.use('promisify');
    return _this;
  }
  // app.json的配置项


  return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiVVJMIiwiSU1HVVJMIiwiSU1HVVJMRURJVCIsInVzZSIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7Ozs7OztBQURBOzs7QUFHQTs7OztBQUVFLG9CQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUFLZEEsTUFMYyxHQUtMO0FBQ1A7QUFDQUMsYUFBTyxDQUNMLGFBREssRUFFTCxjQUZLLEVBR0wsZ0JBSEssRUFJTCxnQkFKSyxFQUtMLG1CQUxLLEVBTUwsZUFOSyxFQU9MLFVBUEssRUFRTCxZQVJLLEVBU0wsa0JBVEssRUFVTCxpQkFWSyxFQVdMLGVBWEssRUFZTCx1QkFaSyxFQWFMLGVBYkssRUFjTCxlQWRLLEVBZUwsY0FmSyxFQWdCTCxrQkFoQkssRUFpQkwsZUFqQkssRUFrQkwsbUJBbEJLLEVBbUJMLFdBbkJLLEVBb0JMLGVBcEJLLEVBcUJMLHFCQXJCSyxFQXNCTCxpQkF0QkssRUF1QkwsZ0JBdkJLLEVBd0JMLG1CQXhCSyxFQXlCTCxnQkF6QkssRUEwQkwscUJBMUJLLEVBMkJMLGdCQTNCSyxFQTRCTCxXQTVCSyxDQUZBO0FBZ0NQO0FBQ0FDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixLQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEI7QUFPVjtBQXhDUyxLQUxLO0FBQUEsVUE4Q2RDLFVBOUNjLEdBOENEO0FBQ1hDLFdBQUsscUNBRE0sRUFDbUM7QUFDOUNDLGNBQVEsc0JBRkc7QUFHWEMsa0JBQVk7QUFDWjtBQUNBO0FBQ0E7QUFOVyxLQTlDQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsV0FBVDtBQUZZO0FBR2I7QUFDRDs7OztFQUwyQkMsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8g5oqKd2VweeWvvOWFpeWIsOW9k+WJjemhtemdolxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuLy8g5LuOd2VweS5hcHDnu6fmib/kuIDkuKrnsbvvvIzlubblr7zlh7rliLDlvZPliY3phY3nva7poblcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICB9XHJcbiAgLy8gYXBwLmpzb27nmoTphY3nva7poblcclxuICBjb25maWcgPSB7XHJcbiAgICAvLyDpobnnm67nmoTpobXpnaLphY3nva5cclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9jb21tc2cnLFxyXG4gICAgICAncGFnZXMvcmVnaXN0ZXInLFxyXG4gICAgICAncGFnZXMvc2VsZnJjbWQnLFxyXG4gICAgICAncGFnZXMvdXNlci1tYW5hZ2UnLFxyXG4gICAgICAncGFnZXMvZWRpdG1zZycsXHJcbiAgICAgICdwYWdlcy9tZScsXHJcbiAgICAgICdwYWdlcy9jYXJ0JyxcclxuICAgICAgJ3BhZ2VzL2VkaXQtbW9uZXknLFxyXG4gICAgICAncGFnZXMvZWRpdGdvb2RzJyxcclxuICAgICAgJ3BhZ2VzL2NvbnN1bWUnLFxyXG4gICAgICAncGFnZXMvaW50ZWdyYWwtcmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL25ld3JjbWQnLFxyXG4gICAgICAncGFnZXMvcGF5bWVudCcsXHJcbiAgICAgICdwYWdlcy91bnBhaWQnLFxyXG4gICAgICAncGFnZXMvc3VjY2Vzc3BheScsXHJcbiAgICAgICdwYWdlcy9vbGRyY21kJyxcclxuICAgICAgJ3BhZ2VzL2NhcmQtbWFuYWdlJyxcclxuICAgICAgJ3BhZ2VzL21hcCcsXHJcbiAgICAgICdwYWdlcy9mYWlscGF5JyxcclxuICAgICAgJ3BhZ2VzL2dvb2RzLWRldGFpbHMnLFxyXG4gICAgICAncGFnZXMvaGFuZGxlcGljJyxcclxuICAgICAgJ3BhZ2VzL2dvb2RzcGljJyxcclxuICAgICAgJ3BhZ2VzL2FkZGdvb2RzcGljJyxcclxuICAgICAgJ3BhZ2VzL2JpbmR1c2VyJyxcclxuICAgICAgJ3BhZ2VzL3VzZXJhZ3JlZW1lbnQnLFxyXG4gICAgICAncGFnZXMvYWRkZ29vZHMnLFxyXG4gICAgICAncGFnZXMvb3V0J1xyXG4gICAgXSxcclxuICAgIC8vIOWvvOiIquS4jueql+S9k+mFjee9rlxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjNjdBQkZFJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6jycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcclxuICAgIH1cclxuICB9XHJcbiAgLy8g5YWo5bGA5Y+Y6YePXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIFVSTDogJ2h0dHBzOi8vd2VpeGluLm0uY24vYnVzaW5lc3Nlc3RvcmUvJywgICAvLyAxMDAuMTAwLjkuNTk6ODA4MCAgIDEyNy4wLjAuMTo4MDgwICB3ZWl4aW4ubS5jblxyXG4gICAgSU1HVVJMOiAnaHR0cHM6Ly93ZWl4aW4ubS5jbi8nLFxyXG4gICAgSU1HVVJMRURJVDogJ2h0dHBzOi8vd2VpeGluLm0uY24vYmFzZWltZy8nXHJcbiAgICAvLyBVUkw6ICdodHRwOi8vMTI3LjAuMC4xOjgwODAvYnVzaW5lc3Nlc3RvcmUvJywgICAvLyAxMDAuMTAwLjguMjMzOjgwODAgICAxMjcuMC4wLjE6ODA4MCAgd2VpeGluLm0uY25cclxuICAgIC8vIElNR1VSTDogJ2h0dHBzOi8vd2VpeGluLm0uY24vJyxcclxuICAgIC8vIElNR1VSTEVESVQ6ICdodHRwczovL3dlaXhpbi5tLmNuL2Jhc2VpbWcvJ1xyXG4gIH1cclxufVxyXG4iXX0=