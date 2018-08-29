require('../helper/global')
require('../helper/wx')
const index = require('../../pages/film/index.js');

test('data对象检测', () => {
  expect(this.page.data).toMatchObject({
    imgUrls: [],
    playingFilms: [],
    comingFilms: [],
    startTime: '',
    endTime: ''
  })
});
it('获取banner方法', () => {
  this.page.getBanner()
})