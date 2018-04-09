import Vue from 'vue';
import Router from 'vue-router';
import DataGraph from 'views/data_show/data_show.vue';
import Program from 'views/program/program.vue';
// import Broadcast from 'views/broadcast/broadcast.vue';
// import Topic from 'views/topic/topic.vue';
// import ProgramPackage from 'views/show_bage/show_bage.vue';
// const DataGraph = () => import('views/data_show/data_show');
// const Program = () => import('views/program/program');
// const Broadcast = () => import('views/broadcast/broadcast.vue');
// const Topic = () => import('views/topic/topic.vue');
// const ProgramPackage = () => import('views/show_bage/show_bage.vue');

Vue.use(Router);

const router = new Router({
  // 'linkActiveClass': 'active',
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: DataGraph,
    name: 'data_graph',
    // class: 'fa-line-chart',
    meta: {
      title: '内容数据概览'
    }
  },
  {
    path: '/program',
    component: Program,
    name: 'program',
    // class: 'fa-tv',
    meta: {
      title: '节目'
    }
  // },
  // {
  //   path: '/broadcast',
  //   component: Broadcast,
  //   name: '直播',
  //   class: 'fa-video-camera',
  //   meta: {
  //     title: '直播'
  //   }
  // },
  // {
  //   path: '/topic',
  //   component: Topic,
  //   name: '专题',
  //   class: 'fa-file-video-o',
  //   meta: {
  //     title: '专题'
  //   }
  // },
  // {
  //   path: '/bage',
  //   component: ProgramPackage,
  //   name: '节目包',
  //   class: 'fa-tags',
  //   meta: {
  //     title: '节目包'
  //   }
  }]
});

router.beforeResolve((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
