// pages/components/hotVillage/hotVillage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // houseDetail: {
    //   type: Object,
    //   value: {}
    // },
    houseList:{
      type:Array,
      value:[],
      observer: function (newVal, oldVal, changedPath){
        let _this=this;
        if (!newVal){
          return ;
        }
        let _houseList = newVal;
        _houseList = newVal.map((cur, index, arr) => {
          cur.longPriceNum = cur.long_price.split('/')[0];
          cur.longPriceUnit = cur.long_price.split('/')[1];
          return cur;
        });
        _this.setData({
          _houseList: _houseList
        });
      }
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
    //_houseDetail:{}
    _houseList:[]
  },
 
  ready: function () {
      
  },


  /**
   * 组件的方法列表
   */
  methods: {
    goHousedetailEvent:function(e){
      var id = e.currentTarget.dataset.status;
      var myEventDetail = {
        "id": id
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('houseDetailEvent', myEventDetail, myEventOption)
    }
  }
})
