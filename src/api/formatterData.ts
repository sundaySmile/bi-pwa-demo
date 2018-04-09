import {
  dateToString,
  formatterAverage
} from '../ployfill';
import {
  Table
} from '../ployfill/field-types';

export function formatterDataShow(list: Array<any>) {
  return list.map(item => {
    return formatterDayData(item);
  });
}

function formatterDayData(item: Table) {
  const {
    averageDuration = 0,
    averageDurationA = 0,
    averageDurationI = 0,
    averageDurationL = 0,
    averagePlayCount = 0,
    averagePlayCountA = 0,
    averagePlayCountI = 0,
    averagePlayCountL = 0,
    averageViewCount = 0,
    averageViewCountA = 0,
    averageViewCountI = 0,
    averageViewCountL = 0,
    uv = 0,
    uvA = 0,
    uvI = 0,
    uvL = 0,
    playCount = 0,
    playCountA = 0,
    playCountI = 0,
    playCountL = 0,
    viewCount = 0,
    viewCountA = 0,
    viewCountI = 0,
    viewCountL = 0,
    shareCount,
    shareCountA,
    shareCountI,
    shareCountL,
    sharePersonCount,
    sharePersonCountA,
    sharePersonCountI,
    sharePersonCountL,
    timeEnd,
    timeStart,
    contentType = 0
  } = item;
  const timeStartStr = dateToString(timeStart);
  const timeEndStr = dateToString(timeEnd);
  let dataPeriod = `${timeStartStr}~${timeEndStr}`;
  if (timeStartStr === timeEndStr) {
    dataPeriod = timeEndStr;
  }

  return {
    averageDuration: formatterAverage(averageDuration),
    averageDurationA: formatterAverage(averageDurationA),
    averageDurationI: formatterAverage(averageDurationI),
    averageDurationL: formatterAverage(averageDurationL),
    averagePlayCount: formatterAverage(averagePlayCount),
    averagePlayCountA: formatterAverage(averagePlayCountA),
    averagePlayCountI: formatterAverage(averagePlayCountI),
    averagePlayCountL: formatterAverage(averagePlayCountL),
    averageViewCount: formatterAverage(averageViewCount),
    averageViewCountA: formatterAverage(averageViewCountA),
    averageViewCountI: formatterAverage(averageViewCountI),
    averageViewCountL: formatterAverage(averageViewCountL),
    uv,
    uvA,
    uvI,
    uvL,
    playCount,
    playCountA,
    playCountI,
    playCountL,
    viewCount,
    viewCountA,
    viewCountI,
    viewCountL,
    shareCount: shareCount || '-',
    shareCountA: shareCountA || '-',
    shareCountI: shareCountI || '-',
    shareCountL: shareCountL || '-',
    sharePersonCount: sharePersonCount || '-',
    sharePersonCountA: sharePersonCountA || '-',
    sharePersonCountI: sharePersonCountI || '-',
    sharePersonCountL: sharePersonCountL || '-',
    timeEnd,
    timeStart,
    contentType,
    dataPeriod
  };
}
