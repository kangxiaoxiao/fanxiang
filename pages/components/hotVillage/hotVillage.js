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
  },
  ready:function(){
    console.log("cityList", this.properties.cityList);
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
