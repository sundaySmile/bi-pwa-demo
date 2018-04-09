<template>
<div class="grid-content bg-purple-dark">
  <div class="data_show">{{title}}</div>
  <el-radio-group v-model="timeRadio" class="date" @change="periodTime">
    <el-radio-button label="day">7日</el-radio-button>
    <el-radio-button label="week">7周</el-radio-button>
    <el-radio-button label="month">7月</el-radio-button>
  </el-radio-group>

  <div class="block">
    <span class="demonstration">自定义</span>
    <el-date-picker
      v-model="customizeDate"
      type="daterange"
      format="yyyy-MM-dd"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="timeChangeSelf" 
      ></el-date-picker>
  </div>
  <div class="check" >
    <div @click="showPanel">
      筛选 <i :class="['fa fa-caret-down', { 'fa-caret-up': status }]" style=" margin-left: 10px;"></i>
    </div>
  </div>
</div>
</template>

<script>
  import Vue from 'vue';
  import 'styles/theme-chalk/radio-button.css';
  import 'styles/theme-chalk/radio-group.css';
  import 'styles/theme-chalk/date-picker.css';
  import DatePicker from 'element-ui/lib/date-picker.js';
  import RadioGroup from 'element-ui/lib/radio-group.js';
  import RadioButton from 'element-ui/lib/radio-button.js';

  Vue.component(DatePicker.name, DatePicker);
  Vue.component(RadioGroup.name, RadioGroup);
  Vue.component(RadioButton.name, RadioButton);

  export default {
    name: 'GridDateDuration',
    data() {
      return {
        timeRadio: 'day',
        customizeDate: '',
        status: false,
        dataDuration: false
      };
    },
    props: {
      currentPage: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '内容数据概览'
      }
    },
    methods: {
      showPanel() {
        this.status = !this.status;
        this.$emit('changePanelStatus');
      },
      periodTime(val) {
        let startDate;
        let endDate;
        if (val === 'day') {
          if (!this.dataDuration) {
            endDate = Math.floor(new Date().getTime() / 1000);
            startDate = this.computedStartDate(endDate);
          }
        } else if (val === 'week' || val === 'month') {
          endDate = Math.floor(new Date().getTime() / 1000);
          // startDate = this.computedStartDate(endDate);
        }

        this.dataDuration = false;

        if (this.timeRadio === 'week') {
          startDate = this.changeWeekStartDate(endDate);
        } else if (this.timeRadio === 'month') {
          startDate = this.changeMonth(endDate);
        }
        this.$emit('changeDateUnitStatus', { startDate, endDate, dateUnit: val });
      },
      timeChangeSelf(val) {
        if (this.customizeDate) {
          let startDate = this.customizeDate[0].getTime() / 1000;
          let endDate = this.customizeDate[1].getTime() / 1000;

          this.dataDuration = true;
          this.timeRadio = 'customize';
          this.$emit('changeDateDurations', { startDate, endDate });
        }
      },
      computedStartDate(endDate) {
        return endDate - (7 * 24 * 60 * 60);
      },
      // 更改自然周
      changeWeekStartDate(endDate) {
        const currentDate = new Date(endDate * 1000);
        const currentDay = currentDate.getDay();
        let startDate = endDate - (7 * 7 - 1) * 24 * 60 * 60;
        if (currentDay !== 1) {
          startDate = endDate - (7 * 6 + currentDay - 1) * 24 * 60 * 60;
        }
        return startDate;
      },
      // 更改自然月
      changeMonth(endDate) {
        const currentDate = new Date(endDate * 1000);
        const currentMonth = currentDate.getMonth() + 1;

        let startYear = currentDate.getYear() + 1900;
        let startMonth = currentMonth - 7 + 1;
        // if年份为负数
        if (startMonth < 0) {
          startMonth += 12;
          startYear -= 1;
        }
        return Math.floor(new Date(`${startYear}-${startMonth}-1 00:00:00`).getTime() / 1000);
      }
    }
  };
</script>
