<template lang="">
  <div class="cart-nav-bar">
    <nav-bar>
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CartNavBar',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartListLength'])
  }
}
</script>
<style scoped>
  
</style>