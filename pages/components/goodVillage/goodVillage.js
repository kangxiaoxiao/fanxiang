// pages/components/hotVillage/hotVillage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    houseDetail: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    houseDetail:{}
  },
  ready: function () {
    let _this=this;
    // _this.properties.houseList.map((cur,index,arr)=>{
    //   cur.longPriceNUm = cur.long_price.split('/')[0];
    //   cur.longPriceUnit = cur.long_price.split('/')[1];
    //   return cur;
    // });
    _this.properties.houseDetail.longPriceNUm = _this.properties.houseDetail.long_price.split('/')[0];
    _this.properties.houseDetail.longPriceUnit = _this.properties.houseDetail.long_price.split('/')[1];
    _this.setData({
      houseDetail: _this.properties.houseDetail
    })
    
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      console.log("跳转到房源详情触发");
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {
        capturePhase:true
      } // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
