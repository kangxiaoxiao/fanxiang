// pages/collectList/collectList.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      collectList:[],
      deletHouseId:""
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
        let collectList = res.data.data;
        collectList.map((cur,index,arr)=>{
          let obj={};
          let long_price = cur.long_price;
          obj.priceNum = cur.long_price.split("/")[0];
          obj.priceUnit = cur.long_price.split("/")[1];
          cur.long_price= obj;
        })
        _this.setData({
          collectList: collectList
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
    _this.setData({
      deletHouseId: houseId
    });
    util.checkLogin();
    //this.dialog.show();

    this.dialog.setData({
      title: '提示',
      content: '确定删除这一条吗?',
      cancelText: '取消',
      okText: '确定'
    });
    this.dialog.show();
   
  },

  cancelEvent: function () {
    this.dialog.close();
  },
  okEvent: function () {
    let _this=this;
    let params = {
      id: this.data.deletHouseId,
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

    this.dialog.close();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent('#dialog');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // util.checkLogin();
    // this.getCollectList();
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