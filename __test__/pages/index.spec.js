import index from '../../pages/film/index';

const page = global.wxPage;
jest.mock('../../server/info.js');
jest.mock('../../server/film.js');

describe('电影首页', () => {
  it('页面onLoad正确执行', () => {
    page.getBanner = jest.fn();
    page.getPlayingFilm = jest.fn();
    page.getComingFilm = jest.fn();
    page.onLoad();
    expect(page.getBanner).toHaveBeenCalled();
    expect(page.getPlayingFilm).toHaveBeenCalled();
    expect(page.getComingFilm).toHaveBeenCalled();
  });
  it('获取广告信息成功', () => {
    expect(page.data.imgUrls.length).toBe(1);
  });
  it('获取热映中电影成功', () => {
    expect(page.data.playingFilms.length).toBe(1);
  });
  it('获取即将上映电影成功', () => {
    expect(page.data.comingFilms.length).toBe(1);
  });
  it('toBannerDetail', () => {
    page.toBannerDetail();
    expect(wx.showModal.mock.calls[0][0].content).toBe(
      '因打开webview控件需要加入白名单，这里就不做跳转了',
    );
  });
  it('onPullDownRefresh', () => {
    page.onLoad = jest.fn();
    page.onPullDownRefresh();
    expect(page.onLoad).toHaveBeenCalled();
  });
});
