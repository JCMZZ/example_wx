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
      navigationBarTitleText: '首页'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 1,
      // 授权部分数据
      showModal: true,
      code: '',
      encryptedData: '',
      iv: '',
      rawData: '',
      signature: '',
      userInfo: {},
      sessionId: 'sessionId',
      // 首页部分数据
      src: ['banner1.png', 'banner2.png', 'banner3.png'],
      desshow: true,
      telshow: true,
      adshow: true,
      desclass: 'des-content',
      telclass: 'tel-txt',
      adclass: 'ad-txt',
      telnumber: '13426238781',
      address: '北京市朝阳区通惠河畔文化创意产业园1131号君天大厦六层',
      txtvalue: '北京亿美软通科技有限公司( Beijing Emay Softcom Technology Ltd.)是具备国际水准的移动商务平台技术和应用方案提供商。自2001年成立以来，亿美软通始终致力于为国内外企业提供具备国际技术水准的移动商务平台及运营服务。目前，亿美软通已为超过50万家企业提供移动个性客服、移动数据采集、移动高效管理等方面的各类移动商务产品和通讯服务，业务服务覆盖超过7亿手机用户，是中国领先的移动商务服务商。'
    }, _this.methods = {
      preventTouchMove: function preventTouchMove() {},

      /**
      * 对话框确认按钮点击事件
      */
      onConfirm: function onConfirm() {
        this.showModal = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      wx.showShareMenu({
        withShareTicket: true
      });
      wx.login({
        // 获取code
        success: function success(res) {
          var JSCODE = res.code; // 返回code
          _this2.code = JSCODE;
          _this2.$apply();
          // console.log(this.code)
          // var APPID = 'wx62aba1814baa8b68'
          // var SECRET = '67cefd7f7d4c61234b3937fa61afe2c0'
        }
      });
    }
    // 授权部分相关操作

  }, {
    key: 'getUserinfo',
    value: function getUserinfo(e) {
      var _this3 = this;

      // console.log(e.detail)
      if (e.detail.userInfo) {
        this.encryptedData = e.detail.encryptedData;
        this.iv = e.detail.iv;
        this.rawData = e.detail.rawData;
        this.signature = e.detail.signature;
        this.userInfo = e.detail.userInfo;
        this.$apply();
        // console.log(this.code)
        wx.request({
          url: 'http://100.100.9.39:8080/web/wxLoginAuth',
          // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code',
          data: {
            code: this.code,
            encryptedData: this.encryptedData,
            iv: this.iv,
            rawData: this.rawData,
            signature: this.signature,
            userInfo: this.userInfo
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          method: 'POST',
          success: function success(res) {
            console.log(111);
            console.log(res.data);
            // 在这里赋值并存储sessionId
            _this3.sessionId = res.data.result.sessionId;
            // 同步缓存
            try {
              wx.setStorageSync('sessionId', _this3.sessionId);
            } catch (e) {}
            // .result.isReg
            if (res.data.success === false) {
              wx.navigateTo({
                url: 'home'
              });
            } else {
              if (!res.data.result.isReg) {
                wx.navigateTo({
                  url: 'register'
                });
              } else {
                wx.navigateTo({
                  url: 'index'
                });
              }
            }
          },
          fail: function fail() {
            console.log('home页请求失败');
          }
        });
      } else {
        this.showModal = true;
      }
    }
    // 首页相关操作

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      // console.log(res)
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '转发给朋友',
        path: '/pages/home',
        success: function success(res) {
          // 转发成功
          console.log('成功', res);
        },
        fail: function fail(res) {
          // 转发失败
          console.log('失败', res);
        }
      };
    }
  }, {
    key: 'mapViewTap',
    value: function mapViewTap() {
      wx.chooseLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success: function success(res) {
          console.log(res);
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            scale: 28
          });
        }
      });
    }
    // 选择图片

  }, {
    key: 'addpic',
    value: function addpic() {
      wx.navigateTo({
        url: 'handlepic'
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
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: function success(res) {
              // console.log(res)
              // console.log(that.src)
              that.src.push(res.path);
              // console.log(res.path)
              // console.log(that.src)
            }
          });
        }
      });
    }
  }, {
    key: 'delswiper',
    value: function delswiper() {
      console.log('删除指定轮播图片');
    }
    // 编辑电话

  }, {
    key: 'getnum',
    value: function getnum(e) {
      console.log(e.detail.value);
    }
    // 简介编辑操作

  }, {
    key: 'editTxt',
    value: function editTxt() {
      this.desclass = 'des-content active';
      this.desshow = false;
    }
    // 简介取消保存

  }, {
    key: 'canceldes',
    value: function canceldes() {
      this.desclass = 'des-content';
      this.desshow = true;
    }
    // 简介保存操作

  }, {
    key: 'savedes',
    value: function savedes(e) {
      console.log(e.detail.value);
      this.txtvalue = e.detail.value;
      this.desclass = 'des-content';
      this.desshow = true;
    }
    // 电话编辑操作

  }, {
    key: 'teledit',
    value: function teledit() {
      this.telclass = 'tel-txt active';
      this.telshow = false;
    }
    // 编辑电话

  }, {
    key: 'canceltel',
    value: function canceltel() {
      this.telclass = 'tel-txt';
      this.telshow = true;
    }
    // 电话保存操作

  }, {
    key: 'savetel',
    value: function savetel(e) {
      console.log(e.detail.value);
      this.telnumber = e.detail.value;
      this.telclass = 'tel-txt';
      this.telshow = true;
    }
    // 地址编辑操作

  }, {
    key: 'adedit',
    value: function adedit() {
      this.adclass = 'ad-txt active';
      this.adshow = false;
    }
  }, {
    key: 'cancelad',
    value: function cancelad() {
      this.adclass = 'ad-txt';
      this.adshow = true;
    }
    // 地址保存操作

  }, {
    key: 'savead',
    value: function savead(e) {
      console.log(e.detail.value);
      this.address = e.detail.value;
      this.adclass = 'ad-txt';
      this.adshow = true;
    }
  }]);

  return Home;
}(_wepy2.default.page);

