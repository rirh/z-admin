<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入优惠券名称" style="width: 300px;" class="filter-item" />
      <el-select v-model="listQuery.state" placeholder="优惠券状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in couponStateOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <SimpleTable :list-loading="listLoading" :data="list" :columns="columns">
      <el-table-column label="操作" align="center" width="160px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </SimpleTable>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import SimpleTable from '@/components/SimpleTable'
import Pagination from '@/components/Pagination'
import { getData, delData } from '@/api/coupon'
export default {
  name: 'CouponList',
  components: { SimpleTable, Pagination },
  directives: { waves },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        state: '',
        name: ''
      },
      couponStateOptions: [
        { key: '0', display_name: '全部' },
        { key: '1', display_name: '未开始' },
        { key: '2', display_name: '进行中' },
        { key: '3', display_name: '已结束' }
      ],
      columns: [
        { header: '序号', type: 'index', width: '100px', dataIndex: '' },
        { header: '优惠券名称', type: 'data', width: '', dataIndex: 'name' },
        { header: '优惠券类型', type: 'data', width: '', dataIndex: 'type' },
        { header: '发放数量', type: 'data', width: '', dataIndex: 'sendNum' },
        { header: '减免金额', type: 'data', width: '', dataIndex: 'reduceMoney' },
        { header: '折扣额度', type: 'data', width: '', dataIndex: 'discountLimit' },
        { header: '每人限领', type: 'data', width: '', dataIndex: 'limitNum' },
        { header: '使用门槛', type: 'data', width: '', dataIndex: 'useReuire' },
        { header: '开始时间', type: 'data', width: '', dataIndex: 'startDate' },
        { header: '结束时间', type: 'data', width: '', dataIndex: 'endDate' },
        { header: '更新时间', type: 'datetime', width: '', dataIndex: 'updatetime' }
      ]
    }
  },
  created: function() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getData(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.$router.push({
        name: 'CouponEdit',
        params: {
          opt: 'add'
        }
      })
    },
    handleUpdate(data) {
      this.$router.push({
        name: 'CouponEdit',
        params: {
          opt: 'edit',
          id: data._id
        }
      })
    },
    handleDelete(data) {
      this.$confirm('是否删除该优惠券？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = { 'id': data._id }
        delData(param).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.handleFilter()
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        })
      })
    }
  }
}
</script>
