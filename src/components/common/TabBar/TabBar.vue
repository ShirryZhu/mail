<template lang="">
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar"
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* 保证tabbar在屏幕底部 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 实现tabbar上方阴影 */
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.15);
}
</style>
