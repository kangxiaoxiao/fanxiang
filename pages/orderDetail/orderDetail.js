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
    this.handleSubmit(id)
  },
  pay: function (orderId) {
    let _this = this;
    let url = api.headUrl + "/api/wx/pay";
    wx.request({
      url: url,
      data: { order_id: orderId },
      header: {
        Authorization: wx.getStorageSync("token")
      },
      method: "post",
      success: function (res) {
        if (res.data.code == 200) {
          let wxPayConsult = res.data.data;
          wx.requestPayment({
            timeStamp: wxPayConsult.timestamp,
            nonceStr: wxPayConsult.nonceStr,
            package: wxPayConsult.package,
            signType: wxPayConsult.signType,
            paySign: wxPayConsult.paySign,
            success: function (res) {
              wx.showToast({
                title:"支付成功",
                success:function(res){
                  setTimeout(function(){
                    wx.navigateTo({
                      url: '/pages/orderList/orderList?type=1',
                    })
                    wx.hideToast();
                  },1500)
                }
              })
            },
            fail: function (err) {
              wx.showToast({
                title: "支付失败",
                success: function (res) {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/orderList/orderList?type=0',
                    })
                    wx.hideToast();
                  }, 1500)
                }
              })
            }
          })
        } else {
          util.showToast(res.data.msg);
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