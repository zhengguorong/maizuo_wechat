const tracks = {
  path: 'pages/film/index',
  elementTracks: [
    {
      element: '.playing-item',
      dataKeys: ['imgUrls', 'playingFilms[0]', 'test.name', '$APP.baseUrl', '$DATASET.test'],
    },
    {
      element: '.more',
      dataKeys: ['imgUrls', 'playingFilms', '$DATASET.test'],
    }
  ],
  methodTracks: [
    // {
    //   method: 'getBanner',
    //   dataKeys: ['imgUrls'],
    // },
    // {
    //   method: 'toBannerDetail',
    //   dataKeys: ['imgUrls'],
    // },
  ],
};

export default tracks;
