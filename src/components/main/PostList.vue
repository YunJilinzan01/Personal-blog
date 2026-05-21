<script setup>
import { ref } from 'vue'
import PostItem from './PostItem.vue'
import Pagination from './Pagination.vue'

// 模拟文章数据
const posts = ref([
  {
    id: 1,
    title: 'Markdown Tutorial',
    excerpt: 'A simple example of a Markdown blog post.',
    date: '2025-01-20',
    category: 'Examples',
    tags: ['Markdown', 'Blogging'],
    isPinned: true,
    readingTime: '1426 words',
    cover: null,
  },
  {
    id: 2,
    title: 'Encrypted Post',
    excerpt: 'This post is encrypted',
    date: '2024-01-15',
    category: 'Technology',
    tags: ['Test', 'Encryption'],
    isEncrypted: true,
    readingTime: '469 words',
    cover: null,
  },
  {
    id: 3,
    title: 'Markdown Extended Features',
    excerpt: 'Read more about Markdown features in Mizuki',
    date: '2024-05-01',
    category: 'Examples',
    tags: ['Demo', 'Example', 'Markdown', 'Mizuki'],
    readingTime: '136 words',
    cover: null,
  },
  {
    id: 4,
    title: 'Simple Guides for Mizuki',
    excerpt: 'How to use this blog template.',
    date: '2024-04-01',
    category: 'Guides',
    tags: ['Mizuki', 'Blogging', 'Customization'],
    readingTime: '182 words',
    cover:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  },
])

const currentPage = ref(1)
const totalPages = ref(5)
</script>

<template>
  <div class="space-y-6">
    <template v-if="posts.length > 0">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />

      <!-- 分页组件 -->
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </template>

    <!-- 空状态 -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-20 px-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-lg text-center animate-fade-in-up"
    >
      <div class="w-20 h-20 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-2">暂无文章</h3>
      <p class="text-gray-500 dark:text-zinc-400 max-w-xs">
        博主正在努力创作中，请稍后再来逛逛吧~
      </p>
    </div>
  </div>
</template>
