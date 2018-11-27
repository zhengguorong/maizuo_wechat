import mockResponse from './mockResponse';

const getHomeBanner = () => new Promise((resolve, reject) => {
    resolve(mockResponse.banner.data);
  });

module.exports = {
  getHomeBanner,
};
