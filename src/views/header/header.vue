<template>
  <header class="topPic">
    <img src="~assets/whaley.png" class="navPic">
    <span class="topText" >BI Dashboard</span>
    <div class="update_time">
      <span>{{ updateTime }} </span>
      <span class="username">{{username}} - </span>
      <a href="javascript:;" class="logout" @click="() => {this.isShow = true}">退出</a>
    </div>
    <Fade> <div class="logout-modal-master" v-if="isShow" @click="() => {this.isShow = false}"></div> </Fade>
    <div class="logout-modal" v-if="isShow">
      <p class="logout-modal-content">确定要退出登录吗？</p>
      <p class="logout-modal-buttons">
        <a href="http://vr-bi.aginomoto.com/logout">确定</a>
        <a href="javascript:;" @click="() => {this.isShow = false}">取消</a>
      </p>
    </div>
  </header>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Api from 'api/index'
  import Fade from 'components/transition-fade.vue'

  @Component({
    components: {
      Fade
    }
  })
  export default class BiHeader extends Vue {
    updateTime: string = ''
    username: string = ''
    isShow: boolean = false

    created() {
      Api.getUserInfo().then(res => {
        this.username = res.memberdata.nickname
      }); 
    }

    mounted() {
      this.LastTimeUpdate()
    }

    LastTimeUpdate() {
      Api.getLastTimeUpdate().then(res => {
        if (res) {
          this.updateTime = `数据更新时间: ${res}`
        }
      });
    }
  };
</script>
<style scoped>
  header {
    height: 72px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    padding: 0 30px;
    background-color:rgba(22,164,250,1);
  }
  .header-logo {
    display: inline-block;
    vertical-align: middle;
  }
  .header-operations {
    display: inline-block;
    /* float: right; */
    padding-right: 30px;
    height: 100%;
  }
  .header-operations li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    margin: 0 10px;
    line-height: 80px;
    cursor: pointer;
  }
  .header-operations li:first-child{
    cursor: default
  }
  .header-opacity{
    opacity: .7;
  }
  .header-operations:after, header:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
  .topTitle{
    height: 80px;
    line-height: 80px;
    color: #3CBFFF;
    display:inline-block;
  }
  .navPic{
   width: 120px;
   height: 30px;
   vertical-align: middle; 
  }

  .topText{
    position: absolute;
    left: 177px;
    top: 28px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
  }
  .update_time{
    color: #fff;
    float: right;
    margin-top: 30px;
    font-size: 14px;
  }
  .username {
    padding-left: 48px;
  }
  .logout {
    color: #fff;
  }
  .logout-modal {
    position: fixed;
    z-index: 10;
    width: 300px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin: -100px 0 0 -150px;
    background: #fff;
    text-align: center;
    border: 1px solid rgba(22,164,250,.15);
  }
  .logout-modal-content {
    line-height: 130px;
  }
  .logout-modal-buttons {
    height: 70px;
    line-height: 70px;
    background: #eee;
  }
  .logout-modal-buttons>* {
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    margin: 0 25px;
    text-align: center;
    color: #444;
    border: 1px solid #ddd;
    background: #fff;
    text-decoration: none;
  }
  .logout-modal-buttons>*:hover {
    background: rgba(22,164,250,.5);
    border-color: rgba(22,164,250,.5);
    color: #fff;
  }
  .logout-modal-master {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
</style>