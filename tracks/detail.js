const tracks = {
  path: 'pages/film/detail',
  elementTracks: [
    {
      element: '.buy-now',
      dataKeys: ['film.filmId'],
    },
  ],
  methodTracks: [
    {
      method: 'onPullDownRefresh',
      dataKeys: ['film.filmId'],
    },
  ],
};

export default tracks;
