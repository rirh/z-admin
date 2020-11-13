<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入分组名称" style="width: 300px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <SimpleTable :list-loading="listLoading" :data="list" :columns="columns">
      <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
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
    <el-dialog :title="showTip" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="分组名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import SimpleTable from '@/components/SimpleTable'
import Pagination from '@/components/Pagination'
import { getData, addData, editData, delData } from '@/api/goods-group'
export default {
  name: 'GoodsGroupList',
  components: { SimpleTable, Pagination },
  directives: { waves },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        comType: 0
      },
      formLabelWidth: '120px',
      state: '',
      showTip: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: ''
      },
      columns: [
        { header: '序号', type: 'index', width: '100px', dataIndex: '' },
        { header: '分组名称', type: 'data', width: '', dataIndex: 'groName' },
        { header: '更新时间', type: 'datetime', width: '250px', dataIndex: 'updatetime' }
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
    },
    handleCreate() {
      this.state = 'add'
      this.showTip = '添加分组'
      this.form.name = ''
      this.form.comType = 0
      this.dialogFormVisible = true
    },
    handleUpdate(data) {
      this.state = 'edit'
      this.showTip = '编辑分组'
      this.form.id = data._id
      this.form.comType = data.comType
      this.form.name = data.groName
      this.dialogFormVisible = true
    },
    handleDelete(data) {
      this.$confirm('是否删除该分组？', '提示', {
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleDiy(data) {
      this.$router.push({
        name: 'PageDiy',
        params: {
          opt: 'edit',
          id: data._id
        }
      })
    },
    handleSubmit() {
      if (this.form.name === '') {
        this.$message({
          message: '请输入分组名称',
          type: 'warning'
        })
      } else {
        if (this.state === 'add') {
          const req = {
            groName: this.form.name,
            comType: 0,
            updatetime: new Date().getTime()
          }
          addData(req).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '成功添加数据',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.handleFilter()
            } else {
              this.$message({
                message: response.msg,
                type: 'warning'
              })
            }
          })
        } else {
          const req = {
            id: this.form.id,
            groName: this.form.name,
            comType: this.form.comType,
            updatetime: new Date().getTime()
          }
          editData(req).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '成功更新数据',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.handleFilter()
            } else {
              this.$message({
                message: response.msg,
                type: 'warning'
              })
            }
          })
        }
      }
    }
  }
}
</script>
