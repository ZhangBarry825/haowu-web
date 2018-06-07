// pages/home/home.js
import util from "../../format.js"

const app = getApp()
Page({
    bindChange: function (e) {
        this.setData({
            text: e.detail.value,
        })
    },
    bindReturn: function (e) {
        this.setData({
            returnText: e.detail.value,
        })
    },
    ToggleLove: function () {
        var that = this
        // console.log(that.data)
        console.log(
            {
                token: that.data.token,
                dynamicId: that.data.dynamicId,
                dynamicToken: that.data.data.dynamic.token,
                name: that.data.userInfo.nickName,
                avatar: that.data.userInfo.avatarUrl,
                gender: that.data.userInfo.gender
            }
        )
        that.setData({
            ifLove: !that.data.ifLove,

        })
        console.log(that.data)
        if (that.data.ifLove == true) {
            wx.request({
                url: app.globalData.url + '/dynamic/praise',
                data: {
                    token: that.data.token,
                    dynamicId: that.data.dynamicId,
                    dynamicToken: that.data.data.dynamic.token,
                    name: that.data.userInfo.nickName,
                    avatar: that.data.userInfo.avatarUrl,
                    gender: that.data.userInfo.gender
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data)
                }
            })
            var arr = "data.dynamic.praiseCount"
            var arr2 = "data.userinfo.praiseCount"
            that.setData({
                [arr]: that.data.data.dynamic.praiseCount + 1,
                [arr2]: that.data.data.userinfo.praiseCount+1
            })
        } else {
            //取消赞
            wx.request({
                url: app.globalData.url + '/dynamic/un_praise',
                data: {
                    token: that.data.token,
                    dynamicId: that.data.dynamicId,
                    dynamicToken: that.data.data.dynamic.token
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data)
                }
            })

            var arr = "data.dynamic.praiseCount"
            var arr2 = "data.userinfo.praiseCount"
            that.setData({
                [arr]: that.data.data.dynamic.praiseCount - 1,
                [arr2]: that.data.data.userinfo.praiseCount-1
            })
        }
    },
    previewImage: function (e) {
        var current = e.target.dataset.src;
        console.log(current)
        console.log(this.data.data.dynamic.imgs)
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.data.data.dynamic.imgs // 需要预览的图片http链接列表
        })
    },
    want:function () {
       this.openToast()
    },
    openToast: function () {
        wx.showToast({
            title: '敬请期待！',
            icon: 'success',
            duration: 3000
        });
    },
    comment: function () {
        var that = this
        console.log(this.data.ifComm)
        that.setData({
            ifComm: true
        })
        setTimeout(function () {
            that.setData({
                focus: true
            })
        }, 100);

    },
    unComment: function () {
        console.log(this.data.ifComm)
        this.setData({
            ifComm: false,
            ifReturnComm: false
        })
    },
    subComm: function () {
        if (this.data.text == '') {
            wx.showModal({
                confirmColor: '#ff7170',
                content: '内容不能为空哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        } else {
            var that = this
            console.log()
            wx.request({
                url: app.globalData.url + '/dynamic/comment',
                data: {
                    dynamicId: that.data.data.dynamic.dynamicId,
                    dynamicToken: that.data.data.dynamic.token,
                    f_id: '',
                    user_Name: that.data.data.userinfo.nickName,
                    otherAvatarUrl: that.data.userInfo.avatarUrl,
                    userAvatarUrl: that.data.data.userinfo.avatarUrl,
                    content: that.data.text,
                    top: 1,
                    token: that.data.token,
                    gender: that.data.userInfo.gender,
                    otherName: that.data.userInfo.nickName,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data)
                    wx.redirectTo({
                        url: "/pages/detail/detail?dynamicId=" + that.data.dynamicId
                    })
                }
            })
        }

    },

    returnComm: function (e) {
        console.log(e.currentTarget.dataset)

        var that = this
        that.setData({
            returnToken: e.currentTarget.dataset.token,
            returnName: e.currentTarget.dataset.name,
            returnId: e.currentTarget.dataset.id,
            returnAvatar: e.currentTarget.dataset.avatar
        })
        that.setData({
            ifReturnComm: true
        })
        setTimeout(function () {
            that.setData({
                focus: true
            })
        }, 100);
    },
    subReturnComm: function () {
        var that = this
        if (that.data.returnText == '') {
            wx.showModal({
                confirmColor: '#ff7170',
                content: '内容不能为空哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        } else {
            var that = this
            wx.request({
                url: app.globalData.url + '/dynamic/comment',
                data: {
                    dynamicId: that.data.data.dynamic.dynamicId,
                    dynamicToken: that.data.returnToken,
                    f_id: that.data.returnId,
                    otherName: that.data.userInfo.nickName,
                    otherAvatarUrl: that.data.userInfo.avatarUrl,
                    userAvatarUrl: that.data.returnAvatar,
                    content: that.data.returnText,
                    top: 2,
                    token: that.data.token,
                    user_Name : that.data.returnName,
                    gender: that.data.userInfo.gender
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log(res.data)
                    wx.redirectTo({
                        url: "/pages/detail/detail?dynamicId=" + that.data.dynamicId
                    })
                }
            })
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        returnText: '',
        ifLove: false,
        ifComm: false,
        focus: false,
        ifReturnComm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.DoIt()
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
        this.setData({
            dynamicId: options.dynamicId
        })
        // console.log(options.dynamicId)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("this.ddata::")
        console.log(this.data)
        var that = this
        console.log(that.data.token)
        wx.request({
            url: app.globalData.url + '/dynamic/getDetail',
            data: {
                token: that.data.token,
                dynamicId: that.data.dynamicId
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.body)
                //用户创建时间转换
                res.data.body.dynamic.createTime = util.formatDiffTime(res.data.body.dynamic.createTime)
                res.data.body.userinfo.hascreated = Math.ceil((new Date().getTime() - res.data.body.userinfo.createTime) / (24 * 60 * 60 * 1000))
                //评论时间转换
                res.data.body.comments.forEach((item, index) => {
                    res.data.body.comments[index].hasCommented = util.formatDiffTime(item.createTime)
                    res.data.body.comments[index].children.forEach((t, i) => {
                        res.data.body.comments[index].children[i].hasCommented = util.formatDiffTime(t.createTime)

                    })

                })

                res.data.body.dynamic.imgs.forEach((item, index) => {
                    //1,2,3,4,5
                    res.data.body.dynamic.imgs[index] = item + '/0'
                })
                that.setData({
                    data: res.data.body
                })
                if (res.data.body.dynamic.isPraise == true) {
                    that.setData({
                        ifLove: true
                    })
                } else {
                    that.setData({
                        ifLove: false
                    })
                }
            }
        })
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