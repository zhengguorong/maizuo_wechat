var http = require("../utils/http.js")
var Promise = require('../libs/es6-promise.js').Promise

const getCinema = () => {
  return new Promise((resolve, reject) => {
    http.get('/cinema', { __t: new Date().getTime() }).then(result => {
      if (result.status === 0) {
        resolve(result.data)
      } else {
        reject(result)
      }
    })
  })
}

module.exports = {
  getCinema
}