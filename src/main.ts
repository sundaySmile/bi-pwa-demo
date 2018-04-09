// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import echarts from 'echarts';
import './setElementUI.ts';
import App from './App.vue';
import router from './router';
import GridTable from './components/grid-table.vue';
import GridDateDuration from './components/grid-date-duration.vue';

Vue.component(GridTable.name, GridTable);
Vue.component(GridDateDuration.name, GridDateDuration);

Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
