const filmServer = require('../../server/film.js')
// pages/film/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },
  getDetail: function (id) {
    filmServer.getFilmDetail(id).then(data => {
      let premiereAt = new Date(data.film.premiereAt).getMonth() + 1 + '月' + new Date(data.film.premiereAt).getDate() + '日'
      data.film.displayPremiereAt = premiereAt
      this.setData({film: data.film})
    })
  },
  buy: function () {
    wx.showModal({
      title: '提示',
      content: '购买功能还没开发'
    })
  }
})