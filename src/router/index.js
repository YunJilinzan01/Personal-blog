import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/main/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Personal blog'
})

export default router
