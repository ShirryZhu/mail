<template lang="">
  <div class="detail-nav">
    <nav-bar>
      <div slot="left" class="back">
        <img src="~@/assets/img/common/back.svg" @click="backClick" />
      </div>

      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="item + index"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNav',
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
}
.back img {
  width: 20px;
}
.active {
  color: var(--color-high-text);
  /* border-bottom: 2px solid var(--color-tint); */
}
</style>
