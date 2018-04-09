<template>
  <div class="container" style="height: 100%">
    <!-- <div v-if="routerList">{{ routerList }}</div> -->
    <BiHeader />
    <div class="main container-body">
      <div class="el-menu-bar">
        <el-menu :default-active="$route.path" class="mar-l el-menu-vertical-demo el-col el-col-3" light router>
          <template v-for="(item, index) in $router.options.routes.slice(1)" v-if="!item.hidden"  >
            <el-menu-item :index="item.path" :key="item.name"><i class="fa" :class="item.class"></i>{{item.meta.title}}</el-menu-item>
          </template>
        </el-menu>        
      </div>
      <section :span="21" class="content-wrapper">
        <transition 
          name="fade" mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>   
</template>

<script lang="ts">
import BiHeader from 'views/header/header.vue';

export default {
  name: 'app',
  data () {
    return {
      user: {}
    };
  },
  beforeCreate ()    {
    if (this.$route.path === '/') {
      this.$router.push({path: '/index'});
    }
  },
  components: {
    BiHeader
  },
  mounted() {
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('static/service-worker.js')
             .then(function(response) { console.log('Service Worker Registered', response); });
    }
  }
};
</script>

<style scoped>
  @import 'styles/sidebar.css';

  .fade-enter-active, .fade-leave-active {
    transition: transform 350ms linear, opacity 500ms;
  }
  .fade-enter {
    opacity: .3;
    transform: translate(-100%, 0);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translate(100%, 0);
  }
</style>
<style>
@import 'styles/font-awesome.css';
@import 'styles/data-time-duration.css';
@import 'styles/echart-polyfill.css';
@import 'styles/element-polyfill.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
  }
  /* fa图标右侧需要流出空白 elementUI图标已自带样式 */
  i.fa {
    vertical-align: baseline;
    margin-right: 10px;
  }
  html {
    overflow-x: hidden;
  }
  html, body, div, ul, li, p {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    background-color: #DEECF9;;
  }
  a {
    text-decoration: none;
    -webkit-tap-heighlight-color: transparent;
  }
  .container-body {
    display: flex;
  }
  .container {
    padding-top: 72px;
    height: 100%;
    width: 100vw;
  }
  .main-body {
    width: 1000px;
    padding-bottom: 30px;
  }
  .container .content-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 35px;
  }
</style>

