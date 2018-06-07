// pages/home/home.js
import util from "../../format";

var app = getApp()
Page({
    data: {
        toggle: true,
        last: 0
    },
    changeToggle: function () {
        var that = this
        that.setData({
            toggle: !that.data.toggle,
            last: 0
        })
        if (that.data.toggle == true) {
           that.MyChange()
        } else {
            that.MySend()
        }

        console.log(that.data)
    },

    Gobottom:function () {
        this.openLoading("数据加载中")
        console.log('数据加载中')
        if(this.data.toggle){
            var that = this
            console.log(that.data.token)
            wx.request({
                url: app.globalData.url + '/user/dynamicList',
                data: {
                    token: that.data.token,
                    type: 2,
                    page: {
                        rows: 4,
                        last: that.data.last
                    }
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    if(!res.data.body.page.more){
                        console.log('已经加载完毕')
                        that.openLoading('已经加载完毕')
                    }else {
                        res.data.body.list.forEach((item, index) => {
                            res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                        })
                        Array.prototype.push.apply(that.data.data, res.data.body.list)
                        that.setData({
                            data: that.data.data,
                            last: res.data.body.page.last,
                        })
                    }
                    console.log(res.data)
                }
            })
        }else {

        }
    },
    MyChange: function () {
        var that = this
        console.log(that.data.token)

            wx.request({
                url: app.globalData.url + '/user/dynamicList',
                data: {
                    token: wx.getStorageSync('token'),
                    type: 2,
                    page: {
                        rows: 4,
                        last: that.data.last
                    }
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    res.data.body.list.forEach((item, index) => {
                        res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                    })
                    that.setData({
                        data: res.data.body.list
                    })
                    console.log(res.data)
                }
            })

    },
    MySend: function () {
        var that = this
        console.log(that.data.token)
        wx.request({
            url: app.globalData.url + '/user/dynamicList',
            data: {
                token: wx.getStorageSync('token'),
                type: 1,
                page: {
                    rows: 10,
                    last: that.data.last
                }
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                res.data.body.list.forEach((item, index) => {
                    res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                })
                that.setData({
                    data: res.data.body.list
                })
                console.log(res.data)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getStorage({
            key: 'token',
            success: function (res) {
                that.setData({
                    token: res.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(this.data.token)
        this.MyChange()
    },
    openLoading: function (msg) {
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: 1000,
            last: 0
        });
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