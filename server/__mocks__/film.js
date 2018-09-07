const filmService = jest.genMockFromModule('../film.js');

filmService.getNowPlaying = jest.fn(() =>
  Promise.resolve({films:[{id: 1, name: 'test'}], page: {total: 10, current:1}})
);
filmService.getComingSoon = jest.fn(() =>
  Promise.resolve({films:[{id: 1, name: 'test'}], page: {total: 10, current:1}})
);
filmService.getFilmDetail = jest.fn(() =>
  Promise.resolve({film:{id: 1, name: 'test'}})
);

module.exports = {
  getNowPlaying: filmService.getNowPlaying,
  getComingSoon: filmService.getComingSoon,
  getFilmDetail: filmService.getFilmDetail,
};
