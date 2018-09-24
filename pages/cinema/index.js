const cinemaServer = require('../../server/cinema.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas: [],
    tabIndex: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCinemas();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
  },
  selectedTab(event) {
    const { index } = event.currentTarget.dataset;
    if (this.data.tabIndex === index) {
      this.setData({ tabIndex: -1 });
    } else {
      this.setData({ tabIndex: index });
    }
  },
  getCinemas() {
    cinemaServer.getCinema().then((data) => {
      // 调整数据结构为[{district: '黄埔区', cinemas: []}]
      const cinemas = [];
      data.cinemas.forEach((cinema) => {
        const district = cinema.district.name;
        const index = cinemas.findIndex(value => value.district === district);
        if (index === -1) {
          cinemas.push({ district, cinemas: [cinema] });
        } else {
          cinemas[index].cinemas.push(cinema);
        }
      });
      this.setData({ cinemas });
    });
  },
});
