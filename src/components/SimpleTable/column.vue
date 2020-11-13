<template>
  <div>
    <slot />
    <template v-for="(column, index) in columns">
      <el-table-column v-if="column.type === 'data'" :key="index" :label="column.header" :width="column.width" :type="column.type" :prop="column.dataIndex" align="center" />
      <el-table-column v-else-if="column.type === 'avatar'" :key="index" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center">
        <template slot-scope="{row}">
          <el-avatar :size="50" :src="row.userInfo===undefined?'':row.userInfo.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'goodsImage'" :key="index" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 60px; height: 60px"
            :src="row.proData.imageList[0]"
            fit="cover"
            :preview-src-list="row.proData.imageList"
          />
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'templateImage'" :key="index" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 60px; height: 60px"
            :src="row.imgUrl"
            fit="cover"
            :preview-src-list="[row.imgUrl]"
          />
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'goodsTag'" :key="index" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.proData.showState | statusFilter">
            {{ row.proData.showState }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'orderGoods'" :key="index" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center">
        <template slot-scope="{row}">
          <div v-if="showAllOrderGoods==false">
            <el-row>
              <el-col :span="8"><el-image
                style="width: 50px; height: 50px"
                :src="row.goodsData[0].image"
                fit="cover"
                :preview-src-list="[row.goodsData[0].image]"
              /></el-col>
              <el-col :span="16"><div style="text-align:left">{{ row.goodsData[0].title }} <div style="color:#999999">x {{ row.goodsData[0].number }}</div></div></el-col>
            </el-row>
          </div>
          <div v-if="showAllOrderGoods==true">
            <el-row v-for="(item,index) in row.goodsData" :key="index">
              <el-col :span="8"><el-image
                style="width: 50px; height: 50px"
                :src="item.image"
                fit="cover"
                :preview-src-list="[item.image]"
              /></el-col>
              <el-col :span="16"><div style="text-align:left">{{ item.title }} <div style="color:#999999">x {{ item.number }}</div></div></el-col>
            </el-row>
          </div>
          <div v-if="row.goodsData.length>1&&showAllOrderGoods==false" style="color:#409eff;font-size:13px" @click="handleShowGoodsOrder(true)">查看更多</div>
          <div v-if="row.goodsData.length>1&&showAllOrderGoods==true" style="color:#409eff;font-size:13px" @click="handleShowGoodsOrder(false)">收起</div>
        </template>
      </el-table-column>
      <el-table-column v-else-if="column.type === 'selection'" :key="index" type="selection" :label="column.header" :width="column.width" :prop="column.dataIndex" align="center" />
      <el-table-column v-else-if="column.type === 'date'" :key="index" :label="column.header" :width="column.width" :type="column.type" :prop="column.dataIndex" :formatter="getDateFormat" align="center" />
      <el-table-column v-else-if="column.type === 'datetime'" :key="index" :label="column.header" :width="column.width" :type="column.type" :prop="column.dataIndex" :formatter="getDatetimeFormat" align="center" />
      <el-table-column v-else-if="column.type === 'boolean'" :key="index" :label="column.header" :width="column.width" :type="column.type" :prop="column.dataIndex" :formatter="getBoolean" align="center" />
      <el-table-column v-else :key="index" :label="column.header" :width="column.width" :type="column.type" align="center" />
    </template>

  </div>
</template>

<script>
import { getDateStr, getDatetimeStr } from '@/utils/common'

export default {
  name: 'Column',
  filters: {
    statusFilter(status) {
      const statusMap = {
        上架: 'success',
        下架: 'info'
      }
      return statusMap[status]
    }
  },
  props: {
    // route object
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAllOrderGoods: false
    }
  },
  methods: {
    getDateFormat(row, column, cellValue, index) {
      return getDateStr(cellValue)
    },
    getDatetimeFormat(row, column, cellValue, index) {
      return getDatetimeStr(cellValue)
    },
    getBoolean(row, column, cellValue, index) {
      if (cellValue) {
        return '是'
      }
      return '否'
    },
    getActive(row, column, cellValue, index) {
      if (cellValue) {
        return '挂起'
      }
      return '激活'
    },
    handleShowGoodsOrder(v) {
      this.showAllOrderGoods = v
    }
  }
}

</script>
