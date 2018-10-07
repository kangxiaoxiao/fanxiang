//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    newsList:[]
  },
  onLoad:function(){
    this.getNewsList()
  },
  getNewsList:function(){
    let _this=this;
    wx.request({
      url: api.headUrl +'/api/news',
      success:function(res){
        if(res.data.code==200){
          _this.setData({
            newsList: res.data.data
          }) 
        }     
      }
    })
  },
  goNewsDetail:function(e){
    wx.navigateTo({
      url: '/pages/article/article?url=' + e.currentTarget.dataset.url,
    })
  }
})