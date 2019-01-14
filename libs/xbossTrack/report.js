import { getActivePage } from './helper';

const getGloabData = (key, dataset, index) => {
  let result = '';
  if (key.indexOf('$APP.') > -1) {
    const App = getApp();
    const appKey = key.split('$APP.')[1];
    result = App[appKey];
  } else if (key.indexOf('$DATASET.') > -1) {
    const setKey = key.split('$DATASET.')[1];
    result = dataset[setKey];
  } else if (key.indexOf('$INDEX') > -1) {
    result = index;
  }
  return result;
};

const getPageData = (key, dataset, index) => {
  const { data } = getActivePage();
  const keys = key.split('.');
  let result = data;
  if (keys.length > 0) {
    keys.forEach((name) => {
      result = result[name];
    });
  } else {
    result = data[key];
  }
  return result;
};

const dataReader = (key, dataset, index) => {
  let result = '';
  if (key.indexOf('$') > -1) {
    result = getGloabData(key, dataset, index);
  } else {
    result = getPageData(key, dataset, index);
  }
  console.log(result, key);
  return result;
};


const report = (track) => {
  console.log(track);
  track.dataKeys.forEach(name => {
    const data = dataReader(name, track.dataset, track.index);
    console.log(data);
  });
};

export default report;
