'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Interceptor(data) {
  if (data.result !== null && data.result !== undefined) {
    if (data.result.isAdmin === false) {
      wx.redirectTo({
        url: 'binduser'
      });
      return false;
    }
    if (data.result.isLogin === false) {
      wx.redirectTo({
        url: 'index'
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJJbnRlcmNlcHRvciIsImRhdGEiLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJpc0FkbWluIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwiaXNMb2dpbiIsInRpcEFsZXJ0IiwidGV4dCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTQSxXQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUMxQixNQUFJQSxLQUFLQyxNQUFMLEtBQWdCLElBQWhCLElBQXdCRCxLQUFLQyxNQUFMLEtBQWdCQyxTQUE1QyxFQUF1RDtBQUNyRCxRQUFJRixLQUFLQyxNQUFMLENBQVlFLE9BQVosS0FBd0IsS0FBNUIsRUFBbUM7QUFDakNDLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyxhQUFLO0FBRE8sT0FBZDtBQUdBLGFBQU8sS0FBUDtBQUNEO0FBQ0QsUUFBSU4sS0FBS0MsTUFBTCxDQUFZTSxPQUFaLEtBQXdCLEtBQTVCLEVBQW1DO0FBQ2pDSCxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSztBQURPLE9BQWQ7QUFHQSxhQUFPLEtBQVA7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7QUFDRCxTQUFTRSxRQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUN2QkwsS0FBR00sU0FBSCxDQUFhO0FBQ1hDLGFBQVNGLElBREU7QUFFWEcsZ0JBQVksS0FGRDtBQUdYQyxhQUFTLGlCQUFVQyxHQUFWLEVBQWUsQ0FBRTtBQUhmLEdBQWI7QUFLRDtrQkFDYztBQUNiZiwwQkFEYTtBQUViUztBQUZhLEMiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gSW50ZXJjZXB0b3IgKGRhdGEpIHtcclxuICBpZiAoZGF0YS5yZXN1bHQgIT09IG51bGwgJiYgZGF0YS5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKGRhdGEucmVzdWx0LmlzQWRtaW4gPT09IGZhbHNlKSB7XHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogJ2JpbmR1c2VyJ1xyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIGlmIChkYXRhLnJlc3VsdC5pc0xvZ2luID09PSBmYWxzZSkge1xyXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6ICdpbmRleCdcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICByZXR1cm4gdHJ1ZVxyXG59XHJcbmZ1bmN0aW9uIHRpcEFsZXJ0ICh0ZXh0KSB7XHJcbiAgd3guc2hvd01vZGFsKHtcclxuICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHt9XHJcbiAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgSW50ZXJjZXB0b3IsXHJcbiAgdGlwQWxlcnRcclxufVxyXG4iXX0=