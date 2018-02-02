const cinemaServer = require('../../server/cinema.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCinemas()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  getCinemas: function () {
    cinemaServer.getCinema().then(data => {
      // 调整数据结构为[{district: '黄埔区', cinemas: []}]
      let cinemas = []
      data.cinemas.forEach((cinema) => {
        let district = cinema.district.name
        let index = cinemas.findIndex((value, index) => {
          return value.district === district
        })
        if (index === -1) {
          cinemas.push({ district: district, cinemas: [cinema]})
          console.log(cinemas)
        } else {
          cinemas[index].cinemas.push(cinema)
        }
      })
      this.setData({ cinemas: cinemas })
    })
  }
})