//app.js
App({
    // DoIt: function () {
    //     var that=this
    //     // 获取用户信息
    //     wx.getSetting({
    //         success: res => {
    //             if (!res.authSetting['scope.userInfo']) {
    //                 // 未授权，调用 getUserInfo 获取头像昵称
    //                 wx.getUserInfo({
    //                     success: res => {
    //                         // 可以将 res 发送给后台解码出 unionId
    //                         // this.globalData.userInfo = res.userInfo
    //                         wx.setStorage({
    //                             key: "userInfo",
    //                             data: res.userInfo
    //                         })
    //                         var that = this
    //                         // 登录
    //                         wx.login({
    //                             success: res => {
    //                                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //                                 wx.request({
    //                                     url: that.globalData.url + '/user/login',
    //                                     method: 'POST',
    //                                     data: {
    //                                         code: res.code,
    //                                         userInfo: that.globalData.userInfo
    //                                     },
    //                                     header: {
    //                                         'content-type': 'application/json' // 默认值
    //                                     },
    //                                     success: function (res) {
    //                                         // that.globalData.token=res.data.body.token
    //                                         wx.setStorage({
    //                                             key: "token",
    //                                             data: res.data.body.token
    //                                         })
    //                                         wx.setStorage({
    //                                             key: "codeUrl",
    //                                             data: res.data.body.codeUrl
    //                                         })
    //                                         console.log(res.data)
    //                                     }
    //                                 })
    //                             }
    //                         })
    //
    //                         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                         // 所以此处加入 callback 以防止这种情况
    //                         if (this.userInfoReadyCallback) {
    //                             this.userInfoReadyCallback(res)
    //                         }
    //                     },
    //                     //如果未授权
    //                     fail: function () {
    //                         // wx.showModal({
    //                         //     title: '提示',
    //                         //     content: '未信息授权可能会影响部分功能使用，请设置授权',
    //                         //     confirmText: '去设置',
    //                         //     confirmColor: '#ff7170',
    //                         //     success: res => {
    //                         //         if (res.confirm) {
    //                         //
    //                         //         }else {
    //                         //             //如果点击了取消
    //                         //             that.DoIt()
    //                         //         }
    //                         //     }
    //                         // })
    //                         wx.navigateTo({
    //                             url: '/pages/getAuth/getAuth'//实际路径要写全
    //                         })
    //                     }
    //                 })
    //             }
    //             else {
    //                 //已经授权，直接获取
    //                 wx.getUserInfo({
    //                     success: res => {
    //                         // 可以将 res 发送给后台解码出 unionId
    //                         // this.globalData.userInfo = res.userInfo
    //                         wx.setStorage({
    //                             key: "userInfo",
    //                             data: res.userInfo
    //                         })
    //                         var that = this
    //                         // 登录
    //                         wx.login({
    //                             success: res => {
    //                                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //                                 wx.request({
    //                                     url: that.globalData.url + '/user/login',
    //                                     method: 'POST',
    //                                     data: {
    //                                         code: res.code,
    //                                         userInfo: that.globalData.userInfo
    //                                     },
    //                                     header: {
    //                                         'content-type': 'application/json' // 默认值
    //                                     },
    //                                     success: function (res) {
    //                                         // that.globalData.token=res.data.body.token
    //                                         wx.setStorage({
    //                                             key: "token",
    //                                             data: res.data.body.token
    //                                         })
    //                                         wx.setStorage({
    //                                             key: "codeUrl",
    //                                             data: res.data.body.codeUrl
    //                                         })
    //                                         console.log(res.data)
    //                                     }
    //                                 })
    //                             }
    //                         })
    //
    //                         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                         // 所以此处加入 callback 以防止这种情况
    //                         if (this.userInfoReadyCallback) {
    //                             this.userInfoReadyCallback(res)
    //                         }
    //                     }
    //                 })
    //             }
    //
    //         }
    //     })
    // },

    DoIt: function () {
        var that = this
        wx.getUserInfo({
            success: res => {
                wx.setStorage({
                    key: "userInfo",
                    data: res.userInfo
                })
                // 获取token
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        wx.request({
                            url: that.globalData.url + '/user/login',
                            method: 'POST',
                            data: {
                                code: res.code,
                                userInfo: res.userInfo
                            },
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success: function (res) {
                                wx.setStorage({
                                    key: "token",
                                    data: res.data.body.token
                                })
                                wx.setStorage({
                                    key: "codeUrl",
                                    data: res.data.body.codeUrl
                                })
                            }
                        })
                    }
                })
            }
        })
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                console.log('获取个人信息成功')
                wx.setStorage({
                    key: "isLogin",
                    data: true
                })
                console.log(res)
            },
            fail: function () {
                console.log('获取个人信息失败!!')
                that.GoOut()
            }
        })

        // wx.getUserInfo({
        //     success: res => {
        //         console.log('获取微信信息成功！')
        //         wx.setStorage({
        //             key: "userInfo",
        //             data: res.userInfo
        //         })
        //         wx.setStorage({
        //             key: "isLogin",
        //             data: true
        //         })
        //         that.globalData.userInfo=res.userInfo
        //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //         // 所以此处加入 callback 以防止这种情况
        //         if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //         }
        //     },
        //     //如果未授权
        //     fail: function () {
        //         console.log('获取微信信息失败！')
        //         that.GoOut()
        //     }
        // })


    },
    onLaunch: function () {
        // wx.clearStorage()
        wx.setStorage({
            key: "isLogin",
            data: false
        })
        // this.DoIt()

    },
    GoOut: function () {
        wx.reLaunch({
            url: '/pages/getAuth/getAuth'
        })
    },
    isLogin() {
        var that = this
        var isLogin = false
        wx.getStorage({
            key: 'isLogin',
            success: function (res) {
                isLogin = res.data
            }
        })
        return isLogin

    },
    globalData: {
        userInfo: null,
        url: 'https://goods.luckyme.com.cn',
        token: 'token'
    }
})