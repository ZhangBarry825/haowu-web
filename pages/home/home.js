// pages/home/home.js
var app = getApp()
import util from "../../format.js"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        toggle: 0,
        data: [],//文章列表
        last: ''
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },
    openLoading: function (msg) {
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: 1000,
            last: 0
        });
    },
    clearStorage: function () {
        wx.clearStorage()
    },
    Gobottom: function () {
        this.openLoading('数据加载中')
        console.log('到达底部')
        console.log(this.data.last)
        var that = this
        wx.request({
            url: app.globalData.url + '/dynamic/getList',
            method: 'POST',
            data: {
                type: that.data.toggle,
                page: {
                    last: that.data.last,
                    rows: 5
                }
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data.body)
                if(!res.data.body.page.more){
                    console.log('已经加载完毕')
                    that.openLoading('已经加载完毕')
                }else {
                    res.data.body.list.forEach((item, index) => {
                        res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                    })
                    that.setData({
                        last: res.data.body.page.last
                    })
                    Array.prototype.push.apply(that.data.data, res.data.body.list)
                    that.setData({
                        data: that.data.data
                    })
                    console.log('追加完毕')
                }

            }
        })


    },

    isLogin: function () {
        app.DoIt()
    },
    toggle: function (num) {
        var that = this
        that.setData({
            toggle: num.target.dataset.num,
            last: 0
        })
        wx.request({
            url: app.globalData.url + '/dynamic/getList', //仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
                type: num.target.dataset.num,
                page: {
                    last: that.data.last,
                    rows: 5
                }
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                res.data.body.list.forEach((item, index) => {
                    res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                })
                if (res.data.code = 200) {
                    that.setData({
                        data: res.data.body.list,
                        last: res.data.body.page.last
                    })

                }
            }
        })

    },
    open: function () {
        wx.showActionSheet({
            itemList: ['送物', '换物'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 1) {
                        wx.navigateTo({
                            url: '/pages/publish/publish?type=1'
                        })
                    } else if (res.tapIndex == 0) {
                        wx.navigateTo({
                            url: '/pages/publish/publish?type=2'
                        })
                    }
                }
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.openLoading('数据加载中')
        var that = this
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
        wx.getStorage({
            key: 'token',
            success: function (res) {
                that.setData({
                    token: res.data
                })
            }
        })

        wx.request({
            url: app.globalData.url + '/dynamic/getList',
            method: 'POST',
            data: {
                type: 0,
                page: {
                    last: that.data.last,
                    rows: 5
                }
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                res.data.body.list.forEach((item, index) => {
                    res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                })
                if (res.data.code = 200) {
                    that.setData({
                        data: res.data.body.list,
                        last: res.data.body.page.last
                    })
                }
            }
        })
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
