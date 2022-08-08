<template lang="">
  <div id="cart">
    <cart-nav-bar class="cart-nav-bar" />
    <scroll ref="scroll" class="cart-scroll">
      <cart-list :cartList="$store.state.cartList" />
    </scroll>
    <cart-bottom-bar class="bottom-bar" :cartList="$store.state.cartList" />
  </div>
</template>
<script>
import CartNavBar from './childComps/CartNavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'

export default {
  name: 'Cart',
  components: {
    CartNavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: var(--font-size);
}
.cart-scroll {
  height: calc(100vh - 142px);
  overflow: hidden;
}
.bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
