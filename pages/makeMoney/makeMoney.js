const app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    token: "",
    loading:false,
    showDialog:true,
    region: [],
    picStatus:"",
    form: {
      name: "",
      tel: "",
      idCard:"",
      other: "",
      picture1:"", //正面照
      picture2: "", //背面照
      picture3: "",//手持身份证招
      openBank:"", //开户行
      bankNum:"", //卡号
      bankCardName:"", //开户人姓名
      region:"", //代理区域
      hintDetailList:[]
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
    this.getHintDetail();
  },
  onReady: function () {
    this.dialog = this.selectComponent('#dialog');
    this.dialog.show();
  },
  getHintDetail:function(){
    let _this=this;
    wx.request({
      url: api.headUrl +'/api/agent/hint',
      success:function(res){
         _this.setData({
           hintDetailList:res.data.data
         })
      }
    })
  },
  okEvent: function () {
    //console.log(this.dialog.data.okText);
    this.dialog.close();
  },
  loadImage:function(e){
    let status = e.currentTarget.dataset.status;
    let _this=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("选择照片成功",res);
        let imageUrl="";
        if (status==0){
          imageUrl ="form.picture1"
        } else if (status == 1){
          imageUrl = "form.picture2"
        } else if (status == 2){
          imageUrl = "form.picture3"
        }
        _this.setData({
          picStatus: status
        });
        let tempFilePaths = res.tempFilePaths
        _this.uploadFile(tempFilePaths,imageUrl);
      }
    })
  },
  uploadFile: function (tempFilePaths, imageUrl){
    let _this=this;
    wx.uploadFile({
      url: api.headUrl +"/api/wx/upload", //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'img',
      success(res) {
          _this.setData({
            picStatus: ""
          });
          _this.setData({
            [imageUrl]: api.imgHeadUrl +"/"+ JSON.parse(res.data).data
          })
      },
      fail:function(err){
         console.log("上传失败",err);  
      }
    })
  },
  //区域选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    const region = "form.region";
    this.setData({
      [region]: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let _this = this;
    _this.setData({
      loading: true
    });
    let formMsg = e.detail.value;
    let url = api.headUrl + "/api/agent/apply";
    let params = {
      "name": formMsg.name,
      "mobile": formMsg.tel,
      "identity": formMsg.idCard,
      "front_identity": _this.data.form.picture1,
      "other_identity": _this.data.form.picture2,
      "hand_identity": _this.data.form.picture3,
      "bank_card": formMsg.bankNum,
      "bank": formMsg.openBank,
      "bank_name": formMsg.bankCardName,
      "city_name": formMsg.area
    };
    wx.request({
      url: url,
      data: params,
      header: {
        Authorization: _this.data.token
      },
      method: "post",
      success: function (res) {
        console.log(res);
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