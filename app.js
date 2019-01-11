const { createApp } = require('./libs/xbossTrack/wrapper');
import Tracker from './libs/xbossTrack/index';

const trackConfig = [
  {
    path: 'pages/film/index',
    elementTracks: [
      {
        element: '.playing-item',
        dataKeys: ['imgUrls', 'playingFilms']
      },
      {
        element: '.more',
        dataKeys: ['imgUrls', 'playingFilms']
      },
      {
        element: '.testTrack',
        dataKeys: ['imgUrls', 'playingFilms']
      }
    ],
    methodTracks: [
      {
        method: 'getBanner',
        dataKeys: ['imgUrls']
      },
      {
        method: 'toBannerDetail',
        dataKeys: ['imgUrls']
      }
    ]
  }
];

new Tracker(trackConfig);

createApp({
  baseUrl: 'https://m.maizuo.com/',
});
