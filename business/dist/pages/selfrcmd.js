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
// import api from '../api/api'


var Oldrcmd = function (_wepy$page) {
  _inherits(Oldrcmd, _wepy$page);

  function Oldrcmd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Oldrcmd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Oldrcmd.__proto__ || Object.getPrototypeOf(Oldrcmd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '自主营销'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 3,
      checkAllActive: false,
      tabs: ['待推荐', '待支付', '已付费'],
      activeIndex: '0',
      sliderOffset: 0,
      sliderLeft: 0,
      balanceSort: true,
      integralSort: true,
      classSort: true,
      sortActive: 'balance',
      sessionId: '',
      orderType: [1, 1],
      stayRecommendStart: 1,
      stayRecommendList: [],
      stayPayStart: 1,
      stayPayList: [],
      yetPayStart: 1,
      yetPayList: [],
      limit: 10,
      URL: '',
      IMGURL: '',
      IMGURLEDIT: '',
      type: '3'
    }, _this.methods = {
      // 全选
      checkAll: function checkAll() {
        var _this2 = this;

        this.checkAllActive = !this.checkAllActive;
        this.stayRecommendList = this.stayRecommendList.map(function (value) {
          value['checked'] = _this2.checkAllActive;
          return value;
        });
      },

      // 复选框change
      checkboxChange: function checkboxChange(e) {
        this.stayRecommendList = this.stayRecommendList.map(function (value) {
          value['checked'] = e.detail.value.indexOf(value.id + '') !== -1;
          return value;
        });
        this.checkAllActive = e.detail.value.length === this.stayRecommendList.length;
      },

      // 发送按钮
      send: function send() {
        if (!this.stayRecommendList.some(function (value) {
          return value.checked;
        })) {
          _common2.default.tipAlert('至少选择一个用户');
          return;
        }
        wx.setStorageSync('selfrcmd', this.stayRecommendList);
        wx.navigateTo({
          url: 'editmsg?type=' + this.type
        });
      },

      // 排序栏
      sortHandler: function sortHandler(type) {
        var _this3 = this;

        if (this.stayRecommendList.some(function (value) {
          return value.checked;
        })) {
          wx.showModal({
            content: '重新排序会清除已选数据，是否排序？',
            showCancel: true,
            success: function success(res) {
              if (res.confirm) {
                _this3.sortFunc(type);
              }
            }
          });
        } else {
          this.sortFunc(type);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置


  _createClass(Oldrcmd, [{
    key: 'sortFunc',

    // 排序
    value: function sortFunc(type) {
      wx.removeStorageSync('selfrcmd');
      this.checkAllActive = false;
      var limit = this.limit * this.stayRecommendStart;
      this.sortActive = type;
      switch (type) {
        case 'balance':
          this.balanceSort = !this.balanceSort;
          this.orderType[0] = 1;
          this.orderType[1] = this.balanceSort ? 1 : 2;
          this.getData(false, {
            serviceType: 3,
            serviceState: 0,
            orderType: 1,
            orderMethod: this.orderType[1],
            start: 1,
            limit: limit
          }, 0);
          break;
        case 'integral':
          this.integralSort = !this.integralSort;
          this.orderType[0] = 2;
          this.orderType[1] = this.integralSort ? 1 : 2;
          this.getData(false, {
            serviceType: 3,
            serviceState: 0,
            orderType: 2,
            orderMethod: this.orderType[1],
            start: 1,
            limit: limit
          }, 0);
          break;
        case 'class':
          this.classSort = !this.classSort;
          this.orderType[0] = 3;
          this.orderType[1] = this.classSort ? 1 : 2;
          this.getData(false, {
            serviceType: 3,
            serviceState: 0,
            orderType: 3,
            orderMethod: this.orderType[1],
            start: 1,
            limit: limit
          }, 0);
      }
    }
    // tab切换

  }, {
    key: 'tabClick',
    value: function tabClick(e) {
      this.sliderOffset = e.currentTarget.offsetLeft;
      this.activeIndex = e.currentTarget.id;
      switch (this.activeIndex) {
        case '1':
          this.getData(true, {
            serviceType: 3,
            serviceState: 1,
            start: 1,
            limit: this.limit * this.stayPayStart
          }, 1);
          break;
        case '2':
          this.getData(true, {
            serviceType: 3,
            serviceState: 2,
            start: 1,
            limit: this.limit * this.yetPayStart
          }, 2);
      }
    }
    // 获取更多数据

  }, {
    key: 'getMore',
    value: function getMore(e) {
      var type = e.currentTarget.dataset.type;
      switch (type) {
        case '待推荐':
          wx.removeStorageSync('selfrcmd');
          // this.stayRecommendList = this.stayRecommendList.map(value => {
          //   value['checked'] = false
          //   return value
          // })
          // this.checkAllActive = false
          this.stayRecommendStart++;
          this.getData(false, {
            serviceType: 3,
            serviceState: 0,
            orderType: this.orderType[0],
            orderMethod: this.orderType[1],
            start: this.stayRecommendStart,
            limit: this.limit
          }, 0, true);
          break;
        case '待支付':
          this.stayPayStart++;
          this.getData(true, {
            serviceType: 3,
            serviceState: 1,
            start: this.stayPayStart,
            limit: this.limit
          }, 1, true);
          break;
        case '已付费':
          this.yetPayStart++;
          this.getData(true, {
            serviceType: 3,
            serviceState: 2,
            start: this.yetPayStart,
            limit: this.limit
          }, 2, true);
      }
    }
    // 获取数据请求

  }, {
    key: 'getData',
    value: function getData(urlType, data, tabType, more) {
      var _this4 = this;

      more || (more = false);
      var url = urlType ? 'service/selectService' : 'service/selectUser';
      wx.request({
        url: this.URL + url,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': this.sessionId
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            var list = data.result.list;
            list instanceof Array && list.length <= 0 && more && _common2.default.tipAlert('没有更多数据了');
            switch (tabType) {
              case 0:
                _this4.stayRecommendList = more ? _this4.stayRecommendList.concat(list) : list;
                if (more && _this4.checkAllActive) {
                  _this4.stayRecommendList = _this4.stayRecommendList.map(function (value) {
                    value['checked'] = _this4.checkAllActive;
                    return value;
                  });
                }
                _this4.$apply();
                break;
              case 1:
                _this4.stayPayList = more ? _this4.stayPayList.concat(list) : list;
                _this4.$apply();
                break;
              case 2:
                _this4.yetPayList = more ? _this4.yetPayList.concat(list) : list;
                _this4.$apply();
            }
          }
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      // 获取全局变量
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      this.sessionId = wx.getStorageSync('sessionId');
      if (option.type === 'userManage') {
        // 待推荐请求
        this.getData(false, {
          serviceType: 3,
          serviceState: 0,
          orderType: this.orderType[0],
          orderMethod: this.orderType[1],
          start: this.stayRecommendStart,
          limit: this.limit
        }, 0);
        wx.removeStorageSync('selfrcmd');
      } else {
        this.stayRecommendList = wx.getStorageSync('selfrcmd');
      }
      // 系统处理
      var that = this;
      var sliderWidth = 75;
      wx.getSystemInfo({
        success: function success(res) {
          that.sliderLeft = (res.windowWidth / that.data.tabs.length - sliderWidth) / 2;
          that.sliderOffset = res.windowWidth / that.data.tabs.length * that.data.activeIndex;
        }
      });
    }
  }]);

  return Oldrcmd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Oldrcmd , 'pages/selfrcmd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGZyY21kLmpzIl0sIm5hbWVzIjpbIk9sZHJjbWQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNlbGVjdGVkIiwiY2hlY2tBbGxBY3RpdmUiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0IiwiYmFsYW5jZVNvcnQiLCJpbnRlZ3JhbFNvcnQiLCJjbGFzc1NvcnQiLCJzb3J0QWN0aXZlIiwic2Vzc2lvbklkIiwib3JkZXJUeXBlIiwic3RheVJlY29tbWVuZFN0YXJ0Iiwic3RheVJlY29tbWVuZExpc3QiLCJzdGF5UGF5U3RhcnQiLCJzdGF5UGF5TGlzdCIsInlldFBheVN0YXJ0IiwieWV0UGF5TGlzdCIsImxpbWl0IiwiVVJMIiwiSU1HVVJMIiwiSU1HVVJMRURJVCIsInR5cGUiLCJtZXRob2RzIiwiY2hlY2tBbGwiLCJtYXAiLCJ2YWx1ZSIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImRldGFpbCIsImluZGV4T2YiLCJpZCIsImxlbmd0aCIsInNlbmQiLCJzb21lIiwiY2hlY2tlZCIsImNvbW1vbiIsInRpcEFsZXJ0Iiwid3giLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzb3J0SGFuZGxlciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJzb3J0RnVuYyIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsInNlcnZpY2VUeXBlIiwic2VydmljZVN0YXRlIiwib3JkZXJNZXRob2QiLCJzdGFydCIsImN1cnJlbnRUYXJnZXQiLCJvZmZzZXRMZWZ0IiwiZGF0YXNldCIsInVybFR5cGUiLCJ0YWJUeXBlIiwibW9yZSIsInJlcXVlc3QiLCJoZWFkZXIiLCJtZXRob2QiLCJJbnRlcmNlcHRvciIsImxpc3QiLCJyZXN1bHQiLCJBcnJheSIsImNvbmNhdCIsIiRhcHBseSIsIm9wdGlvbiIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGF0Iiwic2xpZGVyV2lkdGgiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93V2lkdGgiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRkE7OztJQUdxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBRW5CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGNBQVFDO0FBREUsSyxRQUdaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxzQkFBZ0IsS0FGWDtBQUdMQyxZQUFNLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLENBSEQ7QUFJTEMsbUJBQWEsR0FKUjtBQUtMQyxvQkFBYyxDQUxUO0FBTUxDLGtCQUFZLENBTlA7QUFPTEMsbUJBQWEsSUFQUjtBQVFMQyxvQkFBYyxJQVJUO0FBU0xDLGlCQUFXLElBVE47QUFVTEMsa0JBQVksU0FWUDtBQVdMQyxpQkFBVyxFQVhOO0FBWUxDLGlCQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FaTjtBQWFMQywwQkFBb0IsQ0FiZjtBQWNMQyx5QkFBbUIsRUFkZDtBQWVMQyxvQkFBYyxDQWZUO0FBZ0JMQyxtQkFBYSxFQWhCUjtBQWlCTEMsbUJBQWEsQ0FqQlI7QUFrQkxDLGtCQUFZLEVBbEJQO0FBbUJMQyxhQUFPLEVBbkJGO0FBb0JMQyxXQUFLLEVBcEJBO0FBcUJMQyxjQUFRLEVBckJIO0FBc0JMQyxrQkFBWSxFQXRCUDtBQXVCTEMsWUFBTTtBQXZCRCxLLFFBeUJQQyxPLEdBQVU7QUFDUjtBQUNBQyxj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LGNBQUgsQ0FBa0IsVUFBbEIsQ0FBekI7QUFDRDtBQUNEO0FBQ0EsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSUMsY0FBYyxFQUFsQjtBQUNBdEMsU0FBR3VDLGFBQUgsQ0FBaUI7QUFDZi9CLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckI0QixlQUFLdEUsVUFBTCxHQUFrQixDQUFDMEMsSUFBSStCLFdBQUosR0FBa0JILEtBQUs1RSxJQUFMLENBQVVHLElBQVYsQ0FBZThCLE1BQWpDLEdBQTBDNEMsV0FBM0MsSUFBMEQsQ0FBNUU7QUFDQUQsZUFBS3ZFLFlBQUwsR0FBb0IyQyxJQUFJK0IsV0FBSixHQUFrQkgsS0FBSzVFLElBQUwsQ0FBVUcsSUFBVixDQUFlOEIsTUFBakMsR0FBMEMyQyxLQUFLNUUsSUFBTCxDQUFVSSxXQUF4RTtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQW5Ra0M0RSxlQUFLQyxJOztrQkFBckIxRixPIiwiZmlsZSI6InNlbGZyY21kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbi8vIGltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSdcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbGRyY21kIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAvLyB2YXIgc2xpZGVyV2lkdGggPSA5NiAvLyDpnIDopoHorr7nva5zbGlkZXLnmoTlrr3luqbvvIznlKjkuo7orqHnrpfkuK3pl7TkvY3nva5cclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Ieq5Li76JCl6ZSAJ1xyXG4gIH1cclxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzZWxlY3RlZDogMyxcclxuICAgIGNoZWNrQWxsQWN0aXZlOiBmYWxzZSxcclxuICAgIHRhYnM6IFsn5b6F5o6o6I2QJywgJ+W+heaUr+S7mCcsICflt7Lku5jotLknXSxcclxuICAgIGFjdGl2ZUluZGV4OiAnMCcsXHJcbiAgICBzbGlkZXJPZmZzZXQ6IDAsXHJcbiAgICBzbGlkZXJMZWZ0OiAwLFxyXG4gICAgYmFsYW5jZVNvcnQ6IHRydWUsXHJcbiAgICBpbnRlZ3JhbFNvcnQ6IHRydWUsXHJcbiAgICBjbGFzc1NvcnQ6IHRydWUsXHJcbiAgICBzb3J0QWN0aXZlOiAnYmFsYW5jZScsXHJcbiAgICBzZXNzaW9uSWQ6ICcnLFxyXG4gICAgb3JkZXJUeXBlOiBbMSwgMV0sXHJcbiAgICBzdGF5UmVjb21tZW5kU3RhcnQ6IDEsXHJcbiAgICBzdGF5UmVjb21tZW5kTGlzdDogW10sXHJcbiAgICBzdGF5UGF5U3RhcnQ6IDEsXHJcbiAgICBzdGF5UGF5TGlzdDogW10sXHJcbiAgICB5ZXRQYXlTdGFydDogMSxcclxuICAgIHlldFBheUxpc3Q6IFtdLFxyXG4gICAgbGltaXQ6IDEwLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIElNR1VSTDogJycsXHJcbiAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgIHR5cGU6ICczJ1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5YWo6YCJXHJcbiAgICBjaGVja0FsbCAoKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tBbGxBY3RpdmUgPSAhdGhpcy5jaGVja0FsbEFjdGl2ZVxyXG4gICAgICB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0ID0gdGhpcy5zdGF5UmVjb21tZW5kTGlzdC5tYXAodmFsdWUgPT4ge1xyXG4gICAgICAgIHZhbHVlWydjaGVja2VkJ10gPSB0aGlzLmNoZWNrQWxsQWN0aXZlXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g5aSN6YCJ5qGGY2hhbmdlXHJcbiAgICBjaGVja2JveENoYW5nZSAoZSkge1xyXG4gICAgICB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0ID0gdGhpcy5zdGF5UmVjb21tZW5kTGlzdC5tYXAodmFsdWUgPT4ge1xyXG4gICAgICAgIHZhbHVlWydjaGVja2VkJ10gPSBlLmRldGFpbC52YWx1ZS5pbmRleE9mKHZhbHVlLmlkICsgJycpICE9PSAtMVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmNoZWNrQWxsQWN0aXZlID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoID09PSB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0Lmxlbmd0aFxyXG4gICAgfSxcclxuICAgIC8vIOWPkemAgeaMiemSrlxyXG4gICAgc2VuZCAoKSB7XHJcbiAgICAgIGlmICghdGhpcy5zdGF5UmVjb21tZW5kTGlzdC5zb21lKHZhbHVlID0+IHZhbHVlLmNoZWNrZWQpKSB7XHJcbiAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfoh7PlsJHpgInmi6nkuIDkuKrnlKjmiLcnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzZWxmcmNtZCcsIHRoaXMuc3RheVJlY29tbWVuZExpc3QpXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJ2VkaXRtc2c/dHlwZT0nICsgdGhpcy50eXBlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g5o6S5bqP5qCPXHJcbiAgICBzb3J0SGFuZGxlciAodHlwZSkge1xyXG4gICAgICBpZiAodGhpcy5zdGF5UmVjb21tZW5kTGlzdC5zb21lKHZhbHVlID0+IHZhbHVlLmNoZWNrZWQpKSB7XHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgIGNvbnRlbnQ6ICfph43mlrDmjpLluo/kvJrmuIXpmaTlt7LpgInmlbDmja7vvIzmmK/lkKbmjpLluo/vvJ8nLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zb3J0RnVuYyh0eXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNvcnRGdW5jKHR5cGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8g5o6S5bqPXHJcbiAgc29ydEZ1bmMgKHR5cGUpIHtcclxuICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdzZWxmcmNtZCcpXHJcbiAgICB0aGlzLmNoZWNrQWxsQWN0aXZlID0gZmFsc2VcclxuICAgIGxldCBsaW1pdCA9IHRoaXMubGltaXQgKiB0aGlzLnN0YXlSZWNvbW1lbmRTdGFydFxyXG4gICAgdGhpcy5zb3J0QWN0aXZlID0gdHlwZVxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2JhbGFuY2UnOlxyXG4gICAgICAgIHRoaXMuYmFsYW5jZVNvcnQgPSAhdGhpcy5iYWxhbmNlU29ydFxyXG4gICAgICAgIHRoaXMub3JkZXJUeXBlWzBdID0gMVxyXG4gICAgICAgIHRoaXMub3JkZXJUeXBlWzFdID0gdGhpcy5iYWxhbmNlU29ydCA/IDEgOiAyXHJcbiAgICAgICAgdGhpcy5nZXREYXRhKGZhbHNlLCB7XHJcbiAgICAgICAgICBzZXJ2aWNlVHlwZTogMyxcclxuICAgICAgICAgIHNlcnZpY2VTdGF0ZTogMCxcclxuICAgICAgICAgIG9yZGVyVHlwZTogMSxcclxuICAgICAgICAgIG9yZGVyTWV0aG9kOiB0aGlzLm9yZGVyVHlwZVsxXSxcclxuICAgICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICAgICAgfSwgMClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdpbnRlZ3JhbCc6XHJcbiAgICAgICAgdGhpcy5pbnRlZ3JhbFNvcnQgPSAhdGhpcy5pbnRlZ3JhbFNvcnRcclxuICAgICAgICB0aGlzLm9yZGVyVHlwZVswXSA9IDJcclxuICAgICAgICB0aGlzLm9yZGVyVHlwZVsxXSA9IHRoaXMuaW50ZWdyYWxTb3J0ID8gMSA6IDJcclxuICAgICAgICB0aGlzLmdldERhdGEoZmFsc2UsIHtcclxuICAgICAgICAgIHNlcnZpY2VUeXBlOiAzLFxyXG4gICAgICAgICAgc2VydmljZVN0YXRlOiAwLFxyXG4gICAgICAgICAgb3JkZXJUeXBlOiAyLFxyXG4gICAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJUeXBlWzFdLFxyXG4gICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICBsaW1pdDogbGltaXRcclxuICAgICAgICB9LCAwKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ2NsYXNzJzpcclxuICAgICAgICB0aGlzLmNsYXNzU29ydCA9ICF0aGlzLmNsYXNzU29ydFxyXG4gICAgICAgIHRoaXMub3JkZXJUeXBlWzBdID0gM1xyXG4gICAgICAgIHRoaXMub3JkZXJUeXBlWzFdID0gdGhpcy5jbGFzc1NvcnQgPyAxIDogMlxyXG4gICAgICAgIHRoaXMuZ2V0RGF0YShmYWxzZSwge1xyXG4gICAgICAgICAgc2VydmljZVR5cGU6IDMsXHJcbiAgICAgICAgICBzZXJ2aWNlU3RhdGU6IDAsXHJcbiAgICAgICAgICBvcmRlclR5cGU6IDMsXHJcbiAgICAgICAgICBvcmRlck1ldGhvZDogdGhpcy5vcmRlclR5cGVbMV0sXHJcbiAgICAgICAgICBzdGFydDogMSxcclxuICAgICAgICAgIGxpbWl0XHJcbiAgICAgICAgfSwgMClcclxuICAgIH1cclxuICB9XHJcbiAgLy8gdGFi5YiH5o2iXHJcbiAgdGFiQ2xpY2sgKGUpIHtcclxuICAgIHRoaXMuc2xpZGVyT2Zmc2V0ID0gZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnRcclxuICAgIHRoaXMuYWN0aXZlSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgIHN3aXRjaCAodGhpcy5hY3RpdmVJbmRleCkge1xyXG4gICAgICBjYXNlICcxJzpcclxuICAgICAgICB0aGlzLmdldERhdGEodHJ1ZSwge1xyXG4gICAgICAgICAgc2VydmljZVR5cGU6IDMsXHJcbiAgICAgICAgICBzZXJ2aWNlU3RhdGU6IDEsXHJcbiAgICAgICAgICBzdGFydDogMSxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0ICogdGhpcy5zdGF5UGF5U3RhcnRcclxuICAgICAgICB9LCAxKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0cnVlLCB7XHJcbiAgICAgICAgICBzZXJ2aWNlVHlwZTogMyxcclxuICAgICAgICAgIHNlcnZpY2VTdGF0ZTogMixcclxuICAgICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXQgKiB0aGlzLnlldFBheVN0YXJ0XHJcbiAgICAgICAgfSwgMilcclxuICAgIH1cclxuICB9XHJcbiAgLy8g6I635Y+W5pu05aSa5pWw5o2uXHJcbiAgZ2V0TW9yZSAoZSkge1xyXG4gICAgbGV0IHR5cGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAn5b6F5o6o6I2QJzpcclxuICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygnc2VsZnJjbWQnKVxyXG4gICAgICAgIC8vIHRoaXMuc3RheVJlY29tbWVuZExpc3QgPSB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0Lm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8gICB2YWx1ZVsnY2hlY2tlZCddID0gZmFsc2VcclxuICAgICAgICAvLyAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gdGhpcy5jaGVja0FsbEFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zdGF5UmVjb21tZW5kU3RhcnQrK1xyXG4gICAgICAgIHRoaXMuZ2V0RGF0YShmYWxzZSwge1xyXG4gICAgICAgICAgc2VydmljZVR5cGU6IDMsXHJcbiAgICAgICAgICBzZXJ2aWNlU3RhdGU6IDAsXHJcbiAgICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlWzBdLFxyXG4gICAgICAgICAgb3JkZXJNZXRob2Q6IHRoaXMub3JkZXJUeXBlWzFdLFxyXG4gICAgICAgICAgc3RhcnQ6IHRoaXMuc3RheVJlY29tbWVuZFN0YXJ0LFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgICB9LCAwLCB0cnVlKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ+W+heaUr+S7mCc6XHJcbiAgICAgICAgdGhpcy5zdGF5UGF5U3RhcnQrK1xyXG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0cnVlLCB7XHJcbiAgICAgICAgICBzZXJ2aWNlVHlwZTogMyxcclxuICAgICAgICAgIHNlcnZpY2VTdGF0ZTogMSxcclxuICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXlQYXlTdGFydCxcclxuICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0XHJcbiAgICAgICAgfSwgMSwgdHJ1ZSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICflt7Lku5jotLknOlxyXG4gICAgICAgIHRoaXMueWV0UGF5U3RhcnQrK1xyXG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0cnVlLCB7XHJcbiAgICAgICAgICBzZXJ2aWNlVHlwZTogMyxcclxuICAgICAgICAgIHNlcnZpY2VTdGF0ZTogMixcclxuICAgICAgICAgIHN0YXJ0OiB0aGlzLnlldFBheVN0YXJ0LFxyXG4gICAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgICB9LCAyLCB0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyDojrflj5bmlbDmja7or7fmsYJcclxuICBnZXREYXRhICh1cmxUeXBlLCBkYXRhLCB0YWJUeXBlLCBtb3JlKSB7XHJcbiAgICBtb3JlIHx8IChtb3JlID0gZmFsc2UpXHJcbiAgICBsZXQgdXJsID0gdXJsVHlwZSA/ICdzZXJ2aWNlL3NlbGVjdFNlcnZpY2UnIDogJ3NlcnZpY2Uvc2VsZWN0VXNlcidcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoaXMuVVJMICsgdXJsLFxyXG4gICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogdGhpcy5zZXNzaW9uSWRcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgbGV0IGxpc3QgPSBkYXRhLnJlc3VsdC5saXN0XHJcbiAgICAgICAgICBsaXN0IGluc3RhbmNlb2YgQXJyYXkgJiYgbGlzdC5sZW5ndGggPD0gMCAmJiBtb3JlICYmIChjb21tb24udGlwQWxlcnQoJ+ayoeacieabtOWkmuaVsOaNruS6hicpKVxyXG4gICAgICAgICAgc3dpdGNoICh0YWJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0ID0gbW9yZSA/IHRoaXMuc3RheVJlY29tbWVuZExpc3QuY29uY2F0KGxpc3QpIDogbGlzdFxyXG4gICAgICAgICAgICAgIGlmIChtb3JlICYmIHRoaXMuY2hlY2tBbGxBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RheVJlY29tbWVuZExpc3QgPSB0aGlzLnN0YXlSZWNvbW1lbmRMaXN0Lm1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlWydjaGVja2VkJ10gPSB0aGlzLmNoZWNrQWxsQWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICB0aGlzLnN0YXlQYXlMaXN0ID0gbW9yZSA/IHRoaXMuc3RheVBheUxpc3QuY29uY2F0KGxpc3QpIDogbGlzdFxyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgdGhpcy55ZXRQYXlMaXN0ID0gbW9yZSA/IHRoaXMueWV0UGF5TGlzdC5jb25jYXQobGlzdCkgOiBsaXN0XHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25Mb2FkIChvcHRpb24pIHtcclxuICAgIC8vIOiOt+WPluWFqOWxgOWPmOmHj1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgIHRoaXMuSU1HVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMXHJcbiAgICB0aGlzLklNR1VSTEVESVQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxFRElUXHJcbiAgICB0aGlzLnNlc3Npb25JZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgaWYgKG9wdGlvbi50eXBlID09PSAndXNlck1hbmFnZScpIHtcclxuICAgICAgLy8g5b6F5o6o6I2Q6K+35rGCXHJcbiAgICAgIHRoaXMuZ2V0RGF0YShmYWxzZSwge1xyXG4gICAgICAgIHNlcnZpY2VUeXBlOiAzLFxyXG4gICAgICAgIHNlcnZpY2VTdGF0ZTogMCxcclxuICAgICAgICBvcmRlclR5cGU6IHRoaXMub3JkZXJUeXBlWzBdLFxyXG4gICAgICAgIG9yZGVyTWV0aG9kOiB0aGlzLm9yZGVyVHlwZVsxXSxcclxuICAgICAgICBzdGFydDogdGhpcy5zdGF5UmVjb21tZW5kU3RhcnQsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcclxuICAgICAgfSwgMClcclxuICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoJ3NlbGZyY21kJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RheVJlY29tbWVuZExpc3QgPSB3eC5nZXRTdG9yYWdlU3luYygnc2VsZnJjbWQnKVxyXG4gICAgfVxyXG4gICAgLy8g57O757uf5aSE55CGXHJcbiAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgIHZhciBzbGlkZXJXaWR0aCA9IDc1XHJcbiAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgdGhhdC5zbGlkZXJMZWZ0ID0gKHJlcy53aW5kb3dXaWR0aCAvIHRoYXQuZGF0YS50YWJzLmxlbmd0aCAtIHNsaWRlcldpZHRoKSAvIDJcclxuICAgICAgICB0aGF0LnNsaWRlck9mZnNldCA9IHJlcy53aW5kb3dXaWR0aCAvIHRoYXQuZGF0YS50YWJzLmxlbmd0aCAqIHRoYXQuZGF0YS5hY3RpdmVJbmRleFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=