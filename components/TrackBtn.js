// components/TrackBtn.js
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
    name: 'zhengguorong'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _test1: function () {
      this.setData({
        name:'good zheng'
      })
      console.log('com method test');
    }
  }
})