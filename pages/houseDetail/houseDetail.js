//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    houseId:"",
    houseDetail:{},
    markers: [{
      iconPath: "/pages/img/icons/markers.png",
      id: 0,
      title: "",
      latitude: "",
      longitude: "",
      width: 25,
      height: 25
    }],
    applayDesign:{
      title:"",
      name:"",//姓名
      mobile:"", //手机号
      look_time:"", //看房日期
      other:"", //其它要求
      type:"" //类型
    },
    tabStatus:"1"
  },
  changeTab:function(e){
    let tabStatus = e.currentTarget.dataset.status;
    this.setData({
      tabStatus: tabStatus
    })
  },
  onLoad: function (option) {
    wx.showShareMenu({
      withShareTicket: true
    });
    let lookData ="applayDesign.look_time"
    this.setData({
      houseId:option.id,
      [lookData]: util.formatTime(new Date(),"onlyDate") 
    });
    this.getHoudeDetail();
    this.dialog = this.selectComponent('#dialog');
  },
  onShow: function () {
    this.getHoudeDetail()
  },
  onShareAppMessage: function (res) {
    let _title = this.data.houseDetail.title;
    return {
      title: _title
    }
  },
  handleMapTap:function(){
    let _this=this;
    var latitude = _this.data.houseDetail.lat
    var longitude = _this.data.houseDetail.lng
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {     
        wx.openLocation({
          latitude: +latitude,
          longitude: +longitude,
          name: _this.data.houseDetail.title,
          address: _this.data.houseDetail.address||"",
          scale: 28
        })
      }
    })  
  },
  getHoudeDetail:function(){
    let _this=this;
    let params={
      id: _this.data.houseId
    }
    if (wx.getStorageSync("openid")){
      params.openid = wx.getStorageSync("openid")
    }
    wx.request({
      url: api.headUrl +'/api/house/detail',
      data: params,
      method:"get",
      success:function(res){
        if(res.data.code==200){
          let latitude = "markers[0].latitude";
          let longitude = "markers[0].longitude";
          let makerTitle = "markers[0].title";
          let houseDetail=res.data.data;
          for (let key in houseDetail){
            if (key =="long_price"){
              houseDetail[key].forEach((cur,index,arr)=>{
                let obj={};
                obj.priceNum = cur.split("/")[0];
                obj.priceUnit = cur.split("/")[1];
                arr[index]=obj;
              })
            }
          }
           _this.setData({
             houseDetail: houseDetail,
             [latitude]: res.data.data.lat,
             [longitude]: res.data.data.lng,
             [makerTitle]: res.data.data.title
           });
          wx.setNavigationBarTitle({
            title: _this.data.houseDetail.title
          })
        }
      }
    })
  },
  handleFaviorite:function(e){
    let _this=this;
    let status = e.currentTarget.dataset.status;
    let changeStatus=null;
    if (status){
      changeStatus="2";
    }else{
      changeStatus="1"
    }
    util.checkLogin();
    let params={
      id: _this.data.houseId,
      type: changeStatus,
      openid: wx.getStorageSync("openid")
    }
   wx.request({
     url: api.headUrl +'/api/house/collection',
     method:"post",
     data:params,
     header: {
       Authorization: wx.getStorageSync("token")
     },
     success:function(res){
       if(res.data.code==200){
         _this.getHoudeDetail();
       }
     }
   })
  },
  bindInput:function(e){
    let inputLabel = e.currentTarget.dataset.name;
    this.setData({
      [inputLabel]: e.detail.value
    })
  },
  applyDesign:function(e){
    let _this=this;
    util.checkLogin();
    let dialogTitle ="applayDesign.title";
    let dialogType ="applayDesign.type"
    let status = e.currentTarget.dataset.status;
    let formTitle=null;
    if (status==1){
      formTitle="申请设计";
      this.setData({
        [dialogTitle]: "申请设计",
        [dialogType]: 1
      });
    } else if (status == 2){
      formTitle = "预约看房";
      this.setData({
        [dialogTitle]: "预约看房",
        [dialogType]: 2
      });
    }  
    wx.navigateTo({
      url: '/pages/applayDesign/applayDesign?formTitle=' + formTitle + "&houseId=" + _this.data.houseId + "&status=" + status,
    })
   // this.dialog.show();

  },
  goReserveDetail:function(){
    //立即预定 houseId
    util.checkLogin();
    wx.navigateTo({
      url: '/pages/reserveDetail/reserveDetail?id=' + this.data.houseId,
    })
  },
  okEvent:function(e){
    let _this=this;
    let url =api.headUrl+"/api/house/appointment";
    let params = _this.data.applayDesign;
    wx.request({
      url: url,
      data:params,
      method:"post",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success:function(res){
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              _this.dialog.close();
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

  }
})
