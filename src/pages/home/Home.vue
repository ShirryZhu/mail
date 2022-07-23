<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners.list"></home-swiper>
    <recommend-view :recommends="recommends.list" />
    <feature-view />
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import { getHomeMultidata } from '@/network/home'

export default {
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  created() {
    getHomeMultidata()
      .then(res => {
        console.log(res);
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>
<style scoped>
#home {
  padding-top: 44px;
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
</style>