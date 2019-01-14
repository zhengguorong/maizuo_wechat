const { createApp } = require('./libs/xbossTrack/wrapper');
import Tracker from './libs/xbossTrack/index';
import trackConfig from './tracks/index';

new Tracker(trackConfig);

createApp({
  baseUrl: 'https://m.maizuo.com/',
});
