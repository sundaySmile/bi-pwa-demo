<template >
<div class='main-body'>
  
  <a href="javascript:;" @click="getDate">click</a>
  <grid-date-duration
    :currentPage="params.pageNum"
    v-on:changePanelStatus="changeFilterPanel"
    v-on:changeDateUnitStatus="changeDateUnit"
    v-on:changeDateDurations="changeDateDuration"></grid-date-duration>
  <FilterPanel 
    :class="[{ 'show': showClick }]"
    :systemName='systemName'
    :platform='platform'
    :contentType='contentType'
    v-on:changeVersion="changeVersions" />
  <section class="echartsLine">
    <play-view :option="options[0]" v-if="options[0] && pvuEcharts && pvuEcharts.playArr" :styles="styles"></play-view>
    <play-view :option="options[1]" v-if="options[1] && pvuEcharts && pvuEcharts.averagePlayDuration" :styles="styles"></play-view>
    <play-view :option="options[2]" v-if="options[2] && pvuEcharts && pvuEcharts.averagePlay" :styles="styles"></play-view>
  </section>

  <!-- 折线图显示结束 -->
  <div class='table_nav'>
    <div class='grid-content bg-purple-dark'>
      <p class='data_show'>数据报表</p>
    </div>
  </div>
  <grid-table
    v-if="tableData"
    :tableData="tableData"
    v-on:tableReSort="() => {}"
    v-on:upgradeLineChart="() => {}"
    >
    <el-table-column
      fixed
      prop='dataPeriod'
      :label='dateLable(dataDuration)'
      min-width='180'
      ></el-table-column>
    <el-table-column
      label='基础指标'>
      <el-table-column
        prop='viewCount'
        label='浏览量'
        min-width='120'></el-table-column>
      <el-table-column
        prop='playCount'
        label='播放量'
        min-width='120'></el-table-column>
      <el-table-column
        prop='uv'
        label='UV'
        min-width='120'></el-table-column>
      <el-table-column
        prop='averageDuration'
        label='平均播放时长'
        :formatter='averageDurationFomat'
        min-width='120'></el-table-column>
      <el-table-column
        prop='averageViewCount'
        label='平均浏览次数'
        min-width='120'></el-table-column>
      <el-table-column
        prop='averagePlayCount'
        label='平均播放次数'
        min-width='120'></el-table-column>
      <el-table-column
        prop='shareCount'
        label='分享'
        min-width='120'></el-table-column>
      <el-table-column
        prop='sharePersonCount'
        label='分享人次'
        min-width='120'></el-table-column>
    </el-table-column>
    <el-table-column
      label='明细数据'>
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
          :formatter='averageDurationFomat'
          label="iOS"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="averageDurationA"
          :formatter='averageDurationFomat'
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
        label='平均播放次数'>
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
    </el-table-column>
  </grid-table>
  <div class="bottom_style">
    <a :href='downloadURL' class='download button-primary' target='_blank' > <i class=' fa fa-cloud-download'></i>
      下载数据明细
    </a>
    <div class='pageSize'>
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
</div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    APIRequestParams
  } from 'ployfill/field-types';
  import Api from 'api';
  import moments from 'api/moments';
  import { APIORIGIN, SYSTEMS, PAGESIZE_OPTIONS, APIParams } from 'api/meta';
  import { getOverallView, getLineChart } from 'api/overall-preview';
  import { initEachartsOption, LineData } from 'views/echarts_options/lineChartData';
  import setLineOptions from 'views/echarts_options/lineChartOptions';
  import PlayView from 'components/play-view-uv.vue';
  import FilterPanel from 'components/filter-panel.vue';
  // import GridDateDuration from 'components/grid-date-duration.vue';

  const platforms = ['live', 'recorded'];

  @Component({
    components: {
      PlayView,
      FilterPanel
      // GridDateDuration
    }
  })

  export default class Overview extends Vue {
    options: Array<any> = []
    platform: any = {}
    params: APIRequestParams = APIParams()
    checkedLauncher: string[] = []
    checkedSystemList: string[] = []
    showClick: boolean = false
    codeValue: string = ''
    nameValue: string = ''
    dataDuration: boolean = false
    downloadURL: string = ''
    tableData: Array<any> = []
    totalPageNum: number = 0
    systemName: string[] = SYSTEMS
    options_topic: Array<any> = PAGESIZE_OPTIONS
    styles: any = {
      width: '1000px',
      height: '300px'
    }
    currentItem: string = ''
    checkedObject: string[] = [...platforms]
    contentType: string[] = platforms
    pvuEcharts: LineData = {...initEachartsOption}

    created() {
      this.getDate();
      // this.upgradeView([]);
      this.indexDownLoad();
    }

    mounted() {
      console.log(this);
    }

    dateLable(dataDuration: boolean) {
      return dataDuration ? '自定义时段' : (this.params.unitType === 'day') ? '最近7日' : this.params.unitType === 'week' ? '最近7周' : '最近7月';
    }
    changeFilterPanel() {
      this.showClick = !this.showClick;
    }
    changeDateUnit({startDate, endDate, dateUnit}) {
      this.params.startDate = startDate;
      this.params.endDate = endDate;
      this.params.unitType = dateUnit;
      if (Number(this.params.pageNum) === 0) {
        this.indexApi();
      } else {
        this.params.pageNum = 0;
      }
      this.fetchLineChart();
    }
    changeDateDuration({startDate, endDate}) {
      this.params.unitType = 'day';
      this.params.startDate = startDate;
      this.params.endDate = endDate;
      // if (this.params.unitType === 'day') {
      if (this.params.pageNum === 0) {
        this.indexApi();
      } else {
        this.params.pageNum = 0;
      }
      this.fetchLineChart();
      this.dataDuration = true;
    }
    changeVersions({version, show, contentType}) {
      this.params.version = version;
      this.checkedObject = contentType;
      this.indexApi();
      this.fetchLineChart();
      this.showClick = show;
    }
    formaterLineData(items: Array<any>) {
      items.map((item, index) => {
        const {
          averageBrowseChainRatio,
          averagePlayChainRatio,
          averagePlayDurationChainRatio,
          browseViewChainRatio,
          playChainRatio,
          uvChainRatio,
          averageDuration,
          averagePlayCount,
          averageViewCount,
          uv,
          viewCount,
          playCount,
          dataPeriod
        } = item;
        this.pvuEcharts.playArr.push(playCount);
        this.pvuEcharts.viewArr.push(viewCount);
        this.pvuEcharts.UVArr.push(uv);
        this.pvuEcharts.xAxis[index] = dataPeriod;
        this.pvuEcharts.viewHb.push(browseViewChainRatio);
        this.pvuEcharts.playHb.push(playChainRatio);
        this.pvuEcharts.uvHb.push(uvChainRatio);
        this.pvuEcharts.averagePlayDuration.push(averageDuration);
        this.pvuEcharts.averagePlayDurationRatio.push(averagePlayDurationChainRatio);
        this.pvuEcharts.averagePlayRatio.push(averagePlayChainRatio);
        this.pvuEcharts.averageBrowseRatio.push(averageBrowseChainRatio);
        this.pvuEcharts.averagePlay.push(averagePlayCount);
        this.pvuEcharts.averageView.push(averageViewCount);
      });
    }
    upgradeView(data: Array<any>) {
      if (data) {
        this.formaterLineData(data);
      }
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
      } = this.pvuEcharts;

      this.options[0] = setLineOptions.pvuOptions({
        seriesData: [viewArr, playArr, UVArr],
        tooltipData: [viewHb, playHb, uvHb],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['播放量', '浏览量', 'UV'],
        dataDuration: this.dataDuration
      });
      this.options[1] = setLineOptions.pvuOptions({
        seriesData: [averagePlayDuration],
        tooltipData: [averagePlayDurationRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均播放时长'],
        dataDuration: this.dataDuration,
        isTimeStype: true
      });
      this.options[2] = setLineOptions.pvuOptions({
        seriesData: [averagePlay, averageView],
        tooltipData: [averagePlayRatio, averageBrowseRatio],
        xAxisData: xAxis,
        timeRadio: this.params.unitType,
        legendData: ['平均播放次数', '平均浏览次数'],
        dataDuration: this.dataDuration
      });
    }
    indexApi() {
      const {
        startDate,
        endDate,
        version,
        pageNum,
        pageSize,
        unitType
      } = this.params;
      getOverallView({
        startDate,
        endDate,
        version,
        pageNum,
        pageSize,
        unitType,
        contentType: this.checkedObject.join(',')
      }).then((response) => {
        if (response && response.data) {
          this.tableData = response.data;
          this.totalPageNum = response.totalPageNum;
        } else {
          this.tableData = [];
          this.totalPageNum = 0;
        }
        this.indexDownLoad();
      });
    }
    fetchLineChart() {
      getLineChart({
        startDate: this.params.startDate,
        endDate: this.params.endDate,
        version: this.params.version,
        unitType: this.params.unitType,
        contentType: this.checkedObject.join(',')
      }).then((response) => {
        this.pvuEcharts = {...initEachartsOption};
        if (response && response.data) {
          this.upgradeView(response.data);
        } else {
          this.upgradeView([]);
        }
      });
    }
    averageDurationFomat(row, col, cell) {
      return moments.format(cell);
    }
    getDate() {
      Api.getConfig().then(res => {
        if (res) {
          this.platform = res;
          this.versionFilter();
        }
        this.fetchLineChart();
        this.getContent();
      });
    }
    getContent() {
      if (this.params.pageNum === 0) {
        this.indexApi();
      } else {
        this.params.pageNum = 0;
      }
    }
    // 筛选
    versionFilter() {
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
    async indexDownLoad() {
      const origin = `${APIORIGIN}newVR-bi/bianalysis/overview/downLoad`;
      this.downloadURL = `${origin}?startDate=${this.params.startDate}&endDate=${this.params.endDate}&version=${this.params.version}&unitType=${this.params.unitType}&contentType=${this.checkedObject.join()}`;
    }
    pageChange(size) {
      this.params.pageNum = size - 1;
      this.indexApi();
    }
    entry() {
      if (this.params.pageNum === 0) {
        this.indexApi();
      } else {
        this.params.pageNum = 0;
      }
    }
  }
</script>

<style scoped> 
.echartsLine {
  margin-top: 30px;
}
</style>
