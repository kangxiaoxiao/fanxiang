//获取应用实例
const app = getApp();
Page({
  data: {
    token:"",
    phoneNum:"4008888"
  },
  onShow:function(){
    this.init();
  },
  onLoad: function (options) {
    this.init();
  },
  init:function(){
    let _this = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        _this.setData({
          token: res.data
        })
      },
      fail:function(){
        _this.setData({
          token: ""
        })
      }
    });
  },
  call:function(){
    let _this=this;
    wx.makePhoneCall({
      phoneNumber: _this.data.phoneNum,
      success:function(){
        
      }
    })
  },
  goCollectList:function(){
    wx.navigateTo({
      url: '/pages/collectList/collectList',
    })
  },
  aboutUs:function(){
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '凡乡',
      path: '/pages/index/index',
      imageUrl:"/pages/img/mine/defaultImg.jpg",
      success: function (res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  login:function(e){
   wx.navigateTo({
     url: '../login/login',
   })
  },
  loginOut:function(e){
    let _this=this;
    wx.clearStorage({
      success:function(){
        wx.showToast({
          title: '退出登录成功',
          success:function(){
            _this.init();
            wx.hideToast();
          }
        })
      }
    }); 
  }
})