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

var EditMoney = function (_wepy$page) {
  _inherits(EditMoney, _wepy$page);

  function EditMoney() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditMoney);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditMoney.__proto__ || Object.getPrototypeOf(EditMoney)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '余额修改'
    }, _this.data = {
      selected: 3,
      cardsrc: ['tongcard.png', 'yincard.png', 'goldcard.png'],
      cardLevelname: [],
      cardTypeIds: [],
      cardTypeId: '',
      cardNumber: '',
      cardNumberTS: '',
      telshow: false,
      isInputing: false,
      URL: '',
      IMGURLEDIT: '',
      score: 19,
      index: 0,
      balance: 0,
      cardId: '',
      showModal: false,
      title: '余额充值',
      radioItems: [{ name: '50', value: '0', checked: true }, { name: '100', value: '1', checked: false }, { name: '200', value: '2', checked: false }, { name: '10', value: '3', checked: false }],
      dialogType: 0
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.methods = {
      // 卡号修改
      editCardnum: function editCardnum() {
        this.isInputing = true;
        this.telshow = true;
      },

      // 取消编辑
      cancelEdit: function cancelEdit() {
        this.cardNumberTS = this.cardNumber;
        this.isInputing = false;
        this.telshow = false;
      },

      // 卡号保存
      saveCardnum: function saveCardnum() {
        var _this2 = this;

        if (!/^[a-zA-Z0-9]{6,19}$/.test(this.cardNumberTS)) {
          _common2.default.tipAlert('请输入6到19位数字字母');
          return;
        }
        this.telshow = false;
        this.URL = this.$parent.globalData.URL;
        this.cardTypeId = this.cardTypeIds[this.index];
        wx.request({
          url: this.URL + 'userManage/updateCard',
          data: {
            cardId: this.cardId,
            cardTypeId: this.cardTypeId,
            cardNumber: this.cardNumberTS,
            customerId: wx.getStorageSync('customerId'),
            type: 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'sessionId': wx.getStorageSync('sessionId')
          },
          method: 'POST',
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              _this2.list = data.result.list;
              _this2.isInputing = false;
              _this2.$apply();
              if (!data.result.success) {
                _common2.default.tipAlert('卡号已存在请重新编辑');
              }
              _this2.backData();
            }
          }
        });
      },

      // 获取卡号
      getnum: function getnum(e) {
        this.cardNumberTS = e.detail.value;
      },

      // 弹框单选框
      radioChange: function radioChange(e) {
        for (var i = 0, len = this.radioItems.length; i < len; ++i) {
          this.radioItems[i].checked = this.radioItems[i].value === e.detail.value;
        }
      },
      // 输入框值校验
      inputPrice: function inputPrice(e) {
        this.radioItems[3].name = e.detail.value;
      },

      // 触发弹框
      dialog: function dialog(type) {
        this.isInputing && (this.telshow = false);
        this.radioItems = [{ name: '50', value: '0', checked: true }, { name: '100', value: '1', checked: false }, { name: '200', value: '2', checked: false }, { name: '10', value: '3', checked: false }];
        switch (+type) {
          case 1:
            this.title = '余额充值';
            break;
          case 2:
            this.title = '余额扣费';
            break;
          case 3:
            this.title = '积分充值';
            break;
          case 4:
            this.title = '积分扣除';
            break;
        }
        this.dialogType = +type;
        this.showModal = true;
      },

      // 弹框confirm
      dialogConfirm: function dialogConfirm(type) {
        var _this3 = this;

        if (type) {
          this.showModal = false;
          this.dialogType = 0;
          this.radioItems[3].name = 10;
          this.isInputing && (this.telshow = true);
          return;
        }
        var data = {}; // 请求参数
        var num = 0; // 积分/余额区分
        var isN = 0; // 差值判断
        wx.getStorageSync('customerId') && (data['customerId'] = wx.getStorageSync('customerId'));
        this.radioItems.some(function (v) {
          return v.checked && (num = v.name);
        });
        if (this.dialogType === 1 || this.dialogType === 2) {
          if (num > 0) {
            if (num.indexOf('.') !== -1 && num.substring(num.indexOf('.') + 1).length > 2) {
              _common2.default.tipAlert('小数点后最多两位！');
              return;
            }
          } else {
            _common2.default.tipAlert('请输入大于0的合法数值！');
            return;
          }
        } else {
          if (!/^[1-9]\d*$/.test(num)) {
            _common2.default.tipAlert('请输入大于0的整数！');
            return;
          }
        }
        num = +num;
        if (this.dialogType === 1 || this.dialogType === 2) {
          data['type'] = 2; // 余额
          if (this.dialogType === 1) {
            data['operType'] = 1;
          } else {
            data['operType'] = 2;
            isN = +this.balance - num;
          }
          if (isN < 0) {
            _common2.default.tipAlert('用户余额不足');
            return;
          }
        } else {
          data['type'] = 1; // 积分
          if (this.dialogType === 3) {
            data['num'] = num;
            data['operType'] = 1;
          } else {
            isN = +this.score - num;
            data['operType'] = 2;
          }
          if (isN < 0) {
            _common2.default.tipAlert('用户积分不足');
            return;
          }
        }
        data['num'] = num;
        // 发送请求
        wx.request({
          url: this.URL + 'userManage/updateAccount',
          data: data,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            'sessionId': wx.getStorageSync('sessionId')
          },
          success: function success(res) {
            var data = res.data;
            if (_common2.default.Interceptor(data)) {
              if (res.data.success) {
                _this3.backData();
              } else {
                _common2.default.tipAlert('操作失败！');
              }
            }
          },
          fail: function fail() {
            _common2.default.tipAlert('网络错误！');
          }
        });
        this.dialogType = 0;
        this.showModal = false;
        this.isInputing && (this.telshow = true);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditMoney, [{
    key: 'onShow',
    value: function onShow() {
      var _this4 = this;

      this.URL = this.$parent.globalData.URL;
      this.IMGURLEDIT = this.$parent.globalData.IMGURLEDIT;
      this.backData();
      // 卡的等级
      wx.request({
        url: this.URL + 'userManage/cardList',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function success(res) {
          _this4.cardLevelname = [];
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            for (var i = 0; i < data.result.length; i++) {
              _this4.cardLevelname.push(data.result[i].name);
              _this4.cardTypeIds.push(data.result[i].id);
            }
            _this4.cardLevelname.reverse();
            _this4.cardTypeIds.reverse();
            _this4.$apply();
          }
        }
      });
    }
    // 卡的等级

  }, {
    key: 'chooseLevel',
    value: function chooseLevel() {}
    // 等级修改

  }, {
    key: 'bindPickerChange',
    value: function bindPickerChange(e) {
      this.index = e.detail.value;
      this.cardTypeId = this.cardTypeIds[this.index];
      wx.request({
        url: this.URL + 'userManage/updateCard',
        data: {
          cardId: this.cardId,
          cardTypeId: this.cardTypeId,
          cardNumber: this.cardNumberTS,
          customerId: wx.getStorageSync('customerId'),
          type: 2
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            if (data.success === false) {
              _common2.default.tipAlert(data.message);
            } else {
              console.log(data);
            }
          }
        }
      });
    }
  }, {
    key: 'backData',

    // 回显/刷新方法
    value: function backData() {
      var _this5 = this;

      wx.request({
        url: this.URL + 'userManage/customerInfo',
        data: {
          customerId: wx.getStorageSync('customerId')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function success(res) {
          var data = res.data;
          if (_common2.default.Interceptor(data)) {
            _this5.score = data.result.score;
            _this5.cardNumber = _this5.cardNumberTS = data.result.cardNumber;
            _this5.balance = data.result.balance;
            _this5.cardId = data.result.cardId;
            _this5.index = data.result.cardLevel - 1;
            _this5.$apply();
          }
        }
      });
    }
  }]);

  return EditMoney;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditMoney , 'pages/edit-money'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtbW9uZXkuanMiXSwibmFtZXMiOlsiRWRpdE1vbmV5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJzZWxlY3RlZCIsImNhcmRzcmMiLCJjYXJkTGV2ZWxuYW1lIiwiY2FyZFR5cGVJZHMiLCJjYXJkVHlwZUlkIiwiY2FyZE51bWJlciIsImNhcmROdW1iZXJUUyIsInRlbHNob3ciLCJpc0lucHV0aW5nIiwiVVJMIiwiSU1HVVJMRURJVCIsInNjb3JlIiwiaW5kZXgiLCJiYWxhbmNlIiwiY2FyZElkIiwic2hvd01vZGFsIiwidGl0bGUiLCJyYWRpb0l0ZW1zIiwibmFtZSIsInZhbHVlIiwiY2hlY2tlZCIsImRpYWxvZ1R5cGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ0YWJiYXIiLCJUYWJiYXIiLCJtZXRob2RzIiwiZWRpdENhcmRudW0iLCJjYW5jZWxFZGl0Iiwic2F2ZUNhcmRudW0iLCJ0ZXN0IiwiY29tbW9uIiwidGlwQWxlcnQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImN1c3RvbWVySWQiLCJnZXRTdG9yYWdlU3luYyIsInR5cGUiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiSW50ZXJjZXB0b3IiLCJsaXN0IiwicmVzdWx0IiwiJGFwcGx5IiwiYmFja0RhdGEiLCJnZXRudW0iLCJlIiwiZGV0YWlsIiwicmFkaW9DaGFuZ2UiLCJpIiwibGVuIiwibGVuZ3RoIiwiaW5wdXRQcmljZSIsImRpYWxvZyIsImRpYWxvZ0NvbmZpcm0iLCJudW0iLCJpc04iLCJzb21lIiwidiIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJmYWlsIiwicHVzaCIsImlkIiwicmV2ZXJzZSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiY2FyZExldmVsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGVBQVMsQ0FBQyxjQUFELEVBQWlCLGFBQWpCLEVBQWdDLGNBQWhDLENBRko7QUFHTEMscUJBQWUsRUFIVjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLGtCQUFZLEVBTFA7QUFNTEMsa0JBQVksRUFOUDtBQU9MQyxvQkFBYyxFQVBUO0FBUUxDLGVBQVMsS0FSSjtBQVNMQyxrQkFBWSxLQVRQO0FBVUxDLFdBQUssRUFWQTtBQVdMQyxrQkFBWSxFQVhQO0FBWUxDLGFBQU8sRUFaRjtBQWFMQyxhQUFPLENBYkY7QUFjTEMsZUFBUyxDQWRKO0FBZUxDLGNBQVEsRUFmSDtBQWdCTEMsaUJBQVcsS0FoQk47QUFpQkxDLGFBQU8sTUFqQkY7QUFrQkxDLGtCQUFZLENBQ1IsRUFBQ0MsTUFBTSxJQUFQLEVBQWFDLE9BQU8sR0FBcEIsRUFBeUJDLFNBQVMsSUFBbEMsRUFEUSxFQUVSLEVBQUNGLE1BQU0sS0FBUCxFQUFjQyxPQUFPLEdBQXJCLEVBQTBCQyxTQUFTLEtBQW5DLEVBRlEsRUFHUixFQUFDRixNQUFNLEtBQVAsRUFBY0MsT0FBTyxHQUFyQixFQUEwQkMsU0FBUyxLQUFuQyxFQUhRLEVBSVIsRUFBQ0YsTUFBTSxJQUFQLEVBQWFDLE9BQU8sR0FBcEIsRUFBeUJDLFNBQVMsS0FBbEMsRUFKUSxDQWxCUDtBQXdCTEMsa0JBQVk7QUF4QlAsSyxRQTBCUkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixVQUF6QyxFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDLGNBQVFDO0FBREEsSyxRQStEVkMsTyxHQUFVO0FBQ1I7QUFDQUMsaUJBRlEseUJBRU87QUFDYixhQUFLckIsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUtELE9BQUwsR0FBZSxJQUFmO0FBQ0QsT0FMTzs7QUFNUjtBQUNBdUIsZ0JBUFEsd0JBT007QUFDWixhQUFLeEIsWUFBTCxHQUFvQixLQUFLRCxVQUF6QjtBQUNBLGFBQUtHLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxhQUFLRCxPQUFMLEdBQWUsS0FBZjtBQUNELE9BWE87O0FBWVI7QUFDQXdCLGlCQWJRLHlCQWFPO0FBQUE7O0FBQ2IsWUFBSSxDQUFDLHNCQUFzQkMsSUFBdEIsQ0FBMkIsS0FBSzFCLFlBQWhDLENBQUwsRUFBb0Q7QUFDbEQyQiwyQkFBT0MsUUFBUCxDQUFnQixjQUFoQjtBQUNBO0FBQ0Q7QUFDRCxhQUFLM0IsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLRSxHQUFMLEdBQVcsS0FBSzBCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjNCLEdBQW5DO0FBQ0EsYUFBS0wsVUFBTCxHQUFrQixLQUFLRCxXQUFMLENBQWlCLEtBQUtTLEtBQXRCLENBQWxCO0FBQ0F5QixXQUFHQyxPQUFILENBQVc7QUFDVEMsZUFBSyxLQUFLOUIsR0FBTCxHQUFXLHVCQURQO0FBRVRWLGdCQUFNO0FBQ0plLG9CQUFRLEtBQUtBLE1BRFQ7QUFFSlYsd0JBQVksS0FBS0EsVUFGYjtBQUdKQyx3QkFBWSxLQUFLQyxZQUhiO0FBSUprQyx3QkFBWUgsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQUpSO0FBS0pDLGtCQUFNO0FBTEYsV0FGRztBQVNUQyxrQkFBUTtBQUNOLDRCQUFnQixpREFEVjtBQUVOLHlCQUFhTixHQUFHSSxjQUFILENBQWtCLFdBQWxCO0FBRlAsV0FUQztBQWFURyxrQkFBUSxNQWJDO0FBY1RDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUkvQyxPQUFPK0MsSUFBSS9DLElBQWY7QUFDQSxnQkFBSWtDLGlCQUFPYyxXQUFQLENBQW1CaEQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixxQkFBS2lELElBQUwsR0FBWWpELEtBQUtrRCxNQUFMLENBQVlELElBQXhCO0FBQ0EscUJBQUt4QyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EscUJBQUswQyxNQUFMO0FBQ0Esa0JBQUksQ0FBQ25ELEtBQUtrRCxNQUFMLENBQVlKLE9BQWpCLEVBQTBCO0FBQ3hCWixpQ0FBT0MsUUFBUCxDQUFnQixZQUFoQjtBQUNEO0FBQ0QscUJBQUtpQixRQUFMO0FBQ0Q7QUFDRjtBQXpCUSxTQUFYO0FBMkJELE9BaERPOztBQWlEUjtBQUNBQyxZQWxEUSxrQkFrREFDLENBbERBLEVBa0RHO0FBQ1QsYUFBSy9DLFlBQUwsR0FBb0IrQyxFQUFFQyxNQUFGLENBQVNuQyxLQUE3QjtBQUNELE9BcERPOztBQXFEUjtBQUNBb0MsbUJBQWEscUJBQVVGLENBQVYsRUFBYTtBQUN4QixhQUFLLElBQUlHLElBQUksQ0FBUixFQUFXQyxNQUFNLEtBQUt4QyxVQUFMLENBQWdCeUMsTUFBdEMsRUFBOENGLElBQUlDLEdBQWxELEVBQXVELEVBQUVELENBQXpELEVBQTREO0FBQzFELGVBQUt2QyxVQUFMLENBQWdCdUMsQ0FBaEIsRUFBbUJwQyxPQUFuQixHQUE2QixLQUFLSCxVQUFMLENBQWdCdUMsQ0FBaEIsRUFBbUJyQyxLQUFuQixLQUE2QmtDLEVBQUVDLE1BQUYsQ0FBU25DLEtBQW5FO0FBQ0Q7QUFDRixPQTFETztBQTJEUjtBQUNBd0MsZ0JBNURRLHNCQTRESU4sQ0E1REosRUE0RE87QUFDYixhQUFLcEMsVUFBTCxDQUFnQixDQUFoQixFQUFtQkMsSUFBbkIsR0FBMEJtQyxFQUFFQyxNQUFGLENBQVNuQyxLQUFuQztBQUNELE9BOURPOztBQStEUjtBQUNBeUMsWUFoRVEsa0JBZ0VBbEIsSUFoRUEsRUFnRU07QUFDWixhQUFLbEMsVUFBTCxLQUFvQixLQUFLRCxPQUFMLEdBQWUsS0FBbkM7QUFDQSxhQUFLVSxVQUFMLEdBQWtCLENBQ2hCLEVBQUNDLE1BQU0sSUFBUCxFQUFhQyxPQUFPLEdBQXBCLEVBQXlCQyxTQUFTLElBQWxDLEVBRGdCLEVBRWhCLEVBQUNGLE1BQU0sS0FBUCxFQUFjQyxPQUFPLEdBQXJCLEVBQTBCQyxTQUFTLEtBQW5DLEVBRmdCLEVBR2hCLEVBQUNGLE1BQU0sS0FBUCxFQUFjQyxPQUFPLEdBQXJCLEVBQTBCQyxTQUFTLEtBQW5DLEVBSGdCLEVBSWhCLEVBQUNGLE1BQU0sSUFBUCxFQUFhQyxPQUFPLEdBQXBCLEVBQXlCQyxTQUFTLEtBQWxDLEVBSmdCLENBQWxCO0FBTUEsZ0JBQVEsQ0FBQ3NCLElBQVQ7QUFDRSxlQUFLLENBQUw7QUFDRSxpQkFBSzFCLEtBQUwsR0FBYSxNQUFiO0FBQ0E7QUFDRixlQUFLLENBQUw7QUFDRSxpQkFBS0EsS0FBTCxHQUFhLE1BQWI7QUFDQTtBQUNGLGVBQUssQ0FBTDtBQUNFLGlCQUFLQSxLQUFMLEdBQWEsTUFBYjtBQUNBO0FBQ0YsZUFBSyxDQUFMO0FBQ0UsaUJBQUtBLEtBQUwsR0FBYSxNQUFiO0FBQ0E7QUFaSjtBQWNBLGFBQUtLLFVBQUwsR0FBa0IsQ0FBQ3FCLElBQW5CO0FBQ0EsYUFBSzNCLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxPQXhGTzs7QUF5RlI7QUFDQThDLG1CQTFGUSx5QkEwRk9uQixJQTFGUCxFQTBGYTtBQUFBOztBQUNuQixZQUFJQSxJQUFKLEVBQVU7QUFDUixlQUFLM0IsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUtNLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxlQUFLSixVQUFMLENBQWdCLENBQWhCLEVBQW1CQyxJQUFuQixHQUEwQixFQUExQjtBQUNBLGVBQUtWLFVBQUwsS0FBb0IsS0FBS0QsT0FBTCxHQUFlLElBQW5DO0FBQ0E7QUFDRDtBQUNELFlBQUlSLE9BQU8sRUFBWCxDQVJtQixDQVFMO0FBQ2QsWUFBSStELE1BQU0sQ0FBVixDQVRtQixDQVNQO0FBQ1osWUFBSUMsTUFBTSxDQUFWLENBVm1CLENBVVA7QUFDWjFCLFdBQUdJLGNBQUgsQ0FBa0IsWUFBbEIsTUFBb0MxQyxLQUFLLFlBQUwsSUFBcUJzQyxHQUFHSSxjQUFILENBQWtCLFlBQWxCLENBQXpEO0FBQ0EsYUFBS3hCLFVBQUwsQ0FBZ0IrQyxJQUFoQixDQUFxQjtBQUFBLGlCQUFLQyxFQUFFN0MsT0FBRixLQUFjMEMsTUFBTUcsRUFBRS9DLElBQXRCLENBQUw7QUFBQSxTQUFyQjtBQUNBLFlBQUksS0FBS0csVUFBTCxLQUFvQixDQUFwQixJQUF5QixLQUFLQSxVQUFMLEtBQW9CLENBQWpELEVBQW9EO0FBQ2xELGNBQUl5QyxNQUFNLENBQVYsRUFBYTtBQUNYLGdCQUFJQSxJQUFJSSxPQUFKLENBQVksR0FBWixNQUFxQixDQUFDLENBQXRCLElBQTJCSixJQUFJSyxTQUFKLENBQWNMLElBQUlJLE9BQUosQ0FBWSxHQUFaLElBQW1CLENBQWpDLEVBQW9DUixNQUFwQyxHQUE2QyxDQUE1RSxFQUErRTtBQUM3RXpCLCtCQUFPQyxRQUFQLENBQWdCLFdBQWhCO0FBQ0E7QUFDRDtBQUNGLFdBTEQsTUFLTztBQUNMRCw2QkFBT0MsUUFBUCxDQUFnQixjQUFoQjtBQUNBO0FBQ0Q7QUFDRixTQVZELE1BVU87QUFDTCxjQUFJLENBQUMsYUFBYUYsSUFBYixDQUFrQjhCLEdBQWxCLENBQUwsRUFBNkI7QUFDM0I3Qiw2QkFBT0MsUUFBUCxDQUFnQixZQUFoQjtBQUNBO0FBQ0Q7QUFDRjtBQUNENEIsY0FBTSxDQUFDQSxHQUFQO0FBQ0EsWUFBSSxLQUFLekMsVUFBTCxLQUFvQixDQUFwQixJQUF5QixLQUFLQSxVQUFMLEtBQW9CLENBQWpELEVBQW9EO0FBQ2xEdEIsZUFBSyxNQUFMLElBQWUsQ0FBZixDQURrRCxDQUNsQztBQUNoQixjQUFJLEtBQUtzQixVQUFMLEtBQW9CLENBQXhCLEVBQTJCO0FBQ3pCdEIsaUJBQUssVUFBTCxJQUFtQixDQUFuQjtBQUNELFdBRkQsTUFFTztBQUNMQSxpQkFBSyxVQUFMLElBQW1CLENBQW5CO0FBQ0FnRSxrQkFBTSxDQUFDLEtBQUtsRCxPQUFOLEdBQWdCaUQsR0FBdEI7QUFDRDtBQUNELGNBQUlDLE1BQU0sQ0FBVixFQUFhO0FBQ1g5Qiw2QkFBT0MsUUFBUCxDQUFnQixRQUFoQjtBQUNBO0FBQ0Q7QUFDRixTQVpELE1BWU87QUFDTG5DLGVBQUssTUFBTCxJQUFlLENBQWYsQ0FESyxDQUNXO0FBQ2hCLGNBQUksS0FBS3NCLFVBQUwsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekJ0QixpQkFBSyxLQUFMLElBQWMrRCxHQUFkO0FBQ0EvRCxpQkFBSyxVQUFMLElBQW1CLENBQW5CO0FBQ0QsV0FIRCxNQUdPO0FBQ0xnRSxrQkFBTSxDQUFDLEtBQUtwRCxLQUFOLEdBQWNtRCxHQUFwQjtBQUNBL0QsaUJBQUssVUFBTCxJQUFtQixDQUFuQjtBQUNEO0FBQ0QsY0FBSWdFLE1BQU0sQ0FBVixFQUFhO0FBQ1g5Qiw2QkFBT0MsUUFBUCxDQUFnQixRQUFoQjtBQUNBO0FBQ0Q7QUFDRjtBQUNEbkMsYUFBSyxLQUFMLElBQWMrRCxHQUFkO0FBQ0E7QUFDQXpCLFdBQUdDLE9BQUgsQ0FBVztBQUNUQyxlQUFLLEtBQUs5QixHQUFMLEdBQVcsMEJBRFA7QUFFVFYsb0JBRlM7QUFHVDZDLGtCQUFRLE1BSEM7QUFJVEQsa0JBQVE7QUFDTiw0QkFBZ0IsaURBRFYsRUFDNkQ7QUFDbkUseUJBQWFOLEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxXQUpDO0FBUVRJLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUkvQyxPQUFPK0MsSUFBSS9DLElBQWY7QUFDQSxnQkFBSWtDLGlCQUFPYyxXQUFQLENBQW1CaEQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixrQkFBSStDLElBQUkvQyxJQUFKLENBQVM4QyxPQUFiLEVBQXNCO0FBQ3BCLHVCQUFLTSxRQUFMO0FBQ0QsZUFGRCxNQUVPO0FBQ0xsQixpQ0FBT0MsUUFBUCxDQUFnQixPQUFoQjtBQUNEO0FBQ0Y7QUFDRixXQWpCUTtBQWtCVGtDLGdCQUFNLGdCQUFNO0FBQ1ZuQyw2QkFBT0MsUUFBUCxDQUFnQixPQUFoQjtBQUNEO0FBcEJRLFNBQVg7QUFzQkEsYUFBS2IsVUFBTCxHQUFrQixDQUFsQjtBQUNBLGFBQUtOLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLUCxVQUFMLEtBQW9CLEtBQUtELE9BQUwsR0FBZSxJQUFuQztBQUNEO0FBN0tPLEs7Ozs7OzZCQTVEQTtBQUFBOztBQUNSLFdBQUtFLEdBQUwsR0FBVyxLQUFLMEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsR0FBbkM7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQUt5QixPQUFMLENBQWFDLFVBQWIsQ0FBd0IxQixVQUExQztBQUNBLFdBQUt5QyxRQUFMO0FBQ0E7QUFDQWQsU0FBR0MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssS0FBSzlCLEdBQUwsR0FBVyxxQkFEUDtBQUVUa0MsZ0JBQVE7QUFDTiwwQkFBZ0IsaURBRFY7QUFFTix1QkFBYU4sR0FBR0ksY0FBSCxDQUFrQixXQUFsQjtBQUZQLFNBRkM7QUFNVEcsZ0JBQVEsTUFOQztBQU9UQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGlCQUFLNUMsYUFBTCxHQUFxQixFQUFyQjtBQUNBLGNBQUlILE9BQU8rQyxJQUFJL0MsSUFBZjtBQUNBLGNBQUlrQyxpQkFBT2MsV0FBUCxDQUFtQmhELElBQW5CLENBQUosRUFBOEI7QUFDNUIsaUJBQUssSUFBSXlELElBQUksQ0FBYixFQUFnQkEsSUFBSXpELEtBQUtrRCxNQUFMLENBQVlTLE1BQWhDLEVBQXdDRixHQUF4QyxFQUE2QztBQUMzQyxxQkFBS3RELGFBQUwsQ0FBbUJtRSxJQUFuQixDQUF3QnRFLEtBQUtrRCxNQUFMLENBQVlPLENBQVosRUFBZXRDLElBQXZDO0FBQ0EscUJBQUtmLFdBQUwsQ0FBaUJrRSxJQUFqQixDQUFzQnRFLEtBQUtrRCxNQUFMLENBQVlPLENBQVosRUFBZWMsRUFBckM7QUFDRDtBQUNELG1CQUFLcEUsYUFBTCxDQUFtQnFFLE9BQW5CO0FBQ0EsbUJBQUtwRSxXQUFMLENBQWlCb0UsT0FBakI7QUFDQSxtQkFBS3JCLE1BQUw7QUFDRDtBQUNGO0FBbkJRLE9BQVg7QUFxQkQ7QUFDRDs7OztrQ0FDZSxDQUNkO0FBQ0Q7Ozs7cUNBQ2tCRyxDLEVBQUc7QUFDbkIsV0FBS3pDLEtBQUwsR0FBYXlDLEVBQUVDLE1BQUYsQ0FBU25DLEtBQXRCO0FBQ0EsV0FBS2YsVUFBTCxHQUFrQixLQUFLRCxXQUFMLENBQWlCLEtBQUtTLEtBQXRCLENBQWxCO0FBQ0F5QixTQUFHQyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLOUIsR0FBTCxHQUFXLHVCQURQO0FBRVRWLGNBQU07QUFDSmUsa0JBQVEsS0FBS0EsTUFEVDtBQUVKVixzQkFBWSxLQUFLQSxVQUZiO0FBR0pDLHNCQUFZLEtBQUtDLFlBSGI7QUFJSmtDLHNCQUFZSCxHQUFHSSxjQUFILENBQWtCLFlBQWxCLENBSlI7QUFLSkMsZ0JBQU07QUFMRixTQUZHO0FBU1RDLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFOLEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQVRDO0FBYVRHLGdCQUFRLE1BYkM7QUFjVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJL0MsT0FBTytDLElBQUkvQyxJQUFmO0FBQ0EsY0FBSWtDLGlCQUFPYyxXQUFQLENBQW1CaEQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixnQkFBSUEsS0FBSzhDLE9BQUwsS0FBaUIsS0FBckIsRUFBNEI7QUFDMUJaLCtCQUFPQyxRQUFQLENBQWdCbkMsS0FBS3lFLE9BQXJCO0FBQ0QsYUFGRCxNQUVPO0FBQ0xDLHNCQUFRQyxHQUFSLENBQVkzRSxJQUFaO0FBQ0Q7QUFDRjtBQUNGO0FBdkJRLE9BQVg7QUF5QkQ7Ozs7QUFnTEQ7K0JBQ1k7QUFBQTs7QUFDVnNDLFNBQUdDLE9BQUgsQ0FBVztBQUNUQyxhQUFLLEtBQUs5QixHQUFMLEdBQVcseUJBRFA7QUFFVFYsY0FBTTtBQUNKeUMsc0JBQVlILEdBQUdJLGNBQUgsQ0FBa0IsWUFBbEI7QUFEUixTQUZHO0FBS1RFLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFOLEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEI7QUFGUCxTQUxDO0FBU1RHLGdCQUFRLE1BVEM7QUFVVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJL0MsT0FBTytDLElBQUkvQyxJQUFmO0FBQ0EsY0FBSWtDLGlCQUFPYyxXQUFQLENBQW1CaEQsSUFBbkIsQ0FBSixFQUE4QjtBQUM1QixtQkFBS1ksS0FBTCxHQUFhWixLQUFLa0QsTUFBTCxDQUFZdEMsS0FBekI7QUFDQSxtQkFBS04sVUFBTCxHQUFrQixPQUFLQyxZQUFMLEdBQW9CUCxLQUFLa0QsTUFBTCxDQUFZNUMsVUFBbEQ7QUFDQSxtQkFBS1EsT0FBTCxHQUFlZCxLQUFLa0QsTUFBTCxDQUFZcEMsT0FBM0I7QUFDQSxtQkFBS0MsTUFBTCxHQUFjZixLQUFLa0QsTUFBTCxDQUFZbkMsTUFBMUI7QUFDQSxtQkFBS0YsS0FBTCxHQUFhYixLQUFLa0QsTUFBTCxDQUFZMEIsU0FBWixHQUF3QixDQUFyQztBQUNBLG1CQUFLekIsTUFBTDtBQUNEO0FBQ0Y7QUFwQlEsT0FBWDtBQXNCRDs7OztFQXZTb0MwQixlQUFLQyxJOztrQkFBdkJqRixTIiwiZmlsZSI6ImVkaXQtbW9uZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBUYWJiYXIgZnJvbSAnLi4vY29tcG9udGVudHMvdGFiYmFyJ1xyXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRNb25leSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvZnpop3kv67mlLknXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzZWxlY3RlZDogMyxcclxuICAgICAgY2FyZHNyYzogWyd0b25nY2FyZC5wbmcnLCAneWluY2FyZC5wbmcnLCAnZ29sZGNhcmQucG5nJ10sXHJcbiAgICAgIGNhcmRMZXZlbG5hbWU6IFtdLFxyXG4gICAgICBjYXJkVHlwZUlkczogW10sXHJcbiAgICAgIGNhcmRUeXBlSWQ6ICcnLFxyXG4gICAgICBjYXJkTnVtYmVyOiAnJyxcclxuICAgICAgY2FyZE51bWJlclRTOiAnJyxcclxuICAgICAgdGVsc2hvdzogZmFsc2UsXHJcbiAgICAgIGlzSW5wdXRpbmc6IGZhbHNlLFxyXG4gICAgICBVUkw6ICcnLFxyXG4gICAgICBJTUdVUkxFRElUOiAnJyxcclxuICAgICAgc2NvcmU6IDE5LFxyXG4gICAgICBpbmRleDogMCxcclxuICAgICAgYmFsYW5jZTogMCxcclxuICAgICAgY2FyZElkOiAnJyxcclxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcclxuICAgICAgdGl0bGU6ICfkvZnpop3lhYXlgLwnLFxyXG4gICAgICByYWRpb0l0ZW1zOiBbXHJcbiAgICAgICAgICB7bmFtZTogJzUwJywgdmFsdWU6ICcwJywgY2hlY2tlZDogdHJ1ZX0sXHJcbiAgICAgICAgICB7bmFtZTogJzEwMCcsIHZhbHVlOiAnMScsIGNoZWNrZWQ6IGZhbHNlfSxcclxuICAgICAgICAgIHtuYW1lOiAnMjAwJywgdmFsdWU6ICcyJywgY2hlY2tlZDogZmFsc2V9LFxyXG4gICAgICAgICAge25hbWU6ICcxMCcsIHZhbHVlOiAnMycsIGNoZWNrZWQ6IGZhbHNlfVxyXG4gICAgICBdLFxyXG4gICAgICBkaWFsb2dUeXBlOiAwXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widGFiYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzZWxlY3RlLm9uY2VcIjpcInNlbGVjdGVkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgdGFiYmFyOiBUYWJiYXJcclxuICAgIH1cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgIHRoaXMuVVJMID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuVVJMXHJcbiAgICAgIHRoaXMuSU1HVVJMRURJVCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLklNR1VSTEVESVRcclxuICAgICAgdGhpcy5iYWNrRGF0YSgpXHJcbiAgICAgIC8vIOWNoeeahOetiee6p1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ3VzZXJNYW5hZ2UvY2FyZExpc3QnLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnc2Vzc2lvbklkJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcmRMZXZlbG5hbWUgPSBbXVxyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jYXJkTGV2ZWxuYW1lLnB1c2goZGF0YS5yZXN1bHRbaV0ubmFtZSlcclxuICAgICAgICAgICAgICB0aGlzLmNhcmRUeXBlSWRzLnB1c2goZGF0YS5yZXN1bHRbaV0uaWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYXJkTGV2ZWxuYW1lLnJldmVyc2UoKVxyXG4gICAgICAgICAgICB0aGlzLmNhcmRUeXBlSWRzLnJldmVyc2UoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Y2h55qE562J57qnXHJcbiAgICBjaG9vc2VMZXZlbCAoKSB7XHJcbiAgICB9XHJcbiAgICAvLyDnrYnnuqfkv67mlLlcclxuICAgIGJpbmRQaWNrZXJDaGFuZ2UgKGUpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuY2FyZFR5cGVJZCA9IHRoaXMuY2FyZFR5cGVJZHNbdGhpcy5pbmRleF1cclxuICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLlVSTCArICd1c2VyTWFuYWdlL3VwZGF0ZUNhcmQnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNhcmRJZDogdGhpcy5jYXJkSWQsXHJcbiAgICAgICAgICBjYXJkVHlwZUlkOiB0aGlzLmNhcmRUeXBlSWQsXHJcbiAgICAgICAgICBjYXJkTnVtYmVyOiB0aGlzLmNhcmROdW1iZXJUUyxcclxuICAgICAgICAgIGN1c3RvbWVySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjdXN0b21lcklkJyksXHJcbiAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydChkYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIC8vIOWNoeWPt+S/ruaUuVxyXG4gICAgICBlZGl0Q2FyZG51bSAoKSB7XHJcbiAgICAgICAgdGhpcy5pc0lucHV0aW5nID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGVsc2hvdyA9IHRydWVcclxuICAgICAgfSxcclxuICAgICAgLy8g5Y+W5raI57yW6L6RXHJcbiAgICAgIGNhbmNlbEVkaXQgKCkge1xyXG4gICAgICAgIHRoaXMuY2FyZE51bWJlclRTID0gdGhpcy5jYXJkTnVtYmVyXHJcbiAgICAgICAgdGhpcy5pc0lucHV0aW5nID0gZmFsc2VcclxuICAgICAgICB0aGlzLnRlbHNob3cgPSBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICAvLyDljaHlj7fkv53lrZhcclxuICAgICAgc2F2ZUNhcmRudW0gKCkge1xyXG4gICAgICAgIGlmICghL15bYS16QS1aMC05XXs2LDE5fSQvLnRlc3QodGhpcy5jYXJkTnVtYmVyVFMpKSB7XHJcbiAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+ivt+i+k+WFpTbliLAxOeS9jeaVsOWtl+Wtl+avjScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZWxzaG93ID0gZmFsc2VcclxuICAgICAgICB0aGlzLlVSTCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLlVSTFxyXG4gICAgICAgIHRoaXMuY2FyZFR5cGVJZCA9IHRoaXMuY2FyZFR5cGVJZHNbdGhpcy5pbmRleF1cclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogdGhpcy5VUkwgKyAndXNlck1hbmFnZS91cGRhdGVDYXJkJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgY2FyZElkOiB0aGlzLmNhcmRJZCxcclxuICAgICAgICAgICAgY2FyZFR5cGVJZDogdGhpcy5jYXJkVHlwZUlkLFxyXG4gICAgICAgICAgICBjYXJkTnVtYmVyOiB0aGlzLmNhcmROdW1iZXJUUyxcclxuICAgICAgICAgICAgY3VzdG9tZXJJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ2N1c3RvbWVySWQnKSxcclxuICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIGlmIChjb21tb24uSW50ZXJjZXB0b3IoZGF0YSkpIHtcclxuICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhLnJlc3VsdC5saXN0XHJcbiAgICAgICAgICAgICAgdGhpcy5pc0lucHV0aW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgaWYgKCFkYXRhLnJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+WNoeWPt+W3suWtmOWcqOivt+mHjeaWsOe8lui+kScpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuYmFja0RhdGEoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgLy8g6I635Y+W5Y2h5Y+3XHJcbiAgICAgIGdldG51bSAoZSkge1xyXG4gICAgICAgIHRoaXMuY2FyZE51bWJlclRTID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSxcclxuICAgICAgLy8g5by55qGG5Y2V6YCJ5qGGXHJcbiAgICAgIHJhZGlvQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnJhZGlvSXRlbXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgIHRoaXMucmFkaW9JdGVtc1tpXS5jaGVja2VkID0gdGhpcy5yYWRpb0l0ZW1zW2ldLnZhbHVlID09PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgLy8g6L6T5YWl5qGG5YC85qCh6aqMXHJcbiAgICAgIGlucHV0UHJpY2UgKGUpIHtcclxuICAgICAgICB0aGlzLnJhZGlvSXRlbXNbM10ubmFtZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOinpuWPkeW8ueahhlxyXG4gICAgICBkaWFsb2cgKHR5cGUpIHtcclxuICAgICAgICB0aGlzLmlzSW5wdXRpbmcgJiYgKHRoaXMudGVsc2hvdyA9IGZhbHNlKVxyXG4gICAgICAgIHRoaXMucmFkaW9JdGVtcyA9IFtcclxuICAgICAgICAgIHtuYW1lOiAnNTAnLCB2YWx1ZTogJzAnLCBjaGVja2VkOiB0cnVlfSxcclxuICAgICAgICAgIHtuYW1lOiAnMTAwJywgdmFsdWU6ICcxJywgY2hlY2tlZDogZmFsc2V9LFxyXG4gICAgICAgICAge25hbWU6ICcyMDAnLCB2YWx1ZTogJzInLCBjaGVja2VkOiBmYWxzZX0sXHJcbiAgICAgICAgICB7bmFtZTogJzEwJywgdmFsdWU6ICczJywgY2hlY2tlZDogZmFsc2V9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHN3aXRjaCAoK3R5cGUpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9ICfkvZnpop3lhYXlgLwnXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSAn5L2Z6aKd5omj6LS5J1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gJ+enr+WIhuWFheWAvCdcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9ICfnp6/liIbmiaPpmaQnXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlhbG9nVHlwZSA9ICt0eXBlXHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOW8ueahhmNvbmZpcm1cclxuICAgICAgZGlhbG9nQ29uZmlybSAodHlwZSkge1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLmRpYWxvZ1R5cGUgPSAwXHJcbiAgICAgICAgICB0aGlzLnJhZGlvSXRlbXNbM10ubmFtZSA9IDEwXHJcbiAgICAgICAgICB0aGlzLmlzSW5wdXRpbmcgJiYgKHRoaXMudGVsc2hvdyA9IHRydWUpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fSAvLyDor7fmsYLlj4LmlbBcclxuICAgICAgICBsZXQgbnVtID0gMCAvLyDnp6/liIYv5L2Z6aKd5Yy65YiGXHJcbiAgICAgICAgbGV0IGlzTiA9IDAgLy8g5beu5YC85Yik5patXHJcbiAgICAgICAgd3guZ2V0U3RvcmFnZVN5bmMoJ2N1c3RvbWVySWQnKSAmJiAoZGF0YVsnY3VzdG9tZXJJZCddID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2N1c3RvbWVySWQnKSlcclxuICAgICAgICB0aGlzLnJhZGlvSXRlbXMuc29tZSh2ID0+IHYuY2hlY2tlZCAmJiAobnVtID0gdi5uYW1lKSlcclxuICAgICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSAxIHx8IHRoaXMuZGlhbG9nVHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgaWYgKG51bSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKG51bS5pbmRleE9mKCcuJykgIT09IC0xICYmIG51bS5zdWJzdHJpbmcobnVtLmluZGV4T2YoJy4nKSArIDEpLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+Wwj+aVsOeCueWQjuacgOWkmuS4pOS9je+8gScpXHJcbiAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+36L6T5YWl5aSn5LqOMOeahOWQiOazleaVsOWAvO+8gScpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIS9eWzEtOV1cXGQqJC8udGVzdChudW0pKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn6K+36L6T5YWl5aSn5LqOMOeahOaVtOaVsO+8gScpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBudW0gPSArbnVtXHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gMSB8fCB0aGlzLmRpYWxvZ1R5cGUgPT09IDIpIHtcclxuICAgICAgICAgIGRhdGFbJ3R5cGUnXSA9IDIvLyDkvZnpop1cclxuICAgICAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgZGF0YVsnb3BlclR5cGUnXSA9IDFcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGFbJ29wZXJUeXBlJ10gPSAyXHJcbiAgICAgICAgICAgIGlzTiA9ICt0aGlzLmJhbGFuY2UgLSBudW1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChpc04gPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi50aXBBbGVydCgn55So5oi35L2Z6aKd5LiN6LazJylcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGFbJ3R5cGUnXSA9IDEvLyDnp6/liIZcclxuICAgICAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgZGF0YVsnbnVtJ10gPSBudW1cclxuICAgICAgICAgICAgZGF0YVsnb3BlclR5cGUnXSA9IDFcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlzTiA9ICt0aGlzLnNjb3JlIC0gbnVtXHJcbiAgICAgICAgICAgIGRhdGFbJ29wZXJUeXBlJ10gPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaXNOIDwgMCkge1xyXG4gICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+eUqOaIt+enr+WIhuS4jei2sycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhWydudW0nXSA9IG51bVxyXG4gICAgICAgIC8vIOWPkemAgeivt+axglxyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiB0aGlzLlVSTCArICd1c2VyTWFuYWdlL3VwZGF0ZUFjY291bnQnLFxyXG4gICAgICAgICAgZGF0YSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCAvLyDpu5jorqTlgLxcclxuICAgICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgICBpZiAoY29tbW9uLkludGVyY2VwdG9yKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0RhdGEoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+aTjeS9nOWksei0pe+8gScpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21tb24udGlwQWxlcnQoJ+e9kee7nOmUmeivr++8gScpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmRpYWxvZ1R5cGUgPSAwXHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaXNJbnB1dGluZyAmJiAodGhpcy50ZWxzaG93ID0gdHJ1ZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5Zue5pi+L+WIt+aWsOaWueazlVxyXG4gICAgYmFja0RhdGEgKCkge1xyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuVVJMICsgJ3VzZXJNYW5hZ2UvY3VzdG9tZXJJbmZvJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjdXN0b21lcklkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VzdG9tZXJJZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgaWYgKGNvbW1vbi5JbnRlcmNlcHRvcihkYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gZGF0YS5yZXN1bHQuc2NvcmVcclxuICAgICAgICAgICAgdGhpcy5jYXJkTnVtYmVyID0gdGhpcy5jYXJkTnVtYmVyVFMgPSBkYXRhLnJlc3VsdC5jYXJkTnVtYmVyXHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSA9IGRhdGEucmVzdWx0LmJhbGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jYXJkSWQgPSBkYXRhLnJlc3VsdC5jYXJkSWRcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGRhdGEucmVzdWx0LmNhcmRMZXZlbCAtIDFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==