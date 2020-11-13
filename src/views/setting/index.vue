<template>
  <div class="app-container" style="text-align:center">
    <div style="margin:0 auto">
      <iframe :src="url" class="app-iframe" />
    </div>
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
    const shopId = getCookie('shopId')
    const id = this.$route.params.id
    this.url = process.env.VUE_APP_IFRAME_URL + '/pages/setting/setting-edit?token=' + token + '&shopId=' + shopId + '&userId=' + userId + '&userName=' + userName + '&pageName=pageDiy&id=' + id
  },
  methods: {
  }
}
</script>

