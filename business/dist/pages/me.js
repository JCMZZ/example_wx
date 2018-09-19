'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _base = require('./../images/base64.js');

var _base2 = _interopRequireDefault(_base);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_wepy$page) {
  _inherits(Me, _wepy$page);

  function Me() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      selected: 3,
      src: '',
      lists: [{
        id: 1,
        text: '用户管理',
        src: 'usermg.png',
        url: 'user-manage'
      }, {
        id: 2,
        text: '卡片管理',
        src: 'bankcard.png',
        url: 'card-manage'
      }, {
        id: 3,
        text: '智能营销',
        src: 'znyx.png',
        url: 'newrcmd?type=userManage'
      }, {
        id: 4,
        text: '自主营销',
        src: 'zzyx.png',
        url: 'selfrcmd?type=userManage'
      }, {
        id: 5,
        text: '精准营销',
        src: 'jzyx.png',
        url: 'oldrcmd?type=userManage'
      }],
      storeName: '',
      nickname: '',
      avatarUrl: '',
      gender: 0,
      icon: '',
      IMGURL: '',
      URL: ''
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.config = {
      navigationBarTitleText: '管理'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Me, [{
    key: 'onLoad',
    value: function onLoad() {
      this.icon = _base2.default.icon20;
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      wx.request({
        url: this.URL + 'myPage/info',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              _this2.storeName = data.result.storeName;
              _this2.nickname = data.result.nickname;
              _this2.avatarUrl = data.result.avatarUrl;
              _this2.$apply();
            }
          }
        }
      });
    }
  }, {
    key: 'setting',
    value: function setting() {
      // 显示小程序当前设置权限的界面
      wx.openSetting({
        success: function success(res) {
          res.authSetting = {
            'scope.userInfo': true,
            'scope.userLocation': true,
            'scope.camera': false
          };
        }
      });
    }
  }, {
    key: 'chooseimage',
    value: function chooseimage() {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function success(res) {
          that.src = res.tempFilePaths;
        }
      });
    }
  }]);

  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiZGF0YSIsInNlbGVjdGVkIiwic3JjIiwibGlzdHMiLCJpZCIsInRleHQiLCJ1cmwiLCJzdG9yZU5hbWUiLCJuaWNrbmFtZSIsImF2YXRhclVybCIsImdlbmRlciIsImljb24iLCJJTUdVUkwiLCJVUkwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFzZTY0IiwiaWNvbjIwIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ3eCIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsInN1Y2Nlc3MiLCJyZXMiLCJjb21tb24iLCJJbnRlcmNlcHRvciIsInRpcEFsZXJ0IiwibWVzc2FnZSIsInJlc3VsdCIsIiRhcHBseSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJ0aGF0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxFOzs7Ozs7Ozs7Ozs7Ozs4S0FDbkJDLEksR0FBTTtBQUNKQyxnQkFBVSxDQUROO0FBRUpDLFdBQUssRUFGRDtBQUdKQyxhQUFPLENBQ0w7QUFDRUMsWUFBSSxDQUROO0FBRUVDLGNBQU0sTUFGUjtBQUdFSCxhQUFLLFlBSFA7QUFJRUksYUFBSztBQUpQLE9BREssRUFPTDtBQUNFRixZQUFJLENBRE47QUFFRUMsY0FBTSxNQUZSO0FBR0VILGFBQUssY0FIUDtBQUlFSSxhQUFLO0FBSlAsT0FQSyxFQWFMO0FBQ0VGLFlBQUksQ0FETjtBQUVFQyxjQUFNLE1BRlI7QUFHRUgsYUFBSyxVQUhQO0FBSUVJLGFBQUs7QUFKUCxPQWJLLEVBbUJMO0FBQ0VGLFlBQUksQ0FETjtBQUVFQyxjQUFNLE1BRlI7QUFHRUgsYUFBSyxVQUhQO0FBSUVJLGFBQUs7QUFKUCxPQW5CSyxFQXlCTDtBQUNFRixZQUFJLENBRE47QUFFRUMsY0FBTSxNQUZSO0FBR0VILGFBQUssVUFIUDtBQUlFSSxhQUFLO0FBSlAsT0F6QkssQ0FISDtBQW1DSkMsaUJBQVcsRUFuQ1A7QUFvQ0pDLGdCQUFVLEVBcENOO0FBcUNKQyxpQkFBVyxFQXJDUDtBQXNDSkMsY0FBUSxDQXRDSjtBQXVDSkMsWUFBTSxFQXZDRjtBQXdDSkMsY0FBUSxFQXhDSjtBQXlDSkMsV0FBSztBQXpDRCxLLFFBMkNQQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFVBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQVk7QUFDUEMsY0FBUUM7QUFERCxLLFFBR1RDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSzs7Ozs7NkJBR0E7QUFDUCxXQUFLVixJQUFMLEdBQVlXLGVBQU9DLE1BQW5CO0FBQ0Q7Ozs2QkFDUTtBQUFBOztBQUNQLFdBQUtWLEdBQUwsR0FBVyxLQUFLVyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JaLEdBQW5DO0FBQ0EsV0FBS0QsTUFBTCxHQUFjLEtBQUtZLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmIsTUFBdEM7QUFDQWMsU0FBR0MsT0FBSCxDQUFXO0FBQ1RyQixhQUFLLEtBQUtPLEdBQUwsR0FBVyxhQURQO0FBRVRlLGdCQUFRLE1BRkM7QUFHVEMsZ0JBQVE7QUFDTiwwQkFBZ0IsaURBRFY7QUFFTix1QkFBYUgsR0FBR0ksY0FBSCxDQUFrQixXQUFsQjtBQUZQLFNBSEM7QUFPVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJaEMsT0FBT2dDLElBQUloQyxJQUFmO0FBQ0EsY0FBSWlDLGlCQUFPQyxXQUFQLENBQW1CbEMsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixnQkFBSUEsS0FBSytCLE9BQUwsS0FBaUIsS0FBckIsRUFBNEI7QUFDMUJFLCtCQUFPRSxRQUFQLENBQWdCbkMsS0FBS29DLE9BQXJCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQUs3QixTQUFMLEdBQWlCUCxLQUFLcUMsTUFBTCxDQUFZOUIsU0FBN0I7QUFDQSxxQkFBS0MsUUFBTCxHQUFnQlIsS0FBS3FDLE1BQUwsQ0FBWTdCLFFBQTVCO0FBQ0EscUJBQUtDLFNBQUwsR0FBaUJULEtBQUtxQyxNQUFMLENBQVk1QixTQUE3QjtBQUNBLHFCQUFLNkIsTUFBTDtBQUNEO0FBQ0Y7QUFDRjtBQW5CUSxPQUFYO0FBcUJEOzs7OEJBQ1U7QUFDVDtBQUNBWixTQUFHYSxXQUFILENBQWU7QUFDYlIsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkEsY0FBSVEsV0FBSixHQUFrQjtBQUNoQiw4QkFBa0IsSUFERjtBQUVoQixrQ0FBc0IsSUFGTjtBQUdoQiw0QkFBZ0I7QUFIQSxXQUFsQjtBQUtEO0FBUFksT0FBZjtBQVNEOzs7a0NBQ2M7QUFDYixVQUFJQyxPQUFPLElBQVg7QUFDQWYsU0FBR2dCLFdBQUgsQ0FBZTtBQUNiQyxlQUFPLENBRE07QUFFYkMsa0JBQVUsQ0FBQyxVQUFELEVBQWEsWUFBYixDQUZHO0FBR2JDLG9CQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQztBQUliZCxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCUyxlQUFLdkMsR0FBTCxHQUFXOEIsSUFBSWMsYUFBZjtBQUNEO0FBTlksT0FBZjtBQVFEOzs7O0VBdkc2QkMsZUFBS0MsSTs7a0JBQWhCakQsRSIsImZpbGUiOiJtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGJhc2U2NCBmcm9tICcuLi9pbWFnZXMvYmFzZTY0J1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGRhdGE9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDMsXHJcbiAgICAgIHNyYzogJycsXHJcbiAgICAgIGxpc3RzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICB0ZXh0OiAn55So5oi3566h55CGJyxcclxuICAgICAgICAgIHNyYzogJ3VzZXJtZy5wbmcnLFxyXG4gICAgICAgICAgdXJsOiAndXNlci1tYW5hZ2UnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogMixcclxuICAgICAgICAgIHRleHQ6ICfljaHniYfnrqHnkIYnLFxyXG4gICAgICAgICAgc3JjOiAnYmFua2NhcmQucG5nJyxcclxuICAgICAgICAgIHVybDogJ2NhcmQtbWFuYWdlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgICB0ZXh0OiAn5pm66IO96JCl6ZSAJyxcclxuICAgICAgICAgIHNyYzogJ3pueXgucG5nJyxcclxuICAgICAgICAgIHVybDogJ25ld3JjbWQ/dHlwZT11c2VyTWFuYWdlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICB0ZXh0OiAn6Ieq5Li76JCl6ZSAJyxcclxuICAgICAgICAgIHNyYzogJ3p6eXgucG5nJyxcclxuICAgICAgICAgIHVybDogJ3NlbGZyY21kP3R5cGU9dXNlck1hbmFnZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiA1LFxyXG4gICAgICAgICAgdGV4dDogJ+eyvuWHhuiQpemUgCcsXHJcbiAgICAgICAgICBzcmM6ICdqenl4LnBuZycsXHJcbiAgICAgICAgICB1cmw6ICdvbGRyY21kP3R5cGU9dXNlck1hbmFnZSdcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHN0b3JlTmFtZTogJycsXHJcbiAgICAgIG5pY2tuYW1lOiAnJyxcclxuICAgICAgYXZhdGFyVXJsOiAnJyxcclxuICAgICAgZ2VuZGVyOiAwLFxyXG4gICAgICBpY29uOiAnJyxcclxuICAgICAgSU1HVVJMOiAnJyxcclxuICAgICAgVVJMOiAnJ1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHM9IHtcclxuICAgICAgdGFiYmFyOiBUYWJiYXJcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+euoeeQhidcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5pY29uID0gYmFzZTY0Lmljb24yMFxyXG4gICAgfVxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICB0aGlzLklNR1VSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTFxyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ215UGFnZS9pbmZvJyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZU5hbWUgPSBkYXRhLnJlc3VsdC5zdG9yZU5hbWVcclxuICAgICAgICAgICAgICB0aGlzLm5pY2tuYW1lID0gZGF0YS5yZXN1bHQubmlja25hbWVcclxuICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9IGRhdGEucmVzdWx0LmF2YXRhclVybFxyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHNldHRpbmcgKCkge1xyXG4gICAgICAvLyDmmL7npLrlsI/nqIvluo/lvZPliY3orr7nva7mnYPpmZDnmoTnlYzpnaJcclxuICAgICAgd3gub3BlblNldHRpbmcoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIHJlcy5hdXRoU2V0dGluZyA9IHtcclxuICAgICAgICAgICAgJ3Njb3BlLnVzZXJJbmZvJzogdHJ1ZSxcclxuICAgICAgICAgICAgJ3Njb3BlLnVzZXJMb2NhdGlvbic6IHRydWUsXHJcbiAgICAgICAgICAgICdzY29wZS5jYW1lcmEnOiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGNob29zZWltYWdlICgpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICBjb3VudDogMSxcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIHRoYXQuc3JjID0gcmVzLnRlbXBGaWxlUGF0aHNcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=