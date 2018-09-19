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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      // 项目的页面配置
      pages: ['pages/home', 'pages/register', 'pages/cart', 'pages/cartlist', 'pages/me', 'pages/goods-details', 'pages/banlance-details', 'pages/integral-record', 'pages/card-manage', 'pages/useragreement', 'pages/out'],
      // 导航与窗体配置
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#67ABFE',
        navigationBarTitleText: 'C端',
        navigationBarTextStyle: 'white'
      }
    }, _this.globalData = {
      storeId: 1,
      URL: 'https://weixin.m.cn/consumerestore/', // 100.100.9.40  127.0.0.1  http://100.100.9.40:8080
      IMGURL: 'https://weixin.m.cn/', // http://100.100.9.40:8082  https://weixin.m.cn
      IMGURLEDIT: 'https://weixin.m.cn/baseimg/'
      // URL: 'http://127.0.0.1:8080/consumerestore/',   // 100.100.8.233:8080   127.0.0.1:8080  weixin.m.cn
      // IMGURL: 'http://127.0.0.1:8080/',
      // IMGURLEDIT: 'http://127.0.0.1:8080/baseimg/'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // app.json的配置项


  return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwic3RvcmVJZCIsIlVSTCIsIklNR1VSTCIsIklNR1VSTEVESVQiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7OztzTEFHRUEsTSxHQUFTO0FBQ1A7QUFDQUMsYUFBTyxDQUNMLFlBREssRUFFTCxnQkFGSyxFQUdMLFlBSEssRUFJTCxnQkFKSyxFQUtMLFVBTEssRUFNTCxxQkFOSyxFQU9MLHdCQVBLLEVBUUwsdUJBUkssRUFTTCxtQkFUSyxFQVVMLHFCQVZLLEVBV0wsV0FYSyxDQUZBO0FBZVA7QUFDQUMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLElBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQjtBQWhCRCxLLFFBdUJUQyxVLEdBQWE7QUFDWEMsZUFBUyxDQURFO0FBRVhDLFdBQUsscUNBRk0sRUFFaUM7QUFDNUNDLGNBQVEsc0JBSEcsRUFHcUI7QUFDaENDLGtCQUFZO0FBQ1o7QUFDQTtBQUNBO0FBUFcsSzs7QUF4QmI7Ozs7RUFEMkJDLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIOaKindlcHnlr7zlhaXliLDlvZPliY3pobXpnaJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbi8vIOS7jndlcHkuYXBw57un5om/5LiA5Liq57G777yM5bm25a+85Ye65Yiw5b2T5YmN6YWN572u6aG5XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIC8vIGFwcC5qc29u55qE6YWN572u6aG5XHJcbiAgY29uZmlnID0ge1xyXG4gICAgLy8g6aG555uu55qE6aG16Z2i6YWN572uXHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaG9tZScsXHJcbiAgICAgICdwYWdlcy9yZWdpc3RlcicsXHJcbiAgICAgICdwYWdlcy9jYXJ0JyxcclxuICAgICAgJ3BhZ2VzL2NhcnRsaXN0JyxcclxuICAgICAgJ3BhZ2VzL21lJyxcclxuICAgICAgJ3BhZ2VzL2dvb2RzLWRldGFpbHMnLFxyXG4gICAgICAncGFnZXMvYmFubGFuY2UtZGV0YWlscycsXHJcbiAgICAgICdwYWdlcy9pbnRlZ3JhbC1yZWNvcmQnLFxyXG4gICAgICAncGFnZXMvY2FyZC1tYW5hZ2UnLFxyXG4gICAgICAncGFnZXMvdXNlcmFncmVlbWVudCcsXHJcbiAgICAgICdwYWdlcy9vdXQnXHJcbiAgICBdLFxyXG4gICAgLy8g5a+86Iiq5LiO56qX5L2T6YWN572uXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyM2N0FCRkUnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnQ+errycsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcclxuICAgIH1cclxuICB9XHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHN0b3JlSWQ6IDEsXHJcbiAgICBVUkw6ICdodHRwczovL3dlaXhpbi5tLmNuL2NvbnN1bWVyZXN0b3JlLycsIC8vIDEwMC4xMDAuOS40MCAgMTI3LjAuMC4xICBodHRwOi8vMTAwLjEwMC45LjQwOjgwODBcclxuICAgIElNR1VSTDogJ2h0dHBzOi8vd2VpeGluLm0uY24vJywgLy8gaHR0cDovLzEwMC4xMDAuOS40MDo4MDgyICBodHRwczovL3dlaXhpbi5tLmNuXHJcbiAgICBJTUdVUkxFRElUOiAnaHR0cHM6Ly93ZWl4aW4ubS5jbi9iYXNlaW1nLydcclxuICAgIC8vIFVSTDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MC9jb25zdW1lcmVzdG9yZS8nLCAgIC8vIDEwMC4xMDAuOC4yMzM6ODA4MCAgIDEyNy4wLjAuMTo4MDgwICB3ZWl4aW4ubS5jblxyXG4gICAgLy8gSU1HVVJMOiAnaHR0cDovLzEyNy4wLjAuMTo4MDgwLycsXHJcbiAgICAvLyBJTUdVUkxFRElUOiAnaHR0cDovLzEyNy4wLjAuMTo4MDgwL2Jhc2VpbWcvJ1xyXG4gIH1cclxufVxyXG4iXX0=