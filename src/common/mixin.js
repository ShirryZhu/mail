import { debounce } from "./utils"

export const itemImageLoad = {
  mounted() {
    // 1. 监听GoodsListItem中图片的加载
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}