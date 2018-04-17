const http = require('./http');

test('has get post uploadFile methods', () => {
  expect(http).objectContaining({ get: Function, post: Function, uploadFile: Function})
});