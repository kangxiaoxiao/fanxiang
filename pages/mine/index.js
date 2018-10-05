//获取应用实例
const app = getApp();
Page({
  data: {
    token:"",
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