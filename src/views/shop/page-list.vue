<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入页面名称" style="width: 300px;" class="filter-item" />
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
          <el-button type="success" size="mini" @click="handleDiy(row)">
            设计
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
        <el-form-item label="页面标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:300px" />
        </el-form-item>
        <el-form-item label="背景颜色" :label-width="formLabelWidth">
          <el-color-picker v-model="form.color" />
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
import { getData, addData, editData, delData } from '@/api/page'
export default {
  name: 'PageList',
  components: { SimpleTable, Pagination },
  directives: { waves },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        color: '',
        diyData: []
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
        { header: '序号', type: 'index', width: '80px', dataIndex: '' },
        { header: '页面名称', type: 'data', width: '', dataIndex: 'pageTitle' },
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
      // this.state = 'add'
      // this.showTip = '添加页面'
      // this.form.name = ''
      // this.form.color = '#F9F9F9'
      // this.dialogFormVisible = true
      this.$router.push({
        name: 'PageEdit',
        params: {
          opt: 'add'
        }
      })
    },
    handleUpdate(data) {
      // this.state = 'edit'
      // this.showTip = '编辑页面'
      // this.form.id = data._id
      // this.form.diyData = data.diyData
      // this.form.name = data.pageTitle
      // this.form.color = data.backgroundColor
      // this.dialogFormVisible = true
      this.$router.push({
        name: 'PageEdit',
        params: {
          opt: 'edit',
          id: data._id
        }
      })
    },
    handleDelete(data) {
      this.$confirm('是否删除该页面？', '提示', {
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
          message: '请输入页面标题',
          type: 'warning'
        })
      } else {
        if (this.state === 'add') {
          const req = {
            diyData: [],
            pageTitle: this.form.name,
            comType: 'index',
            pageShareDetail: '',
            backgroundColor: this.form.color,
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
            diyData: this.form.diyData,
            pageTitle: this.form.name,
            comType: 'index',
            pageShareDetail: '',
            backgroundColor: this.form.color,
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

