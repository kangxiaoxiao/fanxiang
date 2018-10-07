// pages/components/dialog/dialog.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: "String",
      value: ""
    },
    footer: {
      type: "String",
      value: ""
    },
    showDialog: {
      type: "Boolean",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function () {
      this.setData({
        isShow: true
      })
    },
    close: function () {
      this.setData({
        isShow: false
      })
    },
    _cancelEvent: function () {
      this.triggerEvent('cancelEvent');
    },
    _okEvent: function () {
      console.log("事件触发");
      this.triggerEvent('okEvent');
    }
  }
})
