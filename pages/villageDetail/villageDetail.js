// pages/villageDetail/villageDetail.js
const app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId:"",
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
    wx.showShareMenu({
      withShareTicket: true
    });
     console.log("options",options);
    let id = options.id;
    this.setData({
      houseId:id
    });
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
  onShareAppMessage: function (res) {
    let _title = this.data.villageDetail.title;
    return {
      title: _title,
      success: function (res) {
        console.log(res.shareTickets[0])
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
  reserve:function(){
    console.log("立即预定");
    let _this=this;
    util.checkLogin();
    wx.navigateTo({
      url: '/pages/reserveDetail/reserveDetail?id=' + _this.data.houseId,
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

  }
})