import {
  formatterAverage
} from 'ployfill/index.ts';

function formatterDataShow(list = []) {
  return list.map(item => {
    return formatterDayData(item);
  });
}

function formatterDayData(item = {}) {
  const {
    averageChangeCount = 0,
    averageChangeCountA = 0,
    averageChangeCountI = 0,
    averageChangeCountL = 0,
    averageViewCount = 0,
    averageViewCountA = 0,
    averageViewCountI = 0,
    averageViewCountL = 0,
    averageViewDuration = 0,
    averageViewDurationA = 0,
    averageViewDurationI = 0,
    averageViewDurationL = 0,
    changeDetailCount = 0,
    changeDetailCountA = 0,
    changeDetailCountI = 0,
    changeDetailCountL = 0,
    changeDetailPeopleCount = 0,
    changeDetailPeopleCountA = 0,
    changeDetailPeopleCountI = 0,
    changeDetailPeopleCountL = 0,
    indexChange = '-',
    indexChangeA = '-',
    indexChangeI = '-',
    indexChangeL = '-',
    shareCount = '-',
    shareCountA = '-',
    shareCountI = '-',
    shareCountL = '-',
    sharePersonCount = '-',
    sharePersonCountA = '-',
    sharePersonCountI = '-',
    sharePersonCountL = '-',
    uv = 0,
    uvA = 0,
    uvI = 0,
    uvL = 0,
    viewCount = 0,
    viewCountA = 0,
    viewCountI = 0,
    viewCountL = 0,
    code = '',
    name = ''
  } = item;

  return {
    averageChangeCount: formatterAverage(averageChangeCount),
    averageChangeCountA: formatterAverage(averageChangeCountA),
    averageChangeCountI: formatterAverage(averageChangeCountI),
    averageChangeCountL: formatterAverage(averageChangeCountL),
    averageViewCount: formatterAverage(averageViewCount),
    averageViewCountA: formatterAverage(averageViewCountA),
    averageViewCountI: formatterAverage(averageViewCountI),
    averageViewCountL: formatterAverage(averageViewCountL),
    averageViewDuration: formatterAverage(averageViewDuration),
    averageViewDurationA: formatterAverage(averageViewDurationA),
    averageViewDurationI: formatterAverage(averageViewDurationI),
    averageViewDurationL: formatterAverage(averageViewDurationL),
    changeDetailCount,
    changeDetailCountA,
    changeDetailCountI,
    changeDetailCountL,
    changeDetailPeopleCount,
    changeDetailPeopleCountA,
    changeDetailPeopleCountI,
    changeDetailPeopleCountL,
    indexChange: indexChange || '-',
    indexChangeA: indexChangeA || '-',
    indexChangeI: indexChangeI || '-',
    indexChangeL: indexChangeL || '-',
    shareCount: shareCount || '-',
    shareCountA: shareCountA || '-',
    shareCountI: shareCountI || '-',
    shareCountL: shareCountL || '-',
    sharePersonCount: sharePersonCount || '-',
    sharePersonCountA: sharePersonCountA || '-',
    sharePersonCountI: sharePersonCountI || '-',
    sharePersonCountL: sharePersonCountL || '-',
    uv,
    uvA,
    uvI,
    uvL,
    viewCount,
    viewCountA,
    viewCountI,
    viewCountL,
    name,
    code
  };
}

export default {
  formatterDataShow
};
