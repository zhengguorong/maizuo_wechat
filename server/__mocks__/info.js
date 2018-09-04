const infoService = jest.genMockFromModule('../info.js');

infoService.getHomeBanner = jest.fn(() => Promise.resolve({billboards: [{url: 'http://www.baidu.com'}]}));

module.exports = {
  getHomeBanner: infoService.getHomeBanner
};
