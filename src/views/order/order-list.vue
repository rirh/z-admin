<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.outTradeNo" placeholder="请输入订单号" style="width: 300px;" class="filter-item" />
      <el-select v-model="listQuery.state" placeholder="订单状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in orderStateOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.startDate"
          type="date"
          placeholder="开始日期"
        />
      </div>
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.endDate"
          type="date"
          placeholder="结束日期"
        />
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <SimpleTable :list-loading="listLoading" :data="list" :columns="columns">
      <el-table-column label="操作" align="center" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </SimpleTable>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getDateStr } from '@/utils/common'
import { getData } from '@/api/order'
import waves from '@/directive/waves'
import SimpleTable from '@/components/SimpleTable'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderList',
  components: { SimpleTable, Pagination },
  directives: { waves },
  filters: {
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      value1: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        state: '',
        outTradeNo: '',
        startDate: getDateStr(new Date().getTime() - 864000000),
        endDate: getDateStr(new Date().getTime())
      },
      orderStateOptions: [
        { key: 0, display_name: '全部' },
        { key: 1, display_name: '待付款' },
        { key: 2, display_name: '待发货' },
        { key: 3, display_name: '待收货' },
        { key: 4, display_name: '待提货' },
        { key: 5, display_name: '待成团' },
        { key: 10, display_name: '已完成' },
        { key: -1, display_name: '已取消' },
        { key: -2, display_name: '已关闭' }
      ],
      columns: [
        { header: '序号', type: 'index', width: '100px', dataIndex: '' },
        { header: '购买商品', type: 'orderGoods', width: '', dataIndex: 'goodsData' },
        { header: '订单号', type: 'data', width: '', dataIndex: 'outTradeNo' },
        { header: '购买用户', type: 'data', width: '', dataIndex: 'shippingMod' },
        { header: '支付金额', type: 'data', width: '', dataIndex: 'totalPrice' },
        { header: '订单状态', type: 'data', width: '', dataIndex: 'stateTip' }
      ]
    }
  },
  created() {
    const sta = this.$route.params.sta
    if (sta !== undefined) {
      this.listQuery.state = sta
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getData(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.offset = 0
      this.getList()
    },
    handleCreate() {
      this.$router.push({
        name: 'Orgadd',
        params: {
          opt: 'add'
        }
      })
    }
  }
}
</script>
