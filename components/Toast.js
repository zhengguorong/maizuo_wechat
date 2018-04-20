// components/Toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    context: '蟹老板的toast',
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * context 显示内容
     * millisec 显示时长（毫秒）
     */
    show: function (context, millisec) {
      this.setData({ context: context, isShow: true })
      setTimeout(() => {
        this.setData({ isShow: false })
      }, millisec)
    },
    hide: function () {
      this.setData({ isShow: false })
    }
  }
})
