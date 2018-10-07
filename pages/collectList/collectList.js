// pages/collectList/collectList.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      collectList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.checkLogin();
    this.getCollectList();
  },
  getCollectList:function(){
    let _this=this;
    wx.request({
      url: api.headUrl +'/api/user/collectionList',
      method:"post",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success:function(res){
        console.log("收藏列表",res);
        _this.setData({
          collectList:res.data.data
        })
      }
    })
  },
  goHouseDetail:function(e){
    let houseId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/houseDetail/houseDetail?id=' + houseId,
    })
  },
  deleteFavorate: function (e) {
    let _this = this;
    let houseId = e.currentTarget.dataset.id;
    util.checkLogin();
    let params = {
      id: houseId,
      type: 2,
      openid: wx.getStorageSync("openid")
    }
    wx.request({
      url: api.headUrl + '/api/house/collection',
      method: "post",
      data: params,
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        if (res.data.code == 200) {
          _this.getCollectList();
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