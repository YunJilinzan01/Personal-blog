import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/main/MainView.vue'
import PostList from '@/components/main/PostList.vue'
import AboutView from '@/components/main/AboutView.vue'
import ArchiveView from '@/components/main/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: '',
          name: 'home',
          component: PostList,
          meta: { title: '首页 | Personal blog' },
        },
        {
          path: 'archives',
          name: 'archives',
          component: ArchiveView,
          meta: { title: '归档 | Personal blog' },
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
          meta: { title: '关于我 | Personal blog' },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Personal blog'
})

export default router
