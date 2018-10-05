// pages/villageDetail/villageDetail.js
const app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    villageDetail:{},
    // controls: [{
    //   id: 1,
    //   iconPath: '/pages/img/icons/markers.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }],
    markers: [{
      iconPath: "/pages/img/icons/markers.png",
      id: 0,
      title: "",
      latitude: "",
      longitude: "",
      width: 25,
      height: 25
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log("options",options);
    let id = options.id;
     this.getVillageDetail(id);
  },
  getVillageDetail(id){
    let _this=this;
    let url = api.headUrl +"/api/village/detail";
    let params={
      id:id
    };
    wx.request({
      url: url,
      data:params,
      method:"get",
      success:function(res){
        console.log("乡村详情",res);
        if(res.data.code==200){
          let latitude ="markers[0].latitude";
          let longitude ="markers[0].longitude";
          let makerTitle ="markers[0].title";
           _this.setData({
             villageDetail:res.data.data,
             [latitude]: res.data.data.lat,
             [longitude]: res.data.data.lng,
             [makerTitle]: res.data.data.title
           });
          wx.setNavigationBarTitle({
            title: _this.data.villageDetail.title
          })

        }
      }
    })
  },
  reserve:function(){
    console.log("立即预定");
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