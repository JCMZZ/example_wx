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
    method: 'POST',
    data: params.query || {},
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'sessionId': wx.getStorageSync('sessionId')
    }
  });
  return res;
};
wxRequest.baseURL = '';

exports.default = wxRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJ1cmwiLCJwYXJhbXMiLCJyZXMiLCJ3ZXB5IiwicmVxdWVzdCIsImJhc2VVUkwiLCJtZXRob2QiLCJkYXRhIiwicXVlcnkiLCJoZWFkZXIiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxTQUFaQSxTQUFZLENBQUNDLEdBQUQsRUFBc0I7QUFBQSxNQUFoQkMsTUFBZ0IsdUVBQVAsRUFBTzs7QUFDdEMsTUFBSUMsTUFBTUMsZUFBS0MsT0FBTCxDQUFhO0FBQ3JCSixTQUFLRCxVQUFVTSxPQUFWLEdBQW9CTCxHQURKO0FBRXJCTSxZQUFRLE1BRmE7QUFHckJDLFVBQU1OLE9BQU9PLEtBQVAsSUFBZ0IsRUFIRDtBQUlyQkMsWUFBUTtBQUNOLHNCQUFnQixpREFEVjtBQUVOLG1CQUFhQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCO0FBRlA7QUFKYSxHQUFiLENBQVY7QUFTQSxTQUFPVCxHQUFQO0FBQ0QsQ0FYRDtBQVlBSCxVQUFVTSxPQUFWLEdBQW9CLEVBQXBCOztrQkFFZU4sUyIsImZpbGUiOiJ3eFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuY29uc3Qgd3hSZXF1ZXN0ID0gKHVybCwgcGFyYW1zID0ge30pID0+IHtcclxuICBsZXQgcmVzID0gd2VweS5yZXF1ZXN0KHtcclxuICAgIHVybDogd3hSZXF1ZXN0LmJhc2VVUkwgKyB1cmwsXHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGRhdGE6IHBhcmFtcy5xdWVyeSB8fCB7fSxcclxuICAgIGhlYWRlcjoge1xyXG4gICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgJ3Nlc3Npb25JZCc6IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uSWQnKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIHJlc1xyXG59XHJcbnd4UmVxdWVzdC5iYXNlVVJMID0gJydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHd4UmVxdWVzdFxyXG4iXX0=