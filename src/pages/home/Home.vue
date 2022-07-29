<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners.list"></home-swiper>
      <recommend-view :recommends="recommends.list" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
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
    },
    backClick() {
      // console.log('backTop已被监听')
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.scroll.refresh()
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
        // console.log(res)
        // console.log(page)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        this.$refs.scroll.finishPullUp()
      })
    },
  },
  computed: {
    goodsList() {
      return this.goods[this.currentType].list
    },
  },
}
</script>
<style scoped>
#home {
  position: relative;
  padding-top: 44px;

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

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>
