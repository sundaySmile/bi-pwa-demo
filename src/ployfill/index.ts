import {
  Line
} from './field-types';

export function chainRatioFormula(a, b):string {
  if (!b || !a) {
    return '-';
  }
  const ratio = Number((a - b) / b).toFixed(4);
  return ratio;
}

export function dateToString(date): string {
  const activeDate = new Date(date);
  const month = activeDate.getMonth() + 1;
  const day = activeDate.getDate();
  return `${month}月${day}日`;
}

export function formatterDataShow(list: Array<any>, func) {
  return list.map((item, index) => {
    return func(item, list[index - 1]);
  });
}

export function fetchChainRatios(item: Line, prevItem: Line): object {
  const {
    averageViewCount = 0,
    averagePlayCount = 0,
    averageDuration = 0,
    playCount = 0,
    uv = 0,
    viewCount = 0,
    browseViewCount = 0,
    changeDetailCount,
    averageChangeCount,
    averageViewDuration
  } = item;
  const browserCount = browseViewCount || viewCount;
  let prevViewCount = null;
  if (browseViewCount) {
    prevViewCount = prevItem ? prevItem.browseViewCount : null;
  } else {
    prevViewCount = prevItem ? prevItem.viewCount : null;
  }

  return {
    averageBrowseChainRatio: chainRatioFormula(averageViewCount, prevItem ? prevItem.averageViewCount : null),
    averagePlayChainRatio: chainRatioFormula(averagePlayCount, prevItem ? prevItem.averagePlayCount : null),
    averagePlayDurationChainRatio: chainRatioFormula(averageDuration, prevItem ? prevItem.averageDuration : null),
    averageViewDurationChainRatio: chainRatioFormula(averageViewDuration, prevItem ? prevItem.averageViewDuration : null),
    browseViewChainRatio: chainRatioFormula(browserCount, prevViewCount),
    playChainRatio: chainRatioFormula(playCount, prevItem ? prevItem.playCount : null),
    uvChainRatio: chainRatioFormula(uv, prevItem ? prevItem.uv : null),
    averageJumpoutRatio: chainRatioFormula(averageChangeCount, prevItem ? prevItem.averageChangeCount : null),
    jumpoutRatio: chainRatioFormula(changeDetailCount, prevItem ? prevItem.changeDetailCount : null)
  };
}

export function formatterChargeable(isChargeable): string {
  if (!Number.isSafeInteger(isChargeable)) {
    return '-';
  }
  if (Number(isChargeable) === 0) {
    return '免费';
  } else if (Number(isChargeable) === 1) {
    return '收费';
  }
}

export function formatterAverage(num: Number): string {
  return Number(num).toFixed(1);
}
