import {
  instance
} from 'api/meta';
import {
  dateToString,
  formatterDataShow,
  fetchChainRatios
} from 'ployfill/index';
import {
  Line,
  APIRequestParams
} from 'ployfill/field-types';
import {
  formatterDataShow as formatterTableList
} from './formatterData';

export function getOverallView(data: APIRequestParams) {
  return instance.get('/newVR-bi/bianalysis/overview/searchByPage', {
    params: data
  }).then((rsp) => {
    if (typeof rsp === 'string' && rsp) {
      const result = JSON.parse(rsp);
      return result.data.result;
    } else {
      return rsp.data.result;
    }
  }).then(response => {
    if (response && response.data) {
      const {
        curPageNum,
        totalPageNum,
        data
      } = response;
      const formatedResponse = formatterTableList(data);
      return {
        curPageNum,
        totalPageNum,
        data: formatedResponse
      };
    }
    return response;
  });
}

function formatterLineData(item: Line, prevItem: Line) {
  const {
    averageViewCount = 0,
    averagePlayCount = 0,
    averageDuration = 0,
    timeStart,
    timeEnd,
    playCount = 0,
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
  chainRatioList = fetchChainRatios(item, prevItem);

  return {
    ...chainRatioList,
    averagePlayCount: Number(averagePlayCount).toFixed(1),
    averageViewCount: Number(averageViewCount).toFixed(1),
    averageDuration,
    uv,
    timeEnd,
    timeStart,
    viewCount,
    playCount,
    dataPeriod
  };
}

export function getLineChart(data: APIRequestParams) {
  return instance.get('/newVR-bi/bianalysis/overview/search', {
    params: data
  }).then((rsp) => {
    if (typeof rsp === 'string' && rsp) {
      const result = JSON.parse(rsp);
      return result.data.result;
    } else {
      return rsp.data.result;
    }

  }).then(response => {
    if (response && response.data) {
      return {
        data: formatterDataShow(response.data, formatterLineData)
      };
    }
    return response;
  });
}
