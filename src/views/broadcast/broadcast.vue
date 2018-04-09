<template>
  <!-- <h1>这个是数据概览页面</h1> -->
<el-row class="main-body">
  <el-col :span="24">
    <grid-date-duration
      :currentPage="params.pageNum"
      title="直播数据"
      v-on:changePanelStatus="changeFilterPanel"
      v-on:changeDateUnitStatus="changeDateUnit"
      v-on:changeDateDurations="changeDateDuration"></grid-date-duration>
    <FilterPanel 
      :class="[{ 'show': showClick }]"
      :systemName='systemName'
      :platform='platform'
      v-on:changeVersion="changeVersions" />
    <el-row class="table_nav">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
           <!-- <div class="data_table">数据报表</div> -->
            <el-input class="programName"
              placeholder="直播名称"
              suffix-icon="el-icon-search"
              v-model="nameValue">
            </el-input>
            <el-input class="programName"
              placeholder="直播Code"
              suffix-icon="el-icon-search"
              v-model="codeValue">
            </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <grid-table
      v-if="tableData"
      :tableData="tableData"
      emptyText="直播为空"
      v-on:tableReSort="tableSort"
      v-on:upgradeLineChart="fetchLineChart">
      <el-table-column
        fixed
        prop="name"
        label="直播名称"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        fixed
        width="180">
      </el-table-column>
      <el-table-column
        prop="contentType"
        label="类型"
        fixed
        width="80">
      </el-table-column>
      <el-table-column
        prop="livePeriod"
        label="直播起止时间"
        fixed
        width="130">
      </el-table-column>
      <el-table-column
        label="基本指标">
        <el-table-column
          prop="viewCount"
          label="浏览量"
          sortable="custom"
          width="100">
        </el-table-column>
        <el-table-column
          prop="playCount"
          label="播放量"
          sortable="custom"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="uv"
          label="UV"
         sortable="custom"
          min-width="120">
        </el-table-column>
         <el-table-column
          prop="averageDuration"
          :formatter="averageDurationFomat"
          label="平均播放时长"
          min-width="120">
        </el-table-column>
         <el-table-column
          prop="averageViewCount"
          label="平均浏览次数"
          min-width="120">
        </el-table-column>
         <el-table-column
          prop="averagePlayCount"
          label="平均进出次数"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="reserveCount"
          label="预约"
        sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="shareCount"
          label="分享"
          sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="sharePersonCount"
          label="分享人次"
          :formatter="formatterSharePersonCount"
          sortable="custom"
          min-width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="互动指标">
        <el-table-column
          prop="barrageCount"
          label="弹幕量"
          sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="barragePersonCount"
          label="弹幕人次"
          sortable="custom"
          :formatter="formatterPersonCount"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="averageBarrageCount"
          label="平均弹幕次数"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="giftCount"
          label="送礼量"
          sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="giftPersonCount"
          label="送礼人次"
          :formatter="formatterPersonCount"
          sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="averageGiftCount"
          label="平均送礼次数"
          min-width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="付费指标">
        <el-table-column
          prop="payUser"
          label="付费用户"
         sortable="custom"
          min-width="120">
        </el-table-column>
          <el-table-column
          prop="payRate"
          label="付费率"
          sortable="custom"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="购买订单数"
          sortable="custom"
          min-width="120">
        </el-table-column>
         <el-table-column
          prop="redeemCount"
          label="兑换数"
          sortable="custom"
          min-width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="明细数据">
        <el-table-column
          label='浏览量'>
          <el-table-column
            prop="viewCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="viewCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='播放量'>
          <el-table-column
            prop="playCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="playCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='UV'>
          <el-table-column
            prop="uvI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="uvA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='平均播放时长'>
          <el-table-column
            prop="averageDurationI"
            :formatter="averageDurationFomat"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="averageDurationA"
            :formatter="averageDurationFomat"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='平均浏览次数'>
          <el-table-column
            prop="averageViewCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="averageViewCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='平均进出次数'>
          <el-table-column
            prop="averagePlayCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="averagePlayCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='预约'>
          <el-table-column
            prop="reserveCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="reserveCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='分享'>
          <el-table-column
            prop="shareCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="shareCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='分享人次'>
          <el-table-column
            prop="sharePersonCountI"
          :formatter="formatterSharePersonCount"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="sharePersonCountA"
          :formatter="formatterSharePersonCount"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='弹幕量'>
          <el-table-column
            prop="barrageCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="barrageCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='弹幕人次'>
          <el-table-column
            prop="barragePersonCountI"
          :formatter="formatterPersonCount"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="barragePersonCountA"
          :formatter="formatterPersonCount"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='平均弹幕次数'>
          <el-table-column
            prop="averageBarrageCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="averageBarrageCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='送礼量'>
          <el-table-column
            prop="giftCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="giftCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='送礼人次'>
          <el-table-column
            prop="giftPersonCountI"
          :formatter="formatterPersonCount"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="giftPersonCountA"
          :formatter="formatterPersonCount"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='平均送礼人次'>
          <el-table-column
            prop="averageGiftCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="averageGiftCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='付费用户'>
          <el-table-column
            prop="payUserI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="payUserA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='付费率'>
          <el-table-column
            prop="payRateI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="payRateA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='购买订单数'>
          <el-table-column
            prop="orderCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="orderCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label='兑换数'>
          <el-table-column
            prop="redeemCountI"
            label="iOS"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="redeemCountA"
            label="Android"
            width="120"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </grid-table>
    <div class="bottom_style">
      <a :href= "downloadProgramURL" target="_blank" style= "color:#fff" type="primary" class="download button-primary" ><i class=" fa fa-cloud-download"></i> 下载数据明细</a>
      <div class="pageSize">
        <el-pagination
          :page-size= "params.pageSize"
          layout="prev, pager, next, jumper"
          :total="totalPageNum * params.pageSize"
          :current-page="params.pageNum + 1"
          @current-change="pageChange">
        </el-pagination>
        <el-select v-model="params.pageSize" @change="entry" placeholder="每页10条" class="pageCount" style= "padding-right:0px">
          <el-option
            v-for="item in options_topic"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>  
      </div>
    </div>   
  </el-col>
  <!-- 折线图显示开始 -->
   <el-col :span="24" class="second_nav">
      <div class="grid-content bg-purple-dark">
        <div class="programLine">直播趋势(<span v-if="currentItem" v-text="currentItem.name"></span> <span v-if="currentItem" v-text="currentItem.code"></span>)</div>
      </div>
    <section class="echartsLine el-col-24"  >
      <play-view :option="options[0]" v-if="options[0] && pvuEcharts && pvuEcharts.playArr" :styles="styles"></play-view>
      <play-view :option="options[1]" v-if="options[1] && pvuEcharts && pvuEcharts.averagePlayDuration" :styles="styles"></play-view>
      <play-view :option="options[2]" v-if="options[2] && pvuEcharts && pvuEcharts.averagePlay" :styles="styles"></play-view>  
    </section>
   </el-col>
    <!-- <Brocast-Echarts :timeRadio="timeRadio"> </Brocast-Echarts > -->
  <!-- 折线图显示结束 -->
