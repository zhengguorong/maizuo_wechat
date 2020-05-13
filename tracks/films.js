const tracks = {
  path: 'pages/film/index',
  elementTracks: [
    {
      element: '.playing-item',
      dataKeys: ['imgUrls', 'ceshi', '$INDEX', 'playingFilms[0]', 'test.name', '$APP.baseUrl', '$DATASET.test', '$INDEX'],
    },
    {
      element: '.more',
      dataKeys: ['imgUrls', 'playingFilms', '$DATASET.test'],
    },
    {
      element: '.page >>> .sub-component',
      dataKeys: ['name', '$DATASET.test']
    }
  ],
  methodTracks: [
    {
      method: 'getBanner',
      dataKeys: ['imgUrls', 'ceshi'],
    },
    {
      method: 'toBannerDetail',
      dataKeys: ['imgUrls', '$DATASET.test'],
    },
  ],
  comMethodTracks: [
    {
      method: '_test1',
      dataKeys: ['name', '$DATASET.test'],
    },
  ],
};

export default tracks;
