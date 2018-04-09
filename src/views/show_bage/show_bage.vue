<template>
<el-row class="main-body">
  <grid-date-duration
    :currentPage="params.pageNum"
    title="节目包数据"
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
          placeholder="节目包名称"
          suffix-icon="el-icon-search"
          v-model="nameValue">
        </el-input>
        <el-input class="programName"
          placeholder="节目包Code"
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
    emptyText="节目包为空"
    v-on:tableReSort="tableSort"
    v-on:upgradeLineChart="fetchLineChart"
    >
    <el-table-column
      fixed
      prop="name"
      label="节目包名称"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="Code"
      fixed
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      fixed
      width="100">
    </el-table-column>
    <el-table-column
      label="基本指标">
      <el-table-column
        prop="viewCount"
        label="浏览量"
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
        prop="averageViewDuration"
        :formatter="averageDurationFomat"
        label="平均浏览时长"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="changeDetailCount"
        label="跳转详情次数"
       sortable="custom"
        min-width="150">
      </el-table-column>
       <el-table-column
        prop="changeDetailPeopleCount"
        label="跳转详情人次"
        sortable="custom"
        min-width="150">
      </el-table-column>
       <el-table-column
        prop="averageViewCount"
        label="平均浏览次数"
        min-width="120">
      </el-table-column>
        <el-table-column
        prop="averageChangeCount"
        label="平均跳转次数"
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
        sortable="custom"
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
        prop="buyCount"
        label="购买订单数"
        sortable="custom"
        min-width="120">
      </el-table-column>
       <el-table-column
        prop="exchangeCount"
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
        label='平均浏览时长'>
        <el-table-column
          prop="averageViewDurationI"
          :formatter="averageDurationFomat"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="averageViewDurationA"
          :formatter="averageDurationFomat"
          label="Android"
          width="120"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label='跳转详情次数'>
        <el-table-column
          prop="changeDetailCountI"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="changeDetailCountA"
          label="Android"
          width="120"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label='跳转详情人次'>
        <el-table-column
          prop="changeDetailPeopleCountI"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="changeDetailPeopleCountA"
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
        label='平均跳转次数'>
        <el-table-column
          prop="averageChangeCountI"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="averageChangeCountA"
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
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="sharePersonCountA"
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
          prop="buyCountI"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="buyCountA"
          label="Android"
          width="120"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label='兑换数'>
        <el-table-column
          prop="exchangeCountI"
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="exchangeCountA"
          label="Android"
          width="120"
        >
        </el-table-column>
      </el-table-column>
    </el-table-column>

  </grid-table>
  <div class="bottom_style">
    <a :href="downloadProgramURL" target="_blank" type="primary" class="button-primary"> <i class=" fa fa-cloud-download"></i>
      下载数据明细
    </a>
    <!-- Example of cloud-download -->
    <div class="pageSize">
      <el-pagination
        :page-size= "params.pageSize"
        layout="prev, pager, next, jumper"
        :total="totalPageNum * params.pageSize"
        :current-page="params.pageNum +1"
        @current-change="pageChange">
      </el-pagination>
      <el-select v-model="params.pageSize" @change="entry" placeholder="每页10条" style= "padding-right:0px">
        <el-option
          v-for="item in options_topic"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
   <el-col :span="24" class="second_nav">
    <div class="grid-content bg-purple-dark">
      <div class="programLine">节目包趋势(<span v-if="currentItem" v-text="currentItem.name"></span> <span v-if="currentItem" v-text="currentItem.code"></span>)</div>
    </div>
    <section class="echartsLine el-col-24"  >
      <play-view :option="options[0]" v-if="pvuEcharts && pvuEcharts.viewArr " :styles="styles"></play-view>
      <!-- <play-view :option="options[1]"  v-if="avgPlayTime && avgPlayTime.playTimeArr.length > 0 " :styles="styles" class="second_line"></play-view> -->
      <play-view :option="options[2]"  v-if="options[2] && pvuEcharts && pvuEcharts.averageView" :styles="styles"></play-view>  
    </section>
  </el-col>
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
import setLineOptions from '../echarts_options/lineChartOptions.js';
import { getLineChart } from 'views/api/program-package.js';
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
            averageJumpoutRatio,
            averageViewDurationChainRatio,
            browseViewChainRatio,
            averageBrowseChainRatio,
            jumpoutRatio,
            uvChainRatio,
            averageViewDuration,
            averageViewCount,
            averageChangeCount,
            uv,
            viewCount,
            changeDetailCount,
            dataPeriod
          } = item;
          // console.log(item);
          echartsData.jumpoutArr = this.rebuildArray(echartsData.jumpoutArr, changeDetailCount);
          echartsData.viewArr = this.rebuildArray(echartsData.viewArr, viewCount);
          echartsData.UVArr = this.rebuildArray(echartsData.UVArr, uv);
          echartsData.xAxis[index] = dataPeriod;
          echartsData.viewHb = this.rebuildArray(echartsData.viewHb, browseViewChainRatio);
          echartsData.jumpoutHb = this.rebuildArray(echartsData.jumpoutHb, jumpoutRatio);
          echartsData.uvHb = this.rebuildArray(echartsData.uvHb, uvChainRatio);

          echartsData.averageViewDuration = this.rebuildArray(echartsData.averageViewDuration, averageViewDuration);
          echartsData.averageViewDurationRatio = this.rebuildArray(echartsData.averageViewDurationRatio, averageViewDurationChainRatio);
          echartsData.averageJumpout = this.rebuildArray(echartsData.averageJumpout, averageChangeCount);
          echartsData.averageJumpoutRatio = this.rebuildArray(echartsData.averageJumpoutRatio, averageJumpoutRatio);

          echartsData.averageView = this.rebuildArray(echartsData.averageView, averageViewCount);
          echartsData.averageViewRatio = this.rebuildArray(echartsData.averageViewRatio, averageBrowseChainRatio);
        });
      } else {
        this.pvuEcharts = initEachartsData();
      }
    },
    rebuildArray(a = [], b) {
      return [...a, b];
    },
    upgradeView(data) {
      this.formaterLineData(data);
      const {
        viewArr = [],
        UVArr = [],
        jumpoutArr = [],
        viewHb = [],
        uvHb = [],
        jumpoutHb = [],
        xAxis = ['0', '0', '0', '0', '0', '0', '0'],
        averageViewRatio = [],
        averageJumpoutRatio = [],
        averageView = [],
        averageJumpout = [],
        averageViewDuration = [],
        averageViewDurationRatio
      } = this.pvuEcharts;

      this.options[0] = setLineOptions.pvuOptions({
        seriesData: [viewArr, jumpoutArr, UVArr],
        tooltipData: [viewHb, jumpoutHb, uvHb],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['浏览量', '跳转量', 'UV'],
        dataDuration: this.dataDuration
      });
      this.options[1] = setLineOptions.pvuOptions({
        seriesData: [averageViewDuration],
        tooltipData: [averageViewDurationRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均浏览时长'],
        dataDuration: this.dataDuration,
        isTimeStype: true
      });
      this.options[2] = setLineOptions.pvuOptions({
        seriesData: [averageView, averageJumpout],
        tooltipData: [averageViewRatio, averageJumpoutRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均浏览次数', '平均跳转次数'],
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
      getLineChart({
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
      this.upgradeView();

      Api.getProgramSet({
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
      const origin = `${APIORIGIN}newVR-bi/bianalysis/programSet/downLoad`;
      this.downloadProgramURL = `${origin}?startDate=${this.params.startDate}&endDate=${this.params.endDate}&version=${this.params.version}&code=${this.codeValue}&name=${this.nameValue}&sort=${this.params.sort}&order=${this.params.order}&pageNum=${this.params.pageNum}&pageSize=${this.params.pageSize}`;
    },
    // 页码切换
    pageChange(size) {
      this.params.pageNum = size - 1;
      this.programApi({
        pageNum: size - 1
      });
    },
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