</el-row>
</template>
<script>
import Api from '../api/api.js';
import moments from '../api/moments.js';
import { APIORIGIN, SYSTEMS, PAGESIZE_OPTIONS, APIParams } from 'views/api/meta.js';
import PlayView from 'components/play-view-uv.vue';
import FilterPanel from 'components/filter-panel.vue';
import GridDateDuration from 'components/grid-date-duration.vue';
import GridTable from 'components/grid-table.vue';
import options from '../echarts_options/lineChartOptions.js';
import { getLiveLineChart } from 'views/api/live.js';
import { initEachartsData } from '../echarts_options/lineChartData.js';

export default {
  data() {
    return {
      options: [],
      // programTag: '',
      platform: {
        ios: [],
        android: []
      },
      params: APIParams(),
      checkedLauncher: [],
      // launcher: [],
      checkedSystemList: [],
      showClick: false,
      codeValue: '',
      nameValue: '',
      dataDuration: false,
      downloadProgramURL: '',
      tableData: [],
      totalPageNum: 0,
      systemName: SYSTEMS,
      options_topic: PAGESIZE_OPTIONS,
      valuePage: 10,
      styles: {width: '1000px', height: '300px'},
      currentItem: '',
      pvuEcharts: initEachartsData()
    };
  },
  components: {
    PlayView,
    FilterPanel,
    GridDateDuration,
    GridTable
  },
  created() {
    this.getDate();
    this.upgradeView();
    this.program_downLoad();
  },
  methods: {
    changeFilterPanel() {
      this.showClick = !this.showClick;
    },
    changeDateUnit({startDate, endDate, dateUnit}) {
      this.params.startDate = startDate;
      this.params.endDate = endDate;
      this.params.unitType = dateUnit;
      if (this.params.pageNum === 0) {
        this.programApi({});
      } else {
        this.params.pageNum = 0;
      }
    },
    changeDateDuration({startDate, endDate}) {
      this.params.startDate = startDate;
      this.params.endDate = endDate;
      if (this.params.unitType === 'day') {
        if (this.params.pageNum === 0) {
          this.programApi({});
        } else {
          this.params.pageNum = 0;
        }
      } else {
        this.params.unitType = 'day';
      }
    },
    changeVersions({version, show}) {
      this.params.version = version;
      this.programApi({});
      this.showClick = show;
    },
    formaterLineData(items = []) {
      const echartsData = this.pvuEcharts;
      if (items && items.length > 0) {
        items.map((item, index) => {
          const {
            averageBrowseChainRatio,
            averagePlayChainRatio,
            averagePlayDurationChainRatio,
            browseViewChainRatio,
            playChainRatio,
            uvChainRatio,
            averagePlayDuration,
            averagePlayCount,
            averageViewCount,
            uv,
            browseViewCount,
            playCount,
            dataPeriod
          } = item;
          // console.log(item.browseViewChainRatio);
          echartsData.playArr = this.rebuildArray(echartsData.playArr, playCount);
          echartsData.viewArr = this.rebuildArray(echartsData.viewArr, browseViewCount);
          echartsData.UVArr = this.rebuildArray(echartsData.UVArr, uv);
          echartsData.xAxis[index] = dataPeriod;
          echartsData.viewHb = this.rebuildArray(echartsData.viewHb, browseViewChainRatio);
          echartsData.playHb = this.rebuildArray(echartsData.playHb, playChainRatio);
          echartsData.uvHb = this.rebuildArray(echartsData.uvHb, uvChainRatio);
          echartsData.averagePlayDuration = this.rebuildArray(echartsData.averagePlayDuration, averagePlayDuration);
          echartsData.averagePlayDurationRatio = this.rebuildArray(echartsData.averagePlayDurationRatio, averagePlayDurationChainRatio);
          echartsData.averagePlayRatio = this.rebuildArray(echartsData.averagePlayRatio, averagePlayChainRatio);
          echartsData.averageBrowseRatio = this.rebuildArray(echartsData.averageBrowseRatio, averageBrowseChainRatio);
          echartsData.averagePlay = this.rebuildArray(echartsData.averagePlay, averagePlayCount);
          echartsData.averageView = this.rebuildArray(echartsData.averageView, averageViewCount);
        });
        return this.pvuEcharts;
      } else {
        this.pvuEcharts = initEachartsData();
      }
      return this.pvuEcharts;
      // return this.pvuEcharts;
    },
    rebuildArray(a = [], b) {
      return [...a, b];
    },
    upgradeView(data) {
      const echartsData = this.formaterLineData(data);

      const {
        viewArr = [],
        playArr = [],
        UVArr = [],
        playHb = [],
        viewHb = [],
        uvHb = [],
        xAxis = ['0', '0', '0', '0', '0', '0', '0'],
        averagePlayDuration,
        averagePlayDurationRatio = [],
        averagePlayRatio = [],
        averageBrowseRatio = [],
        averagePlay = [],
        averageView = []
      } = echartsData;

      this.options[0] = options.pvuOptions({
        seriesData: [viewArr, playArr, UVArr],
        tooltipData: [viewHb, playHb, uvHb],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['播放量', '浏览量', 'UV'],
        dataDuration: this.dataDuration
      });
      this.options[1] = options.pvuOptions({
        seriesData: [averagePlayDuration],
        tooltipData: [averagePlayDurationRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均播放时长'],
        dataDuration: this.dataDuration,
        isTimeStype: true
      });
      this.options[2] = options.pvuOptions({
        seriesData: [averagePlay, averageView],
        tooltipData: [averagePlayRatio, averageBrowseRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均播放次数', '平均浏览次数'],
        dataDuration: this.dataDuration
      });
    },
    transformTableData(tabledata = [], { startDate, endDate }) {
      return tabledata.map(item => {
        return Object.assign(item, {
          startDate,
          endDate
        });
      });
    },
    fetchLineChart(row) {
      this.currentItem = row;
      const startDate = row.startDate || this.params.startDate;
      const endDate = row.endDate || this.params.endDate;
      this.upgradeView();
      getLiveLineChart({
        startDate,
        endDate,
        code: row.code,
        version: this.params.version,
        unitType: this.params.unitType
      }).then(res => {
        let result = res;
        this.upgradeView(result);
      });
    },
    programApi({
      startDate = this.params.startDate,
      endDate = this.params.endDate,
      version = this.params.version,
      sort = this.params.sort,
      order = this.params.order,
      pageNum = this.params.pageNum,
      val = this.params.unitType
    }, name = {}) {
      this.currentItem = '';
      // const initEchartsData = this.formaterLineData();
      this.upgradeView();

      Api.getBroadcast({
        startDate,
        endDate,
        version,
        sort,
        order,
        pageNum,
        pageSize: this.params.pageSize,
        unitType: val,
        ...name
      }).then((response) => {
        if (response && response.data) {
          this.tableData = this.transformTableData(response.data, { startDate, endDate, dataUnit: val });
          this.totalPageNum = response.totalPageNum;
        } else {
          this.tableData = [];
          this.totalPageNum = 0;
        }
        this.program_downLoad();
      });
    },
    averageDurationFomat(row, col, cell) {
      return moments.format(cell);
    },
    formatterPersonCount(row, col, cell) {
      const cellType = typeof cell;
      if (cellType === 'number' && row.playUv) {
        const ratio = Number(cell / row.playUv).toFixed(2);
        return `${cell}(${100 * ratio}%)`;
      }
      return cell;
    },
    formatterSharePersonCount(row, col, cell) {
      const cellType = typeof cell;
      if (cellType === 'number' && row.uv) {
        const ratio = Number(cell / row.uv).toFixed(2);
        return `${cell}(${100 * ratio}%)`;
      }
      return cell;
    },
    getDate() {
      Api.getConfig().then(res => {
        if (res) {
          this.platform = res;
          this.versionFilter();
        }
        this.getContent();
      });
    },
    getContent() {
      if (this.params.pageNum === 0) {
        this.programApi({});
      } else {
        this.params.pageNum = 0;
      }
    },
    // 排序
    tableSort({sort, tableItemOrder}) {
      this.params.sort = sort;
      this.params.order = tableItemOrder;
      this.programApi({});
    },
    // 每页10，50，100，200条
    entry(pageSize) {
      this.params.pageSize = pageSize;
      if (this.params.pageNum === 0) {
        this.programApi({});
      } else {
        this.params.pageNum = 0;
      }
    },
    // 查询
    search() {
      if (this.codeValue !== '' || this.nameValue !== '') {
        const data = {};
        if (this.nameValue) {
          data.name = this.nameValue;
          data.code = '';
        } else {
          data.code = this.codeValue;
          data.name = '';
        }
        if (!this.data || (this.data && !this.data.length)) {
          this.tableData = [];
        }
        this.programApi({endDate: this.params.endDate, version: this.params.version}, data);
      } else {
        this.programApi({endDate: this.params.endDate, version: this.params.version});
      }
    },
    program_downLoad() {
      const origin = `${APIORIGIN}newVR-bi/bianalysis/live/downLoad`;
      this.downloadProgramURL = `${origin}?startDate=${this.params.startDate}&endDate=${this.params.endDate}&version=${this.params.version}&code=${this.codeValue}&name=${this.nameValue}&sort=${this.params.sort}&order=${this.params.order}&pageNum=${this.params.pageNum}&pageSize=${this.params.pageSize}`;
    },
    // 页码切换
    pageChange(size) {
      this.params.pageNum = size - 1;
      this.programApi({
        pageNum: size - 1
      });
    },
    // 筛选
    versionFilter(hadInit = true) {
      let iosList = [];
      let androidList = [];
      iosList = this.platform.ios.map((item) => {
        return 'IOS_' + item;
      });
      androidList = this.platform.android.map((item) => {
        return 'Android_' + item;
      });
      // const laucherList = this.platform.checkedLauncher.map((item) => {
      //   return 'Launcher_' + item;
      // });
      const versions = [...iosList, ...androidList].join(',');
      this.params.version = versions.slice(0);
    }
  }
};
</script>
