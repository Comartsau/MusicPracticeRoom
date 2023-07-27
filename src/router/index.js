import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import AdminHome from '../views/AdminHome.vue'
import UserHome from '../views/UserHome.vue'
import Registor from '../components/Register.vue'
import Product from '../components/admin/Product.vue'
import MusicRoom from '../components/admin/MusicRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/registor',
      name: 'Registor',
      component: Registor
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/user',
      name: 'User',
      component: UserHome,
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta: { requiresAuth: true, role: 'product' }
    },
    {
      path: '/musicRoom',
      name: 'musicRoom',
      component: MusicRoom,
      meta: { requiresAuth: true, role: 'musicRoom' }
    },
  ]
})

export default router
