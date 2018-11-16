const xbossdebug = require('libs/xbossdebug.js');
// const methodTrack = require('./methodTrack');
const pageTrack = require('./pageTrack');
xbossdebug.config.key = 'maizuo';
xbossdebug.config.url = 'https://xbossdebug.com/';

App({
    baseUrl: 'https://m.maizuo.com/v4/api',
});
