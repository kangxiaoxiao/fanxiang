const app = getApp();
var api = require('../../utils/api.js');
Page({
  data:{
    loading:false,
    region:[],
    token:"",
    form:{
       region:"",
       status:1, //  1=> 买房 2=>租房
       price:"", //预算价格
       tel:"",
       other:""
    }   
  },
  onLoad: function (options) {
    let _this=this;
    wx.getStorage({
      key: "token",
      success: function (res) {
         _this.setData({
           token:res.data
         }) 
      },
      fail:function(){
        wx.navigateTo({
          url: '../../login/login',
        })
      }
    });
  },
  //区域选择
  bindRegionChange:function(e){
    const region ="form.region";
    this.setData({
      [region]: e.detail.value
    })
  },
  //买房 or 租房
  handleStatusChange:function(e){
    const formStatus = "form.status";
    var status = e.currentTarget.dataset.status;
    this.setData({
      [formStatus]: status
    });
  },
  formSubmit: function (e) {
    let _this=this;
    _this.setData({
      loading:true
    });
    let formMsg = e.detail.value;
    let url = api.headUrl +"/api/house/rentBuy";
    let params={
      "city_name": formMsg.region.join(","),
      "budget": formMsg.price,
      "type": formMsg.status,
      "mobile": formMsg.tel,
      "other": formMsg.other
    };
    wx.request({
      url: url,
      data: params,
      header:{
        Authorization: _this.data.token
      },
      method:"post",
      success:function(res){
        _this.setData({
          loading: false
        })
        if(res.data.code==200){
          wx.showToast({
            title: '提交成功',
            success:function(){
              setTimeout(function(){
                wx.hideToast();
              },3000)  
            }
          })
        }else{
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