export const noop = () => {};
export const isFn = fn => typeof fn === 'function';
let wId = 0;
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
  global.wxPageInstance = page;
  return page;
};

global.getApp = function () {
  return {
    baseUrl: 'https://m.maizuo.com/v4/api',
  };
};
global.Date.now = jest.fn(() => 1536708613825);
global.wx = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showModal: jest.fn(),
  request: jest.fn(),
  getStorageSync: jest.fn(),
  showShareMenu: jest.fn(),
};
