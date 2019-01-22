import Tracker from './libs/xbossTrack/index';
import trackConfig from './tracks/index';

const trakcer = new Tracker({ tracks: trackConfig, isUsingPlugin: true });


trakcer.createApp({
  baseUrl: 'https://m.maizuo.com/',
  trakcer,
});
