const filmService = jest.mock('../film.js');

const nowPlayingRes = { films: [{ id: 1, name: 'test' }], page: { total: 10, current: 1 } };
const comingSoonRes = { films: [{ id: 1, name: 'test', premiereAt: Date.now() }], page: { total: 10, current: 1 } };
const filmDetailRes = { film: { id: 1, name: 'test' } };
filmService.getNowPlaying = jest.fn(() => Promise.resolve(nowPlayingRes));
filmService.getComingSoon = jest.fn(() => Promise.resolve(comingSoonRes));
filmService.getFilmDetail = jest.fn(() => Promise.resolve(filmDetailRes));

module.exports = {
  getNowPlaying: filmService.getNowPlaying,
  getComingSoon: filmService.getComingSoon,
  getFilmDetail: filmService.getFilmDetail,
  nowPlayingRes,
  comingSoonRes,
  filmDetailRes,
};
