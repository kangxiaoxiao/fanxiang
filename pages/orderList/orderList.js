// pages/orderList/orderList.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType:"",
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      orderType: options.type
    })
    this.getOrderList();
  },
  handleTabChange:function(e){
    let status = e.currentTarget.dataset.status;
    this.setData({
      orderType: status
    });
    this.getOrderList();
  },
  getOrderList:function(){
    util.checkLogin();
    let _this=this;
    let url = api.headUrl +"/api/order/list";
    let params={
      type: _this.data.orderType
    };
    wx.request({
      url: url,
      data:params,
      header: {
        Authorization: wx.getStorageSync("token")
      },
      method:"get",
      success:function(res){
         if(res.data.code==200){
           let orderList=res.data.data;
           orderList.map((cur,index,arr)=>{ 
             let obj=cur;
             obj.startTime = util.formatDate(cur.start_time);
             obj.endTime = util.formatDate(cur.end_time);
             switch (obj.status){
               case 0:
                 obj.statusName="待支付";
                 break;
               case 1:
                 obj.statusName = "待入住";
                 break;
               case 3:
                 obj.statusName = "已取消";
                 break;
               case 4:
                 obj.statusName = "全部";
                 break;      
        
             }
             return obj;
           })
           console.log("orderList", orderList);
            _this.setData({
              orderList: orderList
            })
         }else{
           util.showToast(res.data.msg);
         }
      }
    })
  },
  goOrderDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + id,
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