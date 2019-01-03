import { addPageMethodWrapper, addPageMethodExtra } from './wrapper';
import { getBoundingClientRect, isClickTrackArea } from './helper';
import findActivePageTracks from './config';
import report from './report';

const pageAutoTrack = (e) => {
  const tracks = findActivePageTracks('element');
  tracks.forEach((track) => {
      getBoundingClientRect(track.element).then((res) => {
          const isHit = isClickTrackArea(e, res.boundingClientRect, res.scrollOffset);
          isHit && report(track);
      });
  });
};

addPageMethodExtra(pageAutoTrack);

addPageMethodWrapper((page, methodName) => {
  const tracks = findActivePageTracks('method');
  tracks.forEach((track) => {
    if (track.method === methodName) {
      report(track);
    }
  });
});
