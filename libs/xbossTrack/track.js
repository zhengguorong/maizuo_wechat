import { addPageMethodWrapper, addPageMethodExtra } from './xboss';

const trackConfig = [
  {
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
  },
];

/**
 * 获取当前页面的埋点配置
 * @param {String} type 返回的埋点配置，options: method/element
 * @returns {Array}
 */
const findPageTracks = function (type) {
  try {
      const { route } = this;
      const pageTrackConfig = trackConfig.find(item => item.path === route) || {};
      let tracks = {};
      if (type === 'method') {
        tracks = pageTrackConfig.methodTracks || [];
      } else if (type === 'element') {
        tracks = pageTrackConfig.elementTracks || [];
      }
      return tracks;
  } catch (e) {
      return {};
  }
};

/**
 * 获取页面元素信息
 * @param {String} element 元素class或者id
 * @returns {Promise}
 */
const getBoundingClientRect = function (element) {
  return new Promise((reslove) => {
      const query = wx.createSelectorQuery();
      query.select(element).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(res => reslove({ boundingClientRect: res[0], scrollOffset: res[1] }));
  });
};

/**
* 判断点击是否落在目标元素
* @param {Object} clickInfo 用户点击坐标
* @param {Object} boundingClientRect 目标元素信息
* @param {Object} scrollOffset 页面位置信息
* @returns {Boolean}
*/
const isClickTrackArea = function (clickInfo, boundingClientRect, scrollOffset) {
  if (!boundingClientRect) return false;
  const { x, y } = clickInfo.detail; // 点击的x y坐标
  const { left, right, top, height } = boundingClientRect;
  const { scrollTop } = scrollOffset;
  if (left < x && x < right && scrollTop + Math.abs(top) < y && y < scrollTop + Math.abs(top) + height) {
      return true;
  }
  return false;
};

const report = function (track) {
  console.log(`被点击元素className:${track.element}`);
  track.dataKeys.forEach((name) => {
      console.log(`被记录数据key:${name}, value: ${JSON.stringify(this.data[name])}`);
  });
};

const pageAutoTrack = function (e) {
  const tracks = findPageTracks.call(this, 'element');
  tracks.forEach((track) => {
      getBoundingClientRect(track.element).then((res) => {
          const isHit = isClickTrackArea(e, res.boundingClientRect, res.scrollOffset);
          isHit && report.call(this, track);
      });
  });
};

addPageMethodWrapper(function (page, methodName, ...args) {
  const tracks = findPageTracks.call(this, 'method');
  tracks.forEach((track) => {
    if (track.method === methodName) {
      report.call(this, track);
    }
  });
});

addPageMethodExtra(pageAutoTrack);
