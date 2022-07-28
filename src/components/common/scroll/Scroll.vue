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
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType值为0或1时，不监听滚动；值为2时监听非惯性滚动；值为3时监听惯性和非惯性滚动
      probeType: 2,
      // 上拉加载更多
      pullUpLoad: true,
      // 监听点击
      click: true
    })

    // 监听滚动
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    })

    // 监听上拉
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多')
      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000)
    })
  }
}
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
</style>