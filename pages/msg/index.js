//获取应用实例
const app = getApp();
Page({
  data: {

  },
  openDetail:function(e){
    wx.navigateTo({
      url: '/pages/article/article',
    })
  }
})