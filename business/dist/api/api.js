'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxRequest = require('./../utils/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wxRequest2.default.baseURL = 'http://127.0.0.1:8080/businessestore/';

// 自主营销
var getselfrcmd = function getselfrcmd(params) {
    return (0, _wxRequest2.default)('service/selectUser', params).then(function (res) {
        return res.data;
    });
};
var selfnopay = function selfnopay(params) {
    return (0, _wxRequest2.default)('service/selectService', params).then(function (res) {
        return res.data;
    });
};

// 用户管理
var getCustomer = function getCustomer(params) {
    return (0, _wxRequest2.default)('userManage/customerList', params).then(function (res) {
        return res.data;
    });
};

exports.default = {
    getselfrcmd: getselfrcmd,
    getCustomer: getCustomer,
    selfnopay: selfnopay
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJiYXNlVVJMIiwiZ2V0c2VsZnJjbWQiLCJwYXJhbXMiLCJ0aGVuIiwicmVzIiwiZGF0YSIsInNlbGZub3BheSIsImdldEN1c3RvbWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUFBLG9CQUFVQyxPQUFWLEdBQW9CLHVDQUFwQjs7QUFFQTtBQUNBLElBQU1DLGNBQWMsU0FBZEEsV0FBYyxTQUFVO0FBQzFCLFdBQU8sK0NBQWdDQyxNQUFoQyxFQUF3Q0MsSUFBeEMsQ0FBNkM7QUFBQSxlQUFPQyxJQUFJQyxJQUFYO0FBQUEsS0FBN0MsQ0FBUDtBQUNILENBRkQ7QUFHQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksU0FBVTtBQUN4QixXQUFPLGtEQUFtQ0osTUFBbkMsRUFBMkNDLElBQTNDLENBQWdEO0FBQUEsZUFBT0MsSUFBSUMsSUFBWDtBQUFBLEtBQWhELENBQVA7QUFDSCxDQUZEOztBQUlBO0FBQ0EsSUFBTUUsY0FBYyxTQUFkQSxXQUFjLFNBQVU7QUFDMUIsV0FBTyxvREFBcUNMLE1BQXJDLEVBQTZDQyxJQUE3QyxDQUFrRDtBQUFBLGVBQU9DLElBQUlDLElBQVg7QUFBQSxLQUFsRCxDQUFQO0FBQ0gsQ0FGRDs7a0JBSWU7QUFDWEosNEJBRFc7QUFFWE0sNEJBRlc7QUFHWEQ7QUFIVyxDIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvd3hSZXF1ZXN0J1xyXG5cclxud3hSZXF1ZXN0LmJhc2VVUkwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDgwL2J1c2luZXNzZXN0b3JlLydcclxuXHJcbi8vIOiHquS4u+iQpemUgFxyXG5jb25zdCBnZXRzZWxmcmNtZCA9IHBhcmFtcyA9PiB7XHJcbiAgICByZXR1cm4gd3hSZXF1ZXN0KGBzZXJ2aWNlL3NlbGVjdFVzZXJgLCBwYXJhbXMpLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxyXG59XHJcbmNvbnN0IHNlbGZub3BheSA9IHBhcmFtcyA9PiB7XHJcbiAgICByZXR1cm4gd3hSZXF1ZXN0KGBzZXJ2aWNlL3NlbGVjdFNlcnZpY2VgLCBwYXJhbXMpLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxyXG59XHJcblxyXG4vLyDnlKjmiLfnrqHnkIZcclxuY29uc3QgZ2V0Q3VzdG9tZXIgPSBwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIHd4UmVxdWVzdChgdXNlck1hbmFnZS9jdXN0b21lckxpc3RgLCBwYXJhbXMpLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBnZXRzZWxmcmNtZCxcclxuICAgIGdldEN1c3RvbWVyLFxyXG4gICAgc2VsZm5vcGF5XHJcbn0iXX0=