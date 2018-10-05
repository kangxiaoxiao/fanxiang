// pages/components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    starNum:{
      type:"Number",
      value:0
    },
    starTitle:{
      type:"String",
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function () {
    console.log("starNum",this.properties.starNum);
    console.log("starTitle",this.properties.starTitle);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
