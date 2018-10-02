import * as http from '../../utils/http';

describe('http', () => {
  const url = '/test';
  const params = { test: 'abc' };
  describe('buildUrl', () => {
    it('should return queryUrl with params ', () => {
      const result = http.buildUrl(url, params);
      expect(result).toEqual('https://m.maizuo.com/v4/api/test?test=abc');
    });
    it('should return path without params', () => {
      expect(http.buildUrl(url)).toEqual('https://m.maizuo.com/v4/api/test');
    });
  });

  describe('_request', () => {
    it('should return a Promise when request', () => {
      expect(http._request()).toBeInstanceOf(Promise);
    });
    it('should show loading when request', () => {
      http._request();
      expect(wx.showLoading).toBeCalledWith({ title: '加载中' });
    });
    it('should request method use pass param', () => {
      http._request('', '', 'GET');
      expect(wx.request.mock.calls[0][0].method).toEqual('GET');
    });
    it('should hideLoading when request success', () => {
      wx.hideLoading.mockClear();
      wx.request.mockImplementationOnce(({ success }) => {
        success({ data: '' });
      });
      expect.assertions(1);
      return http._request().then(() => {
        expect(wx.hideLoading).toBeCalled();
      });
    });
    it('should reslove when request success', () => {
      wx.request.mockImplementationOnce(({ success }) => {
        success({ data: 'test' });
      });
      expect.assertions(1);
      return expect(http._request()).resolves.toEqual('test');
    });
    it('should hideLoading when request fail', () => {
      wx.hideLoading.mockClear();
      wx.request.mockImplementationOnce(({ fail }) => {
        fail({ data: '' });
      });
      expect.assertions(1);
      return http._request().catch(() => {
        expect(wx.hideLoading).toBeCalled();
      });
    });
    it('should reject when request fail', () => {
      wx.request.mockImplementationOnce(({ fail }) => {
        fail({ data: 'test' });
      });
      expect.assertions(1);
      return expect(http._request()).rejects.toEqual({ data: 'test' });
    });
  });
});
