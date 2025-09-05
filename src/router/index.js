import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import List from '@/views/search/list.vue'
import ProDetail from '@/views/proDetail/index.vue'
import Pay from '@/views/pay/index.vue'
import Order from '@/views/order/index.vue'
import Home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    /* 重定向到home */
    redirect: '/home',
    /* 二级路由配置 */
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/search', component: Search },
  { path: '/search-list', component: List },

  // 动态路由传参, id用于确定是哪个商品
  { path: '/pro-detail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/order', component: Order }

]

const router = new VueRouter({
  routes
})

export default router
