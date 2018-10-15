const app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    loading: false,
    region: [],
    token: "",
    form: {
      status: 1, //  1=> 公司 2=>个人
      companyName: "", //公司名称
      designName:"", //联系人
      tel:"", //联系方式
      discussTime:"", //洽谈时间
      other: ""
    }
  },
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        _this.setData({
          token: res.data
        })
      },
      fail: function () {
        wx.navigateTo({
          url: '../../login/login',
        })
      }
    });
  },
  //公司 or 个人
  handleStatusChange: function (e) {
    const formStatus = "form.status";
    var status = e.currentTarget.dataset.status;
    this.setData({
      [formStatus]: status
    });
  },
  formSubmit: function (e) {
    let _this = this;
    util.checkLogin();
    _this.setData({
      loading: true
    });
    let formMsg = e.detail.value;
    let url = api.headUrl + "/api/house/rentBuy";
    let params = formMsg;
    wx.request({
      url: url,
      data: params,
      header: {
        Authorization: wx.getStorageSync("token")
      },
      method: "post",
      success: function (res) {
        _this.setData({
          loading: false
        })
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              setTimeout(function () {
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
})