import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/main/MainView.vue'
import PostList from '@/components/main/PostList.vue'
import PostDetail from '@/components/main/PostDetail.vue'
import AboutView from '@/components/main/AboutView.vue'
import ArchiveView from '@/components/main/ArchiveView.vue'
import ProfileView from '@/components/main/ProfileView.vue'

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
          path: 'post/:id',
          name: 'post-detail',
          component: PostDetail,
          meta: { title: '文章详情 | Personal blog' },
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
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: { title: '个人信息 | Personal blog' },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Personal blog'
})

export default router
