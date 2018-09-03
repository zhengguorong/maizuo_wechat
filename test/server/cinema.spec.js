import cinemaServer from '../../server/cinema.js'

describe('cinemaServer', () => {
  const http = jest.autoMockOn()
  it('getCinema', () => {
    expect(cinemaServer.getCinema()).toBeInstanceOf(Promise)
  })
  it('getCinema resolve', () => {
    expect.assertions(1);
    return expect(cinemaServer.getCinema()).resolves.toEqual('')
  })
  it('getCinema reject', () => {
    expect.assertions(1);
    return expect(cinemaServer.getCinema()).rejects.toEqual('')
  })
});