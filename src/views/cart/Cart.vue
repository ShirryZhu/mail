<template lang="">
  <div id="cart">
    <cart-nav-bar class="cart-nav-bar" />
    <div>{{ $store.state.cartList }}</div>
  </div>
</template>
<script>
import CartNavBar from './childComps/CartNavBar.vue'

export default {
  name: 'Cart',
  components: {
    CartNavBar,
  },
}
</script>
<style scoped>
#cart div {
  width: 100%;
  overflow-x: scroll;
}
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: var(--font-size);
}
</style>
