<template>
  <div class="linecharts-container">
    <div id="index_charts" ref="linecharts" ></div>
    <div v-if="option && option.series && !option.series[0].data.length" class="line-chart__empty-text">
      <p>没有数据</p>
    </div>
  </div>
</template>

<script>
import { init } from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

export default {
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    styles: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.initWidth();
    this.getUserChartInit();
  },
  watch: {
    option(newValue, oldValue) {
      this.getUserChartInit(newValue);
    }
  },
  methods: {
    getUserChartInit(newValue = null) {
      const lineCharts = this.$refs.linecharts;
      const myChart = init(lineCharts);
      myChart.showLoading();

      myChart.setOption(newValue || this.option);
      myChart.hideLoading();
    },
    initWidth() {
      const lineCharts = this.$refs.linecharts;
      lineCharts.style.width = this.styles.width;
      lineCharts.style.height = this.styles.height;
    }
  }
};
</script>
