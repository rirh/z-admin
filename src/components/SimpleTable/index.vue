<template>
  <div>
    <el-table
      ref="simpleTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :row-class-name="rowClassName"
      @selection-change="selectChange"
      @row-dblclick="rowdbclick"
    >
      <column :columns="columns"><slot /></column>
    </el-table>
  </div>
</template>

<script>
import column from './column'

export default {
  name: 'SimpleTable',
  components: { column },
  props: {
    tableKey: {
      required: false,
      type: Number,
      default: 0
    },
    listLoading: {
      required: true,
      type: Boolean
    },
    data: {
      required: true,
      type: Array
    },
    columns: {
      required: true,
      type: Array
    },
    selectChange: {
      required: false,
      type: Function,
      default: (res) => {}
    },
    rowdbclick: {
      required: false,
      type: Function,
      default: (res) => {}
    },
    rowClassName: {
      required: false,
      type: Function,
      default: (res) => {}
    }
  }
}
</script>
