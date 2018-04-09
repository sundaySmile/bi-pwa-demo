<template>
  <transition-fade>
    <div class="checkWrapper" >
      <div class="system-platform" v-if="systemName">
        <span class="system-name">统计的平台: </span>
        <div class="system-items">
          <el-checkbox-group  class="checkSystem" v-model="checkedSystemList">
            <el-checkbox v-for = "name in systemName" :label="name" :value = "name" :checked="platformChecked(name)" :data-checked="platformChecked(name)" :key="name" class="textChange" @change="changePlatform(name)"></el-checkbox>
        </el-checkbox-group>
        </div>
      </div>
      <div class="system-platform" v-if="contentType && contentType.length > 0">
        <span class="system-name">统计的对象: </span>
        <div class="system-items">
          <el-checkbox-group  class="checkSystem" v-model="contenTypeList">
            <el-checkbox v-for = "name in contentType" :label="name" :value = "name" :checked="contenTypeChecked(name)" :data-checked="contenTypeChecked(name)" :key="name" class="textChange" @change="changeContenType(name)"></el-checkbox>
        </el-checkbox-group>
        </div>
      </div>
      <div class="system-platform" v-if="platform">
        <span class="system-name">统计的版本: </span>
        <div class="system-items">
          <label for="" class="first-item">iOS</label>
          <div class="long-item">
            <el-checkbox  v-model="checkAll_ios" :checked='checkAll_ios' class="checkios" @change="selectAllIos">全选</el-checkbox>
            <el-checkbox-group v-model="checkedIos"  class="inline-block" tag="p">
              <el-checkbox  class="iosSelf" v-for="city in platform.ios" :label="city" :checked='checkAll_ios' :key="city" @change="changeIos(city)">{{city}}</el-checkbox>
            </el-checkbox-group>          
          </div>
        </div>
      </div>
      <div class="system-platform" v-if="platform">
        <span class="system-name"> </span>
        <div class="system-items">
          <label for="" class="first-item">Android</label>
          <div class="long-item">
            <el-checkbox v-model="checkAll_android"  class="checkios" @change ="selectAllAndroid">全选</el-checkbox>
            <el-checkbox-group v-model="checkedAndroid" class="inline-block">
              <el-checkbox class="androidSelf"  v-for="city in platform.android" :checked='true' :label="city" :key="city" @change="changeAndroid(city)">{{city}}</el-checkbox>
            </el-checkbox-group>          
          </div>
        </div>
      </div>

        <!-- <br>
        -->
        <!-- <div class="launcherText">
          Launcher
          <el-checkbox  v-model="checkAll_launcher"  class="checkla" @change ="selectAllLauncher">全选</el-checkbox>
          <el-checkbox-group v-model="checkedLauncher"  class="checkLauncher">
            <el-checkbox v-for="city in platform.launcher" :label="city" :key="city" @change="changeLauncher(city)">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div> -->
      <el-button type="primary" class="sendButton" @click="versionFilter">筛选</el-button>
    </div>
  </transition-fade>
</template>

<script>
  import Vue from 'vue';
  import 'styles/theme-chalk/checkbox-group.css';
  import 'styles/theme-chalk/checkbox.css';
  import Checkbox from 'element-ui/lib/checkbox.js';
  import CheckboxGroup from 'element-ui/lib/checkbox-group.js';
  import 'styles/filter-panel.css';
  import TransitionFade from 'components/transition-fade.vue';

  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);

  export default {
    data() {
      return {
        checkedSystemList: [],
        contenTypeList: [],
        checkAll_ios: true,
        checkedIos: [],
        checkAll_android: true,
        checkedAndroid: [],
        version: ''
      };
    },
    components: {
      TransitionFade
    },
    props: {
      systemName: {
        type: Array,
        default: () => {
          return [];
        }
      },
      platform: {
        type: Object,
        default: () => {
          return {};
        }
      },
      contentType: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    mounted() {},
    methods: {
      platformChecked(name) {
        return name === 'iOS' ? this.checkAll_ios : this.checkAll_android;
      },
      changePlatform (name) {
        if (name === 'iOS') {
          this.checkAll_ios = !this.checkAll_ios;
          this.selectAllIos();
        }
        if (name === 'Android') {
          this.checkAll_android = !this.checkAll_android;
          this.selectAllAndroid();
        }
      },
      contenTypeChecked(name) {
        //
      },
      changeContenType (name) {
        const initIndex = this.contentType.indexOf(name);
        if (this.contenTypeList.length <= 0) {
          this.contenTypeList.push(this.contentType[this.contentType.length - initIndex - 1]);
        }
      },
      selectAllIos() {
        if (!this.checkAll_ios) {
          this.checkedIos = [];
          var index = this.checkedSystemList.indexOf('iOS');
          if (index >= 0) {
            this.checkedSystemList.splice(index, 1);
          }
        } else {
          this.checkedIos = this.platform.ios;
          this.checkedSystemList.push('iOS');
        }
      },
      changeIos (i) {
        this.checkAll_ios = false;
        var index = this.checkedSystemList.indexOf('iOS');
        if (index < 0 && this.checkedIos.length !== 0) {
          this.checkedSystemList.push('iOS');
        } else if (index >= 0 && this.checkedIos.length === 0) {
          this.checkedSystemList.splice(index, 1);
        }
        if (this.checkedIos.length === this.platform.ios.length) {
          this.checkAll_ios = true;
        }
      },
      selectAllAndroid  () {
        if (!this.checkAll_android) {
          this.checkedAndroid = [];
          var index = this.checkedSystemList.indexOf('Android');

          if (index >= 0) {
            this.checkedSystemList.splice(index, 1);
          }
        } else {
          this.checkedAndroid = this.platform.android;
          this.checkedSystemList.push('Android');
        }
      },
      changeAndroid (i) {
        this.checkAll_android = false;
        var index = this.checkedSystemList.indexOf('Android');
        if (index < 0 && this.checkedAndroid.length !== 0) {
          this.checkedSystemList.push('Android');
        } else if (index >= 0 && this.checkedAndroid.length === 0) {
          this.checkedSystemList.splice(index, 1);
        }
        if (this.checkedAndroid.length === this.platform.android.length) {
          this.checkAll_android = true;
        }
      },
      versionFilter(hadInit = true) {
        let version = '';
        if (this.checkedIos.length <= 0 && this.checkedAndroid.length <= 0 && this.platform) {
          this.checkedIos = this.platform.ios;
          this.checkedAndroid = this.platform.android;
        }
        if (this.checkedIos && this.checkedIos.length > 0) {
          const iosList = this.checkedIos.map((item) => {
            return 'IOS_' + item;
          }).join();
          version = version.length > 0 ? version + ',' + iosList : iosList;
        }
        if (this.checkedAndroid && this.checkedAndroid.length > 0) {
          const androidList = this.checkedAndroid.map((item) => {
            return 'Android_' + item;
          }).join();
          version = version.length > 0 ? version + ',' + androidList : androidList;
        }
        // if (this.checkedLauncher && this.checkedLauncher.length > 0) {
        //   const laucherList = this.checkedLauncher.map((item) => {
        //     return 'Launcher_' + item;
        //   }).join();
        //   version = version.length > 0 ? version + ',' + laucherList : laucherList;
        // }

        this.version = version.slice(0);
        this.$emit('changeVersion', {version: this.version, show: false, contentType: this.contenTypeList || []});
      }
    }
  };
</script>
