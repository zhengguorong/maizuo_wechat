import '../../pages/film';

const page = global.wxPageInstance;
jest.mock('../../server/info.js');
jest.mock('../../server/film.js');

describe('电影首页', () => {
  describe('onLoad', () => {
    beforeAll(() => {
      jest.spyOn(page, 'getBanner');
      jest.spyOn(page, 'getPlayingFilm');
      jest.spyOn(page, 'getComingFilm');
    });
    beforeEach(() => {
      page.onLoad();
    });
    it('should getBanner', () => {
      expect(page.getBanner).toBeCalled();
    });
    it('should getPlayingFilm', () => {
      expect(page.getPlayingFilm).toBeCalled();
    });
    it('should getComingFilm', () => {
      expect(page.getComingFilm).toBeCalled();
    });
  });
  describe('onPullDownRefresh', () => {
    it('refresh Data', () => {
      jest.spyOn(page, 'onLoad');
      page.onPullDownRefresh();
      expect(page.onLoad).toBeCalled();
      page.onLoad.mockClear();
    });
  });
  describe('getComingFilm', () => {
    it('should format premiereAt as MM月DD日 ', () => page.getComingFilm().then(() => {
        expect(page.data.comingFilms[0].displayDate).toEqual('9月12日');
      }));
  });
  describe('toBannerDetail', () => {
    it('should show Modal', () => {
      page.toBannerDetail();
      expect(wx.showModal).toBeCalledWith({
        title: '提示',
        content: '因打开webview控件需要加入白名单，这里就不做跳转了',
      });
    });
  });
});
