<template lang="">
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType值为0或1时，不监听滚动；值为2时监听非惯性滚动；值为3时监听惯性和非惯性滚动
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 监听点击
      click: true,
    })

    // 1. 监听滚动
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }

    // 2. 监听上拉
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // console.log('上拉加载更多')
      })
    }
  },
  methods: {
    // 1. 跳到相应位置
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 2. 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    // 3. 刷新一次scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  computed: {
    scrollY() {
      return this.scroll.y
    }
  }
}
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
