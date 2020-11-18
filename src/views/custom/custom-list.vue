<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickName"
        placeholder="请输入昵称"
        style="width: 300px"
        class="filter-item"
        @keyup.native.enter="fetchList"
      />
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
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
    </div>
    <SimpleTable :list-loading="listLoading" :data="list" :columns="columns">
      <el-table-column
        label="操作"
        align="center"
        width="150px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleedit(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleremove(row)"
          />
        </template>
      </el-table-column>
    </SimpleTable>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchList"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import SimpleTable from '@/components/SimpleTable'
import Pagination from '@/components/Pagination'
import { getUserList, DeleteUser } from '@/api/custom'
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
        page: 0,
        pageSize: 10,
        nickName: '',
        name: 'user-center',
        action: 'queryUser',
        startDate: '',
        endDate: ''
      },
      columns: [
        { header: '序号', type: 'index', width: '50px', dataIndex: '' },
        {
          header: '账户',
          type: 'data',
          width: '240px',
          dataIndex: 'username'
        },
        {
          header: '昵称',
          type: 'data',
          width: '80px',
          dataIndex: 'nickName'
        },
        {
          header: '邀请码',
          type: 'data',
          width: '75px',
          dataIndex: 'my_invite_code'
        },
        {
          header: '权限',
          type: 'data',
          width: '50',
          dataIndex: 'role'
        },
        {
          header: '最后一次登录IP',
          type: 'data',
          width: '120px',
          dataIndex: 'last_login_ip'
        },
        {
          header: '最后一次登录时间',
          type: 'datetime',
          width: '',
          dataIndex: 'last_login_date'
        },
        {
          header: '注册时间',
          type: 'datetime',
          width: '',
          dataIndex: 'register_date'
        }
      ]
    }
  },
  created: function() {
    this.fetchList()
  },
  methods: {
    handleremove(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await DeleteUser({
            name: 'user-center',
            action: 'deleteUser',
            uid: row._id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    fetchList() {
      this.listLoading = true
      console.log(this.listQuery)

      getUserList(this.listQuery).then((response) => {
        console.log(response)
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchList()
    }
  }
}
</script>
