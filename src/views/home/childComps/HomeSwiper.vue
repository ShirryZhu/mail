<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="item.link + index">
        <a :href="item.link">
          <img :src="item.image" @load.once="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  data() {
    return {
      isLoad: false,
    }
  },
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
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    },
  },
}
</script>
<style lang=""></style>
