const infoService = jest.mock('../info.js');

infoService.getHomeBanner = jest.fn(() => Promise.resolve({ billboards: [{ id: 1, imageUrl: 'http://www.yonghui.com' }] }));

module.exports = {
  getHomeBanner: infoService.getHomeBanner,
};
