// pages/orderDetail/orderDetail.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    orderDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  getOrderDetail:function(){
    util.checkLogin();
    let _this=this;
    let url = api.headUrl +"/api/order/detail";
    let params={
      id: _this.data.orderId
    };
    wx.request({
      url: url,
      data:params,
      method:"get",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success:function(res){
        if(res.data.code==200){
         let orderDetail=res.data.data;
         orderDetail.startTime = util.formatDate(orderDetail.start_time);
         orderDetail.endTime = util.formatDate(orderDetail.end_time); 
          _this.setData({
            orderDetail: orderDetail
          })
        }else{
          util.showToast(res.data.msg)
        }
      }
    })
  },
  handleSubmit:function(e){
    let id = e.currentTarget.dataset.id;
    console.log("立即支付",id);
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