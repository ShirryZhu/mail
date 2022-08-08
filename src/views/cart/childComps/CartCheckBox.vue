<template lang="">
  <div id="cart-check-box">
    <i class="icon">
      <img src="~@/assets/img/cart/tick.svg" v-show="isChecked" />
    </i>
  </div>
</template>
<script>
export default {
  name: 'CartCheckBox',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style scoped>
#cart-check-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
#cart-check-box .icon {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: var(--color-tint);

  position: relative;
}
.icon img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
