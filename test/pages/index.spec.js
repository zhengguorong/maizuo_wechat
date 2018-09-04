import index from '../../pages/film/index.js'
import infoServer from '../../server/info.js'

var page = global.wxPage
jest.mock('../../server/info.js')
jest.mock('../../server/film.js')


describe("电影首页", () => {
  it("onload success", ()=>{
    console.log(page)
    expect(infoServer.getHomeBanner).toHaveBeenCalled()
  })
  it('toBannerDetail', () => {
    page.toBannerDetail()
    expect(wx.showModal).toHaveBeenCalled()
  })
})