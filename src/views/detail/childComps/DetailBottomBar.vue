<template lang="">
  <div id="detail-bottom-bar">
    <div class="bottom-left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
#detail-bottom-bar {
  display: flex;
  height: 49px;
  line-height: 49px;
  text-align: center;
  background-color: #fff;
}

.bottom-left,
.bottom-right {
  display: flex;
  justify-content: center;
  flex: 1;
}

.bottom-left > div,
.bottom-right > div {
  flex: 1;
}
.bottom-left span {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 24px;
}
.service, .shop, .collect {
  position: relative;
}
.icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  display: block;
  background: url("~@/assets/img/detail/detail_bottom.png") 0 0/100%;
  width: 25px;
  height: 25px;
}
.service .icon {
  background-position: 0 -60px;
}
.shop .icon {
  background-position: 0 -110px;
}
.cart, .buy {
  font-size: 15px;
}
.cart {
  background-color: yellow;
}

.buy {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
