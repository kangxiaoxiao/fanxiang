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
  getFilterParam(){
    let _this=this;
    wx.request({
      url: api.headUrl + '/api/house/getFilterParam',
      data:"",
      method:"get",
      success:function(res){
        if(res.data.code==200){
          console.log("获取筛选项成功", res.data.data);
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
          console.log("城市列表", cityListArray, cityListValueArray)
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
    console.log("params",params);
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
    console.log("请求房源列表的参数",params);
    wx.request({
      url: url,
      data:params,
      method:"post",
      success:function(res){
        wx.hideLoading();
        console.log("房源列表获取成功",res);
        _this.setData({
          houseList:res.data.data
        })
      },
      fail:function(){
        wx.hideLoading();
      }
    })
  },
  setBannerHeight: function (e) {
    console.log("设备高度", wx.getSystemInfoSync());
    var winWih = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度
    this.setData({
      Height: 2*winWih+"rpx"//设置高度
    })
  }, 
  changeTopBar:function(e){
    console.log("点击顶部tab");
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
    console.log("筛选按钮被点击", status);
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      curCityCode: this.data.cityListValueArray[e.detail.value].city_code
    });
    let curCityCode = this.data.curCityCode;
    console.log("选中的curCityCode", curCityCode);
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
    let houseId = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/houseDetail/houseDetail?id=' + houseId,
    })
  },
  goVillageDetal:function(e){
    console.log("跳转到详情",e.detail);
    let houseId = e.detail.id;
    wx.navigateTo({
      url: '/pages/houseDetail/houseDetail?id=' + houseId,
    })
  }
})
