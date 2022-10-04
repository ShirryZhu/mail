import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

const Home = () => import('@/views/home/Home.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Category = () => import('@/views/category/Category.vue')
const Profile = () => import('@/views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

const routes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/common/404'),
    meta: {
      title: '这个页面找不到了'
    }
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 从from跳到to
  // to 和 from 都是route类型的数据
  document.title = to.meta.title
  // 避免第一个title是undefined
  // document.title = to.matched[0].meta.title
  next()
})

export default router