// pages/applayDesign/applayDesign.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formTitle:"",
    houseId:"",
    applayDesign: {
      title: "",
      name: "",//姓名
      mobile: "", //手机号
      look_time: "", //看房日期
      other: "", //其它要求
      type: "" //类型
    },
  },
  bindInput: function (e) {
    let inputLabel = e.currentTarget.dataset.name;
    this.setData({
      [inputLabel]: e.detail.value
    })
  },
  submit: function (e) {
    let _this = this;
    let url = api.headUrl + "/api/house/appointment";
    let params = _this.data.applayDesign;
    wx.request({
      url: url,
      data: params,
      method: "post",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
                wx.hideToast();
              }, 3000)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            success: function () {
              setTimeout(function () {
                wx.hideToast();
              }, 3000)
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //status
    let formType ="applayDesign.type";
    this.setData({
      formTitle: options.formTitle,
      [formType]:options.status
    })
    wx.setNavigationBarTitle({
      title: options.formTitle
    });
    let lookData = "applayDesign.look_time"
    this.setData({
      houseId: options.houseId,
      [lookData]: util.formatTime(new Date(), "onlyDate")
    });
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