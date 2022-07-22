import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

const Home = () => import('../pages/home/Home.vue')
const Cart = () => import('../pages/cart/Cart.vue')
const Category = () => import('../pages/category/Category.vue')
const Profile = () => import('../pages/profile/Profile.vue')

const routes = [
  {
    path: '',
    redirect: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router