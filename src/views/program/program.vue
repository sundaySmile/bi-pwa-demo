<template>
  <div class="main-body">
    <el-col :span="24">
      <grid-date-duration
        :currentPage="params.pageNum"
        title="节目数据"
        v-on:changePanelStatus="changeFilterPanel"
        v-on:changeDateUnitStatus="changeDateUnit"
        v-on:changeDateDurations="changeDateDuration"></grid-date-duration>
      <!-- <transition name="fade" > -->
      <FilterPanel 
        :class="[{ 'show': showClick }]"
        :systemName='systemName'
        :platform='platform'
        v-on:changeVersion="changeVersions" />
      <!-- </transition> -->
      <div class="table_nav">
        <div class="grid-content bg-purple-dark">
          <el-input class="programName"
            placeholder="节目名称"
            suffix-icon="el-icon-search"
            v-model="nameValue"></el-input>
          <el-input class="programName"
            placeholder="节目Code"
            suffix-icon="el-icon-search"
            v-model="codeValue"></el-input>
          <el-select class="programName" v-model="tag" placeholder="按标签搜索" @change="fetchTag">
            <el-option
              v-for="item in tags"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-checkbox v-model="isThrid" class="program-checkbox" @change="fetchThrid">只显示第三方内容</el-checkbox>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
      </div>
      <grid-table
        v-if="tableData"
        :tableData="tableData"
        emptyText="节目为空"
        v-on:tableReSort="tableSort"
        v-on:upgradeLineChart="fetchLineChart">
        <el-table-column
          fixed
          prop="name"
          label="节目名称"
          width="180"></el-table-column>
        <el-table-column
          prop="code"
          label="Code"
          fixed
          width="180"></el-table-column>
          <el-table-column
            prop="isChargeable" 
            label="付费类型"
            width="80"></el-table-column>
        <el-table-column
          label='基础指标'>
          <el-table-column
            prop="viewCount"
            label="浏览量"
            sortable
            min-width="120"></el-table-column>
          <el-table-column
            prop="playCount"
            label="播放量"
            sortable="custom"
            width="100"></el-table-column>
          <el-table-column
            prop="uv"
            label="UV"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="averageDuration"
            label="平均播放时长"
            :formatter="averageDurationFomat"
            min-width="120"></el-table-column>
          <el-table-column
            prop="averageViewCount"
            label="平均浏览次数"
            min-width="120"></el-table-column>
          <el-table-column
            prop="averagePlayCount"
            label="平均播放次数"
            min-width="120"></el-table-column>
          <el-table-column
            prop="collectCount"
            label="加入播单"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="downloadCount"
            label="下载量"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="shareCount"
            label="分享"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="sharePersonCount"
            label="分享人次"
            sortable="custom"
            min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column
          label='付费指标'>
          <el-table-column
            prop="payUserCount"
            label="付费用户"
            sortable="custom"
            min-width="120"> 
          </el-table-column>
          <el-table-column
            prop="payRate"
            label="付费率"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="orderCount"
            label="购买订单数"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="redeemCount"
            label="兑换数"
            sortable="custom"
            min-width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="访问路径指标">
          <el-table-column
            prop="homeJump"
            label="首页跳转"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="topicJump"
            label="专题跳转"
            sortable="custom"
            min-width="120"></el-table-column>
          <el-table-column
            prop="packageJump"
            label="节目包跳转"
            sortable="custom"
            min-width="120">
          </el-table-column>
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
            label='加入播单'>
            <el-table-column
              prop="collectCountI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="collectCountA"
              label="Android"
              width="120"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            label='下载量'>
            <el-table-column
              prop="downloadCountI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="downloadCountA"
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
              prop="payUserCountI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="payUserCountA"
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
          <el-table-column
            label='首页跳转'>
            <el-table-column
              prop="homeJumpI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="homeJumpA"
              label="Android"
              width="120"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            label='专题跳转'>
            <el-table-column
              prop="topicJumpI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="topicJumpA"
              label="Android"
              width="120"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            label='节目包跳转'>
            <el-table-column
              prop="packageJumpI"
              label="iOS"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="packageJumpA"
              label="Android"
              width="120"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </grid-table>
      <div class="bottom_style">
        <!-- download button  -->
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
    </el-col>
    <!-- 折线图显示开始 -->
    <!--v-if="pvuEcharts && pvuEcharts.playArr.length >
    0" -->
    <el-col :span="24" class="second_nav">
      <div class="grid-content bg-purple-dark">
        <div class="programLine">
          节目趋势(
          <span v-if="currentItem" v-text="currentItem.name"></span>
          <span v-if="currentItem" v-text="currentItem.code"></span>
          )
        </div>
      </div>
      <section class="echartsLine el-col-24">
        <play-view :option="options[0]" v-if="options[0] && pvuEcharts && pvuEcharts.playArr" :styles="styles"></play-view>
        <play-view :option="options[1]" v-if="options[1] && pvuEcharts && pvuEcharts.averagePlayDuration" :styles="styles"></play-view>
        <play-view :option="options[2]" v-if="options[2] && pvuEcharts && pvuEcharts.averagePlay" :styles="styles"></play-view>
      </section>
    </el-col>
  <!-- 折线图显示结束 -->
  </div>
