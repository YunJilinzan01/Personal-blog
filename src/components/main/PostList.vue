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
    <PostItem v-for="post in posts" :key="post.id" :post="post" />

    <!-- 分页组件 -->
    <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
  </div>
</template>
