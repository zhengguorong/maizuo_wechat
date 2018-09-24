export const noop = () => {};
export const isFn = fn => typeof fn === 'function';
let wId = 0;
/**
 * 对于小程序中 Page 的简单 Mock
 */
global.Page = ({ data, ...rest }) => {
  const page = {
    data,
    setData: jest.fn(function (newData, cb) {
      this.data = {
        ...this.data,
        ...newData,
      };

      cb && cb();
    }),
    onLoad: noop,
    onReady: noop,
    onUnLoad: noop,
    __wxWebviewId__: wId++,
    ...rest,
  };

  page.onLoad();
  page.onReady();
  global.wxPage = page;
  return page;
};

global.getApp = function () {
  return {
    baseUrl: 'https://m.maizuo.com/v4/api',
  };
};

global.wx = {
  showModal: jest.fn(),
};
