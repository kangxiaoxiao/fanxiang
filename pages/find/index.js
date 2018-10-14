//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
Page({
  data:{
    villageList:[]
  },
  onLoad:function(){
    this.getVillageList();
  },
  //获取村庄列表
  getVillageList(){
    let _this=this;
    let params={};
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.headUrl + '/api/village',
      method: 'get',
      data: params,
      header: {},
      success: function (res) {
        wx.hideLoading();
        if(res.data.code==200){
          _this.setData({
            villageList:res.data.data
          })
        }
      }
    })  
  },
  //点击顶部tab
  handleTopBtnStatusChange:function(e){
    let status = e.currentTarget.dataset.status;
    let url="";
    if (status==0){
      url ="/pages/buyHouse/buyHouse"
    } else if (status == 1){
      url = "/pages/rentHouse/rentHouse"
    } else if (status == 2){
      url = "/pages/makeMoney/makeMoney"
    }
    wx.navigateTo({
      url: url
    })
  },
  errLoadImg(event){
    var index = event.currentTarget.dataset.index
    var img = 'villageList[' + index + '].banner_img'
    this.setData({
      [img]: '/pages/img/find/defaultImg.jpg'
    })  
  },
  goVillageDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/villageDetail/villageDetail?id=' + id,
    })
    // wx.navigateTo({
    //   url: '/pages/houseDetail/houseDetail?id=' + id,
    // }) 

    
  }
})