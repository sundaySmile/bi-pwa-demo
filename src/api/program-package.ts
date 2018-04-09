import {
  instance
} from './meta.js';
import {
  dateToString,
  formatterDataShow,
  fetchChainRatios
} from 'ployfill/';

function formatterDayData(item = {}, prevItem) {
  const {
    averageChangeCount = 0,
    averageViewCount = 0,
    averageViewDuration = 0,
    timeStart,
    timeEnd,
    changeDetailCount = 0,
    uv = 0,
    viewCount = 0
  } = item;
  const timeStartStr = dateToString(timeStart);
  const timeEndStr = dateToString(timeEnd);
  let dataPeriod = `${timeStartStr}~${timeEndStr}`;
  if (timeStartStr === timeEndStr) {
    dataPeriod = timeEndStr;
  }
  let chainRatioList = {};
  // if (prevItem) {
  chainRatioList = fetchChainRatios(item, prevItem);
  // }

  return {
    ...chainRatioList,
    averageChangeCount: Number(averageChangeCount).toFixed(1),
    averageViewCount: Number(averageViewCount).toFixed(1),
    averageViewDuration,
    uv,
    timeEnd,
    timeStart,
    viewCount,
    changeDetailCount,
    dataPeriod
  };
}

export function getLineChart(data) {
  return instance.get('/newVR-bi/bianalysis/programSet/lineChart', {
    params: data
  }).then((rsp) => {
    if (typeof rsp === 'string' && rsp) {
      const result = JSON.parse(rsp);
      return result.data.result;
    } else {
      return rsp.data.result;
    }
  }).then(response => {
    if (response) {
      return formatterDataShow(response, formatterDayData);
    }
    return response;
  });
}
