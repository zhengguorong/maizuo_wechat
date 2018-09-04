const http = jest.genMockFromModule('../http');

http.get = jest.fn(() => Promise.resolve({ data: {} }));

http.post = jest.fn(() => Promise.resolve({ data: {} }));

module.exports = {
  get: http.get,
  post: http.post,
};