exports.default = Home;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJkYXRhIiwic2VsZWN0ZWQiLCJzaG93TW9kYWwiLCJjb2RlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwicmF3RGF0YSIsInNpZ25hdHVyZSIsInVzZXJJbmZvIiwic2Vzc2lvbklkIiwic3JjIiwiZGVzc2hvdyIsInRlbHNob3ciLCJhZHNob3ciLCJkZXNjbGFzcyIsInRlbGNsYXNzIiwiYWRjbGFzcyIsInRlbG51bWJlciIsImFkZHJlc3MiLCJ0eHR2YWx1ZSIsIm1ldGhvZHMiLCJwcmV2ZW50VG91Y2hNb3ZlIiwib25Db25maXJtIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwiSlNDT0RFIiwiJGFwcGx5IiwiZSIsImRldGFpbCIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJtZXRob2QiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0Iiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZVRvIiwiaXNSZWciLCJmYWlsIiwiZnJvbSIsInRhcmdldCIsInRpdGxlIiwicGF0aCIsImNob29zZUxvY2F0aW9uIiwidHlwZSIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwic2NhbGUiLCJ0aGF0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsImdldEltYWdlSW5mbyIsInRlbXBGaWxlUGF0aHMiLCJwdXNoIiwidmFsdWUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURq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T0FBTCxHQUFlLElBQWY7QUFDRDtBQUNEOzs7OzhCQUNXO0FBQ1QsV0FBS0ksUUFBTCxHQUFnQixnQkFBaEI7QUFDQSxXQUFLSCxPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0Q7Ozs7Z0NBQ2E7QUFDWCxXQUFLRyxRQUFMLEdBQWdCLFNBQWhCO0FBQ0EsV0FBS0gsT0FBTCxHQUFlLElBQWY7QUFDRDtBQUNEOzs7OzRCQUNTbUIsQyxFQUFHO0FBQ1ZNLGNBQVFDLEdBQVIsQ0FBWVAsRUFBRUMsTUFBRixDQUFTOEIsS0FBckI7QUFDQSxXQUFLN0MsU0FBTCxHQUFpQmMsRUFBRUMsTUFBRixDQUFTOEIsS0FBMUI7QUFDQSxXQUFLL0MsUUFBTCxHQUFnQixTQUFoQjtBQUNBLFdBQUtILE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFDRDs7Ozs2QkFDVTtBQUNSLFdBQUtJLE9BQUwsR0FBZSxlQUFmO0FBQ0EsV0FBS0gsTUFBTCxHQUFjLEtBQWQ7QUFDRDs7OytCQUNXO0FBQ1YsV0FBS0csT0FBTCxHQUFlLFFBQWY7QUFDQSxXQUFLSCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Q7Ozs7MkJBQ1FrQixDLEVBQUc7QUFDVE0sY0FBUUMsR0FBUixDQUFZUCxFQUFFQyxNQUFGLENBQVM4QixLQUFyQjtBQUNBLFdBQUs1QyxPQUFMLEdBQWVhLEVBQUVDLE1BQUYsQ0FBUzhCLEtBQXhCO0FBQ0EsV0FBSzlDLE9BQUwsR0FBZSxRQUFmO0FBQ0EsV0FBS0gsTUFBTCxHQUFjLElBQWQ7QUFDRDs7OztFQTNPK0JrRCxlQUFLQyxJOztrQkFBbEJ6RSxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1J1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHRhYmJhcjogVGFiYmFyXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzZWxlY3RlZDogMSxcclxuICAgICAgLy8g5o6I5p2D6YOo5YiG5pWw5o2uXHJcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcclxuICAgICAgY29kZTogJycsXHJcbiAgICAgIGVuY3J5cHRlZERhdGE6ICcnLFxyXG4gICAgICBpdjogJycsXHJcbiAgICAgIHJhd0RhdGE6ICcnLFxyXG4gICAgICBzaWduYXR1cmU6ICcnLFxyXG4gICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgIHNlc3Npb25JZDogJ3Nlc3Npb25JZCcsXHJcbiAgICAgIC8vIOmmlumhtemDqOWIhuaVsOaNrlxyXG4gICAgICBzcmM6IFsnYmFubmVyMS5wbmcnLCAnYmFubmVyMi5wbmcnLCAnYmFubmVyMy5wbmcnXSxcclxuICAgICAgZGVzc2hvdzogdHJ1ZSxcclxuICAgICAgdGVsc2hvdzogdHJ1ZSxcclxuICAgICAgYWRzaG93OiB0cnVlLFxyXG4gICAgICBkZXNjbGFzczogJ2Rlcy1jb250ZW50JyxcclxuICAgICAgdGVsY2xhc3M6ICd0ZWwtdHh0JyxcclxuICAgICAgYWRjbGFzczogJ2FkLXR4dCcsXHJcbiAgICAgIHRlbG51bWJlcjogJzEzNDI2MjM4NzgxJyxcclxuICAgICAgYWRkcmVzczogJ+WMl+S6rOW4guacnemYs+WMuumAmuaDoOays+eVlOaWh+WMluWIm+aEj+S6p+S4muWbrTExMzHlj7flkJvlpKnlpKfljqblha3lsYInLFxyXG4gICAgICB0eHR2YWx1ZTogJ+WMl+S6rOS6v+e+jui9r+mAmuenkeaKgOaciemZkOWFrOWPuCggQmVpamluZyBFbWF5IFNvZnRjb20gVGVjaG5vbG9neSBMdGQuKeaYr+WFt+Wkh+WbvemZheawtOWHhueahOenu+WKqOWVhuWKoeW5s+WPsOaKgOacr+WSjOW6lOeUqOaWueahiOaPkOS+m+WVhuOAguiHqjIwMDHlubTmiJDnq4vku6XmnaXvvIzkur/nvo7ova/pgJrlp4vnu4joh7Tlipvkuo7kuLrlm73lhoXlpJbkvIHkuJrmj5DkvpvlhbflpIflm73pmYXmioDmnK/msLTlh4bnmoTnp7vliqjllYbliqHlubPlj7Dlj4rov5DokKXmnI3liqHjgILnm67liY3vvIzkur/nvo7ova/pgJrlt7LkuLrotoXov4c1MOS4h+WutuS8geS4muaPkOS+m+enu+WKqOS4quaAp+WuouacjeOAgeenu+WKqOaVsOaNrumHh+mbhuOAgeenu+WKqOmrmOaViOeuoeeQhuetieaWuemdoueahOWQhOexu+enu+WKqOWVhuWKoeS6p+WTgeWSjOmAmuiur+acjeWKoe+8jOS4muWKoeacjeWKoeimhueblui2hei/hzfkur/miYvmnLrnlKjmiLfvvIzmmK/kuK3lm73pooblhYjnmoTnp7vliqjllYbliqHmnI3liqHllYbjgIInXHJcbiAgICB9XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xyXG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgLy8g6I635Y+WY29kZVxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIHZhciBKU0NPREUgPSByZXMuY29kZSAvLyDov5Tlm55jb2RlXHJcbiAgICAgICAgICB0aGlzLmNvZGUgPSBKU0NPREVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29kZSlcclxuICAgICAgICAgIC8vIHZhciBBUFBJRCA9ICd3eDYyYWJhMTgxNGJhYThiNjgnXHJcbiAgICAgICAgICAvLyB2YXIgU0VDUkVUID0gJzY3Y2VmZDdmN2Q0YzYxMjM0YjM5MzdmYTYxYWZlMmMwJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOaOiOadg+mDqOWIhuebuOWFs+aTjeS9nFxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgcHJldmVudFRvdWNoTW92ZSgpIHtcclxuICAgICAgfSxcclxuICAgICAgLyoqXHJcbiAgICAgICog5a+56K+d5qGG56Gu6K6k5oyJ6ZKu54K55Ye75LqL5Lu2XHJcbiAgICAgICovXHJcbiAgICAgIG9uQ29uZmlybSAoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVc2VyaW5mbyhlKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxyXG4gICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcclxuICAgICAgICB0aGlzLmVuY3J5cHRlZERhdGEgPSBlLmRldGFpbC5lbmNyeXB0ZWREYXRhXHJcbiAgICAgICAgdGhpcy5pdiA9IGUuZGV0YWlsLml2XHJcbiAgICAgICAgdGhpcy5yYXdEYXRhID0gZS5kZXRhaWwucmF3RGF0YVxyXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlID0gZS5kZXRhaWwuc2lnbmF0dXJlXHJcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29kZSlcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJ2h0dHA6Ly8xMDAuMTAwLjkuMzk6ODA4MC93ZWIvd3hMb2dpbkF1dGgnLFxyXG4gICAgICAgICAgLy8gdXJsOiAnaHR0cHM6Ly9hcGkud2VpeGluLnFxLmNvbS9zbnMvanNjb2RlMnNlc3Npb24/YXBwaWQ9JGFwcGlkJnNlY3JldD0kc2VjcmV0JmpzX2NvZGU9JGNvZGUmZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXHJcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHRoaXMuZW5jcnlwdGVkRGF0YSxcclxuICAgICAgICAgICAgaXY6IHRoaXMuaXYsXHJcbiAgICAgICAgICAgIHJhd0RhdGE6IHRoaXMucmF3RGF0YSxcclxuICAgICAgICAgICAgc2lnbmF0dXJlOiB0aGlzLnNpZ25hdHVyZSxcclxuICAgICAgICAgICAgdXNlckluZm86IHRoaXMudXNlckluZm9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coMTExKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcclxuICAgICAgICAgICAgLy8g5Zyo6L+Z6YeM6LWL5YC85bm25a2Y5YKoc2Vzc2lvbklkXHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbklkID0gcmVzLmRhdGEucmVzdWx0LnNlc3Npb25JZFxyXG4gICAgICAgICAgICAvLyDlkIzmraXnvJPlrZhcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQpXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAucmVzdWx0LmlzUmVnXHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaG9tZSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghcmVzLmRhdGEucmVzdWx0LmlzUmVnKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0ZXInXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAnaW5kZXgnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hvbWXpobXor7fmsYLlpLHotKUnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOmmlumhteebuOWFs+aTjeS9nFxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0aXRsZTogJ+i9rOWPkee7meaci+WPiycsXHJcbiAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKnycsIHJlcylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn5aSx6LSlJywgcmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWFwVmlld1RhcCAoKSB7XHJcbiAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcclxuICAgICAgICB0eXBlOiAnZ2NqMDInLCAvLyDov5Tlm57lj6/ku6XnlKjkuo53eC5vcGVuTG9jYXRpb27nmoTnu4/nuqzluqZcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICB3eC5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXHJcbiAgICAgICAgICAgIHNjYWxlOiAyOFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDpgInmi6nlm77niYdcclxuICAgIGFkZHBpYyAoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJ2hhbmRsZXBpYydcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGNob29zZWltYWdlICgpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICBjb3VudDogMSxcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XHJcbiAgICAgICAgICAgIHNyYzogcmVzLnRlbXBGaWxlUGF0aHNbMF0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5zcmMpXHJcbiAgICAgICAgICAgICAgdGhhdC5zcmMucHVzaChyZXMucGF0aClcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMucGF0aClcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGF0LnNyYylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBkZWxzd2lwZXIgKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Yig6Zmk5oyH5a6a6L2u5pKt5Zu+54mHJylcclxuICAgIH1cclxuICAgIC8vIOe8lui+keeUteivnVxyXG4gICAgZ2V0bnVtIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgfVxyXG4gICAgLy8g566A5LuL57yW6L6R5pON5L2cXHJcbiAgICBlZGl0VHh0ICgpIHtcclxuICAgICAgdGhpcy5kZXNjbGFzcyA9ICdkZXMtY29udGVudCBhY3RpdmUnXHJcbiAgICAgIHRoaXMuZGVzc2hvdyA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICAvLyDnroDku4vlj5bmtojkv53lrZhcclxuICAgIGNhbmNlbGRlcyAoKSB7XHJcbiAgICAgIHRoaXMuZGVzY2xhc3MgPSAnZGVzLWNvbnRlbnQnXHJcbiAgICAgIHRoaXMuZGVzc2hvdyA9IHRydWVcclxuICAgIH1cclxuICAgIC8vIOeugOS7i+S/neWtmOaTjeS9nFxyXG4gICAgc2F2ZWRlcyAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcclxuICAgICAgdGhpcy50eHR2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuZGVzY2xhc3MgPSAnZGVzLWNvbnRlbnQnXHJcbiAgICAgIHRoaXMuZGVzc2hvdyA9IHRydWVcclxuICAgIH1cclxuICAgIC8vIOeUteivnee8lui+keaTjeS9nFxyXG4gICAgdGVsZWRpdCAoKSB7XHJcbiAgICAgIHRoaXMudGVsY2xhc3MgPSAndGVsLXR4dCBhY3RpdmUnXHJcbiAgICAgIHRoaXMudGVsc2hvdyA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICAvLyDnvJbovpHnlLXor51cclxuICAgIGNhbmNlbHRlbCAoKSB7XHJcbiAgICAgIHRoaXMudGVsY2xhc3MgPSAndGVsLXR4dCdcclxuICAgICAgdGhpcy50ZWxzaG93ID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8g55S16K+d5L+d5a2Y5pON5L2cXHJcbiAgICBzYXZldGVsIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICB0aGlzLnRlbG51bWJlciA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMudGVsY2xhc3MgPSAndGVsLXR4dCdcclxuICAgICAgdGhpcy50ZWxzaG93ID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8g5Zyw5Z2A57yW6L6R5pON5L2cXHJcbiAgICBhZGVkaXQgKCkge1xyXG4gICAgICB0aGlzLmFkY2xhc3MgPSAnYWQtdHh0IGFjdGl2ZSdcclxuICAgICAgdGhpcy5hZHNob3cgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgY2FuY2VsYWQgKCkge1xyXG4gICAgICB0aGlzLmFkY2xhc3MgPSAnYWQtdHh0J1xyXG4gICAgICB0aGlzLmFkc2hvdyA9IHRydWVcclxuICAgIH1cclxuICAgIC8vIOWcsOWdgOS/neWtmOaTjeS9nFxyXG4gICAgc2F2ZWFkIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICB0aGlzLmFkZHJlc3MgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLmFkY2xhc3MgPSAnYWQtdHh0J1xyXG4gICAgICB0aGlzLmFkc2hvdyA9IHRydWVcclxuICAgIH1cclxuICB9XHJcbiJdfQ==