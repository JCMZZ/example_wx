function Interceptor (data) {
  if (data.result !== null) {
    if (data.result.isLogin === false) {
      // wx.redirectTo({
      //   url: 'me'
      // })
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