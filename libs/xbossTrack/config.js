import { getActivePage } from './helper';

/**
 * 埋点配置
 * path 页面路径
 * elementTracks 表示点击元素埋点
 * element 点击元素的className，也支持多级选择
 * dataKeys 页面data下的数据key值列表
 * ----------------------------------------
 * methodTracks 页面函数执行埋点
 * method 函数名
 * dataKeys 页面data下的数据key值列表
 */
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

/**
 * 获取当前页面的埋点配置
 * @param {String} type 返回的埋点配置，options: method/element
 * @returns {Array}
 */
const findActivePageTracks = function (type) {
    try {
        const { route } = getActivePage();
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

export default findActivePageTracks;
