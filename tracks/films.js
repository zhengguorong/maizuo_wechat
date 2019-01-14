const tracks = {
  path: 'pages/film/index',
  elementTracks: [
    {
      element: '.playing-item',
      dataKeys: ['imgUrls', 'playingFilms'],
    },
    {
      element: '.more',
      dataKeys: ['imgUrls', 'playingFilms'],
    },
    {
      element: '.testTrack',
      dataKeys: ['imgUrls', 'playingFilms'],
    },
  ],
  methodTracks: [
    {
      method: 'getBanner',
      dataKeys: ['imgUrls'],
    },
    {
      method: 'toBannerDetail',
      dataKeys: ['imgUrls'],
    },
  ],
};

export default tracks;
