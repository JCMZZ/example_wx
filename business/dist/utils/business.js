'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Interceptor(isAdmin, isLogin) {
  if (isAdmin === false) {
    wx.redirectTo({
      url: 'binduser'
    });
    return false;
  }
  if (isLogin === false) {
    wx.redirectTo({
      url: 'register'
    });
    return false;
  }
  return true;
}

exports.default = {
  Interceptor: Interceptor
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1c2luZXNzLmpzIl0sIm5hbWVzIjpbIkludGVyY2VwdG9yIiwiaXNBZG1pbiIsImlzTG9naW4iLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsV0FBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLE9BQS9CLEVBQXdDO0FBQ3RDLE1BQUlELFlBQVksS0FBaEIsRUFBdUI7QUFDckJFLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdBLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBSUgsWUFBWSxLQUFoQixFQUF1QjtBQUNyQkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUs7QUFETyxLQUFkO0FBR0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRDs7a0JBRWM7QUFDYkw7QUFEYSxDIiwiZmlsZSI6ImJ1c2luZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gSW50ZXJjZXB0b3IgKGlzQWRtaW4sIGlzTG9naW4pIHtcclxuICBpZiAoaXNBZG1pbiA9PT0gZmFsc2UpIHtcclxuICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICB1cmw6ICdiaW5kdXNlcidcclxuICAgIH0pXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgaWYgKGlzTG9naW4gPT09IGZhbHNlKSB7XHJcbiAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgdXJsOiAncmVnaXN0ZXInXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBJbnRlcmNlcHRvclxyXG59XHJcbiJdfQ==