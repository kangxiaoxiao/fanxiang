// pages/reserveDetail/reserveDetail.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId:"",
    houseDetail:"",
    _starDate:"", //不处理的日期格式
    startDate:"", //入住开始时间
    startDateDay:"",//周几
    dayNum:1, //住多少天
    _endDate:"",//不处理的日期格式
    endDate:"",//离开时间
    endDayDateDay:"",//周几
    reserveNum:1, //预定套数
    reservePersonNum:1, //入住人数
    reserveName:"" , //预约人姓名
    reserveTel:"", //手机号
    total:"",
    pickerRange:{}
  },
  selectDate:function(e){
    let _this = this;
    let disable_time = e.currentTarget.dataset.disabletime;
    wx.navigateTo({
      url: '/pages/datePicker/datePicker?disable_time=' + disable_time + "&houseid=" + _this.data.houseId,
    })
  },
  handleDayNum:function(){
    let _this=this;
    let dayNum = 0;
    let startDate = new Date(_this.data._starDate);
    let endDate = new Date(_this.data._endDate);
    if (startDate.getTime() < endDate.getTime()) {
      dayNum = parseInt((endDate.getTime()-startDate.getTime()) / (24 * 60 * 60 * 1000));
    };
    _this.setData({
      dayNum: dayNum
    })
  },
  bindStartDateChange:function(e){
    let _this=this;
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let starDay = new Date(e.detail.value);   
    this.setData({
      startDate: util.formatTime(starDay, "onlyDate", "en"),
      startDateDay: weekArr[starDay.getDay()],
      _starDate: util.formatTime(starDay, "onlyDate"),
    });
    // this.handleDateRange();
    this.handleDayNum();
    this.getTotal();
    // this.setData({
    //   startDate: e.detail.value
    // })
  },
  bindEndDateChange: function (e) {
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let endDay = new Date(e.detail.value);
    this.setData({
      endDate: util.formatTime(endDay, "onlyDate", "en"),
      endDateDay: weekArr[endDay.getDay()],
      _endDate: util.formatTime(endDay, "onlyDate"),
    });
    // this.handleDateRange();
    this.handleDayNum();
    this.getTotal();
    // this.setData({
    //   endDate: e.detail.value
    // })
  },
  handleReserveNum:function(e){
    let _this=this;
    let _type = e.currentTarget.dataset.type;
    let reserveNum = _this.data.reserveNum;
    if (_type=="add"){
      reserveNum++;
    } else if (_type =="reduce"){
      if (reserveNum>1){
        reserveNum--;
      }
    }
    _this.setData({
      reserveNum: reserveNum
    });
    this.getTotal();
  },
  handlePersonNUm: function (e) {
    let _this = this;
    let _type = e.currentTarget.dataset.type;
    let reservePersonNum = _this.data.reservePersonNum;
    if (_type == "add") {
      reservePersonNum++;
    } else if (_type == "reduce") {
      if (reservePersonNum > 1) {
        reservePersonNum--;
      }
    }
    _this.setData({
      reservePersonNum: reservePersonNum
    });
  },
  handleBindInput:function(e){
    let inputLabel = e.currentTarget.dataset.name
    this.setData({
      [inputLabel]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;   
    util.checkLogin();
    let houseId = options.id;
    this.setData({
      houseId: houseId
    })
    this.getHoudeDetail();
    if (options.timeStr){
      this.bindDateChange(JSON.parse(options.timeStr));
    }
    
  },
  bindDateChange: function (dayStr) {
    let _this = this;
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let starDay = new Date(dayStr[0].day);
    let endDay = new Date(dayStr[1].day);
    this.setData({
      startDate: util.formatTime(starDay, "onlyDate", "en"),
      startDateDay: weekArr[starDay.getDay()],
      _starDate: util.formatTime(starDay, "onlyDate"),
      endDate: util.formatTime(endDay, "onlyDate", "en"),
      endDateDay: weekArr[endDay.getDay()],
      _endDate: util.formatTime(endDay, "onlyDate"),
    });
    // this.handleDateRange();
    this.handleDayNum();
    this.getTotal();
    // this.setData({
    //   startDate: e.detail.value
    // })
  },
  getHoudeDetail:function(){
    let _this=this;
    wx.request({
      url: api.headUrl +'/api/house/detail',
      data: { id: _this.data.houseId},
      success:function(res){
         if(res.data.code==200){
           let houseDetail=res.data.data;
           houseDetail.disable_time = houseDetail.disable_time.join(",");
           _this.setData({
             houseDetail: houseDetail
           });
           _this.getTotal();
         }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this=this;
    let today=new Date();
    let tomorrow = new Date(today.getTime()+24*60*60*1000);
    let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
     this.setData({
       _starDate: _this.data._starDate||util.formatTime(today, "onlyDate"),
       _endDate: _this.data._endDate ||util.formatTime(tomorrow, "onlyDate"),
       startDate: _this.data.startDate ||util.formatTime(today, "onlyDate", "en"),
       startDateDay: _this.data.startDateDay ||weekArr[today.getDay()],
       endDate: _this.data.endDate ||util.formatTime(tomorrow, "onlyDate","en"),
       endDateDay: _this.data.endDateDay ||weekArr[tomorrow.getDay()]
     });
    // this.handleDateRange();
    
  },
  getTotal(){
    let total=0;
    let _this=this;
    total = +(_this.data.houseDetail.short_price) * _this.data.reserveNum * _this.data.dayNum;
    _this.setData({
      total: total
    });
  },
  //支付流程  先下单，生成订单号。再唤起支付
  submit:function(){
    util.checkLogin();
    let _this=this;
    let url = api.headUrl + "/api/order/add";
    let params = {
      house_id: _this.data.houseId,
      start_time: _this.data._starDate,
      end_time: _this.data._endDate,
      house_total: _this.data.reserveNum,
      people_total: _this.data.reservePersonNum,
      name: _this.data.reserveName,
      mobile: _this.data.reserveTel,
      days: _this.data.dayNum //住几晚
    }
    if (!_this.data.reserveName) {
      util.showToast("请填写预约人姓名");
      return false;
    }
    if (!_this.data.reserveTel) {
      util.showToast("请填写手机号");
      return false;
    }
    if (!_this.data.dayNum){
      util.showToast("离开时间必须大于开始时间");
      return false;
    }
    wx.request({
      url: url,
      data: params,
      method: "post",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function (res) {
        if (res.data.code == 200) {
          let orderId=res.data.data;
          _this.pay(orderId);
        }else{
          util.showToast(res.data.msg);
        }
      }
    })
   
  },
  pay: function (orderId){
     let _this=this;
    let url = api.headUrl +"/api/wx/pay";
     wx.request({
       url: url,
       data: { order_id:orderId},
       header: {
         Authorization: wx.getStorageSync("token")
       },
       method: "post",
       success:function(res){
         if(res.data.code==200){
           let wxPayConsult=res.data.data;
           wx.requestPayment({
             timeStamp: wxPayConsult.timestamp,
             nonceStr: wxPayConsult.nonceStr,
             package: wxPayConsult.package,
             signType: wxPayConsult.signType,
             paySign: wxPayConsult.paySign,
             success:function(res){
               wx.showToast({
                 title: "支付成功",
                 success: function (res) {
                   setTimeout(function () {
                     wx.navigateTo({
                       url: '/pages/orderList/orderList?type=1&orderId=' + orderId,
                     })
                     wx.hideToast();
                   }, 1500)
                 }
               })
             },
             fail:function(err){
               wx.showToast({
                 title: "支付失败",
                 icon:'cancel',
                 success: function (res) {
                   setTimeout(function () {
                     wx.navigateTo({
                       url: '/pages/orderList/orderList?type=0&orderId='+orderId,
                     })
                     wx.hideToast();
                   }, 1500)
                 }
               }) 
             }
           })
         }else{
           util.showToast(res.data.msg);
         }
       }
     })
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