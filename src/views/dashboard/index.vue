<template>
  <div class="dashboard-container">
    <div class="content">
      <el-row :gutter="40">
        <el-col :span="20">
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="data-card">
                <div class="card-header">待处理</div>
                <div class="card-body">
                  <div class="body-item">
                    <div class="item-status" @click="toDoPage(1)">
                      <div class="status-title">
                        待付款 <i class="el-icon-arrow-right" />
                      </div>
                      <div class="big-num">
                        {{ toPayCount }}
                      </div>
                    </div>
                    <div class="item-status" @click="toDoPage(2)">
                      <div class="status-title">
                        待发货 <i class="el-icon-arrow-right" />
                      </div>
                      <div class="big-num">
                        {{ toSendCount }}
                      </div>
                    </div>
                    <div class="item-status" @click="toDoPage(4)">
                      <div class="status-title">
                        待提货 <i class="el-icon-arrow-right" />
                      </div>
                      <div class="big-num">
                        {{ toGetCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="data-card">
                <div class="card-header">我的商品</div>
                <div class="card-body">
                  <div class="body-item">
                    <div class="item-status">
                      <div class="status-title">
                        销售中
                      </div>
                      <div class="big-num">
                        {{ showData }}
                      </div>
                    </div>
                    <div class="item-status">
                      <div class="status-title">
                        待上架
                      </div>
                      <div class="big-num">
                        {{ hideData }}
                      </div>
                    </div>
                    <div class="item-status" @click="toAddGoods()">
                      <div class="status-title">
                        新增商品
                      </div>
                      <div class="big-num">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" style="margin-top:20px">
            <el-col :span="12">
              <div class="data-card">
                <div class="card-header">订单数据</div>
                <div class="card-body">
                  <div class="body-item">
                    <div class="item-status">
                      <div class="status-title">
                        总成交订单数
                      </div>
                      <div class="big-num">
                        {{ allOrder }}
                      </div>
                      <div class="last-data">
                        <span>今日增加</span>
                        <span class="add-number">{{ nowOrder }}</span>
                      </div>
                    </div>
                    <div class="item-status">
                      <div class="status-title">
                        总成交金额
                      </div>
                      <div class="big-num">
                        {{ allPrice }}
                      </div>
                      <div class="last-data">
                        <span>今日增加</span>
                        <span class="add-number">{{ nowPrice }}</span>
                      </div>
                    </div>
                    <div class="item-status">
                      <img class="status-img" src="@/assets/img/order.png">
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="data-card">
                <div class="card-header">用户数据</div>
                <div class="card-body">
                  <div class="body-item">
                    <div class="item-status">
                      <div class="status-title">
                        累计下单用户数
                      </div>
                      <div class="big-num">
                        {{ allOrderUser }}
                      </div>
                      <div class="last-data">
                        <span>今日增加</span>
                        <span class="add-number">{{ nowOrderUser }}</span>
                      </div>
                    </div>
                    <div class="item-status">
                      <div class="status-title">
                        累计访问用户数
                      </div>
                      <div class="big-num">
                        {{ allVisitor }}
                      </div>
                      <div class="last-data">
                        <span>今日增加</span>
                        <span class="add-number">{{ nowVisitor }}</span>
                      </div>
                    </div>
                    <div class="item-status">
                      <img class="status-img" src="@/assets/img/user.png">
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <div class="right-item">
            <div class="item-img">
              <img class="right-img" src="@/assets/img/tel.png">
            </div>
            <div class="item-tip">
              <span class="tip-one">在线客服</span>
              <span class="tip-two">17643036681</span>
            </div>
          </div>

          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <img class="right-img" style="width:200px;height:200px" :src="shopUrl">
            <el-button slot="reference" class="right-btn">
              <div class="right-item">
                <div class="item-img">
                  <img class="right-img" src="@/assets/img/shop.png">
                </div>
                <div class="item-tip">
                  <span class="tip-one">扫码进店</span>
                  <span class="tip-two">用户端小程序</span>
                </div>
              </div>
            </el-button>
          </el-popover>

          <el-popover
            placement="left-start"
            trigger="hover"
          >
            <img class="right-img" style="width:200px;height:200px" :src="adminH5Url">
            <el-button slot="reference" class="right-btn">
              <div class="right-item">
                <div class="item-img">
                  <img class="right-img" src="@/assets/img/mobile.png">
                </div>
                <div class="item-tip">
                  <span class="tip-one">扫码管理</span>
                  <span class="tip-two">管理端H5</span>
                </div>
              </div>
            </el-button>
          </el-popover>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTodoData, getGoodsData, getOrderData, getUserData, getShopData } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      toPayCount: 0,
      toSendCount: 0,
      toGetCount: 0,
      showData: 0,
      hideData: 0,
      nowVisitor: 0,
      allVisitor: 0,
      nowOrderUser: 0,
      allOrderUser: 0,
      nowOrder: 0,
      allOrder: 0,
      nowPrice: 0,
      allPrice: 0,
      adminH5Url: '',
      shopUrl: ''
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getData() {
      getShopData({}).then(response => {
        console.log(response)
        this.shopUrl = response.data[0].data.shopUrl
        this.adminH5Url = response.data[0].data.adminH5Url
        this.initData()
      })
    },
    async initData() {
      const todoData = await getTodoData({})
      const goodsData = await getGoodsData({})
      const orderData = await getOrderData({})
      const userData = await getUserData({})
      this.toPayCount = todoData.data.count1
      this.toSendCount = todoData.data.count2
      this.toGetCount = todoData.data.count3
      this.showData = goodsData.data.count1
      this.hideData = goodsData.data.count2
      this.nowVisitor = userData.data.count1
      this.allVisitor = userData.data.count2
      this.nowOrderUser = userData.data.count3
      this.allOrderUser = userData.data.count4
      this.nowOrder = orderData.data.count1
      this.allOrder = orderData.data.count2
      this.nowPrice = orderData.data.count3
      this.allPrice = orderData.data.count3
    },
    toAddGoods() {
      this.$router.push({
        name: 'GoodsEdit',
        params: {
          opt: 'add'
        }
      })
    },
    toDoPage(s) {
      this.$router.push({
        name: 'OrderList',
        params: {
          sta: s
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}
.content {
  padding: 32px;
}
.data-card{
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 32px 32px 40px;
  .card-header{
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: bold;
  }
  .card-body{
    position: relative;
    height: 140px;
    .body-item{
      padding: 6px 0;
      display: flex;
      justify-content: space-between;
      .item-status{
        text-align: center;
        flex-grow: 1;
        position: relative;
        .status-img{
          margin-top: -30px;
          width: 160px;
          height: auto;
        }
        .status-title{
          font-size: 16px;
          padding-right: 16px;
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .big-num{
          padding-right: 16px;
          font-size: 32px;
          padding-top: 16px;
          font-weight: 500;
        }
        .last-data{
          margin-left: -10px;
          margin-top: 15px;
          font-size: 14px;
          color: #7E8081;
          .add-number{
            margin-left: 8px;
            color: #1A1B1C;
          }
        }
      }
    }
  }
}
.right-item{
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  height: 83px;
  .item-img{
    float:left;
    .right-img{
      width: 43px;
      height: 43px;
      margin: 20px;
    }
  }
  .item-tip{
    float:left;
    margin-top: 20px;
    .tip-one{
      text-align: left;
      color: #323233;
      font-size: 16px;
      display: block;
    }
    .tip-two{
      text-align: left;
      color: #646566;
      font-size: 12px;
      line-height: 3em;
    }
  }
}
.right-btn{
  padding:0px;
  width:100%;
  border-radius:8px;
  border:0px;
  margin-top:20px
}
</style>
