<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~@/assets/img/tabbar/home.svg" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/home_active.svg" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~@/assets/img/tabbar/sort.svg" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/sort_active.svg" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~@/assets/img/tabbar/shop.svg" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/shop_active.svg" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~@/assets/img/tabbar/profile.svg" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/profile_active.svg" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from '@/components/common/TabBar/TabBar.vue'
import TabBarItem from '@/components/common/TabBar/TabBarItem.vue'

export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style lang="">
  
</style>