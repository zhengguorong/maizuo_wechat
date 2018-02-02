// pages/film/list.js
const filmServer = require('../../server/film.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playingFilms: [],
    comingFilms: [],
    filmType: 'playing',
    page: 1,
    count: 7
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ filmType: options.type})
    this.getFilms()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },
  loadMore: function () {
    this.setData({page: this.data.page + 1})
    this.getFilms()
  },
  /**
   * 根据类型获取电影列表 type为playing和coming
   */
  getFilms: function() {
    let filmType = this.data.filmType
    let page = this.data.page
    let count = this.data.count
    if (filmType === 'playing') {
      this.getPlayingFilm(page, count)
    } else {
      this.getComingFilm(page, count)
    }
  },
  // 获取正在热映电影列表
  getPlayingFilm: function (page, count) {
    filmServer.getNowPlaying(page, count).then(data => {
      this.setData({ playingFilms: this.data.playingFilms.concat(data.films) })
    })
  },
  // 获取即将上映电影列表
  getComingFilm: function (page, count) {
    filmServer.getComingSoon(page, count).then(data => {
      let films = data.films.map((film) => {
        let displayDate = new Date(film.premiereAt).getMonth() + 1 + '月' + new Date(film.premiereAt).getDate() + '日'
        film.displayDate = displayDate
      })
      this.setData({ comingFilms: this.data.comingFilms.concat(data.films) })
    })
  },
})