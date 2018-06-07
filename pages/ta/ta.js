// pages/home/home.js
import util from "../../format";

var app = getApp()
Page({
    previewImage: function (e) {
        wx.previewImage({
            current: e.target.dataset.src, // 当前显示图片的http链接
            urls: [this.data.itsInfo.codeUrl] // 需要预览的图片http链接列表
        })
    },
    /**
     * 页面的初始数据
     */
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
            that.ItChange()
        } else {
            that.ItSend()
        }
        console.log(that.data)
    },
    Gobottom: function () {
        this.openLoading("数据加载中")
        console.log('数据加载中')
        if (this.data.toggle) {
            var that = this
            //Ta的发布
            wx.request({
                url: app.globalData.url + '/user/dynamicList',
                data: {
                    token: that.data.itsToken,
                    type: 1,
                    page: {
                        rows: 6,
                        last: that.data.last
                    }
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data)
                    if (!res.data.body.page.more) {
                        console.log('已经加载完毕')
                        that.openLoading('已经加载完毕')
                    } else {
                        res.data.body.list.forEach((item, index) => {
                            res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
                        })
                        Array.prototype.push.apply(that.data.data, res.data.body.list)
                        that.setData({
                            data: that.data.data,
                            last: res.data.body.page.last,
                        })
                    }
                }

            })
        } else {
            var that = this
            //Ta的发布
            wx.request({
                url: app.globalData.url + '/user/dynamicList',
                data: {
                    token: that.data.itsToken,
                    type: 2,
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
                    console.log(res.data)
                    if (!res.data.body.page.more) {
                        console.log('已经加载完毕')
                        that.openLoading('已经加载完毕')
                    } else {
                        res.data.body.list.forEach((item, index) => {
                            res.data.body.list[index].createTime = util.formatDiffTime(item.createTime)
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
    openLoading: function (msg) {
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: 1000,
            last: 0
        });
    },

    ItChange: function () {
        var that = this
        //Ta的发布
        wx.request({
            url: app.globalData.url + '/user/dynamicList',
            data: {
                token: that.data.itsToken,
                type: 1,
                page: {
                    rows: 6,
                    last: 0
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
    ItSend: function () {
        var that = this
        //Ta的发布
        wx.request({
            url: app.globalData.url + '/user/dynamicList',
            data: {
                token: that.data.itsToken,
                type: 2,
                page: {
                    rows: 10,
                    last: 0
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

    getparas: function (uri) {
        uri = decodeURIComponent(uri)
        let url = uri.split('=')
        return url[1]
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this
        wx.request({
            url: app.globalData.url + '/user/userInfo',
            data: {
                token: that.data.itsToken
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {

                that.setData({
                    itsInfo: res.data.body[0]
                })
                console.log(that.data)
            }
        })
        this.ItChange()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.DoIt()
        console.log('q:')
        console.log(options.q)
        console.log(':q')
        var that = this
        wx.getStorage({
            key: 'token',
            success: function (res) {
                that.setData({
                    token: res.data
                })
            }
        })

        if(options.q!==undefined){
            that.setData({
                itsToken: that.getparas(options.q)
            })
        }else {
            that.setData({
                itsToken: options.token
            })
        }

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