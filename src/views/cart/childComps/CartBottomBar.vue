<template lang="">
  <div id="cart-bottom-bar">
    <div class="check">
      <cart-check-box @click.native="boxChange" :isChecked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="sum">合计：￥{{ totalPrice | filterPrice}}</div>
    <div class="compute">去计算({{ checkedItemLength }})</div>
  </div>
</template>
<script>
import CartCheckBox from './CartCheckBox.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    CartCheckBox,
  },
  computed: {
    ...mapGetters(['cartListLength']),
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return !this.cartList.find((item) => !item.checked)
    },
    totalPrice() {
      return this.cartList.filter((item) => item.checked).reduce((pre, cur) => {
          let num = parseFloat(cur.price)
          return pre + num * cur.count
        }, 0.00)
    },
    checkedItemLength() {
      return this.cartList.filter((item) => item.checked).length
    },
  },
  methods: {
    boxChange() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.cartList.forEach(item => {
          item.checked = true
        })
      }
    }
  },
  filters: {
    filterPrice(val) {
      return val.toFixed(2)
    }
  }
}
</script>
<style scoped>
#cart-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eeeeee;
  height: 44px;

  font-size: var(--font-size);

  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.15);
}

.sum {
  width: 55%;
  padding-left: 5%;

  font-weight: bold;
}
.check {
  width: 15%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.compute {
  width: 30%;
  line-height: 44px;
  font-weight: 500;
  color: #fff;
  background-color: #fe5300;
  text-align: center;
}
</style>
