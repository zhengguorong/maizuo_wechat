import Tracker from './libs/xbossTrack/index';
import trackConfig from './tracks/index';

new Tracker({ tracks: trackConfig });


App({
  baseUrl: 'https://m.maizuo.com/',
});
