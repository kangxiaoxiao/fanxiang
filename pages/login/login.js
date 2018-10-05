// pages/login/login.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    loginLoading:false,
    form:{
      mobile:"",
      code:"",
      openid:""
    }
  },
  userTelInput: function (e) {
    console.log(e.detail.value);
    let userTel = 'form.mobile';
    this.setData({
      [userTel]: e.detail.value
    })
  },
  codeInput: function (e) {
    console.log(e.detail.value);
    let userTel = 'form.code';
    this.setData({
      [userTel]: e.detail.value
    })
  },
  getCode:function () {
    let _this=this;
    let url = api.headUrl +"/api/user/sendVerifyCode";
    let params={
      "mobile": _this.data.form.mobile
    };
    if (!params.mobile){
      wx.showToast({
        title: "手机号码不能为空",
        icon: "none",
        success: function () {
          setTimeout(function () {
            wx.hideToast();
          }, 3000)
        }
      });
      return false;
    }else{
      _this.setData({
        loading: true
      });
    }
    wx.request({
      url: url,
      data: params,
      success:function(res){
        _this.setData({
          loading: false
        });
        if(res.data.code==200){

        }else{
          wx.showToast({
            title:"请输入正确的手机号",
            icon:"none",
            duration:0,
            success:function(){
              setTimeout(function(){
                wx.hideToast();
              },3000)
            }
          })
          
        }
        console.log("获取验证码返回",res);
      }
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //拿到code码 => 通过code码拿用户id =>登录
    let openid="";
    let _this=this;
    // const wxCode = new Promise(function(reslove,reject){
    //   wx.login({
    //     success: function (res) {
    //       return res.code;
    //     }
    //   });
    // });
    // const openId = new Promise(function(resolve,reject){
    //   wxCode.then(function (res) {
    //     let code = res.code;
    //     let url = api.headUrl + "/api/wx/getOpenid";
    //     let params = {
    //       "code": code
    //     };
    //     wx.request({
    //       url: url,
    //       data: params,
    //       method: "post",
    //       success: function (res) {
    //         if (res.data.code == 200) {
    //            resolve(res.data.data)
    //         }
    //       }
    //     })
    //   })
    // });
    let msg="";
    if (!_this.data.form.mobile){
      msg ="手机号码不能为空";
    } else if (!_this.data.form.code){
      msg = "验证码不能为空";
    }
    console.log("msg",msg);
    if (msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        success: function () {
          setTimeout(function () {
            wx.hideToast();
          }, 3000)
        }
      });
      return false;
    } else {
      _this.setData({
        loginLoading: true
      });
    }
    wx.login({
      success:function(res){
        console.log("拿到用户的code码",res);
        let code=res.code;
        let url = api.headUrl+"/api/wx/getOpenid";
        let params={
          "code": code
        };
        wx.request({
          url: url,
          data:params,
          method: "post",
          success:function(res){
            if(res.data.code==200){
              let openid ="form.openid";
              _this.setData({
                [openid]:res.data.data
              });
              let loginParams=_this.data.form;
              let loginUrl = api.headUrl + "/api/user/quickLogin";
              console.log("快捷登录的参数", loginParams);
              wx.request({
                url: loginUrl,
                data: loginParams,
                method:"post",
                success:function(res){
                  console.log("快捷登录的返回",res);
                  _this.setData({
                    loginLoading: false
                  });
                  if(res.data.code==200){
                    wx.setStorage({
                      key:"token",
                      data:res.data.data,
                      success:function(){
                        console.log("token存储成功");
                        wx.navigateBack({
                          delta:1
                        });
                      }
                    });
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: "none",
                      success: function () {
                        setTimeout(function () {
                          wx.hideToast();
                        }, 3000)
                      }
                    });
                  }
                }
              })
            }
          }
        })
      }
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: "token",
    //   success: function (res) {
    //     console.log("存储在本地的token", res); 
    //   }
    // });
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