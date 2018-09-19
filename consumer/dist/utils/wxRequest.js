'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wxRequest = function wxRequest(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var res = _wepy2.default.request({
    url: wxRequest.baseURL + url,
    method: params.method || 'GET',
    data: params.query || {}
  });
  return res;
};
wxRequest.baseURL = '';

exports.default = wxRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJ1cmwiLCJwYXJhbXMiLCJyZXMiLCJ3ZXB5IiwicmVxdWVzdCIsImJhc2VVUkwiLCJtZXRob2QiLCJkYXRhIiwicXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVksQ0FBQ0MsR0FBRCxFQUFzQjtBQUFBLE1BQWhCQyxNQUFnQix1RUFBUCxFQUFPOztBQUN0QyxNQUFJQyxNQUFNQyxlQUFLQyxPQUFMLENBQWE7QUFDckJKLFNBQUtELFVBQVVNLE9BQVYsR0FBb0JMLEdBREo7QUFFckJNLFlBQVFMLE9BQU9LLE1BQVAsSUFBaUIsS0FGSjtBQUdyQkMsVUFBTU4sT0FBT08sS0FBUCxJQUFnQjtBQUhELEdBQWIsQ0FBVjtBQUtBLFNBQU9OLEdBQVA7QUFDRCxDQVBEO0FBUUFILFVBQVVNLE9BQVYsR0FBb0IsRUFBcEI7O2tCQUVlTixTIiwiZmlsZSI6Ind4UmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5jb25zdCB3eFJlcXVlc3QgPSAodXJsLCBwYXJhbXMgPSB7fSkgPT4ge1xyXG4gIGxldCByZXMgPSB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgdXJsOiB3eFJlcXVlc3QuYmFzZVVSTCArIHVybCxcclxuICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCB8fCAnR0VUJyxcclxuICAgIGRhdGE6IHBhcmFtcy5xdWVyeSB8fCB7fVxyXG4gIH0pXHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcbnd4UmVxdWVzdC5iYXNlVVJMID0gJydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHd4UmVxdWVzdFxyXG4iXX0=