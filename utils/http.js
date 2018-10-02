/**
 * 构造get请求参数
 * url 请求地址
 * data 请求数据
 */
function buildUrl(url, data) {
  let params = '';
  const { baseUrl } = getApp();
  const requestUrl = baseUrl + url;
  if (!data) {
    return requestUrl;
  }
  for (const key of Object.keys(data)) {
    params += `${key}=${data[key]}&`;
  }
  params = `?${params.substring(0, params.length - 1)}`;
  return requestUrl + params;
}

function _request(url, data, method = 'GET') {
  const requestUrl = buildUrl(url);
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: requestUrl,
      header: {
        'content-type': 'application/json',
      },
      data,
      method,
      success: (res) => {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: (res) => {
        wx.hideLoading();
        reject(res);
      },
    });
  });
}

function get(url, data) {
  return _request(url, data, 'GET');
}

function post(url, data) {
  return _request(url, data, 'POST');
}

module.exports = {
  get,
  post,
  buildUrl,
  _request,
};
