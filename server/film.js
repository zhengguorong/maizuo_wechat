var http = require("../utils/http.js")
var Promise = require('../libs/es6-promise.js').Promise

// 获取正在热映电影接口
const getNowPlaying = (page, count) => {
  return new Promise((resolve, reject) => {
    http.get('/film/now-playing', { page, count, __t: new Date().getTime()}).then(result => {
      if (result.status === 0) {
        resolve(result.data)
      } else {
        reject(result)
      }
    })
  })
}

// 获取即将上映电影接口
const getComingSoon = (page, count) => {
  return new Promise((resolve, reject) => {
    http.get('/film/coming-soon', { page, count, __t: new Date().getTime()}).then(result => {
      if (result.status === 0) {
        resolve(result.data)
      } else {
        reject(result)
      }
    })
  })
}

module.exports = {
  getNowPlaying,
  getComingSoon
}