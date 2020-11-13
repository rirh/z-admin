<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8"><el-button icon="el-icon-caret-left" style="float:right;margin-right:50px" @click="back">返回</el-button></el-col>
      <el-col :span="16"> <iframe :src="url" class="app-iframe" /></el-col>
    </el-row>

  </div>
</template>

<script>
import { getToken, getCookie } from '@/utils/auth'
export default {

  data() {
    return {
      options: ''
    }
  },
  created: function() {
    const token = getToken()
    const userName = getCookie('userName')
    const userId = getCookie('userId')
    const id = this.$route.params.id
    this.url = process.env.VUE_APP_IFRAME_URL + '/pages/shop/page-diy?token=' + token + '&userId=' + userId + '&userName=' + userName + '&pageName=pageDiy&id=' + id
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    back() {
      this.$router.back(-1)
    }
  }
}
</script>

