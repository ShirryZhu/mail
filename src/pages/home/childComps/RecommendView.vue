<template lang="">
  <div class="recommend">
    <div v-for="item in recommends">
      <a href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="css">
  .recommend {
    display: flex;
    text-align: center;
    margin: 5px 0;
  }
  .recommend>div {
    flex: 1;
  }
  .recommend img {
    width: 70px;
  }
</style>