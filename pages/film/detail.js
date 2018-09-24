const filmServer = require('../../server/film.js');
const Animation = require('../../utils/animation');

// pages/film/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film: {},
    scaleAnim: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDetail(options.id);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },
  getDetail(id) {
    filmServer.getFilmDetail(id).then((data) => {
      const premiereAt = `${new Date(data.film.premiereAt).getMonth() + 1}月${new Date(data.film.premiereAt).getDate()}日`;
      data.film.displayPremiereAt = premiereAt;
      this.setData({ film: data.film });
    });
  },
  buy() {
    const scaleAnim = Animation.scaleAnim();
    this.setData({
      scaleAnim: scaleAnim.export(),
    });
    wx.showModal({
      title: '提示',
      content: '购买功能还没开发',
    });
  },
});
