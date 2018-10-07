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
    
  }
})
