import { getActivePage } from './helper';

const report = function (track) {
  const curPage = getActivePage();
  console.log(track);
  track.dataKeys.forEach(name => {
    console.log(
      `被记录数据key:${name}, value: ${JSON.stringify(curPage.data[name])}`
    );
  });
};

export default report;
