export interface LineData {
  'viewArr': number[],
  'playArr': number[],
  'UVArr': number[],
  'jumpoutArr': number[],
  'playHb': number[],
  'viewHb': number[],
  'uvHb': number[],
  'jumpoutHb': number[],
  'xAxis': string[],
  'averagePlayDuration': number[],
  'averagePlayDurationRatio': number[],
  'averagePlayRatio': number[],
  'averageBrowseRatio': number[],
  'averageJumpoutRatio': number[],
  'averagePlay': number[],
  'averageView': number[],
  'averageJumpout': number[],
  'averageViewDuration': number[],
  'averageViewDurationRatio': number[]   
}

export const initEachartsOption: LineData = {
  'viewArr': [],
  'playArr': [],
  'UVArr': [],
  'jumpoutArr': [],
  'playHb': [],
  'viewHb': [],
  'uvHb': [],
  'jumpoutHb': [],
  'xAxis': ['0', '0', '0', '0', '0', '0', '0'],
  'averagePlayDuration': [],
  'averagePlayDurationRatio': [],
  'averagePlayRatio': [],
  'averageBrowseRatio': [],
  'averageJumpoutRatio': [],
  'averagePlay': [],
  'averageView': [],
  'averageJumpout': [],
  'averageViewDuration': [],
  'averageViewDurationRatio': []
}

export function initEachartsData() {
  return {
    'viewArr': [],
    'playArr': [],
    'UVArr': [],
    'jumpoutArr': [],
    'playHb': [],
    'viewHb': [],
    'uvHb': [],
    'jumpoutHb': [],
    'xAxis': ['0', '0', '0', '0', '0', '0', '0'],
    'averagePlayDuration': [],
    'averagePlayDurationRatio': [],
    'averagePlayRatio': [],
    'averageBrowseRatio': [],
    'averageJumpoutRatio': [],
    'averagePlay': [],
    'averageView': [],
    'averageJumpout': [],
    'averageViewDuration': [],
    'averageViewDurationRatio': []
  };
};
