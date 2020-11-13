<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入微信昵称" style="width: 300px;" class="filter-item" />
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.startDate"
          type="date"
          placeholder="注册开始日期"
        />
      </div>
      <div class="filter-item">
        <el-date-picker
          v-model="listQuery.endDate"
          type="date"
          placeholder="注册结束日期"
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
import waves from '@/directive/waves'
import SimpleTable from '@/components/SimpleTable'
import Pagination from '@/components/Pagination'
import { getData } from '@/api/custom'
import { getDateStr } from '@/utils/common'
export default {
  name: 'CustomList',
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
        name: '',
        startDate: getDateStr(new Date().getTime() - 864000000),
        endDate: getDateStr(new Date().getTime())
      },
      columns: [
        { header: '序号', type: 'index', width: '100px', dataIndex: '' },
        { header: '微信头像', type: 'avatar', width: '', dataIndex: 'userInfo.avatarUrl' },
        { header: '微信昵称', type: 'data', width: '', dataIndex: 'userInfo.nickName' },
        { header: '所在城市', type: 'data', width: '', dataIndex: 'userInfo.city' },
        { header: '最后一次登录IP', type: 'data', width: '', dataIndex: 'last_login_ip' },
        { header: '最后一次登录时间', type: 'datetime', width: '', dataIndex: 'last_login_date' },
        { header: '注册时间', type: 'datetime', width: '', dataIndex: 'register_date' }
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
        console.log(response)
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
