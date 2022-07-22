<template lang="">
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="{ color: styleColor }"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    styleColor() {
      return this.isActive ? this.activeColor : "";
    }
  },
  methods: {
    itemClick() {
      // catch防止点击相同路由报错
      this.$router.replace(this.path).catch(err => {});
    }
  }
};
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* tabbar的高度一般设置为49px */
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 3px 0;
}
</style>
