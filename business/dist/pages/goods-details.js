'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tabbar = require('./../compontents/tabbar.js');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoodsDetails = function (_wepy$page) {
  _inherits(GoodsDetails, _wepy$page);

  function GoodsDetails() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GoodsDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GoodsDetails.__proto__ || Object.getPrototypeOf(GoodsDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '产品详情'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      bannerCache: true,
      selected: 2,
      src: [],
      name: '',
      describe: '',
      IMGURL: '',
      price: 0,
      discount: '',
      discountPrice: 0,
      // 按钮的隐藏与显示
      namebtn: true,
      desbtn: true,
      nPbtn: true,
      oPbtn: true,
      URL: '',
      IMGURLEDIT: '',
      delImagUrl: '',
      showModal: false,
      modalvalue: '',
      newvalue: '',
      modaltype: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GoodsDetails, [{
    key: 'onShow',
    value: function onShow() {
      this.URL = this.$parent.globalData.URL;
      this.IMGURL = this.$parent.globalData.IMGURL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      this.backData();
    }
  }, {
    key: 'openToast',
    value: function openToast() {
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 3000
      });
    }
    // 添加选择图片

  }, {
    key: 'addpic',
    value: function addpic() {
      if (this.src.length >= 5) {
        _common2.default.tipAlert('最多可添加5张图片！');
        return;
      }
      wx.redirectTo({
        url: 'goodspic'
      });
    }
    // 获取图片url

  }, {
    key: 'getImgUrl',
    value: function getImgUrl(e) {
      this.delImagUrl = e.detail.currentItemId;
      // console.log(this.delImagUrl)
    }
    // 删除轮播图操作

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
            _common2.default.tipAlert('暂无可删除的图片!');
            return;
          }
          if (_this2.src.length <= 1) {
            _common2.default.tipAlert('至少保留一张图片!');
            return;
          }
          // 截取图片名称
          var imgName = _this2.delImagUrl.substring(_this2.delImagUrl.lastIndexOf('/') + 1);
          var id = wx.getStorageSync('goodsId');
          // this.modifyRequest('/deleteImg', {imgName, id})
          wx.request({
            url: _this2.URL + 'goods/deleteImg',
            data: {
              imgName: imgName,
              id: id
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
            fail: function fail(res) {}
          });
        }
      });
    }
    // 编辑

  }, {
    key: 'editContent',
    value: function editContent(e) {
      this.showModal = true;
      var type = e.currentTarget.dataset.name;
      switch (type) {
        case 'name':
          this.modalvalue = this.name;
          this.modaltype = 'name';
          break;
        case 'describe':
          this.modalvalue = this.describe;
          this.modaltype = 'describe';
          break;
        case 'price':
          this.modalvalue = this.price;
          this.modaltype = 'price';
          break;
        case 'discountPrice':
          this.modalvalue = this.discountPrice;
          this.modaltype = 'discountPrice';
          break;
      }
      this.newvalue = this.modalvalue;
    }
    // 取消编辑

  }, {
    key: 'cancelInput',
    value: function cancelInput() {
      this.showModal = false;
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
      this.showModal = false;
      var goodsId = wx.getStorageSync('goodsId');
      switch (this.modaltype) {
        case 'name':
          if (/^\s*$/.test(this.newvalue)) {
            _common2.default.tipAlert('名称不能为空！');
            return;
          }
          if (this.newvalue.length > 30) {
            _common2.default.tipAlert('名称应在30字以内！');
            return;
          }
          this.name = this.newvalue;
          this.modifyRequest('/updateName', { name: this.name, id: goodsId });
          break;
        case 'describe':
          if (/^\s*$/.test(this.newvalue)) {
            _common2.default.tipAlert('描述不能为空！');
            return;
          }
          if (this.newvalue.length > 100) {
            _common2.default.tipAlert('描述应在100字以内！');
            return;
          }
          this.describe = this.newvalue;
          this.modifyRequest('/updateGoodsDescribe', { goodsDescribe: this.describe, id: goodsId });
          break;
        case 'price':
          if (this.newvalue > 0) {
            if (this.newvalue > 1000000) {
              _common2.default.tipAlert('输入金额控制在百万以内');
            } else {
              if (this.newvalue.indexOf('.') !== -1 && this.newvalue.substring(this.newvalue.indexOf('.') + 1).length > 2) {
                _common2.default.tipAlert('小数点后最多两位！');
              } else {
                this.modifyRequest('/updatePrice', { price: this.newvalue, id: goodsId });
              }
            }
          } else {
            _common2.default.tipAlert('请输入大于0的合法数值！');
          }
          break;
        case 'discountPrice':
          if (this.newvalue > 0) {
            if (this.newvalue > 1000000) {
              _common2.default.tipAlert('输入金额控制在百万以内');
            } else {
              if (this.newvalue.indexOf('.') !== -1 && this.newvalue.substring(this.newvalue.indexOf('.') + 1).length > 2) {
                _common2.default.tipAlert('小数点后最多两位！');
              } else {
                this.modifyRequest('/updateDiscountPrice', { discountPrice: this.newvalue, id: goodsId });
              }
            }
          } else {
            _common2.default.tipAlert('请输入大于0的合法数值！');
          }
      }
    }
    // 保存请求公用方法

  }, {
    key: 'modifyRequest',
    value: function modifyRequest(urL, data) {
      var _this3 = this;

      wx.request({
        url: this.URL + 'goods' + urL,
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
              _this3.discountPrice = _this3.modalvalue;
              return;
            }
            urL === '/updateDiscountPrice' && (_this3.discountPrice = _this3.newvalue);
            urL === '/updatePrice' && (_this3.price = _this3.newvalue);
            _this3.discount = data.result;
            _this3.$apply();
          }
        },
        fail: function fail(res) {}
      });
    }
    // 回显数据

  }, {
    key: 'backData',
    value: function backData() {
      var _this4 = this;

      wx.request({
        url: this.URL + 'goods/info',
        method: 'POST',
        data: {
          goodsId: wx.getStorageSync('goodsId')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        success: function success(res) {
          var result = res.data.result;
          if (result !== null) {
            _this4.name = _this4.nameTS = result.name || '';
            _this4.describe = _this4.describeTS = result.goodsDescribe || '';
            _this4.price = _this4.priceTS = result.price + '' || '';
            _this4.discountPrice = _this4.discountPriceTS = result.discountPrice + '' || '';
            _this4.discount = result.discount || '';
            _this4.src = !result.imgList || result.imgList.length <= 0 ? [] : result.imgList;
            _this4.bannerCache = true;
            _this4.$apply();
          }
        }
      });
    }
  }]);

  return GoodsDetails;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(GoodsDetails , 'pages/goods-details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLWRldGFpbHMuanMiXSwibmFtZXMiOlsiR29vZHNEZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYkJhciIsImRhdGEiLCJiYW5uZXJDYWNoZSIsInNlbGVjdGVkIiwic3JjIiwibmFtZSIsImRlc2NyaWJlIiwiSU1HVVJMIiwicHJpY2UiLCJkaXNjb3VudCIsImRpc2NvdW50UHJpY2UiLCJuYW1lYnRuIiwiZGVzYnRuIiwiblBidG4iLCJvUGJ0biIsIlVSTCIsIklNR1VSTEVESVQiLCJkZWxJbWFnVXJsIiwic2hvd01vZGFsIiwibW9kYWx2YWx1ZSIsIm5ld3ZhbHVlIiwibW9kYWx0eXBlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJiYWNrRGF0YSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJsZW5ndGgiLCJjb21tb24iLCJ0aXBBbGVydCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJlIiwiZGV0YWlsIiwiY3VycmVudEl0ZW1JZCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImltZ05hbWUiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwiSW50ZXJjZXB0b3IiLCJtZXNzYWdlIiwiJGFwcGx5IiwiZmFpbCIsInR5cGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInZhbHVlIiwiZ29vZHNJZCIsInRlc3QiLCJtb2RpZnlSZXF1ZXN0IiwiZ29vZHNEZXNjcmliZSIsImluZGV4T2YiLCJ1ckwiLCJyZXN1bHQiLCJuYW1lVFMiLCJkZXNjcmliZVRTIiwicHJpY2VUUyIsImRpc2NvdW50UHJpY2VUUyIsImltZ0xpc3QiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7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QUgsQ0FBa0IsU0FBbEI7QUFETCxTQUhHO0FBTVRHLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWF4QixHQUFHcUIsY0FBSCxDQUFrQixXQUFsQjtBQUZQLFNBTkM7QUFVVFAsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJd0IsU0FBU3hCLElBQUl2QyxJQUFKLENBQVMrRCxNQUF0QjtBQUNBLGNBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNuQixtQkFBSzNELElBQUwsR0FBWSxPQUFLNEQsTUFBTCxHQUFjRCxPQUFPM0QsSUFBUCxJQUFlLEVBQXpDO0FBQ0EsbUJBQUtDLFFBQUwsR0FBZ0IsT0FBSzRELFVBQUwsR0FBa0JGLE9BQU9ILGFBQVAsSUFBd0IsRUFBMUQ7QUFDQSxtQkFBS3JELEtBQUwsR0FBYSxPQUFLMkQsT0FBTCxHQUFlSCxPQUFPeEQsS0FBUCxHQUFlLEVBQWYsSUFBcUIsRUFBakQ7QUFDQSxtQkFBS0UsYUFBTCxHQUFxQixPQUFLMEQsZUFBTCxHQUF1QkosT0FBT3RELGFBQVAsR0FBdUIsRUFBdkIsSUFBNkIsRUFBekU7QUFDQSxtQkFBS0QsUUFBTCxHQUFnQnVELE9BQU92RCxRQUFQLElBQW1CLEVBQW5DO0FBQ0EsbUJBQUtMLEdBQUwsR0FBVyxDQUFDNEQsT0FBT0ssT0FBUixJQUFtQkwsT0FBT0ssT0FBUCxDQUFldkMsTUFBZixJQUF5QixDQUE1QyxHQUFnRCxFQUFoRCxHQUFxRGtDLE9BQU9LLE9BQXZFO0FBQ0EsbUJBQUtuRSxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsbUJBQUtrRCxNQUFMO0FBQ0Q7QUFDRjtBQXRCUSxPQUFYO0FBd0JEOzs7O0VBOVB1Q2tCLGVBQUtDLEk7O2tCQUExQi9FLFkiLCJmaWxlIjoiZ29vZHMtZGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVGFiQmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzRGV0YWlscyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S6p+WTgeivpuaDhSdcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYkJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgYmFubmVyQ2FjaGU6IHRydWUsXHJcbiAgICBzZWxlY3RlZDogMixcclxuICAgIHNyYzogW10sXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGRlc2NyaWJlOiAnJyxcclxuICAgIElNR1VSTDogJycsXHJcbiAgICBwcmljZTogMCxcclxuICAgIGRpc2NvdW50OiAnJyxcclxuICAgIGRpc2NvdW50UHJpY2U6IDAsXHJcbiAgICAvLyDmjInpkq7nmoTpmpDol4/kuI7mmL7npLpcclxuICAgIG5hbWVidG46IHRydWUsXHJcbiAgICBkZXNidG46IHRydWUsXHJcbiAgICBuUGJ0bjogdHJ1ZSxcclxuICAgIG9QYnRuOiB0cnVlLFxyXG4gICAgVVJMOiAnJyxcclxuICAgIElNR1VSTEVESVQ6ICcnLFxyXG4gICAgZGVsSW1hZ1VybDogJycsXHJcbiAgICBzaG93TW9kYWw6IGZhbHNlLFxyXG4gICAgbW9kYWx2YWx1ZTogJycsXHJcbiAgICBuZXd2YWx1ZTogJycsXHJcbiAgICBtb2RhbHR5cGU6ICcnXHJcbiAgfVxyXG4gIG9uU2hvdyAoKSB7XHJcbiAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgdGhpcy5JTUdVUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5JTUdVUkxcclxuICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICAgIHRoaXMuYmFja0RhdGEoKVxyXG4gIH1cclxuICBvcGVuVG9hc3QgKCkge1xyXG4gICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgdGl0bGU6ICflt7LmlLbol48nLFxyXG4gICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgIGR1cmF0aW9uOiAzMDAwXHJcbiAgICB9KVxyXG4gIH1cclxuICAvLyDmt7vliqDpgInmi6nlm77niYdcclxuICBhZGRwaWMgKCkge1xyXG4gICAgaWYgKHRoaXMuc3JjLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgIGNvbW1vbi50aXBBbGVydCgn5pyA5aSa5Y+v5re75YqgNeW8oOWbvueJh++8gScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgIHVybDogJ2dvb2RzcGljJ1xyXG4gICAgfSlcclxuICB9XHJcbiAgLy8g6I635Y+W5Zu+54mHdXJsXHJcbiAgZ2V0SW1nVXJsIChlKSB7XHJcbiAgICB0aGlzLmRlbEltYWdVcmwgPSBlLmRldGFpbC5jdXJyZW50SXRlbUlkXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmRlbEltYWdVcmwpXHJcbiAgfVxyXG4gIC8vIOWIoOmZpOi9ruaSreWbvuaTjeS9nFxyXG4gIGRlbHN3aXBlciAoKSB7XHJcbiAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgIGNvbnRlbnQ6ICfnoa7lrprmiafooYzliKDpmaTmk43kvZzlkJc/JyxcclxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgIGlmICghcmVzLmNvbmZpcm0pIHsgcmV0dXJuIH1cclxuICAgICAgICBpZiAodGhpcy5zcmMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5pqC5peg5Y+v5Yig6Zmk55qE5Zu+54mHIScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3JjLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+iHs+WwkeS/neeVmeS4gOW8oOWbvueJhyEnKVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaIquWPluWbvueJh+WQjeensFxyXG4gICAgICAgIGxldCBpbWdOYW1lID0gdGhpcy5kZWxJbWFnVXJsLnN1YnN0cmluZyh0aGlzLmRlbEltYWdVcmwubGFzdEluZGV4T2YoJy8nKSArIDEpXHJcbiAgICAgICAgbGV0IGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2dvb2RzSWQnKVxyXG4gICAgICAgIC8vIHRoaXMubW9kaWZ5UmVxdWVzdCgnL2RlbGV0ZUltZycsIHtpbWdOYW1lLCBpZH0pXHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ2dvb2RzL2RlbGV0ZUltZycsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGltZ05hbWU6IGltZ05hbWUsXHJcbiAgICAgICAgICAgIGlkOiBpZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLmJhbm5lckNhY2hlID0gZmFsc2VcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgLy8g57yW6L6RXHJcbiAgZWRpdENvbnRlbnQoZSkge1xyXG4gICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXHJcbiAgICBsZXQgdHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICduYW1lJzpcclxuICAgICAgICB0aGlzLm1vZGFsdmFsdWUgPSB0aGlzLm5hbWVcclxuICAgICAgICB0aGlzLm1vZGFsdHlwZSA9ICduYW1lJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ2Rlc2NyaWJlJzpcclxuICAgICAgICB0aGlzLm1vZGFsdmFsdWUgPSB0aGlzLmRlc2NyaWJlXHJcbiAgICAgICAgdGhpcy5tb2RhbHR5cGUgPSAnZGVzY3JpYmUnXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAncHJpY2UnOlxyXG4gICAgICAgIHRoaXMubW9kYWx2YWx1ZSA9IHRoaXMucHJpY2VcclxuICAgICAgICB0aGlzLm1vZGFsdHlwZSA9ICdwcmljZSdcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdkaXNjb3VudFByaWNlJzpcclxuICAgICAgICB0aGlzLm1vZGFsdmFsdWUgPSB0aGlzLmRpc2NvdW50UHJpY2VcclxuICAgICAgICB0aGlzLm1vZGFsdHlwZSA9ICdkaXNjb3VudFByaWNlJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgICB0aGlzLm5ld3ZhbHVlID0gdGhpcy5tb2RhbHZhbHVlXHJcbiAgfVxyXG4gIC8vIOWPlua2iOe8lui+kVxyXG4gIGNhbmNlbElucHV0KCkge1xyXG4gICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gIH1cclxuICBnZXR2YWx1ZShlKSB7XHJcbiAgICB0aGlzLm5ld3ZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICB9XHJcbiAgLy8g5L+d5a2Y57yW6L6RXHJcbiAgc2F2ZUlucHV0ICh0eXBlKSB7XHJcbiAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXHJcbiAgICBsZXQgZ29vZHNJZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdnb29kc0lkJylcclxuICAgIHN3aXRjaCAodGhpcy5tb2RhbHR5cGUpIHtcclxuICAgICAgY2FzZSAnbmFtZSc6XHJcbiAgICAgICAgaWYgKC9eXFxzKiQvLnRlc3QodGhpcy5uZXd2YWx1ZSkpIHtcclxuICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5ZCN56ew5LiN6IO95Li656m677yBJylcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5uZXd2YWx1ZS5sZW5ndGggPiAzMCkge1xyXG4gICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCflkI3np7DlupTlnKgzMOWtl+S7peWGhe+8gScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uZXd2YWx1ZVxyXG4gICAgICAgIHRoaXMubW9kaWZ5UmVxdWVzdCgnL3VwZGF0ZU5hbWUnLCB7bmFtZTogdGhpcy5uYW1lLCBpZDogZ29vZHNJZH0pXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAnZGVzY3JpYmUnOlxyXG4gICAgICAgIGlmICgvXlxccyokLy50ZXN0KHRoaXMubmV3dmFsdWUpKSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+aPj+i/sOS4jeiDveS4uuepuu+8gScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubmV3dmFsdWUubGVuZ3RoID4gMTAwKSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+aPj+i/sOW6lOWcqDEwMOWtl+S7peWGhe+8gScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZXNjcmliZSA9IHRoaXMubmV3dmFsdWVcclxuICAgICAgICB0aGlzLm1vZGlmeVJlcXVlc3QoJy91cGRhdGVHb29kc0Rlc2NyaWJlJywge2dvb2RzRGVzY3JpYmU6IHRoaXMuZGVzY3JpYmUsIGlkOiBnb29kc0lkfSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgaWYgKHRoaXMubmV3dmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5uZXd2YWx1ZSA+IDEwMDAwMDApIHtcclxuICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfovpPlhaXph5Hpop3mjqfliLblnKjnmb7kuIfku6XlhoUnKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmV3dmFsdWUuaW5kZXhPZignLicpICE9PSAtMSAmJiB0aGlzLm5ld3ZhbHVlLnN1YnN0cmluZyh0aGlzLm5ld3ZhbHVlLmluZGV4T2YoJy4nKSArIDEpLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+Wwj+aVsOeCueWQjuacgOWkmuS4pOS9je+8gScpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZnlSZXF1ZXN0KCcvdXBkYXRlUHJpY2UnLCB7cHJpY2U6IHRoaXMubmV3dmFsdWUsIGlkOiBnb29kc0lkfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpeWkp+S6jjDnmoTlkIjms5XmlbDlgLzvvIEnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdkaXNjb3VudFByaWNlJzpcclxuICAgICAgICBpZiAodGhpcy5uZXd2YWx1ZSA+IDApIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5ld3ZhbHVlID4gMTAwMDAwMCkge1xyXG4gICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+i+k+WFpemHkemineaOp+WItuWcqOeZvuS4h+S7peWGhScpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uZXd2YWx1ZS5pbmRleE9mKCcuJykgIT09IC0xICYmIHRoaXMubmV3dmFsdWUuc3Vic3RyaW5nKHRoaXMubmV3dmFsdWUuaW5kZXhPZignLicpICsgMSkubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn5bCP5pWw54K55ZCO5pyA5aSa5Lik5L2N77yBJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLm1vZGlmeVJlcXVlc3QoJy91cGRhdGVEaXNjb3VudFByaWNlJywge2Rpc2NvdW50UHJpY2U6IHRoaXMubmV3dmFsdWUsIGlkOiBnb29kc0lkfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpeWkp+S6jjDnmoTlkIjms5XmlbDlgLzvvIEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8g5L+d5a2Y6K+35rGC5YWs55So5pa55rOVXHJcbiAgbW9kaWZ5UmVxdWVzdCAodXJMLCBkYXRhKSB7XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGlzLlVSTCArICdnb29kcycgKyB1ckwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudFByaWNlID0gdGhpcy5tb2RhbHZhbHVlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdXJMID09PSAnL3VwZGF0ZURpc2NvdW50UHJpY2UnICYmICh0aGlzLmRpc2NvdW50UHJpY2UgPSB0aGlzLm5ld3ZhbHVlKVxyXG4gICAgICAgICAgdXJMID09PSAnL3VwZGF0ZVByaWNlJyAmJiAodGhpcy5wcmljZSA9IHRoaXMubmV3dmFsdWUpXHJcbiAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gZGF0YS5yZXN1bHRcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgLy8g5Zue5pi+5pWw5o2uXHJcbiAgYmFja0RhdGEgKCkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAnZ29vZHMvaW5mbycsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZ29vZHNJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ2dvb2RzSWQnKVxyXG4gICAgICB9LFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gcmVzLmRhdGEucmVzdWx0XHJcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lVFMgPSByZXN1bHQubmFtZSB8fCAnJ1xyXG4gICAgICAgICAgdGhpcy5kZXNjcmliZSA9IHRoaXMuZGVzY3JpYmVUUyA9IHJlc3VsdC5nb29kc0Rlc2NyaWJlIHx8ICcnXHJcbiAgICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5wcmljZVRTID0gcmVzdWx0LnByaWNlICsgJycgfHwgJydcclxuICAgICAgICAgIHRoaXMuZGlzY291bnRQcmljZSA9IHRoaXMuZGlzY291bnRQcmljZVRTID0gcmVzdWx0LmRpc2NvdW50UHJpY2UgKyAnJyB8fCAnJ1xyXG4gICAgICAgICAgdGhpcy5kaXNjb3VudCA9IHJlc3VsdC5kaXNjb3VudCB8fCAnJ1xyXG4gICAgICAgICAgdGhpcy5zcmMgPSAhcmVzdWx0LmltZ0xpc3QgfHwgcmVzdWx0LmltZ0xpc3QubGVuZ3RoIDw9IDAgPyBbXSA6IHJlc3VsdC5pbWdMaXN0XHJcbiAgICAgICAgICB0aGlzLmJhbm5lckNhY2hlID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19