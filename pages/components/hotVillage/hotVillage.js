// pages/components/hotVillage/hotVillage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    villageList: {// 属性名
      type: Array,// 类型（必填），类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []// 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    swiperHeight: {  // 属性名
      type: String,  // 类型（必填），类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ""     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    cityList: [], //城市列表
    curCityCode: "110100", //当前城市code,默认是北京
    villageList: [], //热门房源列表
    Height: "",     //这是swiper要动态设置的高度属性  
    animationData: {}, //动画
    showAnimate: false
  },
  ready:function(){
    console.log("cityList", this.properties.cityList);
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(e){
      let id = e.currentTarget.id;
      var myEventDetail = {
        id:id
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    swiperChange:function(e){
      console.log("轮播change");
      this.triggerEvent('animateStart', 0)
    },
    showUpDownAnimate: function (e,status) {
      console.log("动画开始加载时间触发");
      console.log(e.currentTarget.dataset.imageindex);
      let imageindex = e.currentTarget.dataset.imageindex;
      if (imageindex==0){
        this.triggerEvent('animateStart', 1)
      }
    },
  }
})
