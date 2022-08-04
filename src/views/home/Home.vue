<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabcontrol1"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners.list"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends.list" />
      <feature-view />
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="goodsList" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backtop/BackTop.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home'

import { HomeGoodsItem } from '@/common/class'

import { debounce } from '@/common/utils'

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1. 监听GoodsListItem中图片的加载
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    const itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', itemImageListener)
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1. 保存Y的值
    this.saveY = this.$refs.scroll.scrollY
    // 2. 取消全局事件监听
    // this.$bus.$off('itemImageLoad', () => {
    //   console.log('取消全局事件监听')
    // })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000

      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      // 请求多个数据
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      // 请求商品数据
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        this.$refs.scroll.finishPullUp()
      })
    },
  },
  computed: {
    goodsList() {
      const resList = this.goods[this.currentType].list
      const newList = resList.map((item) => new HomeGoodsItem(item))
      // console.log('newList', newList)
      return newList
    },
  },
}
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;

  /* 原生滚动2 */
  /* height: calc(100vh - 93px); */
}

/* 原生滚动1 */
/* .content {
  position: absolute;
  top: 44px;
  bottom: 49px;
} */
.wrapper {
  position: absolute;
  height: calc(100vh - 93px);
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: var(--font-size);

  /* 使用浏览器原生滚动时为了导航不跟随滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
