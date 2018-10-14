//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    token:"",
    phoneNum:""
  },
  onShow:function(){
    this.init();
  },
  onLoad: function (options) {
    this.init();
    this.getMineDetail();
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
  getMineDetail:function(){
    let _this=this;
    wx.request({
      url: api.headUrl +'/api/user/me',
      success:function(res){
        if(res.data.code==200){
          _this.setData({
           phoneNum: res.data.data.contact
         })
        }
      }
    })
  },
  //订单列表
  goOrderList:function(e){
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/orderList/orderList?type=' + status,
    }) 
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