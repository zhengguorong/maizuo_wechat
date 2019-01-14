import { addPageMethodWrapper, addPageMethodExtra } from './wrapper';
import { getBoundingClientRect, isClickTrackArea, getActivePage } from './helper';
import report from './report';

class Tracker {
  constructor(tracks) {
    // 埋点配置信息
    this.tracks = tracks;
    // 自动给每个page增加elementTracker方法，用作元素埋点
    addPageMethodExtra(this.elementTracker());
    // 自动给page下预先定义的方法进行监听，用作方法执行埋点
    addPageMethodWrapper(this.methodTracker());
  }

  elementTracker() {
    // elementTracker变量名尽量不要修改，因为他和wxml下的名字是相对应的
    const elementTracker = (e) => {
      const tracks = this.findActivePageTracks('element');
      tracks.forEach((track) => {
          getBoundingClientRect(track.element).then((res) => {
              const isHit = isClickTrackArea(e, res.boundingClientRect, res.scrollOffset);
              isHit && report(track);
          });
      });
    };
    return elementTracker;
  }

  methodTracker() {
    return (page, methodName) => {
      const tracks = this.findActivePageTracks('method');
      tracks.forEach((track) => {
        if (track.method === methodName) {
          report(track);
        }
      });
    };
  }

  /**
   * 获取当前页面的埋点配置
   * @param {String} type 返回的埋点配置，options: method/element
   * @returns {Object}
   */
  findActivePageTracks(type) {
    try {
      const { route } = getActivePage();
      const pageTrackConfig = this.tracks.find(item => item.path === route) || {};
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
  }
}

export default Tracker;
