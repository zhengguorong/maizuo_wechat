const http = require('../utils/http.js');

const getCinema = () => new Promise((resolve, reject) => {
    http.get('/cinema', { __t: new Date().getTime() }).then((result) => {
      if (result.status === 0) {
        resolve(result.data);
      } else {
        reject(result);
      }
    });
  });

module.exports = {
  getCinema,
};
