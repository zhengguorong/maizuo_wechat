import index from '../../pages/film/index.js'

var page = global.wxPage


describe("电影首页", () => {
  it("getPlayingFilm", ()=>{
    expect(page.getPlayingFilm)
  })
})