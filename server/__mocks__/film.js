const filmService = jest.genMockFromModule('../film.js');

filmService.getNowPlaying = jest.fn(() => Promise.resolve({films: [{url: 'http://www.baidu.com'}]}));
filmService.getComingSoon = jest.fn(() => Promise.resolve({films: [{url: 'http://www.baidu.com'}]}));
filmService.getFilmDetail = jest.fn(() => Promise.resolve({films: [{url: 'http://www.baidu.com'}]}));

module.exports = {
  getNowPlaying: filmService.getNowPlaying,
  getComingSoon: filmService.getComingSoon,
  getFilmDetail: filmService.getFilmDetail
};
