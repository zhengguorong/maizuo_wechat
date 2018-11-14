const infoServer = require('../../server/info.js');
const filmServer = require('../../server/film.js');

const pageTrack = [
  {
    element: '.playing-item',
    datas: ['imgUrls', 'playingFilms']
  },
  {
    element: '.more',
    datas: ['imgUrls', 'playingFilms']
  }
]
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    playingFilms: [],
    comingFilms: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getBanner();
    this.getPlayingFilm();
    this.getComingFilm();
  },
  catchPageTap(e) {
    const {x, y} = e.detail; // 点击的x y坐标
    console.log(x, y);
    pageTrack.forEach((track) => {
      const query = wx.createSelectorQuery()
      const elementName = track.element;
      query.select(elementName).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        const {left, right, top, width, height} = res[0]
        const { scrollTop } = res[1]
        console.log(res[0])
        console.log(res[1])
        if (left < x && x < right && scrollTop + Math.abs(top) < y && y < scrollTop + Math.abs(top) + height) {
          console.log('元素被点击')
        }
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },
  // 获取滚动广告
  getBanner() {
    infoServer.getHomeBanner().then((data) => {
      this.setData({ imgUrls: data.billboards });
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
    });
  },
  toBannerDetail() {
    wx.showModal({
      title: '提示',
      content: '因打开webview控件需要加入白名单，这里就不做跳转了',
    });
  },
});
