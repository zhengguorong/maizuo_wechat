function get(url, data) {
  const requestUrl = buildUrl(url, data)
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中' })
    wx.request({
      url: requestUrl,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: res => {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: res => {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}

function post(url, data) {
  const requestUrl = buildUrl(url)
  return new Promise((resolve, reject) => {
    wx.showLoading({title: '加载中'})
    wx.request({
      url: requestUrl,
      header: {
        'content-type': 'application/json'
      },
      data: data,
      method: 'POST',
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: res => {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}

function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: buildUrl('/file/upload'),
      filePath: filePath,
      name: 'file',
      success: res => {
        var data = res.data
        resolve(data)
      },
      fail: res => {
        reject(res)
      }
    })
  })

}


/**
 * 构造get请求参数
 * url 请求地址
 * data 请求数据
 */
function buildUrl(url, data) {
  var params = ''
  var baseUrl = getApp().baseUrl
  var requestUrl = baseUrl + url
  if (!data) {
    return requestUrl
  }
  for (var key in data) {
    params += key + '=' + data[key] + '&'
  }
  params = '?' + params.substring(0, params.length - 1)
  return requestUrl + params
}

module.exports = {
  get: get,
  post: post,
  uploadFile: uploadFile
}