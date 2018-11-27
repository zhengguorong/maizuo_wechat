const infoServer = require('../../server/info.js');
const filmServer = require('../../server/film.js');

// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    playingFilms: [],
    comingFilms: [],
    test: 'test',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const pageMethods = [];
    for (const key in this) {
      if (typeof this[key] === 'function') {
        pageMethods.push(key);
      }
    }
    const pageData = [];
    for (const key in this.data) {
      if (key !== '__webviewId__') {
        pageData.push(key);
      }
    }
    this.setData({ pageMethods, pageData, route: this.route });
    this.getBanner();
    this.getPlayingFilm();
    this.getComingFilm();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },
  // 获取滚动广告
  getBanner() {
    return infoServer.getHomeBanner().then((data) => {
      this.setData({ imgUrls: data });
    });
  },
  // 获取正在热映电影列表
  getPlayingFilm() {
    filmServer.getNowPlaying(1, 5).then((data) => {
      this.setData({ playingFilms: data.films });
    });
  },
  // 获取即将上映电影列表
  getComingFilm() {
    return filmServer.getComingSoon(1, 5).then((data) => {
      data.films.forEach((film) => {
        const displayDate = `${new Date(film.premiereAt).getMonth() + 1}月${new Date(film.premiereAt).getDate()}日`;
        film.displayDate = displayDate;
      });
      this.setData({ comingFilms: data.films });
      // const newArray = this.copyArray(10, data.films);
      // for (let i = 0; i < 100; i++) {
      //   const startTime = Date.now();
      //   this.setData({ comingFilms: newArray }, () => {
      //     console.log(Date.now() - startTime, 'durTime');
      //   });
      // }

    });
  },
  resetData() {
    // const newArray = this.copyArray(2, this.data.comingFilms);
    const originObj = this.data.comingFilms;
    originObj[0].id = 233333;
    const startTime = Date.now();
    this.setData({ comingFilms: originObj }, () => {
      console.log(Date.now() - startTime, 'durTime');
    });
  },
  copyArray(count, originArray) {
    const newArray = [];
    for (let i = 0; i < count; i++) {
      originArray.forEach(item => newArray.push(item));
    }
    return newArray;
  },

  toBannerDetail() {
    wx.showModal({
      title: '提示',
      content: '因打开webview控件需要加入白名单，这里就不做跳转了',
    });
  },
});
