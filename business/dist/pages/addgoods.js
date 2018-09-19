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

var Addgoods = function (_wepy$page) {
  _inherits(Addgoods, _wepy$page);

  function Addgoods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Addgoods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Addgoods.__proto__ || Object.getPrototypeOf(Addgoods)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '添加产品'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      selected: 2,
      src: '',
      IMGURLEDIT: '',
      name: '',
      describe: '',
      price: '',
      discount: '',
      discountPrice: '',
      URL: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Addgoods, [{
    key: 'getText',
    value: function getText(e) {
      var _this2 = this;

      var type = e.currentTarget.dataset.name;
      switch (type) {
        case 'name':
          this.name = e.detail.value;
          break;
        case 'describe':
          this.describe = e.detail.value;
          break;
        case 'disPrice':
          this.discountPrice = e.detail.value;
          break;
        case 'price':
          this.price = e.detail.value;
      }
      if (!this.src) {
        wx.showModal({
          content: '请先上传图片',
          showCancel: false,
          success: function success(res) {
            _this2.name = _this2.describe = _this2.discountPrice = _this2.price = '';
            _this2.$apply();
          }
        });
      }
    }
    // 添加选择图片

  }, {
    key: 'addpic',
    value: function addpic() {
      wx.redirectTo({
        url: 'addgoodspic'
      });
    }
    // 删除轮播图操作

  }, {
    key: 'delswiper',
    value: function delswiper() {
      this.src = '';
      // wx.showModal({
      //   title: '提示',
      //   content: '确定执行删除操作吗?',
      //   success: (res) => {
      //     this.src = ''
      //   }
      // })
    }
    // 保存所有操作

  }, {
    key: 'saveall',
    value: function saveall() {
      console.log('保存所有');
      if (this.name === '') {
        _common2.default.tipAlert('请输入产品名字');
        return;
      }
      if (this.name.length > 30) {
        _common2.default.tipAlert('名称保持30字以内');
        return;
      }
      if (this.describe === '') {
        _common2.default.tipAlert('请输入产品描述');
        return;
      }
      if (this.describe.length > 100) {
        _common2.default.tipAlert('产品描述保持100字以内');
        return;
      }
      if (this.discountPrice > 0) {
        if (this.discountPrice > 1000000) {
          _common2.default.tipAlert('价格控制在百万以内！');
          return;
        }
        if (this.discountPrice.indexOf('.') !== -1 && this.discountPrice.substring(this.discountPrice.indexOf('.') + 1).length > 2) {
          _common2.default.tipAlert('价格小数点后最多两位！');
          return;
        }
      } else {
        _common2.default.tipAlert('折后价请输入大于0的合法数值！');
        return;
      }
      if (this.price > 0) {
        if (this.price > 1000000) {
          _common2.default.tipAlert('价格控制在百万以内！');
          return;
        }
        if (this.price.indexOf('.') !== -1 && this.price.substring(this.price.indexOf('.') + 1).length > 2) {
          _common2.default.tipAlert('价格小数点后最多两位！');
          return;
        }
      } else {
        _common2.default.tipAlert('原价请输入大于0的合法数值！');
        return;
      }
      if (!this.src) {
        _common2.default.tipAlert('请上传图片');
        return;
      }
      if (this.src !== null && this.name !== '' && this.describe !== '' && this.price !== '' && this.discountPrice !== '') {
        wx.uploadFile({
          url: this.$parent.globalData.URL + 'goods/addGoods', // 仅为示例，非真实的接口地址
          header: {
            'content-type': 'multipart/form-data',
            'sessionId': wx.getStorageSync('sessionId')
          },
          filePath: this.src,
          name: 'file',
          formData: {
            'goodsName': this.name,
            'goodsDescribe': this.describe,
            'price': this.price,
            'discountPrice': this.discountPrice
          },
          success: function success(res) {
            var data = JSON.parse(res.data);
            if (_common2.default.Interceptor(data)) {
              if (data.success === false) {
                _common2.default.tipAlert(data.message);
              } else {
                wx.redirectTo({
                  url: 'editgoods'
                });
              }
            }
          }
        });
      } else {
        _common2.default.tipAlert('请完整填写所有信息');
      }
    }
  }, {
    key: 'backP',
    value: function backP() {
      wx.redirectTo({
        url: 'editgoods'
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      this.src = option.src;
    }
  }]);

  return Addgoods;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Addgoods , 'pages/addgoods'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZGdvb2RzLmpzIl0sIm5hbWVzIjpbIkFkZGdvb2RzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInRhYmJhciIsIlRhYkJhciIsImRhdGEiLCJzZWxlY3RlZCIsInNyYyIsIklNR1VSTEVESVQiLCJuYW1lIiwiZGVzY3JpYmUiLCJwcmljZSIsImRpc2NvdW50IiwiZGlzY291bnRQcmljZSIsIlVSTCIsImUiLCJ0eXBlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsInd4Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwicmVkaXJlY3RUbyIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJjb21tb24iLCJ0aXBBbGVydCIsImxlbmd0aCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJ1cGxvYWRGaWxlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJKU09OIiwicGFyc2UiLCJJbnRlcmNlcHRvciIsIm1lc3NhZ2UiLCJvcHRpb24iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFZO0FBQ1RDLGNBQVFDO0FBREMsSyxRQUdYQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsa0JBQVksRUFI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QUosRUFBOEI7QUFDNUIsa0JBQUlBLEtBQUtvQixPQUFMLEtBQWlCLEtBQXJCLEVBQTRCO0FBQzFCTyxpQ0FBT0MsUUFBUCxDQUFnQjVCLEtBQUswQyxPQUFyQjtBQUNELGVBRkQsTUFFTztBQUNMMUIsbUJBQUdPLFVBQUgsQ0FBYztBQUNaQyx1QkFBSztBQURPLGlCQUFkO0FBR0Q7QUFDRjtBQUNGO0FBekJXLFNBQWQ7QUEyQkQsT0E1QkQsTUE0Qk87QUFDTEcseUJBQU9DLFFBQVAsQ0FBZ0IsV0FBaEI7QUFDRDtBQUNGOzs7NEJBQ1E7QUFDUFosU0FBR08sVUFBSCxDQUFjO0FBQ1pDLGFBQUs7QUFETyxPQUFkO0FBR0Q7OzsyQkFDTW1CLE0sRUFBUTtBQUNiLFdBQUtsQyxHQUFMLEdBQVcsS0FBS3dCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnpCLEdBQW5DO0FBQ0EsV0FBS04sVUFBTCxHQUFrQixLQUFLOEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCL0IsVUFBMUM7QUFDQSxXQUFLRCxHQUFMLEdBQVd5QyxPQUFPekMsR0FBbEI7QUFDRDs7OztFQTFKbUMwQyxlQUFLQyxJOztrQkFBdEJ0RCxRIiwiZmlsZSI6ImFkZGdvb2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgVGFiQmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkZ29vZHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmt7vliqDkuqflk4EnXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ0YWJiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNlbGVjdGUub25jZVwiOlwic2VsZWN0ZWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzPSB7XHJcbiAgICB0YWJiYXI6IFRhYkJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2VsZWN0ZWQ6IDIsXHJcbiAgICBzcmM6ICcnLFxyXG4gICAgSU1HVVJMRURJVDogJycsXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGRlc2NyaWJlOiAnJyxcclxuICAgIHByaWNlOiAnJyxcclxuICAgIGRpc2NvdW50OiAnJyxcclxuICAgIGRpc2NvdW50UHJpY2U6ICcnLFxyXG4gICAgVVJMOiAnJ1xyXG4gIH1cclxuICBnZXRUZXh0IChlKSB7XHJcbiAgICBsZXQgdHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICduYW1lJzpcclxuICAgICAgICB0aGlzLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ2Rlc2NyaWJlJzpcclxuICAgICAgICB0aGlzLmRlc2NyaWJlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdkaXNQcmljZSc6XHJcbiAgICAgICAgdGhpcy5kaXNjb3VudFByaWNlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc3JjKSB7XHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgY29udGVudDogJ+ivt+WFiOS4iuS8oOWbvueJhycsXHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5kZXNjcmliZSA9IHRoaXMuZGlzY291bnRQcmljZSA9IHRoaXMucHJpY2UgPSAnJ1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgLy8g5re75Yqg6YCJ5oup5Zu+54mHXHJcbiAgYWRkcGljICgpIHtcclxuICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICB1cmw6ICdhZGRnb29kc3BpYydcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8vIOWIoOmZpOi9ruaSreWbvuaTjeS9nFxyXG4gIGRlbHN3aXBlciAoKSB7XHJcbiAgICB0aGlzLnNyYyA9ICcnXHJcbiAgICAvLyB3eC5zaG93TW9kYWwoe1xyXG4gICAgLy8gICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAvLyAgIGNvbnRlbnQ6ICfnoa7lrprmiafooYzliKDpmaTmk43kvZzlkJc/JyxcclxuICAgIC8vICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuc3JjID0gJydcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICB9XHJcbiAgLy8g5L+d5a2Y5omA5pyJ5pON5L2cXHJcbiAgc2F2ZWFsbCAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5L+d5a2Y5omA5pyJJylcclxuICAgIGlmICh0aGlzLm5hbWUgPT09ICcnKSB7XHJcbiAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+36L6T5YWl5Lqn5ZOB5ZCN5a2XJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5uYW1lLmxlbmd0aCA+IDMwKSB7XHJcbiAgICAgIGNvbW1vbi50aXBBbGVydCgn5ZCN56ew5L+d5oyBMzDlrZfku6XlhoUnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRlc2NyaWJlID09PSAnJykge1xyXG4gICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpeS6p+WTgeaPj+i/sCcpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVzY3JpYmUubGVuZ3RoID4gMTAwKSB7XHJcbiAgICAgIGNvbW1vbi50aXBBbGVydCgn5Lqn5ZOB5o+P6L+w5L+d5oyBMTAw5a2X5Lul5YaFJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kaXNjb3VudFByaWNlID4gMCkge1xyXG4gICAgICBpZiAodGhpcy5kaXNjb3VudFByaWNlID4gMTAwMDAwMCkge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn5Lu35qC85o6n5Yi25Zyo55m+5LiH5Lul5YaF77yBJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5kaXNjb3VudFByaWNlLmluZGV4T2YoJy4nKSAhPT0gLTEgJiYgdGhpcy5kaXNjb3VudFByaWNlLnN1YnN0cmluZyh0aGlzLmRpc2NvdW50UHJpY2UuaW5kZXhPZignLicpICsgMSkubGVuZ3RoID4gMikge1xyXG4gICAgICAgIGNvbW1vbi50aXBBbGVydCgn5Lu35qC85bCP5pWw54K55ZCO5pyA5aSa5Lik5L2N77yBJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29tbW9uLnRpcEFsZXJ0KCfmipjlkI7ku7for7fovpPlhaXlpKfkuo4w55qE5ZCI5rOV5pWw5YC877yBJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wcmljZSA+IDApIHtcclxuICAgICAgaWYgKHRoaXMucHJpY2UgPiAxMDAwMDAwKSB7XHJcbiAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfku7fmoLzmjqfliLblnKjnmb7kuIfku6XlhoXvvIEnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnByaWNlLmluZGV4T2YoJy4nKSAhPT0gLTEgJiYgdGhpcy5wcmljZS5zdWJzdHJpbmcodGhpcy5wcmljZS5pbmRleE9mKCcuJykgKyAxKS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgY29tbW9uLnRpcEFsZXJ0KCfku7fmoLzlsI/mlbDngrnlkI7mnIDlpJrkuKTkvY3vvIEnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb21tb24udGlwQWxlcnQoJ+WOn+S7t+ivt+i+k+WFpeWkp+S6jjDnmoTlkIjms5XmlbDlgLzvvIEnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zcmMpIHtcclxuICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7fkuIrkvKDlm77niYcnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNyYyAhPT0gbnVsbCAmJiB0aGlzLm5hbWUgIT09ICcnICYmIHRoaXMuZGVzY3JpYmUgIT09ICcnICYmIHRoaXMucHJpY2UgIT09ICcnICYmIHRoaXMuZGlzY291bnRQcmljZSAhPT0gJycpIHtcclxuICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgdXJsOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkwgKyAnZ29vZHMvYWRkR29vZHMnLCAvLyDku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWxlUGF0aDogdGhpcy5zcmMsXHJcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAnZ29vZHNOYW1lJzogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgJ2dvb2RzRGVzY3JpYmUnOiB0aGlzLmRlc2NyaWJlLFxyXG4gICAgICAgICAgJ3ByaWNlJzogdGhpcy5wcmljZSxcclxuICAgICAgICAgICdkaXNjb3VudFByaWNlJzogdGhpcy5kaXNjb3VudFByaWNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXHJcbiAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgY29tbW9uLnRpcEFsZXJ0KGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2VkaXRnb29kcydcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29tbW9uLnRpcEFsZXJ0KCfor7flrozmlbTloavlhpnmiYDmnInkv6Hmga8nKVxyXG4gICAgfVxyXG4gIH1cclxuICBiYWNrUCAoKSB7XHJcbiAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgdXJsOiAnZWRpdGdvb2RzJ1xyXG4gICAgfSlcclxuICB9XHJcbiAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICAgIHRoaXMuc3JjID0gb3B0aW9uLnNyY1xyXG4gIH1cclxufVxyXG4iXX0=