<template>
  <div style="position: relative">
    <el-table
      v-if="tableData"
      :data="tableData"
      @sort-change="tableSort"
      :class="[{'empty-table': tableData.length <=0}]"
      border
      stripe
      :empty-text="emptyText"
      min-height="226"
      :max-height="tableHeight"
      @row-click="clickDetails"
      cell-class-name="is-center"
      header-cell-class-name="is-center"
      :highlight-current-row="true">
      <slot></slot>
    </el-table>
    <div class="el-table__empty-text" v-if="tableData.length <=0">{{emptyText}}</div>  
  </div>
</template>

<script>
  import Vue from 'vue';
  import 'styles/theme-chalk/table.css';
  import 'styles/theme-chalk/table-column.css';
  import 'styles/table.css';
  import Table from 'element-ui/lib/table.js';
  import TableColumn from 'element-ui/lib/table-column.js';

  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);

  export default {
    name: 'GridTable',
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      emptyText: {
        type: String,
        default: '内容为空'
      }
    },
    data() {
      return {
        tableHeight: window.screen.availHeight - 230
      };
    },
    methods: {
      tableSort({column, prop, order}) {
        const sort = prop;
        const tableItemOrder = order === 'descending' ? 1 : 0;
        this.$emit('tableReSort', {sort, tableItemOrder});
      },
      clickDetails(row) {
        this.$emit('upgradeLineChart', row);
      }
    }
  };
</script>
