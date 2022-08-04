<template lang="">
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="item + index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      counter: 0,
      imageLength: 0,
    }
  },
}
</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
