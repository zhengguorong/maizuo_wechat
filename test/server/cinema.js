// const http = require("../../utils/http")
// jest.dontMock('../../server/cinema.js')
// const cinemaServer = require('../../server/cinema.js')
// jest.mock("../../utils/http")

// describe('cinemaServer', () => {
//   it('getCinema resolve', () => {
//     http.get = jest.fn(() => Promise.resolve({ data: {}, status: 0 }));
//     expect.assertions(1);
//     return expect(cinemaServer.getCinema()).resolves.toEqual({})
//   })
//   it('getCinema reject', () => {
//     http.get = jest.fn(() => Promise.resolve({ data: {}, status: -1 }));
//     expect.assertions(1);
//     return expect(cinemaServer.getCinema()).rejects.toEqual({ data: {}, status: -1 })
//   })
// });
// describe('cinemaServer', () => {
//   it('getCinema', () => {
//     http.get.mockImplementation(() => Promise.resolve({ data: {name: 'zgr'}, status: 0 }));
//     console.log(cinemaServer.getCinema().then(res => {
//       console.log(res)
//     }))
//     // cinemaServer.getCinema('test').then(res => {console.log(res)})
//   })
// })