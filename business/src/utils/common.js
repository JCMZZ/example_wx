function Interceptor (data) {
  if (data.result !== null && data.result !== undefined) {
    if (data.result.isAdmin === false) {
      wx.redirectTo({
        url: 'binduser'
      })
      return false
    }
    if (data.result.isLogin === false) {
      wx.redirectTo({
        url: 'index'
      })
      return false
    }
    return true
  }
  return true
}
function tipAlert (text) {
  wx.showModal({
    content: text,
    showCancel: false,
    success: function (res) {}
  })
}
export default {
  Interceptor,
  tipAlert
}
