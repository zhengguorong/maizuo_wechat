// const xbossdebug = require('./libs/xbossdebug.js');
const { addPageMethodWrapper, addAppMethodWrapper, createApp } = require('./libs/xbossTrack/xboss');
require('./libs/xbossTrack/track');
// xbossdebug.config.key = 'maizuo';
// xbossdebug.config.url = 'https://xbossdebug.com/';

createApp({
  baseUrl: 'https://m.maizuo.com/',
});
