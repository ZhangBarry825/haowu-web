// pages/comments/comments.js
import util from "../../format.js"
const app=getApp()
Page({
    data: {
        toggle: true,
        last:0
    },
    changeToggle: function () {
        var that = this
        that.setData({
            toggle: !that.data.toggle,
            last:0
        })
        if(that.data.toggle==true){
           this.ReceiveComment()
        }else {
            this.MyCommnet()
        }
        console.log(that.data)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this
      wx.getStorage({
          key: 'token',
          success: function(res) {
              that.setData({
                  token:res.data
              })
          }
      })
  },
    ReceiveComment:function () {
        var that=this
        wx.request({
            url: app.globalData.url+'/user/commentList',
            data: {
                token:that.data.token,
                page:{
                    last:that.data.last,
                    rows:10
                },
                type:2
            },
            method:'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                res.data.body.list.forEach((item,index)=>{
                    res.data.body.list[index].createTime=util.formatTime(item.createTime,"%M-%d %h:%m")
                })
                that.setData({
                    data:res.data.body.list,
                    last: res.data.body.page.last,
                })
                console.log(res.data)
            }
        })
    },
    openUrl:function (e) {
      var that = this
        console.log(e.currentTarget.dataset.dynamicid)

        wx.request({
            url: app.globalData.url + '/dynamic/getDetail',
            data: {
                token: that.data.token,
                dynamicId: e.currentTarget.dataset.dynamicid
            },
            method: 'GET',
            success: function (res) {
                console.log("res.data:::::::")
                console.log(res.data)
                if(res.data.body.dynamic.token!==that.data.token){
                    console.log("不是我的文章")
                    wx.navigateTo({
                        url: '/pages/detail/detail?dynamicId='+e.currentTarget.dataset.dynamicid
                    })
                }else {
                    console.log("是我的文章")
                    wx.navigateTo({
                        url: '/pages/mydetail/mydetail?dynamicId='+e.currentTarget.dataset.dynamicid
                    })
                }
            }
        })

    },
    MyCommnet:function () {
        var that=this
        wx.request({
            url: app.globalData.url+'/user/commentList',
            data: {
                token:that.data.token,
                page:{
                    last:that.data.last,
                    rows:10
                },
                type:1
            },
            method:'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                res.data.body.list.forEach((item,index)=>{
                    res.data.body.list[index].createTime=util.formatTime(item.createTime,"%M-%d %h:%m")
                })

                that.setData({
                    data:res.data.body.list,
                    last: res.data.body.page.last,
                })
                console.log(res.data)
            }
        })
    },
    openLoading: function (msg) {
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: 1000,
            last: 0
        });
    },
    Gobottom:function () {
        this.openLoading("数据加载中")
        if(this.data.toggle){
            var that=this
            wx.request({
                url: app.globalData.url+'/user/commentList',
                data: {
                    token:that.data.token,
                    page:{
                        last:that.data.last,
                        rows:10
                    },
                    type:2
                },
                method:'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {

                    console.log(res.data)
                    if(!res.data.body.page.more){
                        console.log('已经加载完毕')
                        that.openLoading('已经加载完毕')
                    }else {
                        res.data.body.list.forEach((item, index) => {
                            res.data.body.list[index].createTime = util.formatTime(item.createTime, "%M-%d %h:%m")
                        })
                        Array.prototype.push.apply(that.data.data, res.data.body.list)
                        that.setData({
                            data: that.data.data,
                            last: res.data.body.page.last,
                        })
                    }

                }
            })
        }else {
            var that=this
            wx.request({
                url: app.globalData.url+'/user/commentList',
                data: {
                    token:that.data.token,
                    page:{
                        last:that.data.last,
                        rows:10
                    },
                    type:1
                },
                method:'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {

                    console.log(res.data)
                    if(!res.data.body.page.more){
                        console.log('已经加载完毕')
                        that.openLoading('已经加载完毕')
                    }else {
                        res.data.body.list.forEach((item, index) => {
                            res.data.body.list[index].createTime = util.formatTime(item.createTime, "%M-%d %h:%m")
                        })
                        Array.prototype.push.apply(that.data.data, res.data.body.list)
                        that.setData({
                            data: that.data.data,
                            last: res.data.body.page.last,
                        })
                    }

                }
            })
        }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.ReceiveComment()

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