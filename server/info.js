var http = require("../utils/http.js")

const getHomeBanner = () => {
  return new Promise((resolve, reject) => {
    http.get('/billboard/home', { __t: new Date().getTime()}).then(result => {
      if (result.status === 0) {
        resolve(result.data)
      } else {
        reject(result)
      }
    })
  })
}

module.exports = {
  getHomeBanner
}