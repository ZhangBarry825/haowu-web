// pages/home/home.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        toggle: true,
        num: {
            praiseCount: 0,
            commentCount: 0,
            releaseCount: 0
        }
    },
    open: function () {
        wx.showActionSheet({
            itemList: ['送物', '换物'],
            success: function (res) {
                if (!res.cancel) {
                    // console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                        wx.navigateTo({
                            url: '/pages/publish/publish'
                        })
                    } else {
                        wx.navigateTo({
                            url: '/pages/give/give'
                        })
                    }
                }
            }
        });
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.target.dataset.src, // 当前显示图片的http链接
            urls: [this.data.codeUrl] // 需要预览的图片http链接列表
        })
    },

    changeToggle: function () {
        var that = this
        that.setData({
            toggle: !that.data.toggle
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.DoIt()
        this.setData({
            codeUrl: wx.getStorageSync('codeUrl'),
            userInfo: wx.getStorageSync('userInfo'),
            token:wx.getStorageSync('token')
        })

        console.log('----------------------------')
        console.log(this.data.codeUrl)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        var that = this
        wx.request({
            url: app.globalData.url + '/user/userInfo',
            data: {
                token: wx.getStorageSync('token')
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    num: {
                        praiseCount: res.data.body[0].praiseCount,
                        commentCount: res.data.body[0].commentCount,
                        releaseCount: res.data.body[0].releaseCount
                    }

                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // app.DoIt()
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