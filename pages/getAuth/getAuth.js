// pages/getAuth/getAuth.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back(){
    // wx.navigateBack({
    //   delta: 1
    // })
      wx.reLaunch({
          url: '/pages/home/home'//实际路径要写全
      })
  },
  onGotUserInfo: function (e) {
      var that=this
      wx.setStorage({
          key: "userInfo",
          data: e.detail.userInfo
      })
      // 获取token
      wx.login({
          success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                  url: app.globalData.url + '/user/login',
                  method: 'POST',
                  data: {
                      code: res.code,
                      userInfo: e.detail.userInfo
                  },
                  header: {
                      'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                      console.log('login结果：')
                      console.log(res.data)
                      wx.setStorage({
                          key: "token",
                          data: res.data.body.token
                      })
                      wx.setStorage({
                          key: "codeUrl",
                          data: res.data.body.codeUrl
                      })
                  },
                  fail:function () {
                      console.log('login失败')
                  }
              })
          }
      })


      wx.redirectTo({
          url: '/pages/home/home'//实际路径要写全
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})