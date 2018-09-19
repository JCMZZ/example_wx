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

var Editmsg = function (_wepy$page) {
  _inherits(Editmsg, _wepy$page);

  function Editmsg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Editmsg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editmsg.__proto__ || Object.getPrototypeOf(Editmsg)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑短信内容'
    }, _this.$repeat = {}, _this.$props = { "tabbar": { "xmlns:v-bind": "", "v-bind:selecte.once": "selected" } }, _this.$events = {}, _this.components = {
      tabbar: _tabbar2.default
    }, _this.data = {
      show: true,
      selected: 3,
      disabled: 'true',
      msgclass: '',
      URL: '',
      msgvalue: '为庆祝阿里巴巴成立14周年，多重好礼强势来袭，各位还在观望的老板们还等什么，现加入既有可能获得1、网销宝两百元现金，产品无限曝光；2、爆款实验室，轻松找到最优产品；3网商宝典-生意经，新增客户独享，优品库免费展示'
      // 编辑
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Editmsg, [{
    key: 'edit',
    value: function edit() {
      console.log('编辑');
      this.show = false;
    }
    // 取消

  }, {
    key: 'cancel',
    value: function cancel() {
      console.log('取消');
      this.show = true;
    }
    // 保存

  }, {
    key: 'save',
    value: function save(e) {
      console.log(e.detail.value);
      this.show = true;
      this.msgvalue = e.detail.value;
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // 获取全局变量
      this.URL = this.$parent.globalData.URL;
    }
  }, {
    key: 'handlemsg',
    value: function handlemsg() {
      // 获取缓存数据
      var sessionId = wx.getStorageSync('sessionId');
      var serviceId = wx.getStorageSync('serviceId');
      wx.request({
        url: this.URL + '/businessestore/service/batch',
        data: {
          serviceId: serviceId,
          content: this.msgvalue
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'sessionId': sessionId
        },
        method: 'POST',
        success: function success(res) {
          console.log(res.data);
        }
      });
    }
  }]);

  return Editmsg;
}(_wepy2.default.page);

