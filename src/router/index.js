import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import index from '@/views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})

export default router
