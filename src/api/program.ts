import {
  instance
} from './meta';
import {
  dateToString,
  formatterDataShow,
  fetchChainRatios,
  formatterAverage
} from '../ployfill/';
import {
  Line
} from '../ployfill/field-types';

function formatterDayData(item: Line, prevItem: Line) {
  const {
    averageBrowseCount = 0,
    averagePlayCount = 0,
    averagePlayDuration = 0,
    timeStart,
    timeEnd,
    playCount = 0,
    uv = 0,
    browseViewCount = 0
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
    averagePlayCount: formatterAverage(averagePlayCount),
    averageViewCount: formatterAverage(averageBrowseCount),
    averagePlayDuration,
    uv,
    timeEnd,
    timeStart,
    viewCount: browseViewCount,
    playCount,
    dataPeriod
  };
}

export function getProgramLineChart(data) {
  return instance.get('/newVR-bi/bianalysis/content/lineChart', {
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
