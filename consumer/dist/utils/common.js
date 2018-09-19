"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Interceptor(data) {
  if (data.result !== null) {
    if (data.result.isLogin === false) {
      // wx.redirectTo({
      //   url: 'me'
      // })
      return false;
    }
    return true;
  }
  return true;
}
function tipAlert(text) {
  wx.showModal({
    content: text,
    showCancel: false,
    success: function success(res) {}
  });
}
exports.default = {
  Interceptor: Interceptor,
  tipAlert: tipAlert
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJJbnRlcmNlcHRvciIsImRhdGEiLCJyZXN1bHQiLCJpc0xvZ2luIiwidGlwQWxlcnQiLCJ0ZXh0Iiwid3giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsV0FBVCxDQUFzQkMsSUFBdEIsRUFBNEI7QUFDMUIsTUFBSUEsS0FBS0MsTUFBTCxLQUFnQixJQUFwQixFQUEwQjtBQUN4QixRQUFJRCxLQUFLQyxNQUFMLENBQVlDLE9BQVosS0FBd0IsS0FBNUIsRUFBbUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRCxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEO0FBQ0QsU0FBU0MsUUFBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDdkJDLEtBQUdDLFNBQUgsQ0FBYTtBQUNYQyxhQUFTSCxJQURFO0FBRVhJLGdCQUFZLEtBRkQ7QUFHWEMsYUFBUyxpQkFBVUMsR0FBVixFQUFlLENBQUU7QUFIZixHQUFiO0FBS0Q7a0JBQ2M7QUFDYlgsMEJBRGE7QUFFYkk7QUFGYSxDIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEludGVyY2VwdG9yIChkYXRhKSB7XHJcbiAgaWYgKGRhdGEucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICBpZiAoZGF0YS5yZXN1bHQuaXNMb2dpbiA9PT0gZmFsc2UpIHtcclxuICAgICAgLy8gd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgIC8vICAgdXJsOiAnbWUnXHJcbiAgICAgIC8vIH0pXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgcmV0dXJuIHRydWVcclxufVxyXG5mdW5jdGlvbiB0aXBBbGVydCAodGV4dCkge1xyXG4gIHd4LnNob3dNb2RhbCh7XHJcbiAgICBjb250ZW50OiB0ZXh0LFxyXG4gICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7fVxyXG4gIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEludGVyY2VwdG9yLFxyXG4gIHRpcEFsZXJ0XHJcbn0iXX0=