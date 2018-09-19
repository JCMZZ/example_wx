'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardManage = function (_wepy$page) {
  _inherits(CardManage, _wepy$page);

  function CardManage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardManage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardManage.__proto__ || Object.getPrototypeOf(CardManage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '会员卡'
    }, _this.components = {
      Tabbar: _tabbar2.default
    }, _this.data = {
      URL: '',
      name: '',
      number: '',
      cardDescribe: '',
      level: '',
      cardsrc: ['tongcard.png', 'yincard.png', 'goldcard.png']
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardManage, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      if (wx.getStorageSync('islogin') !== false) {
        wx.request({
          url: this.URL + 'customer/findCard',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'storeId': this.$parent.globalData.storeId,
            'sessionId': wx.getStorageSync('sessionId')
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              _this2.name = data.result.name;
              _this2.cardDescribe = data.result.cardDescribe;
              _this2.number = data.result.number;
              _this2.level = data.result.level;
              _this2.$apply();
            }
          }
        });
      }
    }
  }]);

  return CardManage;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CardManage , 'pages/card-manage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQtbWFuYWdlLmpzIl0sIm5hbWVzIjpbIkNhcmRNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIlRhYmJhciIsImRhdGEiLCJVUkwiLCJuYW1lIiwibnVtYmVyIiwiY2FyZERlc2NyaWJlIiwibGV2ZWwiLCJjYXJkc3JjIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsImhlYWRlciIsInN0b3JlSWQiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiY29tbW9uIiwiSW50ZXJjZXB0b3IiLCJyZXN1bHQiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFZO0FBQ1ZDO0FBRFUsSyxRQUdaQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxhQUFPLEVBTEY7QUFNTEMsZUFBUyxDQUFDLGNBQUQsRUFBaUIsYUFBakIsRUFBZ0MsY0FBaEM7QUFOSixLOzs7Ozs2QkFRRztBQUFBOztBQUNSLFdBQUtMLEdBQUwsR0FBVyxLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JQLEdBQW5DO0FBQ0EsVUFBSVEsR0FBR0MsY0FBSCxDQUFrQixTQUFsQixNQUFpQyxLQUFyQyxFQUE0QztBQUMxQ0QsV0FBR0UsT0FBSCxDQUFXO0FBQ1RDLGVBQUssS0FBS1gsR0FBTCxHQUFXLG1CQURQO0FBRVRZLGtCQUFRO0FBQ04sNEJBQWdCLGlEQURWO0FBRU4sdUJBQVcsS0FBS04sT0FBTCxDQUFhQyxVQUFiLENBQXdCTSxPQUY3QjtBQUdOLHlCQUFhTCxHQUFHQyxjQUFILENBQWtCLFdBQWxCO0FBSFAsV0FGQztBQU9USyxrQkFBUSxNQVBDO0FBUVRDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUlqQixPQUFPaUIsSUFBSWpCLElBQWY7QUFDQSxnQkFBSWtCLGlCQUFPQyxXQUFQLENBQW1CbkIsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixxQkFBS0UsSUFBTCxHQUFZRixLQUFLb0IsTUFBTCxDQUFZbEIsSUFBeEI7QUFDQSxxQkFBS0UsWUFBTCxHQUFvQkosS0FBS29CLE1BQUwsQ0FBWWhCLFlBQWhDO0FBQ0EscUJBQUtELE1BQUwsR0FBY0gsS0FBS29CLE1BQUwsQ0FBWWpCLE1BQTFCO0FBQ0EscUJBQUtFLEtBQUwsR0FBYUwsS0FBS29CLE1BQUwsQ0FBWWYsS0FBekI7QUFDQSxxQkFBS2dCLE1BQUw7QUFDRDtBQUNGO0FBakJRLFNBQVg7QUFtQkQ7QUFDRjs7OztFQXRDcUNDLGVBQUtDLEk7O2tCQUF4QjVCLFUiLCJmaWxlIjoiY2FyZC1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRNYW5hZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5ZGY5Y2hJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cz0ge1xyXG4gICAgICBUYWJiYXJcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIFVSTDogJycsXHJcbiAgICAgIG5hbWU6ICcnLFxyXG4gICAgICBudW1iZXI6ICcnLFxyXG4gICAgICBjYXJkRGVzY3JpYmU6ICcnLFxyXG4gICAgICBsZXZlbDogJycsXHJcbiAgICAgIGNhcmRzcmM6IFsndG9uZ2NhcmQucG5nJywgJ3lpbmNhcmQucG5nJywgJ2dvbGRjYXJkLnBuZyddXHJcbiAgICB9XHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoJ2lzbG9naW4nKSAhPT0gZmFsc2UpIHtcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogdGhpcy5VUkwgKyAnY3VzdG9tZXIvZmluZENhcmQnLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAnc3RvcmVJZCc6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnN0b3JlSWQsXHJcbiAgICAgICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5yZXN1bHQubmFtZVxyXG4gICAgICAgICAgICAgIHRoaXMuY2FyZERlc2NyaWJlID0gZGF0YS5yZXN1bHQuY2FyZERlc2NyaWJlXHJcbiAgICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBkYXRhLnJlc3VsdC5udW1iZXJcclxuICAgICAgICAgICAgICB0aGlzLmxldmVsID0gZGF0YS5yZXN1bHQubGV2ZWxcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=