</template>

<script >
  import Api from 'api';
  import moments from 'api/moments.ts';
  import { APIORIGIN, SYSTEMS, PAGESIZE_OPTIONS, APIParams } from 'api/meta.ts';
  // import PlayView from 'components/play-view-uv.vue';
  // import FilterPanel from 'components/filter-panel.vue';
  // import GridDateDuration from 'components/grid-date-duration.vue';
  // import GridTable from 'components/grid-table.vue';
  import options from '../echarts_options/lineChartOptions.ts';
  import { getProgramLineChart } from 'api/program.ts';
  import { initEachartsData, initEachartsOption } from '../echarts_options/lineChartData';

  export default {
    data() {
      return {
        options: [],
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
        tag: null,
        tags: ['a', 'b'],
        isThrid: null,
        pvuEcharts: {...initEachartsOption}
      };
    },
    components: {
      'PlayView': () => import('components/play-view-uv.vue'),
      'FilterPanel': () => import('components/filter-panel.vue'),
      'GridDateDuration': () => import('components/grid-date-duration.vue'),
      'GridTable': () => import('components/grid-table.vue')
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
        this.initOptionalParams();
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
        this.initOptionalParams();
        this.params.unitType = 'day';
        this.params.startDate = startDate;
        this.params.endDate = endDate;
        // if (this.params.unitType === 'day') {
        if (this.params.pageNum === 0) {
          this.programApi({});
        } else {
          this.params.pageNum = 0;
        }
        this.dataDuration = true;
      },
      changeVersions({version, show}) {
        this.params.version = version;
        this.initOptionalParams();
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
              viewCount,
              playCount,
              dataPeriod
            } = item;
            echartsData.playArr = this.rebuildArray(echartsData.playArr, playCount);
            echartsData.viewArr = this.rebuildArray(echartsData.viewArr, viewCount);
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
          this.pvuEcharts = {...initEachartsOption};
        }
        return this.pvuEcharts;
        // return this.pvuEcharts;
      },
      rebuildArray(a = [], b) {
        return [...a, b];
      },
      upgradeView(data = []) {
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
          seriesData: [playArr, viewArr, UVArr],
          tooltipData: [playHb, viewHb, uvHb],
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
        getProgramLineChart({
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
        val = this.params.unitType,
        name = this.nameValue, code = this.codeValue, tag = this.tag, isThrid = this.isThrid
      }) {
        this.currentItem = '';
        this.upgradeView();
        const optionalParams = {};
        if (name) {
          optionalParams.name = name;
        }
        if (code) {
          optionalParams.code = code;
        }
        if (tag) {
          optionalParams.tag = tag;
        }
        if (isThrid) {
          optionalParams.isThrid = isThrid;
        }

        Api.getProgram({
          startDate,
          endDate,
          version,
          sort,
          order,
          pageNum,
          pageSize: this.params.pageSize,
          unitType: val,
          ...optionalParams
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
      fetchThrid(val) {
        this.programApi({isThrid: val});
      },
      fetchTag(val) {
        this.programApi({tag: val});
      },
      // 排序
      tableSort({sort, tableItemOrder}) {
        this.params.sort = sort;
        this.params.order = tableItemOrder;
        this.programApi({});
      },
      entry() {
        this.initOptionalParams();
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
          this.programApi({...data});
        } else {
          // let startDate = this.params.startDate;
          this.programApi({});
        }
      },
      program_downLoad() {
        const origin = `${APIORIGIN}newVR-bi/bianalysis/content/downLoad`;
        this.downloadProgramURL = `${origin}?startDate=${this.params.startDate}&endDate=${this.params.endDate}&version=${this.params.version}&code=${this.codeValue}&name=${this.nameValue}&sort=${this.params.sort}&order=${this.params.order}&pageNum=${this.params.pageNum}&pageSize=${this.params.pageSize}`;
      },
      // 页码切换
      pageChange(size) {
        this.initOptionalParams();
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
      },
      initOptionalParams() {
        this.nameValue = null;
        this.codeValue = null;
        this.tag = null;
        this.isThrid = null;
      }
    }
  };
</script>