exports.default = Editmsg;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGZlZGl0bXNnLmpzIl0sIm5hbWVzIjpbIkVkaXRtc2ciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidGFiYmFyIiwiVGFiYmFyIiwiZGF0YSIsInNob3ciLCJzZWxlY3RlZCIsImRpc2FibGVkIiwibXNnY2xhc3MiLCJVUkwiLCJtc2d2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlc3Npb25JZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXJ2aWNlSWQiLCJyZXF1ZXN0IiwidXJsIiwiY29udGVudCIsImhlYWRlciIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsVUFBekMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxjQUFRQztBQURFLEssUUFHWkMsSSxHQUFPO0FBQ0xDLFlBQU0sSUFERDtBQUVMQyxnQkFBVSxDQUZMO0FBR0xDLGdCQUFVLE1BSEw7QUFJTEMsZ0JBQVUsRUFKTDtBQUtMQyxXQUFLLEVBTEE7QUFNTEMsZ0JBQVU7QUFFWjtBQVJPLEs7Ozs7OzJCQVNDO0FBQ05DLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsV0FBS1AsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNEOzs7OzZCQUNVO0FBQ1JNLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsV0FBS1AsSUFBTCxHQUFZLElBQVo7QUFDRDtBQUNEOzs7O3lCQUNNUSxDLEVBQUc7QUFDUEYsY0FBUUMsR0FBUixDQUFZQyxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsV0FBS1YsSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLSyxRQUFMLEdBQWdCRyxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0Q7Ozs2QkFDUztBQUNSO0FBQ0EsV0FBS04sR0FBTCxHQUFXLEtBQUtPLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlIsR0FBbkM7QUFDRDs7O2dDQUNZO0FBQ1g7QUFDQSxVQUFJUyxZQUFZQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWhCO0FBQ0EsVUFBSUMsWUFBWUYsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFoQjtBQUNBRCxTQUFHRyxPQUFILENBQVc7QUFDVEMsYUFBSyxLQUFLZCxHQUFMLEdBQVcsK0JBRFA7QUFFVEwsY0FBTTtBQUNKaUIscUJBQVdBLFNBRFA7QUFFSkcsbUJBQVMsS0FBS2Q7QUFGVixTQUZHO0FBTVRlLGdCQUFRO0FBQ04sMEJBQWdCLGlEQURWO0FBRU4sdUJBQWFQO0FBRlAsU0FOQztBQVVUUSxnQkFBUSxNQVZDO0FBV1RDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEJqQixrQkFBUUMsR0FBUixDQUFZZ0IsSUFBSXhCLElBQWhCO0FBQ0Q7QUFiUSxPQUFYO0FBZUQ7Ozs7RUF6RGtDeUIsZUFBS0MsSTs7a0JBQXJCbkMsTyIsImZpbGUiOiJzZWxmZWRpdG1zZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVGFiYmFyIGZyb20gJy4uL2NvbXBvbnRlbnRzL3RhYmJhcidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG1zZyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e8lui+keefreS/oeWGheWuuSdcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInRhYmJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2VsZWN0ZS5vbmNlXCI6XCJzZWxlY3RlZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICB0YWJiYXI6IFRhYmJhclxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvdzogdHJ1ZSxcclxuICAgIHNlbGVjdGVkOiAzLFxyXG4gICAgZGlzYWJsZWQ6ICd0cnVlJyxcclxuICAgIG1zZ2NsYXNzOiAnJyxcclxuICAgIFVSTDogJycsXHJcbiAgICBtc2d2YWx1ZTogJ+S4uuW6huelnemYv+mHjOW3tOW3tOaIkOerizE05ZGo5bm077yM5aSa6YeN5aW956S85by65Yq/5p2l6KKt77yM5ZCE5L2N6L+Y5Zyo6KeC5pyb55qE6ICB5p2/5Lus6L+Y562J5LuA5LmI77yM546w5Yqg5YWl5pei5pyJ5Y+v6IO96I635b6XMeOAgee9kemUgOWuneS4pOeZvuWFg+eOsOmHke+8jOS6p+WTgeaXoOmZkOabneWFie+8mzLjgIHniIbmrL7lrp7pqozlrqTvvIzovbvmnb7mib7liLDmnIDkvJjkuqflk4HvvJsz572R5ZWG5a6d5YW4LeeUn+aEj+e7j++8jOaWsOWinuWuouaIt+eLrOS6q++8jOS8mOWTgeW6k+WFjei0ueWxleekuidcclxuICB9XHJcbiAgLy8g57yW6L6RXHJcbiAgZWRpdCAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn57yW6L6RJylcclxuICAgIHRoaXMuc2hvdyA9IGZhbHNlXHJcbiAgfVxyXG4gIC8vIOWPlua2iFxyXG4gIGNhbmNlbCAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5Y+W5raIJylcclxuICAgIHRoaXMuc2hvdyA9IHRydWVcclxuICB9XHJcbiAgLy8g5L+d5a2YXHJcbiAgc2F2ZSAoZSkge1xyXG4gICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXHJcbiAgICB0aGlzLnNob3cgPSB0cnVlXHJcbiAgICB0aGlzLm1zZ3ZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICB9XHJcbiAgb25TaG93ICgpIHtcclxuICAgIC8vIOiOt+WPluWFqOWxgOWPmOmHj1xyXG4gICAgdGhpcy5VUkwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5VUkxcclxuICB9XHJcbiAgaGFuZGxlbXNnICgpIHtcclxuICAgIC8vIOiOt+WPlue8k+WtmOaVsOaNrlxyXG4gICAgdmFyIHNlc3Npb25JZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgdmFyIHNlcnZpY2VJZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXJ2aWNlSWQnKVxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhpcy5VUkwgKyAnL2J1c2luZXNzZXN0b3JlL3NlcnZpY2UvYmF0Y2gnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc2VydmljZUlkOiBzZXJ2aWNlSWQsXHJcbiAgICAgICAgY29udGVudDogdGhpcy5tc2d2YWx1ZVxyXG4gICAgICB9LFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnc2Vzc2lvbklkJzogc2Vzc2lvbklkXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==