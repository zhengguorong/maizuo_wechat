import { addPageMethodWrapper, addPageMethodExtra } from './wrapper';
import { getBoundingClientRect, isClickTrackArea, getActivePage } from './helper';
import report from './report';

class Tracker {
  constructor(tracks) {
    this.tracks = tracks;
    addPageMethodExtra(this.elementTracker());
    addPageMethodWrapper(this.methodTracker());
  }

  elementTracker() {
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
   * @returns {Array}
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
