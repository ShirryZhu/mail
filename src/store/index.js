import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.unshift(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      let oldProduct = null
      oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
      }
    }
  },
  getters: {
    cartListLength(state) {
      return state.cartList.length
    }
  }
})

// 3. 挂载到Vue实例上
export default store