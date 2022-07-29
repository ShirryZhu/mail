<template lang="">
  <div class="back-top">
    <img src="~@/assets/img/common/top.png" />
  </div>
</template>
<script>
export default {
  name: 'BackTop',
}
</script>
<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 60px;
  z-index: 1;
}

.back-top img {
  width: 43px;
}
</style>
