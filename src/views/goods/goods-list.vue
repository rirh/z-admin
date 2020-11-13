<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入商品名称" style="width: 300px;" class="filter-item" />
      <el-select v-model="listQuery.state" placeholder="商品状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in goodsStateOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
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
          <el-button v-if="row.proData.showState!='上架'" size="mini" type="success" @click="handleGoodsStatus(row,'上架')">
            上架
          </el-button>
          <el-button v-if="row.proData.showState!='下架'" size="mini" @click="handleGoodsStatus(row,'下架')">
            下架
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
import { getData, editData, delData } from '@/api/goods'
export default {
  name: 'GoodsList',
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
        type: 2,
        state: ''
      },
      columns: [
        { header: '序号', type: 'index', width: '80px', dataIndex: '' },
        { header: '商品图片', type: 'goodsImage', width: '', dataIndex: '' },
        { header: '商品标题', type: 'data', width: '', dataIndex: 'proName' },
        { header: '商品价格', type: 'data', width: '', dataIndex: 'price' },
        { header: '销量', type: 'data', width: '', dataIndex: 'saleNum' },
        { header: '浏览量', type: 'data', width: '', dataIndex: 'viewNum' },
        { header: '库存', type: 'data', width: '', dataIndex: 'proData.skuStock' },
        { header: '状态', type: 'goodsTag', width: '', dataIndex: 'proData.showState' },
        { header: '更新时间', type: 'datetime', width: '', dataIndex: 'updatetime' }
      ],
      goodsStateOptions: [
        { key: '全部', display_name: '全部' },
        { key: '上架', display_name: '上架' },
        { key: '下架', display_name: '下架' }
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
      this.$router.push({
        name: 'GoodsEdit',
        params: {
          opt: 'add'
        }
      })
    },
    handleUpdate(data) {
      this.$router.push({
        name: 'GoodsEdit',
        params: {
          opt: 'edit',
          id: data._id
        }
      })
    },
    handleGoodsStatus(row, status) {
      const req = {
        id: row._id,
        state: status,
        updatetime: new Date().getTime()
      }
      editData(req).then((res) => {
        if (res.code === 200) {
          row.proData.showState = status
          this.$message({
            message: '成功更新数据',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    handleDelete(data) {
      this.$confirm('是否删除该模板？', '提示', {
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
