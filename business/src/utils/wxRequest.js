import wepy from 'wepy'

const wxRequest = (url, params = {}) => {
  let res = wepy.request({
    url: wxRequest.baseURL + url,
    method: 'POST',
    data: params.query || {},
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'sessionId': wx.getStorageSync('sessionId')
    }
  })
  return res
}
wxRequest.baseURL = ''

export default wxRequest
