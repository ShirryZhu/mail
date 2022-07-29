<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="item.link + index">
        <a :href="item.link">
          <img :src="item.image" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>
<style lang=""></style>
