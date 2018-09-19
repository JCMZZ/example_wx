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
      navigationBarTitleText: '卡片管理'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      src: ['/images/goldcard.png', '/images/yincard.png', '/images/tongcard.png'],
      selected: 3,
      nameshow: true,
      show: true,
      sessionId: '',
      URL: '',
      list: [],
      index: 0,
      nameT: '',
      cardId: '',
      describeT: ''
      // 卡号缓存
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardManage, [{
    key: 'cardNameCache',
    value: function cardNameCache(e) {
      this.nameT = e.detail.value;
    }
    // 编辑卡名

  }, {
    key: 'editCardname',
    value: function editCardname() {
      this.nameshow = false;
    }
    // 取消编辑卡名

  }, {
    key: 'cancelCardname',
    value: function cancelCardname() {
      this.nameT = this.list[this.index].name;
      this.nameshow = true;
    }
    // 保存卡名

  }, {
    key: 'saveCardname',
    value: function saveCardname() {
      var _this2 = this;

      if (!/^[\s\S]{1,5}$/.test(this.nameT)) {
        _common2.default.tipAlert('请输入1到5个字');
        return;
      }
      this.nameshow = true;
      wx.request({
        url: this.URL + 'cardType/updateName',
        data: {
          id: this.cardId,
          name: this.nameT
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              _this2.backData();
            }
          }
        }
      });
    }
  }, {
    key: 'describeTxtCache',
    value: function describeTxtCache(e) {
      this.describeT = e.detail.value;
    }
    // 编辑描述

  }, {
    key: 'editTxt',
    value: function editTxt() {
      this.show = false;
    }
    // 取消描述

  }, {
    key: 'cancelTxt',
    value: function cancelTxt() {
      this.describeT = this.list[this.index].cardDescribe;
      this.show = true;
    }
    // 保存描述

  }, {
    key: 'saveTxt',
    value: function saveTxt(e) {
      var _this3 = this;

      if (this.describeT.length <= 0) {
        _common2.default.tipAlert('输入不能为空');
        return;
      }
      if (this.describeT.length >= 300) {
        _common2.default.tipAlert('输入不能大于300个字');
        return;
      }
      this.show = true;
      wx.request({
        url: this.URL + 'cardType/updateCardDescribe',
        data: {
          cardId: this.cardId,
          cardDescribe: this.describeT
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              _this3.backData();
            }
          }
        }
      });
    }
    // 获取滑动块的索引

  }, {
    key: 'getindex',
    value: function getindex(e) {
      this.index = e.detail.current;
      this.show = true;
      this.nameshow = true;
      this.backData();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.URL = this.$parent.globalData.URL;
      // 获取缓存数据
      this.sessionId = wx.getStorageSync('sessionId');
      this.backData();
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this4 = this;

      wx.request({
        url: this.URL + 'cardType/findCardType',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        data: {
          storeId: this.$parent.globalData.storeId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            _this4.list = res.data.result;
            _this4.nameT = _this4.list[_this4.index].name || '';
            _this4.describeT = _this4.list[_this4.index].cardDescribe || '';
            _this4.cardId = _this4.list[_this4.index].id || '';
            _this4.$apply();
          }
        }
      });
    }
  }]);

  return CardManage;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CardManage , 'pages/card-manage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQtbWFuYWdlLmpzIl0sIm5hbWVzIjpbIkNhcmRNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNyYyIsInNlbGVjdGVkIiwibmFtZXNob3ciLCJzaG93Iiwic2Vzc2lvbklkIiwiVVJMIiwibGlzdCIsImluZGV4IiwibmFtZVQiLCJjYXJkSWQiLCJkZXNjcmliZVQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJuYW1lIiwidGVzdCIsImNvbW1vbiIsInRpcEFsZXJ0Iiwid3giLCJyZXF1ZXN0IiwidXJsIiwiaWQiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiSW50ZXJjZXB0b3IiLCJtZXNzYWdlIiwiYmFja0RhdGEiLCJjYXJkRGVzY3JpYmUiLCJsZW5ndGgiLCJjdXJyZW50IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJnZXRTdG9yYWdlU3luYyIsInN0b3JlSWQiLCJyZXN1bHQiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFZO0FBQ1BDLGNBQVFDO0FBREQsSyxRQUdUQyxJLEdBQU87QUFDTEMsV0FBSyxDQUFDLHNCQUFELEVBQXlCLHFCQUF6QixFQUFnRCxzQkFBaEQsQ0FEQTtBQUVMQyxnQkFBVSxDQUZMO0FBR0xDLGdCQUFVLElBSEw7QUFJTEMsWUFBTSxJQUpEO0FBS0xDLGlCQUFXLEVBTE47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QUFLQyxLQUFmLEVBQXNCYyxFQUF0QixJQUE0QixFQUExQztBQUNBLG1CQUFLZ0IsTUFBTDtBQUNEO0FBQ0Y7QUFuQlEsT0FBWDtBQXFCRDs7OztFQXBKcUNDLGVBQUtDLEk7O2tCQUF4QmpELFUiLCJmaWxlIjoiY2FyZC1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRNYW5hZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y2h54mH566h55CGJ1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHM9IHtcclxuICAgICAgdGFiYmFyOiBUYWJiYXJcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHNyYzogWycvaW1hZ2VzL2dvbGRjYXJkLnBuZycsICcvaW1hZ2VzL3lpbmNhcmQucG5nJywgJy9pbWFnZXMvdG9uZ2NhcmQucG5nJ10sXHJcbiAgICAgIHNlbGVjdGVkOiAzLFxyXG4gICAgICBuYW1lc2hvdzogdHJ1ZSxcclxuICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgc2Vzc2lvbklkOiAnJyxcclxuICAgICAgVVJMOiAnJyxcclxuICAgICAgbGlzdDogW10sXHJcbiAgICAgIGluZGV4OiAwLFxyXG4gICAgICBuYW1lVDogJycsXHJcbiAgICAgIGNhcmRJZDogJycsXHJcbiAgICAgIGRlc2NyaWJlVDogJydcclxuICAgIH1cclxuICAgIC8vIOWNoeWPt+e8k+WtmFxyXG4gICAgY2FyZE5hbWVDYWNoZSAoZSkge1xyXG4gICAgICB0aGlzLm5hbWVUID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH1cclxuICAgIC8vIOe8lui+keWNoeWQjVxyXG4gICAgZWRpdENhcmRuYW1lKCkge1xyXG4gICAgICB0aGlzLm5hbWVzaG93ID0gZmFsc2VcclxuICAgIH1cclxuICAgIC8vIOWPlua2iOe8lui+keWNoeWQjVxyXG4gICAgY2FuY2VsQ2FyZG5hbWUgKCkge1xyXG4gICAgICB0aGlzLm5hbWVUID0gdGhpcy5saXN0W3RoaXMuaW5kZXhdLm5hbWVcclxuICAgICAgdGhpcy5uYW1lc2hvdyA9IHRydWVcclxuICAgIH1cclxuICAgIC8vIOS/neWtmOWNoeWQjVxyXG4gICAgc2F2ZUNhcmRuYW1lKCkge1xyXG4gICAgICBpZiAoIS9eW1xcc1xcU117MSw1fSQvLnRlc3QodGhpcy5uYW1lVCkpIHtcclxuICAgICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpTHliLA15Liq5a2XJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLm5hbWVzaG93ID0gdHJ1ZVxyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ2NhcmRUeXBlL3VwZGF0ZU5hbWUnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGlkOiB0aGlzLmNhcmRJZCxcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZVRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuYmFja0RhdGEoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgZGVzY3JpYmVUeHRDYWNoZSAoZSkge1xyXG4gICAgICB0aGlzLmRlc2NyaWJlVCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICAvLyDnvJbovpHmj4/ov7BcclxuICAgIGVkaXRUeHQgKCkge1xyXG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8g5Y+W5raI5o+P6L+wXHJcbiAgICBjYW5jZWxUeHQgKCkge1xyXG4gICAgICB0aGlzLmRlc2NyaWJlVCA9IHRoaXMubGlzdFt0aGlzLmluZGV4XS5jYXJkRGVzY3JpYmVcclxuICAgICAgdGhpcy5zaG93ID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8g5L+d5a2Y5o+P6L+wXHJcbiAgICBzYXZlVHh0IChlKSB7XHJcbiAgICAgIGlmICh0aGlzLmRlc2NyaWJlVC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn6L6T5YWl5LiN6IO95Li656m6JylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5kZXNjcmliZVQubGVuZ3RoID49IDMwMCkge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn6L6T5YWl5LiN6IO95aSn5LqOMzAw5Liq5a2XJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNob3cgPSB0cnVlXHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnY2FyZFR5cGUvdXBkYXRlQ2FyZERlc2NyaWJlJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjYXJkSWQ6IHRoaXMuY2FyZElkLFxyXG4gICAgICAgICAgY2FyZERlc2NyaWJlOiB0aGlzLmRlc2NyaWJlVFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB0aGlzLnNlc3Npb25JZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDojrflj5bmu5HliqjlnZfnmoTntKLlvJVcclxuICAgIGdldGluZGV4IChlKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC5jdXJyZW50XHJcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcclxuICAgICAgdGhpcy5uYW1lc2hvdyA9IHRydWVcclxuICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICB9XHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICAvLyDojrflj5bnvJPlrZjmlbDmja5cclxuICAgICAgdGhpcy5zZXNzaW9uSWQgPSB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICB9XHJcbiAgICAvLyDlm57mmL7mlbDmja5cclxuICAgIGJhY2tEYXRhKCkge1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ2NhcmRUeXBlL2ZpbmRDYXJkVHlwZScsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB0aGlzLnNlc3Npb25JZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgc3RvcmVJZDogdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc3RvcmVJZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5yZXN1bHRcclxuICAgICAgICAgICAgdGhpcy5uYW1lVCA9IHRoaXMubGlzdFt0aGlzLmluZGV4XS5uYW1lIHx8ICcnXHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpYmVUID0gdGhpcy5saXN0W3RoaXMuaW5kZXhdLmNhcmREZXNjcmliZSB8fCAnJ1xyXG4gICAgICAgICAgICB0aGlzLmNhcmRJZCA9IHRoaXMubGlzdFt0aGlzLmluZGV4XS5pZCB8fCAnJ1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19