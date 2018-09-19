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

var Home = function (_wepy$page) {
  _inherits(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '上传地址'
    }, _this.data = {
      markers: [{
        iconPath: '../images/location.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color: 'blue',
        width: 5,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: '../images/location.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }, _this.methods = {
      regionchange: function regionchange(e) {
        // console.log(e.type)
      },
      markertap: function markertap(e) {
        // console.log(e.markerId)
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/map'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyJdLCJuYW1lcyI6WyJIb21lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtYXJrZXJzIiwiaWNvblBhdGgiLCJpZCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwid2lkdGgiLCJoZWlnaHQiLCJwb2x5bGluZSIsInBvaW50cyIsImNvbG9yIiwiZG90dGVkTGluZSIsImNvbnRyb2xzIiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiY2xpY2thYmxlIiwibWV0aG9kcyIsInJlZ2lvbmNoYW5nZSIsImUiLCJtYXJrZXJ0YXAiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUNtQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ2pCQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsQ0FBQztBQUNSQyxrQkFBVSx3QkFERjtBQUVSQyxZQUFJLENBRkk7QUFHUkMsa0JBQVUsU0FIRjtBQUlSQyxtQkFBVyxVQUpIO0FBS1JDLGVBQU8sRUFMQztBQU1SQyxnQkFBUTtBQU5BLE9BQUQsQ0FESjtBQVNMQyxnQkFBVSxDQUFDO0FBQ1RDLGdCQUFRLENBQUM7QUFDUEoscUJBQVcsV0FESjtBQUVQRCxvQkFBVTtBQUZILFNBQUQsRUFHTDtBQUNEQyxxQkFBVyxVQURWO0FBRURELG9CQUFVO0FBRlQsU0FISyxDQURDO0FBUVRNLGVBQU8sTUFSRTtBQVNUSixlQUFPLENBVEU7QUFVVEssb0JBQVk7QUFWSCxPQUFELENBVEw7QUFxQkxDLGdCQUFVLENBQUM7QUFDVFQsWUFBSSxDQURLO0FBRVRELGtCQUFVLHdCQUZEO0FBR1RXLGtCQUFVO0FBQ1JDLGdCQUFNLENBREU7QUFFUkMsZUFBSyxNQUFNLEVBRkg7QUFHUlQsaUJBQU8sRUFIQztBQUlSQyxrQkFBUTtBQUpBLFNBSEQ7QUFTVFMsbUJBQVc7QUFURixPQUFEO0FBckJMLEssUUFpQ1BDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDTUMsQ0FETixFQUNTO0FBQ2Y7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUdELENBSkgsRUFJTTtBQUNaO0FBQ0Q7QUFOTyxLOzs7O0VBckNvQkUsZUFBS0MsSTs7a0JBQWxCekIsSSIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4iuS8oOWcsOWdgCdcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIG1hcmtlcnM6IFt7XHJcbiAgICAgICAgaWNvblBhdGg6ICcuLi9pbWFnZXMvbG9jYXRpb24ucG5nJyxcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICBsYXRpdHVkZTogMjMuMDk5OTk0LFxyXG4gICAgICAgIGxvbmdpdHVkZTogMTEzLjMyNDUyMCxcclxuICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgaGVpZ2h0OiA1MFxyXG4gICAgICB9XSxcclxuICAgICAgcG9seWxpbmU6IFt7XHJcbiAgICAgICAgcG9pbnRzOiBbe1xyXG4gICAgICAgICAgbG9uZ2l0dWRlOiAxMTMuMzI0NTIxMSxcclxuICAgICAgICAgIGxhdGl0dWRlOiAyMy4xMDIyOVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGxvbmdpdHVkZTogMTEzLjMyNDUyMCxcclxuICAgICAgICAgIGxhdGl0dWRlOiAyMy4yMTIyOVxyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIGNvbG9yOiAnYmx1ZScsXHJcbiAgICAgICAgd2lkdGg6IDUsXHJcbiAgICAgICAgZG90dGVkTGluZTogdHJ1ZVxyXG4gICAgICB9XSxcclxuICAgICAgY29udHJvbHM6IFt7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgaWNvblBhdGg6ICcuLi9pbWFnZXMvbG9jYXRpb24ucG5nJyxcclxuICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgIHRvcDogMzAwIC0gNTAsXHJcbiAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGlja2FibGU6IHRydWVcclxuICAgICAgfV1cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHJlZ2lvbmNoYW5nZSAoZSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudHlwZSlcclxuICAgICAgfSxcclxuICAgICAgbWFya2VydGFwIChlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5tYXJrZXJJZClcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==