<template lang="">
  <div id="detail">
    <detail-nav ref="nav" @navClick="navClick" />
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
      <detail-params ref="params" :paramsInfo="paramsInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommends" :goods="recommends" />
    </scroll>
    <back-top
      class="back-top"
      @click.native="backClick"
      v-show="isShowBackTop"
    ></back-top>
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

import { itemImageLoad } from '@/common/mixin'

import { debounce, formatThemeTopYs } from '@/common/utils'

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
      themeTopYs: [],
      isLoad: false,
      isShowBackTop: false,
      itemImageListener: null,
      getThemeTopYs: null,
    }
  },
  methods: {
    imageLoad() {
      // 1. 刷新获取最新better-scroll的高度
      if (!this.isLoad) {
        // console.log('detail imageLoad', from)
        this.$refs.scroll.refresh()
        this.isLoad = true
      }
      // 2. 给themeTopYs赋值
      this.getThemeTopYs()
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
      this.$refs.scroll.refresh()
    },
    contentScroll(position) {
      // 1. 判断backtop组件显示条件
      this.isShowBackTop = -position.y > 1000

      // 2. 实现划到相应页面detail-nav中的相应item变红 this.themeTopYs中四个数：0, paramsY(可能为NaN), commentY(可能为NaN), recommendsY. (都为负值)
      //  paramsY~0 - 商品(0)
      //  commentsY ~ paramsY - 参数(1)
      //  recommendsY ~ commentsY - 评论(2)
      //  reommendsY ~  - 推荐(3)
      const positionY = position.y
      if(positionY <= this.themeTopYs[3]) {
        this.$refs.nav.currentIndex = 3
      } else {
        if(positionY <= this.themeTopYs[2]) {
          this.$refs.nav.currentIndex = 2
        } else {
          if(positionY <= this.themeTopYs[1]) {
            this.$refs.nav.currentIndex = 1
          } else {
            this.$refs.nav.currentIndex = 0
          }
        }
      }

    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index])
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
  // watch: {
  //   themeTopYs(val) {
  //     console.log('监视属性被触发')
  //     if(val.length === 4) {
  //       return formatThemeTopYs(val)
  //     }
  //     return val
  //   }
  // },
  mixins: [itemImageLoad],
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
      // console.log(this.paramsInfo)
      // 6. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list.map((item) => new RecommendItem(item))
      // console.log(this.recommends)

      // 1. 数据获取之后再赋值，这样不行，原因是DOM没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(-this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs)

      // 2. 在数据更新并渲染完之后赋值，这样获取到的数据是不准确的，因为图片没有加载。
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(-this.$refs.recommends.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
    })
  },
  mounted() {
    // // 1. 监听GoodsListItem中图片的加载
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
    // 3. 在mounted()中获取数据，
    // this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    // console.log(this.themeTopYs)
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop||-this.$refs.comment.$el.offsetTop||-this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop||-this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.recommends.$el.offsetTop)
      console.log(this.themeTopYs)
    }, 100)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
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
