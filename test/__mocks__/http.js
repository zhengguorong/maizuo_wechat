
const http = jest.genMockFromModule('../../utils/http');

http.get = () => {
  return new Promise()
}

http.post = () => {
  return new Promise()
}

export default http;