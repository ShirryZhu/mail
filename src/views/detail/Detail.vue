<template lang="">
  <div id="detail">
    <detail-nav />
    <scroll
      class="detail-scroll"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-params :paramsInfo="paramsInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import DetailNav from './childComps/DetailNav.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParams from './childComps/DetailParams.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import BackTop from '@/components/content/backtop/BackTop.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'

import { debounce } from '@/common/utils'

import {
  getDetail,
  getRecommend,
  Goods,
  GoodsParam,
  Shop,
} from '@/network/detail'

import { RecommendItem } from '@/common/class'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      isRefresh: false,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      isLoad: false,
      isShowBackTop: false,
    }
  },
  methods: {
    imageLoad(from) {
      if (!this.isLoad) {
        // console.log('detail imageLoad', from)
        this.$refs.scroll.refresh()
        this.isLoad = true
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
      this.$refs.scroll.refresh()
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
  },
  components: {
    DetailNav,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    BackTop,
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1. 获取顶部轮播数据
      const data = res.result
      // console.log(res)
      this.topImages = data.itemInfo.topImages
      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4. 获取商品详情数据
      this.detailInfo = data.detailInfo
      // 5. 获取参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      console.log(this.paramsInfo)
      // 6. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list.map((item) => new RecommendItem(item))
      // console.log(this.recommends)
    })
  },
  mounted() {
    // 1. 监听GoodsListItem中图片的加载
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    const itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', itemImageListener)
  },
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;

  background-color: #fff;
}
.detail-scroll {
  height: calc(100vh - 44px);
  overflow: hidden;
}

.back-top {
  bottom: 15px;
}
</style>
