import wepy from 'wepy'

const wxRequest = (url, params = {}) => {
  let res = wepy.request({
    url: wxRequest.baseURL + url,
    method: params.method || 'GET',
    data: params.query || {}
  })
  return res
}
wxRequest.baseURL = ''

export default wxRequest
