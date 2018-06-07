// pages/home/home.js
var app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        files: [],
        //输入文本内容
        text: '',
        textNum: 0,
        ifNum:false,
        location:{},
        ifLocation:false,
        pic:'',
        selectCount:9,
        ifSelect:true,

        //图片及数量
        img_num: 0,
        tmpimg: [],
        ifClick:true
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    choose_img() {
        let self = this
        console.log(self.data.img_num)
        self.setData({
            selectCount:self.data.selectCount-self.data.img_num
        })
        wx.chooseImage({
            count: self.data.selectCount, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res)
                var tempFilePaths = res.tempFilePaths
                wx.showLoading({
                    title: '上传中...'
                })
                for(var i=0;i<tempFilePaths.length;i++)
                {
                    self.upload_file(res.tempFilePaths[i],new Date().getTime());
                }

            }
        })
    },
    upload_access(filePath) {
        var self=this;
        if (!this.data.upload_access) {
            wx.request({
                url: app.globalData.url + "/common/upload",
                data: { path: '/goodUser/' },
                header: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                dataType: 'json',
                success: function (ret) {
                    console.log(ret);
                    self.setData({
                        upload_access: ret.data.body
                    })


                },
                fail: function (ret) {
                }
            })
            // app.request("http://goods.yf.umdev.cn:3000/common/upload", { path: '/goodUser/' }, (res) => {
            //   this.setData({
            //     upload_access: res.body
            //   })
            // })
        }
        this.choose_img()
    },
    upload_file(tempFilePaths,i) {
        var self = this
        let upload_access = this.data.upload_access
        let formData = {
            OSSAccessKeyId: upload_access.accessid,
            policy: upload_access.policy,
            Signature: upload_access.signature,
            key: upload_access.dir +i + '.jpg',
            success_action_status: 200
        }

        console.log(self.data.img_num)
        console.log(tempFilePaths)
        console.log(formData.key);
        wx.uploadFile({
            url: upload_access.host,
            filePath: tempFilePaths,
            name: 'file',
            formData: formData,
            success: function (res) {
                if (res.statusCode == 200) {
                    self.data.tmpimg.push(upload_access.res + formData.key)
                    self.setData({
                        tmpimg: self.data.tmpimg,
                        img_num: self.data.img_num + 1,
                        files:self.data.tmpimg,
                    })
                    console.log(self.data.tmpimg)
                }
                wx.hideLoading()
            },
            fail: function (res) { },
            complete: function (res) {
                console.log(self.data.img_num)
                if(self.data.img_num>=9){
                    self.setData({
                        ifSelect:false
                    })
                }
            },
        })
    },


    bindChange: function (e) {
        // console.log(e.detail.value)
        var num=strlen(e.detail.value)

        if(num>100){
            this.setData({
                ifNum:true
            })
        }else {
            this.setData({
                ifNum:false
            })
        }

        this.setData({
            text: e.detail.value,
            textNum:num
        })
    },
    openToast: function () {
        wx.showToast({
            title: '敬请期待！',
            icon: 'success',
            duration: 3000
        });
    },
    chooseLocation:function () {
        var that=this
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.userLocation']) {
                    wx.chooseLocation({
                        success:function (res) {
                            that.setData({
                                location:{
                                    name:res.name,
                                    address:res.address,
                                    latitude:res.latitude,
                                    longitude:res.longitude
                                },
                                ifLocation:true
                            })
                            console.log(that.data.location)
                        },
                        fail:res=>{
                            wx.showModal({
                                title: '提示',
                                content: '地理位置未授权会影响该功能使用，请设置授权',
                                confirmText: '去设置',
                                confirmColor: '#ff7170',
                                success: res => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: function () {
                                                wx.getSetting({
                                                    success: res => {

                                                    }
                                                })
                                            }
                                        })
                                    }else {
                                        //如果点击了取消
                                    }
                                }
                            })
                        }
                    })
                }
                else {
                    wx.chooseLocation({
                        success: function (res) {
                            that.setData({
                                location: {
                                    name: res.name,
                                    address: res.address,
                                    latitude: res.latitude,
                                    longitude: res.longitude
                                },
                                ifLocation: true
                            })
                            console.log(that.data.location)
                        }
                    })
                }
            }
        })






    },


    submit:function () {
        var that=this

        var textNum=that.data.textNum
        if(textNum<1){
            wx.showModal({
                content: '内容不能为空哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        }else if(textNum>100){
            wx.showModal({
                content: '内容不能超出100个字符哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        }else {
            wx.request({
                url:  app.globalData.url+'/dynamic/create',
                method:'POST',
                data: {
                    token: this.data.token ,
                    content: this.data.text,
                    type:that.data.type,
                    imgs:this.data.tmpimg,
                    addName:this.data.location.name,
                    address:this.data.location.address,
                    longitude:this.data.location.longitude,
                    latitude:this.data.location.latitude,
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    console.log(res.data)
                    that.setData({
                        ifClick:false
                    })
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '发布成功！',
                            icon: 'success',
                            duration: 2000
                        });
                        setTimeout(function(){
                            // wx.redirectTo({      //关闭当前页面，跳转到应用内的某个页面（这个跳转有个坑，就是跳转页面后页面会闪烁一下，完全影响了我自己的操作体验，太缺德了。）
                            //     url: "/pages/home/home"
                            // })
                            wx.reLaunch({
                                url: '/pages/home/home'
                            })
                        },2000);
                    }
                }
            })
        }


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.DoIt()
        var that=this

        that.setData({
            type:options.type
        })

        wx.getStorage({
            key: 'token',
            success: function(res) {
                that.setData({
                    token:res.data
                })
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

//计算字符串长度
function strlen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 1;
        }
        else {
            len += 1;
        }
    }
    return len;
}