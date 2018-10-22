//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    topBarStatus: "0",
    cityListArray:[], //城市列表
    cityListValueArray:[],
    curCityCode:"110100", //当前城市code,默认是北京
    villageList:[], //热门房源列表
    Height: "",     //这是swiper要动态设置的高度属性  
    goodVillageheight: "432rpx",
    index: 0, //当前选中的城市
    filterParams:{}, //筛选项
    condition:{
      city_code:"", //城市
      type:"", //筛选
      sort_type:"" //排序
    },
    conditionTabStatus:"",
    houseList:[], //房源列表
    animationData:{}, //动画
    showAnimate:false,
    hideAnimateLocal:true,
  },
  onLoad: function () {
    this.setBannerHeight();
    //获取城市列表
    this.getCityList();
    //获取热门房源
    let curCityCode = this.data.curCityCode;
    this.getHotVillageList(curCityCode);
    //获取筛选项
    this.getFilterParam();    
  },
  onShow:function(){
    
  },
  onReady:function(){
    //监听页面初次渲染完成
  },
  showUpDownAnimate:function(e){
    let _this = this;
    _this.setData({
      showAnimate:true,
      hideAnimateLocal: wx.getStorageSync("hideAnimateLocal")
    });
    var animation = wx.createAnimation({
      timingFunction: 'ease-out',
    })
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    var n = 1;
    let animateExport = setInterval(function () {
      n = -n;
      this.animation.translateY(10 * (n)).step()
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 500);
    setTimeout(function () {
      clearInterval(animateExport);
      _this.setData({
        showAnimate: false
      })
      wx.setStorageSync("hideAnimateLocal",false);
    }, 5000)
    if (e.detail == 0) {
      clearInterval(animateExport);
      _this.setData({
        showAnimate: false
      })
      wx.setStorageSync(hideAnimateLocal, false);
    }
  },
  pickupFilter:function(e){
    let status = e.currentTarget.dataset.status;
    if (!status){
      return ;
    }
    if (status){
      status=""
    }
    this.setData({
      conditionTabStatus: status
    })
  },
  getFilterParam(){
    let _this=this;
    wx.request({
      url: api.headUrl + '/api/house/getFilterParam',
      data:"",
      method:"get",
      success:function(res){
        if(res.data.code==200){
          _this.setData({
            filterParams:res.data.data
          })
        }
      }
    })
  },
  getCityList(){
    let params={};
    let _this=this;
    wx.request({
      url: api.headUrl + '/api/home/cityList',
      method: 'get',
      data: params,
      header: {},
      success: function (res) {
        if(res.data.code==200){
          let cityListValueArray =res.data.data;
          // let cityListValueArray =[
          //   {
          //     "city_name": "北京市市辖区",
          //     "city_code": "110100"
          //   },
          //   {
          //     "city_name": "石家庄市",
          //     "city_code": "130100"
          //   },
          //   {
          //     "city_name": "太原市",
          //     "city_code": "140100"
          //   }
          // ];
          let cityListArray=[];
          cityListValueArray.forEach((cur, index, arr) => {
             cityListArray.push(cur.city_name);
          })
          _this.setData({
            cityListArray: cityListArray,
            cityListValueArray: cityListValueArray
          })
        }   
      }
    })
  },
  getHotVillageList: function (city_code) {
    let _this=this;
    wx.showLoading({
      title: '加载中',
    });
    let params={
      "city_code":city_code
    };
    _this.setData({
      villageList: []
    });
    wx.request({
      url: api.headUrl + '/api/home',
      method: 'get',
      data: params,
      header: {},
      success: function (res) { 
        wx.hideLoading();    
        if(res.data.code==200){
          _this.setData({
            villageList: res.data.data
          });
        }
      },
      fail:function(){
        wx.hideLoading(); 
      }
    })
  },
  getHouseList(){
    let _this=this;
    wx.showLoading({
      title:"加载中"
    });
    let url = api.headUrl +"/api/house/list";
    let params={
      category_id: _this.data.topBarStatus,
      type: _this.data.condition.type,
      city_code: _this.data.condition.city_code,
      sort_type: _this.data.condition.sort_type,
    };
    wx.request({
      url: url,
      data:params,
      method:"post",
      success:function(res){
        wx.hideLoading();
        if(res.data.code==200){
          _this.setData({
            houseList: res.data.data
          });
        } 
      },
      fail:function(){
        wx.hideLoading();
      }
    })
  },
  setBannerHeight: function (e) {
    var winWih = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度
    this.setData({
      Height: winWih+"px"//设置高度
    })
  }, 
  changeTopBar:function(e){
    this.setData({
      topBarStatus: e.currentTarget.dataset.status
    })
    //获取精品民宿列表
    if (this.data.topBarStatus!=0){
      this.getHouseList();
      // wx.navigateTo({
      //   url: '/pages/goodHose/goodHouse',
      // })
    }  
    
  },
  tapName: function (e) {
    let tabStatus;
    let status = e.currentTarget.dataset.status;
    if (this.data.conditionTabStatus && this.data.conditionTabStatus == status){
      tabStatus="";
    }else{
      tabStatus = status;
    }
    this.setData({
      conditionTabStatus: tabStatus
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      index: e.detail.value,
      curCityCode: this.data.cityListValueArray[e.detail.value].city_code
    });
    let curCityCode = this.data.curCityCode;
    this.getHotVillageList(curCityCode);
  },
  handleCity:function(e){
    //当前是在城市
    let cityCodeStr = "condition.city_code";
    let conditionType = "condition.type";
    let sortType = "condition.sort_type";
    let city_code = e.currentTarget.dataset.citycode;
    this.setData({
      [cityCodeStr]: city_code,
      [conditionType]: "",
      [sortType]: "",
      conditionTabStatus: ""
    });
    if (this.data.topBarStatus != 0) {
      this.getHouseList();
    } 
    
  },
  handleType:function(e){
    //当前是筛选
    let cityCodeStr = "condition.city_code";
    let conditionType = "condition.type";
    let sortType = "condition.sort_type";
    let typeValue = e.currentTarget.dataset.value;
    this.setData({
      [conditionType]: typeValue,
      [cityCodeStr]:"",
      [sortType]:"",
      conditionTabStatus:""
    });
    if (this.data.topBarStatus != 0) {
      this.getHouseList();
    } 
    
  },
  handleSort: function (e) {
    //当前是筛选
    let cityCodeStr = "condition.city_code"; 
    let conditionType = "condition.type"; 
    let sortType = "condition.sort_type";
    let typeValue = e.currentTarget.dataset.value;
    this.setData({
      [cityCodeStr]:"",
      [conditionType]:"",
      [sortType]: typeValue,
      conditionTabStatus: ""
    });
    if (this.data.topBarStatus != 0) {
      this.getHouseList();
    } 
  },
  //跳转到详情
  goHouseDetail: function (e) {
    let houseId = e.detail.id;
    wx.navigateTo({
      url: '/pages/houseDetail/houseDetail?id=' + houseId,
    })
  },
  goVillageDetal:function(e){
    let houseId = e.detail.id;
    wx.navigateTo({
      url: '/pages/houseDetail/houseDetail?id=' + houseId,
    })
  }
})
