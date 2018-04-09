/**
 * 播放量、浏览量
 */
import moments from '../../api/moments';

const echartOptions = {
  tooltip: {
    trigger: 'axis',
    borderColor: '#eee',
    padding: [10, 10, 10, 10],
    backgroundColor: 'rgb(51, 61, 80)'
  },
  legend: {
    type: 'plain',
    orient: 'vertical',
    itemGap: 15,
    right: 5,
    top: 80,
    bottom: 20,
    itemHeight: 12,
    borderColor: '#eee'
  },
  color: ['#5e9dd6', '#ed7d31', '#ff0400'],
  textStyle: {
    lineHeight: 40
  },
  grid: {
    left: '2%',
    right: '12%',
    bottom: '5%',
    top: '12%',
    containLabel: true,
    borderColor: '#eee',
    backgroundColor: '#000'
  },
  series: {
    type: 'line',
    symbol: 'circle',
    symbolSize: 6,
    smooth: false
  }
};

function initSeries(legendData, seriesData) {
  if (!seriesData || seriesData[0].length <= 0) {
    return legendData.map(item => {
      return {
        'data': 0,
        'name': item,
        ...echartOptions.series
      };
    });
  }
  return seriesData.map((item, index) => {
    return {
      'data': item,
      'name': legendData[index],
      ...echartOptions.series
    };
  });
}

function pvuOptions({
  seriesData,
  tooltipData,
  legendData,
  xAxisData,
  timeRadio,
  dataDuration,
  isTimeStype = false
}) {
  return {
    tooltip: {
      ...echartOptions.tooltip,
      formatter: (params) => {
        let ratiosTemplate = '';
        let labelTemplate = '';
        let listTemplate = '';

        params.forEach((items, index) => {
          labelTemplate += `<p class="markerLine"><span class="marker" style="background:${items.color}">${items.marker}<span style="padding-right: 10px;"></span></span>${items.seriesName}</p>`;
          listTemplate += `<p ><span style="padding-left: 6px;"></span>${isTimeStype ? moments.format(items.data) : items.data}</p>`;
          ratiosTemplate = ratiosTemplate + '<p>' + tooltipRatio(tooltipData[items.seriesIndex][items.dataIndex]) + '</p>';
          // return labelTemplate;
        });
        ratiosTemplate = '<div class="tooltip-grid-item"><p>环比</p>' + ratiosTemplate + '</div></div>';
        labelTemplate = '<div class="tooltip-grid">' +
          '<div class="tooltip-grid-item">' +
          '<p>' + params[0].axisValueLabel + '</p>' +
          labelTemplate +
          '</div>' +
          '<div class="tooltip-grid-item"><p style="opacity: 0">hi</p>' +
          listTemplate +
          '</div>';
        return labelTemplate + ratiosTemplate;
      }
    },
    legend: {
      ...echartOptions.legend,
      data: legendData
    },
    color: echartOptions.color,
    textStyle: echartOptions.textStyle,
    grid: echartOptions.grid,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        formatter: (value, index) => {
          if (timeRadio === 'month') {
            const monthIndex = value.indexOf('月');
            return monthIndex ? value.slice(0, monthIndex + 1) : value;
          }
          return value;
        }
      }
    },
    yAxis: {
      type: 'value',
      min: (value) => {
        if (Number.isFinite(value.min)) {
          return value.min;
        }
        return 0;
      },
      max: (value) => {
        if (Number.isFinite(value.max)) {
          return value.max;
        }
        return 7;
      },
      axisLabel: {
        formatter: (value, index) => {
          // console.log(value);
          if (isTimeStype) {
            return moments.format(value);
          } else {
            return value;
          }
        }
      }
    },
    series: initSeries(legendData, seriesData)
  };
}

function tooltipRatio(ratio: number) {
  if (ratio < 0) {
    return `<span style="color:red ">-${Math.abs(ratio * 100).toFixed(2)}%</span>`;
  }
  if (ratio > 0) {
    return `<span style="color:#1cc70e">+${Math.abs(ratio * 100).toFixed(2)}%</span>`;
  }
  return ratio;
}
export default {
  pvuOptions
};
