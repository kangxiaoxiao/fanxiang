// pages/components/hotVillage/hotVillage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    houseDetail: {
      type: Object,
      value: {}
    },
    topBarStatus:{
      type:String, //0=>热门推荐 1=>精品民宿 2=>乡村民宿 
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _houseDetail:{}
  },
  ready: function () {
    let _this=this;
    console.log("topBarStatus", this.properties.topBarStatus); 
    // _this.properties.houseList.map((cur,index,arr)=>{
    //   cur.longPriceNUm = cur.long_price.split('/')[0];
    //   cur.longPriceUnit = cur.long_price.split('/')[1];
    //   return cur;
    // });
    let obj = _this.properties.houseDetail.long_price ;
    _this.properties.houseDetail.longPriceNum = obj.split('/')[0];
    _this.properties.houseDetail.longPriceUnit = obj.split('/')[1];
    console.log("houseDetail", _this.properties.houseDetail)
    _this.setData({
      _houseDetail: _this.properties.houseDetail
    })
    
  },


  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
