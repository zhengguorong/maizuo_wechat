// var fundebug = require('libs/fundebug.0.1.2.min');
// fundebug.setSystemInfo = true;
// fundebug.setUserInfo = true;
// fundebug.setLocation = true;
// fundebug.monitorMethodCall = true;
// fundebug.monitorMethodArguments = true;
// fundebug.apikey = '87dd7e3cd566dd1e4c74b49d20f4b369383d145771a6144880131bfd3750209b';
var xbossdebug = require('libs/xbossdebug.js')
xbossdebug.url = 'https://fundebug.com/wxjs/';
xbossdebug.apikey = 'maizuo'
xbossdebug.setSystemInfo = true;
xbossdebug.setUserInfo = true;
xbossdebug.setLocation = true;
xbossdebug.monitorMethodCall = true;

App({
  baseUrl: 'https://m.maizuo.com/v4/api'
})
