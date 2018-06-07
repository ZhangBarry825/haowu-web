// pages/home/home.js
Page({
    data: {
        page:1,
        files: [],
        text:['1\n 2 \n 3 ','1\n 2 \n 3 ','1\n 2 \n 3 ','1\n 2 \n 3 ']
    },
    openLoading: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000
        });
    },
    bottom:function () {
        this.openLoading()
        var arr=[this.data.page]
        Array.prototype.push.apply(this.data.text,arr)
        this.setData({
            text:this.data.text
        })
        console.log('Bottom!!!')
        console.log(this.data)
        this.setData({
            page:this.data.page+1
        })
    },
    top:function () {
        console.log('Top!!!')
    },
    onPullDownRefresh: function(){
        wx.request({
            url: '',
            data: {},
            method: 'GET',
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {
                wx.stopPullDownRefresh();
            }
        })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // this.onPullDownRefresh()
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