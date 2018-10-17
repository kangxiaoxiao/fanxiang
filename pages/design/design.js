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
      other: "", //备注
      date:"",//洽谈日期
      time:""  //洽谈时间
    },
    formStartDate:""
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
          url: '/pages/login/login',
        })
      }
    });
    let tomorrow = new Date(new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 24 * 60 * 60 * 1000);
    _this.setData({
      formStartDate: util.formatTime(tomorrow, "onlyDate")
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
  bindDateChange:function(e){
    const _date= "form.date";
    this.setData({
      [_date]: e.detail.value
    })
  },
  bindTimeChange:function(e){
    const _time = "form.time";
    this.setData({
      [_time]: e.detail.value
    })
  },
  formSubmit: function (e) {
    let _this = this;
    if (!wx.getStorageSync("token")){
      util.checkLogin();
      return false;
    }
    
    let formMsg = e.detail.value;
    let url = api.headUrl + "/api/designer/add";
    let msg="";
    if (formMsg.status == 1 && !formMsg.companyName){     
        msg="请输入公司名称"   
    }else if (!formMsg.designName){
      msg = "请输入联系人"
    }else if (!formMsg.tel){
      msg="请输入联系方式"
    } else if (!formMsg.date){
      msg="请选择洽谈日期"
    } else if (!formMsg.time) {
      msg = "请选择洽谈时间"
    }
    if(msg){
      util.showToast(msg);
      return false;
    }else{
      _this.setData({
        loading: true
      });
    }
    let talk_time = formMsg.date + " " + formMsg.time;
    let params = {
      type: formMsg.status, // 1=>公司 2=>个人
      contact: formMsg.designName,
      contact_mobile: formMsg.tel,
      talk_time: talk_time,
      remark: formMsg.other
    };
    if (formMsg.status==1){
      params.company_name=formMsg.companyName
    };
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