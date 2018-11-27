import mockResponse from './mockResponse';

// 获取正在热映电影接口
const getNowPlaying = (page, count) => new Promise((resolve, reject) => {
    resolve(mockResponse.playingNow.data);
  });

// 获取即将上映电影接口
const getComingSoon = (page, count) => new Promise((resolve, reject) => {
    resolve(mockResponse.commingSoon.data);
  });

// 获取电影详情
const getFilmDetail = id => new Promise((resolve, reject) => {  
    resolve(mockResponse.detail.data);
  });

module.exports = {
  getNowPlaying,
  getComingSoon,
  getFilmDetail,
};
