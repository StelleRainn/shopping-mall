<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in detail.goods_images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ commentCount }} 条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar || defaultAvatar" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.creat_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/home')">
        <van-icon name="wap-home-o" />
        <span >首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addToCart">加入购物车</div>
      <div class="btn-buy" @click="purchase">立刻购买</div>
    </div>

    <!-- 加入购物车或立即购买的弹层 -->
  <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
    <div class="product">
      <div class="product-title">
        <div class="left">
          <img :src="detail.goods_image" alt="">
        </div>
        <div class="right">
          <div class="price">
            <span>¥</span>
            <span class="nowprice">{{ detail.goods_price_min }}</span>
          </div>
          <div class="count">
            <span>库存</span>
            <span>{{ detail.stock_total }}</span>
          </div>
        </div>
      </div>
      <div class="num-box">
        <span>数量</span>
        <CountBox :value="consumeCount" @input="changeConsumeCount"></CountBox>
      </div>
      <div class="showbtn" v-if="detail.stock_total">
        <div class="btn" v-if="mode === 'cart'" @click="confirmAddToCart">加入购物车</div>
        <div class="btn now" v-else @click="goBuyNow">立刻购买</div>
      </div>
      <div class="btn-none" v-else>该商品已抢完</div>
    </div>
  </van-action-sheet>
  </div>
</template>

<script>
import { getProComments, getProDetail } from '@/api/product'
import defaultAvatar from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import { addToCartApi } from '@/api/cart'
import checkTokenStatus from '@/mixins/checkTokenStatus'

export default {
  name: 'ProDetailIndex',
  components: {
    CountBox
  },
  mixins: [checkTokenStatus],
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      current: 0,
      // 商品详情
      detail: {},
      // 评论相关
      commentList: [],
      commentCount: 0,
      defaultAvatar,
      // 弹层与购物车相关
      showPannel: false,
      mode: 'cart',
      consumeCount: 1,
      cartTotal: 0

    }
  },
  computed: {
    // 获取通过动态路由传递的参数，参数名为id
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },

    // 根据本商品的goodsId发出请求，获取本商品的详情
    async getGoodsDetail () {
      const res = await getProDetail(this.goodsId)
      this.detail = res.data.data.detail
      // console.log(this.detail)
    },

    // 根据本商品的 goodsId 发出请求，获取本商品的评论
    async getGoodsComments () {
      const res = await getProComments(this.goodsId, 3)
      this.commentList = res.data.data.list
      this.commentCount = res.data.data.total
    },

    // 加入购物车
    addToCart () {
      this.mode = 'cart'
      this.showPannel = true
    },

    // 立刻购买
    purchase () {
      this.mode = 'purchase'
      this.showPannel = true
    },

    // 修改 加入购物车/立即购买 数字框中的商品数量（子传父）
    changeConsumeCount (val) {
      this.consumeCount = val
    },

    // 加入购物车
    async confirmAddToCart () {
      // 检查 token 状态的方法优化为使用 mixin 混入（因为后续点击“立即购买”也需要检查token状态）
      if (this.checkTokenStatus()) {
        return
      }
      const res = await addToCartApi(this.goodsId, this.consumeCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = res.data.data.cartTotal
      this.$toast(res.data.message)
      this.showPannel = false
    },

    // 点击“立即购买”，跳转到订单页
    goBuyNow () {
      if (this.checkTokenStatus()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.consumeCount
        }
      })
    }
  },
  // 立即请求
  created () {
    this.getGoodsDetail()
    this.getGoodsComments()
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>
