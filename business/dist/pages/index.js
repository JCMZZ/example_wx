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

// import business from '../utils/business'
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
      delImagUrl: '',
      URL: '',
      IMGURLEDIT: '',
      bannerCache: true,
      IMGURL: '',
      showModal: false,
      code: '',
      encryptedData: '',
      iv: '',
      rawData: '',
      signature: '',
      userInfo: {},
      sessionId: '',
      isReg: '',
      src: [],
      // 电话
      tel: '',
      // 地址
      address: '',
      addressC: '',
      // 简介
      describe: '',
      // 经纬度
      latitude: '',
      longitude: '',
      // 后台返回数据
      dataList: '',
      // 编辑弹框
      showeditModal: false,
      modalvalue: '',
      newvalue: '',
      modaltype: '',
      adLinkPath: '', // 图片链接路径
      adImagePath: '' // 图片路径

      // 授权部分相关操作
    }, _this.methods = {
      preventTouchMove: function preventTouchMove() {},

      // 对话框确认按钮点击事件
      onConfirm: function onConfirm() {
        this.showModal = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'getImgUrl',

    // 获取图片url
    value: function getImgUrl(e) {
      this.delImagUrl = e.detail.currentItemId;
    }
    // 添加图片跳转修图页

  }, {
    key: 'addPic',
    value: function addPic() {
      if (this.src.length >= 5) {
        _common2.default.tipAlert('最多可添加5张图片！');
        return;
      }
      wx.redirectTo({
        url: 'handlepic'
      });
    }
    // 删除轮播图

  }, {
    key: 'delswiper',
    value: function delswiper() {
      var _this2 = this;

      wx.showModal({
        title: '提示',
        content: '确定执行删除操作吗?',
        success: function success(res) {
          if (!res.confirm) {
            return;
          }
          if (_this2.src.length <= 0) {
            _common2.default.tipAlert('请先上传至少一张图片!');
            return;
          }
          if (_this2.src.length <= 1) {
            _common2.default.tipAlert('至少保留一张图片!');
            return;
          }
          // 截取图片名称
          var imgName = _this2.delImagUrl.substring(_this2.delImagUrl.lastIndexOf('/') + 1);
          // this.modifyRequest('/deleteImg', {imgName})
          // this.backData()
          wx.request({
            url: _this2.URL + 'store/deleteImg',
            data: {
              imgName: imgName
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'sessionId': wx.getStorageSync('sessionId')
            },
            success: function success(res) {
              var data = res.data;
              if (_common2.default.Interceptor(data)) {
                if (!data.success) {
                  _common2.default.tipAlert(data.message);
                  return;
                }
                _this2.bannerCache = false;
                _this2.$apply();
                _this2.backData();
              }
            },
            fail: function fail(res) {
              console.log(res);
            }
          });
        }
      });
    }
    // 编辑

  }, {
    key: 'editContent',
    value: function editContent(e) {
      var _this3 = this;

      var type = e.currentTarget.dataset.name;
      switch (type) {
        case 'describe':
          this.modalvalue = this.describe;
          this.showeditModal = true;
          this.modaltype = 'describe';
          break;
        case 'tel':
          this.modalvalue = this.tel;
          this.showeditModal = true;
          this.modaltype = 'tel';
          break;
        case 'address':
          this.modalvalue = this.address;
          // this.showeditModal = true
          this.modaltype = 'address';
          // 获取地理位置权限
          wx.getSetting({
            success: function success(res) {
              if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success: function success(res) {
                    wx.chooseLocation({
                      type: 'wgs84',
                      success: function success(res) {
                        res.address || (res.address = '中国地区');
                        _this3.latitude = res.latitude;
                        _this3.longitude = res.longitude;
                        _this3.addressC = _this3.address;
                        _this3.newvalue = _this3.modalvalue = _this3.address = res.address;
                        _this3.showeditModal = true;
                        _this3.$apply();
                      },
                      fail: function fail() {
                        console.log('choose==>返回');
                        _this3.showeditModal = false;
                      }
                    });
                  },
                  fail: function fail() {
                    wx.openSetting({
                      success: function success(res) {
                        if (res.authSetting['scope.userLocation']) {
                          wx.chooseLocation({
                            type: 'wgs84',
                            success: function success(res) {
                              res.address || (res.address = '中国地区');
                              _this3.latitude = res.latitude;
                              _this3.longitude = res.longitude;
                              _this3.addressC = _this3.address;
                              _this3.newvalue = _this3.modalvalue = _this3.address = res.address;
                              _this3.showeditModal = true;
                              _this3.$apply();
                            },
                            fail: function fail() {
                              console.log('choose==>返回');
                              _this3.showeditModal = false;
                            }
                          });
                        }
                      }
                    });
                  }
                });
              } else {
                wx.chooseLocation({
                  type: 'wgs84',
                  success: function success(res) {
                    res.address || (res.address = '中国地区');
                    _this3.latitude = res.latitude;
                    _this3.longitude = res.longitude;
                    _this3.addressC = _this3.address;
                    _this3.newvalue = _this3.modalvalue = _this3.address = res.address;
                    _this3.showeditModal = true;
                    _this3.$apply();
                  },
                  fail: function fail() {
                    console.log('choose==>返回');
                    _this3.showeditModal = false;
                  }
                });
              }
            }
          });
      }
    }
    // 取消编辑

  }, {
    key: 'cancelInput',
    value: function cancelInput() {
      this.showeditModal = false;
    }
  }, {
    key: 'getvalue',
    value: function getvalue(e) {
      this.newvalue = e.detail.value;
    }
    // 保存编辑

  }, {
    key: 'saveInput',
    value: function saveInput(type) {
      this.showeditModal = false;
      // let type = e.currentTarget.dataset.name
      switch (this.modaltype) {
        case 'describe':
          if (this.newvalue.length <= 0) {
            _common2.default.tipAlert('公司简介不能为空');
            return;
          }
          if (!/^[\s\S]{1,300}$/.test(this.newvalue)) {
            _common2.default.tipAlert('最多可输入300字');
            return;
          }
          this.describe = this.newvalue;
          this.modifyRequest('/updateDescribe', { describe: this.describe });
          break;
        case 'tel':
          if (!/^((0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?|[48]0{2}-\d{3}-\d{4}|(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/.test(this.newvalue)) {
            _common2.default.tipAlert('请输入正确的联系方式');
            return;
          }
          this.tel = this.newvalue;
          this.modifyRequest('/updateMobile', { mobile: this.tel });
          break;
        case 'address':
          console.log(this.newvalue);
          if (!/^[\s\S]{1,50}$/.test(this.newvalue)) {
            _common2.default.tipAlert('请输入地址为1到30个字');
          } else {
            this.address = this.newvalue;
            this.modifyRequest('/updateAddress', { longitude: this.longitude, dimension: this.latitude, address: this.address });
          }
      }
    }
    // 保存请求公用方法

  }, {
    key: 'modifyRequest',
    value: function modifyRequest(urL, data) {
      var _this4 = this;

      wx.request({
        url: this.URL + 'store' + urL,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (!data.success) {
              _common2.default.tipAlert(data.message);
              return;
            }
            // this.bannerCache = false
            _this4.$apply();
            // this.backData()
          }
        },
        fail: function fail(res) {
          console.log(res);
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this5 = this;

      // 获取全局的url
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      // 获取缓存中的isReg
      this.isReg = wx.getStorageSync('isReg');
      // 判断授权弹框是否显示
      if (wx.getStorageSync('showModal') === 0) {
        this.showModal = false;
        this.backData();
      } else {
        this.showModal = true;
      }
      if (this.isReg === true) {
        this.showModal = false;
        // wx.removeStorageSync('isReg')
        this.backData();
        wx.removeStorageSync('login');
        wx.removeStorageSync('showModal');
      }
      if (wx.getStorageSync('login') === true) {
        this.showModal = false;
        this.backData();
      }
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.login({
        // 获取code
        success: function success(res) {
          var JSCODE = res.code; // 返回code
          _this5.code = JSCODE;
          _this5.$apply();
        }
      });
    }
    // 获取用户信息

  }, {
    key: 'getUserinfo',
    value: function getUserinfo(e) {
      var _this6 = this;

      if (e.detail.userInfo) {
        this.showModal = false;
        this.encryptedData = e.detail.encryptedData;
        this.iv = e.detail.iv;
        this.rawData = e.detail.rawData;
        this.signature = e.detail.signature;
        this.userInfo = e.detail.userInfo;
        this.$apply();
        // 授权请求
        wx.request({
          url: this.URL + 'wxLoginAuth',
          data: {
            code: this.code,
            encryptedData: this.encryptedData,
            iv: this.iv,
            rawData: this.rawData,
            signature: this.signature
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          method: 'POST',
          success: function success(res) {
            if (res.data.success === false) {
              _common2.default.tipAlert(res.data.message);
            } else {
              // sessionID存储
              _this6.sessionId = res.data.result.sessionId;
              _this6.isReg = res.data.result.isReg;
              wx.setStorageSync('sessionId', _this6.sessionId);
              wx.setStorageSync('isReg', _this6.isReg);
              if (res.data.success === false) {
                wx.redirectTo({
                  url: 'index'
                });
              } else {
                if (!res.data.result.isReg) {
                  wx.redirectTo({
                    url: 'register'
                  });
                } else {
                  wx.redirectTo({
                    url: 'index'
                  });
                }
              }
            }
          },
          fail: function fail() {
            _common2.default.tipAlert('网络错误');
          }
        });
      } else {
        this.showModal = true;
      }
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this7 = this;

      wx.request({
        url: this.URL + 'store/selectStore',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            var result = _this7.dataList = data.result;
            if (data.success) {
              console.log(data);
              _this7.src = !result.imgList || result.imgList.length <= 0 ? [] : result.imgList;
              _this7.tel = result.mobile || '';
              _this7.describe = result.describe || '';
              // this.address = this.addressTS = result.address || ''
              _this7.address = result.address || '';
              _this7.latitude = result.dimension || '';
              _this7.longitude = result.longitude || '';
              _this7.bannerCache = true;
              _this7.adLinkPath = result.adLinkPath || '';
              _this7.adImagePath = result.adImagePath || '';
              _this7.$apply();
            } else {
              _common2.default.tipAlert(data.message);
            }
          }
        },
        fail: function fail() {
          _common2.default.tipAlert('网络错误');
        }
      });
    }
    // 图片点击事件

  }, {
    key: 'handlebanner',
    value: function handlebanner() {
      if (this.adLinkPath !== '') {
        wx.navigateTo({
          url: 'out?adLinkPath=' + this.adLinkPath
        });
      }
    }
  }]);

  return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNlbGVjdGVkIiwiZGVsSW1hZ1VybCIsIlVSTCIsIklNR1VSTEVESVQiLCJiYW5uZXJDYWNoZSIsIklNR1VSTCIsInNob3dNb2RhbCIsImNvZGUiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwidXNlckluZm8iLCJzZXNzaW9uSWQiLCJpc1JlZyIsInNyYyIsInRlbCIsImFkZHJlc3MiLCJhZGRyZXNzQyIsImRlc2NyaWJlIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJkYXRhTGlzdCIsInNob3dlZGl0TW9kYWwiLCJtb2RhbHZhbHVlIiwibmV3dmFsdWUiLCJtb2RhbHR5cGUiLCJhZExpbmtQYXRoIiwiYWRJbWFnZVBhdGgiLCJtZXRob2RzIiwicHJldmVudFRvdWNoTW92ZSIsIm9uQ29uZmlybSIsImUiLCJkZXRhaWwiLCJjdXJyZW50SXRlbUlkIiwibGVuZ3RoIiwiY29tbW9uIiwidGlwQWxlcnQiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImltZ05hbWUiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsIkludGVyY2VwdG9yIiwibWVzc2FnZSIsIiRhcHBseSIsImJhY2tEYXRhIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJuYW1lIiwiZ2V0U2V0dGluZyIsImF1dGhTZXR0aW5nIiwiYXV0aG9yaXplIiwic2NvcGUiLCJjaG9vc2VMb2NhdGlvbiIsIm9wZW5TZXR0aW5nIiwidmFsdWUiLCJ0ZXN0IiwibW9kaWZ5UmVxdWVzdCIsIm1vYmlsZSIsImRpbWVuc2lvbiIsInVyTCIsIm9wdGlvbiIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwibG9naW4iLCJKU0NPREUiLCJyZXN1bHQiLCJzZXRTdG9yYWdlU3luYyIsImltZ0xpc3QiLCJuYXZpZ2F0ZVRvIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTtJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDLGNBQVFDO0FBREEsSyxRQUdWQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLFdBQUssRUFIQTtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLG1CQUFhLElBTFI7QUFNTEMsY0FBUSxFQU5IO0FBT0xDLGlCQUFXLEtBUE47QUFRTEMsWUFBTSxFQVJEO0FBU0xDLHFCQUFlLEVBVFY7QUFVTEMsVUFBSSxFQVZDO0FBV0xDLGVBQVMsRUFYSjtBQVlMQyxpQkFBVyxFQVpOO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsaUJBQVcsRUFkTjtBQWVMQyxhQUFPLEVBZkY7QUFnQkxDLFdBQUssRUFoQkE7QUFpQkw7QUFDQUMsV0FBSyxFQWxCQTtBQW1CTDtBQUNBQyxlQUFTLEVBcEJKO0FBcUJMQyxnQkFBVSxFQXJCTDtBQXNCTDtBQUNBQyxnQkFBVSxFQXZCTDtBQXdCTDtBQUNBQyxnQkFBVSxFQXpCTDtBQTBCTEMsaUJBQVcsRUExQk47QUEyQkw7QUFDQUMsZ0JBQVUs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RCxHQUFxRGlELE9BQU9FLE9BQXZFO0FBQ0EscUJBQUt0RSxHQUFMLEdBQVdvRSxPQUFPWCxNQUFQLElBQWlCLEVBQTVCO0FBQ0EscUJBQUt0RCxRQUFMLEdBQWdCaUUsT0FBT2pFLFFBQVAsSUFBbUIsRUFBbkM7QUFDQTtBQUNBLHFCQUFLRixPQUFMLEdBQWVtRSxPQUFPbkUsT0FBUCxJQUFrQixFQUFqQztBQUNBLHFCQUFLRyxRQUFMLEdBQWdCZ0UsT0FBT1YsU0FBUCxJQUFvQixFQUFwQztBQUNBLHFCQUFLckQsU0FBTCxHQUFpQitELE9BQU8vRCxTQUFQLElBQW9CLEVBQXJDO0FBQ0EscUJBQUtqQixXQUFMLEdBQW1CLElBQW5CO0FBQ0EscUJBQUt1QixVQUFMLEdBQWtCeUQsT0FBT3pELFVBQVAsSUFBcUIsRUFBdkM7QUFDQSxxQkFBS0MsV0FBTCxHQUFtQndELE9BQU94RCxXQUFQLElBQXNCLEVBQXpDO0FBQ0EscUJBQUsyQixNQUFMO0FBQ0QsYUFiRCxNQWFPO0FBQ0xuQiwrQkFBT0MsUUFBUCxDQUFnQnRDLEtBQUt1RCxPQUFyQjtBQUNEO0FBQ0Y7QUFDRixTQTVCUTtBQTZCVEcsY0FBTSxnQkFBTTtBQUNWckIsMkJBQU9DLFFBQVAsQ0FBZ0IsTUFBaEI7QUFDRDtBQS9CUSxPQUFYO0FBaUNEO0FBQ0Q7Ozs7bUNBQ2U7QUFDYixVQUFJLEtBQUtWLFVBQUwsS0FBb0IsRUFBeEIsRUFBNEI7QUFDMUJXLFdBQUdpRCxVQUFILENBQWM7QUFDWi9DLGVBQUssb0JBQW9CLEtBQUtiO0FBRGxCLFNBQWQ7QUFHRDtBQUNGOzs7O0VBOVorQjZELGVBQUtDLEk7O2tCQUFsQm5HLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIC8vIGltcG9ydCBidXNpbmVzcyBmcm9tICcuLi91dGlscy9idXNpbmVzcydcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtSdcclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNlbGVjdGUub25jZVwiOlwic2VsZWN0ZWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICB0YWJiYXI6IFRhYmJhclxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2VsZWN0ZWQ6IDEsXHJcbiAgICAgIGRlbEltYWdVcmw6ICcnLFxyXG4gICAgICBVUkw6ICcnLFxyXG4gICAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgICAgYmFubmVyQ2FjaGU6IHRydWUsXHJcbiAgICAgIElNR1VSTDogJycsXHJcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXHJcbiAgICAgIGNvZGU6ICcnLFxyXG4gICAgICBlbmNyeXB0ZWREYXRhOiAnJyxcclxuICAgICAgaXY6ICcnLFxyXG4gICAgICByYXdEYXRhOiAnJyxcclxuICAgICAgc2lnbmF0dXJlOiAnJyxcclxuICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICBzZXNzaW9uSWQ6ICcnLFxyXG4gICAgICBpc1JlZzogJycsXHJcbiAgICAgIHNyYzogW10sXHJcbiAgICAgIC8vIOeUteivnVxyXG4gICAgICB0ZWw6ICcnLFxyXG4gICAgICAvLyDlnLDlnYBcclxuICAgICAgYWRkcmVzczogJycsXHJcbiAgICAgIGFkZHJlc3NDOiAnJyxcclxuICAgICAgLy8g566A5LuLXHJcbiAgICAgIGRlc2NyaWJlOiAnJyxcclxuICAgICAgLy8g57uP57qs5bqmXHJcbiAgICAgIGxhdGl0dWRlOiAnJyxcclxuICAgICAgbG9uZ2l0dWRlOiAnJyxcclxuICAgICAgLy8g5ZCO5Y+w6L+U5Zue5pWw5o2uXHJcbiAgICAgIGRhdGFMaXN0OiAnJyxcclxuICAgICAgLy8g57yW6L6R5by55qGGXHJcbiAgICAgIHNob3dlZGl0TW9kYWw6IGZhbHNlLFxyXG4gICAgICBtb2RhbHZhbHVlOiAnJyxcclxuICAgICAgbmV3dmFsdWU6ICcnLFxyXG4gICAgICBtb2RhbHR5cGU6ICcnLFxyXG4gICAgICBhZExpbmtQYXRoOiAnJywgLy8g5Zu+54mH6ZO+5o6l6Lev5b6EXHJcbiAgICAgIGFkSW1hZ2VQYXRoOiAnJyAvLyDlm77niYfot6/lvoRcclxuICAgIH1cclxuICAgIC8vIOaOiOadg+mDqOWIhuebuOWFs+aTjeS9nFxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgcHJldmVudFRvdWNoTW92ZSgpIHtcclxuICAgICAgfSxcclxuICAgICAgLy8g5a+56K+d5qGG56Gu6K6k5oyJ6ZKu54K55Ye75LqL5Lu2XHJcbiAgICAgIG9uQ29uZmlybSAoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5blm77niYd1cmxcclxuICAgIGdldEltZ1VybCAoZSkge1xyXG4gICAgICB0aGlzLmRlbEltYWdVcmwgPSBlLmRldGFpbC5jdXJyZW50SXRlbUlkXHJcbiAgICB9XHJcbiAgICAvLyDmt7vliqDlm77niYfot7Povazkv67lm77pobVcclxuICAgIGFkZFBpYyAoKSB7XHJcbiAgICAgIGlmICh0aGlzLnNyYy5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn5pyA5aSa5Y+v5re75YqgNeW8oOWbvueJh++8gScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiAnaGFuZGxlcGljJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Yig6Zmk6L2u5pKt5Zu+XHJcbiAgICBkZWxzd2lwZXIgKCkge1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn56Gu5a6a5omn6KGM5Yig6Zmk5pON5L2c5ZCXPycsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyZXMuY29uZmlybSkgeyByZXR1cm4gfVxyXG4gICAgICAgICAgaWYgKHRoaXMuc3JjLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+35YWI5LiK5Lyg6Iez5bCR5LiA5byg5Zu+54mHIScpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuc3JjLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6Iez5bCR5L+d55WZ5LiA5byg5Zu+54mHIScpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8g5oiq5Y+W5Zu+54mH5ZCN56ewXHJcbiAgICAgICAgICBsZXQgaW1nTmFtZSA9IHRoaXMuZGVsSW1hZ1VybC5zdWJzdHJpbmcodGhpcy5kZWxJbWFnVXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKVxyXG4gICAgICAgICAgLy8gdGhpcy5tb2RpZnlSZXF1ZXN0KCcvZGVsZXRlSW1nJywge2ltZ05hbWV9KVxyXG4gICAgICAgICAgLy8gdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLlVSTCArICdzdG9yZS9kZWxldGVJbWcnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgaW1nTmFtZTogaW1nTmFtZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJDYWNoZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tEYXRhKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g57yW6L6RXHJcbiAgICBlZGl0Q29udGVudCAoZSkge1xyXG4gICAgICBsZXQgdHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnZGVzY3JpYmUnOlxyXG4gICAgICAgICAgdGhpcy5tb2RhbHZhbHVlID0gdGhpcy5kZXNjcmliZVxyXG4gICAgICAgICAgdGhpcy5zaG93ZWRpdE1vZGFsID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy5tb2RhbHR5cGUgPSAnZGVzY3JpYmUnXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIGNhc2UgJ3RlbCc6XHJcbiAgICAgICAgICB0aGlzLm1vZGFsdmFsdWUgPSB0aGlzLnRlbFxyXG4gICAgICAgICAgdGhpcy5zaG93ZWRpdE1vZGFsID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy5tb2RhbHR5cGUgPSAndGVsJ1xyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdhZGRyZXNzJzpcclxuICAgICAgICAgIHRoaXMubW9kYWx2YWx1ZSA9IHRoaXMuYWRkcmVzc1xyXG4gICAgICAgICAgLy8gdGhpcy5zaG93ZWRpdE1vZGFsID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy5tb2RhbHR5cGUgPSAnYWRkcmVzcydcclxuICAgICAgICAgIC8vIOiOt+WPluWcsOeQhuS9jee9ruadg+mZkFxyXG4gICAgICAgICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckxvY2F0aW9uJ10pIHtcclxuICAgICAgICAgICAgICAgIHd4LmF1dGhvcml6ZSh7XHJcbiAgICAgICAgICAgICAgICAgIHNjb3BlOiAnc2NvcGUudXNlckxvY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3Z3M4NCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5hZGRyZXNzIHx8IChyZXMuYWRkcmVzcyA9ICfkuK3lm73lnLDljLonKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NDID0gdGhpcy5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3dmFsdWUgPSB0aGlzLm1vZGFsdmFsdWUgPSB0aGlzLmFkZHJlc3MgPSByZXMuYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dlZGl0TW9kYWwgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaG9vc2U9PT7ov5Tlm54nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dlZGl0TW9kYWwgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJMb2NhdGlvbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3guY2hvb3NlTG9jYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dnczg0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmFkZHJlc3MgfHwgKHJlcy5hZGRyZXNzID0gJ+S4reWbveWcsOWMuicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0MgPSB0aGlzLmFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXd2YWx1ZSA9IHRoaXMubW9kYWx2YWx1ZSA9IHRoaXMuYWRkcmVzcyA9IHJlcy5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd2VkaXRNb2RhbCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nob29zZT09Pui/lOWbnicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd2VkaXRNb2RhbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3dnczg0JyxcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5hZGRyZXNzIHx8IChyZXMuYWRkcmVzcyA9ICfkuK3lm73lnLDljLonKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NDID0gdGhpcy5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXd2YWx1ZSA9IHRoaXMubW9kYWx2YWx1ZSA9IHRoaXMuYWRkcmVzcyA9IHJlcy5hZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93ZWRpdE1vZGFsID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaG9vc2U9PT7ov5Tlm54nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd2VkaXRNb2RhbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDlj5bmtojnvJbovpFcclxuICAgIGNhbmNlbElucHV0KCkge1xyXG4gICAgICB0aGlzLnNob3dlZGl0TW9kYWwgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgZ2V0dmFsdWUoZSkge1xyXG4gICAgICB0aGlzLm5ld3ZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgIH1cclxuICAgIC8vIOS/neWtmOe8lui+kVxyXG4gICAgc2F2ZUlucHV0ICh0eXBlKSB7XHJcbiAgICAgIHRoaXMuc2hvd2VkaXRNb2RhbCA9IGZhbHNlXHJcbiAgICAgIC8vIGxldCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICBzd2l0Y2ggKHRoaXMubW9kYWx0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnZGVzY3JpYmUnOlxyXG4gICAgICAgICAgaWYgKHRoaXMubmV3dmFsdWUubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCflhazlj7jnroDku4vkuI3og73kuLrnqbonKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghL15bXFxzXFxTXXsxLDMwMH0kLy50ZXN0KHRoaXMubmV3dmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5pyA5aSa5Y+v6L6T5YWlMzAw5a2XJylcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmRlc2NyaWJlID0gdGhpcy5uZXd2YWx1ZVxyXG4gICAgICAgICAgdGhpcy5tb2RpZnlSZXF1ZXN0KCcvdXBkYXRlRGVzY3JpYmUnLCB7ZGVzY3JpYmU6IHRoaXMuZGVzY3JpYmV9KVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICd0ZWwnOlxyXG4gICAgICAgICAgaWYgKCEvXigoMFswLTldezIsM30tKT8oWzItOV1bMC05XXs2LDd9KSsoLVswLTldezEsNH0pP3xbNDhdMHsyfS1cXGR7M30tXFxkezR9fCgxM1swLTldfDE0WzU3OV18MTVbMC0zLDUtOV18MTZbNl18MTdbMDEzNTY3OF18MThbMC05XXwxOVs4OV0pXFxkezh9KSQvLnRlc3QodGhpcy5uZXd2YWx1ZSkpIHtcclxuICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7fovpPlhaXmraPnoa7nmoTogZTns7vmlrnlvI8nKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMudGVsID0gdGhpcy5uZXd2YWx1ZVxyXG4gICAgICAgICAgdGhpcy5tb2RpZnlSZXF1ZXN0KCcvdXBkYXRlTW9iaWxlJywge21vYmlsZTogdGhpcy50ZWx9KVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlICdhZGRyZXNzJzpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmV3dmFsdWUpXHJcbiAgICAgICAgICBpZiAoIS9eW1xcc1xcU117MSw1MH0kLy50ZXN0KHRoaXMubmV3dmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+36L6T5YWl5Zyw5Z2A5Li6MeWIsDMw5Liq5a2XJylcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IHRoaXMubmV3dmFsdWVcclxuICAgICAgICAgICAgdGhpcy5tb2RpZnlSZXF1ZXN0KCcvdXBkYXRlQWRkcmVzcycsIHtsb25naXR1ZGU6IHRoaXMubG9uZ2l0dWRlLCBkaW1lbnNpb246IHRoaXMubGF0aXR1ZGUsIGFkZHJlc3M6IHRoaXMuYWRkcmVzc30pXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOS/neWtmOivt+axguWFrOeUqOaWueazlVxyXG4gICAgbW9kaWZ5UmVxdWVzdCAodXJMLCBkYXRhKSB7XHJcbiAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogdGhpcy5VUkwgKyAnc3RvcmUnICsgdXJMLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdzZXNzaW9uSWQnOiB3eC5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbklkJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmFubmVyQ2FjaGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmFja0RhdGEoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgLy8g6I635Y+W5YWo5bGA55qEdXJsXHJcbiAgICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICAgIHRoaXMuSU1HVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuSU1HVVJMXHJcbiAgICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICAgICAgLy8g6I635Y+W57yT5a2Y5Lit55qEaXNSZWdcclxuICAgICAgdGhpcy5pc1JlZyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpc1JlZycpXHJcbiAgICAgIC8vIOWIpOaWreaOiOadg+W8ueahhuaYr+WQpuaYvuekulxyXG4gICAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoJ3Nob3dNb2RhbCcpID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuYmFja0RhdGEoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmlzUmVnID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gICAgICAgIC8vIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdpc1JlZycpXHJcbiAgICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygnc2hvd01vZGFsJylcclxuICAgICAgfVxyXG4gICAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJykgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgIH1cclxuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAvLyDojrflj5Zjb2RlXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdmFyIEpTQ09ERSA9IHJlcy5jb2RlIC8vIOi/lOWbnmNvZGVcclxuICAgICAgICAgIHRoaXMuY29kZSA9IEpTQ09ERVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgZ2V0VXNlcmluZm8oZSkge1xyXG4gICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcclxuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5lbmNyeXB0ZWREYXRhID0gZS5kZXRhaWwuZW5jcnlwdGVkRGF0YVxyXG4gICAgICAgIHRoaXMuaXYgPSBlLmRldGFpbC5pdlxyXG4gICAgICAgIHRoaXMucmF3RGF0YSA9IGUuZGV0YWlsLnJhd0RhdGFcclxuICAgICAgICB0aGlzLnNpZ25hdHVyZSA9IGUuZGV0YWlsLnNpZ25hdHVyZVxyXG4gICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAvLyDmjojmnYPor7fmsYJcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogdGhpcy5VUkwgKyAnd3hMb2dpbkF1dGgnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXHJcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHRoaXMuZW5jcnlwdGVkRGF0YSxcclxuICAgICAgICAgICAgaXY6IHRoaXMuaXYsXHJcbiAgICAgICAgICAgIHJhd0RhdGE6IHRoaXMucmF3RGF0YSxcclxuICAgICAgICAgICAgc2lnbmF0dXJlOiB0aGlzLnNpZ25hdHVyZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQocmVzLmRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzZXNzaW9uSUTlrZjlgqhcclxuICAgICAgICAgICAgICB0aGlzLnNlc3Npb25JZCA9IHJlcy5kYXRhLnJlc3VsdC5zZXNzaW9uSWRcclxuICAgICAgICAgICAgICB0aGlzLmlzUmVnID0gcmVzLmRhdGEucmVzdWx0LmlzUmVnXHJcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcsIHRoaXMuc2Vzc2lvbklkKVxyXG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpc1JlZycsIHRoaXMuaXNSZWcpXHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAnaW5kZXgnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcy5kYXRhLnJlc3VsdC5pc1JlZykge1xyXG4gICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RlcidcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2luZGV4J1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfnvZHnu5zplJnor68nKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOWbnuaYvuaVsOaNrlxyXG4gICAgYmFja0RhdGEgKCkge1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ3N0b3JlL3NlbGVjdFN0b3JlJyxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kYXRhTGlzdCA9IGRhdGEucmVzdWx0XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gIXJlc3VsdC5pbWdMaXN0IHx8IHJlc3VsdC5pbWdMaXN0Lmxlbmd0aCA8PSAwID8gW10gOiByZXN1bHQuaW1nTGlzdFxyXG4gICAgICAgICAgICAgIHRoaXMudGVsID0gcmVzdWx0Lm1vYmlsZSB8fCAnJ1xyXG4gICAgICAgICAgICAgIHRoaXMuZGVzY3JpYmUgPSByZXN1bHQuZGVzY3JpYmUgfHwgJydcclxuICAgICAgICAgICAgICAvLyB0aGlzLmFkZHJlc3MgPSB0aGlzLmFkZHJlc3NUUyA9IHJlc3VsdC5hZGRyZXNzIHx8ICcnXHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzID0gcmVzdWx0LmFkZHJlc3MgfHwgJydcclxuICAgICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzdWx0LmRpbWVuc2lvbiB8fCAnJ1xyXG4gICAgICAgICAgICAgIHRoaXMubG9uZ2l0dWRlID0gcmVzdWx0LmxvbmdpdHVkZSB8fCAnJ1xyXG4gICAgICAgICAgICAgIHRoaXMuYmFubmVyQ2FjaGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgdGhpcy5hZExpbmtQYXRoID0gcmVzdWx0LmFkTGlua1BhdGggfHwgJydcclxuICAgICAgICAgICAgICB0aGlzLmFkSW1hZ2VQYXRoID0gcmVzdWx0LmFkSW1hZ2VQYXRoIHx8ICcnXHJcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn572R57uc6ZSZ6K+vJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyDlm77niYfngrnlh7vkuovku7ZcclxuICAgIGhhbmRsZWJhbm5lcigpIHtcclxuICAgICAgaWYgKHRoaXMuYWRMaW5rUGF0aCAhPT0gJycpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogJ291dD9hZExpbmtQYXRoPScgKyB0aGlzLmFkTGlua1BhdGhcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=