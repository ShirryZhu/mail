<template lang="">
  <div id="cart-list-item">
    <cart-check-box @click.native="checkItem" :isChecked="product.checked" />
    <div class="cover">
      <img :src="product.image" />
    </div>
    <div class="light">
      <div class="title">{{product.title}}</div>
      <div class="desc">{{product.desc}}</div>
      <div class="price">
        <span>￥{{product.price}}</span>
        <span>×{{product.count}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CartCheckBox from './CartCheckBox.vue'

export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CartCheckBox,
  },
  methods: {
    checkItem() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>
<style scoped>
#cart-list-item {
  display: flex;
  justify-content: space-between;

  height: 100px;
  padding: 3%;

  font-size: var(--font-size);
}
.cover {
  margin-left: 3%;
}
.cover img {
  width: 10vh;
  height: 100%;
  border-radius: 10%;
}
.light {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  margin-left: 3%;
}
.light .title, .light .desc {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}
.light .title {
  font-size: 15px;
  font-weight: 700;
}
.light .desc {
  font-size: smaller;
}
.light .price {
  height: 35px;
  line-height: 35px;
  font-size: 15px;
}
.price {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  font-weight: 700;
}
.price span:first-of-type {
  color: #fe5300;
}
</style>
