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
    timeStart,
    timeEnd,
    averageBarrageCount = '-',
    averageDuration = 0,
    averagePlayDuration = 0,
    averageGiftCount = '-',
    averagePlayCount = 0,
    averageViewCount = 0,
    averageBrowseCount = 0,
    barrageCount = '-',
    barragePersonCount = '-',
    code,
    giftCount = '-',
    giftPersonCount = '-',
    isChargeable = '-',
    name = '-',
    orderCount = '-',
    payRate = '-',
    payUser = '-',
    playCount = 0,
    playDuration = 0,
    playUv = 0,
    redeemCount = '-',
    reserveCount,
    shareCount = '-',
    sharePersonCount = '-',
    tags,
    uv = 0,
    videoType = '-',
    viewCount = 0,
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

  return {
    ...chainRatioList,
    timeStart,
    timeEnd,
    averageBarrageCount,
    averageDuration,
    averagePlayDuration,
    averageGiftCount,
    averagePlayCount: Number(averagePlayCount).toFixed(1),
    averageViewCount: Number(averageViewCount).toFixed(1),
    averageBrowseCount: Number(averageBrowseCount).toFixed(1),
    barrageCount,
    barragePersonCount,
    code,
    giftCount,
    giftPersonCount,
    isChargeable,
    name,
    orderCount,
    payRate,
    payUser,
    playCount,
    playDuration,
    playUv,
    redeemCount,
    reserveCount,
    shareCount,
    sharePersonCount,
    tags,
    uv,
    videoType,
    viewCount,
    browseViewCount,
    dataPeriod
  };
}

export function getLiveLineChart(data) {
  return instance.get('/newVR-bi/bianalysis/live/lineChart', {
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
