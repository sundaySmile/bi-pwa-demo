<template>
  <div class="table_nav">
    <div class="grid-content bg-purple-dark">
      <el-input class="programName"
        :placeholder="namePlaceholder"
        :clearable="!!nameValue"
        v-model="nameValue"
        @change="changeName"></el-input>
      <el-input class="programName"
        :placeholder="codePlaceholder"
        :clearable="!!codeValue"
        v-model="codeValue"
        @change="changeCode"></el-input>
      <el-select
        v-if="isShowTag"
        class="programName"
        v-model="tag"
        placeholder="按标签搜索"
        @change="searchByTag"
        :clearable="!!tag" no-data-text="按标签搜索">
        <el-option
          v-for="item in tags"
          :key="item.tagCode"
          :label="item.tagName"
          :value="item.tagName"
          class="program-tag-list">
        </el-option>
      </el-select>
      <el-checkbox
        v-if="isShowThird"
        v-model="isThird"
        class="program-checkbox"
        @change="fetchThird">
        只显示第三方内容
      </el-checkbox>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>
  </div>
</template>
<script>
import Api from '../api/api.js';

export default {
  props: {
    isShowTag: {
      type: Boolean,
      default: false
    },
    isShowThird: {
      type: Boolean,
      default: false
    },
    namePlaceholder: {
      type: String,
      default: '节目名称'
    },
    codePlaceholder: {
      type: String,
      default: '节目Code'
    },
    nameValue: {
      type: String,
      default: null
    },
    codeValue: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: null
    },
    isThird: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
    searchByTag(val) {
      if (val === '按标签搜索' || !val) {
        this.tag = null;
      }
      this.$emit('searchItemByTag', this.tag);
    },
    fetchThird(val) {
      this.$emit('changeIsThird', Number(this.isThird));
    },
    changeName() {
      this.$emit('fetchName', this.nameValue);
    },
    changeCode() {
      this.$emit('fetchCode', this.codeValue);
    },
    search() {
      this.$emit('searchItem');
    },
    async fetchTags() {
      Api.getTags().then(list => {
        this.tags = [...list];
      });
    }
  }
};
</script>