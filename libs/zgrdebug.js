// 获取网络状态 wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
function getNetworkType() {
  wx.getNetworkType({
    success: function (res) {
      params.networkType = res.networkType
    }
  })
}

// 获取设备信息
function getSystemInfo() {
  wx.getSystemInfo({
    success: function (res) {
      params.systemInfo = res
    }
  })
}

// 获取当前的地理位置、速度。
function getLocation() {
  wx.getLocation({
    type: "wgs84",
    success: function (res) {
      params.locationInfo = res
    }
  })
}
// 获取用户信息
function getUserInfo() {
  wx.getUserInfo({
    success: function (res) {
      params.userInfo = res.userInfo
    }
  })
}

function getCurPages() {
  var curPages = getCurrentPages();
  if (curPages.length) return curPages[curPages.length - 1]
}

// 记录用户操作栈
function recordEvent(obj) {
  excutePath.push(obj), excutePath.length > 20 && excutePath.shift()
}

//  对象字面形式做方法调用
function callMethod(app, key, method) {
  var oldMethod = app[key]; // 暂存原方法定义
  // 合并方法
  app[key] = function (app) {
    return method.call(this, app), oldMethod && oldMethod.call(this, app)
  }
}

function onLaunch(route) {
  var breadcrumb = {
    type: "function",
    time: now(),
    belong: "App",
    method: "onLaunch",
    path: route.path,
    query: route.query,
    scene: route.scene
  };
  getNetworkType()
  zgrDebug.setSystemInfo && getSystemInfo(), zgrDebug.setLocation && getLocation(), zgrDebug.setUserInfo && getUserInfo()
  recordEvent(breadcrumb)
}

function onShow(route) {
  params.scene = route.scene;
  var breadcrumb = {
    type: "function",
    time: now(),
    belong: "App",
    method: "onShow",
    path: route.path,
    query: route.query,
    scene: route.scene
  };
  recordEvent(breadcrumb)
}

function onHide() {
  var breadcrumb = {
    type: "function",
    time: now(),
    belong: "App",
    method: "onHide",
    route: pages.route,
    options: pages.options
  };
  recordEvent(breadcrumb)
}

function pageExcute(pageContext, eventName) {
  var method = pageContext[eventName];
  pageContext[eventName] = function () {
    "onLoad" !== eventName && "onShow" !== eventName || (pages = getCurPages());
    var pageObject = {
      type: "function",
      time: now(),
      belong: "Page",
      method: eventName,
      route: pages && pages.route,
      options: pages && pages.options
    };
    return "onLoad" === eventName && (pageObject.args = arguments), zgrDebug.monitorMethodArguments && !listenEvents.includes(eventName) && (pageObject.args = arguments), p(eventName) && recordEvent(pageObject), method && method.apply(this, arguments)
  }
}

function p(n) {
  var e = zgrDebug.methodWhitelist,
    o = zgrDebug.methodBlacklist;
  return "onPageScroll" !== n && (e && e.length ? Boolean(e.includes(n)) : !o || !o.length || Boolean(!o.includes(n)))
}

function now() {
  return (new Date).getTime()
}

// 程序主入口
var count = 5,
  version = "0.1.3",  // 插件版本
  params = {
    notifierVersion: version
  },
  excutePath = [], // 执行路径
  zgrDebug = {
    silent: false // 是否开启勿扰模式
  }

// 记录错误
zgrDebug.notifyError = function (err) {
  if (zgrDebug.apikey && err && count && !zgrDebug.silent) {
    count--
    params.apikey = zgrDebug.apikey
    params.releaseStage = zgrDebug.releaseStage || "production"
    params.appVersion = zgrDebug.appVersion
    params.metaData = zgrDebug.metaData
    zgrDebug.systemInfo && (params.systemInfo = zgrDebug.systemInfo)
    zgrDebug.userInfo && (params.userInfo = zgrDebug.userInfo)
    params.breadcrumbs = excutePath
    params.error = err
    params.time = now();
    wx.request({
      url: "https://fundebug.com/wxjs/",
      method: "POST",
      data: params
    })
  }
};
// 生命周期事件
var hookMethods = {
  onLaunch: onLaunch,
  onShow: onShow,
  onHide: onHide,
  onError: zgrDebug.notifyError
}
var oldApp = App
App = function (appContext) {
  Object.keys(hookMethods).forEach(function (key) {
    callMethod(appContext, key, hookMethods[key])
  })
  oldApp(appContext)
}
var pages = {},
  listenEvents = ["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage"],
  oldPage = Page;
Page = function (pageContext) {
  listenEvents.forEach(function (eventName) {
    pageContext[eventName] && pageExcute(pageContext, eventName)
  })
  zgrDebug.monitorMethodCall && Object.keys(pageContext).forEach(function (e) {
    "function" != typeof pageContext[e] || listenEvents.includes(e) || pageExcute(pageContext, e)
  })
  oldPage(pageContext)
}
module.exports = zgrDebug;